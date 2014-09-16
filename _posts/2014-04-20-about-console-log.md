---
layout: default
title: 闲谈console.log
category: Javascript
comments: true
---

##{{ page.title }}

###现象描述

将原本的应用场景简化

```
var a = {b:{}};
console.log(a.b);
console.log(a.b.c);
a.b.c= 'so fun';
```

在实际调试场景中，本来是想查看b下面的c属性排查问题，然后习惯性地只console.log(a.b)了，发现c是有的，当时想都没想，应该是别的地方的问题，绕了一大圈还是没找到问题的缘由，于是毫无目的地直接console.log(a.b.c),我勒个去，竟然是undefined,说好的有值呢。

回过头来想一想，应该是log只是打出了b的引用，添加的c属性，也都会随后及时地反映到对象中，但就在那个时间来说，c属性是不存在的，所以是undefined。

在作复杂引用时，对象生命周期的把握很重要，也跟我的教训是，对于某个特定属性值的调试，最好直接log到其本身，就像demo中，直接log到b，而不是c。避免相关的困惑。

{{ page.date | date_to_string }}
