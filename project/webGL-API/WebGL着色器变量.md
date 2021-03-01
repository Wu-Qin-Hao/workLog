> 着色器语言和C语言一样，通过一个表示特定数据类型的关键词声明一个变量，比如int num;通过int关键字声明一个整数型变量num，不过着色器语言还提供了三个关键字attribute、uniform和varying用来声明特定用途的变量。


关键字(变量类型) | 数据传递                     | 声明变量
---             | ---                         |   ---
attribute       | javascript——>顶点着色器      | 声明顶点数据变量
uniform         | javascript——>顶点、片元着色器 | 声明非顶点数据变量
varying         | 顶点着色器——>片元着色器       | 声明需要插值计算的顶点变量


# attribute

```javascript
  // attribute声明顶点位置变量
  attribute vec4 a_position;
  // attribute声明顶点颜色变量
  attribute vec4 a_color;
  // attribute声明顶点法向量
  attribute vec4 a_normal;
  // 与顶点相关的浮点数
  attribute float a_scale;
```

# uniform

> 注意如果是顶点相关的变量，比如顶点位置、顶点颜色等顶点数据相关变量不能使用关键字uniform去声明，主要是顶点的数据往往不是一个，通常有很多个顶点，而且这些顶点都要逐顶点执行main函数中的程序，所以为了声明顶点数据相关的变量，着色器语言规定了一个新的关键字attribute。

```javascript
  uniform vec4 u_Translation
```

https://blog.csdn.net/u014291990/article/details/103113179