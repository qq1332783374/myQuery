## myQuery

这是一个根据 **jQuery** 原理写的一个 JavaScript 类库，目的是为了提升一下自己 JS 基础能力。希望在真正毕业的时候能有所作为！

## API

1. 选择器（目前只要三种类型的选择器: id class 标签）

* id选择器：$t('#id')
* class 选择器：$t('.class')
* 标签选择器： $t('domName')

2. 事件绑定 `$t('#id').on(type, fn)`

```javascript
$t('#id').on('click', () => {
    alert('Hello World')
})
```

3. 设置和访问DOM节点css样式 `$t('.class').css(string | object, ?[string])`

```javascript
// 1. 访问css
$t('.class').css('width')

// 2. 设置 css  string
$t('.class').css('width', '1024px')

// 3. 设置 css  object
$t('.class').css({
    width: '1024px',
    height: '1024px'
})
```

4. 设置和访问DOM节点属性 `$t('#id').attr(string | object, ?[string])`

```javascript
// 1. 访问
$t('#id').attr('id')

// 2. 设置 attr   string
$t('#id').attr('title', 'idTitle')

// 3. 设置 attr   object
$t('#id').attr({
    title: 'idTitle',
    name: 'idName'
})
```


5. html() 设置和访问节点的文本值

```javascript
$t('#txt').html()  // get text
$t('#txt').html('set text')  // 设置值
```



> 由于是小白一个，那里不对的请各位大神指出来，我及时修改过来。感谢大家

特别鸣谢！
来自掘金的大神 [徐小夕](https://juejin.im/user/5b985481f265da0a87264251)