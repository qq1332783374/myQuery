(function(win, doc) {
	// 定义
	var tQuery = function(selector, context) {
		// 调用时需要初始化对象
		return new tQuery.fn.init(selector, context)
	};

	// 基本类型选择器
	tQuery.fn = tQuery.prototype = {
		constructor: tQuery,
		init: function(selector, context) { // 初始化函数
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
	tQuery.extend = tQuery.fn.extend = function() {
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

	// html 方法
	tQuery.fn.extend({
		html: function() {
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
