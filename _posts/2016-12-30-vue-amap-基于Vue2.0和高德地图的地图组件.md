---
layout: post
title: vue-amap 基于Vue2.0和高德地图的地图组件
category: Javascript
comments: true
---

Github：[ElemeFE/vue-amap](https://github.com/ElemeFE/vue-amap)

文档： [vue-amap](https://elemefe.github.io/vue-amap/#/)


### 前言

在做基于LBS的应用中，时常会和地图打交道，最直接的解决方案，当然是去对应的地图官网找文档，然后一步步来玩。对于简单场景而言，体验应该还好，但对于一些状态多，变化频繁的复杂场景而言，不仅要时刻维护本地数据状态和地图状态同步，还要查找设置各种状态的地图API，实在是让人头疼的事情。
设计vue-amap的初衷，也就是为了让开发者，在编写地图应用时，能从查找众多地图API和繁琐的地图状态同步中解脱出来。

那么vue-amap是如何做到的，又能给开发者带来怎样的便利与开发体验呢？我们就从一个轻点的栗子讲起。


产品经理说，咱们要搞个地图，上面给我放N个人，我要时刻知道他们的位置。



### 安装

```javascript
npm install vue-amap --save
```


### 引入vue-amap

vue-amap的引入方式很简单，在入口文件中加入下面内容

```javascript
// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['']
});
```


### 显示地图

在模版中加入vue-amap的地图组件

```javascript
<el-amap vid="amapDemo">
</el-amap>
```


### 给地图加入N个人

在模版中加入vue-amap的地图组件

```javascript
<template>
  <el-amap vid="amapDemo">
    // 添加N个人
    <el-amap-marker v-for="marker in markers" :position="marker.position">
    </el-amap-marker>
</el-amap>
</template>

<script>
export default {
  data() {
    return {
      markers: []
    };
  },
  mounted() {
    // 姑且N为2
    // 这样地图上就添加了两个人
    this.markers = [
     {
      position: [121.5273285, 31.21515044]
     }, {
      position: [121.5273286, 31.21515045]
     }
    ];
  }
};
</script>
```


### 让N个人动起来

之前我们已经将N个人放上去了，关键的时候来了，我们如何更新地图状态呢？vue-amap支持数据的单向绑定，直接更新本地数据状态即可同步地图显示状态。

```javascript
<template>
  <el-amap vid="amapDemo">
    <el-amap-marker v-for="marker in markers" :position="marker.position">
    </el-amap-marker>
</el-amap>
</template>

<script>
export default {
  data() {
    return {
      markers: []
    };
  },
  mounted() {
    // 姑且N为2
    // 为地图添加两个人
    this.markers = [
     {
      position: [121.5273285, 31.21515044]
     }, {
      position: [121.5273286, 31.21515045]
     }
    ];

    // 模拟实时更新位置
    // 开启一个1s的轮训，每个人的经纬度都自增0.00001
    const step = 0.00001;
    setInterval(() => {
      this.markers.forEach((marker) => {
        marker.position = [marker.position[0] + step, marker.position[1] + step];
      });
    }, 1000);
  }
};
</script>
```

一个简单的基于vue-amap的地图应用就完成了，有没有觉得方便很多，我们只要维护好自己本地的数据状态即可，将具体地图的API，以及本地数据集和地图状态同步问题交给vue-amap负责就好了。

我们会持续维护这个项目，同时也希望vue-amap能给更多开发者带来开发效率的提高以及体验上的舒适。
