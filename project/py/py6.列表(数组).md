## 1.列表(数组)

```python
list1 = [1, 2, 3, 4, 5, 'a', 'b', 'c' ]
```

## 2.访问列表中的值

> 使用下标索引来访问列表中的值，同样你也可以使用方括号的形式截取字符

```python
list1 = [1, 2, 3, 4, 5, 'a', 'b', 'c' ]

print(list1[0]) # 1
print(list1[1:5]) # [2, 3, 4, 5, 'a']
```

## 3.增加列表元素

```python
list1 = [1, 2, 3, 4, 5, 'a', 'b', 'c' ]
list1.append('d') # [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd']
list1.append('e') # [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']
```

## 4.删除列表元素

```python
list1 = [1, 2, 3, 4, 5, 'a', 'b', 'c' ]

del list1[2] # [1, 2, 4, 5, 'a', 'b', 'c']
```

## 5.列表脚本操作符

```python
list1 = [1, 2, 3, 4, 5, 'a', 'b', 'c' ]

len(list1) # 8

list1 + [6, 7, 8] # 1, 2, 3, 4, 5, 'a', 'b', 'c', 6, 7, 8]

['Hi!'] * 4 # [Hi! Hi! Hi! Hi!]

3 in [1, 2, 3] # true

for x in [1, 2, 3] # 1 2 3

```

## 6.列表函数&方法

```python
# 以下函数

list1 = [1, 2, 3]
list1 = [4, 5, 6]

cmp(list1, list2) # 比较两个列表的元素

len(list1) # 列表元素个数

max(list1) # 返回列表元素最大值

min(list1) # 返回列表元素最小值

# 以下方法

list1.append(obj) # 在列表末尾添加新的对象

list1.count(obj) # 统计某个元素在列表中出现的次数

list1.extend(seq) # 在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）

list1.index(obj) # 从列表中找出某个值第一个匹配项的索引位置

list1.insert(index, obj) # 将对象插入列表

list1.pop([index=-1]) # 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值

list1.remove(obj) # 移除列表中某个值的第一个匹配项

list1.reverse() # 反向列表中元素

list1.sort(cmp=None, key=None, reverse=False) # 对原列表进行排序
```
