---
layout: post
title: 【闲谈Vue1.0】- 4.compiler - 编译器
category: Javascript
comments: true
---

本章将说明compiler中的编译器的实现。

其中包含三个基本流程：

* compile：编译指令，过滤器，属性等
* link：链接vm和el
* unlink：解链vm和el

-------

###  编译器模块 - compile.js

#### compile( ) - 编译节点

```javascript
export function compile (el, options, partial) {
  // 编译当前节点
  var nodeLinkFn = ... compileNode(el, options)
    : null

  // 编译子节点
  var childLinkFn =
    ... el.hasChildNodes()
      ? compileNodeList(el.childNodes, options)
      : null

  return function compositeLinkFn (vm, el ... ) {
    var childNodes = toArray(el.childNodes)
    var dirs = linkAndCapture(function compositeLinkCapturer () {
      // 链接当前节点
      if (nodeLinkFn) nodeLinkFn(vm, el ... )
      // 链接子节点
      if (childLinkFn) childLinkFn(vm, childNodes ... )
    }, vm)
    // 返回一个解链的方法
    return makeUnlinkFn(vm, dirs)
  }
}

```

#### compileAndLinkProps( ) - 编译并且链接属性

```javascript
export function compileAndLinkProps (el, options, partial) {
  // 编译属性
  var propsLinkFn = compileProps(el, props, vm)
  var propDirs = linkAndCapture(function () {
    // 链接属性
    propsLinkFn(vm, scope)
  }, vm)
  // 解链方法
  return makeUnlinkFn(vm, propDirs)
}
```

#### compileRoot( ) - 编译根节点

```javascript
export function compileRoot (el, options, contextOptions) {
  ...

  if (el.nodeType !== 11) {
    // 编译组件
    if (options._asComponent) {
      if (containerAttrs && contextOptions) {
        contextLinkFn = compileDirectives(containerAttrs, contextOptions)
      }
      if (replacerAttrs) {
        replacerLinkFn = compileDirectives(replacerAttrs, options)
      }
    } else {
      // 编译非组件元素
      replacerLinkFn = compileDirectives(el.attributes, options)
    }
  } ...
  }

  ...
  return function rootLinkFn (vm, el, scope) {
    // 元素和作用于链接
    if (context && contextLinkFn) {
      contextDirs = linkAndCapture(function () {
        contextLinkFn(context, el, null, scope)
      }, context)
    }

    // 链接自身元素
    var selfDirs = linkAndCapture(function () {
      if (replacerLinkFn) replacerLinkFn(vm, el)
    }, vm)

    // 解链方法
    return makeUnlinkFn(vm, selfDirs ... )
  }
}
```

-------

###  编译属性模块 - compile-props.js

#### compileProps( ) - 编译节点

```javascript
export function compileProps (el, propOptions, vm) {
  var props = []
  var propsData = vm.$options.propsData
  var names = Object.keys(propOptions)
  var i = names.length
  var options, name, attr, value, path, parsed, prop
  while (i--) {
    name = names[i]
    options = propOptions[name] || empty

    ...

    prop = {
      name: name,
      path: path,
      options: options,
      mode: propBindingModes.ONE_WAY,
      raw: null
    }

    attr = hyphenate(name)

    // 判断绑定模式，单向／双向
    if ((value = getBindAttr(el, attr + '.sync')) !== null) {
      prop.mode = propBindingModes.TWO_WAY
    } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
      prop.mode = propBindingModes.ONE_TIME
    }

    // case： <span :id="prop.id"></span>
    if (value !== null) {
      prop.raw = value
      parsed = parseDirective(value)
      value = parsed.expression
      prop.filters = parsed.filters

      ...

      prop.parentPath = value

      ...
    } else if ((value = getAttr(el, attr)) !== null) {
      // case： <span id="propId"></span>
      // 从属性直接取值
      prop.raw = value
    } else if (propsData && ((value = propsData[name] || propsData[path]) !== null)) {
      // propsData取值
      prop.raw = value
    } ...
    props.push(prop)
  }

  // 链接方法
  return makePropsLinkFn(props)
}

```

###  slots模块 - resolve-slots.js

#### resolveSlots( ) - resolve slots

```javascript
export function resolveSlots (vm, content) {
  ...

  var contents = vm._slotContents = Object.create(null)
  var el, name
  for (var i = 0, l = content.children.length; i < l; i++) {
    el = content.children[i]
    // e.g. <span slot="slot1"></span><span slot="slot2"></span>
    // 这里通过数组的处理支持了多个同名的slot
    if (name = el.getAttribute('slot')) {
      (contents[name] || (contents[name] = [])).push(el)
    }
    ...
  }

  // 用fragment将同name的el包起来
  for (name in contents) {
    contents[name] = extractFragment(contents[name], content)
  }

  ...

  // 此时 vm._slotContents 就是一个key为slot名，value为fragment的对象
  return;
}
```

###  transclude模块 - transclude.js

#### transclude( ) - transclude

```javascript
export function transclude (el, options) {
  if (options) {
    options._containerAttrs = extractAttrs(el)
  }
  // 转换模板
  if (isTemplate(el)) {
    // @parsers/template
    el = parseTemplate(el)
  }
  if (options) {
    if (options._asComponent && !options.template) {
      options.template = '<slot></slot>'
    }
    if (options.template) {
      // @util/dom
      // 将内容释放出来
      options._content = extractContent(el)
      // 嵌入
      el = transcludeTemplate(el, options)
    }
  }
  if (isFragment(el)) {
    // 针对IE的hack
    ...
  }
  return el
}
```
