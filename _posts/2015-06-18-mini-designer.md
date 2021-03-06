---
layout: post
title: Mini Designer 小而高效
category: Javascript
comments: yes
---

### Mini Designer是什么？

Mini Designer是一个为前端工程师而生的简易JS插件，它能辅助前端工程师，更加方便、高效，优质地按照设计图来完成前端页面，减少pm与ui来找茬的机会。

### Github

Github:[https://github.com/AxeMea/miniDesigner](https://github.com/AxeMea/miniDesigner)

### 特色

同时支持手机端与PC端。

PC端：

* 设计图拖动
* 设计图透明度调节
* 刷新页面，设计图状态自动保存
* 重置设计图初始状态

移动端：

* 刷新页面，设计图状态自动保存
* 设计图透明度调节
* 重置设计图初始状态

### 安装步骤

#### 一、下载Mini Designer插件

{% highlight html %}
git clone https://github.com/AxeMea/miniDesigner.git
{% endhighlight html %}

#### 二、引入插件

插件是基于jQuery，所以，你懂的。

{% highlight javascript %}
<script src="jquery-1.9.1.min.js"></script>
<script src="mini-designer.min.js"></script>
{% endhighlight javascript %}

#### 三、初始化插件

{% highlight javascript %}
<script>
   var opts = {
	  picture:'design.jpg', //设计图的地址
	  debug:true //默认为true，为true时，插件启用，为false时，插件关闭
      };
   miniDesigner(opts);
</script>
{% endhighlight javascript %}

### 附图

PC端：

![pc](/images/mini-designer/mini-designer-pc.jpg)

移动端：

![mobile](/images/mini-designer/mini-designer-mobile.jpg)
