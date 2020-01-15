#### 为什么要用 className 而不用 class

##### 1.React 一开始的理念是想与浏览器的 DOM API 保持一致而不是 HTML，因为 JSX 是 JS 的扩展，而不是用来代替 HTML 的，这样会和元素的创建更为接近。在元素上设置class需要使用className这个 API

```
const element = document.createElement("div")
element.className = "hello" 
```

##### 2.浏览器问题，ES5 之前，在对象中不能使用保留字。以下代码在 IE8 中将会抛出错误

```
const element = {
  attributes: {
    class: "hello"
  }
} 
```

##### 3.解构问题，当你在解构属性的时候，如果分配一个class变量会出问题
```
const { class } = { class: 'foo' } // Uncaught SyntaxError: Unexpected token }
const { className } = { className: 'foo' } 
const { class: className } = { class: 'foo' } 
```

#### 为什么 constructor 里要调用 super 和传递 props
为什么要调用 super?

其实这不是 React 的限制，这是 JavaScript 的限制，在构造函数里如果要调用 this，那么提前就要调用 super。在 React 里，我们常常会在构造函数里初始化 state，this.state = xxx ，所以需要调用 super

为什么要传递 props?

你可能以为必须给 super 传入 props，否则 React.Component 就没法初始化 this.props：

```
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```
不过，如果你不小心漏传了 props，直接调用了 super()，你仍然可以在 render 和其他方法中访问 this.props。为啥这样也行？因为 React 会在构造函数被调用之后，会把 props 赋值给刚刚创建的实例对象

```
const instance = new YourComponent(props);
instance.props = props;
```
但这意味着你在使用 React 时，可以用 super() 代替 super(props) 了么？

那还是不行的，不然官网也不会建议你调用 props 了，虽然 React 会在构造函数运行之后，为 this.props 赋值，但在 super() 调用之后与构造函数结束之前， this.props 仍然是没法用的。

#### 为什么组件用大写开头
JSX 是 React.createElement(component, props, …children) 提供的语法糖，component 的类型是：string/ReactClass type。我们具体看一下在什么情况下会用到 string 类型，什么情况下用到 ReactClass type 类型

* string 类型react会觉得他是一个原生dom节点
* ReactClass type 类型 自定义组件

对于小写字符串，就会直接创建 dom 元素，如果 html 并没有这个元素，是创建不出来的。而大字符串传进去的不是一个字符串，是一个组件(其实就是一个对象)，那么就不会直接去创建 dom 元素，还会做其他的处理

#### setState 是同步还是异步
1. 保证内部（数据）统一
2. setState异步更新状态使得并发更新组件成为可能

参考[React 中 setState() 为什么是异步的](https://www.sohu.com/a/219848526_695559)

##### setState 更新 state 何时同步何时异步
setState可能是同步的，也可能是异步的。执行过程代码同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，所以表现出来有时是同步，有时是“异步”。

只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval等原生 API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步

1. setState 只在合成事件和钩子函数中是"异步"的，在原生时间和setTimeout 中都是同步的
2. setState的"异步"并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，知识合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立即拿到更新后的值，形成了所谓的"异步"，当然可以通过第二个参数setState(partialState,callback)中的callback拿到更新后的结果
3. setState的批量更新优化也是建立在"异步"（合成事件，钩子函数）只上的，在原生事件和setTimeout中不会批量更新

为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 dom，那么它将带来巨大的性能消耗

参考[React 中setState更新state何时同步何时异步？](https://www.jianshu.com/p/799b8a14ef96)
