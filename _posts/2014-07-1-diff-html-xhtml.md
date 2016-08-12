---
layout: post
title: HTML、XHTML的区别
category: CSS
comments: true
---

#### 声明DTD

XHTML文件的开始要声明DTD

{% highlight html %}
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
{% endhighlight html %}

#### 嵌套使用

XHTML元素一定要被正确的嵌套使用，在HTML里一些元素可以不正确嵌套也能正常显示，如：

{% highlight html %}
<b><i>This text is bold and italic</b></i>
{% endhighlight html %}

而在XHTML必须要正确嵌套之后才能正常使用，如：

{% highlight html %}
<b><i>This text is bold and italic</i></b>
{% endhighlight html %}

#### 所有的标签和标签的属性都必须小写，属性值可以大写

错误代码：

{% highlight html %}
<BODY>
　　<P>This is a paragraph</P>
</BODY>
{% endhighlight html %}

正确代码：

{% highlight html %}
<body>
　　<p>This is a paragraph</p>
</body>
{% endhighlight html %}

#### 属性值

错误代码：

{% highlight html %}
<table width=100%>
{% endhighlight html %}

正确代码：

{% highlight html %}
<table width="100%">
{% endhighlight html %}

#### 标签闭合

所有的标签都必须被关闭，空标签也不例外。关闭空标签的方法如下：
HTML中的<br>要写成<br/>。注意，后面加了一个空格”“和一个反斜杠”/“。

#### 严格的dtd

如果你使用的是strict.dtd。也就是最严格的XHTML，那么许多定义外观的属性都将不被允许。
例如你为图片添加链接的同时想去掉边框。不可以再使用

{% highlight html %}
<img src="..."border="0">
{% endhighlight html %}

，而是必须通过CSS来实现。我们推荐您在使用strict.dtd时，舍弃所有的定义外观属性，而完全使用CSS来定义页面外观


#### 属性的缩写

属性的缩写被禁止。如：
错误代码

{% highlight html %}
<dl compact>
<input checked>
<input readonly>
<input disabled>
<option selected>
<frame noresize>
{% endhighlight html %}

正确代码

{% highlight html %}
<dl compact="compact">
<input checked="checked" />
<input readonly="readonly" />
<input disabled="disabled" />
<option selected="selected" />
<frame noresize="noresize" />
{% endhighlight html %}

#### 部分标签的name属性禁用

HTML 4.01 中为a，applet, frame, iframe, img 和 map定义了一个name属性.在 XHTML 里name属性是不能被使用的，应该用id 来替换它。如：
错误代码：

{% highlight html %}
<img src="picture.gif" name="picture1" />
{% endhighlight html %}

正确代码：

{% highlight html %}
<img src="picture.gif" id="picture1" />
{% endhighlight html %}
注意：我们为了使旧浏览器也能正常的执行该内容我们也可以在标签中同时使用id和name属性。如：

{% highlight html %}
<img src="picture.gif" id="picture1" name="picture1" />
{% endhighlight html %}

为了适应新的浏览器浏览我们在上述代码中的最后我加了/来结束标签。

#### 特殊符号表示

任何小于号（<），不是标签的一部分，都必须被编码为& l t ;
任何大于号（>），不是标签的一部分，都必须被编码为& g t ;
任何与号（&），不是实体的一部分的，都必须被编码为& a m p;
注：以上字符之间无空格。

#### 注释内容
不要在注释内容中使“--”，“--”只能发生在XHTML注释的开头和结束，也就是说，在内容中它们不再有效。例如下面的代码是无效的:

{% highlight html %}
<!--这里是注释-----------这里是注释-->
{% endhighlight html %}

用等号或者空格替换内部的虚线。

{% highlight html %}
<!--这里是注释============这里是注释-->
{% endhighlight html %}

以上这些规范有的看上去比较奇怪，但这一切都是为了使我们的代码有一个统一、唯一的标准，便于以后的数据再利用。

#### 图片必须有说明文字

每个图片标签都必须有ALT说明文字。

{% highlight html %}
<img src="ball.jpg" alt="large red ball" />
{% endhighlight html %}
