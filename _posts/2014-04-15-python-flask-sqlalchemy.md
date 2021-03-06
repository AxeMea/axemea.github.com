---
layout: post
title: flask-sqlalchemy使用笔记
category: Python
comments: true
---

#### 插入数据
{% highlight python %}
u= User(username = "peter", email = "test@example.com", password = "123")
db.session.add(u)  #:插入数据
db.session.commit() #：提交
{% endhighlight python %}

#### 删除数据
{% highlight python %}
u = User.query.get(1)  || u=User.query.first() || u = User.query.filter_by(username = "peter")
db.session.delete(u)  #:与插入一样，必须是查询返回的对象
db.session.commit()
{% endhighlight python %}

#### 更新数据
{% highlight python %}
u = User.query.first()
u.username = 'guest'
db.session.commit()
{% endhighlight python %}

#### 查询数据

##### 用主键获取数据
{% highlight python %}
User.query.get(1)  #:id = 1
{% endhighlight python %}

##### filter_by  || filter
{% highlight python %}
User.query.filter_by(username = 'peter').first()
User.query.filter(User.username ==  'peter').first()
{% endhighlight python %}

##### startswith  ||  endswith   模糊查询
{% highlight python %}
User.query.filter(User.username.startswith("pet")).all()
User.query.filter(User.email.endswith("@example.com")).all()
{% endhighlight python %}

##### 非逻辑
{% highlight python %}
User.query.filter(User.username != 'perter').all()
from sqlalchemy import not_
User.query.filter(not_(User.username == 'peter')).all()
{% endhighlight python %}

##### 与逻辑
{% highlight python %}
form sqlalchemy import and_
User.query.filter(and_(User.username == 'peter', User.email.endswith('@example.com'))).first()
{% endhighlight python %}

##### 或逻辑
{% highlight python %}
form sqlalchemy import or_
User.query.filter(or_(User.username != 'peter', User.email.endswith('@example.com'))).first()
{% endhighlight python %}

##### 返回第一条，返回所有条
{% highlight python %}
User.query.first() #:返回查询到的第一个数据
User.query.all()  #:返回查询到的所有数据
{% endhighlight python %}

##### 分页
{% highlight python %}
users =  User.query.paginate(int(page),int(limit),False)
 for user in users.items:
    .....
{% endhighlight python %}

#### 限制返回数目
{% highlight python %}
User.query.limit(1).all()
{% endhighlight python %}


### 排序

#### 参考字段顺序排序
{% highlight python %}
User.query.order_by(User.username)
{% endhighlight python %}

#### 参考字段倒叙排序
{% highlight python %}
from sqlalchemy import desc
User.query.order_by(desc(AclLogTable.date))
{% endhighlight python %}
