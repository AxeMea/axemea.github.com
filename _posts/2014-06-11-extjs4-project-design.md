---
layout: post
title: ExtJS前端项目构架探讨(二)
category: Javascript
comments: true
---

### 开发模式

在进行界面开发时，最初的版本可以通过SenchaArchitect可视化编辑工具，来进行构建。

为了适合多人协同开发，我们将每个模块单独划分为一个工程，然后，通过发布聚合到一个工程下。

这样，我们可以看做要维护两个大工程，举例分别为，project_pub，project_dev，那么两个工程下的文件结构类似如下：

<pre>
project_pub-
            app-
                controller-
                           moduleA
                           moduleB
                           ...
                view-
                     moduleA
                     moduleB
                     ...
                ...
            ...

</pre>

<pre>
project_dev-
            moduleA-   
		            app-
		                controller-
		                           moduleA
		                view-
		                     moduleA
		                ...
		            ...
		    moduleB-   
		            app-
		                controller-
		                           moduleB
		                view-
		                     moduleB
		                ...
		            ...
		    ...
 </pre>

### 国际化

这里谈国际化，要分两部分，一部分为框架本身组件的国际化，这可以通过直接去切换引用locale文件夹下的国际化文件，第二部分为项目自身的国际化，这里需要注意的是，如果项目视图是由sencha architect工具构建的话，是只能通过硬编码的方式来编写的，因为所有的文字都被当做字符串来处理，所以无法来赋值变量。如果页面视图通过手动编写，那么可以独立出一个国际化的文件，然后通过一个管理器来进行管理。

### 同步与异步

对于一个ria应用，并不是异步的交互符合所有的操作需求，某一些操作时，同步交互是必要的。

### 验证器

验证器是通过组建的vtype属性来设置，监听的change事件。框架里预置了几种验证器，但为了适应项目需求，大部分的验证还是只能通过自己扩展的。扩展的方法是重写Ext.form.field.VTypes，类似如下：

{% highlight javascript %}
Ext.apply(Ext.form.field.VTypes,{
	type1:function(val,field){
		if(val.length >= 4)
			return true;
		else
			return false;
	},
	type1Text:'长度大于4',
});               
{% endhighlight javascript %}

为了扩展的自由度，还多扩展了几个方法，代码如下：

{% highlight javascript %}
Ext.apply(Ext.form.field.VTypes,{
	/*三种基础正则表达式的方法*/
	regexTest:function(reg,text){
		var reg = new RegExp(reg);
		try{
			return reg.test(text);
		}catch(err){
			return false;
		}
	},
	regexMatch:function(reg,text){
		var reg = new RegExp(reg);
		try{
			return text.match(reg);
		}catch(err){
			return null;
		}
	},
	regexExec:function(reg,text){
		var reg = new RegExp(reg);
		try{
			return reg.exec(text);
		}catch(err){
			return null;
		}
	},
	/*
		组合验证器验证
		参数：
			 val:验证值
			 vtypes：验证器数组
			 signal：验证器之间是并且还是或者的关系
			 	     false是或者
			 	     true是并且
			 	     默认值是false
	*/
	vtypeCombin:function(val,vtypes,signal){
		var len = vtypes.length,
			signal = signal || false,
			i;

		if(signal){
			for(i = 0 ; i < len ; i++){
				if(!this[vtypes[i]](val,null))
					return false;
			}

			return true;

		}else{

			for(i = 0 ; i < len ; i++){
				if(this[vtypes[i]](val,null))
					return true;
			}
			return false;

		}
	},
	...
});
{% endhighlight javascript %}

### 事件机制

对于事件的管理，设计思路为，所有模块不直接进行业务数据交互，而只是从视图中获取数据，然后向业务管理器发送业务信号，所有与业务相关的核心操作，都是通过业务管理器进行实现。

### 组件扩展

ExtJS框架对于组件的扩展是很自由的，通过ExtJS的源码则可以体现出来，所以没啥好扯的，值得注意的，如果通过sencha architect进行项目构建时，由于工具自身的约束，会对组件的扩展产生障碍，但可以通过一些兼容的方式进行。

### 前端架构参考

{{ page.date | date_to_string }}
