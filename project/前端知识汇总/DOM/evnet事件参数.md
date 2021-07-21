https://w3c.github.io/touch-events/#mouse-events

# MouseEvent鼠标事件

> MouseEvent 接口指用户与指针设备( 如鼠标 )交互时发生的事件。使用此接口的常见事件包括：click，dblclick，mouseup，mousedown。

> MouseEvent 派生自 UIEvent，UIEvent 派生自 Event。

绑定mousedown事件返回的event是MouseEvent对象

## 构造函数

MouseEvent() 生成一个新的MouseEvent对象

## 属性

```js
// MouseEvent对象上的属性都是只读属性，列出一些常用参数
{
  altKey: '当鼠标事件触发时，如果 alt 键被按下，则返回 true',
  ctrlKey: '当鼠标事件触发时，如果 ctrl 键被按下，则返回 true',
  shiftKey: '当鼠标事件触发时，如果 shift 键被按下，则返回 true',
  metaKey: '当鼠标事件触发时，如果 meta 键被按下，则返回 true',
  button: '如果鼠标按钮按下，将会返回一个数值',
  buttons: '如果一个或多个鼠标按钮按下，将会返回一个或多个鼠标按键只相加后的数值',
  detail: '提供当前点击数',
  cancelBubble: '布尔值，表示该事件的冒泡是否被取消',
  cancelable: '布尔值，表示事件是否可以取消',
  clientX: '点相对于视口的水平坐标（以像素为单位），不包括任何滚动偏移',
  clientY: '点相对于视口的垂直坐标（以像素为单位），不包括任何滚动偏移',
  offsetX: '鼠标指针相对于目标节点内边位置的X坐标',
  offsetY: '鼠标指针相对于目标节点内边位置的Y坐标',
  layerX: '返回事件相对于当前层的水平坐标',
  layerY: '返回事件相对于当前层的垂直坐标',
  pageX: '鼠标指针相对于整个文档的X坐标',
  pageY: '鼠标指针相对于整个文档的Y坐标',
  movementX: '当前事件与上一个mousemove事件之间鼠标在水平方向上的移动值。即currentEvent.movementX = currentEvent.screenX - previousEvent.screenX',
  movementY: '当前事件与上一个mousemove事件之间鼠标在垂直方向上的移动值',
  screenX: '鼠标指针相对于全局（屏幕）的X坐标',
  screenY: '鼠标指针相对于全局（屏幕）的Y坐标',
  bubbles: '布尔值，用来表示该事件是否会在 DOM 中冒泡',
  defaultPrevented: '布尔值,表示是否取消了事件的默认行为',
  isTrusted: '表示事件是由浏览器（例如用户点击）发起的，还是由脚本（使用事件创建方法）发出的',
  currentTarget: '返回element对象（对事件当前注册的目标的引用）',
  target: '返回element对象（对事件原始目标的引用，这里的原始目标指最初派发（dispatch）事件时指定的目标）',
  timeStamp: '事件创建时的时间戳（精度为毫秒）',
  type: '事件的类型',
}
```

### button和buttons关系

```js
button 返回一个数值，标识按下的鼠标按键

* 0: 主按键，通常指鼠标左键或默认值
* 1: 辅助按键，通常指鼠标滚轮中键
* 2: 次按键，通常指鼠标右键
* 3: 第四个按钮，通常指浏览器后退按钮（一般用不到）
* 4: 第五个按钮，通常指浏览器的前进按钮（一般用不到）

buttons 返回一个数值，标识鼠标按下的一个或者多个按键.如果按下的键为多个，则值等于所有按键对应数值进行相加运算的结果

* 0: 没有按键或者是没有初始化
* 1: 鼠标左键
* 2: 鼠标右键
* 4: 鼠标滚轮或者是中键
* 8: 第四按键，通常指浏览器后退按钮
* 16: 第五按键，通常指浏览器的前进按钮

示例：
1.先按下鼠标左键，button = 0，buttons = 1
2.再按下鼠标右键，button = 2，buttons = 3 即buttons = 1+2
3.接着按下鼠标中键，button = 1，buttons = 7 即buttons = 1+2+4
```
