---
layout: post
title: 闲谈Javascript的继承
category: Javascript
comments: true
---

这将不会是个完整的教程，但会明确Javascript中一些基础的概念和机制。

我们经常看到三个关键单词，prototype,constructor,__proto__，那么它们到底是什么鬼，之间又是什么样的关系。

首先贴出张图。

![菜单](/images/javascript-inheritance/prototype.jpg)
[picture from:http://blog.csdn.net/hikvision_java_gyh/article/details/8937157](http://blog.csdn.net/hikvision_java_gyh/article/details/8937157)

从以上图中可以看出。当一个函数F声明时，Javascript内部会自动给函数添加一个原型属性，这个属性是一个prototype对象。这个对象包含一个constructor属性，一个指向函数F的引用。

现在就差__proto__没出场了。先上一小段代码。

{% highlight javascript %}
  function Base() {}

  var base = new Base();
{% endhighlight javascript %}

代码很简单，声明一个Base函数，并且实例化一个base对象。此时，base对象会有一个__proto__属性，这个属性指向函数Base的原型属性，即prototype对象。

那么总结这三个玩意就是：

*	[函数身上]prototype：是函数的原型属性，类型是一个对象。

* [函数身上]constructor：是prototype对象的一个属性，指向函数的引用。

* [实例身上]__proto__: 实例的一个属性，指向函数的prototype对象。

三个关系基本捋清楚了，那么就要开始一波等价模式，虽然有点绕，不过验证下我们的认识是否牢固。


### -- 开启等价模式 --

#### ****************

{% highlight javascript %}
  function Base() {}

  var base = new Base();

  console.log(base.constructor == Base);  
  // true              
  console.log(base.__proto__.constructor == Base);
  // true     
{% endhighlight javascript %}

咦。。。之前不是说constructor是在函数身上，不在对象身上。这就要归功于Javascript的原型链了，当发现base实例中没有constructor时，会找去实例__proto__属性指向的原型上找，而之前我们说到了，属性__proto__是指向函数的prototype对象，这样就找到了constructor属性，而constructor属性指向函数本身。

#### ****************

{% highlight javascript %}
  function Base() {}

  var base = new Base();

  console.log(Base.prototype.constructor == Base);
  // true    
  console.log(base.__proto__.constructor == Base.prototype.constructor);
  // true     

{% endhighlight javascript %}

函数Base的prototype属性的constructor指向函数Base本身。

#### ****************

### -- 关于寄生组合式继承 --

众所周知标准的寄生组合式继承如下

{% highlight javascript %}
  function Base(name) {
   this.name = name;
  }
  Base.prototype.baseFn = function() {};

  function Child(name) {
   Base.call(this, name);
  }

  Child.prototype = new Base();
  Child.prototype.constructor = Child;

  Child.prototype.childFn = function() {};

  var child = new Child('name');
  console.log(child instanceof Base);
  // true   
{% endhighlight javascript %}

寄生组合式继承的好处就不赘述了，继承构造函数的部分就略过了，想了解的，可以google，详细的解读很多。我们将重点放在原型链的继承。

在谈这个方式的同时，可以先来看看，我们一般是如何判断继承关系。上面的代码用的是instanceof方法，那么这个instanceof内部又是如何判断的呢？

ECMAScript规范中对于instanceof有清晰的定义，规范定义比较晦涩，涉及到很多概念，就不贴出来了，将其转换成Javascript代码的话，如下：

{% highlight javascript %}
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
 }
}
{% endhighlight javascript %}

从这里可以看出，从实例L的原型一级一级往上找，如果找到和函数R原型属性严格等于的话，就返回为true，就判定L是R的实例。

那么再回头来看看前面的代码。

{% highlight javascript %}
  console.log(child.__proto__.__proto__ == Base.prototype);
  // true   
{% endhighlight javascript %}

经过前面的讲述，应该很推断出，本质的判断是如此的。

那么问题来了，是不是只能这么写呢？如果这样呢？

{% highlight javascript %}
  function Base(name) {
   this.name = name;
  }
  Base.prototype.baseFn = function() {};

  function Child(name) {
   Base.call(this, name);
  }

  Child.prototype = Base.prototype;       //改变在这里
  Child.prototype.constructor = Child;

  Child.prototype.childFn = function() {};

  var child = new Child('name');
  console.log(child instanceof Base);
  // true   
{% endhighlight javascript %}

会发现最后也能判断为true，本质也是一样。等价于如下：

{% highlight javascript %}
  console.log(child.__proto__ == Base.prototype);
  // true   
{% endhighlight javascript %}


暂时就谈到这了，各位晚安。
