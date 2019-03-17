(function () {
  'use strict'

  // Use $ as namespace internally
  var $;

  // Fast accessing natives
  var arr = [];
  var obj = {};
  var slice = arr.slice;
  var filter = arr.filter;
  var concat = arr.concat;
  var toString = obj.toString;
  var getProto = Object.getPrototypeOf;


  // Store previous $, $$ and Owl in case of overwrite
  var _$ = window.$;
  var _$$ = window.$$;
  var _Owl = window.Owl;


  // Declear internal-use functions
  function noop() {}

  function type(obj) {
    return toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
  }

  function isNode(node) {
    return !!node && (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9);
  }

  function isElement(node) {
    return !!node && node.nodeType === 1;
  }

  function isArray(obj) {
    return Array.isArray && Array.isArray(obj) || type(obj) === 'array';
  }

  function isArrayLike(obj) {
    var length = !!obj && 'length' in obj && obj.length;
    var t = type(obj);

    if (t === 'function' || isWindow(obj)) {
      return false;
    }

    return t === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
  }

  function isWindow(obj) {
    return obj && obj === obj.window;
  }

  function isPlainObject(obj) {
    return type(obj) === 'object' && !isWindow(obj) && getProto(obj) === Object.prototype;
  }

  function curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return function (_b) {
            return fn(a, _b);
          };
        default:
          return fn(a, b);
      }
    }
  }

  function curry3(fn) {
    return function f3(a, b, c) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return curry2(function (_b, _c) {
            return fn(a, _b, _c);
          });
        case 2:
          return function (_c) {
            return fn(a, b, _c);
          };
        default:
          return fn(a, b, c);
      }
    }
  }

  function curry(fn) {
    var args = slice.call(arguments, 1);

    return args.length >= fn.length ?
      fn.apply(void 0, args) :
      function () {
        var rest = slice.call(arguments);

        return curry.apply(void 0, [fn].concat(args, rest));
      };
  }

  function map(callback, arr) {
    var i = -1;
    var l = arr.length;
    var ret = new Array(l);

    while (++i < l) {
      ret[i] = callback(arr[i], i, arr);
    }

    return ret;
  }

  function extend() {
    var options, src, clone, copy;
    var target = arguments[0] || {};
    var source = {};
    var i = 0;
    var l = arguments.length;
    var deep = false;


    // Check if a deep merge
    if (typeof target === 'boolean') {
      deep = true;
      target = arguments[1];
      i++;
    }

    while (++i < l) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) continue;

          if (deep & copy & isPlainObject(copy)) {
            clone = src & isPlainObject(src) ? src : {};

            target[name] = $.extend(deep, clone, copy);

            // Exclude undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  function switchSourceType(val, src, cond1, cond2, f1, f2, lock, one) {
    var isFn;

    if (cond1) {
      f1(val, src);
    } else if (src.length && !lock) {
      isFn = typeof cond2 === 'function';

      if (!one) {
        src.forEach(function (el) {
          if (isFn ? cond2(el) : cond2) {
            f2(val, el);
          }
        });
      } else {
        if (isFn ? cond2(src[0]) : cond2) {
          f2(val, src[0]);
        }
      }
    }

    return src;
  }

  function switchNullString(str, src, cond1, cond2, f1, f2, f3, f4) {
    var isFn = typeof cond2 === 'function';

    if (str == null) {
      if (cond1) return f1(str, src);
      else if (src.length) {
        if (isFn ? cond2(src[0]) : cond2) {
          return f2(str, src[0]);
        }
      }

      return undefined;
    } else if (typeof str === 'string') {
      if (cond1) f3(str, src);
      else if (src.length) {
        src.forEach(function (el) {
          if (isFn ? cond2(el) : cond2) {
            f4(str, el);
          }
        })
      }
    }

    return src;
  }

  function switchStringObject(opts, src, cond1, cond2, f1, f2, f3, f4) {
    var key, isFn;
    var type = typeof opts === 'string' ? 'string' : (isPlainObject(opts) ? 'object' : '');

    if (src.length) {
      isFn = typeof cond2 === 'function';
      if (type === 'string' && (isFn ? cond2(src[0]) : cond2)) return f3(opts, src[0]);
      else if (type === 'object') {
        src.forEach(function (el) {
          if (isFn ? cond2(el) : cond2) {
            for (key in opts) {
              f4(opts, el, key);
            }
          }
        });
      }
    } else if (cond1) {
      if (type === 'string') return f1(opts, src);
      else if (type === 'object') {
        for (key in opts) {
          f2(opts, src, key);
        }
      }
    }

    return src;
  }

  /**
   * A wrapper function of native querySelector
   *
   * @param {String} selector A valid CSS selector string
   * @param {Context=} context If not presented, context is set to document
   * @return {Element} First Element that matches the selector, or null if there are not matches
   */
  $ = function (selector, context) {
    return typeof selector === 'string' ? (context || document).querySelector(selector) : (isNode(selector) ? selector : null);
  };


  // In order to document better, use extend to add methods to $
  extend($, {
    /**
     * A wrapper function of native querySelectorAll
     *
     * @param {String} selector A valid CSS selector string
     * @param {Context=} context If not presented, context is set to document
     * @return {Element[]} All elements that matches the selector, or [ ] if there are not matches
     */
    all: function (selector, context) {
      var nodes;

      if (typeof selector === 'string') {
        nodes = (context || document).querySelectorAll(selector);
      } else if (isArrayLike(selector)) {
        nodes = selector;
      } else {
        nodes = [];
      }

      if ('forEach' in nodes) {
        return nodes;
      } else {
        return slice.call(nodes);
      }
    },

    /**
     * Performs left-to-right function composition. The leftmost function may have
     * any arity; the remaining functions must be unary.
     *
     * @param {...Function} functions
     * @return {Function} a composed function
     */
    pipe: function (f) {
      var fs = slice.call(arguments, 1);

      return function () {
        return fs.reduce(function (a, c) {
          return c(a);
        }, f.apply(void 0, arguments));
      };
    },

    /**
     * Performs different actions for defferent parameter pairs:
     * 1. (selector, Node): Get the first descendant that matches the selector
     * 2. (selector, nodeList): Get the descendants of each element in list that match the selector
     * 3. (Node/nodeList, Node/nodeList): Goto the node or nodeList that passed into the first parameter
     * 4. (number, nodeList): Goto nodeList[number]
     *
     * **Note:** This function is automatically curried
     * @param {String} selector
     * @param {(Node|Node[])} src
     * @return {(Node|Node[])} Node or nodeList
     */
    find: curry2(function (selector, src) {
      var isString = typeof selector === 'string';

      if (src.length) {
        if (isString) {
          return concat.apply([], map(function (el) {
            return slice.call($.all(selector, el));
          }, src));
        } else if (typeof selector === 'number') {
          return src[selector];
        } else if (isNode(selector) || isArrayLike(selector)) {
          return selector;
        }
      } else if (isNode(src)) {
        if (isString) return $(selector, src);
        else if (isNode(selector) || isArrayLike(selector)) return selector;
      }
    }),

    /**
     * Get the value of a property for the given node or first node in nodeList.
     * Or set one or more properties for the given node/nodeList
     *
     * **Note:** This method is automatically curried
     * @param {(String|Object)} property String as getter or object as setter
     * @param {(Node|Node[])} source Node or nodeList
     * @return {(Property|Node|Node[])} Return value of property when acting as getter, or Node/nodeList when acting as setter
     */
    prop: curry2(function (prop, src) {
      function get(prop, src) {
        return src[prop];
      }

      function set(prop, src, key) {
        src[key] = prop[key];
      }

      return switchStringObject(prop, src, true, true, get, set, get, set);
    }),

    /**
     * Extract the values of a given property for the given nodeList
     *
     * **Note:** This method is automatically curried
     * @param {String} property a valid property string
     * @param {Node[]} source nodeList
     * @return {Array} An array containing property values
     */
    pluck: curry2(function (prop, src) {
      return map(function (el) {
        return el[prop];
      }, src);
    }),

    /**
     * Clone the received node.
     *
     * @param {Node} node The node to copy
     * @return {Node} Copy of source node
     */
    clone: function (node) {
      return node.cloneNode(true);
    },

    /**
     * Remove all descendants of a given node or nodeList
     *
     * @param {Node|Node[]} source Node or nodeList
     * @return {Node|Node[]} Source that passed in
     */
    empty: function (src) {
      function set(val, elem) {
        elem.innerHTML = val;
      }

      return switchSourceType('', elem, isElement(src), isElement, set, set);
    },

    /**
     * Check the source node against other node or a selector
     *
     * **Note:** This method is automatically curried
     * @param {Node|String} node A node to compare with or a selector to match
     * @param {Node} node Source node
     * @return {Boolean} True if two nodes are equal or source node matches the selector
     */
    is: curry2(function (other, node) {
      if (typeof other !== 'string') {
        return node === other;
      } else {
        return (node.matches ||
          node.matchesSelector ||
          node.msMatchesSelector ||
          node.mozMatchesSelector ||
          node.webkitMatchesSelector ||
          node.oMatchesSelector).call(node, other);
      }
    }),

    /**
     * Check if source node contains other node
     *
     * **Note:** This method is automatically curried
     * @param {Node} node A node to check against
     * @param {Node} node Source node
     * @return {Boolean} True if source node contains the specific node
     */
    contains: curry2(function (otherNode, node) {
      if (node.nodeType) {
        return node !== otherNode && node.contains(otherNode);
      }

      return false;
    }),

    /**
     * Reduce the nodeList to those that pass the function's test
     *
     * **Note:** This method is automatically curried
     * @param {Function} function A filter funtion
     * @param {Node[]} node NodeList
     * @return {Array} All nodes in nodeList that pass the test
     */
    filter: curry2(function (filterFn, nodes) {
      return filter.call(nodes, filterFn);
    }),

    /**
     * Remove a given node or nodeList from the DOM
     *
     * @param {(Node|Node[])} node Node or nodeList
     * @return {(Node|Node[])} Return given node or nodeList even they are removed from DOM
     */
    remove: function (node) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      } else if (node.length) {
        node.forEach(function (el) {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      }

      return node;
    },

    /**
     *  Get the siblings of a given element
     *
     * @param {Element} element An element node
     * @return {Array} Siblings
     */
    siblings: function (elem) {
      if (isElement(elem)) {
        return $.filter(function (el) {
          return el !== elem;
        }, elem.parentNode.children);
      }
    },

    /**
     * Insert htmlString or node to the end of the node or each node in the nodeList.
     *
     * **Note:** This method is automatically curried
     * @param {(String|Node)} node A node or htmlString
     * @param {(Node|Node[])} source Node or nodeList
     * @return {(Node|Node[])} Source that passed in
     */
    append: curry2(function (node, src) {
      function set(node, src) {
        src.appendChild($.clone(node));
      }

      if (typeof node === 'string') node = parseHTML(node);

      return switchSourceType(node, src, isNode(src), isNode, set, set);
    }),

    /**
     * Insert htmlString or node to the beginning of the node or each node in the nodeList.
     *
     * **Note:** This method is automatically curried
     * @param {(String|Node)} node A node or htmlString
     * @param {(Node|Node[])} source Node or nodeList
     * @return {(Node|Node[])} Source that passed in
     */
    prepend: curry2(function (node, src) {
      function set(node, src) {
        src.insertBefore($.clone(node), src.firstChild);
      }

      if (typeof node === 'string') node = parseHTML(node);

      return switchSourceType(node, src, isNode(src), isNode, set, set);
    }),

    /**
     * Insert htmlString or node after the node or each node in the nodeList.
     *
     * **Note:** This method is automatically curried
     * @param {(String|Node)} node A node or htmlString
     * @param {(Node|Node[])} source Node or nodeList
     * @return {(Node|Node[])} Source that passed in
     */
    after: curry2(function (node, src) {
      function set(node, src) {
        if (src.parentNode) {
          src.parentNode.insertBefore($.clone(node), src.nextSibling);
        }
      }

      if (typeof node === 'string') node = parseHTML(node);

      return switchSourceType(node, src, isNode(src), true, set, set);
    }),

    /**
     * Insert htmlString or node before the node or each node in the nodeList.
     *
     * **Note:** This method is automatically curried
     * @param {(String|Node)} node A node or htmlString
     * @param {(Node|Node[])} source Node or nodeList
     * @return {(Node|Node[])} Source that passed in
     */
    before: curry2(function (node, src) {
      function set(node, src) {
        if (src.parentNode) {
          src.parentNode.insertBefore($.clone(node), src);
        }
      }

      if (typeof node === 'string') node = parseHTML(node);

      return switchSourceType(node, src, isNode(src), true, set, set);
    }),

    /**
     * Get the HTML contents of the given element or first element in the given elementList.
     * Or set the HTML contents of the given element or every element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {(Null|String)} htmlString Null as getter or htmlString as setter
     * @param {(Element|Element[])} source Element or elementList
     * @return {(String|Element|Element[])} Return htmlString when acting as getter, or element/elementList when acting as setter
     */
    html: curry2(function (str, src) {
      function get(str, elem) {
        return elem.innerHTML;
      }

      function set(str, elem) {
        elem.innerHTML = str;
      }

      return switchNullString(str, src, isElement(src), isElement, get, get, set, set);
    }),

    /**
     * Get the text contents of the given node or first node in the given nodeList.
     * Or set the text contents of the given node or every node in the given nodeList
     *
     * **Note:** This method is automatically curried
     * @param {(Null|String)} string Null as getter or string as setter
     * @param {(Node|Node[])} source node or nodeList
     * @return {(String|Node|Node[])} Return string when acting as getter, or node/nodeList when acting as setter
     */
    text: curry2(function (text, src) {
      function get(text, src) {
        return src.textContent;
      }

      function set(text, src) {
        $.empty(src).textContent = text;
      }

      return switchNullString(text, src, isNode(src), isNode, get, get, set, set);
    }),

    /**
     * Get the value of an attribute for the given element or first element in the given elementList
     * Or set one or more attributes for the given element or every element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {(String|Object)} string String as getter or object as setter
     * @param {(Element|Element[])} source Element or elementList
     * @return {(String|Element|Element[])} Return string when acting as getter, or element/elementList when acting as setter
     */
    attr: curry2(function (opts, src) {
      function get(opts, elem) {
        return elem.getAttribute(opts);
      }

      function set(opts, elem, key) {
        elem.setAttribute(key, opts[key]);
      }

      return switchStringObject(opts, src, isElement(src), isElement, get, set, get, set);
    }),

    /**
     * Get the current value of the given element or first element in the given elementList
     * Or set the value of the given element or every element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {(Null|String)} string Null as getter or string as setter
     * @param {(Element|Element[])} source Element or elementList
     * @return {(String|Element|Element[])} Return string when acting as getter, or element/elementList when acting as setter
     */
    val: curry2(function (val, src) {
      function get(val, elem) {
        return elem.value;
      }

      function set(val, elem) {
        elem.value = val;
      }

      function cond(elem) {
        return 'value' in elem;
      }

      return switchNullString(val, src, cond(src), cond, get, get, set, set);
    }),

    /**
     * Get the value of a computed style property for the given element or first element in the given elementList
     * Or set one or more CSS properties for the given element or every element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {(String|Object)} string String as getter or Object as setter
     * @param {(Element|Element[])} source Element or elementList
     * @return {(String|Element|Element[])} Return string when acting as getter, or element/elementList when acting as setter
     */
    css: (function () {
      var rmsPrefix = /^-ms-/;
      var rdashAlpha = /-([a-z])/g;
      var rcamelAlpha = /([A-Z])/g;
      var rcustomProp = /^--/;

      function fcamelCase(all, letter) {
        return letter.toUpperCase();
      }

      function camelCase(string) {
        return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
      }

      function fdasherize(all, letter) {
        return '-' + letter.toLowerCase();
      }

      function dasherize(string) {
        return string.replace(rcamelAlpha, fdasherize);
      }

      return curry2(function (opts, elem) {
        function get(opts, elem) {
          return getComputedStyle(elem).getPropertyValue(dasherize(opts));
        };

        function set(opts, elem, key) {
          elem.style[rcustomProp.test(key) ? key : camelCase(key)] = opts[key];
        }

        return switchStringObject(opts, elem, isElement(elem), isElement, get, set, get, set);
      });
    })(),

    /**
     * Display the given element or first element in the given elementList
     *
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    show: function (src) {
      $.css({
        display: ''
      }, src)
    },

    /**
     * Hide the given element or first element in the given elementList
     *
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    hide: function (src) {
      $.css({
        display: 'none'
      }, src)
    },

    /**
     * Add the specific class(es) to the given element or first element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {String} class
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    addClass: curry2(function (str, elem) {
      function set(str, elem) {
        elem.classList.add(str);
      }

      return switchSourceType(str, elem, isElement(elem), isElement, set, set);
    }),

    /**
     * Remove the specific class(es) to the given element or first element in the given elementList
     *
     * **Note:** This method is automatically curried
     * @param {String} class
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    removeClass: curry2(function (str, elem) {
      function set(str, elem) {
        elem.classList.remove(str);
      }

      return switchSourceType(str, elem, isElement(elem), isElement, set, set);
    }),

    /**
     * Add or remove one or more classes from the given element or each element in the elementList
     * depending on the class's presence.
     *
     * **Note:** This method is automatically curried
     * @param {String} class
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    toggleClass: curry2(function (str, elem) {
      function set(str, elem) {
        elem.classList.toggle(str);
      }

      return switchSourceType(str, elem, isElement(elem), isElement, set, set);
    }),

    /**
     * Check if the specific class exists in the given element or each element in the elementList
     *
     * **Note:** This method is automatically curried
     * @param {String} class
     * @param {(Element|Element[])} source Element or elementList
     * @return {(Element|Element[])} Source that passed in
     */
    hasClass: curry2(function (str, elem) {
      var ret = false;
      var i, len;

      if (isElement(elem)) {
        ret = elem.classList.contains(str);
      } else if (elem.length) {
        i = -1;
        ret = true;
        len = elem.length;

        while (++i < len) {
          if (!isElement(elem[i]) || (isElement(elem[i]) && elem[i].classList.contains(str) === false)) {
            ret = false;
            break;
          }
        }
      }

      return ret;
    }),

    /**
     * Get the current coordinates of the given element, relative to the document
     *
     * @param {Element} element
     * @return {Object} An object containing property 'top' and property 'left'
     */
    offset: function (elem) {
      var rect;

      if (!isElement(elem)) return;

      rect = elem.getBoundingClientRect();

      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      }
    },

    /**
     * Get the current coordinates of the given element, relative to the offset parent
     *
     * @param {Element} element
     * @return {Object} An object containing property 'top' and property 'left'
     */
    position: function (elem) {
      if (!isElement(elem)) return;

      return {
        top: elem.offsetTop,
        left: elem.offsetLeft
      }
    },

    /**
     * Set up a function that will be called whenever the specific event is delivered to the target.
     * This method actually wrap over EventTarget.addEventListener(type, listener, false)
     *
     * **Note:** This method is automatically curried
     * @param {String} type Event type (case-sensitive)
     * @param {Function} handler Event handler function
     * @param {Object} target Element, Document, Window, and any object that supports events
     * @return {Object} Target that passed in
     */
    on: curry3(function (type, handler, target) {
      function add(el) {
        el.addEventListener(type, handler, false);
      }

      isArrayLike(target) ? $$(target).forEach(add) : add(target);

      return target;
    }),

    /**
     * Remove an event handler that was attached with .on( )
     *
     * **Note:** This method is automatically curried
     * @param {String} type Event type (case-sensitive)
     * @param {Function} handler A handler function previously attached for the event
     * @param {Object} target Event target
     * @return {Object} Event target that passed in
     */
    off: curry3(function (type, handler, target) {
      function remove(el) {
        el.removeEventListener(type, handler, false);
      }

      isArrayLike(target) ? $$(target).forEach(remove) : remove(target);

      return target;
    }),

    /**
     * Execute all handlers and behaviors attached to the given target
     * or each target in the targetList for the specific custom event.
     * For native event triggering, use .triggerN( ) instead
     *
     * **Note:** This method is automatically curried
     * @param {String} type Event type (case-sensitive)
     * @param {*} data Any data passed to initialize the event
     * @param {Object} target Event target
     * @return {Object} Event target that passed in
     */
    trigger: curry3(function (type, data, target) {
      var evt;

      if (window.CustomEvent) {
        evt = new CustomEvent(type, {
          detail: data
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(type, true, true, data);
      }

      isArrayLike(target) ? $$(target).forEach(function (el) {
        el.dispatchEvent(evt);
      }) : target.dispatchEvent(evt);

      return target;
    }),

    /**
     * Execute all handlers and behaviors attached to the given target
     * or each target in the targetList for the specific native event.
     * For custom event triggering, use .trigger( ) instead
     *
     * **Note:** This method is automatically curried
     * @param {String} type Event type (case-sensitive)
     * @param {Object} target Event target
     * @return {Object} Event target that passed in
     */
    triggerN: curry2(function (type, target) {
      var evt;

      try {
        evt = new Event(type, {
          'bubbles': true,
          'cancelable': false
        });
      } catch (e) {
        evt = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
      }

      isArrayLike(target) ? $$(target).forEach(function (el) {
        el.dispatchEvent(evt);
      }) : target.dispatchEvent(evt);

      return target;
    }),

    /**
     * Specify a function to execute when the DOM is fully loaded.
     *
     * @param {Function} function
     * @return {Undefined} Undefined
     */
    ready: function (fn) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    },

    /**
     * Release control of the $ and $$ variable
     *
     * @param {Boolean} boolean True to release $, $$ and Owl itself
     * @return {Owl} Owl
     */
    noConflict: function (deep) {
      if (window.$ === $) {
        window.$ = _$;
        window.$$ = _$$;
      }

      if (deep && window.Owl === $) {
        window.Owl = _Owl;
      }

      return $;
    },

    /**
     * jQuery parseHTML (without scripts options).
     * Unlike jQuery, this returns a DocumentFragment.
     *
     * @param {String} htmlString A string containing html
     * @param {Document} context Default to document
     * @return {DocumentFragment} documentFragment
     */
    parseHTML: (function () {
      var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        // We have to close these tags to support XHTML (#13200)
        wrapMap = {
          // Support: IE9
          option: [1, "<select multiple='multiple'>", "</select>"],

          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

          _default: [0, "", ""]
        };

      return function parseHTML(elem, context) {
        context = context || document;

        var tmp, tag, wrap, j,
          fragment = context.createDocumentFragment();

        if (!rhtml.test(elem)) {
          fragment.appendChild(context.createTextNode(elem));

          // Convert html into DOM nodes
        } else {
          tmp = fragment.appendChild(context.createElement("div"));

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }

          // Remove wrappers and append created nodes to fragment
          fragment.removeChild(fragment.firstChild);
          while (tmp.firstChild) {
            fragment.appendChild(tmp.firstChild);
          }
        }

        return fragment;
      };
    })()
  });


  // Expose util functions
  $.fn = {
    map: map,
    type: type,
    pipe: $.pipe,
    curry: curry,
    extend: extend,
    isArray: isArray,
    isArrayLike: isArrayLike,
    isPlainObject: isPlainObject
  };


  // Export $, $$ and Owl to global scope
  window.$ = window.Owl = $;
  window.$$ = $.all;
})();
