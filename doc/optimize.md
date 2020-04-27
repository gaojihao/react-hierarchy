### 减少 re-render

#### React.memo

`React.memo` 是 React v16.6 中引入的新功能，是一个专门针对 React 函数组件的高阶组件

默认情况下，它和 PureComponent 一样，都是进行浅比较，因为就是个高阶组件，在原有的组件上套一层就可以了

```
const MemoButton = React.memo(function Button(props) {
  return <button color={this.props.color} />;
});
```

如果想和 `shouldComponentUpdate` 一样，自定义比较过程，`React.memo` 还支持传入自定义比较函数:

```
function Button(props) {
  return <button color={this.props.color} />;
}
function areEqual(prevProps, nextProps) {
  if (prevProps.color !== nextProps.color) {
      return false;
    }
  return true;
}
export default React.memo(Button, areEqual);
```

值得注意的是，`areEqual()` 这个函数的返回值和 `shouldComponentUpdate` 正好相反，如果 props 相等，`areEqual()` 返回的是 true，`shouldComponentUpdate` 却返回的是 false

### 减轻渲染压力

React Native Android UI 布局前，会对只有布局属性的 View 进行过滤，这样可以减少 View 节点和嵌套，对碎片化的 Android 更加友好

通过这个小小的例子我们可以看出，React 组件映射到原生 View 时，并不是一一对应的，我们了解了这些知识后，可以如何优化布局呢

#### 使用 React.Fragment 避免多层嵌套

Fragments 作用还是蛮明显的：避免你多写一层 View。用处还是很广的，比如说自己业务上封装的 React 组件，React Native 官方封装的组件（比如说 ScrollView or Touchable* 组件 ），活用这个属性，可以减少你的 View 嵌套层级

#### 减少 GPU 过度绘制

* 减少背景色的重复设置：每个 View 都设置背景色的话，在 Android 上会造成非常严重的过度绘制；并且只有布局属性时，React Native 还会减少 Android 的布局嵌套
* 避免设置半透明颜色：半透明色区域 iOS Android 都会引起过度绘制
* 避免设置圆角：圆角部位 iOS Android 都会引起过度绘制
* 避免设置阴影：阴影区域 iOS Android 都会引起过度绘制

### 图片优化那些事

性能优化的另一个大头就是图片。这里的图片优化不仅仅指减少图片大小，减少 HTTP 带宽占用，我会更多的讨论一些 Image 组件上的优化，比如说缓存控制，图片采样等技术

#### Image 组件的优化项

React Native 的 Image 图片组件，如果只是作为普通的图片展示组件，那它该有的都有了，比如说

* 加载本地/网络图片
* 自动匹配 @2x/@3x 图片
* 图片加载事件：onLoadStart/onLoad/onLoadEnd/onError
* loading 默认图 or loading 指示器

但是，如果你要把它当一个图片下载管理库用时，就会非常的难受，因为 Image 的这几个属性在 iOS/Android 上有不同的表现，有的实现了有的没有实现，用起来非常不顺手

在讲解图片优化前，我们先想一下，一个基本的图片下载管理库要实现什么

1. 图片类型：首先你的主要职责是加载图片，你起码能加载多种图片类型
2. 下载管理：在加载多张图片的场景，能管理好多个请求，可以控制图片加载的优先级
3. 缓存管理：做好三级缓存，不能每个图片都要请求网络，均衡好内存缓存和磁盘缓存的策略
4. 多图加载：大量图片同时渲染时，如何让图片迅速加载，减少卡顿

针对上面的 4 条原则，我们来一一刨析 Image 组件

##### 1.图片类型
基础的 png/jpg/base64/gif 格式，支持良好。不过要注意的是，想要 Android 加载的 gif 图片动起来，要在 build.gradle 里面加一些依赖，具体内容可以看这个 🔗 链接。

如果要加载 webp 格式的图片，就有些问题了。作为 Google 推出的一种图片格式，Android 自然是支持的，但是 iOS 就不支持了，需要我们安装一些第三方插件

##### 2.下载管理
先说结论，Image 组件对图片的下载管理能力基本为 0。

Image基本上只能监听单张图片的加载流程：onLoadStart/onLoad/onLoadEnd/onError，如果要控制多张图片的下载优先级，对不起，没有。

##### 3.缓存管理
缓存这里要从两方面说，一是通过 HTTP 头信息管理缓存，二是直接通过一些组件属性管理缓存。

Image 组件请求网络图片时，其实是可以加 HTTP header 头信息的，这样就可以利用 HTTP 缓存来管理图片，写法如下面代码所示

```
<Image
  source={{
    uri: 'https://facebook.github.io/react/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```

直接通过属性控制图片缓存，iOS 有。Android？对不起，没有

iOS 可以通过 source 参数里的 cache 字段控制缓存，属性也是非常常见的那几种：默认/不使用缓存/强缓存/只使用缓存。具体的使用可以看 [iOS Image 缓存文档](https://reactnative.dev/docs/images#uri-data-images)

##### 4.多图加载
都快到 5G 时代了，短视频/VLog 大家都天天刷了，更不用说多图场景了，基本上已经是互联网应用的标配了。

讲图片加载前先明确一个概念：图片文件大小 != 图片加载到内存后的大小。

我们常说的 jpg png webp，都是原图压缩后的文件，利于磁盘存储和网络传播，但是在屏幕上展示出来时，就要恢复为原始尺寸了。

比如说一张 100x100 的 jpg 图片，可能磁盘空间就几 kb，不考虑分辨率等问题，加载到内存里，就要占用 3.66 Mb

```
// 不同的分辨率/文件夹/编码格式，都会带来数值差异
// 下面的计算只是最一般的场景，领会精神即可

(100 * 100 * 3) / (8 * 1024) = 3.66 Mb
(长 * 宽 * 每个像素占用字节数) / (8 * 1024) = 3.66 Mb
```

上面只是 100x100 的图片，如果图片尺寸增加一倍，图片在内存里的大小是按平方倍数增长的，数量一多后，内存占用还是很恐怖的。

在多图加载的场景里，经过实践，iOS 不管怎么折腾，表现都比较好，但是 Android 就容易出幺蛾子。下面我们就详细说说 Android 端如何优化图片。

在一些场景里，Android 会内存爆涨，帧率直接降为个位数。这种场景往往是小尺寸 Image 容器加载了特别大的图片，比如说 100x100 的容器加载 1000x1000 的图片，内存爆炸的原因就是上面说的原因。

那么这种问题怎么解决呢？Image 有个` resizeMethod` 属性，就是解决 Android 图片内存暴涨的问题。当图片实际尺寸和容器样式尺寸不一致时，决定以怎样的策略来调整图片的尺寸

* `resize`：小容器加载大图的场景就应该用这个属性。原理是在图片解码之前，会用算法对其在内存中的数据进行修改，一般图片大小大概会缩减为原图的 1/8
* `scale`：不改变图片字节大小，通过缩放来修改图片宽高。因为有硬件加速，所以加载速度会更快一些
* `auto`：文档上说是通过启发式算法自动切换 resize 和 scale 属性。这个启发式算法非常误导人，第一眼看上去还以为是会对比容器尺寸和图片尺寸采用不同策略。但我看了一下源码，它只是单纯的判断图片路径，如果是本地图片，就会用 resize，其他都是 scale 属性，所以 http 图片都是 scale 的，我们还得根据具体场景手动控制。

顺便提一下，Android 图片加载的时候，还会有一个 easy-in 的 300ms 加载动画效果，看上去会觉得图片加载变慢了，我们可以通过设置 fadeDuration 属性为 0，来关闭这个加载动画

##### 优先使用 32 位色彩深度的图片

色彩深度这个概念其实前面也提了一下，比如说我们常用的带透明度 PNG 图片，就是 32 位的

* R：红色，占据 8 bit
* G：绿色，占据 8 bit
* B：蓝色，占据 8 bit
* A：透明通道，占据 8 bit

为啥推荐使用 32 bit 图片呢？直接原因有 2 个

* Android 推荐使用ARGB_8888 格式的图片，因为这种图片显示效果更好
* iOS GPU 只支持加载 32 bit 的图片。如果是其他格式的（比如说 24 bit 的 jpg），会先在 CPU 里转为 32 bit，再传给 GPU

##### Image 和 ImageView 长宽保持一致
前面举了一个 100x100 的 ImageView 加载 1000x1000 Image 导致 Android 内存 OOM 的问题，我们提出了设置 resizeMethod={'resize'} 的方法来缩减图片在内存中的体积。其实这是一种无奈之举，如果可以控制加载图片的大小，我们应该保持 Image 和 ImageView 长宽一致。

首先我们看看长宽不一致会引起的问题
* Image 小于 ImageView：图片不清晰，表情包电子包浆质感
* Image 大于 ImageView：浪费内存，有可能会引起 OOM
* 尺寸不一致会带来抗锯齿计算，增加了图形处理负担

React Native 开发时，布局使用的单位是 pt，和 px 存在一个倍数关系。在加载网络图片时，我们可以使用 React Native 的 [PixelRatio.getPixelSizeForLayoutSize](https://reactnative.cn/docs/pixelratio/#getpixelsizeforlayoutsize)方法，根据不同的分辨率加载不同尺寸的图片，保证 Image 和 ImageView 长宽一致

##### 使用 react-native-fast-image
经过上面的几个 Image 属性分析，综合来看，Image 组件对图片的管理能力还是比较弱的，社区上有个 Image 组件的替代品：react-native-fast-image

它的底层用的是 iOS 的 SDWebImage 和 Android 的 Glide 。这两个明星图片下载管理库，原生开发同学肯定很熟悉，在缓存管理，加载优先级和内存优化上都有不错的表现。而且这些属性都是双平台可用，这个库都封装好了，但是官网上只有基础功能的安装和配置，如果想引入一些功能（比如说支持 WebP），还是需要查看 SDWebImage 和 Glide 的文档的

##### 图片服务器辅助

前面说的都是从 React Native 侧优化图片，但是一个产品从来不是单打独斗，借助服务端的力量其实可以省很多事。

1.使用 WebP

2.图床定制图片

#### 对象创建调用分离

我们知道在 JavaScript 里，啥都是对象，而在 JS 引擎里，创建一个对象的时间差不多是调用一个已存在对象的 10 多倍。在绝大部分情况下，这点儿性能消耗和时间消耗根本不值一提。但在这里还是要总结一下

##### public class fields 语法绑定回调函数

```
class Button extends React.Component {
  // 此语法确保 handleClick 内的 this 已被绑定。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

##### public class fields 语法绑定渲染函数
```
renderItem = ({ item }) => <Text>{item.title}</Text>;

render(){
  <FlatList
    data={items}
    renderItem={renderItem}
  />
}
```

##### StyleSheet.create 替代 StyleSheet.flatten

##### 避免在 render 函数里创建新数组/对象
我们写代码时，为了避免传入 [] 的地方因数据没拿到传入  undefined，经常会默认传入一个空数组：

```
render() {
  return <ListComponent listData={this.props.list || []}/>
}
```
其实更好的做法是下面这样的：
```
const EMPTY_ARRAY = [];

render() {
    return <ListComponent listData={this.props.list || EMPTY_ARRAY}/>
}
```

这个其实算不上啥性能优化，还是前面再三强调的思路：对象创建和调用分离。毕竟每次渲染的时候重新创建一个空的数组/对象，能带来多大的性能问题

把 [] 改为统一的 EMPTY_ARRAY 常量，其实和日常编码中避免出现 Magic Number 一样，算一种编程习惯，但我觉得这种优化可以归到这个类别里，所以专门提一下

#### 动画性能优化

动画流畅很简单，在大部分的设备上，只要保证 60fps 的帧率就可以了。但要达到这个目标，在 React Native 上还是有些问题的，我画了一张图，描述了目前 React Native 的基础架构（0.61 版本）。

![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/images/20191222161738.png)

* UI Thread：在 iOS/Android 上专门绘制 UI 的线程
* JS Thread：我们写的业务代码基本都在这个线程上，React 重绘，处理 HTTP 请求的结果，磁盘数据 IO 等等
* other Thread：泛指其他线程，比如说数据请求线程，磁盘 IO 线程等等

上图我们可以很容易的看出，JS 线程太忙了，要做的事情太多了。而且 UI Thread 和 JS Thread 之前通信是异步的（Async Bridge），只要其它任务一多，就很难保证每一帧都是及时渲染的。

分析清楚了，React Native 动画优化的方向自然而然就出来了

* 减少 JS Thread 和 UI Thread 之间的异步通信
* 尽量减少 JS Thread 侧的计算

##### 开启 useNativeDrive: true

JS Thread 和 UI Thread 之间是通过 JSON 字符串传递消息的。对于一些可预测的动画，比如说点击一个点赞按钮，就跳出一个点赞动画，这种行为完全可以预测的动画，我们可以使用 useNativeDrive: true 开启原生动画驱动。

![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/images/20191222164337.png)

通过启用原生驱动，我们在启动动画前就把其所有配置信息都发送到原生端，利用原生代码在 UI 线程执行动画，而不用每一帧都在两端间来回沟通。如此一来，动画一开始就完全脱离了 JS 线程，因此此时即便 JS 线程被卡住，也不会影响到动画了。

使用也很简单，只要在动画开始前在动画配置中加入 useNativeDrive: true 就可以了：

```
Animated.timing(this.state.animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true // <-- 加上这一行
}).start();
```

开启后所有的动画都会在 Native 线程运行，动画就会变的非常丝滑顺畅。

经过各种暴力测试，使用原生驱动动画时，基本没有掉帧现象，但是用 JS 驱动动画，一旦操作速度加快，就会有掉帧现象。

值得注意的是，useNativeDriver 这个属性也有着局限性，只能使用到只有非布局相关的动画属性上，例如 transform 和 opacity。布局相关的属性，比如说 height 和 position 相关的属性，开启后会报错。而且前面也说了，useNativeDriver 只能用在可预测的动画上，比如说跟随手势这种动画，useNativeDriver 就用不了的

##### 使用 setNativeProps

setNativeProps 这个属性，相当于直接操作浏览器的 DOM。React 官方一般是不推荐直接操作 DOM 的，但业务场景千变万化，总会遇到一些场景不得不操作 DOM，在React Native 里也是同样的道理

##### 使用 InteractionManager

原生应用感觉如此流畅的一个重要原因就是在互动和动画的过程中避免繁重的操作。

在 React Native 里，JS 线程太忙了，啥都要干，我们可以把一些繁重的任务放在 InteractionManager.runAfterInteractions() 里，确保在执行前所有的交互和动画都已经处理完毕。

```
InteractionManager.runAfterInteractions(() => {
  // ...需要长时间同步执行的任务...
});
```

在 React Native 官方提供的组件里，PanResponder、Animated，VirtualizedList 都用了 InteractionManager，为的就是平衡复杂任务和交互动画之间的执行时机

##### 使用 react-native-reanimated 和 react-native-gesture-handler

#### 长列表性能优化
在 React Native 开发中，最容易遇到的对性能有一定要求场景就是长列表了。在日常业务实践中，优化做好后，千条数据渲染还是没啥问题的

虚拟列表前端一直是个经典的话题，核心思想也很简单：只渲染当前展示和即将展示的 View，距离远的 View 用空白 View 展示，从而减少长列表的内存占用。

在 React Native 官网上，🔗 列表配置优化其实说的很好了，我们基本上只要了解清楚几个配置项，然后灵活配置就好。但是问题就出在「了解清楚」这四个字上，本节我会结合图文，给大家讲述清楚这几个配置

##### 各种列表间的关系

React Native 有好几个列表组件，先简单介绍一下：

* ScrollView：会把视图里的所有 View 渲染，直接对接 Native 的滚动列表
* VirtualizedList：虚拟列表核心文件，使用 ScrollView，长列表优化配置项主要是控制它
* FlatList：使用 VirtualizedList，实现了一行多列的功能，大部分功能都是 VirtualizedList 提供的
* SectionList：使用 VirtualizedList，底层使用 VirtualizedSectionList，把二维数据转为一维数据

![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/images/20200105203140.png)

##### 列表配置项

讲之前先写个小 demo。demo 非常简单，一个基于 FlatList 的奇偶行颜色不同的列表

```
export default class App extends React.Component {
  renderItem = item => {
    return (
      <Text
        style={{
          backgroundColor: item.index % 2 === 0 ? 'green' : 'blue',
        }}>
        {'第 ' + (item.index + 1) + ' 个'}
      </Text>
    );
  }

  render() {
    let data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({key: i});
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
	  data={data}
          renderItem={this.renderItem}
          initialNumToRender={3} // 首批渲染的元素数量
          windowSize={3} // 渲染区域高度
          removeClippedSubviews={Platform.OS === 'android'} // 是否裁剪子视图
	  maxToRenderPerBatch={10} // 增量渲染最大数量
          updateCellsBatchingPeriod={50} // 增量渲染时间间隔
          debug // 开启 debug 模式
        />
      </View>
    );
  }
}
```

VirtualizedList 有个 debug 的配置项，开启后会在视图右侧显示虚拟列表的显示情况。

这个属性文档中没有说，是翻🔗 源码发现的，我发现开启它后用来演示讲解还是很方便的，可以很直观的学习 initialNumToRender、windowSize、Viewport，Blank areas 等概念。

下面是开启 debug 后的 demo 截屏：

![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/images/20200105212114.png)

上面的图还是很清晰的，右侧 debug 指示条的黄色部分表示内存中 Item，各个属性我们再用文字描述一下

1.initialNumToRender

首批应该渲染的元素数量，刚刚盖住首屏最好。而且从 debug 指示条可以看出，这批元素会一直存在于内存中
  
2.Viewport

视口高度，就是用户能看到内容，一般就是设备高度

3.windowSize

渲染区域高度，一般为 Viewport 的整数倍。这里我设置为 3，从 debug 指示条可以看出，它的高度是 Viewport 的 3 倍，上面扩展 1 个屏幕高度，下面扩展 1 个屏幕高度。在这个区域里的内容都会保存在内存里。

将 windowSize 设置为一个较小值，能有减小内存消耗并提高性能，但是快速滚动列表时，遇到未渲染的内容的几率会增大，会看到占位的白色 View。大家可以把 windowSize 设为 1 测试一下，100% 会看到占位 View。

4.Blank areas

空白 View，VirtualizedList 会把渲染区域外的 Item 替换为一个空白 View，用来减少长列表的内存占用。顶部和底部都可以有

5.maxToRenderPerBatch 和 updateCellsBatchingPeriod

VirtualizedList 的数据不是一下子全部渲染的，而是分批次渲染的。这两个属性就是控制增量渲染的。

这两个属性一般是配合着用的，maxToRenderPerBatch 表示每次增量渲染的最大数量，updateCellsBatchingPeriod 表示每次增量渲染的时间间隔。

我们可以调节这两个参数来平衡渲染速度和响应速度。但是，调参作为一门玄学，很难得出一个统一的「最佳实践」，所以我们在业务中也没有动过这两个属性，直接用的系统默认值

##### ListLtems 优化

1.使用 getItemLayout

如果 FlatList（VirtualizedList）的 ListLtem 高度是固定的，那么使用 getItemLayout 就非常的合算

如果不使用 getItemLayout，那么所有的 Cell 的高度，都要调用 View 的 onLayout 动态计算高度，这个运算是需要消耗时间的；如果我们使用了 getItemLayout，VirtualizedList 就直接知道了 Cell 的高度和偏移量，省去了计算，节省了这部分的开销。

在这里我还想提一下几个注意点，希望大家使用 getItemLayout 要多注意一下

* 如果 ListItem 高度不固定，使用 getItemLayout 返回固定高度时，因为最终渲染高度和预测高度不一致，会出现页面跳动的问题
* 如果使用了 ItemSeparatorComponent，分隔线的尺寸也要考虑到 offset 的计算中






