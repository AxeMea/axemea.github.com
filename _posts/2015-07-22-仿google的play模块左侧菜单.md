---
layout: page
title: 仿google的play模块左侧菜单
category: Javascript
comments: yes
---

### Demo

Demo:[链接](http://axemea.github.io/javascripts/google-player/manage.html)

### 简述

实现了菜单的切换，以及页面的异步加载。但菜单的效果和google-play的，在细节上有所差距，有待改进吧。


代码实现的比较乱，主要是感觉菜单的切换很绕，结构上还有待改善。实现基本思路就是，当选择某一个一级菜单后，克隆出来一份，覆盖住原始的菜单，同时隐藏原始的菜单，将克隆的菜单动画至顶端。

其它的也没啥好说的了，每个人的实现都不同，我就不赘述了。

### 截图

![菜单](/images/snap.png)


{{ page.date | date_to_string }}
