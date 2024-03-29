# 着色器是什么

> 在三维场景中，仅仅使用线条和颜色把图形画出来是远远不够的，必须考虑，当观察者角度发生变化或光线照上去后，对场景会有什么影响。着色器可以高度灵活地完成这些工作，提供各种渲染效果。

> 用 WebGL 进行绘图就必须使用着色器。WebGL 需要两种着色器：顶点着色器和片元着色器。

## 顶点着色器

- 1.进行逐顶点处理过程的程序
- 2.顶点着色器用来描述顶点特性，例如位置等
- 3.顶点是指二维或三维空间中的一个点，比如二维或三维图形的端点或交点

## 片元着色器

- 1.进行逐片元处理过程的程序
- 2.片元着色器用来描述片元特性，例如光照等
- 3.片元是一个 WebGL 术语，可以理解为像素（图像的单元）

# 着色器变量

> 着色器语言和 C 语言一样，通过一个表示特定数据类型的关键词声明一个变量，比如 int num;通过 int 关键字声明一个整数型变量 num，不过着色器语言还提供了三个关键字 attribute、uniform 和 varying 用来声明特定用途的变量。

| 关键字(变量类型) | 数据传递                      | 声明变量                   |
| ---------------- | ----------------------------- | -------------------------- |
| attribute        | javascript——>顶点着色器       | 声明顶点数据变量           |
| uniform          | javascript——>顶点、片元着色器 | 声明非顶点数据变量         |
| varying          | 顶点着色器——>片元着色器       | 声明需要插值计算的顶点变量 |

# vec4()

> 着色器提供的内置函数 vec4()，帮助你创建 vec4 类型的变量

```javascript
/**
 * 根据 v0, v1, v2, v3 创建 vec4 对象
 * @param (v0, v1, v2, v3) 指定4个浮点型分量
 * @return 返回v0, v1, v2, v3 组成的 vec4 对象
 */
vec4 vec4(v0, v1, v2, v3)
```

# attribute

> 与顶点相关的数据。attribut变量是一种GLSL变量，被用来从外部向顶点着色器内传输数据，只有顶点着色器才能使用它。

## 使用attribute变量流程

- 1.在顶点着色器中，声明attribute变量
- 2.将attribute变量赋值给gl_Position变量
- 3.向attribute变量传输数据

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

> 注意如果是顶点相关的变量，比如顶点位置、顶点颜色等顶点数据相关变量不能使用关键字 uniform 去声明，主要是顶点的数据往往不是一个，通常有很多个顶点，而且这些顶点都要逐顶点执行 main 函数中的程序，所以为了声明顶点数据相关的变量，着色器语言规定了一个新的关键字 attribute。

```javascript
  uniform vec4 u_Translation
```

https://blog.csdn.net/u014291990/article/details/103113179
