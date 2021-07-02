# 浏览器中事件的触发顺序

> 在浏览器中，同一个 DOM 元素可以绑定多个事件，这些事件并不是同时触发的，它们的触发是有顺序的。

## pc端浏览器

```javascript
function bindEvent() {
  let btn = document.getElementById('btn')

  btn.onfocus = function() {
    console.log('onfocus')
  }
  btn.onmouseover = function() {
    console.log('onmouseover')
  }
  btn.onmousedown = function() {
    console.log('onmousedown')
  }
  btn.onmouseout = function() {
    console.log('onmouseout')
  }
  btn.onmouseup = function() {
    console.log('onmouseup')
  }
  btn.onclick = function() {
    console.log('onclick')
  }
  btn.onblur = function() {
    console.log('onblur')
  }
}
// --------------- 得到的结果如下 ---------------
// 1.onmouseover
// 2.onmousedown
// 3.onfocus
// 4.onmouseup
// 5.onclick
// 6.onmouseout
// 7.onblur
```

## mobile端浏览器

```javascript
function bindEvent() {
  let btn = document.getElementById('btn')

  btn.onfocus = function() {
    console.log('onfocus')
  }
  btn.onmouseover = function() {
    console.log('onmouseover')
  }
  btn.onmouseout = function() {
    console.log('onmouseout')
  }
  btn.onmousedown = function() {
    console.log('onmousedown')
  }
  btn.onmouseup = function() {
    console.log('onmouseup')
  }
  btn.onclick = function() {
    console.log('onclick')
  }
  btn.onblur = function() {
    console.log('onblur')
  }
  // mobile端增加了touch事件
  btn.ontouchstart = function() {
    console.log('ontouchstart')
  }
  btn.ontouchend = function() {
    console.log('ontouchend')
  }
  btn.ontouchmove = function() {
    console.log('ontouchmove')
  }
  btn.ontouchcancel = function() {
    console.log('ontouchcancel')
  }
}
```

## MDN Web Docs上的官方介绍

![eventOrder](/front/dom/eventOrder.png)

# 事件冒泡中的mouse事件与touch事件的关系

```html
<div id="parent">
  parent
  <div id="child">点击我</div>
</div>
<script>
  let parentEle = document.getElementById('parent')
  let childEle = document.getElementById('child')

  parentEle.addEventListener('mousedown', () => {
    console.log('parent mousedown')
  })
  parentEle.addEventListener('mousemove', () => {
    console.log('parent mousemove')
  })
  parentEle.addEventListener('mouseup', () => {
    console.log('parent mouseup')
  })
  parentEle.addEventListener('touchstart', () => {
    console.log('parent touchstart')
  })
  parentEle.addEventListener('touchmove', () => {
    console.log('parent touchmove')
  })
  parentEle.addEventListener('touchend', () => {
    console.log('parent touchend')
  })
  parentEle.addEventListener('click', () => {
    console.log('parent click')
  })

  childEle.addEventListener('mousedown', () => {
    console.log('child mousedown')
  })
  childEle.addEventListener('mousemove', () => {
    console.log('child mousemove')
  })
  childEle.addEventListener('mouseup', () => {
    console.log('child mouseup')
  })
  childEle.addEventListener('touchstart', () => {
    console.log('child touchstart')
  })
  childEle.addEventListener('touchmove', () => {
    console.log('child touchmove')
  })
  childEle.addEventListener('touchend', () => {
    console.log('child touchend')
  })
  childEle.addEventListener('click', () => {
    console.log('child click')
  })
  
  // -------------- 在pc端执行结果 --------------

  // 1.pc端无touch相关事件，所以touchstart，touchmove，touchend事件无响应
  // 2.点击子元素，先移动到元素上所以触发mousemove事件并冒泡到父元素上，然后
  // 点击依次触发mousedown并冒泡，触发mousemove并冒泡 触发mouseup并冒泡，触发click并冒泡。
  // 3.注意会先执行冒泡事件然后再执行下一个触发事件

  // 1.child mousemove
  // 2.parent mousemove
  // 3.child mousedown
  // 4.parent mousedown
  // 5.child mousemove
  // 6.parent mousemove
  // 7.child mouseup
  // 8.parent mouseup
  // 9.child click
  // 10.parent click

  // -------------- 在mobile端执行结果 --------------

  // 1.在移动端mouse相关事件只有在点击的时候有效。
  // 2.如果没有touch事件，只有mouse事件，点击子元素时会依次触发mousemove，mousedown，mouseup，click，冒泡与pc端一致
  // 3.如果有touch事件，快速点击一次子元素时，会依次触发touchstart，click，touchend，冒泡与pc端一致
  // 4.如果有touch事件，长按再松开子元素时，会依次触发touchstart，mousedown，touchend，冒泡与pc端一致
  // 5.如果有touch事件，按住拖动再松开子元素时，mouse相关事件和click事件不会触发，只会依次触发touchstart，touchmove，touchend，冒泡与pc端一致
</script>
```