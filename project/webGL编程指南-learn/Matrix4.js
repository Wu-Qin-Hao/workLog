function Matrix4(opt_src) {
  if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
    let s = opt_src.elements;
    let d = new Float32Array(16);
    for (let i = 0; i < 16; i++) {
      d[i] = s[i];
    }
    this.elements = d;
  } else {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  }
}

Matrix4.prototype = {
  constructor: Matrix4,

  // 设置单位矩阵
  setIdentity: function() {
    let e = this.elements;
    e[0] = 1; e[4] = 0; e[8]  = 0; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9]  = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
  },

  // 设置矩阵
  set: function(src) {
    let s = src.elements;
    let d = this.elements;

    if (s === d) {
      return;
    }

    for (let i = 0; i < 16; i++) {
      d[i] = s[i];
    }

    return this;
  },

  // 转置矩阵（颠倒）
  transpose: function() {
    let e = this.elements;
    let t;

    t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
    t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
    t = e[ 3];  e[ 3] = e[12];  e[12] = t;
    t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
    t = e[ 7];  e[ 7] = e[13];  e[13] = t;
    t = e[11];  e[11] = e[14];  e[14] = t;

    return this;
  },

  // 设置缩放矩阵
  setScale: function(x, y, z) {
    let e = this.elements;

    e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
    e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
    e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;

    return this;
  },
  
  // 矩阵乘以一个缩放值
  scale: function(x, y, z) {
    let e = this.elements;

    e[0] *= x;  e[4] *= y;  e[8]  *= z;
    e[1] *= x;  e[5] *= y;  e[9]  *= z;
    e[2] *= x;  e[6] *= y;  e[10] *= z;
    e[3] *= x;  e[7] *= y;  e[11] *= z;

    return this;
  },

  // 设置平移矩阵
  setTranslate: function(x, y, z) {
    let e = this.elements;

    e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
    e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;

    return this;
  },

  // 矩阵乘以一个平移值
  translate: function() {
    let e = this.elements;

    e[12] += e[0] * x + e[4] * y + e[8]  * z;
    e[13] += e[1] * x + e[5] * y + e[9]  * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;

    return this;
  },

  // 设置旋转矩阵
  setRotate: function(angle, x, y, z) {
    let angleNew = Math.PI * angle / 180;
    let s = Math.sin(angleNew);
    let c = Math.cos(angleNew);
    let e = this.elements;

    if (x !== 0 && y === 0 && z === 0) {
      // 绕X轴旋转
      if (x < 0) {
        s = -s;
      }

      e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
      e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
      e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else if (x === 0 && y !== 0 && z === 0) {
      // 绕y轴旋转
      if (y < 0) {
        s = -s;
      }

      e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
      e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
      e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else if (x === 0 && y === 0 && z!== 0) {
      // 绕z轴旋转
      if (z < 0) {
        s = -s;
      }

      e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
      e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
      e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    } else {
      // 绕任意轴旋转
      let len = Math.sqrt(x*x + y*y + z*z);
      if (len !== 1) {
        let rlen = 1 / len;
        x *= rlen;
        y *= rlen;
        z *= rlen;
      }
      let nc = 1 - c;
      let xy = x * y;
      let yz = y * z;
      let zx = z * x;
      let xs = x * s;
      let ys = y * s;
      let zs = z * s;
  
      e[ 0] = x*x*nc +  c;
      e[ 1] = xy *nc + zs;
      e[ 2] = zx *nc - ys;
      e[ 3] = 0;
  
      e[ 4] = xy *nc - zs;
      e[ 5] = y*y*nc +  c;
      e[ 6] = yz *nc + xs;
      e[ 7] = 0;
  
      e[ 8] = zx *nc + ys;
      e[ 9] = yz *nc - xs;
      e[10] = z*z*nc +  c;
      e[11] = 0;
  
      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;
    }

    return this;
  },

  // 矩阵乘以一个旋转值
  rotate: function(angle, x, y, z) {
    return this.concat(new Matrix4().setRotate(angle, x, y, z))
  },

  // 矩阵乘以一个任意矩阵
  concat: function(other) {
    let e = this.elements;
    let a = this.elements;
    let b = other.elements;

    if (e === b) {
      b = new Float32Array(16);
      for (let i = 0; i < 16; i++) {
        b[i] = e[i]
      }
    }

    for (let i = 0; i < 4; i++) {
      let ai0 = a[i]; let ai1 = a[i + 4]; let ai2 = a[i + 8]; let ai3 = a[i + 12];

      e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
      e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
      e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
      e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }

    return this;
  }
}