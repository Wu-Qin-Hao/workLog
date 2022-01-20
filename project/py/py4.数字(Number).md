## 1.py 数字(Number)

> Number 数据类型用于存储数值

```python
# 赋值
var1 = 1
var2 = 2

# 删除
del var1
del var2

# or多个删除
del var1,var2
```

### 1.1 支持四种不同的数值类型

#### 1.1.1 整型（int）

> 也被称为整数，是正或负整数，不带小数点。例如 10, -10, 010, -010

#### 1.1.2 长整型（long）

> 无限大小的整数，整数最后是一个大写或小写的 L。例如 120000L, -120000L, 120000l, -120000l

#### 1.1.3 浮点型（float）

> 浮点型由整数部分与小数部分组成。例如 1.1, -1.1

## 2.py math 模块

> math 模块提供了许多对浮点数的数学运算函数。

### 2.1 数学函数

```python
# 列举了几个常用的

math.abs(x) # 返回数字的绝对值，如abs(-10) 返回 10

math.fabs(x) # 返回数字的绝对值，如math.fabs(-10) 返回10.0

math.ceil(x) # 返回数字的上入整数，如math.ceil(4.1) 返回 5

math.floor(x) # 返回数字的下舍整数，如math.floor(4.9)返回 4

math.max(x1, x2,...)	# 返回给定参数的最大值，参数可以为序列

math.min(x1, x2,...)	# 返回给定参数的最小值，参数可以为序列

math.pow(x, y)	# x**y 运算后的值

math.round(x [,n]) # 返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。

math.sqrt(x) # 返回数字x的平方根
```

### 2.2 随机数函数

```python
# 列举了几个常用的

math.choice(seq) # 从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数

math.randrange([start,] stop [,step]) # 从指定范围内，按指定基数递增的集合中获取一个随机数，基数默认值为 1

math.random() # 随机生成下一个实数，它在[0,1)范围内。

math.shuffle(lst)	# 将序列的所有元素随机排序

math.uniform(x, y) # 随机生成下一个实数，它在[x,y]范围内。
```

### 2.3 三角函数

```python
# 列举了几个常用的

math.cos(x)	# 返回x的弧度的余弦值。

math.sin(x)	# 返回的x弧度的正弦值。

math.tan(x)	# 返回x弧度的正切值。
```

### 2.4 数学常量

```python
math.pi # 数学常量 pi（圆周率，一般以π来表示）
math.e # 数学常量 e，e即自然常数（自然常数）
```
