(function () {
	"use strict";

	var root = this,
		ArrProto = Array.prototype,
		ObjProto = Object.prototype,
		slice = ArrProto.slice,
		concat = ArrProto.concat,
		push = ArrProto.push,
		indexof = ArrProto.indexOf,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty,
		getProto = Object.getPrototypeOf;



	// Mainly for internal use
	function isArrayLike (obj) {
		if (typeof obj.length === "number") {
			if (obj.length === 0) {
				return true;
			} else if (obj.length > 0) {
				return (obj.length -1) in obj;
			}
		}
	}

	function isFunction (obj) { return type(obj) === "function" }
	function isWindow (obj) { return obj != null && obj === obj.window }
	function isArray (obj) { return Array.isArray(obj) || type(obj) === "array"}
	function isPlainObject (obj) {
		return toString.call(obj) === "[object Object]" && !isWindow(obj) && getProto(obj) === Object.prototype;
	}



	// Initialize an Owl object without using the evil new.
	var Owl = function (selector, context) {
		return new Owl.fn.init(selector, context);
	};


	Owl.fn = Owl.prototype = {

		constructor: Owl,

		length: 0,

		splice: ArrProto.splice,

		toArray: function () {
			Array.prototype.slice.call(this);
			return this;
		},

		html: function (value) {
			if (value === undefined) {
				return this[0].innerHTML;
			} else if (typeof value === "string") {
				Owl.each(this, function(i, el) {
					el.innerHTML = value;
				});
				return this;
			}
		},

		text: function (text) {
			return arguments.length ?
			this.empty().each(function () {
				if (this.nodeType === 1 || this.nodeType === 11) {
					this.textContent = text;
				}
			}) :
			(0 in this ? this.pluck('textContent').join("") : null);
		},

		attr: function (name, value) {
			if (1 in arguments) {
				Owl.each(this, function (i, el) {
					el.setAttribute(name, value);
				});
				return this;
			} else {
				return this[0] && this[0].getAttribute(name);
			}

			return this;
		},

		css: function (propName, value) {
			if (1 in arguments) {
				return Owl.each(this, function (i, el) {
					el.style[propName] = value;
				});
			} else if (arguments && this[0]) {
				return document.defaultView.getComputedStyle(this[0]).getPropertyValue(propName);
			}
		},

		offset: function () {
			var offset = this[0].getBoundingClientRect();
			return {
				top: offset.top + window.pageYOffset,
				left: offset.left + window.pageXOffset
			}
		},

		rect: function () {
			return this[0].getBoundingClientRect();
		},

		scrollTop: pageYOffset,
		scrollLeft: pageXOffset,

		show: function () {
			this.css("display", "");
			return this;
		},

		hide: function () {
			this.css("display", "none");
			return this;
		},

		val: function(value) {
			if (arguments.length) {
				if (value == null) {value = ""};
				Owl.each(this, function(i, el) {
					if(el.nodeType === 1) {
					el.value = value;
					}
				});
				return this;
			} else {
				return this[0].value || "";
			}
		},

		find: function (selector) {
			var ret = Owl();

			Owl.each(this, function (i, el) {
				push.apply(ret, el.querySelectorAll(selector));
			})

			return ret;
		},

		next: function () { return Owl(this.pluck("nextElementSibling"))},

		prev: function () { return Owl(this.pluck("previousElementSibling"))},

		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},

		empty: function(){
			return this.each(function(){
				if (this.nodeType === 1) {
				this.innerHTML = '';
				}
			});
		},

		each: function(callback) {
			return Owl.each(this, callback);
		},

		pluck: function(property){
			return Owl.map(this, function(el){ return el[property] })
		},

		on: function (events, handler) {
			return Owl.each(this, function (i, el) {
				el.addEventListener(events, handler, false);
			});
		},

		click: function ("click", handler) {
			return Owl.each(this, function(i, el) {
				el.addEventListener(events, handler, false)
			}
		},

		unbind: function (events, handler) {
			return Owl.each(this, function (i, el) {
				el.removeEventListener(events, handler, false);
			});
		},

		addClass: function (str) {
			this.each(function (i, el) {
				el.classList.add(str);
			});
			return this;
		},

		removeClass: function (str) {
			this.each(function (i, el) {
				el.classList.remove(str);
			});
			return this;
		},

		toggleClass: function (str) {
			this.each(function (i, el) {
				el.classList.toggle(str);
			});
			return this;
		},

		hasClass: function (str) {
			var ret = 0;

			this.each(function (i, el) {
				if (el.classList.contains(str) === false) {
					ret++;
				}
			});

			return ret ? false : true;
		}

	};


	var isId = /^#([\w\-]+)$/,

	init = Owl.fn.init = function(selector, context) {
		var id = isId.exec(selector),
			context = context || document;

		if (!selector) {
			return this;
		} else if (id) {
			var	el = document.getElementById(id[1]);
			if (el) {
				this[0] = el;
				this.length = 1;
			}
			return this;
		} else if (typeof selector === "string") {
			var el = context.querySelectorAll(selector);
			if (el) {
			for (var i = 0, len = el.length; i < len; i++) {
				this[i] = el[i]
			}
			this.length = el.length;
			}
			return this;
		} else if (selector.nodeType || selector === window) {
			this[0] = selector;
			this.length = 1;
			return this;
		} else if (selector instanceof Owl) {
			return selector;
		}

		return Owl.makeArray(selector, this);
	}

	// Any instances of Owl will inherit methods from Owl.prototype
	init.prototype = Owl.prototype;



	// Merge the 'own' properties of two or more objects together into the first object.
	// If first argument is a boolean value, properties inherit from proto chains will also be copied.
	Owl.extend = function () {
		var target = arguments[0],
			source = {},
			i = 1,
			len = arguments.length,
			walkup = false;

		if (typeof target === "boolean") {
			walkup = true;
			target = arguments[1];
			i++;
		}

		for (; i < len; i++) {
			source = arguments[i];
			for (var prop in source) {
				if ( (walkup || (!walkup && source.hasOwnProperty(prop))) && source[prop] !== undefined ) {
					target[prop] = source[prop];
				}
			}
		}

		return target;
	};


	Owl.makeArray = function(arr, results) {
		var ret = results || [];

		push.apply(ret, arr);

		return ret;
	};


	var type = Owl.type = function(obj) {
		if (obj === "null") {
			return "null";
		}

		if (obj === "undefined") {
			return "undefined";
		}

		return toString.call(obj).slice(8, -1).toLowerCase();
	};

	Owl.each = function (obj, cb) {
		if (isArrayLike(obj)) {
			for (var i = 0, len = obj.length; i < len; i++) {
				if (cb.call(obj[i], i, obj[i]) === false) {
					break;
				}
			}
		} else {
			for(var key in obj) {
				if (cb.call(obj[key], i, obj[key]) === false) {
					break;
				}
			}
		}

		return obj;
	};

	Owl.map = function (elems, callback) {
		var length, value,
			i = 0,
			ret = [];

		if (isArrayLike(elems)) {
			len = elems.length;
			for (; i < len; i++) {
				value = callback(elems[i], i);
				if (value != null) {
					ret.push(value);
				}
			}
		} else {
			for (i in elems) {
				value = callback(elems[i], i);
				if (value != null) {
					ret.push(value);
				}
			}
		}

		// Flatten nested arrays
		return concat.apply([], ret);
	};

	Owl.isPlainObject = isPlainObject;
	Owl.isArray = isArray;



	return (root.Owl = root.$ = Owl);
}).call(this);
