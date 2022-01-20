class animal:
    name=""
    age=0
class dog(animal):
    pass
class cat(animal):
    def catch_mouse(self):
        print(self.name, '我是辣鸡')

# d=dog()
# d.name='dfddddd'
# d.age=28
# print(d.name,',',d.age)

# c=cat()
# c.name="hiuhihi"
# c.catch_mouse()(self):
#         print(self.name, '我是辣鸡')
# class dog(animal):
#     pass
# class cat(animal):
#     pass
d=dog()
d.name='dfddddd'
d.age=28
print(d.name,',',d.age)

c=cat()
c.name="hiuhihi"
c.catch_mouse()

定义了animal动物类（基类）

定义了dog类（继承animal类）

定义了cat类（继承animal类）（实现一个自定义的方法）

new 出dog对象，重新赋值名字和年龄

new 出cat对象，重新赋值name，年龄继承，执行自定义方法