---
layout: post
title: Javascript帮助手册
category: Javascript
comments: true
---


### Array

* concat()     
连接两个或更多的数组，并返回结果。

{% highlight  javascript %}

var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

var arr2 = new Array(3)
arr2[0] = "James"
arr2[1] = "Adrew"
arr2[2] = "Martin"

document.write(arr.concat(arr2))

George,John,Thomas,James,Adrew,Martin

{% endhighlight  javascript %}


* join() 	
把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。


{% highlight  javascript %}

var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr.join("."))

George.John.Thomas

{% endhighlight  javascript %}

* pop() 	
删除并返回数组的最后一个元素
* push() 	
向数组的末尾添加一个或更多元素，并返回新的长度。
* reverse() 	
颠倒数组中元素的顺序。
* shift() 	
删除并返回数组的第一个元素
* slice() 	
从某个已有的数组返回选定的元素
* sort() 	
对数组的元素进行排序
* splice() 	
删除元素，并向数组添加新元素。
* toSource() 	
返回该对象的源代码。
* toString() 	
把数组转换为字符串，并返回结果。
* toLocaleString() 	
把数组转换为本地数组，并返回结果。
* unshift() 	
向数组的开头添加一个或更多元素，并返回新的长度。
* valueOf() 	
返回数组对象的原始值

***

### Boolean

* toSource()     
返回该对象的源代码。
* toString() 	
把逻辑值转换为字符串，并返回结果。
* valueOf() 	
返回 Boolean 对象的原始值。

***

### Date

* Date()     
返回当日的日期和时间。
* getDate() 	
从 Date 对象返回一个月中的某一天 (1 ~ 31)。
* getDay() 	
从 Date 对象返回一周中的某一天 (0 ~ 6)。
* getMonth() 	
从 Date 对象返回月份 (0 ~ 11)。
* getFullYear() 	
从 Date 对象以四位数字返回年份。
* getYear() 	
请使用 getFullYear() 方法代替。
* getHours() 	
返回 Date 对象的小时 (0 ~ 23)。
* getMinutes() 	
返回 Date 对象的分钟 (0 ~ 59)。
* getSeconds() 	
返回 Date 对象的秒数 (0 ~ 59)。
* getMilliseconds() 	
返回 Date 对象的毫秒(0 ~ 999)。
* getTime() 	
返回 1970 年 1 月 1 日至今的毫秒数。
* getTimezoneOffset() 	
返回本地时间与格林威治标准时间 (GMT) 的分钟差。
* getUTCDate() 	
根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
* getUTCDay() 	
根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
* getUTCMonth() 	
根据世界时从 Date 对象返回月份 (0 ~ 11)。
* getUTCFullYear() 	
根据世界时从 Date 对象返回四位数的年份。
* getUTCHours() 	
根据世界时返回 Date 对象的小时 (0 ~ 23)。
* getUTCMinutes() 	
根据世界时返回 Date 对象的分钟 (0 ~ 59)。
* getUTCSeconds() 	
根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
* getUTCMilliseconds() 	
根据世界时返回 Date 对象的毫秒(0 ~ 999)。
* parse() 	
返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
* setDate() 	
设置 Date 对象中月的某一天 (1 ~ 31)。
* setMonth() 	
设置 Date 对象中月份 (0 ~ 11)。
* setFullYear() 	
设置 Date 对象中的年份（四位数字）。
* setYear() 	
请使用 setFullYear() 方法代替。
* setHours() 	
设置 Date 对象中的小时 (0 ~ 23)。
* setMinutes() 	
设置 Date 对象中的分钟 (0 ~ 59)。
* setSeconds() 	
设置 Date 对象中的秒钟 (0 ~ 59)。
* setMilliseconds() 	
设置 Date 对象中的毫秒 (0 ~ 999)。
* setTime() 	
以毫秒设置 Date 对象。
* setUTCDate() 	
根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
* setUTCMonth() 	
根据世界时设置 Date 对象中的月份 (0 ~ 11)。
* setUTCFullYear() 	
根据世界时设置 Date 对象中的年份（四位数字）。
* setUTCHours() 	
根据世界时设置 Date 对象中的小时 (0 ~ 23)。
* setUTCMinutes() 	
根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
* setUTCSeconds() 	
根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
* setUTCMilliseconds() 	
根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
* toSource() 	
返回该对象的源代码。
* toString() 	
把 Date 对象转换为字符串。
* toTimeString() 	
把 Date 对象的时间部分转换为字符串。
* toDateString() 	
把 Date 对象的日期部分转换为字符串。
* toGMTString() 	
请使用 toUTCString() 方法代替。
* toUTCString() 	
根据世界时，把 Date 对象转换为字符串。
* toLocaleString() 	
根据本地时间格式，把 Date 对象转换为字符串。
* toLocaleTimeString() 	
根据本地时间格式，把 Date 对象的时间部分转换为字符串。
* toLocaleDateString() 	
根据本地时间格式，把 Date 对象的日期部分转换为字符串。
* UTC() 	
根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
* valueOf() 	
返回 Date 对象的原始值。

***

### Math

* abs(x) 	
返回数的绝对值。
* acos(x) 	
返回数的反余弦值。
* asin(x) 	
返回数的反正弦值。
* atan(x) 	
以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
* atan2(y,x) 	
返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
* ceil(x) 	
对数进行上舍入。
* cos(x) 	
返回数的余弦。
* exp(x) 	
返回 e 的指数。
* floor(x) 	
对数进行下舍入。
* log(x) 	
返回数的自然对数（底为e）。
* max(x,y) 	
返回 x 和 y 中的最高值。
* min(x,y) 	
返回 x 和 y 中的最低值。
* pow(x,y) 	
返回 x 的 y 次幂。
* random() 	
返回 0 ~ 1 之间的随机数。
* round(x) 	
把数四舍五入为最接近的整数。
* sin(x) 	
返回数的正弦。
* sqrt(x) 	
返回数的平方根。
* tan(x) 	
返回角的正切。
* toSource() 	
返回该对象的源代码。
* valueOf() 	
返回 Math 对象的原始值。

***

### Number

* toString 	
把数字转换为字符串，使用指定的基数。
* toLocaleString 	
把数字转换为字符串，使用本地数字格式顺序。
* toFixed 	
把数字转换为字符串，结果的小数点后有指定位数的数字。
* toExponential 	
把对象的值转换为指数计数法。
* toPrecision 	
把数字格式化为指定的长度。
* valueOf 	
返回一个 Number 对象的基本数字值。

***

### 	String

* anchor() 	
创建 HTML 锚。
* big() 	
用大号字体显示字符串。
* blink() 	
显示闪动字符串。
* bold() 	
使用粗体显示字符串。
* charAt() 	
返回在指定位置的字符。
* charCodeAt() 	
返回在指定的位置的字符的 Unicode 编码。
* concat() 	
连接字符串。
* fixed() 	
以打字机文本显示字符串。
* fontcolor() 	
使用指定的颜色来显示字符串。
* fontsize() 	
使用指定的尺寸来显示字符串。
* fromCharCode() 	
从字符编码创建一个字符串。
* indexOf() 	
检索字符串。
* italics() 	
使用斜体显示字符串。
* lastIndexOf() 	
从后向前搜索字符串。
* link() 	
将字符串显示为链接。
* localeCompare() 	
用本地特定的顺序来比较两个字符串。
* match() 	
找到一个或多个正则表达式的匹配。
* replace() 	
替换与正则表达式匹配的子串。
* search() 	
检索与正则表达式相匹配的值。
* slice() 	
提取字符串的片断，并在新的字符串中返回被提取的部分。
* small() 	
使用小字号来显示字符串。
* split() 	
把字符串分割为字符串数组。
* strike() 	
使用删除线来显示字符串。
* sub() 	
把字符串显示为下标。
* substr() 	
从起始索引号提取字符串中指定数目的字符。
* substring() 	
提取字符串中两个指定的索引号之间的字符。
* sup() 	
把字符串显示为上标。
* toLocaleLowerCase() 	
把字符串转换为小写。
* toLocaleUpperCase() 	
把字符串转换为大写。
* toLowerCase() 	
把字符串转换为小写。
* toUpperCase() 	
把字符串转换为大写。
* toSource() 	
代表对象的源代码。
* toString() 	
返回字符串。
* valueOf() 	
返回某个字符串对象的原始值。

***

### RegExp

* compile 	
编译正则表达式。 	ff:1 	ie:4
* exec 	
检索字符串中指定的值。返回找到的值，并确定其位置。 	ff:1 	ie:4
* test 	
检索字符串中指定的值。返回 true 或 false。

***

### 全局函数

* decodeURI() 	
解码某个编码的 URI。
* decodeURIComponent() 	
解码一个编码的 URI 组件。
* encodeURI() 	
把字符串编码为 URI。
* encodeURIComponent() 	
把字符串编码为 URI 组件。
* escape() 	
对字符串进行编码。
* eval() 	
计算 JavaScript 字符串，并把它作为脚本代码来执行。
* getClass() 	
返回一个 JavaObject 的 JavaClass。
* isFinite() 	
检查某个值是否为有穷大的数。
* isNaN() 	
检查某个值是否是数字。
* Number() 	
把对象的值转换为数字。
* parseFloat() 	
解析一个字符串并返回一个浮点数。
* parseInt() 	
解析一个字符串并返回一个整数。
* String() 	
把对象的值转换为字符串。
* unescape() 	
对由 escape() 编码的字符串进行解码。

***

### Window

* closed 	
返回窗口是否已被关闭。
* defaultStatus 	
设置或返回窗口状态栏中的默认文本。
* document 	
对 Document 对象的只读引用。请参阅 Document 对象。
* history 	
对 History 对象的只读引用。请参数 History 对象。
* innerheight 	
返回窗口的文档显示区的高度。
* innerwidth 	
返回窗口的文档显示区的宽度。
* length 	
设置或返回窗口中的框架数量。
* location 	
用于窗口或框架的 Location 对象。请参阅 Location 对象。
* name 	
设置或返回窗口的名称。
* Navigator 	
对 Navigator 对象的只读引用。请参数 Navigator 对象。
* opener 	
返回对创建此窗口的窗口的引用。
* outerheight 	
返回窗口的外部高度。
* outerwidth 	
返回窗口的外部宽度。
* pageXOffset 	
设置或返回当前页面相对于窗口显示区左上角的 X 位置。
* pageYOffset 	
设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
* parent 	
返回父窗口。
* Screen 	
对 Screen 对象的只读引用。请参数 Screen 对象。
* self 	
返回对当前窗口的引用。等价于 Window 属性。
* status 	
设置窗口状态栏的文本。
* top 	
返回最顶层的先辈窗口。
* window 	
window 属性等价于 self 属性，它包含了对窗口自身的引用。
* screenLeft screenTop screenX screenY</br>
只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。IE、Safari 和 Opera 支持 screenLeft 和 screenTop，而 Firefox 和 Safari 支持 screenX 和 screenY。
* alert() 	
显示带有一段消息和一个确认按钮的警告框。
* blur() 	
把键盘焦点从顶层窗口移开。
* clearInterval() 	
取消由 setInterval() 设置的 timeout。
* clearTimeout() 	
取消由 setTimeout() 方法设置的 timeout。
* close() 	
关闭浏览器窗口。
* confirm() 	
显示带有一段消息以及确认按钮和取消按钮的对话框。
* createPopup() 	
创建一个 pop-up 窗口。
* focus() 	
把键盘焦点给予一个窗口。
* moveBy() 	
可相对窗口的当前坐标把它移动指定的像素。
* moveTo() 	
把窗口的左上角移动到一个指定的坐标。
* open() 	
打开一个新的浏览器窗口或查找一个已命名的窗口。
* print() 	
打印当前窗口的内容。
* prompt() 	
显示可提示用户输入的对话框。
* resizeBy() 	
按照指定的像素调整窗口的大小。
* resizeTo() 	
把窗口的大小调整到指定的宽度和高度。
* scrollBy() 	
按照指定的像素值来滚动内容。
* scrollTo() 	
把内容滚动到指定的坐标。
* setInterval() 	
按照指定的周期（以毫秒计）来调用函数或计算表达式。
* setTimeout() 	
在指定的毫秒数后调用函数或计算表达式。

***

### Navigator

* appCodeName 	
返回浏览器的代码名。
* appMinorVersion 	
返回浏览器的次级版本。
* appName 	
返回浏览器的名称。
* appVersion 	
返回浏览器的平台和版本信息。
* browserLanguage 	
返回当前浏览器的语言。
* cookieEnabled 	
返回指明浏览器中是否启用 cookie 的布尔值。
* cpuClass 	
返回浏览器系统的 CPU 等级。
* onLine 	
返回指明系统是否处于脱机模式的布尔值。
* platform 	
返回运行浏览器的操作系统平台。
* systemLanguage 	
返回 OS 使用的默认语言。
* userAgent 	
返回由客户机发送服务器的 user-agent 头部的值。
* userLanguage 	
返回 OS 的自然语言设置。

* javaEnabled() 	
规定浏览器是否启用 Java。
* taintEnabled() 	
规定浏览器是否启用数据污点 (data tainting)。

***

### Screen

* availHeight 	
返回显示屏幕的高度 (除 Windows 任务栏之外)。
* availWidth 	
返回显示屏幕的宽度 (除 Windows 任务栏之外)。
* bufferDepth 	
设置或返回调色板的比特深度。
* colorDepth 	
返回目标设备或缓冲器上的调色板的比特深度。
* deviceXDPI 	
返回显示屏幕的每英寸水平点数。
* deviceYDPI 	
返回显示屏幕的每英寸垂直点数。
* fontSmoothingEnabled 	
返回用户是否在显示控制面板中启用了字体平滑。
* height 	
返回显示屏幕的高度。
* logicalXDPI 	
返回显示屏幕每英寸的水平方向的常规点数。
* logicalYDPI 	
返回显示屏幕每英寸的垂直方向的常规点数。
* pixelDepth 	
返回显示屏幕的颜色分辨率（比特每像素）。
* updateInterval 	
设置或返回屏幕的刷新率。
* width 	
返回显示器屏幕的宽度。

***

### History

* length 	
返回浏览器历史列表中的 URL 数量。
* back() 	
加载 history 列表中的前一个 URL。
* forward() 	
加载 history 列表中的下一个 URL。
* go() 	
加载 history 列表中的某个具体页面。

***

### Location

* hash 	
设置或返回从井号 (#) 开始的 URL（锚）。
* host 	
设置或返回主机名和当前 URL 的端口号。
* hostname 	
设置或返回当前 URL 的主机名。
* href 	
设置或返回完整的 URL。
* pathname 	
设置或返回当前 URL 的路径部分。
* port 	
设置或返回当前 URL 的端口号。
* protocol 	
设置或返回当前 URL 的协议。
* search 	
设置或返回从问号 (?) 开始的 URL（查询部分）。

***

### Document

* body 	
提供对 <body> 元素的直接访问。对于定义了框架集的文档，该属性引用最外层的 <frameset>。
* cookie 	
设置或返回与当前文档有关的所有 cookie。
* domain 	
返回当前文档的域名。
* lastModified 	
返回文档被最后修改的日期和时间。
* referrer 	
返回载入当前文档的文档的 URL。
* title 	
返回当前文档的标题。
* URL 	
返回当前文档的 URL。
* close() 	
关闭用 document.open() 方法打开的输出流，并显示选定的数据。
* getElementById() 	
返回对拥有指定 id 的第一个对象的引用。
* getElementsByName() 	
返回带有指定名称的对象集合。
* getElementsByTagName() 	
返回带有指定标签名的对象集合。
* open() 	
打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。
* write() 	
向文档写 HTML 表达式 或 JavaScript 代码。
* writeln() 	
等同于 write() 方法，不同的是在每个表达式之后写一个换行符。

***

### DOM Element

* element.accessKey 	
设置或返回元素的快捷键。
* element.appendChild() 	
向元素添加新的子节点，作为最后一个子节点。
* element.attributes 	
返回元素属性的 NamedNodeMap。
* element.childNodes
返回元素子节点的 NodeList。
* element.className 	
设置或返回元素的 class 属性。
* element.clientHeight 	
返回元素的可见高度。
* element.clientWidth 	
返回元素的可见宽度。
* element.cloneNode() 	
克隆元素。
* element.compareDocumentPosition() 	
比较两个元素的文档位置。
* element.contentEditable 	
设置或返回元素的文本方向。
* element.dir 	
设置或返回元素的文本方向。
* element.firstChild 	
返回元素的首个子。
* element.getAttribute() 	
返回元素节点的指定属性值。
* element.getAttributeNode() 	
返回指定的属性节点。
* element.getElementsByTagName() 	
返回拥有指定标签名的所有子元素的集合。
* element.getFeature() 	
返回实现了指定特性的 API 的某个对象。
* element.getUserData() 	
返回关联元素上键的对象。
* element.hasAttribute() 	
如果元素拥有指定属性，则返回true，否则返回 false。
* element.hasAttributes() 	
如果元素拥有属性，则返回 true，否则返回 false。
* element.hasChildNodes() 	
如果元素拥有子节点，则返回 true，否则 false。
* element.id 	
设置或返回元素的 id。
* element.innerHTML 	
设置或返回元素的内容。
* element.insertBefore() 	
在指定的已有的子节点之前插入新节点。
* element.isContentEditable 	
设置或返回元素的内容。
* element.isDefaultNamespace() 	
如果指定的 namespaceURI 是默认的，则返回 true，否则返回 false。
* element.isEqualNode() 	
检查两个元素是否相等。检查两个元素是否是相同的节点。
* element.isSupported() 	
如果元素支持指定特性，则返回 true。
* element.lang 	
设置或返回元素的语言代码。
* element.lastChild 	
返回元素的最后一个子元素。
* element.namespaceURI 	
返回元素的 namespace URI。
* element.nextSibling 	
返回位于相同节点树层级的下一个节点。
* element.nodeName 	
返回元素的名称。
* element.nodeType 	
返回元素的节点类型。
* element.nodeValue 	
设置或返回元素值。
* element.normalize() 	
合并元素中相邻的文本节点，并移除空的文本节点。
* element.offsetHeight 	
返回元素的高度。
* element.offsetWidth 	
返回元素的宽度。
* element.offsetLeft 	
返回元素的水平偏移位置。
* element.offsetParent 	
返回元素的偏移容器。
* element.offsetTop 	
返回元素的垂直偏移位置。
* element.ownerDocument 	
返回元素的根元素（文档对象）。
* element.parentNode 	
返回元素的父节点。
* element.previousSibling 	
返回位于相同节点树层级的前一个元素。
* element.removeAttribute() 	
从元素中移除指定属性。
* element.removeAttributeNode() 	
移除指定的属性节点，并返回被移除的节点。
* element.removeChild() 	
从元素中移除子节点。
* element.replaceChild() 	
替换元素中的子节点。
* element.scrollHeight 	
返回元素的整体高度。
* element.scrollLeft 	
返回元素左边缘与视图之间的距离。
* element.scrollTop 	
返回元素上边缘与视图之间的距离。
* element.scrollWidth 	
返回元素的整体宽度。
* element.setAttribute() 	
把指定属性设置或更改为指定值。
* element.setAttributeNode() 	
设置或更改指定属性节点。
* element.setIdAttribute() 	
* element.setIdAttributeNode() 	
* element.setUserData() 	
把对象关联到元素上的键。
* element.style 	
设置或返回元素的 style 属性。
* element.tabIndex 	
设置或返回元素的 tab 键控制次序。
* element.tagName 	
返回元素的标签名。
* element.textContent 	
设置或返回节点及其后代的文本内容。
* element.title 	
设置或返回元素的 title 属性。
* element.toString() 	
把元素转换为字符串。
* nodelist.item() 	
返回 NodeList 中位于指定下标的节点。
* nodelist.length 	
返回 NodeList 中的节点数。

***

### DOM Attribute

* attr.isId 	
如果属性是 id 类型，则返回 true，否则返回 false。
* attr.name 	
返回属性的名称。
* attr.value 	
设置或返回属性的值。
* attr.specified 	
如果已指定属性，则返回 true，否则返回 false。
* nodemap.getNamedItem() 	
从 NamedNodeMap 返回指定的属性节点。
* nodemap.item() 	
返回 NamedNodeMap 中位于指定下标的节点。
* nodemap.length 	
返回 NamedNodeMap 中的节点数。
* nodemap.removeNamedItem() 	
移除指定的属性节点。
* nodemap.setNamedItem() 	
设置指定的属性节点（通过名称）。

***

### DOM Event

* bubbles 	
返回布尔值，指示事件是否是起泡事件类型。
* cancelable 	
返回布尔值，指示事件是否可拥可取消的默认动作。
* currentTarget 	
返回其事件监听器触发该事件的元素。
* eventPhase 	
返回事件传播的当前阶段。
* target 	
返回触发此事件的元素（事件的目标节点）。
* timeStamp 	
返回事件生成的日期和时间。
* type 	
返回当前 Event 对象表示的事件的名称。
