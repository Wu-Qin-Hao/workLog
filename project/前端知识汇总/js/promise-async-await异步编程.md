> 对于没有见过的东西，人会排斥，因为内心会恐惧。 所以先阅读张鑫旭的这篇文章有个感性的认知 https://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/

# 异步同步

## 单线程 

**Javascript语言的执行环境是单线程（single thread）**

* 1.作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。

* 2.若以多线程的方式操作这些DOM，则可能出现操作的冲突。假设有两个线程同时操作一个DOM元素，线程1要求浏览器删除DOM，而线程2却要求修改DOM样式，这时浏览器就无法决定采用哪个线程的操作。

* 3.单线程就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务。

* 4.因为JavaScript是单线程的，有一个致命问题是在某一时刻内只能执行特定的一个任务，并且会阻塞其它任务执行，为了解决这个问题，Javascript语言将任务的执行模式分成同步（Synchronous）和异步（Asynchronous），在遇到类似I/O等耗时的任务时js会采用异步操作，而此时异步操作不进入主线程、而进入"任务队列"，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行，这时就不会阻塞其它任务执行，而这种模式称为js的事件循环机制(Event Loop)。

## 同步

调用者发出调用后，在没有得到结果之前，该调用就不返回。后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的，具有同步关系的一组任务相互发送的信息称为消息或事件。

![sync](/front/js/sync.png)

## 异步

调用者发出调用后不会立刻得到结果，该调用就返回了。每一个任务有一个或多个回调函数（callback）,前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的，线程就是实现异步的一个方式，异步是让调用方法的主线程不需要同步等待另一线程的完成，从而可以让主线程干其它的事情。

![async](/front/js/async.png)

## 阻塞

指调用结果返回之前，调用者会进入阻塞状态等待。只有在得到结果之后才会返回。

## 非阻塞

指在不能立刻得到结果之前，该函数不会阻塞当前线程，而会立刻返回。

## 事件循环机制

* 1.所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
* 2.主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
* 3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
* 4.主线程不断重复上面的第三步，形成一个事件的循环。

![eventLoop](/front/js/eventLoop.png)

# 回调函数

> 回调函数是作为参数传递给另一个函数并在其父函数完成后执行的函数。

有两个任务函数taskFun1和taskFun2，如果按同步方式写

```javascript
function taskFun1() {
  // do something
}
function taskFun2() {
  // do something
}

taskFun1()
taskFun2()
```

taskFun1()如果是一个很耗时的任务，会严重阻塞taskFun2()的执行，用回调函数可以这样写：

```javascript
function taskFun1(callbackFun){
　setTimeout(function () {
　　// do something
　　callbackFun()
　}, 3000)
}
function taskFun2() {
  // do something
}

taskFun1(taskFun2)
```

优点：简单、容易理解
缺点：不利于代码的阅读和维护，各个部分之间高度耦合，流程会很混乱，而且每个任务只能指定一个回调函数。

# Promise

> 回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。当有多重嵌套时代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。这种情况就称为"回调地狱"（callback hell）。

> Promise就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的横向加载，改成纵向加载。

> Promise 是异步编程的一种解决方案，比传统的解决方案——**回调函数和事件**——更合理和更强大。

上面的回调使用Promise来实现如下

```javascript
function taskFun1() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
  　　// do something

      if (/* 异步操作成功 */){
        resolve(value)
      } else {
        reject(error)
      }
  　}, 3000)
  })
}
function taskFun2() {
  // do something
}

taskFun1().then(() => {
  taskFun2()
}).catch(() => {
  // 处理异常
})
```

优点：回调函数变成了链式写法，程序的流程可以看得很清楚，可以实现许多强大的功能，同时还可以捕获到catch异常。
缺点：写法和理解起来都相对费劲

## 概念

* 1.Promise 是一个对象，它代表了一个异步操作的最终结果是完成还是失败。
* 2.Promise 保存着某个未来才会结束的事件，被创建出来时并不知其结果，所以可以让你把异步操作的最终结果与相应的处理程序关联起来。
* 3.Promise 可以使异步方法像同步方法那样使用返回值。
* 4.Promise 本质上是一个函数的返回对象，可以在它上面绑定回调函数，这样就不需要一开始把回调函数作为参数传入

### Promise对象有以下两个特点

**（1）对象的状态不受外界影响**

Promise对象代表一个异步操作，有三种状态：

进行中（pending）: 初始状态，既没有被兑现，也没有被拒绝。
已成功（fulfilled）: 意味着操作成功完成。resolve
已失败（rejected）: 意味着操作失败。reject

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

**（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。**

Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。即已经resolve或reject。

如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

Promise无法取消，一旦新建它就会立即执行，无法中途取消。

## 基本使用

ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

```javascript
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

const promise = new Promise(function(resolve, reject) {
  // resolve函数的作用是，将Promise对象的状态从'未完成'变为'成功'（即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去.
  // reject函数的作用是，将Promise对象的状态从'未完成'变为'失败'（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去.

  // ... some code

  if (/* 异步操作成功 */) {
    resolve(value)
  } else {
    reject(error)
  }
})

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
// 这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。
promise.then(function(value) {
  // success
  // 第一个回调函数是Promise对象的状态变为resolved时调用
}, function(error) {
  // failure
  // 第二个回调函数是Promise对象的状态变为rejected时调用
})
```

## 特性

### Promise 新建后就会立即执行

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise')
  resolve()
})

promise.then(function() {
  console.log('resolved.')
})

console.log('Hi!')

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

### 调用resolve或reject并不会终结 Promise 的参数函数的执行

```javascript
new Promise((resolve, reject) => {
  resolve(1)
  console.log(2)
}).then(r => {
  console.log(r)
})

// 2
// 1
```

上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

```javascript

new Promise((resolve, reject) => {
  return resolve(1)
  // 后面的语句不会执行
  console.log(2)
})
```

## Promise原型对象方法

### Promise.prototype.then()

* 1.Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。
* 2.then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。
* 3.then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

```javascript
getJSON("/post/1.json")
.then((post) => {
    return getJSON(post.commentURL)
  })
.then((comments) => {
    console.log("resolved: ", comments)
  }, (err) => {
    console.log("rejected: ", err)
  })
```

上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。

### Promise.prototype.catch()

* 1.Promise 实例具有catch方法，也就是说，catch方法是定义在原型对象Promise.prototype上的。
* 2.Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error)
})

// 上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。

p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err))
// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err))
```

**promise抛出一个错误，就被catch()方法指定的回调函数捕获**

```javascript
const promise = new Promise(function(resolve, reject) {
  throw new Error('test')
})
promise.catch(function(error) {
  console.log(error)
})
// Error: test

// 抛出错误的另外两种写法如下

// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test')
  } catch(e) {
    reject(e)
  }
})
promise.catch(function(error) {
  console.log(error)
})

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'))
})
promise.catch(function(error) {
  console.log(error)
})

// 比较上面两种写法，可以发现reject()方法的作用，等同于抛出错误。
```

**如果 Promise 状态已经变成resolved，再抛出错误是无效的。**

```javascript
// 因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});

promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

**Promise 对象的错误具有'冒泡'性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。**

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

**一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。**

```javascript
// bad
promise.then(function(data) {
  // success
}, function(err) {
  // error
});

// good
promise.then(function(data) {
  // success
}).catch(function(err) {
  // error
});
```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch()方法，而不使用then()方法的第二个参数。

**如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。**

```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

上面代码中，someAsyncThing()函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

**一般总是建议，Promise 对象后面要跟catch()方法，这样可以处理 Promise 内部发生的错误。**

```javascript
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

上面代码中，Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。

```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```

上面代码中，catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。

```javascript
Promise.resolve()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// carry on
```

上面代码中，因为没有报错，跳过了catch()方法，直接执行后面的then()方法。此时，要是then()方法里面报错，就与前面的catch()无关了。

**catch()方法之中，还能再抛出错误**

```javascript
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

上面代码中，第二个catch()方法用来捕获前一个catch()方法抛出的错误。

## Promise.prototype.finally()

* 1.Promise 实例具有finally方法，也就是说，finally方法是定义在原型对象Promise.prototype上的。
* 2.finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
* 3.finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。