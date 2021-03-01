
> WebGLRenderingContext 接口提供基于 OpenGL ES 2.0 的绘图上下文，用于在HTML `<canvas>` 元素内绘图

# 获取

```javascript
  // 1.获取canvas元素
  const canvas = document.getElementById('glcanvas')

  // 2.获取webgl绘图上下文
  const gl = canvas.getContext('webgl')
```

# 1. clearColor()

> WebGLRenderingContext.clearColor() 方法用于设置清空颜色缓冲时的颜色值。这指定调用 clear() 方法时使用的颜色值。这些值在0到1的范围间

```javascript
  /**
   * @param {Number} red 一个 GLclampf 类型的值，指定清除缓冲时的红色值。默认值：0
   * @param {Number} green 一个 GLclampf 类型的值，指定清除缓冲时的绿色值。默认值：0
   * @param {Number} blue 一个 GLclampf 类型的值，指定清除缓冲时的蓝色值。默认值：0
   * @param {Number} alpha 一个 GLclampf 类型的值，指定清除缓冲时的不透明度。默认值：0
   */
  void gl.clearColor(red, green, blue, alpha);
```

# 2. clear()

> WebGLRenderingContext.clear() 方法使用预设值来清空缓冲。

```javascript
  /**
   * @param mask 一个用于指定需要清除的缓冲区的 GLbitfield 。可能的值有：
   * gl.COLOR_BUFFER_BIT   //颜色缓冲区
   * gl.DEPTH_BUFFER_BIT   //深度缓冲区
   * gl.STENCIL_BUFFER_BIT  //模板缓冲区
   */
  void gl.clear(mask);
```

# 3. getAttribLocation()

> WebGLRenderingContext.getAttribLocation() 方法返回了给定WebGLProgram对象中某属性的下标指向位置

```javascript
  /**
   * @param program 一个包含了属性参数的 WebGLProgram 对象
   * @param name 需要获取下标指向位置的 DOMString(string类型) 属性参数名
   * 返回值： 表明属性位置的下标 GLint 数字，如果找不到该属性则返回-1
   */
  GLint gl.getAttribLocation(program, name);
```

# 4. vertexAttrib[1234]f[v]()

> WebGLRenderingContext.vertexAttrib[1234]f[v]() 方法可以为顶点attibute变量赋值

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
  const a_foobar = gl.getAttribLocation(shaderProgram, 'foobar');
  // 分别设置每个组件:
  gl.vertexAttrib3f(a_foobar, 10.0, 5.0, 2.0);
  // or提供一个Float32Array:
  const floatArray = new Float32Array([10.0, 5.0, 2.0]);
  gl.vertexAttrib3fv(a_foobar, floatArray);
```

# 5. drawArrays()

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

# 6. createBuffer()

> WebGLRenderingContext.createBuffer() 方法可创建并初始化一个用于储存顶点数据或着色数据的WebGLBuffer对象

```javascript
  /**
   * 返回值：一个用于储存顶点数据或着色数据的WebGLBuffer对象 
   */
  WebGLBuffer gl.createBuffer();
```

# 7. bindBuffer()

> WebGLRenderingContext.bindBuffer() 方法将给定的WebGLBuffer绑定到目标

```javascript
  /**
   * @param target GLenum 指定绑定点(target)。可能的值：
   * gl.ARRAY_BUFFER: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
   * gl.ELEMENT_ARRAY_BUFFER: 用于元素索引的Buffer。
   * @param buffer 要绑定的 WebGLBuffer
   */
  void gl.bindBuffer(target, buffer);
```

# 8. bufferData()

> WebGLRenderingContext.bufferData() 方法创建并初始化了Buffer对象的数据存储区

```javascript
  /**
   * @param target GLenum 指定Buffer绑定点（目标）。可取以下值：
   * gl.ARRAY_BUFFER: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
   * gl.ELEMENT_ARRAY_BUFFER: 用于元素索引的Buffer。
   * @param srcData 一个ArrayBuffer，SharedArrayBuffer 或者 ArrayBufferView 类型的数组对象，将被复制到Buffer的数据存储区。 如果为null，数据存储区仍会被创建，但是不会进行初始化和定义。
   * @param usage GLenum 指定数据存储区的使用方法。可取以下值：
   * gl.STATIC_DRAW: 缓冲区的内容可能经常使用，而不会经常更改。内容被写入缓冲区，但不被读取。
   * gl.DYNAMIC_DRAW: 缓冲区的内容可能经常被使用，并且经常更改。内容被写入缓冲区，但不被读取。
   * gl.STREAM_DRAW: 缓冲区的内容可能不会经常使用。内容被写入缓冲区，但不被读取。
   */
  void gl.bufferData(target, srcData , usage);
```

# 9. vertexAttribPointer()

> 告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。

>  WebGLRenderingContext.vertexAttribPointer() 方法绑定当前缓冲区范围到gl.ARRAY_BUFFER,成为当前顶点缓冲区对象的通用顶点属性并指定它的布局(缓冲区对象中的偏移量)。

```javascript
  /**
   * @param index 指定要修改的顶点属性的索引。
   * @param size 指定每个顶点属性的组成数量，必须是1，2，3或4。
   * @param type 指定数组中每个元素的数据类型可能是：
   * gl.BYTE: 有符号的8位整数，范围[-128, 127]
   * gl.SHORT: 有符号的16位整数，范围[-32768, 32767]
   * gl.UNSIGNED_BYTE: 无符号的8位整数，范围[0, 255]
   * gl.UNSIGNED_SHORT: 无符号的16位整数，范围[0, 65535]
   * gl.FLOAT: 32位IEEE标准的浮点数
   * @param normalized 当转换为浮点数时是否应该将整数数值归一化到特定的范围。
   * 对于类型gl.BYTE和gl.SHORT，如果是true则将值归一化为[-1, 1]
   * 对于类型gl.UNSIGNED_BYTE和gl.UNSIGNED_SHORT，如果是true则将值归一化为[0, 1]
   * 对于类型gl.FLOAT此参数无效
   * @param stride 一个GLsizei，以字节为单位指定连续顶点属性开始之间的偏移量(即数组中一行长度)。不能大于255。如果stride为0，则假定该属性是紧密打包的，即不交错属性，每个属性在一个单独的块中，下一个顶点的属性紧跟当前顶点之后。
   * @param offset GLintptr指定顶点属性数组中第一部分的字节偏移量。必须是类型的字节长度的倍数。
   */
  void gl.vertexAttribPointer(index, size, type, normalized, stride, offset)
```

# 10. enableVertexAttribArray()

> WebGLRenderingContext.enableVertexAttribArray() 方法，可以打开属性数组列表中指定索引处的通用顶点属性数组。

> 在WebGL中，作用于顶点的数据会先储存在attributes。这些数据仅对JavaScript代码和顶点着色器可用。属性由索引号引用到GPU维护的属性列表中。在不同的平台或GPU上，某些顶点属性索引可能具有预定义的值。创建属性时，WebGL层会分配其他属性。
无论怎样，都需要你使用enableVertexAttribArray()方法，来激活每一个属性以便使用，不被激活的属性是不会被使用的。一旦激活，以下其他方法就可以获取到属性的值了，包括vertexAttribPointer()，vertexAttrib*()，和 getVertexAttrib()。

```javascript
  /**
   * @param index 类型为GLuint 的索引，指向要激活的顶点属性。如果您只知道属性的名称，不知道索引，您可以使用以下方法来获取索引getAttribLocation().
   */
  void gl.enableVertexAttribArray(index);
```