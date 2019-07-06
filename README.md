## myQuery

这是一个根据 **jQuery** 原理写的一个 JavaScript 类库，目的是为了提升一下自己 JS 基础能力。希望在真正毕业的时候能有所作为！

## API

1. 选择器（目前只要三种类型的选择器: id class 标签）

* id选择器：$t('#id')
* class 选择器：$t('.class')
* 标签选择器： $t('domName')

2. html() 设置和访问节点的文本值

```javascript
$t('#txt').html()  // get text
$t('#txt').html('set text')  // 设置值
```

3. 代码正在加速生产中......

> 由于是小白一个，那里不对的请各位大神指出来，我及时修改过来。感谢大家。在这里要特别感谢来自掘金的大神 [徐小夕](https://juejin.im/user/5b985481f265da0a87264251)