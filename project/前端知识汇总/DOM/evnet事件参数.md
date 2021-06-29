# MouseEvent鼠标事件

> MouseEvent 接口指用户与指针设备( 如鼠标 )交互时发生的事件。使用此接口的常见事件包括：click，dblclick，mouseup，mousedown。

> MouseEvent 派生自 UIEvent，UIEvent 派生自 Event。

绑定mousedown事件返回的event是MouseEvent对象

## 构造函数

MouseEvent() 生成一个新的MouseEvent对象

## 属性

```javascript
// MouseEvent对象上的属性都是只读属性
{
  altKey: '如果alt 键被按下，返回true',
  bubbles: '布尔值，用来表示该事件是否会在 DOM 中冒泡',
  button: '如果鼠标按钮按下，将会返回一个数值',
  buttons: '如果一个或多个鼠标按钮按下，将会返回一个或多个鼠标按键只相加后的数值',
  cancelBubble: '布尔值，表示该事件的冒泡是否被取消',
  cancelable: '布尔值，表示事件是否可以取消',
  clientX: '鼠标指针在点击元素（DOM）中的X坐标--应用客户端区域的水平坐标（与页面坐标不同）',
  clientY: '鼠标指针在点击元素（DOM）中的Y坐标--应用客户端区域的垂直坐标（与页面坐标不同）',
}
```

### button和buttons关系

```javascript
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
