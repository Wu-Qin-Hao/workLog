# HOOK

## useRef

```javascript
const refContainer = useRef(initialValue);
```

```javascript
function TextInputWithFocusButton() {

  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  
  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

> useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

## useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps]);
```

```javascript
function FancyInput(props, ref) {

  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

> useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

# 高级

## react 组件对外提供方法

```javascript
/* ChildComp子组件 */
import { useState, useImperativeHandle, forwardRef } from 'react';

// props子组件中需要接受ref
const ChildComp = (props, ref) => {
  const [val, setVal] = useState();

  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    changeVal: (newVal) => {
      setVal(newVal);
    },
  }));

  return <div>{val}</div>;
};
ChildComp = forwardRef(ChildComp);

export default ChildComp;
```

```javascript
/* FComp 父组件 */
import { useRef } from 'react';

const FatherComp = () => {
  const childRef = useRef();

  const updateChildState = () => {
    // changeVal就是子组件暴露给父组件的方法
    childRef.current.changeVal(99);
  };

  return (
    <>
      <ChildComp ref={childRef} />
      <button onClick={updateChildState}>触发子组件方法</button>
    </>
  );
};

export default FatherComp;
```

### 分析

- 1.父组件通过调用 useRef 创建了一个 ref 并将其赋值给 childRef 变量。
- 2.通过指定 ref 为 JSX 属性，将其向下传递给 `<ChildComp ref={childRef} />`子组件。
- 3.子组件使用 forwardRef 来获取传递给它的 ref; forwardRef 内函数 (props, ref) => {}，作为其第二个参数。
- 4.通过 useImperativeHandle 自定义暴露给父组件的方法。
- 5.父组件通过 ref 调用子组件中暴露给父组件的方法。
