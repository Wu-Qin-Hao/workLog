> https://react.docschina.org/ https://www.taniarascia.com/getting-started-with-react/

# 组件的Props & State & 生命周期

## State

* 1.State 是组件私有的，并且完全受控于当前组件(State 存储当前组件的一些状态(变量值)并可修改)。
* 2.直接修改 State 的无效，class组件中使用setState()，函数式组件中使用 HOOK 相对应的方法。
* 3.有 State 的组件叫有状态组件，无 State 的组件叫无状态组件。
* 4.不管是父组件还是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心其它组件是 函数 组件还是 class 组件。（所以除了组件本身，其他组件都无法访问，即 State 是局部的或封装的）。
* 5.但是组件可以把 State 作为 Props 向下传递到它的子组件中, 子组件会在其 Props 中接收参数，但是子组件本身无法知道它是来自于父组件的 State 还是 Props 或手动输入的。
* 6.这叫做“自上而下”或是“单向”的数据流。任何的 State 总是所属于特定的组件，而且从该 State 派生的任何数据或 UI 只能影响它们的子组件。

## 生命周期

```javascript
// class组件使用
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.timerID = null;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

```javascript
// 函数式组件使用
import { useState, useEffect } from 'react';

const Clock = () => {
  const [date, setDate] = useState();
  let timerID = null;

  tick() {
    setDate(new Date())
  }

  useEffect(() => {
    timerID = setInterval(
      () => tick(),
      1000
    );
    // 组件销毁时
    return () => {
      clearInterval(timerID);
    };
  }, [])

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  )
}
```

# HOOK

## 为什么使用 HOOK

- 1.在不编写 class 组件的情况下使用 state 和 react 其它特性(生命周期等)
- 2.class 组件之间复用状态逻辑很难（函数式组件的 HOOK 可以使你在无需修改组件结构的情况下复用状态逻辑）
- 3.class 复杂组件变得难以理解（componentDidMount 和 componentDidUpdate 中获取数据，但是，同一个 componentDidMount 中可能也包含很多其它的逻辑。）相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。
- 4.函数式组件的 Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。
- 5.从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。
- 6.总结来说 HOOK 是函数式组件中的一大优化，解决不少 class 组件问题。（class 组件和函数式组件并不冲突，用函数式组件的 HOOK 写的代码更美）

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

## react 子组件通知父组件

- 1.在 vue 中是通过自定义事件来完成的
- 2.在 react 设计哲学中，组件间通信都是基于 props，所以这里同样是通过 props 传递消息，只是让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可

```javascript
import { useState } from 'react';

const CounterButton = (props) => {
  const { operator, btnClick } = props;
  return <button onClick={btnClick}>{operator}</button>
}

const App = () => {
  const [counter, setCounter] = useState();

  changeCounter(count) {
    setCounter({
      counter: counter + count
    })
  }

  return (
    <div>
      <h2>当前计数: {counter}</h2>
      <CounterButton operator="+1" btnClick={e => changeCounter(1)} />
      <CounterButton operator="-1" btnClick={e => changeCounter(-1)} />
    </div>
  )
}
```
