# React Hooks

### 1.State Hook

``` JavaScript(JSON)
import React, { useState } from 'react';

function Example() {
  // 定义一个 State 变量，变量值可以通过 setCount 来改变
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

可以看到useState的入参只有一个，就是 state 的初始值。这个初始值可以是一个数字、字符串或对象，甚至可以是一个函数。当入参是一个函数的时候，这个函数只会在这个组件初始渲染的时候执行

``` JavaScript(JSON)
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

useState的返回值是一个数组，数组的第一个元素是 state 当前的值，第二个元素是改变 state 的方法。这两个变量的命名不需要遵守什么约定，可以自由发挥。要注意的是如果 state 是一个对象，setState 的时候不会像Class Component的 setState 那样自动合并对象。要达到这种效果，可以这么做

``` JavaScript(JSON)
setState(prevState => {
  // Object.assign 也可以
  return {...prevState, ...updatedValues};
});
```

从上面的代码可以看出，setState 的参数除了数字、字符串或对象，还可以是函数。当需要根据之前的状态来计算出当前状态值的时候，就需要传入函数了，这跟Class Component的 setState 有点像。
另外一个跟Class Component的 setState 很像的一点是，当新传入的值跟之前的值一样时(使用Object.is比较)，不会触发更新

### 2.Effect Hook
useEffect会在每次 DOM 渲染后执行，不会阻塞页面渲染。它同时具备componentDidMount、componentDidUpdate和componentWillUnmount三个生命周期函数的执行时机


``` JavaScript(JSON)
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    
    // 返回一个函数来进行额外的清理工作:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

当useEffect的返回值是一个函数的时候，React 会在下一次执行这个副作用之前执行一遍清理工作，整个组件的生命周期流程可以这么理解:
组件挂载 --> 执行副作用 --> 组件更新 --> 执行清理函数 --> 执行副作用 --> 组件更新 --> 执行清理函数 --> 组件卸载

上文提到useEffect会在每次渲染后执行，但有的情况下我们希望只有在 state 或 props 改变的情况下才执行

``` JavaScript(JSON)
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有在 count 改变的时候才执行 Effect
```

第二个参数是一个数组，可以传多个值，一般会将 Effect 用到的所有 props 和 state 都传进去.

当副作用只需要在组件挂载的时候和卸载的时候执行，第二个参数可以传一个空数组[]

### 3.useContext
useContext可以很方便的去订阅 context 的改变，并在合适的时候重新渲染组件。我们先来熟悉下标准的 context API 用法

``` JavaScript(JSON)
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间层组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
    // 通过定义 Consumer 来订阅
    return (
        <ThemeContext.Consumer>
          {value => <Button theme={value} />}
        </ThemeContext.Consumer>
    );
}

//使用useContext来订阅，代码会是这个样子
function ThemedButton() {
  const value = useContext(ThemeContext);
  return <Button theme={value} />;
}
```

在需要订阅多个 context 的时候，就更能体现出useContext的优势

```  JavaScript(JSON)
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);

  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```


### 4.useReducer
useReducer的用法跟 Redux 非常相似，当 state 的计算逻辑比较复杂又或者需要根据以前的值来计算时，使用这个 Hook 比useState会更好

``` JavaScript(JSON)
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

### 5.useCallback/useMemo
useCallback和useMemo设计的初衷是用来做性能优化的
传给 Button 的 onClick 方法每次都是重新创建的，这会导致每次 Foo render 的时候，Button 也跟着 render。优化方法有 2 种，箭头函数和 bind

使用useCallback Hook。依赖不变的情况下，它会返回相同的引用，避免子组件进行无意义的重复渲染


``` JavaScript(JSON)
function Foo() {
  const [count, setCount] = useState(0);

  const memoizedHandleClick = useCallback(
    () => console.log(`Click happened with dependency: ${count}`), [count],
  ); 
  return <Button onClick={memoizedHandleClick}>Click Me</Button>;
}

```

useCallback缓存的是方法的引用，而useMemo缓存的则是方法的返回值。使用场景是减少不必要的子组件渲染：


```  JavaScript(JSON)
function Parent({ a, b }) {
  // 当 a 改变时才会重新渲染
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 当 b 改变时才会重新渲染
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}

```

如果想实现Class Component的shouldComponentUpdate方法，可以使用React.memo方法，区别是它只能比较 props，不会比较 state：

``` JavaScript(JSON)

const Parent = React.memo(({ a, b }) => {
  // 当 a 改变时才会重新渲染
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 当 b 改变时才会重新渲染
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
});

```

### 6.useRef

``` JavaScript(JSON)
function() {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.focus();
  }, [])
  
  return <input ref={myRef} type="text" />;
}
```

useRef返回一个普通 JS 对象，可以将任意数据存到current属性里面，就像使用实例化对象的this一样。另外一个使用场景是获取 previous props 或 previous state

``` JavaScript(JSON)

function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}

```

### 7.自定义Hooks

```	JavaScript(JSON)

import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

```

自定义 Hook 的命名有讲究，必须以use开头，在里面可以调用其它的 Hook。入参和返回值都可以根据需要自定义，没有特殊的约定。使用也像普通的函数调用一样，Hook 里面其它的 Hook（如useEffect）会自动在合适的时候调用

使用规则
只能在代码的第一层调用 Hooks，不能在循环、条件分支或者嵌套函数中调用 Hooks
只能在Function Component或者自定义 Hook 中调用 Hooks，不能在普通的 JS 函数中调用

