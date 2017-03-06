---
layout: post
title: 对 virtual-dom 的一些理解
category: Javascript
comments: true
---

### 1. 前言

`Vue 2.x` 、`React` 都引入了 `Virtual Dom` 的概念，来更加高效地更新 `dom` 节点，提升性能。为了能更纯粹地学习 `Virtual Dom`，决定将 [Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom) 作为研究对象。这个项目很纯粹，也很清晰地展示了如何利用虚拟节点来更新视图的整个过程。

总体来说，大致分为以下几个阶段。

![virtual-dom](../../../../../images/virtual-dom/virtual-dom.png)

在依次介绍几个过程之前，先来明确几个概念，对后续的学习很有帮助。


-----------


### 2. 基本概念

#### [VNode](https://github.com/AxeMea/virtual-dom/blob/master/docs/vnode.md)

`VNode` 虚拟节点，它可以代表一个真实的 `dom` 节点。可以通过 `createElement` 方法将 `VNode` 渲染成 `dom` 节点。

#### [VText](https://github.com/AxeMea/virtual-dom/blob/master/docs/vtext.md)

`VText` 虚拟文本节点，它代表了一个真实的文本节点。内容中若有 `HTML` 则会被转义。

#### [Hooks](https://github.com/AxeMea/virtual-dom/blob/master/docs/hooks.md)

`Hooks` 钩子方法，给节点注册事件。比如 `ev-click`, `ev-dbclick` 等等。

#### [Thunk](https://github.com/AxeMea/virtual-dom/blob/master/docs/thunk.md)

`Thunk` 方法允许开发者参与 `diff` 的过程。比如某些节点，能够预先知道，状态不会发生改变，就可以通过这个方法，在 `diff` 的过程直接返回旧 `VNode` 。

#### [Widget](https://github.com/AxeMea/virtual-dom/blob/master/docs/widget.md)

`Widget` 和 `Thunk` 的作用有点相似，它参与的是 `patch` 的过程。它能定制如何渲染，比如要求某个状态只有为偶数时，重新渲染等。


-----------


### 3. render - 创建虚拟节点

旅程从 `virtual-hyperscript/index.js` 中开始。

```Javascript
// @virtual-hyperscript/index.js
tag = parseTag(tagName, props);
```

由于 `tagName` 支持 `#ID`, `div`, `.class`, `div#ID` 等形式，第一步，进行解析。

```Javascript
// @virtual-hyperscript/parse-tag.js
var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;

var tagParts = split(tag, classIdSplit);
var tagName = null;

if (notClassId.test(tagParts[1])) {
    tagName = 'DIV';
}
```

这里比较巧妙，通过匹配 `class` 和 `id` 的组合正则对 `tagName` 进行分隔，得到一个数组，一次性将标签，类名， `id` 抽离出来。之后分别对其进行预处理。最后一步

```Javascript
// @virtual-hyperscript/parse-tag.js
return props.namespace ? tagName : tagName.toUpperCase();
```

这里牵扯出一个 `namespace` 的概念，可能在平时写 `HTML` 对于这个概念比较陌生，但如果接触过 `XML` 的话，这个概念还是挺重要的，可以用来避免元素名冲突。有兴趣的可以[自行了解](https://www.w3schools.com/xml/xml_namespaces.asp)下，这里不展开介绍。继续往下。

```Javascript
// @virtual-hyperscript/index.js
transformProperties(props);

if (children !== undefined && children !== null) {
    addChild(children, childNodes, tag, props);
}
```

`props` 中并不全是像 `id` , `class` 等可以直接设置到 `dom` 元素上的属性值，还支持像 `ev-click` , `ev-dbclick` 等事件的注册。 `transformProperties` 对属性进行预处理。标签名和属性处理完后，开始对子节点进行不同类型的处理，最后组装成 `childNodes` 数组。

接着就可以生成主角 `VNode`对象 了。

```Javascript
// @virtual-hyperscript/index.js
return new VNode(tag, props, childNodes, key, namespace);
```

我们来看看，这个 `VNode` 里面是啥。

```Javascript
// @vnode/vnode.js
// 部分逻辑简化
for (var propName in properties) {
  if (properties.hasOwnProperty(propName)) {
    ...
    var property = properties[propName]
    if (isVHook(property) && property.unhook) {
      if (!hooks) {
          hooks = {}
      }

      hooks[propName] = property
    }
    ...
  }
}

for (var i = 0; i < count; i++) {
  var child = children[i]
  if (isVNode(child)) {
    descendants += child.count || 0

    if (...) {
      hasWidgets = true
    }

    if (...) {
      hasThunks = true
    }

    if (...) {
      descendantHooks = true
    }
  } else if (...) {
    hasThunks = true
  } else if (...) {
    hasThunks = true
  }
}

```
这里省略了部分逻辑判断，让逻辑更加清晰。首先，将属性中所有的 `Hook` 保存。然后，遍历所有子节点，统计子孙节点的数量，同时打上各种标记，比如是否有 `Widget` ， 是否有 `Thunk` 等等。这些标记以及数量，现在还看不出什么价值，在后面的几个阶段中，会被使用到。不过，按常规来猜测的话，无非是冗余数据，为了后续的一些查找遍历节省时间。


-----------


### 4. createElement - 创建 `dom` 节点

```Javascript
// @vdom/create-element.js
vnode = handleThunk(vnode).a

if (isWidget(vnode)) {
    return vnode.init()
} else if (isVText(vnode)) {
    return doc.createTextNode(vnode.text)
}
```

`createElement` 支持传 `Thunk` ，为了统一拿到 `vnode` ，进行的兼容处理。可以理解为 `handleThunk(vnode, null)`。接着，处理掉两个和视图渲染直接相关的 `Widget` 和 `Text`。好了，渲染视图的特殊 `case` 都处理完了，接着就应该是如何渲染 `vnode` 了。

```Javascript
// @vdom/create-element.js
var node = (vnode.namespace === null) ?
    doc.createElement(vnode.tagName) :
    doc.createElementNS(vnode.namespace, vnode.tagName)

var props = vnode.properties
applyProperties(node, props)

var children = vnode.children

for (var i = 0; i < children.length; i++) {
    var childNode = createElement(children[i], opts)
    if (childNode) {
        node.appendChild(childNode)
    }
}
```

先通过 `createElement/createElementNS` 创建 `dom` 元素。`applyProperties` 方法用于将属性 `props` 通过 `setAttribute/removeAttribute/dom[key] = value` 的方式设置到 `dom` 上。

当前节点渲染好，遍历子元素，递归创建节点，将子节点 `appendChild` 到当前 `node` 中。这样，一个真实的 `dom` 节点就创建好了，可以将它渲染到页面中去了。


-----------

### 4. diff - 比较新旧两个 `VNode`

```Javascript
// @vtree/diff.js
function diff(a, b) {
  var patch = { a: a }
  walk(a, b, patch, 0)
  return patch
}
```

初始化 `patch` 中只有旧 `VNode` `a`，通过 `walk` 方法的递归将一个一个更新补丁打进 `patch` 中。

为了方便理解，可以这么描述，`walk` 是用来对比 `a` `b` 两个新旧节点，如果有状态更新，则将 `VPatch` 打到 `patch[index]` 上。

```Javascript
// @vtree/diff.js
function walk(a, b, patch, index) {
    // 全等则直接返回
    if (a === b) {
        return
    }

    // 补丁对象
    var apply = patch[index]
    // 当新旧节点类型不同时，标记是否清除旧节点的所有属性以及状态
    var applyClear = false

    // case: 对 Thunk 的处理
    // thunks 方法内部将 a , b 转成 VNode ，再调用 diff(a, b) 进行递归
    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    }
    // case: 对新节点为 null 的处理
    else if (b == null) {
        // case: 旧元素不是 Widget
        // 调用 clearState 方法，该方法干了两件事
        //
        // unhook():
        // 通过将该元素以及其子孙元素的所有 hook 属性全都设置为 null 的方式，释放 hook 绑定的方法。
        //
        // destroyWidgets():
        // 然后，递归删除该元素中所有 Widget。
        // 当然这里的删除，并不是硬删除，而是新建一个 Remove-VPatch。
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        // 删除自身，旧元素，无论是它是 Widget 还是 VNode。
        // 所以，源码中有这样一段注释
        // "This prevents adding two remove patches for a widget."
        // 如果旧元素 a 本身是一个 Widget，而上面的条件不判断，会出现有什么情况呢？
        // 就会发现在 destroyWidgets 中递归时，就已经自身打了个 Remove-VPatch
        // 如果这里删除自身再次打一个，显然就重复了。
        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    }
    // case: 对 VNode 的处理
    else if (isVNode(b)) {
        if (isVNode(a)) {
            // case: 新旧元素节点相同，只是更新了属性
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                // 对比出更新的属性
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    // 打 Props-VPatch
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                // 对比子孙元素，递归
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                //　新旧同为 VNode ，但标签不用，直接新节点更新旧节点
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            // 新节点为 VNode ，旧节点不是，直接新节点更新旧节点
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    }
    // case: 对 VText 的处理
    else if (isVText(b)) {
        // 新节点为 VText ，旧节点不是，直接新节点更新旧节点
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        }else if (a.text !== b.text) {
            // 同为 VText ，内容不同，直接新节点更新旧节点
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    }
    // case: 对 Widget 的处理
    else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        // 新节点为 Widget，旧节点无论是否为 Widget，都直接更新
        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}
```

`walk` 方法并没有返回值，由于 `patch` 是传引用，直接对它进行了修改。这里需要着重说明的是 `diffChildren` 方法，它主要用来遍历和递归子节点。

```Javascript
// @vtree/diff.js
function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    //　对新旧节点的子节点进行一个对比，重新排序，生成一个变化操作对象
    //　这里暂且略过，后面会着重来谈。
    //　{
    //　 children: [],
    //　 moves: {
    //　   removes: removes,
    //　   inserts: inserts
    //　 }
    //　}
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        // 旧节点子节点为 null ，新子节点直接插入
        if (!leftNode) {
            if (rightNode) {
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            // 递归
            walk(leftNode, rightNode, patch, index)
        }

        // 跳过这个子节点
        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    // 是否有需要移动的操作
    // 只有当有节点有 key 属性时，才会需要移动。
    if (orderedSet.moves) {
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}
```


-----------


### 5. patch - 将 `diff` 对比出的 `patch` 打到旧 `dom`

`patch` 主要关注 `patchRecursive` 。

```Javascript
// @vdom/patch.js
function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}
```

通过前面的讲述知道，`patches`对象的数字 `key` 为节点索引，`value` 为相应的 `VPatch`， 这里，先通过 `patchIndices` 方法将索引取出组成数组 `indices`。接着通过 `domIndex` 方法将节点索引和对应的 `dom` 节点映射上，生成 `index` 对象。在 `domIndex` 方法中有个细节需要提一下。

```Javascript
// @vdom/dom-index.js
indices.sort(ascending)
```

可能大家会想了，`patches` 对象中不都已经是这样的吗？

```Javascript
{
  0: { ... },
  1: { ... },
  2: { ... },
  a: { ... }
}
```

那么通过 `patchIndices` 中 `for in` 遍历 `patches` 生成出来的数组不应该本来就是递增的吗？为何还要在 `domIndex` 显式进行一次升序排序呢？我的理解是，由于对象是 `key - value` 结构，是无序的，无法完全保证在不同浏览器下，通过 `for in` 出来的顺序是如何。这里为了安全，显示再进行了一次升序排列。

接着通过在 `applyPatch` 中，调用 `patchOp` 给需要的节点打上相应的 `patche`，也就是对 `dom` 进行操作。部分代码如下，结构较简单，这里就不多说了。

```Javascript
// @vdom/patch-op.js
function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        ...
    }
}
```

**到目前为，已经完成了 `virtual-dom` 从创建到渲染的整个过程。不得不说，文章已经挺长了，但还没有结束。（抱歉，该喝水的，先去喝水吧。码字有些上头了，控制不住记几。）`diff` 阶段中有个被我当时一笔带过的 `reorder` 方法。这里打算单独谈一谈。在 `virtual-dom` 的过程中，这个方法起到了很重要的作用。**


-----------


### 6. reorder - 重新排序

`reorder` 会用在哪些场景呢，我以 `Vue` 的语法，举几个栗子。

```html
<!--
遍历对象
object 是个对象，结构如下
object = {
 key1: value1
};
-->
<!-- case 1  -->
<ul>
  <li v-for="(key, val) in object">
  </li>
</ul>

<!-- case 2  -->
<ul>
  <li v-for="value in object">
    {{ $key }} : {{ value }}
  </li>
</ul>

<!--
items 是个数组，结构如下
items = {
 {
   _uid: '...'
 }...
}
-->
<!-- case 3  -->
<ul>
  <li v-for="item in items"></li>
</ul>

<!-- case 4  -->
<ul>
  <li v-for="item in items" track-by="_uid"></li>
</ul>
```

第一种场景，遍历对象。由于对象是 `key-value` 结构，为无序数据结构。不同环境下的遍历，不能保证其顺序。所以这里需要通过其 `key` 按照第一次渲染的顺序进行一次排序，这样每一次状态的更新，都能按照相对固定的顺序进行差异对比。

第二种场景，遍历数组。这里又分了两种，区别在于是否在 `track-by`。那么会问了，两种使用有啥区别呢，哪种更好。带着这个问题，我们开始对 `reorder` 的探索。

方法的最开始，进行了两个特殊逻辑判断。

```Javascript
// @vtree/diff.js
...

if (bFree.length === bChildren.length) {
    return {
        children: bChildren,
        moves: null
    }
}

...

if (aFree.length === aChildren.length) {
    return {
        children: bChildren,
        moves: null
    }
}
```

其实，我们大多数时候不加 `track-by` 列表循环，在这里就直接 `return` 了。可能会问了？这样不就足够了吗，直接返回新的子节点，然后按次序和旧子节点进行对比，对结果也不会有影响。我们来考虑下下面这个栗子。

```Javascript
var oldItems = [
  {
    uid: '1',
    value: 1
  },
  {
    uid: '2',
    value: 2
  },
  {
    uid: '3',
    value: 3
  }
];

var newItems = [
  {
    uid: '3',
    value: 3
  },
  {
    uid: '1',
    value: 1
  },
  {
    uid: '2',
    value: 2
  }
];

```

不用 `track-by` 的场景下，在做 `diff` 时，会直接按照数组的顺序进行比较，结果是，所有节点都有状态更新，然后最后执行 3 条 `dom` 更新操作。这显示是没必要的，因为列表数据并没有发生改变，只是位置改变了。（当然前提是，业务只关心数据，不关心顺序）我们知道， Js 的执行速度是比 `dom` 操作快很多的。所以，如果我们预先将 `newItems` 进行一个排序，再进行 `diff` ，就无需更新 `dom` 。好了，我们继续，先上个图。

![virtual-dom](../../../../../images/virtual-dom/reorder-demo.png)

首先要明确一点，`reorder` 这个阶段的重新排序，并没有真正将 `newChildren` 进行重新排序，而只是生成一个 `insert` 和 `remove` 操作记录数组，将在 `patch` 阶段时对 `dom` 节点进行操作。

我将 `reorder` 的过程分为四个阶段，我分别称之为 `准备阶段`，`相同 key 还原阶段`，`新增 key 添加阶段`， `新旧顺序转换阶段`。

#### 1. 准备阶段

初始化简单，`newChildren`，`oldChildren` 为新旧子节点状态。这里设定的新旧子节点还是比较有典型性的。

* 有新增 `key` 的节点
* 有删除 `key` 的节点
* 有相同 `key` 的节点
* 有非 `key` 节点

#### 2. 相同 `key` 还原阶段

这个阶段的原则是，按照 `oldChildren` 子节点的 `key` 类型顺序，将 `newChildren` 还原回去。如旧子节点 `key` 顺序为

```javascript
[非key, key1, 非key, key2]
```

`oldChildren` 第一个节点为非 `key` 节点，对应的 `newChildren` 中的第一个非 `key` 节点为 `b2` 。接着 `oldChildren` 第二个节点为 `key1` 节点，`newChildren` 中的 `key1` 节点为 `b1`。依次类推，得出 `simulateChildren` 数组为

```javascript
[b2, b1, b4, null]
```

为啥最后是个 `null` 呢，因为 `oldChildren` 中的 `key2` 在 `newChildren` 中并没有找到。

#### 3. 新增 `key` 添加阶段

在上面阶段，只是完成了按照旧节点 `key` 类型顺序，将新节点进行了一个还原。但对于新节点中的新 `key` 类型节点并没有处理。这个阶段则是将新 `key` 类型的节点，插到 `simulateChildren` 结尾。

```javascript
[b2, b1, b4, null, b3]
```

#### 4. 新旧顺序转换阶段

这个算法还是有点绕，推荐直接看源码，一步一步来看转换的过程（其实就是我文字太弱，表达不清楚。 = =）。但总结来说就是，如何将 `simulateChildren`的 `key` 类型顺序 转换成 `newChildren` 的 `key` 类型顺序的过程。

```javascript
[非key, key1, 非key, null, key3] ==> [key1, 非key, key3, 非key]
```

最后会生成一个操作队列对象 `moves`。这里有个问题，为啥将 `simulateChildren` 变成 `newChildren` 的过程就是 `oldChildren` 变成 `newChildren` 的过程呢？

很显然了，因为通过前两步已经将 `simulateChildren` 的 `key` 类型顺序和 `oldChildren` 做成一样了。


-----------

### 7. 后话

到此为止 `virtual-dom` 的大体过程也说的差不多了。（这是真要结束了。）

** 因时间仓促，个人理解深度有限。有没说清楚的地方请各位看官多包涵，有说错的地方，请留言指正。谢谢。**

^_^
