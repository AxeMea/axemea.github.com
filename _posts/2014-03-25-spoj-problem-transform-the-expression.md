---
layout: default
title: 奇葩年年有今年特别多之ExtJS错误80020101
---

##{{ page.title }}

今天在切浏览器测试的时候，以外的发现，ie7，ie8俩兄弟竟然打不开很多模块的页面，查看控制台发现报

```
SCRIPT257: 由于出现错误 80020101 而导致此项操作无法完成
```

google一把，发现这个问题主要是因为一下几个方面引起：

* <!-- -->注释惹的祸

* 不严格的json格式，比如最后一个变量多了逗号等现象

* 如果用tabpanel加载的是页面，那么注意设置script:true，并且去除页面中的引用库以及html head body等结构，避免引起和主框架的冲突

对照以上几点，快速把代码过了下，竟然都不存在。。然后我根据请求流来判断哪一个环节出了问题，发现在加载模块的controller后，并没有顺利加载store，view组件，因此判断是在controller中的代码出现问题，但controller的格式是通过工具生成的，应该不会存在问题，然后一行一行调试。。发现。。。

在模块视图中，使用了grid组件，同时里面存在actioncolumn列，由于actioncolumn只有handler方法，它并没有默认的信号释放能够被controller捕获，所以在handler中自定义了释放了一个delete信号

javascript
this.fireEvent('delete',record);
```

这本身是正确的，奇葩来了。。就是因为这个'delete'信号，如果换成其他的就ok。。。。。。猜想：因为actioncolumn默认定义了delete信号，当再次定义时，可能存在冲突的原因。。。。等有时间看下源码，再一探究竟。。

吐槽：error 80020101 这个错误太泛了。。

{{ page.date | date_to_string }}
