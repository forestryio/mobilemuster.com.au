var app = (function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ready = createCommonjsModule(function (module) {
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  module.exports = definition();

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) listener();
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }

});
});



var ready$2 = Object.freeze({
	default: ready,
	__moduleExports: ready
});

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	};
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add";

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

'use strict';
const elproto = window.HTMLElement.prototype;
const HIDDEN = 'hidden';

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function () {
      return this.hasAttribute(HIDDEN);
    },
    set: function (value) {
      if (value) {
        this.setAttribute(HIDDEN, '');
      } else {
        this.removeAttribute(HIDDEN);
      }
    },
  });
}

'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

// polyfills HTMLElement.prototype.hidden

var config = {
  prefix: 'usa',
};

var config_1 = config.prefix;


var config$2 = Object.freeze({
	default: config,
	__moduleExports: config,
	prefix: config_1
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};



var objectAssign$2 = Object.freeze({
	default: objectAssign,
	__moduleExports: objectAssign
});

/**
 * array-foreach
 *   Array#forEach ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-foreach
 *
 * Copyright (c) 2015-2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/array-foreach/blob/master/MIT-LICENSE
 */
'use strict';

var arrayForeach = function forEach (ary, callback, thisArg) {
    if (ary.forEach) {
        ary.forEach(callback, thisArg);
        return;
    }
    for (var i = 0; i < ary.length; i+=1) {
        callback.call(thisArg, ary[i], i, ary);
    }
};



var arrayForeach$2 = Object.freeze({
	default: arrayForeach,
	__moduleExports: arrayForeach
});

// element-closest | CC0-1.0 | github.com/jonathantneal/closest

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);

var delegate = function delegate(selector, fn) {
  return function delegation(event) {
    var target = event.target.closest(selector);
    if (target) {
      return fn.call(target, event);
    }
  }
};



var delegate$2 = Object.freeze({
	default: delegate,
	__moduleExports: delegate
});

var compose = function compose(functions) {
  return function(e) {
    return functions.some(function(fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};



var compose$2 = Object.freeze({
	default: compose,
	__moduleExports: compose
});

var delegate$3 = ( delegate$2 && delegate ) || delegate$2;

var compose$3 = ( compose$2 && compose ) || compose$2;

const SPLAT = '*';

var delegateAll = function delegateAll(selectors) {
  const keys = Object.keys(selectors);

  // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler
  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT];
  }

  const delegates = keys.reduce(function(memo, selector) {
    memo.push(delegate$3(selector, selectors[selector]));
    return memo;
  }, []);
  return compose$3(delegates);
};



var delegateAll$2 = Object.freeze({
	default: delegateAll,
	__moduleExports: delegateAll
});

var assign = ( objectAssign$2 && objectAssign ) || objectAssign$2;

var delegateAll$3 = ( delegateAll$2 && delegateAll ) || delegateAll$2;

const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
const SPACE = ' ';

const getListeners = function(type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;
  if (match) {
    type = match[1];
    selector = match[2];
  }

  var options;
  if (typeof handler === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var listener = {
    selector: selector,
    delegate: (typeof handler === 'object')
      ? delegateAll$3(handler)
      : selector
        ? delegate$3(selector, handler)
        : handler,
    options: options
  };

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(function(_type) {
      return assign({type: _type}, listener);
    });
  } else {
    listener.type = type;
    return [listener];
  }
};

var popKey = function(obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};

var behavior$3 = function behavior(events, props) {
  const listeners = Object.keys(events)
    .reduce(function(memo, type) {
      var listeners = getListeners(type, events[type]);
      return memo.concat(listeners);
    }, []);

  return assign({
    add: function addBehavior(element) {
      listeners.forEach(function(listener) {
        element.addEventListener(
          listener.type,
          listener.delegate,
          listener.options
        );
      });
    },
    remove: function removeBehavior(element) {
      listeners.forEach(function(listener) {
        element.removeEventListener(
          listener.type,
          listener.delegate,
          listener.options
        );
      });
    }
  }, props);
};



var behavior$5 = Object.freeze({
	default: behavior$3,
	__moduleExports: behavior$3
});

var forEach = ( arrayForeach$2 && arrayForeach ) || arrayForeach$2;

var Behavior = ( behavior$5 && behavior$3 ) || behavior$5;

var behavior = createCommonjsModule(function (module) {
'use strict';




const sequence = function () {
  const seq = [].slice.call(arguments);
  return function (target) {
    if (!target) {
      target = document.body;
    }
    forEach(seq, method => {
      if (typeof this[ method ] === 'function') {
        this[ method ].call(this, target);
      }
    });
  };
};

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
module.exports = (events, props) => {
  return Behavior(events, assign({
    on:   sequence('init', 'add'),
    off:  sequence('teardown', 'remove'),
  }, props));
};
});



var behavior$2 = Object.freeze({
	default: behavior,
	__moduleExports: behavior
});

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

var arrayFilter = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;



var arrayFilter$2 = Object.freeze({
	default: arrayFilter,
	__moduleExports: arrayFilter
});

var toggle = createCommonjsModule(function (module) {
'use strict';
const EXPANDED = 'aria-expanded';
const CONTROLS = 'aria-controls';
const HIDDEN = 'aria-hidden';

module.exports = (button, expanded) => {

  if (typeof expanded !== 'boolean') {
    expanded = button.getAttribute(EXPANDED) === 'false';
  }
  button.setAttribute(EXPANDED, expanded);

  const id = button.getAttribute(CONTROLS);
  const controls = document.getElementById(id);
  if (!controls) {
    throw new Error(
      'No toggle target found with id: "' + id + '"'
    );
  }

  controls.setAttribute(HIDDEN, !expanded);
  return expanded;
};
});



var toggle$2 = Object.freeze({
	default: toggle,
	__moduleExports: toggle
});

// https://stackoverflow.com/a/7557433
function isElementInViewport (el, win=window,
                              docEl=document.documentElement) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (win.innerHeight || docEl.clientHeight) &&
    rect.right <= (win.innerWidth || docEl.clientWidth)
  );
}

var isInViewport = isElementInViewport;



var isInViewport$2 = Object.freeze({
	default: isInViewport,
	__moduleExports: isInViewport
});

var events = {
  // This used to be conditionally dependent on whether the
  // browser supported touch events; if it did, `CLICK` was set to
  // `touchstart`.  However, this had downsides:
  //
  // * It pre-empted mobile browsers' default behavior of detecting
  //   whether a touch turned into a scroll, thereby preventing
  //   users from using some of our components as scroll surfaces.
  //
  // * Some devices, such as the Microsoft Surface Pro, support *both*
  //   touch and clicks. This meant the conditional effectively dropped
  //   support for the user's mouse, frustrating users who preferred
  //   it on those systems.
  CLICK: 'click',
};

var events_1 = events.CLICK;


var events$2 = Object.freeze({
	default: events,
	__moduleExports: events,
	CLICK: events_1
});

var behavior$6 = ( behavior$2 && behavior ) || behavior$2;

var filter = ( arrayFilter$2 && arrayFilter ) || arrayFilter$2;

var toggle$3 = ( toggle$2 && toggle ) || toggle$2;

var isElementInViewport$1 = ( isInViewport$2 && isInViewport ) || isInViewport$2;

var require$$0 = ( events$2 && events ) || events$2;

var require$$0$1 = ( config$2 && config ) || config$2;

var accordion_1 = createCommonjsModule(function (module) {
'use strict';






const CLICK = require$$0.CLICK;
const PREFIX = require$$0$1.prefix;

// XXX match .usa-accordion and .usa-accordion-bordered
const ACCORDION = `.${PREFIX}-accordion, .${PREFIX}-accordion-bordered`;
const BUTTON = `.${PREFIX}-accordion-button[aria-controls]`;
const EXPANDED = 'aria-expanded';
const MULTISELECTABLE = 'aria-multiselectable';

/**
 * Toggle a button's "pressed" state, optionally providing a target
 * state.
 *
 * @param {HTMLButtonElement} button
 * @param {boolean?} expanded If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 * @return {boolean} the resulting state
 */
const toggleButton = (button, expanded) => {
  var accordion = button.closest(ACCORDION);
  if (!accordion) {
    throw new Error(`${BUTTON} is missing outer ${ACCORDION}`);
  }

  expanded = toggle$3(button, expanded);
  // XXX multiselectable is opt-in, to preserve legacy behavior
  const multiselectable = accordion.getAttribute(MULTISELECTABLE) === 'true';

  if (expanded && !multiselectable) {
    forEach(getAccordionButtons(accordion), other => {
      if (other !== button) {
        toggle$3(other, false);
      }
    });
  }
};

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} true
 */
const showButton = button => toggleButton(button, true);

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} false
 */
const hideButton = button => toggleButton(button, false);

/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */
const getAccordionButtons = accordion => {
  return filter(accordion.querySelectorAll(BUTTON), button => {
    return button.closest(ACCORDION) === accordion;
  });
};

const accordion = behavior$6({
  [ CLICK ]: {
    [ BUTTON ]: function (event) {
      event.preventDefault();
      toggleButton(this);

      if (this.getAttribute(EXPANDED) === 'true') {
        // We were just expanded, but if another accordion was also just
        // collapsed, we may no longer be in the viewport. This ensures
        // that we are still visible, so the user isn't confused.
        if (!isElementInViewport$1(this)) this.scrollIntoView();
      }
    },
  },
}, {
  init: root => {
    forEach(root.querySelectorAll(BUTTON), button => {
      const expanded = button.getAttribute(EXPANDED) === 'true';
      toggleButton(button, expanded);
    });
  },
  ACCORDION,
  BUTTON,
  show: showButton,
  hide: hideButton,
  toggle: toggleButton,
  getButtons: getAccordionButtons,
});

/**
 * TODO: for 2.0, remove everything below this comment and export the
 * behavior directly:
 *
 * module.exports = behavior({...});
 */
const Accordion = function (root) {
  this.root = root;
  accordion.on(this.root);
};

// copy all of the behavior methods and props to Accordion

assign(Accordion, accordion);

Accordion.prototype.show = showButton;
Accordion.prototype.hide = hideButton;

Accordion.prototype.remove = function () {
  accordion.off(this.root);
};

module.exports = Accordion;
});



var accordion = Object.freeze({
	default: accordion_1,
	__moduleExports: accordion_1
});

'use strict';



const CLICK = require$$0.CLICK;
const PREFIX = require$$0$1.prefix;

const HEADER = `.${PREFIX}-banner-header`;
const EXPANDED_CLASS = `${PREFIX}-banner-header-expanded`;

const toggleBanner = function (event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

var banner = behavior$6({
  [ CLICK ]: {
    [ `${HEADER} [aria-controls]` ]: toggleBanner,
  },
});



var banner$2 = Object.freeze({
	default: banner,
	__moduleExports: banner
});

var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;



var lodash_debounce$2 = Object.freeze({
	default: lodash_debounce,
	__moduleExports: lodash_debounce
});

var select = createCommonjsModule(function (module) {
'use strict';

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
const isElement = value => {
  return value && typeof value === 'object' && value.nodeType === 1;
};

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
module.exports = function select (selector, context) {

  if (typeof selector !== 'string') {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document;
  }

  const selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};
});



var select$2 = Object.freeze({
	default: select,
	__moduleExports: select
});

var accordion$1 = ( accordion && accordion_1 ) || accordion;

var debounce$1 = ( lodash_debounce$2 && lodash_debounce ) || lodash_debounce$2;

var select$3 = ( select$2 && select ) || select$2;

'use strict';






const CLICK$1 = require$$0.CLICK;
const PREFIX$1 = require$$0$1.prefix;

const HIDDEN$1 = 'hidden';
const SCOPE = `.${PREFIX$1}-footer-big`;
const NAV = `${SCOPE} nav`;
const BUTTON = `${NAV} .${PREFIX$1}-footer-primary-link`;
const LIST = `${NAV} ul`;

const HIDE_MAX_WIDTH = 600;
const DEBOUNCE_RATE = 180;

const showPanel = function () {
  const list = this.closest(LIST);
  list.classList.remove(HIDDEN$1);

  // NB: this *should* always succeed because the button
  // selector is scoped to ".{prefix}-footer-big nav"
  const lists = list.closest(NAV)
    .querySelectorAll('ul');

  forEach(lists, el => {
    if (el !== list) {
      el.classList.add(HIDDEN$1);
    }
  });
};

const resize = debounce$1(() => {
  const hidden = window.innerWidth < HIDE_MAX_WIDTH;
  forEach(select$3(LIST), list => {
    list.classList.toggle(HIDDEN$1, hidden);
  });
}, DEBOUNCE_RATE);

var footer = behavior$6({
  [ CLICK$1 ]: {
    [ BUTTON ]: showPanel,
  },
}, {
  // export for use elsewhere
  HIDE_MAX_WIDTH,
  DEBOUNCE_RATE,

  init: target => {
    resize();
    window.addEventListener('resize', resize);
  },

  teardown: target => {
    window.removeEventListener('resize', resize);
  },
});



var footer$2 = Object.freeze({
	default: footer,
	__moduleExports: footer
});

'use strict';





const CLICK$2 = require$$0.CLICK;
const PREFIX$2 = require$$0$1.prefix;

const NAV$1 = `.${PREFIX$2}-nav`;
const NAV_LINKS = `${NAV$1} a`;
const OPENERS = `.${PREFIX$2}-menu-btn`;
const CLOSE_BUTTON = `.${PREFIX$2}-nav-close`;
const OVERLAY = `.${PREFIX$2}-overlay`;
const CLOSERS = `${CLOSE_BUTTON}, .${PREFIX$2}-overlay`;
const TOGGLES = [ NAV$1, OVERLAY ].join(', ');

const ACTIVE_CLASS = 'usa-mobile_nav-active';
const VISIBLE_CLASS = 'is-visible';

const isActive = () => document.body.classList.contains(ACTIVE_CLASS);

const toggleNav = function (active) {
  const body = document.body;
  if (typeof active !== 'boolean') {
    active = !isActive();
  }
  body.classList.toggle(ACTIVE_CLASS, active);

  forEach(select$3(TOGGLES), el => {
    el.classList.toggle(VISIBLE_CLASS, active);
  });

  const closeButton = body.querySelector(CLOSE_BUTTON);
  const menuButton = body.querySelector(OPENERS);

  if (active && closeButton) {
    // The mobile nav was just activated, so focus on the close button,
    // which is just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!active && document.activeElement === closeButton &&
             menuButton) {
    // The mobile nav was just deactivated, and focus was on the close
    // button, which is no longer visible. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }

  return active;
};

const resize$1 = () => {
  const closer = document.body.querySelector(CLOSE_BUTTON);

  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // The mobile nav is active, but the close box isn't visible, which
    // means the user's viewport has been resized so that it is no longer
    // in mobile mode. Let's make the page state consistent by
    // deactivating the mobile nav.
    toggleNav.call(closer, false);
  }
};

const navigation = behavior$6({
  [ CLICK$2 ]: {
    [ OPENERS ]: toggleNav,
    [ CLOSERS ]: toggleNav,
    [ NAV_LINKS ]: function () {
      // A navigation link has been clicked! We want to collapse any
      // hierarchical navigation UI it's a part of, so that the user
      // can focus on whatever they've just selected.

      // Some navigation links are inside accordions; when they're
      // clicked, we want to collapse those accordions.
      const acc = this.closest(accordion$1.ACCORDION);
      if (acc) {
        accordion$1.getButtons(acc).forEach(btn => accordion$1.hide(btn));
      }

      // If the mobile navigation menu is active, we want to hide it.
      if (isActive()) {
        toggleNav.call(this, false);
      }
    },
  },
}, {
  init () {
    resize$1();
    window.addEventListener('resize', resize$1, false);
  },
  teardown () {
    window.removeEventListener('resize', resize$1, false);
  },
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */

var navigation_1 = assign(
  el => navigation.on(el),
  navigation
);



var navigation$1 = Object.freeze({
	default: navigation_1,
	__moduleExports: navigation_1
});

'use strict';

var RE_TRIM = /(^\s+)|(\s+$)/g;
var RE_SPLIT = /\s+/;

var trim = String.prototype.trim
  ? function(str) { return str.trim(); }
  : function(str) { return str.replace(RE_TRIM, ''); };

var queryById = function(id) {
  return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
};

var resolveIdRefs = function resolveIds(ids, doc) {
  if (typeof ids !== 'string') {
    throw new Error('Expected a string but got ' + (typeof ids));
  }

  if (!doc) {
    doc = window.document;
  }

  var getElementById = doc.getElementById
    ? doc.getElementById.bind(doc)
    : queryById.bind(doc);

  ids = trim(ids).split(RE_SPLIT);

  // XXX we can short-circuit here because trimming and splitting a
  // string of just whitespace produces an array containing a single,
  // empty string
  if (ids.length === 1 && ids[0] === '') {
    return [];
  }

  return ids
    .map(function(id) {
      var el = getElementById(id);
      if (!el) {
        throw new Error('no element with id: "' + id + '"');
      }
      return el;
    });
};



var resolveIdRefs$2 = Object.freeze({
	default: resolveIdRefs,
	__moduleExports: resolveIdRefs
});

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
var toggleFieldMask = (field, mask) => {
  field.setAttribute('autocapitalize', 'off');
  field.setAttribute('autocorrect', 'off');
  field.setAttribute('type', mask ? 'password' : 'text');
};



var toggleFieldMask$2 = Object.freeze({
	default: toggleFieldMask,
	__moduleExports: toggleFieldMask
});

var resolveIdRefs$3 = ( resolveIdRefs$2 && resolveIdRefs ) || resolveIdRefs$2;

var toggleFieldMask$3 = ( toggleFieldMask$2 && toggleFieldMask ) || toggleFieldMask$2;

var toggleFormInput = createCommonjsModule(function (module) {
'use strict';





const CONTROLS = 'aria-controls';
const PRESSED = 'aria-pressed';
const SHOW_ATTR = 'data-show-text';
const HIDE_ATTR = 'data-hide-text';

/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */
const getHideText = showText => {
  return showText.replace(/\bShow\b/i, show => {
    return ('S' === show[ 0 ] ? 'H' : 'h') + 'ide';
  });
};

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */
module.exports = el => {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  const pressed = el.hasAttribute(PRESSED)
    && el.getAttribute(PRESSED) !== 'true';

  const fields = resolveIdRefs$3(el.getAttribute(CONTROLS));
  forEach(fields, field => toggleFieldMask$3(field, pressed));

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }

  const showText = el.getAttribute(SHOW_ATTR);
  const hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);

  el.textContent = pressed ? showText : hideText;
  el.setAttribute(PRESSED, pressed);
  return pressed;
};
});



var toggleFormInput$2 = Object.freeze({
	default: toggleFormInput,
	__moduleExports: toggleFormInput
});

var toggleFormInput$3 = ( toggleFormInput$2 && toggleFormInput ) || toggleFormInput$2;

'use strict';



const CLICK$3 = require$$0.CLICK;
const PREFIX$3 = require$$0$1.prefix;

const LINK = `.${PREFIX$3}-show_password, .${PREFIX$3}-show_multipassword`;

const toggle$4 = function (event) {
  event.preventDefault();
  toggleFormInput$3(this);
};

var password = behavior$6({
  [ CLICK$3 ]: {
    [ LINK ]: toggle$4,
  },
});



var password$2 = Object.freeze({
	default: password,
	__moduleExports: password
});

var ignore = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};



var ignore$2 = Object.freeze({
	default: ignore,
	__moduleExports: ignore
});

var ignore$3 = ( ignore$2 && ignore ) || ignore$2;

var search_1 = createCommonjsModule(function (module) {
'use strict';





const CLICK = require$$0.CLICK;
const PREFIX = require$$0$1.prefix;

const BUTTON = '.js-search-button';
const FORM = '.js-search-form';
const INPUT = '[type=search]';
const CONTEXT = 'header'; // XXX
const VISUALLY_HIDDEN = `${PREFIX}-sr-only`;

let lastButton;

const showSearch = function (event) {
  toggleSearch(this, true);
  lastButton = this;
};

const hideSearch = function (event) {
  toggleSearch(this, false);
  lastButton = undefined;
};

const getForm = button => {
  const context = button.closest(CONTEXT);
  return context
    ? context.querySelector(FORM)
    : document.querySelector(FORM);
};

const toggleSearch = (button, active) => {
  const form = getForm(button);
  if (!form) {
    throw new Error(`No ${FORM} found for search toggle in ${CONTEXT}!`);
  }

  button.hidden = active;
  form.classList.toggle(VISUALLY_HIDDEN, !active);

  if (active) {
    const input = form.querySelector(INPUT);
    if (input) {
      input.focus();
    }
    // when the user clicks _outside_ of the form w/ignore(): hide the
    // search, then remove the listener
    const listener = ignore$3(form, e => {
      if (lastButton) {
        hideSearch.call(lastButton);
      }
      document.body.removeEventListener(CLICK, listener);
    });

    // Normally we would just run this code without a timeout, but
    // IE11 and Edge will actually call the listener *immediately* because
    // they are currently handling this exact type of event, so we'll
    // make sure the browser is done handling the current click event,
    // if any, before we attach the listener.
    setTimeout(() => {
      document.body.addEventListener(CLICK, listener);
    }, 0);
  }
};

const search = behavior$6({
  [ CLICK ]: {
    [ BUTTON ]: showSearch,
  },
}, {
  init: (target) => {
    forEach(select$3(BUTTON, target), button => {
      toggleSearch(button, false);
    });
  },
  teardown: (target) => {
    // forget the last button clicked
    lastButton = undefined;
  },
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */

module.exports = assign(
  el => search.on(el),
  search
);
});



var search = Object.freeze({
	default: search_1,
	__moduleExports: search_1
});

var once = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};



var once$2 = Object.freeze({
	default: once,
	__moduleExports: once
});

var once$3 = ( once$2 && once ) || once$2;

'use strict';



const CLICK$4 = require$$0.CLICK;
const PREFIX$4 = require$$0$1.prefix;
const LINK$1 = `.${PREFIX$4}-skipnav[href^="#"]`;

const setTabindex = function (event) {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  const id = this.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.setAttribute('tabindex', 0);
    target.addEventListener('blur', once$3(event => {
      target.setAttribute('tabindex', -1);
    }));
  } else {
    // throw an error?
  }
};

var skipnav = behavior$6({
  [ CLICK$4 ]: {
    [ LINK$1 ]: setTabindex,
  },
});



var skipnav$2 = Object.freeze({
	default: skipnav,
	__moduleExports: skipnav
});

'use strict';

// <3 Modernizr
// https://raw.githubusercontent.com/Modernizr/Modernizr/master/feature-detects/dom/dataset.js

function useNative() {
	var elem = document.createElement('div');
	elem.setAttribute('data-a-b', 'c');

	return Boolean(elem.dataset && elem.dataset.aB === 'c');
}

function nativeDataset(element) {
	return element.dataset;
}

var dist = useNative() ? nativeDataset : function (element) {
	var map = {};
	var attributes = element.attributes;

	function getter() {
		return this.value;
	}

	function setter(name, value) {
		if (typeof value === 'undefined') {
			this.removeAttribute(name);
		} else {
			this.setAttribute(name, value);
		}
	}

	for (var i = 0, j = attributes.length; i < j; i++) {
		var attribute = attributes[i];

		if (attribute) {
			var name = attribute.name;

			if (name.indexOf('data-') === 0) {
				var prop = name.slice(5).replace(/-./g, function (u) {
					return u.charAt(1).toUpperCase();
				});

				var value = attribute.value;

				Object.defineProperty(map, prop, {
					enumerable: true,
					get: getter.bind({ value: value || '' }),
					set: setter.bind(element, name)
				});
			}
		}
	}

	return map;
};



var dist$2 = Object.freeze({
	default: dist,
	__moduleExports: dist
});

var dataset = ( dist$2 && dist ) || dist$2;

'use strict';


const PREFIX$5 = require$$0$1.prefix;
const CHECKED = 'aria-checked';
const CHECKED_CLASS = `${PREFIX$5}-checklist-checked`;

var validateInput = function validate (el) {
  const data = dataset(el);
  const id = data.validationElement;
  const checkList = id.charAt(0) === '#'
    ? document.querySelector(id)
    : document.getElementById(id);

  if (!checkList) {
    throw new Error(
      `No validation element found with id: "${id}"`
    );
  }

  for (const key in data) {
    if (key.startsWith('validate')) {
      const validatorName = key.substr('validate'.length).toLowerCase();
      const validatorPattern = new RegExp(data[ key ]);
      const validatorSelector = `[data-validator="${validatorName}"]`;
      const validatorCheckbox = checkList.querySelector(validatorSelector);
      if (!validatorCheckbox) {
        throw new Error(
          `No validator checkbox found for: "${validatorName}"`
        );
      }

      const checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      validatorCheckbox.setAttribute(CHECKED, checked);
    }
  }
};



var validateInput$2 = Object.freeze({
	default: validateInput,
	__moduleExports: validateInput
});

var validate = ( validateInput$2 && validateInput ) || validateInput$2;

'use strict';




const change = function (event) {
  return validate(this);
};

const validator = behavior$6({
  'keyup change': {
    'input[data-validation-element]': change,
  },
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */

var validator_1 = assign(
  el => validator.on(el),
  validator
);



var validator$1 = Object.freeze({
	default: validator_1,
	__moduleExports: validator_1
});

var require$$1 = ( banner$2 && banner ) || banner$2;

var require$$2 = ( footer$2 && footer ) || footer$2;

var require$$3 = ( navigation$1 && navigation_1 ) || navigation$1;

var require$$4 = ( password$2 && password ) || password$2;

var require$$5 = ( search && search_1 ) || search;

var require$$6 = ( skipnav$2 && skipnav ) || skipnav$2;

var require$$7 = ( validator$1 && validator_1 ) || validator$1;

var components = {
  accordion:  accordion$1,
  banner:     require$$1,
  footer:     require$$2,
  navigation: require$$3,
  password:   require$$4,
  search:     require$$5,
  skipnav:    require$$6,
  validator:  require$$7,
};

var components_1 = components.accordion;
var components_2 = components.banner;
var components_3 = components.footer;
var components_4 = components.navigation;
var components_5 = components.password;
var components_6 = components.search;
var components_7 = components.skipnav;
var components_8 = components.validator;


var components$2 = Object.freeze({
	default: components,
	__moduleExports: components,
	accordion: components_1,
	banner: components_2,
	footer: components_3,
	navigation: components_4,
	password: components_5,
	search: components_6,
	skipnav: components_7,
	validator: components_8
});

var domready = ( ready$2 && ready ) || ready$2;

var components$3 = ( components$2 && components ) || components$2;

'use strict';


/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */





require$$0$1.components = components$3;

domready(() => {
  const target = document.body;
  for (let name in components$3) {
    const behavior = components$3[ name ];
    behavior.on(target);
  }
});

console.log('Write your own js here');

var app = {};

return app;

}());
