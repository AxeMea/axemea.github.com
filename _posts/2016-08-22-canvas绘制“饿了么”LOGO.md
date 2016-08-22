---
layout: post
title: Canvas绘制“饿了么”LOGO
category: Javascript
comments: true
---

{% highlight html %}
"如果程序员是个画家。"
{% endhighlight %}

## 说在前面的话

这片文章

* 不会教你如何用Canvas API
* 不会教你如何一步一步堆代码，大家自己看代码，比我BB一堆废话强的多。

我想拿出来谈谈的，是在绘制过程中，在“产品”和“程序”层面的一些想法，感觉挺有意思。也许，这些东西比代码本身更值得我们思考。

## 看图说话

首先放出 “饿了么” LOGO，看看我们要绘制的是个什么玩意。

![饿了么LOGO](/images/eleme-canvas-logo/origin-logo.jpg)

如果是一个纯画家，想要达到绘制的目的，可能先构图，然后按部就班一点一点上色，直到整个作品的成型。（没学过绘画，说错了，勿喷。）

别忘了，我们还有一个身份 － 程序员，我们可能更容易，也更应该偏向另外一种思维方式 － 抽象思维。接下来，看看在这种思维的引导下，这幅图在我们眼中会呈现出什么不同。先来观察下，这个LOGO是由大致哪几部分构成。

*	中间的蓝色背景，围绕的两条风骚的曲线
* 白底蓝边的“e”
* “饿了么”三个文字

我们已经做了第一步的拆分，到这一层为止，抽象的粒度还是比较粗的，仍然不能清晰地定义每一部分。那么继续拆分，为了更好地表达拆分的过程，我做了一个 [过程动画](http://axemea.github.io/javascripts/eleme-logo-canvas/index.html?action=seperate)。

通过这一步的抽象，综合其中各部分的共性，将其分成四类，分别是矩形，圆－like，直线，平行四边形。接下来，我们将分别探讨这四类。

#### 类型1：矩形

![矩形](/images/eleme-canvas-logo/p-1.png)

首先，我们拆出来的是矩形，定义很清晰的一个类型。

［定数］：｛颜色｝

［变量］：｛起点坐标｝，｛宽｝，｛高｝

这里也只是用到了一个标准的矩形。所以，我们可以这样定义它。

每一个类型都会对应有一个processor，负责将其绘制到画布上。实际代码中对应的是

{% highlight javascript %}
  _coreRectDraw();
{% endhighlight %}

#### 类型2：圆－like

![圆-like](/images/eleme-canvas-logo/p-2.png)

为什么叫“圆－like”，因为属于这一类的并不完全是一个标准的圆，有的甚至只是一部分，比如扇形、弧等。

［定数］：｛不保证完整的圆｝

［变量］：｛半径｝，｛圆类型（空心／实心）｝，｛边颜色｝，｛内部填充色｝，｛起点角度｝，｛终点角度｝，｛边宽度｝

负责处理这个类型的processor为

{% highlight javascript %}
  _coreArcDraw();
{% endhighlight %}

#### 类型3：直线

![直线](/images/eleme-canvas-logo/p-3.png)

一条直线，可以垂直，水平，倾斜。

［定数］：｛直线｝

［变量］：｛颜色｝，｛宽度｝，｛起始坐标｝，｛终点坐标｝

负责处理这个类型的processor为

{% highlight javascript %}
  _coreLineDraw();
{% endhighlight %}

#### 类型4：平行四边形

![平行四边形](/images/eleme-canvas-logo/p-4.png)

可能有人会说，这个就不能用倾斜的直线类型代替吗？由于直线倾斜后，还是直角，比较影响视觉。所以就特意拆出个这个类型。

［定数］：｛颜色｝，｛四个角的度数｝，｛宽度｝

［变量］：｛长度｝，｛起始坐标｝

负责处理这个类型的processor为

{% highlight javascript %}
  _core_coreParallelogramDrawDraw();
{% endhighlight %}

好了，四种类型介绍完了，接下来要做的，就是设置好每个类型的数值，拼起来即可。回头看第一阶段的划分。

* 中间的蓝色背景，围绕的两条风骚的曲线 ＝ [圆－like] ＋ ［矩形］
* 白底蓝边的“e” ＝ [圆－like] ＋ ［直线］
* “饿了么”三个文字 ＝ [直线] ＋ ［平行四边形］

## 结束语

用绘画例子来谈，抽象思维，可能有点过于极端，但是否也洽能说明，适用之广。

我最终想说的就是，习惯于抽象思维，能更好的帮助我们将复杂简化，更高效地清晰地解决问题。从代码层面来看，也能让我们的代码，逻辑更加清楚，结构更加可读，可维护，可扩展。

我也正在不断强化地过程中，与大家共勉。


## 相关链接

[在线演示](http://axemea.github.io/javascripts/eleme-logo-canvas/)                              

[Github](https://github.com/AxeMea/eleme-canvas-logo/)
