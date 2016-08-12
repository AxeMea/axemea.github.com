---
layout: post
title: 闲谈Javascript的继承
category: Javascript
comments: true
---

这是一篇值得自己之后，回头多看看的记录。

纵使写个再多功能，玩过再多框架，这些问题没彻彻底底弄清楚，也是枉然。

这将不会是个完整的教程，但会清晰讲述出Javascript中一些基础的概念和机制。

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

三个关系基本捋清楚了，那么就要开始一顿等价模式，虽然有点绕，不过验证下我们的认识是否牢固。


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

咦。。。之前不是说constructor是在函数身上，不再对象身上。这就要归功于Javascript的原型链了，当发现base实例中没有constructor时，会找去实例__proto__属性指向的原型上找，而之前我们说到了，属性__proto__是指向函数的prototype对象，这样就找到了constructor属性，而constructor属性指向函数本身。

#### ****************
