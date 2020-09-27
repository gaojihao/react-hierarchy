### 组件定义
Function Component 采用 const + 箭头函数方式定义：

``` javascript
const App: React.FC<{ title: string }> = ({ title }) => {
  return React.useMemo(() => <div>{title}</div>, [title]);
};

App.defaultProps = {
  title: 'Function Component'
}
```

上面的例子包含了：

1. 用 React.FC 申明 Function Component 组件类型与定义 Props 参数类型。
2. 用 React.useMemo  优化渲染性能。
3. 用 App.defaultProps 定义 Props 的默认值。

#### FAQ
 > 为什么不用 React.memo?
 
推荐使用 `React.useMemo` 而不是 `React.memo`，因为在组件通信时存在 `React.useContext` 的用法，这种用法会使所有用到的组件重渲染，只有 `React.useMemo` 能处理这种场景的按需渲染

> 没有性能问题的组件也要使用 useMemo 吗？

要，考虑未来维护这个组件的时候，随时可能会通过 `useContext` 等注入一些数据，这时候谁会想起来添加 `useMemo` 呢？

> 为什么不用解构方式代替 defaultProps?

虽然解构方式书写 `defaultProps` 更优雅，但存在一个硬伤：对于对象类型每次 Rerender 时引用都会变化，这会带来性能问题，因此不要这么做

### 局部状态
局部状态有三种，根据常用程度依次排列： `useState` `useRef` `useReducer` 。

#### useState
``` javascript
const [hide, setHide] = React.useState(false);
const [name, setName] = React.useState('BI');
```
状态函数名要表意，尽量聚集在一起申明，方便查阅。

#### useRef
``` javascript
const dom = React.useRef(null);
```
`useRef` 尽量少用，大量 `Mutable` 的数据会影响代码的可维护性。

但对于不需重复初始化的对象推荐使用 `useRef` 存储，比如 `new G2()` 。

#### useReducer
局部状态不推荐使用 `useReducer `，会导致函数内部状态过于复杂，难以阅读。 `useReducer` 建议在多组件间通信时，结合 `useContext` 一起使用

#### FAQ
> 可以在函数内直接申明普通常量或普通函数吗？

不可以，Function Component 每次渲染都会重新执行，常量推荐放到函数外层避免性能问题，函数推荐使用 `useCallback` 申明

### 函数
所有 Function Component 内函数必须用 `React.useCallback` 包裹，以保证准确性与性能

``` javascript
const [hide, setHide] = React.useState(false);
  
const handleClick = React.useCallback(() => {
  setHide(isHide => !isHide)
}, [])
```
`useCallback` 第二个参数必须写，`eslint-plugin-react-hooks `插件会自动填写依赖项。

### 发请求
发请求分为操作型发请求与渲染型发请求

#### 操作型发请求

操作型发请求，作为回调函数:
``` javascript
return React.useMemo(() => {
  return (
    <div onClick={requestService.addList} />
  )
}, [requestService.addList])
```

#### 渲染型发请求

渲染型发请求在 `useAsync` 中进行，比如刷新列表页，获取基础信息，或者进行搜索， **都可以抽象为依赖了某些变量，当这些变量变化时要重新取数**:

``` javascript
const { loading, error, value } = useAsync(async () => {
  return requestService.freshList(id);
}, [requestService.freshList, id]);
```

### 组件间通信
简单的组件间通信使用透传 Props 变量的方式，而频繁组件间通信使用 `React.useContext` 。

以一个复杂大组件为例，如果组件内部拆分了很多模块， **但需要共享很多内部状态**，最佳实践如下:

**定义组件内共享状态 - store.ts**

``` javascript
export const StoreContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>(null)

export interface State {};

export interface Action { type: 'xxx' } | { type: 'yyy' };

export const initState: State = {};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

**根组件注入共享状态 - main.ts**

``` javascript
import { StoreContext, reducer, initState } from './store'

const AppProvider: React.FC = props => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return React.useMemo(() => (
    <StoreContext.Provider value={{ state, dispatch }}>
      <App />
    </StoreContext.Provider>
  ), [state, dispatch])
};
```

**任意子组件访问/修改共享状态 - child.ts**

``` javascript
import { StoreContext } from './store'

const app: React.FC = () => {
  const { state, dispatch } = React.useContext(StoreContext);
  
  return React.useMemo(() => (
    <div>{state.name}</div>
  ), [state.name])
};
```

如上解决了 **多个联系紧密组件模块间便捷共享状态的问题** ，但有时也会遇到需要共享根组件 Props 的问题，**这种不可修改的状态不适合一并塞到 StoreContext 里**，我们新建一个 PropsContext 注入根组件的 Props

``` javascript
const PropsContext = React.createContext<Props>(null)

const AppProvider: React.FC<Props> = props => {
  return React.useMemo(() => (
    <PropsContext.Provider value={props}>
      <App />
    </PropsContext.Provider>
  ), [props])
};
```

### debounce 优化

比如当输入框频繁输入时，为了保证页面流畅，我们会选择在 onChange 时进行 debounce 。然而在 Function Component 领域中，我们有更优雅的方式实现。

> 其实在 Input 组件 `onChange`  使用 `debounce` 有一个问题，就是当 Input 组件 受控 时， `debounce` 的值不能及时回填，导致甚至无法输入的问题。

我们站在 Function Component 思维模式下思考这个问题：

1. React scheduling 通过智能调度系统优化渲染优先级，我们其实不用担心频繁变更状态会导致性能问题。
2. 如果联动一个文本还觉得慢吗？ `onChange` 本不慢，大部分使用值的组件也不慢，没有必要从 `onChange` 源头开始就 `debounce` 。
3. 找到渲染性能最慢的组件（比如 iframe 组件），**对一些频繁导致其渲染的入参进行 `useDebounce`**。

下面是一个性能很差的组件，引用了变化频繁的 `text` （这个 `text` 可能是 `onChange` 触发改变的），我们利用 useDebounce 将其变更的频率慢下来即可

``` javascript
const App: React.FC = ({ text }) => {
  // 无论 text 变化多快，textDebounce 最多 1 秒修改一次
  const textDebounce = useDebounce(text, 1000)
  
  return useMemo(() => {
    // 使用 textDebounce，但渲染速度很慢的一堆代码
  }, [textDebounce])
};
```

使用 `textDebounce`替代 text 可以将渲染频率控制在我们指定的范围内

