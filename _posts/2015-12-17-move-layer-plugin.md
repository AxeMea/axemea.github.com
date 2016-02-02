---
layout: page
title: iFreeLayer.js - 基于jQuery的可随意拖拉大小浮动层插件
category: javascript
comments: yes
---

### 缘由

＝ ＝ ，当然起因是公司的项目的一个需求，然后在网上一顿乱找，感觉都不太合适，然后抽了几个小时时间自己干了一个。使用了一段时间后，感觉还不错，简单封装成jQuery插件，就拿出来分享了，希望给需要的人节省造轮子的时间。

如在使用期间出现bug，请在下面给出的Github中反馈。

### Github

Github:[https://github.com/AxeMea/iFreeLayer.js](https://github.com/AxeMea/iFreeLayer.js)

Demo:[链接](http://axemea.github.io/javascripts/move-container/move.html)

### 使用方法

#### html结构

html的基础结构如下。

{% highlight html %}
<div class="container">
	<div class="move-box">
		<section  class="block border top" data-dir="1"></section>
		<section  class="block cross right-top" data-dir="2"></section>
		<section  class="block border right" data-dir="3"></section>
		<section  class="block cross right-bottom" data-dir="4"></section>
		<section  class="block border bottom" data-dir="5"></section>
		<section  class="block cross left-bottom" data-dir="6"></section>
		<section  class="block border left" data-dir="7"></section>
		<section  class="block cross left-top" data-dir="8"></section>
	</div>
</div>
{% endhighlight html %}

html代码中，有两个点是强制要有的。

* data-dir属性，代表8个可操作区域的标志。1－8，代表从上开始，顺时针的顺序。
* className中的block。其他的样式为demo样式，根据实际的设计稿进行相应的定制。


#### 引用脚本

{% highlight javascript %}
<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script>
<script type="text/javascript" src="https://rawgit.com/axemea/iFreeLayer.js/master/iFreeLayer.min.js"></script>
{% endhighlight javascript %}

#### 初始化

{% highlight javascript %}
$('.move-box').iFreeLayer({
      parent:'.container'
    }).setup();
{% endhighlight javascript %}

初始化方法只有parent一个可选参数，代表浮动层的可移动区域，也代表它的父节点，如果不配置默认情况下为window。

### 细节

实现过程中，有两个值得注意的点。

#### 动态调节top，right，bottom，left四值

在初始状态时，move-box的定位的四个值分别为

{% highlight css %}
.move-box{
	left: 200px;
    top: 20px;
    bottom:auto,
    right:auto
}
{% endhighlight css %}

当鼠标点击标志为4的操作区域，也就是右下角的区域时。为了达到，调整宽高时，右边不动的效果，需要对四值进行这样的初始变换。

{% highlight css %}
.move-box{
	left: auto;
    top: 20px;
    bottom:auto,
    right:屏幕宽度 - move-box的X值 － move-box的宽度
}
{% endhighlight css %}

通理，8个操作区域会有各自的变换。

#### 监听对象的转移

从表面上看，iFreeLayer是对8个操作区域的mousemove事件进行了监听，然后去改变容器的高宽。如果只简单这样实现，会出现一个问题。由于8个操作区域的大小有限，当鼠标的移动速度超过宽高的改变速度，鼠标很容易超出操作区域范围，中止移动。为了解决这个问题，在鼠标按下后，iFreeLayer同时还监听了它的parent的mousemove事件，这样，就算鼠标移出了区域范围，仍然能够调整宽高。

其他部分就没啥好讲的了。





{{ page.date | date_to_string }}
