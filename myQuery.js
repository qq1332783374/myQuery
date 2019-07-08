(function (win, doc) {
	// 定义
	var tQuery = function (selector, context) {
		// 调用时需要初始化对象
		return new tQuery.fn.init(selector, context)
	};

	// 基本类型选择器
	tQuery.fn = tQuery.prototype = {
		constructor: tQuery,
		init: function (selector, context) { // 初始化函数
			// 设置元素的长度
			this.length = 0;
			// 获取默认元素
			context = context || document;
			if (~selector.indexOf('#')) { // id 选择器
				this[0] = document.getElementById(selector.slice(1));
				this.length = 1;
			} else if (~selector.indexOf('.')) { // class 选择器
				let domsClass = document.getElementsByClassName(selector.slice(1)),
					i = 0,
					len = domsClass.length;
				for (; i < len; i++) {
					this[i] = domsClass[i];
				}
				this.length = len;
			} else { // 标签选择器
				let doms = context.getElementsByTagName(selector),
					i = 0,
					len = doms.length;
				// 将获取到的标签数组添加到当前对象
				for (; i < len; i++) {
					this[i] = doms[i];
				}
				this.length = len;
			}
			this.context = context;
			this.selector = selector;
			return this
		},
		// 增强数组
		push: [].push,
		sort: [].sort,
		splice: [].splice
	}

	// 方法扩展
	tQuery.extend = tQuery.fn.extend = function () {
		// 扩展对象从第二个参数算起
		var i = 1,
			len = arguments.length,
			target = arguments[0],
			j;
		if (i === len) {
			target = this;
			i--;
		}
		// 将参数对象合并到target
		for (; i < len; i++) {
			for (j in arguments[i]) {
				target[j] = arguments[i][j];
			}
		}
		return target
	}

	// 添加事件
	tQuery.fn.extend({
		on: (() => {
			// 判断对象是否存在
			if (document.addEventListener) {
				/**
				 * type: 事件类型
				 * fn: callback
				 */
				return function (type, fn) {
					let i = this.length - 1;
					for (; i >= 0; i--) {
						this[i].addEventListener(type, fn, false);
					}
					return this
				}
			} else if (document.attachEvent) { // ie浏览器dom2级事件 更多原理细节 请翻阅 《JavaScript高级程序设计》 DOM 节点那一章节
				return function (type, fn) {
					var i = this.length - 1;
					for (; i >= 0; i--) {
						this[i].addEvent('on' + type, fn)
					}
					return this
				}
			} else { // 不支持dom2的浏览器
				return function (type, fn) {
					var i = this.length - 1;
					for (; i >= 0; i--) {
						this[i]['on' + type] = fn;
					}
					return this
				}
			}
		})()
	})

	// 将‘-’分割线转换为驼峰式
	/**
	 * 由于JS名称不能带 -
	 */
	tQuery.extend({
		camelCase: function (str) {
			return str.replace(/\-(\w)/g, function (all, letter) {
				return letter.toUpperCase();
			})
		}
	})
	// css 方法
	tQuery.fn.extend({
		css: function () {
			var arg = arguments,
				len = arg.length;
			if (this.length < 1) {
				return this;
			}
			/**
			 * 当参数为一个的时候需要判断参数的类型进行操作
			 * 为string 类型时，执行的操作应是获取当前元素的css相关信息
			 * 为 object 类型时，执行的操作是设置当前元素的css样式
			 */
			if (len === 1) {
				if (typeof arg[0] === 'string') {
					if (this[0].currentStyle) {
						return this[0].currentStyle[arg[0]]; // currentStyle API 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Element/currentStyle
					} else {
						return getComputedStyle(this[0], false)[arg[0]] //getComputedStyle API 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
					}
				} else if (typeof arg[0] === 'object') {
					for (var i in arg[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].style[tQuery.camelCase(i)] = arg[0][i];
						}
					}
				}
			} else if (len === 2) {
				for (let j = this.length - 1; j >= 0; j--) {
					this[j].style[tQuery.camelCase(i)] = arg[0][i];
				}
			}
			return this;
		}
	});

	// attr 方法
	tQuery.fn.extend({
		attr: function () {
			var arg = arguments,
				len = arg.length;
			if (len < 1) {
				return this
			}
			if (len === 1) {
				if (typeof arg[0] === 'string') {
					return this[0].getAttribute(arg[0]) // getAttribute API 介绍 https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
				} else if (typeof arg[0] === 'object') {
					for (var i in arg[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].setAttribute(i, arg[0][i])  // // setAttribute API 介绍 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute
						}
					}
				}
			} else if (len === 2) {
				for(var j=this.length -1; j>=0; j--){
					this[j].setAttribute(arg[0], arg[1]);
				}
			}
			return this
		}
	})

	// html 方法
	tQuery.fn.extend({
		html: function () {
			var arg = arguments,
				len = arg.length;
			if (len === 0) {
				return this[0] && this[0].innerHTML
			} else {
				for (var i = this.length - 1; i >= 0; i--) {
					this[i].innerHTML = arg[0];
				}
			}
			return this
		}
	})
	// 添加到原型链
	tQuery.fn.init.prototype = tQuery.fn;
	// 全局添加tQuery
	window.tQuery = window.$t = tQuery;
})(window, document);