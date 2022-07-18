> WebGLRenderingContext 接口提供基于 OpenGL ES 2.0 的绘图上下文，用于在 HTML `<canvas>` 元素内绘图

# 获取

```javascript
// 1.获取canvas元素
const canvas = document.getElementById("glcanvas");

// 2.获取webgl绘图上下文
const gl = canvas.getContext("webgl");
```

# 基础

## 1. clearColor()

> WebGLRenderingContext.clearColor() 方法用于设置清空颜色缓冲时的颜色值。这指定调用 clear() 方法时使用的颜色值。

```javascript
/**
 * @param {Number} red 一个 GLclampf 类型的值，指定清除缓冲时的红色值(0.0-1.0)。默认值：0.0
 * @param {Number} green 一个 GLclampf 类型的值，指定清除缓冲时的绿色值(0.0-1.0)。默认值：0.0
 * @param {Number} blue 一个 GLclampf 类型的值，指定清除缓冲时的蓝色值(0.0-1.0)。默认值：0.0
 * @param {Number} alpha 一个 GLclampf 类型的值，指定清除缓冲时的不透明度(0.0-1.0)。默认值：0.0
 */
void gl.clearColor(red, green, blue, alpha);
```

## 2. clear()

> WebGLRenderingContext.clear() 方法使用预设值来清空缓冲。

```javascript
/**
 * @param mask 一个用于指定需要清除的缓冲区的 GLbitfield 。可能的值有：
 * gl.COLOR_BUFFER_BIT   // 颜色缓冲区
 * gl.DEPTH_BUFFER_BIT   // 深度缓冲区
 * gl.STENCIL_BUFFER_BIT  // 模板缓冲区
 */
void gl.clear(mask);
```

# 3. drawArrays()

> WebGLRenderingContext.drawArrays() 方法用于从向量数组中绘制图元。

```javascript
/**
 * @param mode GLenum 类型，指定绘制图元的方式，可能值如下:
 * gl.POINTS: 绘制一系列点。
 * gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
 * gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
 * gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
 * gl.TRIANGLE_STRIP：绘制一个三角带。
 * gl.TRIANGLE_FAN：绘制一个三角扇。
 * gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。
 * @param first GLint 类型，指定从哪个点开始绘制。
 * @param count GLsizei 类型，指定绘制需要使用到多少个点
 */
void gl.drawArrays(mode, first, count);
```

---

# 着色器

## 1. createShader()

> WebGLRenderingContext.createShader() 用于创建一个 WebGLShader 着色器对象，该对象可以使用 WebGLRenderingContext.shaderSource() 和 WebGLRenderingContext.compileShader() 方法配置着色器代码

```javascript
/**
 * @param type 参数为gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER两者中的一个
 * gl.VERTEX_SHADER   // 用于创建顶点着色器
 * gl.FRAGMENT_SHADER   // 用于创建片段着色器
 */
WebGLShader gl.createShader(type);
```

## 2. shaderSource()

> WebGLRenderingContext.shaderSource() 方法用于设置 WebGLShader 着色器（顶点着色器及片元着色器）的 GLSL 程序代码

```javascript
/**
 * 将source指定的字符串形式的代码传入shader指定的着色器。如果之前已经向shader传入过代码了，旧的代码将会被替代掉
 * @param shader 用于设置程序代码的 WebGLShader （着色器对象）
 * @param source 包含GLSL程序代码的字符串
 */
void gl.shaderSource(shader, source);
```

## 3. compileShader()

> WebGLRenderingContext.compileShader() 用于编译一个 GLSL 着色器，使其成为为二进制数据，然后就可以被 WebGLProgram 对象所使用

```javascript
/**
 * @param shader 一个片元或顶点着色器 （WebGLShader）
 */
void gl.compileShader(shader);
```

## 4. createProgram()

> WebGLRenderingContext.createProgram() 方法用于创建和初始化一个 WebGLProgram 对象

```javascript
WebGLProgram gl.createProgram();
```

## 5. attachShader()

> WebGLRenderingContext.attachShader() 方法负责往 WebGLProgram 添加一个片段或者顶点着色器

```javascript
/**
 * @param program 一个 WebGLProgram 对象
 * @param shader 一个类型为片段或者顶点的 WebGLShader
 */
void gl.attachShader(program, shader);
```

## 6. linkProgram()

> WebGLRenderingContext.linkProgram() 方法链接给定的 WebGLProgram，从而完成为程序的片元和顶点着色器准备 GPU 代码的过程

```javascript
/**
 * @param program 一个用于链接的 WebGLProgram
 */
void gl.linkProgram(program);
```

## 7. useProgram()

> WebGLRenderingContext.useProgram() 方法将定义好的 WebGLProgram 对象添加到当前的渲染状态中

```javascript
/**
 * @param program 需要添加的WebGLProgram对象
 */
void gl.useProgram(program);
```

## 8. getAttribLocation()

> WebGLRenderingContext.getAttribLocation() 方法返回了给定 WebGLProgram 对象中某属性的下标指向位置（获取由 name 参数指定的 attribute 变量的存储地址）

```javascript
  /**
   * @param program 一个包含了属性参数的 WebGLProgram 对象（指定包含顶点着色器和片元着色器的着色器程序对象）
   * @param name 需要获取下标指向位置的属性参数名(string类型)
   * 返回值： 表明属性位置的下标（attribute变量的存储地址），GLint 数字，如果找不到该属性则返回-1
   */
  GLint gl.getAttribLocation(program, name);
```

## vertexAttrib3f()

```javascript
/**
 * 将数据(v0, v1, v2)传给由 index 参数指定的 attribute 变量
 * @param index 指定将要修改的 attribute 变量的存储位置（即gl.getAttribLocation()的返回值）
 * @param v0 指定填充 attribute 变量第一个分量的值（浮点型数值，X坐标）
 * @param v1 指定填充 attribute 变量第二个分量的值（浮点型数值，Y坐标）
 * @param v2 指定填充 attribute 变量第三个分量的值（浮点型数值，Z坐标）
 */
void gl.vertexAttrib3f(index, v0, v1, v2);
```

## 9. vertexAttrib[1234]f[v]()

> WebGLRenderingContext.vertexAttrib[1234]f[v]() 方法可以为顶点 attibute 变量赋值

```javascript
/**
 * @param index GLuint 类型，指定了待修改顶点attribute变量的存储位置
 * @param v0, v1, v2, v3 浮点数类型Number，用于设置顶点attibute变量的各分量值
 * @param value Float32Array 类型，用于设置顶点attibute变量的向量值
 */
void gl.vertexAttrib1f(index, v0);
void gl.vertexAttrib2f(index, v0, v1);
void gl.vertexAttrib3f(index, v0, v1, v2);
void gl.vertexAttrib4f(index, v0, v1, v2, v3);

void gl.vertexAttrib1fv(index, value);
void gl.vertexAttrib2fv(index, value);
void gl.vertexAttrib3fv(index, value);
void gl.vertexAttrib4fv(index, value);

// 示例
const a_foobar = gl.getAttribLocation(shaderProgram, "foobar");
// 分别设置每个组件:
gl.vertexAttrib3f(a_foobar, 10.0, 5.0, 2.0);
// or提供一个Float32Array:
const floatArray = new Float32Array([10.0, 5.0, 2.0]);
gl.vertexAttrib3fv(a_foobar, floatArray);
```

---

# 缓冲区对象

# 1. createBuffer()

> WebGLRenderingContext.createBuffer() 方法可创建并初始化一个用于储存顶点数据或着色数据的 WebGLBuffer 对象

```javascript
  /**
   * 返回值：一个用于储存顶点数据或着色数据的WebGLBuffer对象
   */
  WebGLBuffer gl.createBuffer();
```

# 2. bindBuffer()

> WebGLRenderingContext.bindBuffer() 方法将给定的 WebGLBuffer 绑定到目标。这个‘目标’表示缓冲区对象的用途。

```javascript
/**
 * @param target GLenum 指定绑定点(target)。可能的值：
 * gl.ARRAY_BUFFER: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
 * gl.ELEMENT_ARRAY_BUFFER: 用于元素索引的Buffer。
 * @param buffer 要绑定的 WebGLBuffer
 */
void gl.bindBuffer(target, buffer);
```

# 3. bufferData()

> WebGLRenderingContext.bufferData() 方法创建并初始化了 Buffer 对象的数据存储区

```javascript
/**
 * @param target GLenum 指定Buffer绑定点（目标）。可取以下值：
 * gl.ARRAY_BUFFER: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
 * gl.ELEMENT_ARRAY_BUFFER: 用于元素索引的Buffer。
 * @param srcData 一个ArrayBuffer，SharedArrayBuffer 或者 ArrayBufferView 类型的数组对象，将被复制到Buffer的数据存储区。 如果为null，数据存储区仍会被创建，但是不会进行初始化和定义。
 * @param usage GLenum 表示程序将如何使用存储在缓冲区对象中的数据。该参数将帮助webGL优化操作，但是就算传入了错误的值，也不会终止程序（仅仅是降低程序的效率）：
 * gl.STATIC_DRAW: 只会向缓冲区对象中写入一次数据，但需要绘制很多次。
 * gl.DYNAMIC_DRAW: 会向缓冲区对象中多次写入数据，并绘制很多次。
 * gl.STREAM_DRAW: 只会向缓冲区对象中写入一次数据，然后绘制若干次。
 */
void gl.bufferData(target, srcData, usage);
```

# 4. vertexAttribPointer()

> WebGLRenderingContext.vertexAttribPointer() 将绑定到 gl.ARRAY_BUFFER 的缓冲区对象分配给由 index 指定的 attribute 变量, 告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。

```javascript
/**
 * @param index 指定待分配attribute变量的存储位置。
 * @param size 指定每个顶点属性的组成数量，必须是1，2，3或4。
 * @param type 指定数组中每个元素的数据类型可能是：
 * gl.BYTE: 字节，Int8Array
 * gl.UNSIGNED_BYTE: 无符号字节，Uint8Array
 * gl.SHORT: 短整型，Int16Array
 * gl.UNSIGNED_SHORT: 无符号短整型，Uint16Array
 * gl.INT: 整型，Int32Array
 * gl.UNSIGNED_INT: 无符号整型，Uint32Array
 * gl.FLOAT: 浮点型，Float32Array
 * @param normalized 当转换为浮点数时是否应该将整数数值归一化到特定的范围。
 * 对于类型gl.BYTE和gl.SHORT，如果是true则将值归一化为[-1, 1]
 * 对于类型gl.UNSIGNED_BYTE和gl.UNSIGNED_SHORT，如果是true则将值归一化为[0, 1]
 * 对于类型gl.FLOAT此参数无效
 * @param stride 一个GLsizei，以字节为单位指定连续顶点属性开始之间的偏移量(即数组中一行长度)。不能大于255。如果stride为0，则假定该属性是紧密打包的，即不交错属性，每个属性在一个单独的块中，下一个顶点的属性紧跟当前顶点之后。
 * @param offset GLintptr指定顶点属性数组中第一部分的字节偏移量。必须是类型的字节长度的倍数。
 */
void gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
```

# 5. enableVertexAttribArray()

> WebGLRenderingContext.enableVertexAttribArray() 方法使顶点着色器能够访问缓冲区内的数据（需要手动执行开启）。

> 在 WebGL 中，作用于顶点的数据会先储存在 attributes。这些数据仅对 JavaScript 代码和顶点着色器可用。属性由索引号引用到 GPU 维护的属性列表中。在不同的平台或 GPU 上，某些顶点属性索引可能具有预定义的值。创建属性时，WebGL 层会分配其他属性。
> 无论怎样，都需要你使用 enableVertexAttribArray()方法，来激活每一个属性以便使用，不被激活的属性是不会被使用的。一旦激活，以下其他方法就可以获取到属性的值了，包括 vertexAttribPointer()，vertexAttrib()，和 getVertexAttrib()。

```javascript
/**
 * @param index 类型为GLuint 的索引，指向要激活的顶点属性。如果您只知道属性的名称，不知道索引，您可以使用以下方法来获取索引getAttribLocation().
 */
void gl.enableVertexAttribArray(index);
```

---
