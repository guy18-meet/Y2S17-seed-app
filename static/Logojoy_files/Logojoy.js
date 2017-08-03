/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);

var userAgentMobile = jQuery.browser.mobile;

// Opera 8.0+
var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
}(!window['safari'] || safari.pushNotification);
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
* svg.js - A lightweight library for manipulating and animating SVG.
* @version 2.3.4
* http://www.svgjs.com
*
* @copyright Wout Fierens <wout@woutfierens.com>
* @license MIT
*
* BUILT: Thu Aug 04 2016 12:47:18 GMT+0200 (CEST)
*/;
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return factory(root, root.document);
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = root.document ? factory(root, root.document) : function (w) {
      return factory(w, w.document);
    };
  } else {
    root.SVG = factory(root, root.document);
  }
})(typeof window !== "undefined" ? window : undefined, function (window, document) {

  // The main wrapping element
  var SVG = window.SVG = function (element) {
    if (SVG.supported) {
      element = new SVG.Doc(element);

      if (!SVG.parser.draw) SVG.prepare();

      return element;
    }
  };

  // Default namespaces
  SVG.ns = 'http://www.w3.org/2000/svg';
  SVG.xmlns = 'http://www.w3.org/2000/xmlns/';
  SVG.xlink = 'http://www.w3.org/1999/xlink';
  SVG.svgjs = 'http://svgjs.com/svgjs';

  // Svg support test
  SVG.supported = function () {
    return !!document.createElementNS && !!document.createElementNS(SVG.ns, 'svg').createSVGRect;
  }();

  // Don't bother to continue if SVG is not supported
  if (!SVG.supported) return false;

  // Element id sequence
  SVG.did = 1000;

  // Get next named element id
  SVG.eid = function (name) {
    return 'Svgjs' + capitalize(name) + SVG.did++;
  };

  // Method for element creation
  SVG.create = function (name) {
    // create element
    var element = document.createElementNS(this.ns, name);

    // apply unique id
    element.setAttribute('id', this.eid(name));

    return element;
  };

  // Method for extending objects
  SVG.extend = function () {
    var modules, methods, key, i;

    // Get list of modules
    modules = [].slice.call(arguments);

    // Get object with extensions
    methods = modules.pop();

    for (i = modules.length - 1; i >= 0; i--) {
      if (modules[i]) for (key in methods) {
        modules[i].prototype[key] = methods[key];
      }
    } // Make sure SVG.Set inherits any newly added methods
    if (SVG.Set && SVG.Set.inherit) SVG.Set.inherit();
  };

  // Invent new element
  SVG.invent = function (config) {
    // Create element initializer
    var initializer = typeof config.create == 'function' ? config.create : function () {
      this.constructor.call(this, SVG.create(config.create));
    };

    // Inherit prototype
    if (config.inherit) initializer.prototype = new config.inherit();

    // Extend with methods
    if (config.extend) SVG.extend(initializer, config.extend);

    // Attach construct method to parent
    if (config.construct) SVG.extend(config.parent || SVG.Container, config.construct);

    return initializer;
  };

  // Adopt existing svg elements
  SVG.adopt = function (node) {
    // check for presence of node
    if (!node) return null;

    // make sure a node isn't already adopted
    if (node.instance) return node.instance;

    // initialize variables
    var element;

    // adopt with element-specific settings
    if (node.nodeName == 'svg') element = node.parentNode instanceof SVGElement ? new SVG.Nested() : new SVG.Doc();else if (node.nodeName == 'linearGradient') element = new SVG.Gradient('linear');else if (node.nodeName == 'radialGradient') element = new SVG.Gradient('radial');else if (SVG[capitalize(node.nodeName)]) element = new SVG[capitalize(node.nodeName)]();else element = new SVG.Element(node);

    // ensure references
    element.type = node.nodeName;
    element.node = node;
    node.instance = element;

    // SVG.Class specific preparations
    if (element instanceof SVG.Doc) element.namespace().defs();

    // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
    element.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});

    return element;
  };

  // Initialize parsing element
  SVG.prepare = function () {
    // Select document body and create invisible svg element
    var body = document.getElementsByTagName('body')[0],
        draw = (body ? new SVG.Doc(body) : new SVG.Doc(document.documentElement).nested()).size(2, 0);

    // Create parser object
    SVG.parser = {
      body: body || document.documentElement,
      draw: draw.style('opacity:0;position:fixed;left:100%;top:100%;overflow:hidden'),
      poly: draw.polyline().node,
      path: draw.path().node,
      native: SVG.create('svg')
    };
  };

  SVG.parser = {
    native: SVG.create('svg')
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!SVG.parser.draw) SVG.prepare();
  }, false);

  // Storage for regular expressions
  SVG.regex = {
    // Parse unit value
    numberAndUnit: /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

    // Parse hex value
    , hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

    // Parse rgb value
    , rgb: /rgb\((\d+),(\d+),(\d+)\)/

    // Parse reference id
    , reference: /#([a-z0-9\-_]+)/i

    // Parse matrix wrapper
    , matrix: /matrix\(|\)/g

    // Elements of a matrix
    , matrixElements: /,*\s+|,/

    // Whitespace
    , whitespace: /\s/g

    // Test hex value
    , isHex: /^#[a-f0-9]{3,6}$/i

    // Test rgb value
    , isRgb: /^rgb\(/

    // Test css declaration
    , isCss: /[^:]+:[^;]+;?/

    // Test for blank string
    , isBlank: /^(\s+)?$/

    // Test for numeric string
    , isNumber: /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

    // Test for percent value
    , isPercent: /^-?[\d\.]+%$/

    // Test for image url
    , isImage: /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

    // The following regex are used to parse the d attribute of a path

    // Replaces all negative exponents
    , negExp: /e\-/gi

    // Replaces all comma
    , comma: /,/g

    // Replaces all hyphens
    , hyphen: /\-/g

    // Replaces and tests for all path letters
    , pathLetters: /[MLHVCSQTAZ]/gi

    // yes we need this one, too
    , isPathLetter: /[MLHVCSQTAZ]/i

    // split at whitespaces
    , whitespaces: /\s+/

    // matches X
    , X: /X/g
  };

  SVG.utils = {
    // Map function
    map: function map(array, block) {
      var i,
          il = array.length,
          result = [];

      for (i = 0; i < il; i++) {
        result.push(block(array[i]));
      }return result;
    }

    // Filter function
    , filter: function filter(array, block) {
      var i,
          il = array.length,
          result = [];

      for (i = 0; i < il; i++) {
        if (block(array[i])) result.push(array[i]);
      }return result;
    }

    // Degrees to radians
    , radians: function radians(d) {
      return d % 360 * Math.PI / 180;
    }

    // Radians to degrees
    , degrees: function degrees(r) {
      return r * 180 / Math.PI % 360;
    },

    filterSVGElements: function filterSVGElements(nodes) {
      return this.filter(nodes, function (el) {
        return el instanceof SVGElement;
      });
    }

  };

  SVG.defaults = {
    // Default attribute values
    attrs: {
      // fill and stroke
      'fill-opacity': 1,
      'stroke-opacity': 1,
      'stroke-width': 0,
      'stroke-linejoin': 'miter',
      'stroke-linecap': 'butt',
      fill: '#000000',
      stroke: '#000000',
      opacity: 1
      // position
      , x: 0,
      y: 0,
      cx: 0,
      cy: 0
      // size
      , width: 0,
      height: 0
      // radius
      , r: 0,
      rx: 0,
      ry: 0
      // gradient
      , offset: 0,
      'stop-opacity': 1,
      'stop-color': '#000000'
      // text
      , 'font-size': 16,
      'font-family': 'Helvetica, Arial, sans-serif',
      'text-anchor': 'start'
    }
    // Module for color convertions
  };SVG.Color = function (color) {
    var match;

    // initialize defaults
    this.r = 0;
    this.g = 0;
    this.b = 0;

    if (!color) return;

    // parse color
    if (typeof color === 'string') {
      if (SVG.regex.isRgb.test(color)) {
        // get rgb values
        match = SVG.regex.rgb.exec(color.replace(/\s/g, ''));

        // parse numeric values
        this.r = parseInt(match[1]);
        this.g = parseInt(match[2]);
        this.b = parseInt(match[3]);
      } else if (SVG.regex.isHex.test(color)) {
        // get hex values
        match = SVG.regex.hex.exec(fullHex(color));

        // parse numeric values
        this.r = parseInt(match[1], 16);
        this.g = parseInt(match[2], 16);
        this.b = parseInt(match[3], 16);
      }
    } else if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
    }
  };

  SVG.extend(SVG.Color, {
    // Default to hex conversion
    toString: function toString() {
      return this.toHex();
    }
    // Build hex value
    , toHex: function toHex() {
      return '#' + compToHex(this.r) + compToHex(this.g) + compToHex(this.b);
    }
    // Build rgb value
    , toRgb: function toRgb() {
      return 'rgb(' + [this.r, this.g, this.b].join() + ')';
    }
    // Calculate true brightness
    , brightness: function brightness() {
      return this.r / 255 * 0.30 + this.g / 255 * 0.59 + this.b / 255 * 0.11;
    }
    // Make color morphable
    , morph: function morph(color) {
      this.destination = new SVG.Color(color);

      return this;
    }
    // Get morphed color at given position
    , at: function at(pos) {
      // make sure a destination is defined
      if (!this.destination) return this;

      // normalise pos
      pos = pos < 0 ? 0 : pos > 1 ? 1 : pos;

      // generate morphed color
      return new SVG.Color({
        r: ~~(this.r + (this.destination.r - this.r) * pos),
        g: ~~(this.g + (this.destination.g - this.g) * pos),
        b: ~~(this.b + (this.destination.b - this.b) * pos)
      });
    }

  });

  // Testers

  // Test if given value is a color string
  SVG.Color.test = function (color) {
    color += '';
    return SVG.regex.isHex.test(color) || SVG.regex.isRgb.test(color);
  };

  // Test if given value is a rgb object
  SVG.Color.isRgb = function (color) {
    return color && typeof color.r == 'number' && typeof color.g == 'number' && typeof color.b == 'number';
  };

  // Test if given value is a color
  SVG.Color.isColor = function (color) {
    return SVG.Color.isRgb(color) || SVG.Color.test(color);
  };
  // Module for array conversion
  SVG.Array = function (array, fallback) {
    array = (array || []).valueOf();

    // if array is empty and fallback is provided, use fallback
    if (array.length == 0 && fallback) array = fallback.valueOf();

    // parse array
    this.value = this.parse(array);
  };

  SVG.extend(SVG.Array, {
    // Make array morphable
    morph: function morph(array) {
      this.destination = this.parse(array);

      // normalize length of arrays
      if (this.value.length != this.destination.length) {
        var lastValue = this.value[this.value.length - 1],
            lastDestination = this.destination[this.destination.length - 1];

        while (this.value.length > this.destination.length) {
          this.destination.push(lastDestination);
        }while (this.value.length < this.destination.length) {
          this.value.push(lastValue);
        }
      }

      return this;
    }
    // Clean up any duplicate points
    , settle: function settle() {
      // find all unique values
      for (var i = 0, il = this.value.length, seen = []; i < il; i++) {
        if (seen.indexOf(this.value[i]) == -1) seen.push(this.value[i]);
      } // set new value
      return this.value = seen;
    }
    // Get morphed array at given position
    , at: function at(pos) {
      // make sure a destination is defined
      if (!this.destination) return this;

      // generate morphed array
      for (var i = 0, il = this.value.length, array = []; i < il; i++) {
        array.push(this.value[i] + (this.destination[i] - this.value[i]) * pos);
      }return new SVG.Array(array);
    }
    // Convert array to string
    , toString: function toString() {
      return this.value.join(' ');
    }
    // Real value
    , valueOf: function valueOf() {
      return this.value;
    }
    // Parse whitespace separated string
    , parse: function parse(array) {
      array = array.valueOf();

      // if already is an array, no need to parse it
      if (Array.isArray(array)) return array;

      return this.split(array);
    }
    // Strip unnecessary whitespace
    , split: function split(string) {
      return string.trim().split(/\s+/);
    }
    // Reverse array
    , reverse: function reverse() {
      this.value.reverse();

      return this;
    }

  });
  // Poly points array
  SVG.PointArray = function (array, fallback) {
    this.constructor.call(this, array, fallback || [[0, 0]]);
  };

  // Inherit from SVG.Array
  SVG.PointArray.prototype = new SVG.Array();

  SVG.extend(SVG.PointArray, {
    // Convert array to string
    toString: function toString() {
      // convert to a poly point string
      for (var i = 0, il = this.value.length, array = []; i < il; i++) {
        array.push(this.value[i].join(','));
      }return array.join(' ');
    }
    // Convert array to line object
    , toLine: function toLine() {
      return {
        x1: this.value[0][0],
        y1: this.value[0][1],
        x2: this.value[1][0],
        y2: this.value[1][1]
      };
    }
    // Get morphed array at given position
    , at: function at(pos) {
      // make sure a destination is defined
      if (!this.destination) return this;

      // generate morphed point string
      for (var i = 0, il = this.value.length, array = []; i < il; i++) {
        array.push([this.value[i][0] + (this.destination[i][0] - this.value[i][0]) * pos, this.value[i][1] + (this.destination[i][1] - this.value[i][1]) * pos]);
      }return new SVG.PointArray(array);
    }
    // Parse point string
    , parse: function parse(array) {
      array = array.valueOf();

      // if already is an array, no need to parse it
      if (Array.isArray(array)) return array;

      // split points
      array = this.split(array);

      // parse points
      for (var i = 0, il = array.length, p, points = []; i < il; i++) {
        p = array[i].split(',');
        points.push([parseFloat(p[0]), parseFloat(p[1])]);
      }

      return points;
    }
    // Move point string
    , move: function move(x, y) {
      var box = this.bbox();

      // get relative offset
      x -= box.x;
      y -= box.y;

      // move every point
      if (!isNaN(x) && !isNaN(y)) for (var i = this.value.length - 1; i >= 0; i--) {
        this.value[i] = [this.value[i][0] + x, this.value[i][1] + y];
      }return this;
    }
    // Resize poly string
    , size: function size(width, height) {
      var i,
          box = this.bbox();

      // recalculate position of all points according to new size
      for (i = this.value.length - 1; i >= 0; i--) {
        this.value[i][0] = (this.value[i][0] - box.x) * width / box.width + box.x;
        this.value[i][1] = (this.value[i][1] - box.y) * height / box.height + box.y;
      }

      return this;
    }
    // Get bounding box of points
    , bbox: function bbox() {
      SVG.parser.poly.setAttribute('points', this.toString());

      return SVG.parser.poly.getBBox();
    }

  });
  // Path points array
  SVG.PathArray = function (array, fallback) {
    this.constructor.call(this, array, fallback || [['M', 0, 0]]);
  };

  // Inherit from SVG.Array
  SVG.PathArray.prototype = new SVG.Array();

  SVG.extend(SVG.PathArray, {
    // Convert array to string
    toString: function toString() {
      return arrayToString(this.value);
    }
    // Move path string
    , move: function move(x, y) {
      // get bounding box of current situation
      var box = this.bbox();

      // get relative offset
      x -= box.x;
      y -= box.y;

      if (!isNaN(x) && !isNaN(y)) {
        // move every point
        for (var l, i = this.value.length - 1; i >= 0; i--) {
          l = this.value[i][0];

          if (l == 'M' || l == 'L' || l == 'T') {
            this.value[i][1] += x;
            this.value[i][2] += y;
          } else if (l == 'H') {
            this.value[i][1] += x;
          } else if (l == 'V') {
            this.value[i][1] += y;
          } else if (l == 'C' || l == 'S' || l == 'Q') {
            this.value[i][1] += x;
            this.value[i][2] += y;
            this.value[i][3] += x;
            this.value[i][4] += y;

            if (l == 'C') {
              this.value[i][5] += x;
              this.value[i][6] += y;
            }
          } else if (l == 'A') {
            this.value[i][6] += x;
            this.value[i][7] += y;
          }
        }
      }

      return this;
    }
    // Resize path string
    , size: function size(width, height) {
      // get bounding box of current situation
      var i,
          l,
          box = this.bbox();

      // recalculate position of all points according to new size
      for (i = this.value.length - 1; i >= 0; i--) {
        l = this.value[i][0];

        if (l == 'M' || l == 'L' || l == 'T') {
          this.value[i][1] = (this.value[i][1] - box.x) * width / box.width + box.x;
          this.value[i][2] = (this.value[i][2] - box.y) * height / box.height + box.y;
        } else if (l == 'H') {
          this.value[i][1] = (this.value[i][1] - box.x) * width / box.width + box.x;
        } else if (l == 'V') {
          this.value[i][1] = (this.value[i][1] - box.y) * height / box.height + box.y;
        } else if (l == 'C' || l == 'S' || l == 'Q') {
          this.value[i][1] = (this.value[i][1] - box.x) * width / box.width + box.x;
          this.value[i][2] = (this.value[i][2] - box.y) * height / box.height + box.y;
          this.value[i][3] = (this.value[i][3] - box.x) * width / box.width + box.x;
          this.value[i][4] = (this.value[i][4] - box.y) * height / box.height + box.y;

          if (l == 'C') {
            this.value[i][5] = (this.value[i][5] - box.x) * width / box.width + box.x;
            this.value[i][6] = (this.value[i][6] - box.y) * height / box.height + box.y;
          }
        } else if (l == 'A') {
          // resize radii
          this.value[i][1] = this.value[i][1] * width / box.width;
          this.value[i][2] = this.value[i][2] * height / box.height;

          // move position values
          this.value[i][6] = (this.value[i][6] - box.x) * width / box.width + box.x;
          this.value[i][7] = (this.value[i][7] - box.y) * height / box.height + box.y;
        }
      }

      return this;
    }
    // Absolutize and parse path to array
    , parse: function parse(array) {
      // if it's already a patharray, no need to parse it
      if (array instanceof SVG.PathArray) return array.valueOf();

      // prepare for parsing
      var i,
          x0,
          y0,
          s,
          seg,
          arr,
          x = 0,
          y = 0,
          paramCnt = { 'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7 };

      if (typeof array == 'string') {

        array = array.replace(SVG.regex.negExp, 'X') // replace all negative exponents with certain char
        .replace(SVG.regex.pathLetters, ' $& ') // put some room between letters and numbers
        .replace(SVG.regex.hyphen, ' -') // add space before hyphen
        .replace(SVG.regex.comma, ' ') // unify all spaces
        .replace(SVG.regex.X, 'e-') // add back the expoent
        .trim() // trim
        .split(SVG.regex.whitespaces); // split into array

        // at this place there could be parts like ['3.124.854.32'] because we could not determine the point as seperator till now
        // we fix this elements in the next loop
        for (i = array.length; --i;) {
          if (array[i].indexOf('.') != array[i].lastIndexOf('.')) {
            var split = array[i].split('.'); // split at the point
            var first = [split.shift(), split.shift()].join('.'); // join the first number together
            array.splice.apply(array, [i, 1].concat(first, split.map(function (el) {
              return '.' + el;
            }))); // add first and all other entries back to array
          }
        }
      } else {
        array = array.reduce(function (prev, curr) {
          return [].concat.apply(prev, curr);
        }, []);
      }

      // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]

      var arr = [];

      do {

        // Test if we have a path letter
        if (SVG.regex.isPathLetter.test(array[0])) {
          s = array[0];
          array.shift();
          // If last letter was a move command and we got no new, it defaults to [L]ine
        } else if (s == 'M') {
          s = 'L';
        } else if (s == 'm') {
          s = 'l';
        }

        // add path letter as first element
        seg = [s.toUpperCase()];

        // push all necessary parameters to segment
        for (i = 0; i < paramCnt[seg[0]]; ++i) {
          seg.push(parseFloat(array.shift()));
        }

        // upper case
        if (s == seg[0]) {

          if (s == 'M' || s == 'L' || s == 'C' || s == 'Q' || s == 'S' || s == 'T') {
            x = seg[paramCnt[seg[0]] - 1];
            y = seg[paramCnt[seg[0]]];
          } else if (s == 'V') {
            y = seg[1];
          } else if (s == 'H') {
            x = seg[1];
          } else if (s == 'A') {
            x = seg[6];
            y = seg[7];
          }

          // lower case
        } else {

          // convert relative to absolute values
          if (s == 'm' || s == 'l' || s == 'c' || s == 's' || s == 'q' || s == 't') {

            seg[1] += x;
            seg[2] += y;

            if (seg[3] != null) {
              seg[3] += x;
              seg[4] += y;
            }

            if (seg[5] != null) {
              seg[5] += x;
              seg[6] += y;
            }

            // move pointer
            x = seg[paramCnt[seg[0]] - 1];
            y = seg[paramCnt[seg[0]]];
          } else if (s == 'v') {
            seg[1] += y;
            y = seg[1];
          } else if (s == 'h') {
            seg[1] += x;
            x = seg[1];
          } else if (s == 'a') {
            seg[6] += x;
            seg[7] += y;
            x = seg[6];
            y = seg[7];
          }
        }

        if (seg[0] == 'M') {
          x0 = x;
          y0 = y;
        }

        if (seg[0] == 'Z') {
          x = x0;
          y = y0;
        }

        arr.push(seg);
      } while (array.length);

      return arr;
    }
    // Get bounding box of path
    , bbox: function bbox() {
      SVG.parser.path.setAttribute('d', this.toString());

      return SVG.parser.path.getBBox();
    }

  });
  // Module for unit convertions
  SVG.Number = SVG.invent({
    // Initialize
    create: function create(value, unit) {
      // initialize defaults
      this.value = 0;
      this.unit = unit || '';

      // parse value
      if (typeof value === 'number') {
        // ensure a valid numeric value
        this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
      } else if (typeof value === 'string') {
        unit = value.match(SVG.regex.numberAndUnit);

        if (unit) {
          // make value numeric
          this.value = parseFloat(unit[1]);

          // normalize
          if (unit[5] == '%') this.value /= 100;else if (unit[5] == 's') this.value *= 1000;

          // store unit
          this.unit = unit[5];
        }
      } else {
        if (value instanceof SVG.Number) {
          this.value = value.valueOf();
          this.unit = value.unit;
        }
      }
    }
    // Add methods
    , extend: {
      // Stringalize
      toString: function toString() {
        return (this.unit == '%' ? ~~(this.value * 1e8) / 1e6 : this.unit == 's' ? this.value / 1e3 : this.value) + this.unit;
      },
      toJSON: function toJSON() {
        return this.toString();
      },
      // Convert to primitive
      valueOf: function valueOf() {
        return this.value;
      }
      // Add number
      , plus: function plus(number) {
        return new SVG.Number(this + new SVG.Number(number), this.unit);
      }
      // Subtract number
      , minus: function minus(number) {
        return this.plus(-new SVG.Number(number));
      }
      // Multiply number
      , times: function times(number) {
        return new SVG.Number(this * new SVG.Number(number), this.unit);
      }
      // Divide number
      , divide: function divide(number) {
        return new SVG.Number(this / new SVG.Number(number), this.unit);
      }
      // Convert to different unit
      , to: function to(unit) {
        var number = new SVG.Number(this);

        if (typeof unit === 'string') number.unit = unit;

        return number;
      }
      // Make number morphable
      , morph: function morph(number) {
        this.destination = new SVG.Number(number);

        return this;
      }
      // Get morphed number at given position
      , at: function at(pos) {
        // Make sure a destination is defined
        if (!this.destination) return this;

        // Generate new morphed number
        return new SVG.Number(this.destination).minus(this).times(pos).plus(this);
      }

    }
  });

  SVG.Element = SVG.invent({
    // Initialize node
    create: function create(node) {
      // make stroke value accessible dynamically
      this._stroke = SVG.defaults.attrs.stroke;

      // initialize data object
      this.dom = {};

      // create circular reference
      if (this.node = node) {
        this.type = node.nodeName;
        this.node.instance = this;

        // store current attribute value
        this._stroke = node.getAttribute('stroke') || this._stroke;
      }
    }

    // Add class methods
    , extend: {
      // Move over x-axis
      x: function x(_x) {
        return this.attr('x', _x);
      }
      // Move over y-axis
      , y: function y(_y) {
        return this.attr('y', _y);
      }
      // Move by center over x-axis
      , cx: function cx(x) {
        return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
      }
      // Move by center over y-axis
      , cy: function cy(y) {
        return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
      }
      // Move element to given x and y values
      , move: function move(x, y) {
        return this.x(x).y(y);
      }
      // Move element by its center
      , center: function center(x, y) {
        return this.cx(x).cy(y);
      }
      // Set width of element
      , width: function width(_width) {
        return this.attr('width', _width);
      }
      // Set height of element
      , height: function height(_height) {
        return this.attr('height', _height);
      }
      // Set element size to given width and height
      , size: function size(width, height) {
        var p = proportionalSize(this, width, height);

        return this.width(new SVG.Number(p.width)).height(new SVG.Number(p.height));
      }
      // Clone element
      , clone: function clone(parent) {
        // clone element and assign new id
        var clone = assignNewId(this.node.cloneNode(true));

        // insert the clone in the given parent or after myself
        if (parent) parent.add(clone);else this.after(clone);

        return clone;
      }
      // Remove element
      , remove: function remove() {
        if (this.parent()) this.parent().removeElement(this);

        return this;
      }
      // Replace element
      , replace: function replace(element) {
        this.after(element).remove();

        return element;
      }
      // Add element to given container and return self
      , addTo: function addTo(parent) {
        return parent.put(this);
      }
      // Add element to given container and return container
      , putIn: function putIn(parent) {
        return parent.add(this);
      }
      // Get / set id
      , id: function id(_id) {
        return this.attr('id', _id);
      }
      // Checks whether the given point inside the bounding box of the element
      , inside: function inside(x, y) {
        var box = this.bbox();

        return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
      }
      // Show element
      , show: function show() {
        return this.style('display', '');
      }
      // Hide element
      , hide: function hide() {
        return this.style('display', 'none');
      }
      // Is element visible?
      , visible: function visible() {
        return this.style('display') != 'none';
      }
      // Return id on string conversion
      , toString: function toString() {
        return this.attr('id');
      }
      // Return array of classes on the node
      , classes: function classes() {
        var attr = this.attr('class');

        return attr == null ? [] : attr.trim().split(/\s+/);
      }
      // Return true if class exists on the node, false otherwise
      , hasClass: function hasClass(name) {
        return this.classes().indexOf(name) != -1;
      }
      // Add class to the node
      , addClass: function addClass(name) {
        if (!this.hasClass(name)) {
          var array = this.classes();
          array.push(name);
          this.attr('class', array.join(' '));
        }

        return this;
      }
      // Remove class from the node
      , removeClass: function removeClass(name) {
        if (this.hasClass(name)) {
          this.attr('class', this.classes().filter(function (c) {
            return c != name;
          }).join(' '));
        }

        return this;
      }
      // Toggle the presence of a class on the node
      , toggleClass: function toggleClass(name) {
        return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
      }
      // Get referenced element form attribute value
      , reference: function reference(attr) {
        return SVG.get(this.attr(attr));
      }
      // Returns the parent element instance
      , parent: function parent(type) {
        var parent = this;

        // check for parent
        if (!parent.node.parentNode) return null;

        // get parent element
        parent = SVG.adopt(parent.node.parentNode);

        if (!type) return parent;

        // loop trough ancestors if type is given
        while (parent && parent.node instanceof SVGElement) {
          if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
          parent = SVG.adopt(parent.node.parentNode);
        }
      }
      // Get parent document
      , doc: function doc() {
        return this instanceof SVG.Doc ? this : this.parent(SVG.Doc);
      }
      // return array of all ancestors of given type up to the root svg
      , parents: function parents(type) {
        var parents = [],
            parent = this;

        do {
          parent = parent.parent(type);
          if (!parent || !parent.node) break;

          parents.push(parent);
        } while (parent.parent);

        return parents;
      }
      // matches the element vs a css selector
      , matches: function matches(selector) {
        return _matches(this.node, selector);
      }
      // Returns the svg node to call native svg methods on it
      , native: function native() {
        return this.node;
      }
      // Import raw svg
      , svg: function svg(_svg) {
        // create temporary holder
        var well = document.createElement('svg');

        // act as a setter if svg is given
        if (_svg && this instanceof SVG.Parent) {
          // dump raw svg
          well.innerHTML = '<svg>' + _svg.replace(/\n/, '').replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>') + '</svg>';

          // transplant nodes
          for (var i = 0, il = well.firstChild.childNodes.length; i < il; i++) {
            this.node.appendChild(well.firstChild.firstChild);
          } // otherwise act as a getter
        } else {
          // create a wrapping svg element in case of partial content
          well.appendChild(_svg = document.createElement('svg'));

          // write svgjs data to the dom
          this.writeDataToDom();

          // insert a copy of this node
          _svg.appendChild(this.node.cloneNode(true));

          // return target element
          return well.innerHTML.replace(/^<svg>/, '').replace(/<\/svg>$/, '');
        }

        return this;
      }
      // write svgjs data to the dom
      , writeDataToDom: function writeDataToDom() {

        // dump variables recursively
        if (this.each || this.lines) {
          var fn = this.each ? this : this.lines();
          fn.each(function () {
            this.writeDataToDom();
          });
        }

        // remove previously set data
        this.node.removeAttribute('svgjs:data');

        if (Object.keys(this.dom).length) this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428

        return this;
      }
      // set given data to the elements data property
      , setData: function setData(o) {
        this.dom = o;
        return this;
      },
      is: function is(obj) {
        return _is(this, obj);
      }
    }
  });

  SVG.easing = {
    '-': function _(pos) {
      return pos;
    },
    '<>': function _(pos) {
      return -Math.cos(pos * Math.PI) / 2 + 0.5;
    },
    '>': function _(pos) {
      return Math.sin(pos * Math.PI / 2);
    },
    '<': function _(pos) {
      return -Math.cos(pos * Math.PI / 2) + 1;
    }
  };

  SVG.morph = function (pos) {
    return function (from, to) {
      return new SVG.MorphObj(from, to).at(pos);
    };
  };

  SVG.Situation = SVG.invent({

    create: function create(o) {
      this.init = false;
      this.reversed = false;
      this.reversing = false;

      this.duration = new SVG.Number(o.duration).valueOf();
      this.delay = new SVG.Number(o.delay).valueOf();

      this.start = +new Date() + this.delay;
      this.finish = this.start + this.duration;
      this.ease = o.ease;

      this.loop = false;
      this.loops = false;

      this.animations = {
        // functionToCall: [list of morphable objects]
        // e.g. move: [SVG.Number, SVG.Number]
      };

      this.attrs = {
        // holds all attributes which are not represented from a function svg.js provides
        // e.g. someAttr: SVG.Number
      };

      this.styles = {
        // holds all styles which should be animated
        // e.g. fill-color: SVG.Color
      };

      this.transforms = [
        // holds all transformations as transformation objects
        // e.g. [SVG.Rotate, SVG.Translate, SVG.Matrix]
      ];

      this.once = {
        // functions to fire at a specific position
        // e.g. "0.5": function foo(){}
      };
    }

  });

  SVG.Delay = function (delay) {
    this.delay = new SVG.Number(delay).valueOf();
  };

  SVG.FX = SVG.invent({

    create: function create(element) {
      this._target = element;
      this.situations = [];
      this.active = false;
      this.situation = null;
      this.paused = false;
      this.lastPos = 0;
      this.pos = 0;
    },

    extend: {

      /**
       * sets or returns the target of this animation
       * @param o object || number In case of Object it holds all parameters. In case of number its the duration of the animation
       * @param ease function || string Function which should be used for easing or easing keyword
       * @param delay Number indicating the delay before the animation starts
       * @return target || this
       */
      animate: function animate(o, ease, delay) {

        if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) == 'object') {
          ease = o.ease;
          delay = o.delay;
          o = o.duration;
        }

        var situation = new SVG.Situation({
          duration: o || 1000,
          delay: delay || 0,
          ease: SVG.easing[ease || '-'] || ease
        });

        this.queue(situation);

        return this;
      }

      /**
       * sets a delay before the next element of the queue is called
       * @param delay Duration of delay in milliseconds
       * @return this.target()
       */
      , delay: function delay(_delay2) {
        var _delay = new SVG.Delay(_delay2);

        return this.queue(_delay);
      }

      /**
       * sets or returns the target of this animation
       * @param null || target SVG.Elemenet which should be set as new target
       * @return target || this
       */
      , target: function target(_target) {
        if (_target && _target instanceof SVG.Element) {
          this._target = _target;
          return this;
        }

        return this._target;
      }

      // returns the position at a given time
      , timeToPos: function timeToPos(timestamp) {
        return (timestamp - this.situation.start) / this.situation.duration;
      }

      // returns the timestamp from a given positon
      , posToTime: function posToTime(pos) {
        return this.situation.duration * pos + this.situation.start;
      }

      // starts the animationloop
      , startAnimFrame: function startAnimFrame() {
        this.stopAnimFrame();
        this.animationFrame = requestAnimationFrame(function () {
          this.step();
        }.bind(this));
      }

      // cancels the animationframe
      , stopAnimFrame: function stopAnimFrame() {
        cancelAnimationFrame(this.animationFrame);
      }

      // kicks off the animation - only does something when the queue is curretly not active and at least one situation is set
      , start: function start() {
        // dont start if already started
        if (!this.active && this.situation) {
          this.situation.start = +new Date() + this.situation.delay;
          this.situation.finish = this.situation.start + this.situation.duration;

          this.initAnimations();
          this.active = true;
          this.startAnimFrame();
        }

        return this;
      }

      /**
       * adds a function / Situation to the animation queue
       * @param fn function / situation to add
       * @return this
       */
      , queue: function queue(fn) {
        if (typeof fn == 'function' || fn instanceof SVG.Situation || fn instanceof SVG.Delay) this.situations.push(fn);

        if (!this.situation) this.situation = this.situations.shift();

        return this;
      }

      /**
       * pulls next element from the queue and execute it
       * @return this
       */
      , dequeue: function dequeue() {
        // stop current animation
        this.situation && this.situation.stop && this.situation.stop();

        // get next animation from queue
        this.situation = this.situations.shift();

        if (this.situation) {

          var fn = function () {
            if (this.situation instanceof SVG.Situation) this.initAnimations().at(0);else if (this.situation instanceof SVG.Delay) this.dequeue();else this.situation.call(this);
          }.bind(this);

          // start next animation
          if (this.situation.delay) {
            setTimeout(function () {
              fn();
            }, this.situation.delay);
          } else {
            fn();
          }
        }

        return this;
      }

      // updates all animations to the current state of the element
      // this is important when one property could be changed from another property
      , initAnimations: function initAnimations() {
        var i;
        var s = this.situation;

        if (s.init) return this;

        for (i in s.animations) {

          if (i == 'viewbox') {
            s.animations[i] = this.target().viewbox().morph(s.animations[i]);
          } else {

            // TODO: this is not a clean clone of the array. We may have some unchecked references
            s.animations[i].value = i == 'plot' ? this.target().array().value : this.target()[i]();

            // sometimes we get back an object and not the real value, fix this
            if (s.animations[i].value.value) {
              s.animations[i].value = s.animations[i].value.value;
            }

            if (s.animations[i].relative) s.animations[i].destination.value = s.animations[i].destination.value + s.animations[i].value;
          }
        }

        for (i in s.attrs) {
          if (s.attrs[i] instanceof SVG.Color) {
            var color = new SVG.Color(this.target().attr(i));
            s.attrs[i].r = color.r;
            s.attrs[i].g = color.g;
            s.attrs[i].b = color.b;
          } else {
            s.attrs[i].value = this.target().attr(i); // + s.attrs[i].value
          }
        }

        for (i in s.styles) {
          s.styles[i].value = this.target().style(i);
        }

        s.initialTransformation = this.target().matrixify();

        s.init = true;
        return this;
      },
      clearQueue: function clearQueue() {
        this.situations = [];
        return this;
      },
      clearCurrent: function clearCurrent() {
        this.situation = null;
        return this;
      }
      /** stops the animation immediately
       * @param jumpToEnd A Boolean indicating whether to complete the current animation immediately.
       * @param clearQueue A Boolean indicating whether to remove queued animation as well.
       * @return this
       */
      , stop: function stop(jumpToEnd, clearQueue) {
        if (!this.active) this.start();

        if (clearQueue) {
          this.clearQueue();
        }

        this.active = false;

        if (jumpToEnd && this.situation) {

          this.situation.loop = false;

          if (this.situation.loops % 2 == 0 && this.situation.reversing) {
            this.situation.reversed = true;
          }

          this.at(1);
        }

        this.stopAnimFrame();
        clearTimeout(this.timeout);

        return this.clearCurrent();
      }

      /** resets the element to the state where the current element has started
       * @return this
       */
      , reset: function reset() {
        if (this.situation) {
          var temp = this.situation;
          this.stop();
          this.situation = temp;
          this.at(0);
        }
        return this;
      }

      // Stop the currently-running animation, remove all queued animations, and complete all animations for the element.
      , finish: function finish() {

        this.stop(true, false);

        while (this.dequeue().situation && this.stop(true, false)) {}

        this.clearQueue().clearCurrent();

        return this;
      }

      // set the internal animation pointer to the specified position and updates the visualisation
      , at: function at(pos) {
        this.pos = pos;
        this.situation.start = +new Date() - pos * this.situation.duration;
        this.situation.finish = this.situation.start + this.situation.duration;
        return this.step(true);
      }

      // speeds up the animation by the given factor
      // this changes the duration of the animation
      , speed: function speed(_speed) {
        this.situation.duration = this.situation.duration * this.pos + (1 - this.pos) * this.situation.duration / _speed;
        this.situation.finish = this.situation.start + this.situation.duration;
        return this.at(this.pos);
      }
      // Make loopable
      , loop: function loop(times, reverse) {
        // store current loop and total loops
        this.situation.loop = this.situation.loops = times || true;

        if (reverse) this.last().reversing = true;
        return this;
      }

      // pauses the animation
      , pause: function pause() {
        this.paused = true;
        this.stopAnimFrame();
        clearTimeout(this.timeout);
        return this;
      }

      // unpause the animation
      , play: function play() {
        if (!this.paused) return this;
        this.paused = false;
        return this.at(this.pos);
      }

      /**
       * toggle or set the direction of the animation
       * true sets direction to backwards while false sets it to forwards
       * @param reversed Boolean indicating whether to reverse the animation or not (default: toggle the reverse status)
       * @return this
       */
      , reverse: function reverse(reversed) {
        var c = this.last();

        if (typeof reversed == 'undefined') c.reversed = !c.reversed;else c.reversed = reversed;

        return this;
      }

      /**
       * returns a float from 0-1 indicating the progress of the current animation
       * @param eased Boolean indicating whether the returned position should be eased or not
       * @return number
       */
      , progress: function progress(easeIt) {
        return easeIt ? this.situation.ease(this.pos) : this.pos;
      }

      /**
       * adds a callback function which is called when the current animation is finished
       * @param fn Function which should be executed as callback
       * @return number
       */
      , after: function after(fn) {
        var c = this.last(),
            wrapper = function wrapper(e) {
          if (e.detail.situation == c) {
            fn.call(this, c);
            this.off('finished.fx', wrapper); // prevent memory leak
          }
        };

        this.target().on('finished.fx', wrapper);
        return this;
      }

      // adds a callback which is called whenever one animation step is performed
      , during: function during(fn) {
        var c = this.last(),
            wrapper = function wrapper(e) {
          if (e.detail.situation == c) {
            fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, c);
          }
        };

        // see above
        this.target().off('during.fx', wrapper).on('during.fx', wrapper);

        return this.after(function () {
          this.off('during.fx', wrapper);
        });
      }

      // calls after ALL animations in the queue are finished
      , afterAll: function afterAll(fn) {
        var wrapper = function wrapper(e) {
          fn.call(this);
          this.off('allfinished.fx', wrapper);
        };

        // see above
        this.target().off('allfinished.fx', wrapper).on('allfinished.fx', wrapper);
        return this;
      }

      // calls on every animation step for all animations
      , duringAll: function duringAll(fn) {
        var wrapper = function wrapper(e) {
          fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, e.detail.situation);
        };

        this.target().off('during.fx', wrapper).on('during.fx', wrapper);

        return this.afterAll(function () {
          this.off('during.fx', wrapper);
        });
      },

      last: function last() {
        return this.situations.length ? this.situations[this.situations.length - 1] : this.situation;
      }

      // adds one property to the animations
      , add: function add(method, args, type) {
        this.last()[type || 'animations'][method] = args;
        setTimeout(function () {
          this.start();
        }.bind(this), 0);
        return this;
      }

      /** perform one step of the animation
       *  @param ignoreTime Boolean indicating whether to ignore time and use position directly or recalculate position based on time
       *  @return this
       */
      , step: function step(ignoreTime) {

        // convert current time to position
        if (!ignoreTime) this.pos = this.timeToPos(+new Date());

        if (this.pos >= 1 && (this.situation.loop === true || typeof this.situation.loop == 'number' && --this.situation.loop)) {

          if (this.situation.reversing) {
            this.situation.reversed = !this.situation.reversed;
          }
          return this.at(this.pos - 1);
        }

        if (this.situation.reversed) this.pos = 1 - this.pos;

        // correct position
        if (this.pos > 1) this.pos = 1;
        if (this.pos < 0) this.pos = 0;

        // apply easing
        var eased = this.situation.ease(this.pos);

        // call once-callbacks
        for (var i in this.situation.once) {
          if (i > this.lastPos && i <= eased) {
            this.situation.once[i].call(this.target(), this.pos, eased);
            delete this.situation.once[i];
          }
        }

        // fire during callback with position, eased position and current situation as parameter
        if (this.active) this.target().fire('during', { pos: this.pos, eased: eased, fx: this, situation: this.situation });

        // the user may call stop or finish in the during callback
        // so make sure that we still have a valid situation
        if (!this.situation) {
          return this;
        }

        // apply the actual animation to every property
        this.eachAt();

        // do final code when situation is finished
        if (this.pos == 1 && !this.situation.reversed || this.situation.reversed && this.pos == 0) {

          // stop animation callback
          this.stopAnimFrame();

          // fire finished callback with current situation as parameter
          this.target().fire('finished', { fx: this, situation: this.situation });

          if (!this.situations.length) {
            this.target().fire('allfinished');
            this.target().off('.fx'); // there shouldnt be any binding left, but to make sure...
            this.active = false;
          }

          // start next animation
          if (this.active) this.dequeue();else this.clearCurrent();
        } else if (!this.paused && this.active) {
          // we continue animating when we are not at the end
          this.startAnimFrame();
        }

        // save last eased position for once callback triggering
        this.lastPos = eased;
        return this;
      }

      // calculates the step for every property and calls block with it
      , eachAt: function eachAt() {
        var i,
            at,
            self = this,
            target = this.target(),
            s = this.situation;

        // apply animations which can be called trough a method
        for (i in s.animations) {

          at = [].concat(s.animations[i]).map(function (el) {
            return el.at ? el.at(s.ease(self.pos), self.pos) : el;
          });

          target[i].apply(target, at);
        }

        // apply animation which has to be applied with attr()
        for (i in s.attrs) {

          at = [i].concat(s.attrs[i]).map(function (el) {
            return el.at ? el.at(s.ease(self.pos), self.pos) : el;
          });

          target.attr.apply(target, at);
        }

        // apply animation which has to be applied with style()
        for (i in s.styles) {

          at = [i].concat(s.styles[i]).map(function (el) {
            return el.at ? el.at(s.ease(self.pos), self.pos) : el;
          });

          target.style.apply(target, at);
        }

        // animate initialTransformation which has to be chained
        if (s.transforms.length) {

          // get inital initialTransformation
          at = s.initialTransformation;
          for (i in s.transforms) {

            // get next transformation in chain
            var a = s.transforms[i];

            // multiply matrix directly
            if (a instanceof SVG.Matrix) {

              if (a.relative) {
                at = at.multiply(a.at(s.ease(this.pos)));
              } else {
                at = at.morph(a).at(s.ease(this.pos));
              }
              continue;
            }

            // when transformation is absolute we have to reset the needed transformation first
            if (!a.relative) a.undo(at.extract());

            // and reapply it after
            at = at.multiply(a.at(s.ease(this.pos)));
          }

          // set new matrix on element
          target.matrix(at);
        }

        return this;
      }

      // adds an once-callback which is called at a specific position and never again
      , once: function once(pos, fn, isEased) {

        if (!isEased) pos = this.situation.ease(pos);

        this.situation.once[pos] = fn;

        return this;
      }

    },

    parent: SVG.Element

    // Add method to parent elements
    , construct: {
      // Get fx module or create a new one, then animate with given duration and ease
      animate: function animate(o, ease, delay) {
        return (this.fx || (this.fx = new SVG.FX(this))).animate(o, ease, delay);
      },
      delay: function delay(_delay3) {
        return (this.fx || (this.fx = new SVG.FX(this))).delay(_delay3);
      },
      stop: function stop(jumpToEnd, clearQueue) {
        if (this.fx) this.fx.stop(jumpToEnd, clearQueue);

        return this;
      },
      finish: function finish() {
        if (this.fx) this.fx.finish();

        return this;
      }
      // Pause current animation
      , pause: function pause() {
        if (this.fx) this.fx.pause();

        return this;
      }
      // Play paused current animation
      , play: function play() {
        if (this.fx) this.fx.play();

        return this;
      }
    }

  });

  // MorphObj is used whenever no morphable object is given
  SVG.MorphObj = SVG.invent({

    create: function create(from, to) {
      // prepare color for morphing
      if (SVG.Color.isColor(to)) return new SVG.Color(from).morph(to);
      // prepare number for morphing
      if (SVG.regex.numberAndUnit.test(to)) return new SVG.Number(from).morph(to);

      // prepare for plain morphing
      this.value = 0;
      this.destination = to;
    },

    extend: {
      at: function at(pos, real) {
        return real < 1 ? this.value : this.destination;
      },

      valueOf: function valueOf() {
        return this.value;
      }
    }

  });

  SVG.extend(SVG.FX, {
    // Add animatable attributes
    attr: function attr(a, v, relative) {
      // apply attributes individually
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object') {
        for (var key in a) {
          this.attr(key, a[key]);
        }
      } else {
        // the MorphObj takes care about the right function used
        this.add(a, new SVG.MorphObj(null, v), 'attrs');
      }

      return this;
    }
    // Add animatable styles
    , style: function style(s, v) {
      if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) == 'object') for (var key in s) {
        this.style(key, s[key]);
      } else this.add(s, new SVG.MorphObj(null, v), 'styles');

      return this;
    }
    // Animatable x-axis
    , x: function x(_x2, relative) {
      if (this.target() instanceof SVG.G) {
        this.transform({ x: _x2 }, relative);
        return this;
      }

      var num = new SVG.Number().morph(_x2);
      num.relative = relative;
      return this.add('x', num);
    }
    // Animatable y-axis
    , y: function y(_y2, relative) {
      if (this.target() instanceof SVG.G) {
        this.transform({ y: _y2 }, relative);
        return this;
      }

      var num = new SVG.Number().morph(_y2);
      num.relative = relative;
      return this.add('y', num);
    }
    // Animatable center x-axis
    , cx: function cx(x) {
      return this.add('cx', new SVG.Number().morph(x));
    }
    // Animatable center y-axis
    , cy: function cy(y) {
      return this.add('cy', new SVG.Number().morph(y));
    }
    // Add animatable move
    , move: function move(x, y) {
      return this.x(x).y(y);
    }
    // Add animatable center
    , center: function center(x, y) {
      return this.cx(x).cy(y);
    }
    // Add animatable size
    , size: function size(width, height) {
      if (this.target() instanceof SVG.Text) {
        // animate font size for Text elements
        this.attr('font-size', width);
      } else {
        // animate bbox based size for all other elements
        var box;

        if (!width || !height) {
          box = this.target().bbox();
        }

        if (!width) {
          width = box.width / box.height * height;
        }

        if (!height) {
          height = box.height / box.width * width;
        }

        this.add('width', new SVG.Number().morph(width)).add('height', new SVG.Number().morph(height));
      }

      return this;
    }
    // Add animatable plot
    , plot: function plot(p) {
      return this.add('plot', this.target().array().morph(p));
    }
    // Add leading method
    , leading: function leading(value) {
      return this.target().leading ? this.add('leading', new SVG.Number().morph(value)) : this;
    }
    // Add animatable viewbox
    , viewbox: function viewbox(x, y, width, height) {
      if (this.target() instanceof SVG.Container) {
        this.add('viewbox', new SVG.ViewBox(x, y, width, height));
      }

      return this;
    },
    update: function update(o) {
      if (this.target() instanceof SVG.Stop) {
        if (typeof o == 'number' || o instanceof SVG.Number) {
          return this.update({
            offset: arguments[0],
            color: arguments[1],
            opacity: arguments[2]
          });
        }

        if (o.opacity != null) this.attr('stop-opacity', o.opacity);
        if (o.color != null) this.attr('stop-color', o.color);
        if (o.offset != null) this.attr('offset', o.offset);
      }

      return this;
    }
  });
  SVG.BBox = SVG.invent({
    // Initialize
    create: function create(element) {
      // get values if element is given
      if (element) {
        var box;

        // yes this is ugly, but Firefox can be a bitch when it comes to elements that are not yet rendered
        try {

          // the element is NOT in the dom, throw error
          if (!document.documentElement.contains(element.node)) throw new Exception('Element not in the dom');

          // find native bbox
          box = element.node.getBBox();
        } catch (e) {
          if (element instanceof SVG.Shape) {
            var clone = element.clone(SVG.parser.draw).show();
            box = clone.bbox();
            clone.remove();
          } else {
            box = {
              x: element.node.clientLeft,
              y: element.node.clientTop,
              width: element.node.clientWidth,
              height: element.node.clientHeight
            };
          }
        }

        // plain x and y
        this.x = box.x;
        this.y = box.y;

        // plain width and height
        this.width = box.width;
        this.height = box.height;
      }

      // add center, right and bottom
      fullBox(this);
    }

    // Define Parent
    , parent: SVG.Element

    // Constructor
    , construct: {
      // Get bounding box
      bbox: function bbox() {
        return new SVG.BBox(this);
      }
    }

  });

  SVG.TBox = SVG.invent({
    // Initialize
    create: function create(element) {
      // get values if element is given
      if (element) {
        var t = element.ctm().extract(),
            box = element.bbox();

        // width and height including transformations
        this.width = box.width * t.scaleX;
        this.height = box.height * t.scaleY;

        // x and y including transformations
        this.x = box.x + t.x;
        this.y = box.y + t.y;
      }

      // add center, right and bottom
      fullBox(this);
    }

    // Define Parent
    , parent: SVG.Element

    // Constructor
    , construct: {
      // Get transformed bounding box
      tbox: function tbox() {
        return new SVG.TBox(this);
      }
    }

  });

  SVG.RBox = SVG.invent({
    // Initialize
    create: function create(element) {
      if (element) {
        var e = element.doc().parent(),
            box = element.node.getBoundingClientRect(),
            zoom = 1;

        // get screen offset
        this.x = box.left;
        this.y = box.top;

        // subtract parent offset
        this.x -= e.offsetLeft;
        this.y -= e.offsetTop;

        while (e = e.offsetParent) {
          this.x -= e.offsetLeft;
          this.y -= e.offsetTop;
        }

        // calculate cumulative zoom from svg documents
        e = element;
        while (e.parent && (e = e.parent())) {
          if (e.viewbox) {
            zoom *= e.viewbox().zoom;
            this.x -= e.x() || 0;
            this.y -= e.y() || 0;
          }
        }

        // recalculate viewbox distortion
        this.width = box.width /= zoom;
        this.height = box.height /= zoom;
      }

      // add center, right and bottom
      fullBox(this);

      // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
      this.x += window.pageXOffset;
      this.y += window.pageYOffset;
    }

    // define Parent
    , parent: SVG.Element

    // Constructor
    , construct: {
      // Get rect box
      rbox: function rbox() {
        return new SVG.RBox(this);
      }
    }

  })

  // Add universal merge method
  ;[SVG.BBox, SVG.TBox, SVG.RBox].forEach(function (c) {

    SVG.extend(c, {
      // Merge rect box with another, return a new instance
      merge: function merge(box) {
        var b = new c();

        // merge boxes
        b.x = Math.min(this.x, box.x);
        b.y = Math.min(this.y, box.y);
        b.width = Math.max(this.x + this.width, box.x + box.width) - b.x;
        b.height = Math.max(this.y + this.height, box.y + box.height) - b.y;

        return fullBox(b);
      }

    });
  });

  SVG.Matrix = SVG.invent({
    // Initialize
    create: function create(source) {
      var i,
          base = arrayToMatrix([1, 0, 0, 1, 0, 0]);

      // ensure source as object
      source = source instanceof SVG.Element ? source.matrixify() : typeof source === 'string' ? stringToMatrix(source) : arguments.length == 6 ? arrayToMatrix([].slice.call(arguments)) : (typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' ? source : base;

      // merge source
      for (i = abcdef.length - 1; i >= 0; --i) {
        this[abcdef[i]] = source && typeof source[abcdef[i]] === 'number' ? source[abcdef[i]] : base[abcdef[i]];
      }
    }

    // Add methods
    , extend: {
      // Extract individual transformations
      extract: function extract() {
        // find delta transform points
        var px = deltaTransformPoint(this, 0, 1),
            py = deltaTransformPoint(this, 1, 0),
            skewX = 180 / Math.PI * Math.atan2(px.y, px.x) - 90;

        return {
          // translation
          x: this.e,
          y: this.f,
          transformedX: (this.e * Math.cos(skewX * Math.PI / 180) + this.f * Math.sin(skewX * Math.PI / 180)) / Math.sqrt(this.a * this.a + this.b * this.b),
          transformedY: (this.f * Math.cos(skewX * Math.PI / 180) + this.e * Math.sin(-skewX * Math.PI / 180)) / Math.sqrt(this.c * this.c + this.d * this.d)
          // skew
          , skewX: -skewX,
          skewY: 180 / Math.PI * Math.atan2(py.y, py.x)
          // scale
          , scaleX: Math.sqrt(this.a * this.a + this.b * this.b),
          scaleY: Math.sqrt(this.c * this.c + this.d * this.d)
          // rotation
          , rotation: skewX,
          a: this.a,
          b: this.b,
          c: this.c,
          d: this.d,
          e: this.e,
          f: this.f,
          matrix: new SVG.Matrix(this)
        };
      }
      // Clone matrix
      , clone: function clone() {
        return new SVG.Matrix(this);
      }
      // Morph one matrix into another
      , morph: function morph(matrix) {
        // store new destination
        this.destination = new SVG.Matrix(matrix);

        return this;
      }
      // Get morphed matrix at a given position
      , at: function at(pos) {
        // make sure a destination is defined
        if (!this.destination) return this;

        // calculate morphed matrix at a given position
        var matrix = new SVG.Matrix({
          a: this.a + (this.destination.a - this.a) * pos,
          b: this.b + (this.destination.b - this.b) * pos,
          c: this.c + (this.destination.c - this.c) * pos,
          d: this.d + (this.destination.d - this.d) * pos,
          e: this.e + (this.destination.e - this.e) * pos,
          f: this.f + (this.destination.f - this.f) * pos
        });

        // process parametric rotation if present
        if (this.param && this.param.to) {
          // calculate current parametric position
          var param = {
            rotation: this.param.from.rotation + (this.param.to.rotation - this.param.from.rotation) * pos,
            cx: this.param.from.cx,
            cy: this.param.from.cy

            // rotate matrix
          };matrix = matrix.rotate((this.param.to.rotation - this.param.from.rotation * 2) * pos, param.cx, param.cy);

          // store current parametric values
          matrix.param = param;
        }

        return matrix;
      }
      // Multiplies by given matrix
      , multiply: function multiply(matrix) {
        return new SVG.Matrix(this.native().multiply(parseMatrix(matrix).native()));
      }
      // Inverses matrix
      , inverse: function inverse() {
        return new SVG.Matrix(this.native().inverse());
      }
      // Translate matrix
      , translate: function translate(x, y) {
        return new SVG.Matrix(this.native().translate(x || 0, y || 0));
      }
      // Scale matrix
      , scale: function scale(x, y, cx, cy) {
        // support universal scale
        if (arguments.length == 1 || arguments.length == 3) y = x;
        if (arguments.length == 3) {
          cy = cx;
          cx = y;
        }

        return this.around(cx, cy, new SVG.Matrix(x, 0, 0, y, 0, 0));
      }
      // Rotate matrix
      , rotate: function rotate(r, cx, cy) {
        // convert degrees to radians
        r = SVG.utils.radians(r);

        return this.around(cx, cy, new SVG.Matrix(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0));
      }
      // Flip matrix on x or y, at a given offset
      , flip: function flip(a, o) {
        return a == 'x' ? this.scale(-1, 1, o, 0) : this.scale(1, -1, 0, o);
      }
      // Skew
      , skew: function skew(x, y, cx, cy) {
        return this.around(cx, cy, this.native().skewX(x || 0).skewY(y || 0));
      }
      // SkewX
      , skewX: function skewX(x, cx, cy) {
        return this.around(cx, cy, this.native().skewX(x || 0));
      }
      // SkewY
      , skewY: function skewY(y, cx, cy) {
        return this.around(cx, cy, this.native().skewY(y || 0));
      }
      // Transform around a center point
      , around: function around(cx, cy, matrix) {
        return this.multiply(new SVG.Matrix(1, 0, 0, 1, cx || 0, cy || 0)).multiply(matrix).multiply(new SVG.Matrix(1, 0, 0, 1, -cx || 0, -cy || 0));
      }
      // Convert to native SVGMatrix
      , native: function native() {
        // create new matrix
        var matrix = SVG.parser.native.createSVGMatrix();

        // update with current values
        for (var i = abcdef.length - 1; i >= 0; i--) {
          matrix[abcdef[i]] = this[abcdef[i]];
        }return matrix;
      }
      // Convert matrix to string
      , toString: function toString() {
        return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
      }

      // Define parent
    }, parent: SVG.Element

    // Add parent method
    , construct: {
      // Get current matrix
      ctm: function ctm() {
        return new SVG.Matrix(this.node.getCTM());
      },
      // Get current screen matrix
      screenCTM: function screenCTM() {
        return new SVG.Matrix(this.node.getScreenCTM());
      }

    }

  });

  SVG.Point = SVG.invent({
    // Initialize
    create: function create(x, y) {
      var i,
          source,
          base = { x: 0, y: 0

        // ensure source as object
      };source = Array.isArray(x) ? { x: x[0], y: x[1] } : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? { x: x.x, y: x.y } : y != null ? { x: x, y: y } : base;

      // merge source
      this.x = source.x;
      this.y = source.y;
    }

    // Add methods
    , extend: {
      // Clone point
      clone: function clone() {
        return new SVG.Point(this);
      }
      // Morph one point into another
      , morph: function morph(point) {
        // store new destination
        this.destination = new SVG.Point(point);

        return this;
      }
      // Get morphed point at a given position
      , at: function at(pos) {
        // make sure a destination is defined
        if (!this.destination) return this;

        // calculate morphed matrix at a given position
        var point = new SVG.Point({
          x: this.x + (this.destination.x - this.x) * pos,
          y: this.y + (this.destination.y - this.y) * pos
        });

        return point;
      }
      // Convert to native SVGPoint
      , native: function native() {
        // create new point
        var point = SVG.parser.native.createSVGPoint();

        // update with current values
        point.x = this.x;
        point.y = this.y;

        return point;
      }
      // transform point with matrix
      , transform: function transform(matrix) {
        return new SVG.Point(this.native().matrixTransform(matrix.native()));
      }

    }

  });

  SVG.extend(SVG.Element, {

    // Get point
    point: function point(x, y) {
      return new SVG.Point(x, y).transform(this.screenCTM().inverse());
    }

  });

  SVG.extend(SVG.Element, {
    // Set svg element attribute
    attr: function attr(a, v, n) {
      // act as full getter
      if (a == null) {
        // get an object of attributes
        a = {};
        v = this.node.attributes;
        for (n = v.length - 1; n >= 0; n--) {
          a[v[n].nodeName] = SVG.regex.isNumber.test(v[n].nodeValue) ? parseFloat(v[n].nodeValue) : v[n].nodeValue;
        }return a;
      } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object') {
        // apply every attribute individually if an object is passed
        for (v in a) {
          this.attr(v, a[v]);
        }
      } else if (v === null) {
        // remove value
        this.node.removeAttribute(a);
      } else if (v == null) {
        // act as a getter if the first and only argument is not an object
        v = this.node.getAttribute(a);
        return v == null ? SVG.defaults.attrs[a] : SVG.regex.isNumber.test(v) ? parseFloat(v) : v;
      } else {
        // BUG FIX: some browsers will render a stroke if a color is given even though stroke width is 0
        if (a == 'stroke-width') this.attr('stroke', parseFloat(v) > 0 ? this._stroke : null);else if (a == 'stroke') this._stroke = v;

        // convert image fill and stroke to patterns
        if (a == 'fill' || a == 'stroke') {
          if (SVG.regex.isImage.test(v)) v = this.doc().defs().image(v, 0, 0);

          if (v instanceof SVG.Image) v = this.doc().defs().pattern(0, 0, function () {
            this.add(v);
          });
        }

        // ensure correct numeric values (also accepts NaN and Infinity)
        if (typeof v === 'number') v = new SVG.Number(v);

        // ensure full hex color
        else if (SVG.Color.isColor(v)) v = new SVG.Color(v);

          // parse array values
          else if (Array.isArray(v)) v = new SVG.Array(v);

            // store parametric transformation values locally
            else if (v instanceof SVG.Matrix && v.param) this.param = v.param;

        // if the passed attribute is leading...
        if (a == 'leading') {
          // ... call the leading method instead
          if (this.leading) this.leading(v);
        } else {
          // set given attribute on node
          typeof n === 'string' ? this.node.setAttributeNS(n, a, v.toString()) : this.node.setAttribute(a, v.toString());
        }

        // rebuild if required
        if (this.rebuild && (a == 'font-size' || a == 'x')) this.rebuild(a, v);
      }

      return this;
    }
  });
  SVG.extend(SVG.Element, {
    // Add transformations
    transform: function transform(o, relative) {
      // get target in case of the fx module, otherwise reference this
      var target = this,
          matrix;

      // act as a getter
      if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
        // get current matrix
        matrix = new SVG.Matrix(target).extract();

        return typeof o === 'string' ? matrix[o] : matrix;
      }

      // get current matrix
      matrix = new SVG.Matrix(target);

      // ensure relative flag
      relative = !!relative || !!o.relative;

      // act on matrix
      if (o.a != null) {
        matrix = relative ?
        // relative
        matrix.multiply(new SVG.Matrix(o)) :
        // absolute
        new SVG.Matrix(o);

        // act on rotation
      } else if (o.rotation != null) {
        // ensure centre point
        ensureCentre(o, target);

        // apply transformation
        matrix = relative ?
        // relative
        matrix.rotate(o.rotation, o.cx, o.cy) :
        // absolute
        matrix.rotate(o.rotation - matrix.extract().rotation, o.cx, o.cy);

        // act on scale
      } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
        // ensure centre point
        ensureCentre(o, target);

        // ensure scale values on both axes
        o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1;
        o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1;

        if (!relative) {
          // absolute; multiply inversed values
          var e = matrix.extract();
          o.scaleX = o.scaleX * 1 / e.scaleX;
          o.scaleY = o.scaleY * 1 / e.scaleY;
        }

        matrix = matrix.scale(o.scaleX, o.scaleY, o.cx, o.cy);

        // act on skew
      } else if (o.skewX != null || o.skewY != null) {
        // ensure centre point
        ensureCentre(o, target);

        // ensure skew values on both axes
        o.skewX = o.skewX != null ? o.skewX : 0;
        o.skewY = o.skewY != null ? o.skewY : 0;

        if (!relative) {
          // absolute; reset skew values
          var e = matrix.extract();
          matrix = matrix.multiply(new SVG.Matrix().skew(e.skewX, e.skewY, o.cx, o.cy).inverse());
        }

        matrix = matrix.skew(o.skewX, o.skewY, o.cx, o.cy);

        // act on flip
      } else if (o.flip) {
        matrix = matrix.flip(o.flip, o.offset == null ? target.bbox()['c' + o.flip] : o.offset);

        // act on translate
      } else if (o.x != null || o.y != null) {
        if (relative) {
          // relative
          matrix = matrix.translate(o.x, o.y);
        } else {
          // absolute
          if (o.x != null) matrix.e = o.x;
          if (o.y != null) matrix.f = o.y;
        }
      }

      return this.attr('transform', matrix);
    }
  });

  SVG.extend(SVG.FX, {
    transform: function transform(o, relative) {
      // get target in case of the fx module, otherwise reference this
      var target = this.target(),
          matrix;

      // act as a getter
      if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
        // get current matrix
        matrix = new SVG.Matrix(target).extract();

        return typeof o === 'string' ? matrix[o] : matrix;
      }

      // ensure relative flag
      relative = !!relative || !!o.relative;

      // act on matrix
      if (o.a != null) {
        matrix = new SVG.Matrix(o);

        // act on rotation
      } else if (o.rotation != null) {
        // ensure centre point
        ensureCentre(o, target);

        // apply transformation
        matrix = new SVG.Rotate(o.rotation, o.cx, o.cy);

        // act on scale
      } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
        // ensure centre point
        ensureCentre(o, target);

        // ensure scale values on both axes
        o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1;
        o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1;

        matrix = new SVG.Scale(o.scaleX, o.scaleY, o.cx, o.cy);

        // act on skew
      } else if (o.skewX != null || o.skewY != null) {
        // ensure centre point
        ensureCentre(o, target);

        // ensure skew values on both axes
        o.skewX = o.skewX != null ? o.skewX : 0;
        o.skewY = o.skewY != null ? o.skewY : 0;

        matrix = new SVG.Skew(o.skewX, o.skewY, o.cx, o.cy);

        // act on flip
      } else if (o.flip) {
        matrix = new SVG.Matrix().morph(new SVG.Matrix().flip(o.flip, o.offset == null ? target.bbox()['c' + o.flip] : o.offset));

        // act on translate
      } else if (o.x != null || o.y != null) {
        matrix = new SVG.Translate(o.x, o.y);
      }

      if (!matrix) return this;

      matrix.relative = relative;

      this.last().transforms.push(matrix);

      setTimeout(function () {
        this.start();
      }.bind(this), 0);

      return this;
    }
  });

  SVG.extend(SVG.Element, {
    // Reset all transformations
    untransform: function untransform() {
      return this.attr('transform', null);
    },
    // merge the whole transformation chain into one matrix and returns it
    matrixify: function matrixify() {

      var matrix = (this.attr('transform') || '').
      // split transformations
      split(/\)\s*/).slice(0, -1).map(function (str) {
        // generate key => value pairs
        var kv = str.trim().split('(');
        return [kv[0], kv[1].split(SVG.regex.matrixElements).map(function (str) {
          return parseFloat(str);
        })];
      })
      // calculate every transformation into one matrix
      .reduce(function (matrix, transform) {

        if (transform[0] == 'matrix') return matrix.multiply(arrayToMatrix(transform[1]));
        return matrix[transform[0]].apply(matrix, transform[1]);
      }, new SVG.Matrix());

      return matrix;
    },
    // add an element to another parent without changing the visual representation on the screen
    toParent: function toParent(parent) {
      if (this == parent) return this;
      var ctm = this.screenCTM();
      var temp = parent.rect(1, 1);
      var pCtm = temp.screenCTM().inverse();
      temp.remove();

      this.addTo(parent).untransform().transform(pCtm.multiply(ctm));

      return this;
    },
    // same as above with parent equals root-svg
    toDoc: function toDoc() {
      return this.toParent(this.doc());
    }

  });

  SVG.Transformation = SVG.invent({

    create: function create(source, inversed) {

      if (arguments.length > 1 && typeof inversed != 'boolean') {
        return this.create([].slice.call(arguments));
      }

      if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object') {
        for (var i = 0, len = this.arguments.length; i < len; ++i) {
          this[this.arguments[i]] = source[this.arguments[i]];
        }
      }

      if (Array.isArray(source)) {
        for (var i = 0, len = this.arguments.length; i < len; ++i) {
          this[this.arguments[i]] = source[i];
        }
      }

      this.inversed = false;

      if (inversed === true) {
        this.inversed = true;
      }
    },

    extend: {

      at: function at(pos) {

        var params = [];

        for (var i = 0, len = this.arguments.length; i < len; ++i) {
          params.push(this[this.arguments[i]]);
        }

        var m = this._undo || new SVG.Matrix();

        m = new SVG.Matrix().morph(SVG.Matrix.prototype[this.method].apply(m, params)).at(pos);

        return this.inversed ? m.inverse() : m;
      },

      undo: function undo(o) {
        for (var i = 0, len = this.arguments.length; i < len; ++i) {
          o[this.arguments[i]] = typeof this[this.arguments[i]] == 'undefined' ? 0 : o[this.arguments[i]];
        }

        this._undo = new SVG[capitalize(this.method)](o, true).at(1);

        return this;
      }

    }

  });

  SVG.Translate = SVG.invent({

    parent: SVG.Matrix,
    inherit: SVG.Transformation,

    create: function create(source, inversed) {
      if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object') this.constructor.call(this, source, inversed);else this.constructor.call(this, [].slice.call(arguments));
    },

    extend: {
      arguments: ['transformedX', 'transformedY'],
      method: 'translate'
    }

  });

  SVG.Rotate = SVG.invent({

    parent: SVG.Matrix,
    inherit: SVG.Transformation,

    create: function create(source, inversed) {
      if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object') this.constructor.call(this, source, inversed);else this.constructor.call(this, [].slice.call(arguments));
    },

    extend: {
      arguments: ['rotation', 'cx', 'cy'],
      method: 'rotate',
      at: function at(pos) {
        var m = new SVG.Matrix().rotate(new SVG.Number().morph(this.rotation - (this._undo ? this._undo.rotation : 0)).at(pos), this.cx, this.cy);
        return this.inversed ? m.inverse() : m;
      },
      undo: function undo(o) {
        this._undo = o;
      }
    }

  });

  SVG.Scale = SVG.invent({

    parent: SVG.Matrix,
    inherit: SVG.Transformation,

    create: function create(source, inversed) {
      if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object') this.constructor.call(this, source, inversed);else this.constructor.call(this, [].slice.call(arguments));
    },

    extend: {
      arguments: ['scaleX', 'scaleY', 'cx', 'cy'],
      method: 'scale'
    }

  });

  SVG.Skew = SVG.invent({

    parent: SVG.Matrix,
    inherit: SVG.Transformation,

    create: function create(source, inversed) {
      if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object') this.constructor.call(this, source, inversed);else this.constructor.call(this, [].slice.call(arguments));
    },

    extend: {
      arguments: ['skewX', 'skewY', 'cx', 'cy'],
      method: 'skew'
    }

  });

  SVG.extend(SVG.Element, {
    // Dynamic style generator
    style: function style(s, v) {
      if (arguments.length == 0) {
        // get full style
        return this.node.style.cssText || '';
      } else if (arguments.length < 2) {
        // apply every style individually if an object is passed
        if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) == 'object') {
          for (v in s) {
            this.style(v, s[v]);
          }
        } else if (SVG.regex.isCss.test(s)) {
          // parse css string
          s = s.split(';');

          // apply every definition individually
          for (var i = 0; i < s.length; i++) {
            v = s[i].split(':');
            this.style(v[0].replace(/\s+/g, ''), v[1]);
          }
        } else {
          // act as a getter if the first and only argument is not an object
          return this.node.style[camelCase(s)];
        }
      } else {
        this.node.style[camelCase(s)] = v === null || SVG.regex.isBlank.test(v) ? '' : v;
      }

      return this;
    }
  });
  SVG.Parent = SVG.invent({
    // Initialize node
    create: function create(element) {
      this.constructor.call(this, element);
    }

    // Inherit from
    , inherit: SVG.Element

    // Add class methods
    , extend: {
      // Returns all child elements
      children: function children() {
        return SVG.utils.map(SVG.utils.filterSVGElements(this.node.childNodes), function (node) {
          return SVG.adopt(node);
        });
      }
      // Add given element at a position
      , add: function add(element, i) {
        if (i == null) this.node.appendChild(element.node);else if (element.node != this.node.childNodes[i]) this.node.insertBefore(element.node, this.node.childNodes[i]);

        return this;
      }
      // Basically does the same as `add()` but returns the added element instead
      , put: function put(element, i) {
        this.add(element, i);
        return element;
      }
      // Checks if the given element is a child
      , has: function has(element) {
        return this.index(element) >= 0;
      }
      // Gets index of given element
      , index: function index(element) {
        return [].slice.call(this.node.childNodes).indexOf(element.node);
      }
      // Get a element at the given index
      , get: function get(i) {
        return SVG.adopt(this.node.childNodes[i]);
      }
      // Get first child
      , first: function first() {
        return this.get(0);
      }
      // Get the last child
      , last: function last() {
        return this.get(this.node.childNodes.length - 1);
      }
      // Iterates over all children and invokes a given block
      , each: function each(block, deep) {
        var i,
            il,
            children = this.children();

        for (i = 0, il = children.length; i < il; i++) {
          if (children[i] instanceof SVG.Element) block.apply(children[i], [i, children]);

          if (deep && children[i] instanceof SVG.Container) children[i].each(block, deep);
        }

        return this;
      }
      // Remove a given child
      , removeElement: function removeElement(element) {
        this.node.removeChild(element.node);

        return this;
      }
      // Remove all elements in this container
      , clear: function clear() {
        // remove children
        while (this.node.hasChildNodes()) {
          this.node.removeChild(this.node.lastChild);
        } // remove defs reference
        delete this._defs;

        return this;
      },
      // Get defs
      defs: function defs() {
        return this.doc().defs();
      }
    }

  });

  SVG.extend(SVG.Parent, {

    ungroup: function ungroup(parent, depth) {
      if (depth === 0 || this instanceof SVG.Defs) return this;

      parent = parent || (this instanceof SVG.Doc ? this : this.parent(SVG.Parent));
      depth = depth || Infinity;

      this.each(function () {
        if (this instanceof SVG.Defs) return this;
        if (this instanceof SVG.Parent) return this.ungroup(parent, depth - 1);
        return this.toParent(parent);
      });

      this.node.firstChild || this.remove();

      return this;
    },

    flatten: function flatten(parent, depth) {
      return this.ungroup(parent, depth);
    }

  });
  SVG.Container = SVG.invent({
    // Initialize node
    create: function create(element) {
      this.constructor.call(this, element);
    }

    // Inherit from
    , inherit: SVG.Parent

  });

  SVG.ViewBox = SVG.invent({

    create: function create(source) {
      var i,
          base = [0, 0, 0, 0];

      var x,
          y,
          width,
          height,
          box,
          view,
          we,
          he,
          wm = 1 // width multiplier
      ,
          hm = 1 // height multiplier
      ,
          reg = /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi;

      if (source instanceof SVG.Element) {

        we = source;
        he = source;
        view = (source.attr('viewBox') || '').match(reg);
        box = source.bbox;

        // get dimensions of current node
        width = new SVG.Number(source.width());
        height = new SVG.Number(source.height());

        // find nearest non-percentual dimensions
        while (width.unit == '%') {
          wm *= width.value;
          width = new SVG.Number(we instanceof SVG.Doc ? we.parent().offsetWidth : we.parent().width());
          we = we.parent();
        }
        while (height.unit == '%') {
          hm *= height.value;
          height = new SVG.Number(he instanceof SVG.Doc ? he.parent().offsetHeight : he.parent().height());
          he = he.parent();
        }

        // ensure defaults
        this.x = 0;
        this.y = 0;
        this.width = width * wm;
        this.height = height * hm;
        this.zoom = 1;

        if (view) {
          // get width and height from viewbox
          x = parseFloat(view[0]);
          y = parseFloat(view[1]);
          width = parseFloat(view[2]);
          height = parseFloat(view[3]);

          // calculate zoom accoring to viewbox
          this.zoom = this.width / this.height > width / height ? this.height / height : this.width / width;

          // calculate real pixel dimensions on parent SVG.Doc element
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
        }
      } else {

        // ensure source as object
        source = typeof source === 'string' ? source.match(reg).map(function (el) {
          return parseFloat(el);
        }) : Array.isArray(source) ? source : (typeof source === 'undefined' ? 'undefined' : _typeof(source)) == 'object' ? [source.x, source.y, source.width, source.height] : arguments.length == 4 ? [].slice.call(arguments) : base;

        this.x = source[0];
        this.y = source[1];
        this.width = source[2];
        this.height = source[3];
      }
    },

    extend: {

      toString: function toString() {
        return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
      },
      morph: function morph(v) {

        var v = arguments.length == 1 ? [v.x, v.y, v.width, v.height] : [].slice.call(arguments);

        this.destination = new SVG.ViewBox(v);

        return this;
      },

      at: function at(pos) {

        if (!this.destination) return this;

        return new SVG.ViewBox([this.x + (this.destination.x - this.x) * pos, this.y + (this.destination.y - this.y) * pos, this.width + (this.destination.width - this.width) * pos, this.height + (this.destination.height - this.height) * pos]);
      }

      // Define parent
    }, parent: SVG.Container

    // Add parent method
    , construct: {

      // get/set viewbox
      viewbox: function viewbox(v) {
        if (arguments.length == 0)
          // act as a getter if there are no arguments
          return new SVG.ViewBox(this);

        // otherwise act as a setter
        v = arguments.length == 1 ? [v.x, v.y, v.width, v.height] : [].slice.call(arguments);

        return this.attr('viewBox', v);
      }

    }

  })
  // Add events to elements
  ;['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove'
  // , 'mouseenter' -> not supported by IE
  // , 'mouseleave' -> not supported by IE
  , 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].forEach(function (event) {

    // add event to SVG.Element
    SVG.Element.prototype[event] = function (f) {
      var self = this;

      // bind event to element rather than element node
      this.node['on' + event] = typeof f == 'function' ? function () {
        return f.apply(self, arguments);
      } : null;

      return this;
    };
  });

  // Initialize listeners stack
  SVG.listeners = [];
  SVG.handlerMap = [];
  SVG.listenerId = 0;

  // Add event binder in the SVG namespace
  SVG.on = function (node, event, listener, binding) {
    // create listener, get object-index
    var l = listener.bind(binding || node.instance || node),
        index = (SVG.handlerMap.indexOf(node) + 1 || SVG.handlerMap.push(node)) - 1,
        ev = event.split('.')[0],
        ns = event.split('.')[1] || '*';

    // ensure valid object
    SVG.listeners[index] = SVG.listeners[index] || {};
    SVG.listeners[index][ev] = SVG.listeners[index][ev] || {};
    SVG.listeners[index][ev][ns] = SVG.listeners[index][ev][ns] || {};

    if (!listener._svgjsListenerId) listener._svgjsListenerId = ++SVG.listenerId;

    // reference listener
    SVG.listeners[index][ev][ns][listener._svgjsListenerId] = l;

    // add listener
    node.addEventListener(ev, l, false);
  };

  // Add event unbinder in the SVG namespace
  SVG.off = function (node, event, listener) {
    var index = SVG.handlerMap.indexOf(node),
        ev = event && event.split('.')[0],
        ns = event && event.split('.')[1];

    if (index == -1) return;

    if (listener) {
      if (typeof listener == 'function') listener = listener._svgjsListenerId;
      if (!listener) return;

      // remove listener reference
      if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns || '*']) {
        // remove listener
        node.removeEventListener(ev, SVG.listeners[index][ev][ns || '*'][listener], false);

        delete SVG.listeners[index][ev][ns || '*'][listener];
      }
    } else if (ns && ev) {
      // remove all listeners for a namespaced event
      if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns]) {
        for (listener in SVG.listeners[index][ev][ns]) {
          SVG.off(node, [ev, ns].join('.'), listener);
        }delete SVG.listeners[index][ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in SVG.listeners[index]) {
        for (namespace in SVG.listeners[index][event]) {
          if (ns === namespace) {
            SVG.off(node, [event, ns].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (SVG.listeners[index][ev]) {
        for (namespace in SVG.listeners[index][ev]) {
          SVG.off(node, [ev, namespace].join('.'));
        }delete SVG.listeners[index][ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in SVG.listeners[index]) {
        SVG.off(node, event);
      }delete SVG.listeners[index];
    }
  };

  //
  SVG.extend(SVG.Element, {
    // Bind given event to listener
    on: function on(event, listener, binding) {
      SVG.on(this.node, event, listener, binding);

      return this;
    }
    // Unbind event from listener
    , off: function off(event, listener) {
      SVG.off(this.node, event, listener);

      return this;
    }
    // Fire given event
    , fire: function fire(event, data) {

      // Dispatch event
      if (event instanceof Event) {
        this.node.dispatchEvent(event);
      } else {
        this.node.dispatchEvent(new CustomEvent(event, { detail: data }));
      }

      return this;
    }
  });

  SVG.Defs = SVG.invent({
    // Initialize node
    create: 'defs'

    // Inherit from
    , inherit: SVG.Container

  });
  SVG.G = SVG.invent({
    // Initialize node
    create: 'g'

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Move over x-axis
      x: function x(_x3) {
        return _x3 == null ? this.transform('x') : this.transform({ x: _x3 - this.x() }, true);
      }
      // Move over y-axis
      , y: function y(_y3) {
        return _y3 == null ? this.transform('y') : this.transform({ y: _y3 - this.y() }, true);
      }
      // Move by center over x-axis
      , cx: function cx(x) {
        return x == null ? this.gbox().cx : this.x(x - this.gbox().width / 2);
      }
      // Move by center over y-axis
      , cy: function cy(y) {
        return y == null ? this.gbox().cy : this.y(y - this.gbox().height / 2);
      },
      gbox: function gbox() {

        var bbox = this.bbox(),
            trans = this.transform();

        bbox.x += trans.x;
        bbox.x2 += trans.x;
        bbox.cx += trans.x;

        bbox.y += trans.y;
        bbox.y2 += trans.y;
        bbox.cy += trans.y;

        return bbox;
      }

      // Add parent method
    }, construct: {
      // Create a group element
      group: function group() {
        return this.put(new SVG.G());
      }
    }
  });

  // ### This module adds backward / forward functionality to elements.

  //
  SVG.extend(SVG.Element, {
    // Get all siblings, including myself
    siblings: function siblings() {
      return this.parent().children();
    }
    // Get the curent position siblings
    , position: function position() {
      return this.parent().index(this);
    }
    // Get the next element (will return null if there is none)
    , next: function next() {
      return this.siblings()[this.position() + 1];
    }
    // Get the next element (will return null if there is none)
    , previous: function previous() {
      return this.siblings()[this.position() - 1];
    }
    // Send given element one step forward
    , forward: function forward() {
      var i = this.position() + 1,
          p = this.parent();

      // move node one step forward
      p.removeElement(this).add(this, i);

      // make sure defs node is always at the top
      if (p instanceof SVG.Doc) p.node.appendChild(p.defs().node);

      return this;
    }
    // Send given element one step backward
    , backward: function backward() {
      var i = this.position();

      if (i > 0) this.parent().removeElement(this).add(this, i - 1);

      return this;
    }
    // Send given element all the way to the front
    , front: function front() {
      var p = this.parent();

      // Move node forward
      p.node.appendChild(this.node);

      // Make sure defs node is always at the top
      if (p instanceof SVG.Doc) p.node.appendChild(p.defs().node);

      return this;
    }
    // Send given element all the way to the back
    , back: function back() {
      if (this.position() > 0) this.parent().removeElement(this).add(this, 0);

      return this;
    }
    // Inserts a given element before the targeted element
    , before: function before(element) {
      element.remove();

      var i = this.position();

      this.parent().add(element, i);

      return this;
    }
    // Insters a given element after the targeted element
    , after: function after(element) {
      element.remove();

      var i = this.position();

      this.parent().add(element, i + 1);

      return this;
    }

  });
  SVG.Mask = SVG.invent({
    // Initialize node
    create: function create() {
      this.constructor.call(this, SVG.create('mask'));

      // keep references to masked elements
      this.targets = [];
    }

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Unmask all masked elements and remove itself
      remove: function remove() {
        // unmask all targets
        for (var i = this.targets.length - 1; i >= 0; i--) {
          if (this.targets[i]) this.targets[i].unmask();
        }this.targets = [];

        // remove mask from parent
        this.parent().removeElement(this);

        return this;
      }

      // Add parent method
    }, construct: {
      // Create masking element
      mask: function mask() {
        return this.defs().put(new SVG.Mask());
      }
    }
  });

  SVG.extend(SVG.Element, {
    // Distribute mask to svg element
    maskWith: function maskWith(element) {
      // use given mask or create a new one
      this.masker = element instanceof SVG.Mask ? element : this.parent().mask().add(element);

      // store reverence on self in mask
      this.masker.targets.push(this);

      // apply mask
      return this.attr('mask', 'url("#' + this.masker.attr('id') + '")');
    }
    // Unmask element
    , unmask: function unmask() {
      delete this.masker;
      return this.attr('mask', null);
    }

  });

  SVG.ClipPath = SVG.invent({
    // Initialize node
    create: function create() {
      this.constructor.call(this, SVG.create('clipPath'));

      // keep references to clipped elements
      this.targets = [];
    }

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Unclip all clipped elements and remove itself
      remove: function remove() {
        // unclip all targets
        for (var i = this.targets.length - 1; i >= 0; i--) {
          if (this.targets[i]) this.targets[i].unclip();
        }this.targets = [];

        // remove clipPath from parent
        this.parent().removeElement(this);

        return this;
      }

      // Add parent method
    }, construct: {
      // Create clipping element
      clip: function clip() {
        return this.defs().put(new SVG.ClipPath());
      }
    }
  });

  //
  SVG.extend(SVG.Element, {
    // Distribute clipPath to svg element
    clipWith: function clipWith(element) {
      // use given clip or create a new one
      this.clipper = element instanceof SVG.ClipPath ? element : this.parent().clip().add(element);

      // store reverence on self in mask
      this.clipper.targets.push(this);

      // apply mask
      return this.attr('clip-path', 'url("#' + this.clipper.attr('id') + '")');
    }
    // Unclip element
    , unclip: function unclip() {
      delete this.clipper;
      return this.attr('clip-path', null);
    }

  });
  SVG.Gradient = SVG.invent({
    // Initialize node
    create: function create(type) {
      this.constructor.call(this, SVG.create(type + 'Gradient'));

      // store type
      this.type = type;
    }

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Add a color stop
      at: function at(offset, color, opacity) {
        return this.put(new SVG.Stop()).update(offset, color, opacity);
      }
      // Update gradient
      , update: function update(block) {
        // remove all stops
        this.clear();

        // invoke passed block
        if (typeof block == 'function') block.call(this, this);

        return this;
      }
      // Return the fill id
      , fill: function fill() {
        return 'url(#' + this.id() + ')';
      }
      // Alias string convertion to fill
      , toString: function toString() {
        return this.fill();
      }
      // custom attr to handle transform
      , attr: function attr(a, b, c) {
        if (a == 'transform') a = 'gradientTransform';
        return SVG.Container.prototype.attr.call(this, a, b, c);
      }

      // Add parent method
    }, construct: {
      // Create gradient element in defs
      gradient: function gradient(type, block) {
        return this.defs().gradient(type, block);
      }
    }
  });

  // Add animatable methods to both gradient and fx module
  SVG.extend(SVG.Gradient, SVG.FX, {
    // From position
    from: function from(x, y) {
      return (this._target || this).type == 'radial' ? this.attr({ fx: new SVG.Number(x), fy: new SVG.Number(y) }) : this.attr({ x1: new SVG.Number(x), y1: new SVG.Number(y) });
    }
    // To position
    , to: function to(x, y) {
      return (this._target || this).type == 'radial' ? this.attr({ cx: new SVG.Number(x), cy: new SVG.Number(y) }) : this.attr({ x2: new SVG.Number(x), y2: new SVG.Number(y) });
    }
  });

  // Base gradient generation
  SVG.extend(SVG.Defs, {
    // define gradient
    gradient: function gradient(type, block) {
      return this.put(new SVG.Gradient(type)).update(block);
    }

  });

  SVG.Stop = SVG.invent({
    // Initialize node
    create: 'stop'

    // Inherit from
    , inherit: SVG.Element

    // Add class methods
    , extend: {
      // add color stops
      update: function update(o) {
        if (typeof o == 'number' || o instanceof SVG.Number) {
          o = {
            offset: arguments[0],
            color: arguments[1],
            opacity: arguments[2]
          };
        }

        // set attributes
        if (o.opacity != null) this.attr('stop-opacity', o.opacity);
        if (o.color != null) this.attr('stop-color', o.color);
        if (o.offset != null) this.attr('offset', new SVG.Number(o.offset));

        return this;
      }
    }

  });

  SVG.Pattern = SVG.invent({
    // Initialize node
    create: 'pattern'

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Return the fill id
      fill: function fill() {
        return 'url(#' + this.id() + ')';
      }
      // Update pattern by rebuilding
      , update: function update(block) {
        // remove content
        this.clear();

        // invoke passed block
        if (typeof block == 'function') block.call(this, this);

        return this;
      }
      // Alias string convertion to fill
      , toString: function toString() {
        return this.fill();
      }
      // custom attr to handle transform
      , attr: function attr(a, b, c) {
        if (a == 'transform') a = 'patternTransform';
        return SVG.Container.prototype.attr.call(this, a, b, c);
      }

      // Add parent method
    }, construct: {
      // Create pattern element in defs
      pattern: function pattern(width, height, block) {
        return this.defs().pattern(width, height, block);
      }
    }
  });

  SVG.extend(SVG.Defs, {
    // Define gradient
    pattern: function pattern(width, height, block) {
      return this.put(new SVG.Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      });
    }

  });
  SVG.Doc = SVG.invent({
    // Initialize node
    create: function create(element) {
      if (element) {
        // ensure the presence of a dom element
        element = typeof element == 'string' ? document.getElementById(element) : element;

        // If the target is an svg element, use that element as the main wrapper.
        // This allows svg.js to work with svg documents as well.
        if (element.nodeName == 'svg') {
          this.constructor.call(this, element);
        } else {
          this.constructor.call(this, SVG.create('svg'));
          element.appendChild(this.node);
          this.size('100%', '100%');
        }

        // set svg element attributes and ensure defs node
        this.namespace().defs();
      }
    }

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Add namespaces
      namespace: function namespace() {
        return this.attr({ xmlns: SVG.ns, version: '1.1' }).attr('xmlns:xlink', SVG.xlink, SVG.xmlns).attr('xmlns:svgjs', SVG.svgjs, SVG.xmlns);
      }
      // Creates and returns defs element
      , defs: function defs() {
        if (!this._defs) {
          var defs;

          // Find or create a defs element in this instance
          if (defs = this.node.getElementsByTagName('defs')[0]) this._defs = SVG.adopt(defs);else this._defs = new SVG.Defs();

          // Make sure the defs node is at the end of the stack
          this.node.appendChild(this._defs.node);
        }

        return this._defs;
      }
      // custom parent method
      , parent: function parent() {
        return this.node.parentNode.nodeName == '#document' ? null : this.node.parentNode;
      }
      // Fix for possible sub-pixel offset. See:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=608812
      , spof: function spof(_spof) {
        var pos = this.node.getScreenCTM();

        if (pos) this.style('left', -pos.e % 1 + 'px').style('top', -pos.f % 1 + 'px');

        return this;
      }

      // Removes the doc from the DOM
      , remove: function remove() {
        if (this.parent()) {
          this.parent().removeChild(this.node);
        }

        return this;
      }
    }

  });

  SVG.Shape = SVG.invent({
    // Initialize node
    create: function create(element) {
      this.constructor.call(this, element);
    }

    // Inherit from
    , inherit: SVG.Element

  });

  SVG.Bare = SVG.invent({
    // Initialize
    create: function create(element, inherit) {
      // construct element
      this.constructor.call(this, SVG.create(element));

      // inherit custom methods
      if (inherit) for (var method in inherit.prototype) {
        if (typeof inherit.prototype[method] === 'function') this[method] = inherit.prototype[method];
      }
    }

    // Inherit from
    , inherit: SVG.Element

    // Add methods
    , extend: {
      // Insert some plain text
      words: function words(text) {
        // remove contents
        while (this.node.hasChildNodes()) {
          this.node.removeChild(this.node.lastChild);
        } // create text node
        this.node.appendChild(document.createTextNode(text));

        return this;
      }
    }
  });

  SVG.extend(SVG.Parent, {
    // Create an element that is not described by SVG.js
    element: function element(_element, inherit) {
      return this.put(new SVG.Bare(_element, inherit));
    }
    // Add symbol element
    , symbol: function symbol() {
      return this.defs().element('symbol', SVG.Container);
    }

  });
  SVG.Use = SVG.invent({
    // Initialize node
    create: 'use'

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // Use element as a reference
      element: function element(_element2, file) {
        // Set lined element
        return this.attr('href', (file || '') + '#' + _element2, SVG.xlink);
      }

      // Add parent method
    }, construct: {
      // Create a use element
      use: function use(element, file) {
        return this.put(new SVG.Use()).element(element, file);
      }
    }
  });
  SVG.Rect = SVG.invent({
    // Initialize node
    create: 'rect'

    // Inherit from
    , inherit: SVG.Shape

    // Add parent method
    , construct: {
      // Create a rect element
      rect: function rect(width, height) {
        return this.put(new SVG.Rect()).size(width, height);
      }
    }
  });
  SVG.Circle = SVG.invent({
    // Initialize node
    create: 'circle'

    // Inherit from
    , inherit: SVG.Shape

    // Add parent method
    , construct: {
      // Create circle element, based on ellipse
      circle: function circle(size) {
        return this.put(new SVG.Circle()).rx(new SVG.Number(size).divide(2)).move(0, 0);
      }
    }
  });

  SVG.extend(SVG.Circle, SVG.FX, {
    // Radius x value
    rx: function rx(_rx) {
      return this.attr('r', _rx);
    }
    // Alias radius x value
    , ry: function ry(_ry) {
      return this.rx(_ry);
    }
  });

  SVG.Ellipse = SVG.invent({
    // Initialize node
    create: 'ellipse'

    // Inherit from
    , inherit: SVG.Shape

    // Add parent method
    , construct: {
      // Create an ellipse
      ellipse: function ellipse(width, height) {
        return this.put(new SVG.Ellipse()).size(width, height).move(0, 0);
      }
    }
  });

  SVG.extend(SVG.Ellipse, SVG.Rect, SVG.FX, {
    // Radius x value
    rx: function rx(_rx2) {
      return this.attr('rx', _rx2);
    }
    // Radius y value
    , ry: function ry(_ry2) {
      return this.attr('ry', _ry2);
    }
  });

  // Add common method
  SVG.extend(SVG.Circle, SVG.Ellipse, {
    // Move over x-axis
    x: function x(_x4) {
      return _x4 == null ? this.cx() - this.rx() : this.cx(_x4 + this.rx());
    }
    // Move over y-axis
    , y: function y(_y4) {
      return _y4 == null ? this.cy() - this.ry() : this.cy(_y4 + this.ry());
    }
    // Move by center over x-axis
    , cx: function cx(x) {
      return x == null ? this.attr('cx') : this.attr('cx', x);
    }
    // Move by center over y-axis
    , cy: function cy(y) {
      return y == null ? this.attr('cy') : this.attr('cy', y);
    }
    // Set width of element
    , width: function width(_width2) {
      return _width2 == null ? this.rx() * 2 : this.rx(new SVG.Number(_width2).divide(2));
    }
    // Set height of element
    , height: function height(_height2) {
      return _height2 == null ? this.ry() * 2 : this.ry(new SVG.Number(_height2).divide(2));
    }
    // Custom size function
    , size: function size(width, height) {
      var p = proportionalSize(this, width, height);

      return this.rx(new SVG.Number(p.width).divide(2)).ry(new SVG.Number(p.height).divide(2));
    }
  });
  SVG.Line = SVG.invent({
    // Initialize node
    create: 'line'

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // Get array
      array: function array() {
        return new SVG.PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
      }
      // Overwrite native plot() method
      , plot: function plot(x1, y1, x2, y2) {
        if (typeof y1 !== 'undefined') x1 = { x1: x1, y1: y1, x2: x2, y2: y2 };else x1 = new SVG.PointArray(x1).toLine();

        return this.attr(x1);
      }
      // Move by left top corner
      , move: function move(x, y) {
        return this.attr(this.array().move(x, y).toLine());
      }
      // Set element size to given width and height
      , size: function size(width, height) {
        var p = proportionalSize(this, width, height);

        return this.attr(this.array().size(p.width, p.height).toLine());
      }

      // Add parent method
    }, construct: {
      // Create a line element
      line: function line(x1, y1, x2, y2) {
        return this.put(new SVG.Line()).plot(x1, y1, x2, y2);
      }
    }
  });

  SVG.Polyline = SVG.invent({
    // Initialize node
    create: 'polyline'

    // Inherit from
    , inherit: SVG.Shape

    // Add parent method
    , construct: {
      // Create a wrapped polyline element
      polyline: function polyline(p) {
        return this.put(new SVG.Polyline()).plot(p);
      }
    }
  });

  SVG.Polygon = SVG.invent({
    // Initialize node
    create: 'polygon'

    // Inherit from
    , inherit: SVG.Shape

    // Add parent method
    , construct: {
      // Create a wrapped polygon element
      polygon: function polygon(p) {
        return this.put(new SVG.Polygon()).plot(p);
      }
    }
  });

  // Add polygon-specific functions
  SVG.extend(SVG.Polyline, SVG.Polygon, {
    // Get array
    array: function array() {
      return this._array || (this._array = new SVG.PointArray(this.attr('points')));
    }
    // Plot new path
    , plot: function plot(p) {
      return this.attr('points', this._array = new SVG.PointArray(p));
    }
    // Move by left top corner
    , move: function move(x, y) {
      return this.attr('points', this.array().move(x, y));
    }
    // Set element size to given width and height
    , size: function size(width, height) {
      var p = proportionalSize(this, width, height);

      return this.attr('points', this.array().size(p.width, p.height));
    }

  });
  // unify all point to point elements
  SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, {
    // Define morphable array
    morphArray: SVG.PointArray
    // Move by left top corner over x-axis
    , x: function x(_x5) {
      return _x5 == null ? this.bbox().x : this.move(_x5, this.bbox().y);
    }
    // Move by left top corner over y-axis
    , y: function y(_y5) {
      return _y5 == null ? this.bbox().y : this.move(this.bbox().x, _y5);
    }
    // Set width of element
    , width: function width(_width3) {
      var b = this.bbox();

      return _width3 == null ? b.width : this.size(_width3, b.height);
    }
    // Set height of element
    , height: function height(_height3) {
      var b = this.bbox();

      return _height3 == null ? b.height : this.size(b.width, _height3);
    }
  });
  SVG.Path = SVG.invent({
    // Initialize node
    create: 'path'

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // Define morphable array
      morphArray: SVG.PathArray
      // Get array
      , array: function array() {
        return this._array || (this._array = new SVG.PathArray(this.attr('d')));
      }
      // Plot new poly points
      , plot: function plot(p) {
        return this.attr('d', this._array = new SVG.PathArray(p));
      }
      // Move by left top corner
      , move: function move(x, y) {
        return this.attr('d', this.array().move(x, y));
      }
      // Move by left top corner over x-axis
      , x: function x(_x6) {
        return _x6 == null ? this.bbox().x : this.move(_x6, this.bbox().y);
      }
      // Move by left top corner over y-axis
      , y: function y(_y6) {
        return _y6 == null ? this.bbox().y : this.move(this.bbox().x, _y6);
      }
      // Set element size to given width and height
      , size: function size(width, height) {
        var p = proportionalSize(this, width, height);

        return this.attr('d', this.array().size(p.width, p.height));
      }
      // Set width of element
      , width: function width(_width4) {
        return _width4 == null ? this.bbox().width : this.size(_width4, this.bbox().height);
      }
      // Set height of element
      , height: function height(_height4) {
        return _height4 == null ? this.bbox().height : this.size(this.bbox().width, _height4);
      }

      // Add parent method
    }, construct: {
      // Create a wrapped path element
      path: function path(d) {
        return this.put(new SVG.Path()).plot(d);
      }
    }
  });
  SVG.Image = SVG.invent({
    // Initialize node
    create: 'image'

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // (re)load image
      load: function load(url) {
        if (!url) return this;

        var self = this,
            img = document.createElement('img');

        // preload image
        img.onload = function () {
          var p = self.parent(SVG.Pattern);

          if (p === null) return;

          // ensure image size
          if (self.width() == 0 && self.height() == 0) self.size(img.width, img.height);

          // ensure pattern size if not set
          if (p && p.width() == 0 && p.height() == 0) p.size(self.width(), self.height());

          // callback
          if (typeof self._loaded === 'function') self._loaded.call(self, {
            width: img.width,
            height: img.height,
            ratio: img.width / img.height,
            url: url
          });
        };

        img.onerror = function (e) {
          if (typeof self._error === 'function') {
            self._error.call(self, e);
          }
        };

        return this.attr('href', img.src = this.src = url, SVG.xlink);
      }
      // Add loaded callback
      , loaded: function loaded(_loaded) {
        this._loaded = _loaded;
        return this;
      },

      error: function error(_error) {
        this._error = _error;
        return this;
      }

      // Add parent method
    }, construct: {
      // create image element, load image and set its size
      image: function image(source, width, height) {
        return this.put(new SVG.Image()).load(source).size(width || 0, height || width || 0);
      }
    }

  });
  SVG.Text = SVG.invent({
    // Initialize node
    create: function create() {
      this.constructor.call(this, SVG.create('text'));

      this.dom.leading = new SVG.Number(1.3); // store leading value for rebuilding
      this._rebuild = true; // enable automatic updating of dy values
      this._build = false; // disable build mode for adding multiple lines

      // set default font
      this.attr('font-family', SVG.defaults.attrs['font-family']);
    }

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // Move over x-axis
      x: function x(_x7) {
        // act as getter
        if (_x7 == null) return this.attr('x');

        // move lines as well if no textPath is present
        if (!this.textPath) this.lines().each(function () {
          if (this.dom.newLined) this.x(_x7);
        });

        return this.attr('x', _x7);
      }
      // Move over y-axis
      , y: function y(_y7) {
        var oy = this.attr('y'),
            o = typeof oy === 'number' ? oy - this.bbox().y : 0;

        // act as getter
        if (_y7 == null) return typeof oy === 'number' ? oy - o : oy;

        return this.attr('y', typeof _y7 === 'number' ? _y7 + o : _y7);
      }
      // Move center over x-axis
      , cx: function cx(x) {
        return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2);
      }
      // Move center over y-axis
      , cy: function cy(y) {
        return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2);
      }
      // Set the text content
      , text: function text(_text2) {
        // act as getter
        if (typeof _text2 === 'undefined') {
          var _text = '';
          var children = this.node.childNodes;
          for (var i = 0, len = children.length; i < len; ++i) {

            // add newline if its not the first child and newLined is set to true
            if (i != 0 && children[i].nodeType != 3 && SVG.adopt(children[i]).dom.newLined == true) {
              _text += '\n';
            }

            // add content of this node
            _text += children[i].textContent;
          }

          return _text;
        }

        // remove existing content
        this.clear().build(true);

        if (typeof _text2 === 'function') {
          // call block
          _text2.call(this, this);
        } else {
          // store text and make sure text is not blank
          _text2 = _text2.split('\n');

          // build new lines
          for (var i = 0, il = _text2.length; i < il; i++) {
            this.tspan(_text2[i]).newLine();
          }
        }

        // disable build mode and rebuild lines
        return this.build(false).rebuild();
      }
      // Set font size
      , size: function size(_size) {
        return this.attr('font-size', _size).rebuild();
      }
      // Set / get leading
      , leading: function leading(value) {
        // act as getter
        if (value == null) return this.dom.leading;

        // act as setter
        this.dom.leading = new SVG.Number(value);

        return this.rebuild();
      }
      // Get all the first level lines
      , lines: function lines() {
        var node = (this.textPath && this.textPath() || this).node;

        // filter tspans and map them to SVG.js instances
        var lines = SVG.utils.map(SVG.utils.filterSVGElements(node.childNodes), function (el) {
          return SVG.adopt(el);
        });

        // return an instance of SVG.set
        return new SVG.Set(lines);
      }
      // Rebuild appearance type
      , rebuild: function rebuild(_rebuild) {
        // store new rebuild flag if given
        if (typeof _rebuild == 'boolean') this._rebuild = _rebuild;

        // define position of all lines
        if (this._rebuild) {
          var self = this,
              blankLineOffset = 0,
              dy = this.dom.leading * new SVG.Number(this.attr('font-size'));

          this.lines().each(function () {
            if (this.dom.newLined) {
              if (!this.textPath) this.attr('x', self.attr('x'));

              if (this.text() == '\n') {
                blankLineOffset += dy;
              } else {
                this.attr('dy', dy + blankLineOffset);
                blankLineOffset = 0;
              }
            }
          });

          this.fire('rebuild');
        }

        return this;
      }
      // Enable / disable build mode
      , build: function build(_build) {
        this._build = !!_build;
        return this;
      }
      // overwrite method from parent to set data properly
      , setData: function setData(o) {
        this.dom = o;
        this.dom.leading = new SVG.Number(o.leading || 1.3);
        return this;
      }

      // Add parent method
    }, construct: {
      // Create text element
      text: function text(_text3) {
        return this.put(new SVG.Text()).text(_text3);
      }
      // Create plain text element
      , plain: function plain(text) {
        return this.put(new SVG.Text()).plain(text);
      }
    }

  });

  SVG.Tspan = SVG.invent({
    // Initialize node
    create: 'tspan'

    // Inherit from
    , inherit: SVG.Shape

    // Add class methods
    , extend: {
      // Set text content
      text: function text(_text4) {
        if (_text4 == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');

        typeof _text4 === 'function' ? _text4.call(this, this) : this.plain(_text4);

        return this;
      }
      // Shortcut dx
      , dx: function dx(_dx) {
        return this.attr('dx', _dx);
      }
      // Shortcut dy
      , dy: function dy(_dy) {
        return this.attr('dy', _dy);
      }
      // Create new line
      , newLine: function newLine() {
        // fetch text parent
        var t = this.parent(SVG.Text);

        // mark new line
        this.dom.newLined = true;

        // apply new hy¡n
        return this.dy(t.dom.leading * t.attr('font-size')).attr('x', t.x());
      }
    }

  });

  SVG.extend(SVG.Text, SVG.Tspan, {
    // Create plain text node
    plain: function plain(text) {
      // clear if build mode is disabled
      if (this._build === false) this.clear();

      // create text node
      this.node.appendChild(document.createTextNode(text));

      return this;
    }
    // Create a tspan
    , tspan: function tspan(text) {
      var node = (this.textPath && this.textPath() || this).node,
          tspan = new SVG.Tspan();

      // clear if build mode is disabled
      if (this._build === false) this.clear();

      // add new tspan
      node.appendChild(tspan.node);

      return tspan.text(text);
    }
    // Clear all lines
    , clear: function clear() {
      var node = (this.textPath && this.textPath() || this).node;

      // remove existing child nodes
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }return this;
    }
    // Get length of text element
    , length: function length() {
      return this.node.getComputedTextLength();
    }
  });

  SVG.TextPath = SVG.invent({
    // Initialize node
    create: 'textPath'

    // Inherit from
    , inherit: SVG.Parent

    // Define parent class
    , parent: SVG.Text

    // Add parent method
    , construct: {
      // Create path for text to run on
      path: function path(d) {
        // create textPath element
        var path = new SVG.TextPath(),
            track = this.doc().defs().path(d);

        // move lines to textpath
        while (this.node.hasChildNodes()) {
          path.node.appendChild(this.node.firstChild);
        } // add textPath element as child node
        this.node.appendChild(path.node);

        // link textPath to path and add content
        path.attr('href', '#' + track, SVG.xlink);

        return this;
      }
      // Plot path if any
      , plot: function plot(d) {
        var track = this.track();

        if (track) track.plot(d);

        return this;
      }
      // Get the path track element
      , track: function track() {
        var path = this.textPath();

        if (path) return path.reference('href');
      }
      // Get the textPath child
      , textPath: function textPath() {
        if (this.node.firstChild && this.node.firstChild.nodeName == 'textPath') return SVG.adopt(this.node.firstChild);
      }
    }
  });
  SVG.Nested = SVG.invent({
    // Initialize node
    create: function create() {
      this.constructor.call(this, SVG.create('svg'));

      this.style('overflow', 'visible');
    }

    // Inherit from
    , inherit: SVG.Container

    // Add parent method
    , construct: {
      // Create nested svg document
      nested: function nested() {
        return this.put(new SVG.Nested());
      }
    }
  });
  SVG.A = SVG.invent({
    // Initialize node
    create: 'a'

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Link url
      to: function to(url) {
        return this.attr('href', url, SVG.xlink);
      }
      // Link show attribute
      , show: function show(target) {
        return this.attr('show', target, SVG.xlink);
      }
      // Link target attribute
      , target: function target(_target2) {
        return this.attr('target', _target2);
      }

      // Add parent method
    }, construct: {
      // Create a hyperlink element
      link: function link(url) {
        return this.put(new SVG.A()).to(url);
      }
    }
  });

  SVG.extend(SVG.Element, {
    // Create a hyperlink element
    linkTo: function linkTo(url) {
      var link = new SVG.A();

      if (typeof url == 'function') url.call(link, link);else link.to(url);

      return this.parent().put(link).put(this);
    }

  });
  SVG.Marker = SVG.invent({
    // Initialize node
    create: 'marker'

    // Inherit from
    , inherit: SVG.Container

    // Add class methods
    , extend: {
      // Set width of element
      width: function width(_width5) {
        return this.attr('markerWidth', _width5);
      }
      // Set height of element
      , height: function height(_height5) {
        return this.attr('markerHeight', _height5);
      }
      // Set marker refX and refY
      , ref: function ref(x, y) {
        return this.attr('refX', x).attr('refY', y);
      }
      // Update marker
      , update: function update(block) {
        // remove all content
        this.clear();

        // invoke passed block
        if (typeof block == 'function') block.call(this, this);

        return this;
      }
      // Return the fill id
      , toString: function toString() {
        return 'url(#' + this.id() + ')';
      }

      // Add parent method
    }, construct: {
      marker: function marker(width, height, block) {
        // Create marker element in defs
        return this.defs().marker(width, height, block);
      }
    }

  });

  SVG.extend(SVG.Defs, {
    // Create marker
    marker: function marker(width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new SVG.Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
    }

  });

  SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path, {
    // Create and attach markers
    marker: function marker(_marker, width, height, block) {
      var attr = ['marker'];

      // Build attribute name
      if (_marker != 'all') attr.push(_marker);
      attr = attr.join('-');

      // Set marker attribute
      _marker = arguments[1] instanceof SVG.Marker ? arguments[1] : this.doc().marker(width, height, block);

      return this.attr(attr, _marker);
    }

  });
  // Define list of available attributes for stroke and fill
  var sugar = {
    stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
    fill: ['color', 'opacity', 'rule'],
    prefix: function prefix(t, a) {
      return a == 'color' ? t : t + '-' + a;
    }

    // Add sugar for fill and stroke
  };['fill', 'stroke'].forEach(function (m) {
    var i,
        extension = {};

    extension[m] = function (o) {
      if (typeof o == 'string' || SVG.Color.isRgb(o) || o && typeof o.fill === 'function') this.attr(m, o);else
        // set all attributes from sugar.fill and sugar.stroke list
        for (i = sugar[m].length - 1; i >= 0; i--) {
          if (o[sugar[m][i]] != null) this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }return this;
    };

    SVG.extend(SVG.Element, SVG.FX, extension);
  });

  SVG.extend(SVG.Element, SVG.FX, {
    // Map rotation to transform
    rotate: function rotate(d, cx, cy) {
      return this.transform({ rotation: d, cx: cx, cy: cy });
    }
    // Map skew to transform
    , skew: function skew(x, y, cx, cy) {
      return this.transform({ skewX: x, skewY: y, cx: cx, cy: cy });
    }
    // Map scale to transform
    , scale: function scale(x, y, cx, cy) {
      return arguments.length == 1 || arguments.length == 3 ? this.transform({ scale: x, cx: y, cy: cx }) : this.transform({ scaleX: x, scaleY: y, cx: cx, cy: cy });
    }
    // Map translate to transform
    , translate: function translate(x, y) {
      return this.transform({ x: x, y: y });
    }
    // Map flip to transform
    , flip: function flip(a, o) {
      return this.transform({ flip: a, offset: o });
    }
    // Map matrix to transform
    , matrix: function matrix(m) {
      return this.attr('transform', new SVG.Matrix(m));
    }
    // Opacity
    , opacity: function opacity(value) {
      return this.attr('opacity', value);
    }
    // Relative move over x axis
    , dx: function dx(x) {
      return this.x((this instanceof SVG.FX ? 0 : this.x()) + x, true);
    }
    // Relative move over y axis
    , dy: function dy(y) {
      return this.y((this instanceof SVG.FX ? 0 : this.y()) + y, true);
    }
    // Relative move over x and y axes
    , dmove: function dmove(x, y) {
      return this.dx(x).dy(y);
    }
  });

  SVG.extend(SVG.Rect, SVG.Ellipse, SVG.Circle, SVG.Gradient, SVG.FX, {
    // Add x and y radius
    radius: function radius(x, y) {
      var type = (this._target || this).type;
      return type == 'radial' || type == 'circle' ? this.attr('r', new SVG.Number(x)) : this.rx(x).ry(y == null ? x : y);
    }
  });

  SVG.extend(SVG.Path, {
    // Get path length
    length: function length() {
      return this.node.getTotalLength();
    }
    // Get point at length
    , pointAt: function pointAt(length) {
      return this.node.getPointAtLength(length);
    }
  });

  SVG.extend(SVG.Parent, SVG.Text, SVG.FX, {
    // Set font
    font: function font(o) {
      for (var k in o) {
        k == 'leading' ? this.leading(o[k]) : k == 'anchor' ? this.attr('text-anchor', o[k]) : k == 'size' || k == 'family' || k == 'weight' || k == 'stretch' || k == 'variant' || k == 'style' ? this.attr('font-' + k, o[k]) : this.attr(k, o[k]);
      }return this;
    }
  });

  SVG.Set = SVG.invent({
    // Initialize
    create: function create(members) {
      // Set initial state
      Array.isArray(members) ? this.members = members : this.clear();
    }

    // Add class methods
    , extend: {
      // Add element to set
      add: function add() {
        var i,
            il,
            elements = [].slice.call(arguments);

        for (i = 0, il = elements.length; i < il; i++) {
          this.members.push(elements[i]);
        }return this;
      }
      // Remove element from set
      , remove: function remove(element) {
        var i = this.index(element);

        // remove given child
        if (i > -1) this.members.splice(i, 1);

        return this;
      }
      // Iterate over all members
      , each: function each(block) {
        for (var i = 0, il = this.members.length; i < il; i++) {
          block.apply(this.members[i], [i, this.members]);
        }return this;
      }
      // Restore to defaults
      , clear: function clear() {
        // initialize store
        this.members = [];

        return this;
      }
      // Get the length of a set
      , length: function length() {
        return this.members.length;
      }
      // Checks if a given element is present in set
      , has: function has(element) {
        return this.index(element) >= 0;
      }
      // retuns index of given element in set
      , index: function index(element) {
        return this.members.indexOf(element);
      }
      // Get member at given index
      , get: function get(i) {
        return this.members[i];
      }
      // Get first member
      , first: function first() {
        return this.get(0);
      }
      // Get last member
      , last: function last() {
        return this.get(this.members.length - 1);
      }
      // Default value
      , valueOf: function valueOf() {
        return this.members;
      }
      // Get the bounding box of all members included or empty box if set has no items
      , bbox: function bbox() {
        var box = new SVG.BBox();

        // return an empty box of there are no members
        if (this.members.length == 0) return box;

        // get the first rbox and update the target bbox
        var rbox = this.members[0].rbox();
        box.x = rbox.x;
        box.y = rbox.y;
        box.width = rbox.width;
        box.height = rbox.height;

        this.each(function () {
          // user rbox for correct position and visual representation
          box = box.merge(this.rbox());
        });

        return box;
      }

      // Add parent method
    }, construct: {
      // Create a new set
      set: function set(members) {
        return new SVG.Set(members);
      }
    }
  });

  SVG.FX.Set = SVG.invent({
    // Initialize node
    create: function create(set) {
      // store reference to set
      this.set = set;
    }

  });

  // Alias methods
  SVG.Set.inherit = function () {
    var m,
        methods = [];

    // gather shape methods
    for (var m in SVG.Shape.prototype) {
      if (typeof SVG.Shape.prototype[m] == 'function' && typeof SVG.Set.prototype[m] != 'function') methods.push(m);
    } // apply shape aliasses
    methods.forEach(function (method) {
      SVG.Set.prototype[method] = function () {
        for (var i = 0, il = this.members.length; i < il; i++) {
          if (this.members[i] && typeof this.members[i][method] == 'function') this.members[i][method].apply(this.members[i], arguments);
        }return method == 'animate' ? this.fx || (this.fx = new SVG.FX.Set(this)) : this;
      };
    });

    // clear methods for the next round
    methods = [];

    // gather fx methods
    for (var m in SVG.FX.prototype) {
      if (typeof SVG.FX.prototype[m] == 'function' && typeof SVG.FX.Set.prototype[m] != 'function') methods.push(m);
    } // apply fx aliasses
    methods.forEach(function (method) {
      SVG.FX.Set.prototype[method] = function () {
        for (var i = 0, il = this.set.members.length; i < il; i++) {
          this.set.members[i].fx[method].apply(this.set.members[i].fx, arguments);
        }return this;
      };
    });
  };

  SVG.extend(SVG.Element, {
    // Store data values on svg nodes
    data: function data(a, v, r) {
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object') {
        for (v in a) {
          this.data(v, a[v]);
        }
      } else if (arguments.length < 2) {
        try {
          return JSON.parse(this.attr('data-' + a));
        } catch (e) {
          return this.attr('data-' + a);
        }
      } else {
        this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
      }

      return this;
    }
  });
  SVG.extend(SVG.Element, {
    // Remember arbitrary data
    remember: function remember(k, v) {
      // remember every item in an object individually
      if (_typeof(arguments[0]) == 'object') for (var v in k) {
        this.remember(v, k[v]);
      } // retrieve memory
      else if (arguments.length == 1) return this.memory()[k];

        // store memory
        else this.memory()[k] = v;

      return this;
    }

    // Erase a given memory
    , forget: function forget() {
      if (arguments.length == 0) this._memory = {};else for (var i = arguments.length - 1; i >= 0; i--) {
        delete this.memory()[arguments[i]];
      }return this;
    }

    // Initialize or return local memory object
    , memory: function memory() {
      return this._memory || (this._memory = {});
    }

  });
  // Method for getting an element by id
  SVG.get = function (id) {
    var node = document.getElementById(idFromReference(id) || id);
    return SVG.adopt(node);
  };

  // Select elements by query string
  SVG.select = function (query, parent) {
    return new SVG.Set(SVG.utils.map((parent || document).querySelectorAll(query), function (node) {
      return SVG.adopt(node);
    }));
  };

  SVG.extend(SVG.Parent, {
    // Scoped select method
    select: function select(query) {
      return SVG.select(query, this.node);
    }

  });
  function _is(el, obj) {
    return el instanceof obj;
  }

  // tests if a given selector matches an element
  function _matches(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
  }

  // Convert dash-separated-string to camelCase
  function camelCase(s) {
    return s.toLowerCase().replace(/-(.)/g, function (m, g) {
      return g.toUpperCase();
    });
  }

  // Capitalize first letter of a string
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Ensure to six-based hex
  function fullHex(hex) {
    return hex.length == 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
  }

  // Component to hex value
  function compToHex(comp) {
    var hex = comp.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  // Calculate proportional width and height values when necessary
  function proportionalSize(element, width, height) {
    if (width == null || height == null) {
      var box = element.bbox();

      if (width == null) width = box.width / box.height * height;else if (height == null) height = box.height / box.width * width;
    }

    return {
      width: width,
      height: height
    };
  }

  // Delta transform point
  function deltaTransformPoint(matrix, x, y) {
    return {
      x: x * matrix.a + y * matrix.c + 0,
      y: x * matrix.b + y * matrix.d + 0
    };
  }

  // Map matrix array to object
  function arrayToMatrix(a) {
    return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] };
  }

  // Parse matrix if required
  function parseMatrix(matrix) {
    if (!(matrix instanceof SVG.Matrix)) matrix = new SVG.Matrix(matrix);

    return matrix;
  }

  // Add centre point to transform object
  function ensureCentre(o, target) {
    o.cx = o.cx == null ? target.bbox().cx : o.cx;
    o.cy = o.cy == null ? target.bbox().cy : o.cy;
  }

  // Convert string to matrix
  function stringToMatrix(source) {
    // remove matrix wrapper and split to individual numbers
    source = source.replace(SVG.regex.whitespace, '').replace(SVG.regex.matrix, '').split(SVG.regex.matrixElements);

    // convert string values to floats and convert to a matrix-formatted object
    return arrayToMatrix(SVG.utils.map(source, function (n) {
      return parseFloat(n);
    }));
  }

  // Calculate position according to from and to
  function at(o, pos) {
    // number recalculation (don't bother converting to SVG.Number for performance reasons)
    return typeof o.from == 'number' ? o.from + (o.to - o.from) * pos :

    // instance recalculation
    o instanceof SVG.Color || o instanceof SVG.Number || o instanceof SVG.Matrix ? o.at(pos) :

    // for all other values wait until pos has reached 1 to return the final value
    pos < 1 ? o.from : o.to;
  }

  // PathArray Helpers
  function arrayToString(a) {
    for (var i = 0, il = a.length, s = ''; i < il; i++) {
      s += a[i][0];

      if (a[i][1] != null) {
        s += a[i][1];

        if (a[i][2] != null) {
          s += ' ';
          s += a[i][2];

          if (a[i][3] != null) {
            s += ' ';
            s += a[i][3];
            s += ' ';
            s += a[i][4];

            if (a[i][5] != null) {
              s += ' ';
              s += a[i][5];
              s += ' ';
              s += a[i][6];

              if (a[i][7] != null) {
                s += ' ';
                s += a[i][7];
              }
            }
          }
        }
      }
    }

    return s + ' ';
  }

  // Deep new id assignment
  function assignNewId(node) {
    // do the same for SVG child nodes as well
    for (var i = node.childNodes.length - 1; i >= 0; i--) {
      if (node.childNodes[i] instanceof SVGElement) assignNewId(node.childNodes[i]);
    }return SVG.adopt(node).id(SVG.eid(node.nodeName));
  }

  // Add more bounding box properties
  function fullBox(b) {
    if (b.x == null) {
      b.x = 0;
      b.y = 0;
      b.width = 0;
      b.height = 0;
    }

    b.w = b.width;
    b.h = b.height;
    b.x2 = b.x + b.width;
    b.y2 = b.y + b.height;
    b.cx = b.x + b.width / 2;
    b.cy = b.y + b.height / 2;

    return b;
  }

  // Get id from reference string
  function idFromReference(url) {
    var m = url.toString().match(SVG.regex.reference);

    if (m) return m[1];
  }

  // Create matrix array for looping
  var abcdef = 'abcdef'.split('');
  // Add CustomEvent to IE9 and IE10
  if (typeof CustomEvent !== 'function') {
    // Code from: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
    var CustomEvent = function CustomEvent(event, options) {
      options = options || { bubbles: false, cancelable: false, detail: undefined };
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(event, options.bubbles, options.cancelable, options.detail);
      return e;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  }

  // requestAnimationFrame / cancelAnimationFrame Polyfill with fallback based on Paul Irish
  (function (w) {
    var lastTime = 0;
    var vendors = ['moz', 'webkit'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
      w.cancelAnimationFrame = w[vendors[x] + 'CancelAnimationFrame'] || w[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    w.requestAnimationFrame = w.requestAnimationFrame || function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));

      var id = w.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
    };

    w.cancelAnimationFrame = w.cancelAnimationFrame || w.clearTimeout;
  })(window);
  window.SVG = SVG;
  return SVG;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jQuery-FontSpy.js v3.0.0
 * https://github.com/patrickmarabeas/jQuery-FontSpy.js
 *
 * Copyright 2013, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 02/11/2015
 */

(function (w, $, window) {

  window.fontSpy = function (fontName, conf) {
    var $html = $('html'),
        $body = $('body'),
        fontFamilyName = fontName;

    // Throw error if fontName is not a string or not is left as an empty string
    if (typeof fontFamilyName !== 'string' || fontFamilyName === '') {
      throw 'A valid fontName is required. fontName must be a string and must not be an empty string.';
    }

    var defaults = {
      font: fontFamilyName,
      fontClass: fontFamilyName.toLowerCase().replace(/\s/g, ''),
      success: function success() {},
      failure: function failure() {},
      testFont: 'Courier New',
      testString: 'QW@HhsXJ',
      glyphs: '',
      delay: 50,
      timeOut: 500,
      callback: $.noop
    };

    var config = $.extend(defaults, conf);

    var $tester = $('<span>' + config.testString + config.glyphs + '</span>').css('position', 'absolute').css('top', '-9999px').css('left', '-9999px').css('visibility', 'hidden').css('fontFamily', config.testFont).css('fontSize', '250px');

    $body.append($tester);

    var fallbackFontWidth = $tester.outerWidth();

    $tester.css('fontFamily', config.font + ',' + config.testFont);

    var failure = function failure() {
      $html.addClass("no-" + config.fontClass);
      if (config && config.failure) {
        config.failure();
      }
      config.callback(new Error('FontSpy timeout'));
      $tester.remove();
    };

    var success = function success() {
      config.callback();
      $html.addClass(config.fontClass);
      if (config && config.success) {
        config.success();
      }
      $tester.remove();
    };

    var retry = function retry() {
      setTimeout(checkFont, config.delay);
      config.timeOut = config.timeOut - config.delay;
    };

    var checkFont = function checkFont() {
      var loadedFontWidth = $tester.outerWidth();

      if (fallbackFontWidth !== loadedFontWidth) {
        success();
      } else if (config.timeOut < 0) {
        failure();
      } else {
        retry();
      }
    };

    checkFont();
  };
})(undefined, jQuery, window);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (window, $, undefined) {
    "use strict";

    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false,
        showInput: false,
        allowEmpty: false,
        showButtons: true,
        clickoutFiresChange: true,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: false,
        className: "", // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: "",
        replacerClassName: "",
        showAlpha: false,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: false,
        offset: null
    },
        spectrums = [],
        IE = !!/msie/i.exec(window.navigator.userAgent),
        rgbaSupport = function () {
        function contains(str, substr) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    }(),
        replaceInput = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(''),
        markup = function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", gradientFix, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("");
    }();

    function paletteTemplate(p, color, className, opts) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var current = p[i];
            if (current) {
                var tiny = tinycolor(current);
                var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += tinycolor.equals(color, current) ? " sp-thumb-active" : "";
                var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                var swatchStyle = rgbaSupport ? "background-color:" + tiny.toRgbString() : "filter:" + tiny.toFilter();
                html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
            } else {
                var cls = 'sp-clear-display';
                html.push($('<div />').append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>').attr('title', opts.noColorSelectedText)).html());
            }
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            isDragging = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = [],
            paletteArray = [],
            paletteLookup = {},
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            pickerContainer = container.find(".sp-picker-container"),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            clearButton = container.find(".sp-clear"),
            chooseButton = container.find(".sp-choose"),
            toggleButton = container.find(".sp-palette-toggle"),
            isInput = boundElement.is("input"),
            isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
            shouldReplace = isInput && !flat,
            replacer = shouldReplace ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
            offsetElement = shouldReplace ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || isInput && boundElement.val(),
            colorOnShow = false,
            currentPreferredFormat = opts.preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
            isEmpty = !initialColor,
            allowEmpty = opts.allowEmpty && !isInputTypeColor;

        function applyOptions() {

            if (opts.showPaletteOnly) {
                opts.showPalette = true;
            }

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

            if (opts.palette) {
                palette = opts.palette.slice(0);
                paletteArray = $.isArray(palette[0]) ? palette : [palette];
                paletteLookup = {};
                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }
            }

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-clear-enabled", allowEmpty);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className).addClass(opts.containerClassName);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            }

            if (!allowEmpty) {
                clearButton.hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            } else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            updateSelectionPaletteFromStorage();

            offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if (boundElement.is(":disabled") || opts.disabled === true) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.bind("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) {
                if (e.keyCode == 13) {
                    setFromTextInput();
                }
            });

            cancelButton.text(opts.cancelText);
            cancelButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                revert();
                hide();
            });

            clearButton.attr("title", opts.clearText);
            clearButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                isEmpty = true;
                move();

                if (flat) {
                    //for the flat style, this is a change event
                    updateOriginalInput(true);
                }
            });

            chooseButton.text(opts.chooseText);
            chooseButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (IE && textInput.is(":focus")) {
                    textInput.trigger('change');
                }

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
            toggleButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                opts.showPaletteOnly = !opts.showPaletteOnly;

                // To make sure the Picker area is drawn on the right, next to the
                // Palette area (and not below the palette), first move the Palette
                // to the left to make space for the picker, plus 5px extra.
                // The 'applyOptions' function puts the whole container back into place
                // and takes care of the button-text and the sp-palette-only CSS class.
                if (!opts.showPaletteOnly && !flat) {
                    container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                }
                applyOptions();
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = dragX / alphaWidth;
                isEmpty = false;
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            }, dragStart, dragStop);

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                } else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - currentValue * dragHeight;
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }

                move();
            }, dragStart, dragStop);

            if (!!initialColor) {
                _set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            } else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function paletteElementClick(e) {
                if (e.data && e.data.ignore) {
                    _set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                } else {
                    _set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                    updateOriginalInput(true);
                    if (opts.hideAfterPaletteSelect) {
                        hide();
                    }
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
            initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, paletteElementClick);
        }

        function updateSelectionPaletteFromStorage() {

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function (i, c) {
                            addColorToSelectionPalette(c);
                        });
                    }
                } catch (e) {}

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                } catch (e) {}
            }
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var rgb = tinycolor(color).toRgbString();
                if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                    selectionPalette.push(rgb);
                    while (selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    } catch (e) {}
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            if (opts.showPalette) {
                for (var i = 0; i < selectionPalette.length; i++) {
                    var rgb = tinycolor(selectionPalette[i]).toRgbString();

                    if (!paletteLookup[rgb]) {
                        unique.push(selectionPalette[i]);
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
            });

            updateSelectionPaletteFromStorage();

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            isDragging = true;
            container.addClass(draggingClass);
            shiftMovementDirection = null;
            boundElement.trigger('dragstart.spectrum', [get()]);
        }

        function dragStop() {
            isDragging = false;
            container.removeClass(draggingClass);
            boundElement.trigger('dragstop.spectrum', [get()]);
        }

        function setFromTextInput() {

            var value = textInput.val();

            if ((value === null || value === "") && allowEmpty) {
                _set(null);
                updateOriginalInput(true);
            } else {
                var tiny = tinycolor(value);
                if (tiny.isValid()) {
                    _set(tiny);
                    updateOriginalInput(true);
                } else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }

        function toggle() {
            if (visible) {
                hide();
            } else {
                show();
            }
        }

        function show() {
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [get()]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).bind("keydown.spectrum", onkeydown);
            $(doc).bind("click.spectrum", clickout);
            $(window).bind("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [colorOnShow]);
        }

        function onkeydown(e) {
            // Close on ESC
            if (e.keyCode === 27) {
                hide();
            }
        }

        function clickout(e) {
            // Return on right click.
            if (e.button == 2) {
                return;
            }

            // If a drag event was happening during the mouseup, don't hide
            // on click.
            if (isDragging) {
                return;
            }

            if (clickoutFiresChange) {
                updateOriginalInput(true);
            } else {
                revert();
            }
            hide();
        }

        function hide() {
            // Return if hiding is unnecessary
            if (!visible || flat) {
                return;
            }
            visible = false;

            $(doc).unbind("keydown.spectrum", onkeydown);
            $(doc).unbind("click.spectrum", clickout);
            $(window).unbind("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [get()]);
        }

        function revert() {
            _set(colorOnShow, true);
        }

        function _set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                // Update UI just in case a validation error needs
                // to be cleared.
                updateUI();
                return;
            }

            var newColor, newHsv;
            if (!color && allowEmpty) {
                isEmpty = true;
            } else {
                isEmpty = false;
                newColor = tinycolor(color);
                newHsv = newColor.toHsv();

                currentHue = newHsv.h % 360 / 360;
                currentSaturation = newHsv.s;
                currentValue = newHsv.v;
                currentAlpha = newHsv.a;
            }
            updateUI();

            if (newColor && newColor.isValid() && !ignoreFormatChange) {
                currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
            }
        }

        function get(opts) {
            opts = opts || {};

            if (allowEmpty && isEmpty) {
                return null;
            }

            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 100) / 100
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [get()]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                displayColor = '';

            //reset background info for preview element
            previewElement.removeClass("sp-clear-display");
            previewElement.css('background-color', 'transparent');

            if (!realColor && allowEmpty) {
                // Update the replaced elements background with icon indicating no color selection
                previewElement.addClass("sp-clear-display");
            } else {
                var realHex = realColor.toHexString(),
                    realRgb = realColor.toRgbString();

                // Update the replaced elements background color (with actual selected color)
                if (rgbaSupport || realColor.alpha === 1) {
                    previewElement.css("background-color", realRgb);
                } else {
                    previewElement.css("background-color", "transparent");
                    previewElement.css("filter", realColor.toFilter());
                }

                if (opts.showAlpha) {
                    var rgb = realColor.toRgb();
                    rgb.a = 0;
                    var realAlpha = tinycolor(rgb).toRgbString();
                    var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                    if (IE) {
                        alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                    } else {
                        alphaSliderInner.css("background", "-webkit-" + gradient);
                        alphaSliderInner.css("background", "-moz-" + gradient);
                        alphaSliderInner.css("background", "-ms-" + gradient);
                        // Use current syntax gradient on unprefixed property.
                        alphaSliderInner.css("background", "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                    }
                }

                displayColor = realColor.toString(format);
            }

            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(displayColor);
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            if (allowEmpty && isEmpty) {
                //if selected color is empty, hide the helpers
                alphaSlideHelper.hide();
                slideHelper.hide();
                dragHelper.hide();
            } else {
                //make sure helpers are visible
                alphaSlideHelper.show();
                slideHelper.show();
                dragHelper.show();

                // Where to show the little circle in that displays your current selected color
                var dragX = s * dragWidth;
                var dragY = dragHeight - v * dragHeight;
                dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
                dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
                dragHelper.css({
                    "top": dragY + "px",
                    "left": dragX + "px"
                });

                var alphaX = currentAlpha * alphaWidth;
                alphaSlideHelper.css({
                    "left": alphaX - alphaSlideHelperWidth / 2 + "px"
                });

                // Where to show the bar that displays your current selected hue
                var slideY = currentHue * slideHeight;
                slideHelper.css({
                    "top": slideY - slideHelperHeight + "px"
                });
            }
        }

        function updateOriginalInput(fireCallback) {
            var color = get(),
                displayColor = '',
                hasChanged = !tinycolor.equals(color, colorOnShow);

            if (color) {
                displayColor = color.toString(currentPreferredFormat);
                // Update the selection palette with the current color
                addColorToSelectionPalette(color);
            }

            if (isInput) {
                boundElement.val(displayColor);
            }

            if (fireCallback && hasChanged) {
                callbacks.change(color);
                boundElement.trigger('change', [color]);
            }
        }

        function reflow() {
            if (!visible) {
                return; // Calculations would be useless and wouldn't be reliable anyways
            }
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                if (opts.offset) {
                    container.offset(opts.offset);
                } else {
                    container.offset(getOffset(container, offsetElement));
                }
            }

            updateHelperLocations();

            if (opts.showPalette) {
                drawPalette();
            }

            boundElement.trigger('reflow.spectrum');
        }

        function destroy() {
            boundElement.show();
            offsetElement.unbind("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;

            if (optionName === "preferredFormat") {
                currentPreferredFormat = opts.preferredFormat;
            }
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        function setOffset(coord) {
            opts.offset = coord;
            reflow();
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            offset: setOffset,
            set: function set(c) {
                _set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        offset.top += inputHeight;

        offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);

        offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight - extraY) : extraY);

        return offset;
    }

    /**
    * noop - do nothing
    */
    function noop() {}

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () {};
        onstart = onstart || function () {};
        onstop = onstop || function () {};
        var doc = document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = 'ontouchstart' in window;

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && doc.documentMode < 9 && !e.button) {
                    return stop();
                }

                var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                var pageX = t0 && t0.pageX || e.pageX;
                var pageY = t0 && t0.pageY || e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }

        function start(e) {
            var rightclick = e.which ? e.which == 3 : e.button == 2;

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).bind(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    move(e);

                    prevent(e);
                }
            }
        }

        function stop() {
            if (dragging) {
                $(doc).unbind(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");

                // Wait a tick before notifying observers to allow the click event
                // to fire in Chrome.
                setTimeout(function () {
                    onstop.apply(element, arguments);
                }, 0);
            }
            dragging = false;
        }

        $(element).bind("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var throttler = function throttler() {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }

    function inputTypeColorSupport() {
        return $.fn.spectrum.inputTypeColorSupport();
    }

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {
                    var method = spect[opts];
                    if (!method) {
                        throw new Error("Spectrum: no such method: '" + opts + "'");
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    } else if (opts == "container") {
                        returnValue = spect.container;
                    } else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    } else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    } else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var options = $.extend({}, opts, $(this).data());
            var spect = spectrum(this, options);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
        if (typeof inputTypeColorSupport._cachedResult === "undefined") {
            var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
            inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
        }
        return inputTypeColorSupport._cachedResult;
    };

    $.spectrum = {};
    $.spectrum.localization = {};
    $.spectrum.palettes = {};

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInputs = $("input[type=color]");
        if (colorInputs.length && !inputTypeColorSupport()) {
            colorInputs.spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor v1.1.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function () {

        var trimLeft = /^[\s,#]+/,
            trimRight = /\s+$/,
            tinyCounter = 0,
            math = Math,
            mathRound = math.round,
            mathMin = math.min,
            mathMax = math.max,
            mathRandom = math.random;

        var tinycolor = function tinycolor(color, opts) {

            color = color ? color : '';
            opts = opts || {};

            // If input is already a tinycolor, return itself
            if (color instanceof tinycolor) {
                return color;
            }
            // If we are called as a function, call using new instead
            if (!(this instanceof tinycolor)) {
                return new tinycolor(color, opts);
            }

            var rgb = inputToRGB(color);
            this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
            this._gradientType = opts.gradientType;

            // Don't let the range of [0,255] come back in [0,1].
            // Potentially lose a little bit of precision here, but will fix issues where
            // .5 gets interpreted as half of the total, instead of half of 1
            // If it was supposed to be 128, this was already taken care of by `inputToRgb`
            if (this._r < 1) {
                this._r = mathRound(this._r);
            }
            if (this._g < 1) {
                this._g = mathRound(this._g);
            }
            if (this._b < 1) {
                this._b = mathRound(this._b);
            }

            this._ok = rgb.ok;
            this._tc_id = tinyCounter++;
        };

        tinycolor.prototype = {
            isDark: function isDark() {
                return this.getBrightness() < 128;
            },
            isLight: function isLight() {
                return !this.isDark();
            },
            isValid: function isValid() {
                return this._ok;
            },
            getOriginalInput: function getOriginalInput() {
                return this._originalInput;
            },
            getFormat: function getFormat() {
                return this._format;
            },
            getAlpha: function getAlpha() {
                return this._a;
            },
            getBrightness: function getBrightness() {
                var rgb = this.toRgb();
                return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            },
            setAlpha: function setAlpha(value) {
                this._a = boundAlpha(value);
                this._roundA = mathRound(100 * this._a) / 100;
                return this;
            },
            toHsv: function toHsv() {
                var hsv = rgbToHsv(this._r, this._g, this._b);
                return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
            },
            toHsvString: function toHsvString() {
                var hsv = rgbToHsv(this._r, this._g, this._b);
                var h = mathRound(hsv.h * 360),
                    s = mathRound(hsv.s * 100),
                    v = mathRound(hsv.v * 100);
                return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
            },
            toHsl: function toHsl() {
                var hsl = rgbToHsl(this._r, this._g, this._b);
                return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
            },
            toHslString: function toHslString() {
                var hsl = rgbToHsl(this._r, this._g, this._b);
                var h = mathRound(hsl.h * 360),
                    s = mathRound(hsl.s * 100),
                    l = mathRound(hsl.l * 100);
                return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
            },
            toHex: function toHex(allow3Char) {
                return rgbToHex(this._r, this._g, this._b, allow3Char);
            },
            toHexString: function toHexString(allow3Char) {
                return '#' + this.toHex(allow3Char);
            },
            toHex8: function toHex8() {
                return rgbaToHex(this._r, this._g, this._b, this._a);
            },
            toHex8String: function toHex8String() {
                return '#' + this.toHex8();
            },
            toRgb: function toRgb() {
                return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
            },
            toRgbString: function toRgbString() {
                return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
            },
            toPercentageRgb: function toPercentageRgb() {
                return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
            },
            toPercentageRgbString: function toPercentageRgbString() {
                return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
            },
            toName: function toName() {
                if (this._a === 0) {
                    return "transparent";
                }

                if (this._a < 1) {
                    return false;
                }

                return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
            },
            toFilter: function toFilter(secondColor) {
                var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
                var secondHex8String = hex8String;
                var gradientType = this._gradientType ? "GradientType = 1, " : "";

                if (secondColor) {
                    var s = tinycolor(secondColor);
                    secondHex8String = s.toHex8String();
                }

                return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
            },
            toString: function toString(format) {
                var formatSet = !!format;
                format = format || this._format;

                var formattedString = false;
                var hasAlpha = this._a < 1 && this._a >= 0;
                var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

                if (needsAlphaFormat) {
                    // Special case for "transparent", all other non-alpha formats
                    // will return rgba when there is transparency.
                    if (format === "name" && this._a === 0) {
                        return this.toName();
                    }
                    return this.toRgbString();
                }
                if (format === "rgb") {
                    formattedString = this.toRgbString();
                }
                if (format === "prgb") {
                    formattedString = this.toPercentageRgbString();
                }
                if (format === "hex" || format === "hex6") {
                    formattedString = this.toHexString();
                }
                if (format === "hex3") {
                    formattedString = this.toHexString(true);
                }
                if (format === "hex8") {
                    formattedString = this.toHex8String();
                }
                if (format === "name") {
                    formattedString = this.toName();
                }
                if (format === "hsl") {
                    formattedString = this.toHslString();
                }
                if (format === "hsv") {
                    formattedString = this.toHsvString();
                }

                return formattedString || this.toHexString();
            },

            _applyModification: function _applyModification(fn, args) {
                var color = fn.apply(null, [this].concat([].slice.call(args)));
                this._r = color._r;
                this._g = color._g;
                this._b = color._b;
                this.setAlpha(color._a);
                return this;
            },
            lighten: function lighten() {
                return this._applyModification(_lighten, arguments);
            },
            brighten: function brighten() {
                return this._applyModification(_brighten, arguments);
            },
            darken: function darken() {
                return this._applyModification(_darken, arguments);
            },
            desaturate: function desaturate() {
                return this._applyModification(_desaturate, arguments);
            },
            saturate: function saturate() {
                return this._applyModification(_saturate, arguments);
            },
            greyscale: function greyscale() {
                return this._applyModification(_greyscale, arguments);
            },
            spin: function spin() {
                return this._applyModification(_spin, arguments);
            },

            _applyCombination: function _applyCombination(fn, args) {
                return fn.apply(null, [this].concat([].slice.call(args)));
            },
            analogous: function analogous() {
                return this._applyCombination(_analogous, arguments);
            },
            complement: function complement() {
                return this._applyCombination(_complement, arguments);
            },
            monochromatic: function monochromatic() {
                return this._applyCombination(_monochromatic, arguments);
            },
            splitcomplement: function splitcomplement() {
                return this._applyCombination(_splitcomplement, arguments);
            },
            triad: function triad() {
                return this._applyCombination(_triad, arguments);
            },
            tetrad: function tetrad() {
                return this._applyCombination(_tetrad, arguments);
            }
        };

        // If input is an object, force 1 into "1.0" to handle ratios properly
        // String input requires "1.0" as input, so 1 will be treated as 1
        tinycolor.fromRatio = function (color, opts) {
            if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
                var newColor = {};
                for (var i in color) {
                    if (color.hasOwnProperty(i)) {
                        if (i === "a") {
                            newColor[i] = color[i];
                        } else {
                            newColor[i] = convertToPercentage(color[i]);
                        }
                    }
                }
                color = newColor;
            }

            return tinycolor(color, opts);
        };

        // Given a string or object, convert that input to RGB
        // Possible string inputs:
        //
        //     "red"
        //     "#f00" or "f00"
        //     "#ff0000" or "ff0000"
        //     "#ff000000" or "ff000000"
        //     "rgb 255 0 0" or "rgb (255, 0, 0)"
        //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
        //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
        //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
        //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
        //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
        //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
        //
        function inputToRGB(color) {

            var rgb = { r: 0, g: 0, b: 0 };
            var a = 1;
            var ok = false;
            var format = false;

            if (typeof color == "string") {
                color = stringInputToObject(color);
            }

            if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
                if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                    rgb = rgbToRgb(color.r, color.g, color.b);
                    ok = true;
                    format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                    color.s = convertToPercentage(color.s);
                    color.v = convertToPercentage(color.v);
                    rgb = hsvToRgb(color.h, color.s, color.v);
                    ok = true;
                    format = "hsv";
                } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                    color.s = convertToPercentage(color.s);
                    color.l = convertToPercentage(color.l);
                    rgb = hslToRgb(color.h, color.s, color.l);
                    ok = true;
                    format = "hsl";
                }

                if (color.hasOwnProperty("a")) {
                    a = color.a;
                }
            }

            a = boundAlpha(a);

            return {
                ok: ok,
                format: color.format || format,
                r: mathMin(255, mathMax(rgb.r, 0)),
                g: mathMin(255, mathMax(rgb.g, 0)),
                b: mathMin(255, mathMax(rgb.b, 0)),
                a: a
            };
        }

        // Conversion Functions
        // --------------------

        // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
        // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

        // `rgbToRgb`
        // Handle bounds / percentage checking to conform to CSS color spec
        // <http://www.w3.org/TR/css3-color/>
        // *Assumes:* r, g, b in [0, 255] or [0, 1]
        // *Returns:* { r, g, b } in [0, 255]
        function rgbToRgb(r, g, b) {
            return {
                r: bound01(r, 255) * 255,
                g: bound01(g, 255) * 255,
                b: bound01(b, 255) * 255
            };
        }

        // `rgbToHsl`
        // Converts an RGB color value to HSL.
        // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
        // *Returns:* { h, s, l } in [0,1]
        function rgbToHsl(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b),
                min = mathMin(r, g, b);
            var h,
                s,
                l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);break;
                    case g:
                        h = (b - r) / d + 2;break;
                    case b:
                        h = (r - g) / d + 4;break;
                }

                h /= 6;
            }

            return { h: h, s: s, l: l };
        }

        // `hslToRgb`
        // Converts an HSL color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        function hslToRgb(h, s, l) {
            var r, g, b;

            h = bound01(h, 360);
            s = bound01(s, 100);
            l = bound01(l, 100);

            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHsv`
        // Converts an RGB color value to HSV
        // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
        // *Returns:* { h, s, v } in [0,1]
        function rgbToHsv(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b),
                min = mathMin(r, g, b);
            var h,
                s,
                v = max;

            var d = max - min;
            s = max === 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            } else {
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);break;
                    case g:
                        h = (b - r) / d + 2;break;
                    case b:
                        h = (r - g) / d + 4;break;
                }
                h /= 6;
            }
            return { h: h, s: s, v: v };
        }

        // `hsvToRgb`
        // Converts an HSV color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        function hsvToRgb(h, s, v) {

            h = bound01(h, 360) * 6;
            s = bound01(s, 100);
            v = bound01(v, 100);

            var i = math.floor(h),
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6,
                r = [v, q, p, p, t, v][mod],
                g = [t, v, v, q, p, p][mod],
                b = [p, p, t, v, v, q][mod];

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHex`
        // Converts an RGB color to hex
        // Assumes r, g, and b are contained in the set [0, 255]
        // Returns a 3 or 6 character hex
        function rgbToHex(r, g, b, allow3Char) {

            var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

            // Return a 3 character hex if possible
            if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
            }

            return hex.join("");
        }
        // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b and a are contained in the set [0, 255]
        // Returns an 8 character hex
        function rgbaToHex(r, g, b, a) {

            var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

            return hex.join("");
        }

        // `equals`
        // Can be called with any tinycolor input
        tinycolor.equals = function (color1, color2) {
            if (!color1 || !color2) {
                return false;
            }
            return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
        };
        tinycolor.random = function () {
            return tinycolor.fromRatio({
                r: mathRandom(),
                g: mathRandom(),
                b: mathRandom()
            });
        };

        // Modification Functions
        // ----------------------
        // Thanks to less.js for some of the basics here
        // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

        function _desaturate(color, amount) {
            amount = amount === 0 ? 0 : amount || 10;
            var hsl = tinycolor(color).toHsl();
            hsl.s -= amount / 100;
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        }

        function _saturate(color, amount) {
            amount = amount === 0 ? 0 : amount || 10;
            var hsl = tinycolor(color).toHsl();
            hsl.s += amount / 100;
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        }

        function _greyscale(color) {
            return tinycolor(color).desaturate(100);
        }

        function _lighten(color, amount) {
            amount = amount === 0 ? 0 : amount || 10;
            var hsl = tinycolor(color).toHsl();
            hsl.l += amount / 100;
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        }

        function _brighten(color, amount) {
            amount = amount === 0 ? 0 : amount || 10;
            var rgb = tinycolor(color).toRgb();
            rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
            rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
            rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
            return tinycolor(rgb);
        }

        function _darken(color, amount) {
            amount = amount === 0 ? 0 : amount || 10;
            var hsl = tinycolor(color).toHsl();
            hsl.l -= amount / 100;
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        }

        // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
        // Values outside of this range will be wrapped into this range.
        function _spin(color, amount) {
            var hsl = tinycolor(color).toHsl();
            var hue = (mathRound(hsl.h) + amount) % 360;
            hsl.h = hue < 0 ? 360 + hue : hue;
            return tinycolor(hsl);
        }

        // Combination Functions
        // ---------------------
        // Thanks to jQuery xColor for some of the ideas behind these
        // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

        function _complement(color) {
            var hsl = tinycolor(color).toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return tinycolor(hsl);
        }

        function _triad(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
        }

        function _tetrad(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
        }

        function _splitcomplement(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
        }

        function _analogous(color, results, slices) {
            results = results || 6;
            slices = slices || 30;

            var hsl = tinycolor(color).toHsl();
            var part = 360 / slices;
            var ret = [tinycolor(color)];

            for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
                hsl.h = (hsl.h + part) % 360;
                ret.push(tinycolor(hsl));
            }
            return ret;
        }

        function _monochromatic(color, results) {
            results = results || 6;
            var hsv = tinycolor(color).toHsv();
            var h = hsv.h,
                s = hsv.s,
                v = hsv.v;
            var ret = [];
            var modification = 1 / results;

            while (results--) {
                ret.push(tinycolor({ h: h, s: s, v: v }));
                v = (v + modification) % 1;
            }

            return ret;
        }

        // Utility Functions
        // ---------------------

        tinycolor.mix = function (color1, color2, amount) {
            amount = amount === 0 ? 0 : amount || 50;

            var rgb1 = tinycolor(color1).toRgb();
            var rgb2 = tinycolor(color2).toRgb();

            var p = amount / 100;
            var w = p * 2 - 1;
            var a = rgb2.a - rgb1.a;

            var w1;

            if (w * a == -1) {
                w1 = w;
            } else {
                w1 = (w + a) / (1 + w * a);
            }

            w1 = (w1 + 1) / 2;

            var w2 = 1 - w1;

            var rgba = {
                r: rgb2.r * w1 + rgb1.r * w2,
                g: rgb2.g * w1 + rgb1.g * w2,
                b: rgb2.b * w1 + rgb1.b * w2,
                a: rgb2.a * p + rgb1.a * (1 - p)
            };

            return tinycolor(rgba);
        };

        // Readability Functions
        // ---------------------
        // <http://www.w3.org/TR/AERT#color-contrast>

        // `readability`
        // Analyze the 2 colors and returns an object with the following properties:
        //    `brightness`: difference in brightness between the two colors
        //    `color`: difference in color/hue between the two colors
        tinycolor.readability = function (color1, color2) {
            var c1 = tinycolor(color1);
            var c2 = tinycolor(color2);
            var rgb1 = c1.toRgb();
            var rgb2 = c2.toRgb();
            var brightnessA = c1.getBrightness();
            var brightnessB = c2.getBrightness();
            var colorDiff = Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) + Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) + Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b);

            return {
                brightness: Math.abs(brightnessA - brightnessB),
                color: colorDiff
            };
        };

        // `readable`
        // http://www.w3.org/TR/AERT#color-contrast
        // Ensure that foreground and background color combinations provide sufficient contrast.
        // *Example*
        //    tinycolor.isReadable("#000", "#111") => false
        tinycolor.isReadable = function (color1, color2) {
            var readability = tinycolor.readability(color1, color2);
            return readability.brightness > 125 && readability.color > 500;
        };

        // `mostReadable`
        // Given a base color and a list of possible foreground or background
        // colors for that base, returns the most readable color.
        // *Example*
        //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
        tinycolor.mostReadable = function (baseColor, colorList) {
            var bestColor = null;
            var bestScore = 0;
            var bestIsReadable = false;
            for (var i = 0; i < colorList.length; i++) {

                // We normalize both around the "acceptable" breaking point,
                // but rank brightness constrast higher than hue.

                var readability = tinycolor.readability(baseColor, colorList[i]);
                var readable = readability.brightness > 125 && readability.color > 500;
                var score = 3 * (readability.brightness / 125) + readability.color / 500;

                if (readable && !bestIsReadable || readable && bestIsReadable && score > bestScore || !readable && !bestIsReadable && score > bestScore) {
                    bestIsReadable = readable;
                    bestScore = score;
                    bestColor = tinycolor(colorList[i]);
                }
            }
            return bestColor;
        };

        // Big List of Colors
        // ------------------
        // <http://www.w3.org/TR/css3-color/#svg-color>
        var names = tinycolor.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "663399",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        };

        // Make it easy to access colors via `hexNames[hex]`
        var hexNames = tinycolor.hexNames = flip(names);

        // Utilities
        // ---------

        // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
        function flip(o) {
            var flipped = {};
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    flipped[o[i]] = i;
                }
            }
            return flipped;
        }

        // Return a valid alpha value [0,1] with all invalid values being set to 1
        function boundAlpha(a) {
            a = parseFloat(a);

            if (isNaN(a) || a < 0 || a > 1) {
                a = 1;
            }

            return a;
        }

        // Take input from [0, n] and return it as [0, 1]
        function bound01(n, max) {
            if (isOnePointZero(n)) {
                n = "100%";
            }

            var processPercent = isPercentage(n);
            n = mathMin(max, mathMax(0, parseFloat(n)));

            // Automatically convert percentage into number
            if (processPercent) {
                n = parseInt(n * max, 10) / 100;
            }

            // Handle floating point rounding errors
            if (math.abs(n - max) < 0.000001) {
                return 1;
            }

            // Convert into [0, 1] range if it isn't already
            return n % max / parseFloat(max);
        }

        // Force a number between 0 and 1
        function clamp01(val) {
            return mathMin(1, mathMax(0, val));
        }

        // Parse a base-16 hex value into a base-10 integer
        function parseIntFromHex(val) {
            return parseInt(val, 16);
        }

        // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
        // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
        function isOnePointZero(n) {
            return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
        }

        // Check to see if string passed in is a percentage
        function isPercentage(n) {
            return typeof n === "string" && n.indexOf('%') != -1;
        }

        // Force a hex value to have 2 characters
        function pad2(c) {
            return c.length == 1 ? '0' + c : '' + c;
        }

        // Replace a decimal with it's percentage value
        function convertToPercentage(n) {
            if (n <= 1) {
                n = n * 100 + "%";
            }

            return n;
        }

        // Converts a decimal to a hex value
        function convertDecimalToHex(d) {
            return Math.round(parseFloat(d) * 255).toString(16);
        }
        // Converts a hex value to a decimal
        function convertHexToDecimal(h) {
            return parseIntFromHex(h) / 255;
        }

        var matchers = function () {

            // <http://www.w3.org/TR/css3-values/#integers>
            var CSS_INTEGER = "[-\\+]?\\d+%?";

            // <http://www.w3.org/TR/css3-values/#number-value>
            var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

            // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
            var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

            // Actual matching.
            // Parentheses and commas are optional, but not required.
            // Whitespace can take the place of commas or opening paren
            var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
            var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

            return {
                rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            };
        }();

        // `stringInputToObject`
        // Permissive string parsing.  Take in a number of formats, and output an object
        // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
        function stringInputToObject(color) {

            color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
            var named = false;
            if (names[color]) {
                color = names[color];
                named = true;
            } else if (color == 'transparent') {
                return { r: 0, g: 0, b: 0, a: 0, format: "name" };
            }

            // Try to match string input using regular expressions.
            // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
            // Just return an object and let the conversion functions handle that.
            // This way the result will be the same whether the tinycolor is initialized with string or object.
            var match;
            if (match = matchers.rgb.exec(color)) {
                return { r: match[1], g: match[2], b: match[3] };
            }
            if (match = matchers.rgba.exec(color)) {
                return { r: match[1], g: match[2], b: match[3], a: match[4] };
            }
            if (match = matchers.hsl.exec(color)) {
                return { h: match[1], s: match[2], l: match[3] };
            }
            if (match = matchers.hsla.exec(color)) {
                return { h: match[1], s: match[2], l: match[3], a: match[4] };
            }
            if (match = matchers.hsv.exec(color)) {
                return { h: match[1], s: match[2], v: match[3] };
            }
            if (match = matchers.hsva.exec(color)) {
                return { h: match[1], s: match[2], v: match[3], a: match[4] };
            }
            if (match = matchers.hex8.exec(color)) {
                return {
                    a: convertHexToDecimal(match[1]),
                    r: parseIntFromHex(match[2]),
                    g: parseIntFromHex(match[3]),
                    b: parseIntFromHex(match[4]),
                    format: named ? "name" : "hex8"
                };
            }
            if (match = matchers.hex6.exec(color)) {
                return {
                    r: parseIntFromHex(match[1]),
                    g: parseIntFromHex(match[2]),
                    b: parseIntFromHex(match[3]),
                    format: named ? "name" : "hex"
                };
            }
            if (match = matchers.hex3.exec(color)) {
                return {
                    r: parseIntFromHex(match[1] + '' + match[1]),
                    g: parseIntFromHex(match[2] + '' + match[2]),
                    b: parseIntFromHex(match[3] + '' + match[3]),
                    format: named ? "name" : "hex"
                };
            }

            return false;
        }

        window.tinycolor = tinycolor;
    })();

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });
})(window, jQuery);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function (Math, window) {

    var trimLeft = /^\s+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        mathRound = Math.round,
        mathMin = Math.min,
        mathMax = Math.max,
        mathRandom = Math.random;

    window.tinycolor = function (color, opts) {

        color = color ? color : '';
        opts = opts || {};

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
            return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) {
            this._r = mathRound(this._r);
        }
        if (this._g < 1) {
            this._g = mathRound(this._g);
        }
        if (this._b < 1) {
            this._b = mathRound(this._b);
        }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
        isDark: function isDark() {
            return this.getBrightness() < 128;
        },
        isLight: function isLight() {
            return !this.isDark();
        },
        isValid: function isValid() {
            return this._ok;
        },
        getOriginalInput: function getOriginalInput() {
            return this._originalInput;
        },
        getFormat: function getFormat() {
            return this._format;
        },
        getAlpha: function getAlpha() {
            return this._a;
        },
        getBrightness: function getBrightness() {
            //http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function getLuminance() {
            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;

            if (RsRGB <= 0.03928) {
                R = RsRGB / 12.92;
            } else {
                R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            }
            if (GsRGB <= 0.03928) {
                G = GsRGB / 12.92;
            } else {
                G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            }
            if (BsRGB <= 0.03928) {
                B = BsRGB / 12.92;
            } else {
                B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            }
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function setAlpha(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100 * this._a) / 100;
            return this;
        },
        toHsv: function toHsv() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function toHsvString() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360),
                s = mathRound(hsv.s * 100),
                v = mathRound(hsv.v * 100);
            return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function toHsl() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function toHslString() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360),
                s = mathRound(hsl.s * 100),
                l = mathRound(hsl.l * 100);
            return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function toHex(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function toHexString(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function toHex8(allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function toHex8String(allow4Char) {
            return '#' + this.toHex8(allow4Char);
        },
        toRgb: function toRgb() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function toRgbString() {
            return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function toPercentageRgb() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function toPercentageRgbString() {
            return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function toName() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function toFilter(secondColor) {
            var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
            }

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function toString(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex4") {
                formattedString = this.toHex8String(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },
        clone: function clone() {
            return tinycolor(this.toString());
        },

        _applyModification: function _applyModification(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function lighten() {
            return this._applyModification(_lighten, arguments);
        },
        brighten: function brighten() {
            return this._applyModification(_brighten, arguments);
        },
        darken: function darken() {
            return this._applyModification(_darken, arguments);
        },
        desaturate: function desaturate() {
            return this._applyModification(_desaturate, arguments);
        },
        saturate: function saturate() {
            return this._applyModification(_saturate, arguments);
        },
        greyscale: function greyscale() {
            return this._applyModification(_greyscale, arguments);
        },
        spin: function spin() {
            return this._applyModification(_spin, arguments);
        },

        _applyCombination: function _applyCombination(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function analogous() {
            return this._applyCombination(_analogous, arguments);
        },
        complement: function complement() {
            return this._applyCombination(_complement, arguments);
        },
        monochromatic: function monochromatic() {
            return this._applyCombination(_monochromatic, arguments);
        },
        splitcomplement: function splitcomplement() {
            return this._applyCombination(_splitcomplement, arguments);
        },
        triad: function triad() {
            return this._applyCombination(_triad, arguments);
        },
        tetrad: function tetrad() {
            return this._applyCombination(_tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function (color, opts) {
        if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    } else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if ((typeof color === "undefined" ? "undefined" : _typeof(color)) == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s = convertToPercentage(color.s);
                v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s, v);
                ok = true;
                format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s = convertToPercentage(color.s);
                l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s, l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }

    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b) {
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:
                    h = (b - r) / d + 2;break;
                case b:
                    h = (r - g) / d + 4;break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:
                    h = (b - r) / d + 2;break;
                case b:
                    h = (r - g) / d + 4;break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b are contained in the set [0, 255] and
    // a in [0, 1]. Returns a 4 or 8 character rgba hex
    function rgbaToHex(r, g, b, a, allow4Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];

        // Return a 4 character hex if possible
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join("");
    }

    // `rgbaToArgbHex`
    // Converts an RGBA color to an ARGB Hex8 string
    // Rarely used, but required for "toFilter()"
    function rgbaToArgbHex(r, g, b, a) {

        var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        return hex.join("");
    }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
            return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };

    tinycolor.random = function () {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };

    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function _desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function _saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function _greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function _lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function _brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
    }

    function _darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function _spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function _complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function _triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
    }

    function _tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
    }

    function _splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
    }

    function _analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function _monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h,
            s = hsv.s,
            v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function (color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;

        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a
        };

        return tinycolor(rgba);
    };

    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

    // `contrast`
    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
    tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };

    // `isReadable`
    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
    // The third argument is an optional Object.
    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
    tinycolor.isReadable = function (color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;

        out = false;

        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
            case "AAsmall":
            case "AAAlarge":
                out = readability >= 4.5;
                break;
            case "AAlarge":
                out = readability >= 3;
                break;
            case "AAAsmall":
                out = readability >= 7;
                break;
        }
        return out;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // Optionally returns Black or White if the most readable color is unreadable.
    // *Example*
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
    tinycolor.mostReadable = function (baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;

        for (var i = 0; i < colorList.length; i++) {
            readability = tinycolor.readability(baseColor, colorList[i]);
            if (readability > bestScore) {
                bestScore = readability;
                bestColor = tinycolor(colorList[i]);
            }
        }

        if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
            return bestColor;
        } else {
            args.includeFallbackColors = false;
            return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
    };

    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);

    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = {};
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) {
            n = "100%";
        }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return n % max / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = n * 100 + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
    }

    var matchers = function () {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    }();

    // `isValidCSSUnit`
    // Take in a single string / number and check to see if it looks like a CSS unit
    // (see `matchers` above for definition).
    function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
    }

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        } else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if (match = matchers.rgb.exec(color)) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if (match = matchers.rgba.exec(color)) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if (match = matchers.hsl.exec(color)) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if (match = matchers.hsla.exec(color)) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if (match = matchers.hsv.exec(color)) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if (match = matchers.hsva.exec(color)) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if (match = matchers.hex8.exec(color)) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                a: convertHexToDecimal(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if (match = matchers.hex6.exec(color)) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if (match = matchers.hex4.exec(color)) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                a: convertHexToDecimal(match[4] + '' + match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if (match = matchers.hex3.exec(color)) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || { "level": "AA", "size": "small" };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
            level = "AA";
        }
        if (size !== "small" && size !== "large") {
            size = "small";
        }
        return { "level": level, "size": size };
    }

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = tinycolor;
    }
    // AMD/requirejs: Define the module
    else if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return tinycolor;
            }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
        // Browser: Expose to window
        else {
                window.tinycolor = tinycolor;
            }
})(Math, window);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {
    ParallaxScroll.init();
});

var ParallaxScroll = {
    /* PUBLIC VARIABLES */
    showLogs: false,
    round: 1000,

    /* PUBLIC FUNCTIONS */
    init: function init() {
        this._log("init");
        if (this._inited) {
            this._log("Already Inited");
            this._inited = true;
            return;
        }
        this._requestAnimationFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();
        this._onScroll(true);
    },

    /* PRIVATE VARIABLES */
    _inited: false,
    _properties: ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'],
    _requestAnimationFrame: null,

    /* PRIVATE FUNCTIONS */
    _log: function _log(message) {
        if (this.showLogs) console.log("Parallax Scroll / " + message);
    },
    _onScroll: function _onScroll(noSmooth) {
        var scroll = $(document).scrollTop();
        var windowHeight = $(window).height();
        this._log("onScroll " + scroll);
        $("[data-parallax]").each($.proxy(function (index, el) {
            var $el = $(el);
            var properties = [];
            var applyProperties = false;
            var style = $el.data("style");
            if (style == undefined) {
                style = $el.attr("style") || "";
                $el.data("style", style);
            }
            var datas = [$el.data("parallax")];
            var iData;
            for (iData = 2;; iData++) {
                if ($el.data("parallax" + iData)) {
                    datas.push($el.data("parallax-" + iData));
                } else {
                    break;
                }
            }
            var datasLength = datas.length;
            for (iData = 0; iData < datasLength; iData++) {
                var data = datas[iData];
                var scrollFrom = data["from-scroll"];
                if (scrollFrom == undefined) scrollFrom = Math.max(0, $(el).offset().top - windowHeight);
                scrollFrom = scrollFrom | 0;
                var scrollDistance = data["distance"];
                var scrollTo = data["to-scroll"];
                if (scrollDistance == undefined && scrollTo == undefined) scrollDistance = windowHeight;
                scrollDistance = Math.max(scrollDistance | 0, 1);
                var easing = data["easing"];
                var easingReturn = data["easing-return"];
                if (easing == undefined || !$.easing || !$.easing[easing]) easing = null;
                if (easingReturn == undefined || !$.easing || !$.easing[easingReturn]) easingReturn = easing;
                if (easing) {
                    var totalTime = data["duration"];
                    if (totalTime == undefined) totalTime = scrollDistance;
                    totalTime = Math.max(totalTime | 0, 1);
                    var totalTimeReturn = data["duration-return"];
                    if (totalTimeReturn == undefined) totalTimeReturn = totalTime;
                    scrollDistance = 1;
                    var currentTime = $el.data("current-time");
                    if (currentTime == undefined) currentTime = 0;
                }
                if (scrollTo == undefined) scrollTo = scrollFrom + scrollDistance;
                scrollTo = scrollTo | 0;
                var smoothness = data["smoothness"];
                if (smoothness == undefined) smoothness = 30;
                smoothness = smoothness | 0;
                if (noSmooth || smoothness == 0) smoothness = 1;
                smoothness = smoothness | 0;
                var scrollCurrent = scroll;
                scrollCurrent = Math.max(scrollCurrent, scrollFrom);
                scrollCurrent = Math.min(scrollCurrent, scrollTo);
                if (easing) {
                    if ($el.data("sens") == undefined) $el.data("sens", "back");
                    if (scrollCurrent > scrollFrom) {
                        if ($el.data("sens") == "back") {
                            currentTime = 1;
                            $el.data("sens", "go");
                        } else {
                            currentTime++;
                        }
                    }
                    if (scrollCurrent < scrollTo) {
                        if ($el.data("sens") == "go") {
                            currentTime = 1;
                            $el.data("sens", "back");
                        } else {
                            currentTime++;
                        }
                    }
                    if (noSmooth) currentTime = totalTime;
                    $el.data("current-time", currentTime);
                }
                this._properties.map($.proxy(function (prop) {
                    var defaultProp = 0;
                    var to = data[prop];
                    if (to == undefined) return;
                    if (prop == "scale" || prop == "scaleX" || prop == "scaleY" || prop == "scaleZ") {
                        defaultProp = 1;
                    } else {
                        to = to | 0;
                    }
                    var prev = $el.data("_" + prop);
                    if (prev == undefined) prev = defaultProp;
                    var next = (to - defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom)) + defaultProp;
                    var val = prev + (next - prev) / smoothness;
                    if (easing && currentTime > 0 && currentTime <= totalTime) {
                        var from = defaultProp;
                        if ($el.data("sens") == "back") {
                            from = to;
                            to = -to;
                            easing = easingReturn;
                            totalTime = totalTimeReturn;
                        }
                        val = $.easing[easing](null, currentTime, from, to, totalTime);
                    }
                    val = Math.ceil(val * this.round) / this.round;
                    if (val == prev && next == to) val = to;
                    if (!properties[prop]) properties[prop] = 0;
                    properties[prop] += val;
                    if (prev != properties[prop]) {
                        $el.data("_" + prop, properties[prop]);
                        applyProperties = true;
                    }
                }, this));
            }
            if (applyProperties) {
                if (properties["z"] != undefined) {
                    var perspective = data["perspective"];
                    if (perspective == undefined) perspective = 800;
                    var $parent = $el.parent();
                    if (!$parent.data("style")) $parent.data("style", $parent.attr("style") || "");
                    $parent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; " + $parent.data("style"));
                }
                if (properties["scaleX"] == undefined) properties["scaleX"] = 1;
                if (properties["scaleY"] == undefined) properties["scaleY"] = 1;
                if (properties["scaleZ"] == undefined) properties["scaleZ"] = 1;
                if (properties["scale"] != undefined) {
                    properties["scaleX"] *= properties["scale"];
                    properties["scaleY"] *= properties["scale"];
                    properties["scaleZ"] *= properties["scale"];
                }
                var translate3d = "translate3d(" + (properties["x"] ? properties["x"] : 0) + "px, " + (properties["y"] ? properties["y"] : 0) + "px, " + (properties["z"] ? properties["z"] : 0) + "px)";
                var rotate3d = "rotateX(" + (properties["rotateX"] ? properties["rotateX"] : 0) + "deg) rotateY(" + (properties["rotateY"] ? properties["rotateY"] : 0) + "deg) rotateZ(" + (properties["rotateZ"] ? properties["rotateZ"] : 0) + "deg)";
                var scale3d = "scaleX(" + properties["scaleX"] + ") scaleY(" + properties["scaleY"] + ") scaleZ(" + properties["scaleZ"] + ")";
                var cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
                this._log(cssTransform);
                $el.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style);
            }
        }, this));
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame($.proxy(this._onScroll, this, false));
        } else {
            this._requestAnimationFrame($.proxy(this._onScroll, this, false));
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*****************************
 *****************************
 THIS IS A MODIFIED VERSION:
 https://github.com/VincentGarreau/particles.js/issues/123#issuecomment-293548679


 Don't replace with standard library
 ***********************************/

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function pJS(tag_id, params) {

  var canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      },
      mouse: {}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors: {}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if (params) {
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };

  pJS.fn.retinaInit = function () {

    if (pJS.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio;
      pJS.tmp.retina = true;
    } else {
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;
  };

  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function () {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function () {

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if (pJS && pJS.interactivity.events.resize) {

      window.addEventListener('resize', function () {

        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if (pJS.tmp.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas on anim disabled */
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesEmpty();
          pJS.fn.particlesCreate();
          pJS.fn.particlesDraw();
          pJS.fn.vendors.densityAutoParticles();
        }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();
      });
    }
  };

  pJS.fn.canvasPaint = function () {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function () {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function (color, opacity, position) {

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if (pJS.particles.size.anim.enable) {
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if (!pJS.particles.size.anim.sync) {
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;else if (this.y < this.radius * 2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if (pJS.particles.move.bounce) {
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if (_typeof(color.value) == 'object') {

      if (color.value instanceof Array) {
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      } else {
        if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          };
        }
        if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          };
        }
      }
    } else if (color.value == 'random') {
      this.color.rgb = {
        r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        b: Math.floor(Math.random() * (255 - 0 + 1)) + 0
      };
    } else if (typeof color.value == 'string') {
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if (pJS.particles.opacity.anim.enable) {
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if (!pJS.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {};
    switch (pJS.particles.move.direction) {
      case 'top':
        velbase = { x: 0, y: -1 };
        break;
      case 'top-right':
        velbase = { x: 0.5, y: -0.5 };
        break;
      case 'right':
        velbase = { x: 1, y: -0 };
        break;
      case 'bottom-right':
        velbase = { x: 0.5, y: 0.5 };
        break;
      case 'bottom':
        velbase = { x: 0, y: 1 };
        break;
      case 'bottom-left':
        velbase = { x: -0.5, y: 1 };
        break;
      case 'left':
        velbase = { x: -1, y: 0 };
        break;
      case 'top-left':
        velbase = { x: -0.5, y: -0.5 };
        break;
      default:
        velbase = { x: 0, y: 0 };
        break;
    }

    if (pJS.particles.move.straight) {
      this.vx = velbase.x;
      this.vy = velbase.y;
      if (pJS.particles.move.random) {
        this.vx = this.vx * Math.random();
        this.vy = this.vy * Math.random();
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5;
      this.vy = velbase.y + Math.random() - 0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if ((typeof shape_type === 'undefined' ? 'undefined' : _typeof(shape_type)) == 'object') {
      if (shape_type instanceof Array) {
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    } else {
      this.shape = shape_type;
    }

    if (this.shape == 'image') {
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      };
      if (!this.img.ratio) this.img.ratio = 1;
      if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined) {
        pJS.fn.vendors.createSvgImg(this);
        if (pJS.tmp.pushing) {
          this.img.loaded = false;
        }
      }
    }
  };

  pJS.fn.particle.prototype.draw = function () {

    var p = this;

    if (p.radius_bubble != undefined) {
      var radius = p.radius_bubble;
    } else {
      var radius = p.radius;
    }

    if (p.opacity_bubble != undefined) {
      var opacity = p.opacity_bubble;
    } else {
      var opacity = p.opacity;
    }

    if (p.color.rgb) {
      var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + opacity + ')';
    } else {
      var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + opacity + ')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch (p.shape) {

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
        break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
        break;

      case 'polygon':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius / (pJS.particles.shape.polygon.nb_sides / 3.5), // startX
        p.y - radius / (2.66 / 3.5), // startY
        radius * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
        pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
        1 // sideCountDenominator
        );
        break;

      case 'star':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius * 2 / (pJS.particles.shape.polygon.nb_sides / 4), // startX
        p.y - radius / (2 * 2.66 / 3.5), // startY
        radius * 2 * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
        pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
        2 // sideCountDenominator
        );
        break;

      case 'image':
        var draw = function draw() {
          pJS.canvas.ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / p.img.ratio);
        };

        if (pJS.tmp.img_type == 'svg') {
          var img_obj = p.img.obj;
        } else {
          var img_obj = pJS.tmp.img_obj;
        }

        if (img_obj) {
          draw();
        }

        break;

    }

    pJS.canvas.ctx.closePath();

    if (pJS.particles.shape.stroke.width > 0) {
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }

    pJS.canvas.ctx.fill();
  };

  pJS.fn.particlesCreate = function () {
    for (var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function () {

    for (var i = 0; i < pJS.particles.array.length; i++) {

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if (pJS.particles.move.enable) {
        var ms = pJS.particles.move.speed / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if (pJS.particles.opacity.anim.enable) {
        if (p.opacity_status == true) {
          if (p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        } else {
          if (p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if (p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if (pJS.particles.size.anim.enable) {
        if (p.size_status == true) {
          if (p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        } else {
          if (p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if (p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if (pJS.particles.move.out_mode == 'bounce') {
        var new_pos = {
          x_left: p.radius,
          x_right: pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        };
      } else {
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        };
      }

      if (p.x - p.radius > pJS.canvas.w) {
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      } else if (p.x + p.radius < 0) {
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if (p.y - p.radius > pJS.canvas.h) {
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      } else if (p.y + p.radius < 0) {
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch (pJS.particles.move.out_mode) {
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (p.y - p.radius < 0) p.vy = -p.vy;
          break;
      }

      /* events */
      if (isInArray('grab', pJS.interactivity.events.onhover.mode)) {
        pJS.fn.modes.grabParticle(p);
      }

      if (isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.bubbleParticle(p);
      }

      if (isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if (pJS.particles.line_linked.enable || pJS.particles.move.attract.enable) {
        for (var j = i + 1; j < pJS.particles.array.length; j++) {
          var p2 = pJS.particles.array[j];

          /* link particles */
          if (pJS.particles.line_linked.enable) {
            pJS.fn.interact.linkParticles(p, p2);
          }

          /* attract particles */
          if (pJS.particles.move.attract.enable) {
            pJS.fn.interact.attractParticles(p, p2);
          }

          /* bounce particles */
          if (pJS.particles.move.bounce) {
            pJS.fn.interact.bounceParticles(p, p2);
          }
        }
      }
    }
  };

  pJS.fn.particlesDraw = function () {

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p = pJS.particles.array[i];
      p.draw();
    }
  };

  pJS.fn.particlesEmpty = function () {
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function () {

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();

    /* restart */
    pJS.fn.vendors.start();
  };

  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function (p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= pJS.particles.line_linked.distance) {

      var opacity_line = pJS.particles.line_linked.opacity - dist / (1 / pJS.particles.line_linked.opacity) / pJS.particles.line_linked.distance;

      if (opacity_line > 0) {

        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();
      }
    }
  };

  pJS.fn.interact.attractParticles = function (p1, p2) {

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= pJS.particles.line_linked.distance) {

      var ax = dx / (pJS.particles.move.attract.rotateX * 1000),
          ay = dy / (pJS.particles.move.attract.rotateY * 1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;
    }
  };

  pJS.fn.interact.bounceParticles = function (p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy),
        dist_p = p1.radius + p2.radius;

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }
  };

  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function (nb, pos) {

    pJS.tmp.pushing = true;

    for (var i = 0; i < nb; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value, {
        'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
        'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
      }));
      if (i == nb - 1) {
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }
  };

  pJS.fn.modes.removeParticles = function (nb) {

    pJS.particles.array.splice(0, nb);
    if (!pJS.particles.move.enable) {
      pJS.fn.particlesDraw();
    }
  };

  pJS.fn.modes.bubbleParticle = function (p) {

    /* on hover event */
    if (pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)) {
      var init = function init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      };

      /* mousemove - check ratio */


      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {

        if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {

          /* size */
          if (pJS.interactivity.modes.bubble.size != pJS.particles.size.value) {

            if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
              var size = p.radius + pJS.interactivity.modes.bubble.size * ratio;
              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                  size = p.radius - dif * ratio;
              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }
          }

          /* opacity */
          if (pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value) {

            if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
              var opacity = pJS.interactivity.modes.bubble.opacity * ratio;
              if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            } else {
              var opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio;
              if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity;
              }
            }
          }
        }
      } else {
        init();
      }

      /* mouseleave */
      if (pJS.interactivity.status == 'mouseleave') {
        init();
      }
    }

    /* on click event */
    else if (pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
        var process = function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {

          if (bubble_param != particles_param) {

            if (!pJS.tmp.bubble_duration_end) {
              if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
                if (p_obj_bubble != undefined) var obj = p_obj_bubble;else var obj = p_obj;
                if (obj != bubble_param) {
                  var value = p_obj - time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration;
                  if (id == 'size') p.radius_bubble = value;
                  if (id == 'opacity') p.opacity_bubble = value;
                }
              } else {
                if (id == 'size') p.radius_bubble = undefined;
                if (id == 'opacity') p.opacity_bubble = undefined;
              }
            } else {
              if (p_obj_bubble != undefined) {
                var value_tmp = p_obj - time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration,
                    dif = bubble_param - value_tmp;
                value = bubble_param + dif;
                if (id == 'size') p.radius_bubble = value;
                if (id == 'opacity') p.opacity_bubble = value;
              }
            }
          }
        };

        if (pJS.tmp.bubble_clicking) {
          var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
              dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
              dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
              time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

          if (time_spent > pJS.interactivity.modes.bubble.duration) {
            pJS.tmp.bubble_duration_end = true;
          }

          if (time_spent > pJS.interactivity.modes.bubble.duration * 2) {
            pJS.tmp.bubble_clicking = false;
            pJS.tmp.bubble_duration_end = false;
          }
        }

        if (pJS.tmp.bubble_clicking) {
          /* size */
          process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
          /* opacity */
          process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
        }
      }
  };

  pJS.fn.modes.repulseParticle = function (p) {

    if (pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse },
          repulseRadius = pJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp(1 / repulseRadius * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);

      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      };

      if (pJS.particles.move.out_mode == 'bounce') {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      } else {
        p.x = pos.x;
        p.y = pos.y;
      }
    } else if (pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if (!pJS.tmp.repulse_finish) {
        pJS.tmp.repulse_count++;
        if (pJS.tmp.repulse_count == pJS.particles.array.length) {
          pJS.tmp.repulse_finish = true;
        }
      }

      if (pJS.tmp.repulse_clicking) {
        var process = function process() {

          var f = Math.atan2(dy, dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if (pJS.particles.move.out_mode == 'bounce') {
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            };
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }
        };

        // default


        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance / 6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx * dx + dy * dy;

        var force = -repulseRadius / d * 1;

        if (d <= repulseRadius) {
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }

      } else {

        if (pJS.tmp.repulse_clicking == false) {

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        }
      }
    }
  };

  pJS.fn.modes.grabParticle = function (p) {

    if (pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (dist_mouse <= pJS.interactivity.modes.grab.distance) {

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - dist_mouse / (1 / pJS.interactivity.modes.grab.line_linked.opacity) / pJS.interactivity.modes.grab.distance;

        if (opacity_line > 0) {

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();
        }
      }
    }
  };

  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function () {

    /* events target element */
    if (pJS.interactivity.detect_on == 'window') {
      pJS.interactivity.el = window;
    } else {
      pJS.interactivity.el = pJS.canvas.el;
    }

    /* detect mouse pos - on hover / click event */
    if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function (e) {

        if (pJS.interactivity.el == window) {
          var pos_x = e.clientX,
              pos_y = e.clientY;
        } else {
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if (pJS.tmp.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function (e) {

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';
      });
    }

    /* on click event */
    if (pJS.interactivity.events.onclick.enable) {

      pJS.interactivity.el.addEventListener('click', function () {

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if (pJS.interactivity.events.onclick.enable) {

          switch (pJS.interactivity.events.onclick.mode) {

            case 'push':
              if (pJS.particles.move.enable) {
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              } else {
                if (pJS.interactivity.modes.push.particles_nb == 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                } else if (pJS.interactivity.modes.push.particles_nb > 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
              break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
              break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
              break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function () {
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration * 1000);
              break;

          }
        }
      });
    }
  };

  pJS.fn.vendors.densityAutoParticles = function () {

    if (pJS.particles.number.density.enable) {

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if (pJS.tmp.retina) {
        area = area / (pJS.canvas.pxratio * 2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if (missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));else pJS.fn.modes.removeParticles(missing_particles);
    }
  };

  pJS.fn.vendors.checkOverlap = function (p1, position) {
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };

  pJS.fn.vendors.createSvgImg = function (p) {

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
      if (p.color.rgb) {
        var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
      } else {
        var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
      }
      return color_value;
    });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function () {
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;
  };

  pJS.fn.vendors.destroypJS = function () {
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };

  pJS.fn.vendors.drawShape = function (c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();
  };

  pJS.fn.vendors.exportImg = function () {
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };

  pJS.fn.vendors.loadImg = function (type) {

    pJS.tmp.img_error = undefined;

    if (pJS.particles.shape.image.src != '') {

      if (type == 'svg') {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            } else {
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        };
        xhr.send();
      } else {

        var img = new Image();
        img.addEventListener('load', function () {
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;
      }
    } else {
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }
  };

  pJS.fn.vendors.draw = function () {

    if (pJS.particles.shape.type == 'image') {

      if (pJS.tmp.img_type == 'svg') {

        if (pJS.tmp.count_svg >= pJS.particles.number.value) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          //console.log('still loading...');
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }
      } else {

        if (pJS.tmp.img_obj != undefined) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }
      }
    } else {
      pJS.fn.particlesDraw();
      if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }
  };

  pJS.fn.vendors.checkBeforeDraw = function () {

    // if shape is image
    if (pJS.particles.shape.type == 'image') {

      if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined) {
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      } else {
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if (!pJS.tmp.img_error) {
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
      }
    } else {
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }
  };

  pJS.fn.vendors.init = function () {

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);
  };

  pJS.fn.vendors.start = function () {

    if (isInArray('image', pJS.particles.shape.type)) {
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    } else {
      pJS.fn.vendors.checkBeforeDraw();
    }
  };

  /* ---------- pJS - start ------------ */

  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function deepExtendFunction(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      deepExtendFunction(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
}();

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function (tag_id, params) {

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if (typeof tag_id != 'string') {
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    pJSDom.push(new pJS(tag_id, params));
  }
};

window.particlesJS.load = function (tag_id, path_config_json, callback) {

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if (callback) callback();
      } else {
        console.log('Error pJS - XMLHttpRequest status: ' + xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.4.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: October 16, 2016
 */
(function () {
    'use strict';

    var $;
    /*===========================
    Swiper
    ===========================*/
    var Swiper = function Swiper(container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flip: {
                slideShadows: true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',

            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */

        };
        var initialVirtualTranslate = params && params.virtualTranslate;

        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (_typeof(params[param]) === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || typeof Dom7 !== 'undefined' && params[param] instanceof Dom7 || typeof jQuery !== 'undefined' && params[param] instanceof jQuery)) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            } else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (_typeof(params[def]) === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }

        // Swiper
        var s = this;

        // Params
        s.params = params;
        s.originalParams = originalParams;

        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            } else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;

        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [],
                point;
            for (point in s.params.breakpoints) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
                for (var param in breakPointsParams) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if (needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }

        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }

        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);

        s.classNames.push(s.params.containerModifierClass + s.params.direction);

        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            } else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            s.params.setWrapperSize = false;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }

        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }

        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);

        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }

            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            } else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }

        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;

        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }

        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }

        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }

        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }

        // Add classes
        s.container.addClass(s.classNames.join(' '));

        // Translate
        s.translate = 0;

        // Progress
        s.progress = 0;

        // Velocity
        s.velocity = 0;

        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };

        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function (moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing' : 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;

        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady() {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
            } else {
                //image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src'), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset'), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };

        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                } else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    } else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        } else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            } else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    } else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return -s.snapGrid[0];
        };
        s.maxTranslate = function () {
            return -s.snapGrid[s.snapGrid.length - 1];
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;

            // Find slides currently in view
            if (s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if (index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }

            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }

            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            } else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            } else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }

            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);

            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };

        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];

            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }

            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({ marginLeft: '', marginTop: '' });else s.slides.css({ marginRight: '', marginBottom: '' });

            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                } else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }

            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide.css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            'order': newSlideOrderIndex
                        });
                    } else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide.css('margin-' + (s.isHorizontal() ? 'top' : 'left'), row !== 0 && s.params.spaceBetween && s.params.spaceBetween + 'px').attr('data-swiper-column', column).attr('data-swiper-row', row);
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                } else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);

                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    } else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);

                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                } else {
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }

                s.virtualSize += slideSize + spaceBetween;

                prevSlideSize = slideSize;

                index++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;

            if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
            }

            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }

            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];

            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({ marginLeft: spaceBetween + 'px' });else s.slides.css({ marginRight: spaceBetween + 'px' });
                } else s.slides.css({ marginBottom: spaceBetween + 'px' });
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };

        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();

            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;

            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            } else {
                s.progress = (translate - s.minTranslate()) / translatesDiff;
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);

            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                } else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
            // if (- translate >= s.slidesGrid[i]) {
            // newActiveIndex = i;
            // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function () {
            s.realIndex = s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex;
        };

        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }

            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                } else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    } else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    } else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }

            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    } else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    } else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };

        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        } else {
                            paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span>' + ' / ' + '<span class="' + s.params.paginationTotalClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                } else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    } else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            } else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };

        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }

            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;

            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();

                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            } else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                } else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
        };

        /*=========================
          Events
          ===========================*/

        //Define Touch Events
        s.touchEventsDesktop = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = { start: 'pointerdown', move: 'pointermove', end: 'pointerup' };else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' };
        s.touchEvents = {
            start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : s.touchEventsDesktop.start,
            move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end: s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };

        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }

        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;

            var moveCapture = s.params.nested ? true : false;

            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            } else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);

            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }

            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };

        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };

        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                } else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }

            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            } else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (s.params.centeredSlides) {
                        if (slideToIndex < s.loopedSlides - s.params.slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView / 2) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    } else {
                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    }
                } else {
                    s.slideTo(slideToIndex);
                }
            }
        };

        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,

        // Form elements to match
        formElements = 'input, select, textarea, button, video',

        // Last click time
        lastClickTime = Date.now(),
            clickTimeout,

        //Velocities
        velocities = [],
            allowMomentumBounce;

        // Animating Flag
        s.animating = false;

        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };

        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }

            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }

            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };

        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate()) {
                        return;
                    }
                } else {
                    if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate()) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;

            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX !== s.touches.startX) {
                    isScrolling = false;
                } else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle;
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling) {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }

            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    } else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;

            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;

            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;

            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;

            var disableParentSwiper = true;
            if (diff > 0 && currentTranslate > s.minTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }

            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }

            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                } else {
                    currentTranslate = startTranslate;
                    return;
                }
            }

            if (!s.params.followFinger) return;

            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: new window.Date().getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }

            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;

            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && touchEndTime - lastClickTime > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
                }
                if (timeDiff < 300 && touchEndTime - lastClickTime < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }

            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);

            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            } else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                } else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    } else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }

                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(),
                            velocityEvent = velocities.pop();

                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || new window.Date().getTime() - lastMoveEvent.time > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;

                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;

                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = -newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.maxTranslate();
                        }
                    } else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.minTranslate();
                        }
                    } else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = -newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        } else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    } else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }

                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);

                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
                    } else {
                        s.updateProgress(newPosition);
                    }

                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }

            // Find current slide
            var i,
                stopIndex = 0,
                groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                } else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }

            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;

            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > 1 - s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
            } else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;

            var translate = -s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                } else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);

            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex) return false;
            }

            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if (s.rtl && -translate === s.translate || !s.rtl && translate === s.translate) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);

            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            } else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
            }

            return true;
        };

        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    } else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    } else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };

        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };

        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0,
                y = 0,
                z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            } else {
                y = translate;
            }

            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }

            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }

            s.translate = s.isHorizontal() ? x : y;

            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            } else {
                progress = (translate - s.minTranslate()) / translatesDiff;
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }

            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };

        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;

            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }

            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }

            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function (a) {
                        return a.replace(',', '.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };

        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });

            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });

            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }

            // Observe container
            initObserver(s.container[0], { childList: false });

            // Observe wrapper
            initObserver(s.wrapper[0], { attributes: false });
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();

            var slides = s.wrapper.children('.' + s.params.slideClass);

            if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;

            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }

            var prependSlides = [],
                appendSlides = [],
                i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if (s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2 || s.activeIndex > s.slides.length - s.params.slidesPerView * 2) {
                    newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            } else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            } else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if ((typeof slidesIndexes === 'undefined' ? 'undefined' : _typeof(slidesIndexes)) === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            } else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }

            if (s.params.loop) {
                s.createLoop();
            }

            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            } else {
                s.slideTo(newActiveIndex, 0, false);
            }
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide.css({
                            opacity: slideOpacity
                        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        } else if (s.rtl) {
                            rotateY = -rotateY;
                        }

                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;

                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }

                        slide.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function setTranslate() {
                    var wrapperRotate = 0,
                        cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({ height: s.width + 'px' });
                        } else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0,
                            ty = 0,
                            tz = 0;
                        if (i % 4 === 0) {
                            tx = -round * 4 * s.size;
                            tz = 0;
                        } else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * s.size;
                        } else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        } else if ((i - 3) % 4 === 0) {
                            tx = -s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }

                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }

                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-moz-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-ms-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        'transform-origin': '50% 50% -' + s.size / 2 + 'px'
                    });

                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + -s.width / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + s.params.cube.shadowScale + ')');
                        } else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + -s.height / 2 / scale2 + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function setTranslate() {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;

                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);

                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier;
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0;

                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;

                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                        }
                    }

                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function loadImageInSlide(index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;

                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;

                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], src || background, srcset, sizes, false, function () {
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        } else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
                        }

                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            } else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });

                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
            },
            load: function load() {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                } else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function onTransitionStart() {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function onTransitionEnd() {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function setDragPosition(e) {
                var sb = s.scrollbar;
                var x = 0,
                    y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ? e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX : e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
                var position = pointerPosition - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                } else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function dragStart(e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();

                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);

                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function dragMove(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function dragEnd(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: function () {
                if (s.params.simulateTouch === false && !s.support.touch) return s.touchEventsDesktop;else return s.touchEvents;
            }(),
            enableDraggable: function enableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function disableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.draggableEvents.start, sb.dragStart);
                $(target).off(s.draggableEvents.move, sb.dragMove);
                $(target).off(s.draggableEvents.end, sb.dragEnd);
            },
            set: function set() {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;

                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;

                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                } else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }

                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                } else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function setTranslate() {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;

                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    } else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                } else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    } else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + newPos + 'px, 0, 0)');
                    } else {
                        sb.drag.transform('translateX(' + newPos + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                } else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + newPos + 'px, 0)');
                    } else {
                        sb.drag.transform('translateY(' + newPos + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function setTransition(duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function LinearSpline(x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;

                this.interpolate = function (x2) {
                    if (!x2) return 0;

                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;

                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };

                var binarySearch = function () {
                    var maxIndex, minIndex, guess;
                    return function (array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1) {
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        }return maxIndex;
                    };
                }();
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function getInterpolateFunction(c) {
                if (!s.controller.spline) s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function setTranslate(translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;
                function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }

                    if (!controlledTranslate || s.params.controlBy === 'container') {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }

                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
                }
                if (s.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTranslate(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {

                    setControlledTranslate(controlled);
                }
            },
            setTransition: function setTransition(duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function () {
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function onHashCange(e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + newHash + '"]').index());
                }
            },
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function setHash() {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, '#' + s.slides.eq(s.activeIndex).attr('data-hash') || '');
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function init() {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function destroy() {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function init() {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function setHistoryPopState() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function getPathValues() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function setHistory(key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function slugify(text) {
                return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
            },
            scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 39 && !s.rtl || kc === 37 && s.rtl) s.slideNext();
                if (kc === 37 && !s.rtl || kc === 39 && s.rtl) s.slidePrev();
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: new window.Date().getTime()
        };
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = navigator.userAgent.indexOf('firefox') > -1 ? 'DOMMouseScroll' : isEventSupported() ? 'wheel' : 'mousewheel';
        }

        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;

            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }

            if (!isSupported && document.implementation && document.implementation.hasFeature &&
            // always returns true in newer browsers as per the standard.
            // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
            document.implementation.hasFeature('', '') !== true) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }

            return isSupported;
        }

        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;

            var data = normalizeWheel(e);

            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return;
                } else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return;
                }
            } else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            }

            if (delta === 0) return;

            if (s.params.mousewheelInvert) delta = -delta;

            if (!s.params.freeMode) {
                if (new window.Date().getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    } else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = new window.Date().getTime();
            } else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;

                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();

                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();

                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }

                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                } else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);

                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();

                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }

            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            return true;
        };

        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            return true;
        };

        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/event) /*object*/{
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            var sX = 0,
                sY = 0,
                // spinX, spinY
            pX = 0,
                pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in event) {
                sY = event.detail;
            }
            if ('wheelDelta' in event) {
                sY = -event.wheelDelta / 120;
            }
            if ('wheelDeltaY' in event) {
                sY = -event.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in event) {
                sX = -event.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }

            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;

            if ('deltaY' in event) {
                pY = event.deltaY;
            }
            if ('deltaX' in event) {
                pX = event.deltaX;
            }

            if ((pX || pY) && event.deltaMode) {
                if (event.deltaMode === 1) {
                    // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {
                    // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
                sX = pX < 1 ? -1 : 1;
            }
            if (pY && !sY) {
                sY = pY < 1 ? -1 : 1;
            }

            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;

            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            } else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                } else {
                    pY = p;
                    pX = '0';
                }
            }

            if (pX.indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            } else {
                pX = pX * progress * rtlFactor + 'px';
            }
            if (pY.indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            } else {
                pY = pY * progress + 'px';
            }

            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function setTranslate() {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    setParallaxTransform(this, s.progress);
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function setTransition(duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function onGestureStart(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function onGestureChange(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                } else {
                    z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function onGestureEnd(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function onTouchStart(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function onTouchMove(e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;

                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;

                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;

                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;

                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x) {
                        z.image.isTouched = false;
                        return;
                    } else if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();

                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

                if (z.image.currentX < z.image.minX) {
                    z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, 0.8);
                }

                if (z.image.currentY < z.image.minY) {
                    z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, 0.8);
                }

                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();

                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function onTouchEnd(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;

                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;

                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);

                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function onTransitionEnd(s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function toggleZoom(s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;

                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                } else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }

                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                } else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth / 2 - touchX;
                        diffY = offsetY + slideHeight / 2 - touchY;

                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;

                        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
                        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;

                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;

                        if (translateX < translateMinX) {
                            translateX = translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }

                        if (translateY < translateMinY) {
                            translateY = translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    } else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';

                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    } else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }

                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide) {
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);

                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function init() {
                s.zoom.attachEvents();
            },
            destroy: function destroy() {
                s.zoom.attachEvents(true);
            }
        };

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName(eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                } else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {};
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function _handler() {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function makeFocusable($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function addRole($el, role) {
                $el.attr('role', role);
                return $el;
            },

            addLabel: function addLabel($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },

            disable: function disable($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },

            enable: function enable($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },

            onEnterKey: function onEnterKey(event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    } else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                } else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    } else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },

            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),

            notify: function notify(message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function init() {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }

                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function initPagination() {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function destroy() {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            } else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };

        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');

            // Wrapper
            s.wrapper.removeAttr('style');

            // Slides
            if (s.slides && s.slides.length) {
                s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
            }

            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }

            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);

            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };

        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();

            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };

        s.init();

        // Return swiper instance
        return s;
    };

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: function () {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function isArray(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function () {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            }()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: function () {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        }(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch: window.Modernizr && Modernizr.touch === true || function () {
                return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),

            transforms3d: window.Modernizr && Modernizr.csstransforms3d === true || function () {
                var div = document.createElement('div').style;
                return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
            }(),

            flexbox: function () {
                var div = document.createElement('div').style;
                var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            }(),

            observer: function () {
                return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
            }(),

            passiveListener: function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),

            gestures: function () {
                return 'ongesturestart' in window;
            }()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = function () {
        var Dom7 = function Dom7(arr) {
            var _this = this,
                i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function $(selector, context) {
            var arr = [],
                i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els,
                        tempParent,
                        html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    } else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        } else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                        arr.push(selector);
                    }
                    //Array of elements or instance of Dom
                    else if (selector.length > 0 && selector[0].nodeType) {
                            for (i = 0; i < selector.length; i++) {
                                arr.push(selector[i]);
                            }
                        }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function addClass(className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function removeClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function hasClass(className) {
                if (!this[0]) return false;else return this[0].classList.contains(className);
            },
            toggleClass: function toggleClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function attr(attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);else return undefined;
                } else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        } else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function removeAttr(attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function data(key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;else if (this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[key];else return undefined;
                    } else return undefined;
                } else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform: function transform(_transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
                }
                return this;
            },
            transition: function transition(duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function on(eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    } else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }

                return this;
            },
            off: function off(eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        } else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function once(eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function trigger(eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, { detail: eventData, bubbles: true, cancelable: true });
                    } catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function transitionEnd(callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function width() {
                if (this[0] === window) {
                    return window.innerWidth;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    } else {
                        return null;
                    }
                }
            },
            outerWidth: function outerWidth(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            },
            height: function height() {
                if (this[0] === window) {
                    return window.innerHeight;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    } else {
                        return null;
                    }
                }
            },
            outerHeight: function outerHeight(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));else return this[0].offsetHeight;
                } else return null;
            },
            offset: function offset() {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop = el.clientTop || body.clientTop || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top + scrollTop - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                } else {
                    return null;
                }
            },
            css: function css(props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    } else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },

            //Dom manipulation
            each: function each(callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function html(_html) {
                if (typeof _html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = _html;
                    }
                    return this;
                }
            },
            text: function text(_text) {
                if (typeof _text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    } else return null;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = _text;
                    }
                    return this;
                }
            },
            is: function is(selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;

                    if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                } else if (selector === document) return this[0] === document;else if (selector === window) return this[0] === window;else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
            },
            index: function index() {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                } else return undefined;
            },
            eq: function eq(index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function append(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    } else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function prepend(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    } else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function insertBefore(selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    } else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function insertAfter(selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    } else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function next(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            nextAll: function nextAll(selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if ($(next).is(selector)) nextEls.push(next);
                    } else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function prev(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            prevAll: function prevAll(selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if ($(prev).is(selector)) prevEls.push(prev);
                    } else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function parent(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    } else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function parents(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        } else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find: function find(selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function children(selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;

                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        } else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function remove() {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function add() {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };

        return $;
    }();

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery;
    } else {
        domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }

    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            };
        }
    }

    window.Swiper = Swiper;
})();
/*===========================
Swiper AMD Export
===========================*/
if (true) {
    module.exports = window.Swiper;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';

        return window.Swiper;
    });
}
//# sourceMappingURL=maps/swiper.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Detect mobile browsers
(function (a) {
	(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);

window.userAgentMobile = jQuery.browser.mobile;
window.isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
window.isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]"
window.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || function (p) {
	return p.toString() === "[object SafariRemoteNotification]";
}(!window['safari'] || safari.pushNotification);
// Internet Explorer 6-11
window.isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
window.isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
window.isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
window.isBlink = (isChrome || isOpera) && !!window.CSS;

// Tooltip
// ---------------------------------------------------------------

function addToolTip() {
	var el = $(this);
	var html = '<div id="tooltip" class="tooltip ' + el.data('tooltip-class') + '">' + el.data('tooltip') + '</div>';

	el.prepend(html);
	var tooltip = $('#tooltip');
	tooltip.css('top', el.height() + 5);
}

function removeToolTip() {
	var el = $(this);
	el.find('#tooltip').remove();
}

window.addToolTip = addToolTip;
window.removeToolTip = removeToolTip;

// Alerts
// ---------------------------------------------------------------
window.sendAlert = function (message, message2, primaryOption, callback, callbackInfo) {

	$('.alert p').text(message);
	if (message2) {
		$('.alert p').append('<span class="sub">' + message2 + '</span>');
	}
	$('.alert .sub').text(message2);
	$('.alert a.highlighted').text(primaryOption).attr('rel', callback).attr('data-callback-info', callbackInfo);
	$('.alert').removeClass('active pop');
	$('.overlay').fadeIn(200);
	$('.alert, .alert-outer, .alert-middle').addClass('active');
	setTimeout(function () {
		$('.alert').addClass('pop');
	}, 10);

	$('[rel="close-alert"], .alert a').click(function () {
		window.closeAlert();
	});
};

window.closeAlert = function () {
	$('.alert').addClass('out');
	$('.overlay').fadeOut(200);
	setTimeout(function () {
		$('.alert, .alert-outer, .alert-middle').removeClass('active out pop');
	}, 250);
};

// Card Hovering
// ---------------------------------------------------------------

var cardOffset = '';
var cardWidth = '';
var cardHeight = '';

var maxRotation = 4;

var maxTranslation = 2;
var perspectiveAmount = 1600;

function calculateRotationPercentage(offset, dimension) {
	return -2 / dimension * offset + 1;
}

function calculateTranslationPercentage(offset, dimension) {
	return -2 / dimension * offset + 1;
}

$(document).on('mouseenter', '.atv-card', function () {
	$(this).addClass('hover');
	cardOffset = $(this).offset();
	cardWidth = $(this).width();
	cardHeight = $(this).height();
});

$(document).on('mouseleave', '.atv-card', function () {
	$(this).removeClass('hover');
	$(this).css({
		'transform': 'none'
	});
});

$(document).on('mousemove', '.atv-card', function (e) {

	var mouseOffsetInside = {
		x: e.pageX - cardOffset.left,
		y: e.pageY - cardOffset.top
	};

	var xRotationPercentage = calculateRotationPercentage(mouseOffsetInside.y, cardHeight) * -1;
	var yRotationPercentage = calculateRotationPercentage(mouseOffsetInside.x, cardWidth);

	var xTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.x, cardWidth) * -1;
	var yTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.y, cardHeight) * -1;

	var rotate = "perspective(" + perspectiveAmount + "px) rotateX(" + xRotationPercentage * maxRotation + "deg)" + " rotateY(" + yRotationPercentage * maxRotation + "deg)";
	var translate = " translate3d(" + xTranslationPercentage * maxTranslation + "px," + yTranslationPercentage * maxTranslation + "px, 0px)";

	$(this).css({
		'transform': "scale(1.05) " + rotate + translate
	});

	$(this).find('.atv-card-shine').css({
		'background': 'linear-gradient(' + e.pageX / 2 + 'deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 80%)'
	});
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EasySVG = function () {
    function EasySVG() {
        _classCallCheck(this, EasySVG);

        this.font = {};
        this.font.id = '';
        this.font.horizAdvX = 0;
        this.font.unitsPerEm = 0;
        this.font.ascent = 0;
        this.font.descent = 0;
        this.font.glyphs = [];
        this.font.size = 20;
        this.font.color = null;
        this.font.lineHeight = 1;
        this.font.letterSpacing = 0;

        this.ref = {};

        this.clearSVG();
    }

    _createClass(EasySVG, [{
        key: 'clearSVG',
        value: function clearSVG() {
            //let dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
            //let document = dom.window.document;
            this.svg = document.createElement('svg');
            this.svg.setAttribute('version', '1.0');
            this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            this.svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }

        /**
            * Function takes UTF-8 encoded string and returns unicode number for every character.
            * @param  string $str
            * @return string
         */

    }, {
        key: '_utf8ToUnicode',
        value: function _utf8ToUnicode(str) {
            var unicode = [],
                values = [],
                lookingFor = 1;
            str = str ? str : [];
            for (var i = 0; i < str.length; i++) {
                var thisValue = str.charCodeAt(i);
                unicode.push(thisValue);
                // if(thisValue < 128 ) unicode.push(thisValue);
                // else{
                //     if(values.length == 0) lookingFor = (thisValue < 224) ? 2:3;
                //     values.push(thisValue);
                //     if(values.length == lookingFor){
                //         let number = lookingFor == 3 ?
                //                          ( ( values[0] % 16) * 4096 ) + ( ( values[1] % 64) * 64 ) + (values[2] % 64):
                //                          ( ( values[0] % 32 ) * 64 ) + ( values[1] % 64 );
                //         unicode.push(number);
                //         values = [];
                //         lookingFor = 1;
                //     }
                // }
            }

            return unicode;
        }

        /**
         * Set font params (short-hand method)
         * @param string filepath
         * @param integer size
         * @param string color
         */

    }, {
        key: 'setFont',
        value: function setFont(filepath, size) {
            var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            this.setFontSVG(filepath);
            this.setFontSize(size);
            if (color) {
                this.setFontColor(color);
            }
        }

        /**
         * Set font size for display
         * @param int size
         * @return void
         */

    }, {
        key: 'setFontSize',
        value: function setFontSize(size) {
            this.font.size = Number(size);
        }

        /**
         * Set font color
         * @param string color
         * @return void
         */

    }, {
        key: 'setFontColor',
        value: function setFontColor(color) {
            this.font.color = color;
        }

        /**
         * Set the line height from default (1) to custom value
         * @param  float value
         * @return void
         */

    }, {
        key: 'setLineHeight',
        value: function setLineHeight(value) {
            this.font.lineHeight = value;
        }

        /**
         * Set the letter spacing from default (0) to custom value
         * @param  float value
         * @return void
         */

    }, {
        key: 'setLetterSpacing',
        value: function setLetterSpacing(value) {
            this.font.letterSpacing = value;
        }

        /**
         * Function takes path to SVG font (local path) and processes its xml
         * to get path representation of every character and additional
         * font parameters
         * @param  string filepath
         * @return void
         */

    }, {
        key: 'setFontSVG',
        value: function setFontSVG(file) {
            //console.log(file);
            this.font.glyphs = [];
            //let parser = new DOMParser();
            var xmldoc = file; //parser.parseFromString(file, "image/svg+xml");
            // move to the first <product /> node
            var font = xmldoc.getElementsByTagName("font")[0];
            var fontface = xmldoc.getElementsByTagName("font-face")[0];
            var glyphs = xmldoc.getElementsByTagName("glyph");

            this.font.id = font.getAttribute('id');
            this.font.horizAdvX = font.getAttribute('horiz-adv-x');

            this.font.unitsPerEm = Number(fontface.getAttribute('units-per-em'));
            this.font.ascent = Number(fontface.getAttribute('ascent'));
            this.font.descent = Number(fontface.getAttribute('descent'));

            for (var i = 0; i < glyphs.length; i++) {
                var unicode = glyphs[i].getAttribute('unicode');
                unicode = this._utf8ToUnicode(unicode);
                if (unicode[0] != undefined) {
                    unicode = unicode[0];
                    this.font.glyphs[unicode] = {};
                    this.font.glyphs[unicode].horizAdvX = glyphs[i].getAttribute('horiz-adv-x');
                    if (this.font.glyphs[unicode].horizAdvX == '' || this.font.glyphs[unicode].horizAdvX == null) {
                        this.font.glyphs[unicode].horizAdvX = this.font.horizAdvX;
                    }
                    this.font.glyphs[unicode].d = glyphs[i].getAttribute('d') || ' ';
                    // save em value for letter spacing (109 is unicode for the letter 'm')
                    if (unicode == '109') {
                        this.font.em = this.font.glyphs[unicode].horizAdvX;
                    } else if (unicode == '77') {
                        this.font.em = this.font.glyphs[unicode].horizAdvX;
                    }
                }
            }
        }

        /**
         * Add a path to the SVG
         * @param string def
         * @param array attributes
         * @return XMLElement
         */

    }, {
        key: 'addPath',
        value: function addPath(def) {
            var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            this.svg.appendChild(path);
            for (var key in attributes) {
                if (key !== 'contains') {
                    path.setAttribute(key, attributes[key]);
                }
            }
            // def = def.replace(/NaN/g,'');
            path.setAttribute('d', def);
            //console.log(path);
            return path;
        }

        /**
         * Add a text to the SVG
         * @param string $def
         * @param float/string $x
         * @param float/string $y
         * @param array $attributes
         * @return SimpleXMLElement
         */

    }, {
        key: 'addText',
        value: function addText(text) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            var def = this.textDef(text);
            if (x === 'center' || y === 'center') {
                var _textDimensions = this.textDimensions(text),
                    _textWidth = _textDimensions.textWidth,
                    _textHeight = _textDimensions.textHeight;
            }
            // center horizontally
            if (x === 'center') {
                if (this.svg.getAtrribute('width') === null || this.svg.getAtrribute('width') == '') {
                    throw new Error('SVG width has to be set to center the text horizontally');
                }
                x = (intval(this.svg['width']) - textWidth) / 2;
            }
            // center vertically
            if (y === 'center') {
                if (this.svg.getAtrribute('height') === null || this.svg.getAtrribute('height') == '') {
                    throw new Error('SVG height has to be set to center the text vertically');
                }
                y = (intval(this.svg['height']) - textHeight) / 2;
            }
            if (x != 0 || y != 0) {
                def = this.defTranslate(def, x, y);
            }
            if (this.font.color) {
                attributes['fill'] = this.font.color;
            }
            return this.addPath(def, attributes);
        }

        /**
         * Function takes UTF-8 encoded string and size, returns xml for SVG paths representing this string.
         * @param string $text UTF-8 encoded text
         * @return string xml for text converted into SVG paths
         */

    }, {
        key: 'textDef',
        value: function textDef(text) {
            var def = [],
                horizAdvX = 0,
                horizAdvY = Number(this.font.ascent) + Number(this.font.descent),
                space = this._utf8ToUnicode(' '),
                fontSize = Number(this.font.size) / Number(this.font.unitsPerEm);
            text = this._utf8ToUnicode(text);

            for (var i = 0; i < text.length; i++) {
                var _letter = text[i];
                // line break support (10 is unicode for linebreak)
                if (_letter == 10) {
                    horizAdvX = 0;
                    horizAdvY += this.font.lineHeight * (Number(this.font.ascent) + Number(this.font.descent));
                    continue;
                }
                // extract character definition
                var glyphLetter = this.font.glyphs[_letter] ? this.font.glyphs[_letter] : this.font.glyphs[space];
                var d = glyphLetter.d;
                // transform typo from original SVG format to straight display
                d = this.defScale(d, fontSize, -1 * fontSize);

                horizAdvX = !horizAdvX ? 0 : horizAdvX;
                d = this.defTranslate(d, Number(horizAdvX), Number(horizAdvY * fontSize * 2));
                def.push(d);
                // next letter's position
                horizAdvX += Number(glyphLetter.horizAdvX * fontSize) + Number(this.font.em * this.font.letterSpacing * fontSize);
            }
            return def.join(' ');
        }

        /**
         * Function takes UTF-8 encoded string and size, returns width and height of the whole text
         * @param string $text UTF-8 encoded text
         * @return array ($width, $height)
         */

    }, {
        key: 'textDimensions',
        value: function textDimensions(text) {
            def = [], fontSize = Number(this.font.size) / Number(this.font.unitsPerEm), text = this._utf8ToUnicode(text);
            lineWidth = 0;
            lineHeight = (Number(this.font.ascent) + Number(this.font.descent)) * fontSize * 2;
            width = 0;
            height = Number(lineHeight);
            for (var i = 0; i < text.length; i++) {
                letter = text[i];
                // line break support (10 is unicode for linebreak)
                if (letter == 10) {
                    width = lineWidth > width ? lineWidth : width;
                    height += lineHeight * this.font.lineHeight;
                    lineWidth = 0;
                    continue;
                }
                lineWidth += Number(this.font.glyphs[letter].horizAdvX * fontSize) + Number(this.font.em * this.font.letterSpacing * fontSize);
            }
            // only keep the widest line's width
            width = lineWidth > width ? lineWidth : width;
            return [width, $height];
        }

        /**
         * Function takes unicode character and returns the UTF-8 equivalent
         * @param  string $str
         * @return string
         */

    }, {
        key: 'unicodeDef',
        value: function unicodeDef(unicode) {
            var horizAdvY = this.font.ascent + this.font.descent;
            var fontSize = Number(this.font.size) / Number(this.font.unitsPerEm);
            // extract character definition
            var d = this.font.glyphs[hexdec(unicode)].d;
            // transform typo from original SVG format to straight display
            d = this.defScale(d, fontSize, -1 * fontSize);
            d = this.defTranslate(d, 0, Number(horizAdvY * fontSize * 2));
            return d;
        }

        /**
         * Returns the character width, as set in the font file
         * @param  string  $str
         * @param  boolean $is_unicode
         * @return float
         */

    }, {
        key: 'characterWidth',
        value: function characterWidth(char) {
            var is_unicode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (is_unicode) {
                letter = hexdec(char);
            } else {
                letter = this._utf8ToUnicode(char);
            }
            if (!this.font.glyphs[letter]) return NULL;

            var fontSize = Number(this.font.size) / Number(this.font.unitsPerEm);
            return this.font.glyphs[letter].horizAdvX * fontSize;
        }

        /**
         * Applies a translate transformation to definition
         * @param  string  $def definition
         * @param  float $x
         * @param  float $y
         * @return string
         */

    }, {
        key: 'defTranslate',
        value: function defTranslate(def) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return this.defApplyMatrix(def, [1, 0, 0, 1, x, y]);
        }

        /**
         * Applies a translate transformation to definition
         * @param  string  $def    Definition
         * @param  integer $angle  Rotation angle (degrees)
         * @param  integer $x      X coordinate of rotation center
         * @param  integer $y      Y coordinate of rotation center
         * @return string
         */

    }, {
        key: 'defRotate',
        value: function defRotate(def, angle) {
            var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            if (x == 0 && y == 0) {
                var _angle = Math.degrees(_angle);
                return this.defApplyMatrix(def, [Math.cos(_angle), Math.sin(_angle), -1 * Math.sin(_angle), Math.cos(_angle), 0, 0]);
            }
            // rotate by a given point
            def = this.defTranslate(def, x, y);
            def = this.defRotate(def, angle);
            def = this.defTranslate(def, -1 * x, -1 * y);
            return def;
        }

        /**
         * Applies a scale transformation to definition
         * @param  string  $def definition
         * @param  integer $x
         * @param  integer $y
         * @return string
         */

    }, {
        key: 'defScale',
        value: function defScale(def) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            return this.defApplyMatrix(def, [x, 0, 0, y, 0, 0]);
        }

        /**
         * Calculates the new definition with the matrix applied
         * @param  string $def
         * @param  array  $matrix
         * @return string
         */

    }, {
        key: 'defApplyMatrix',
        value: function defApplyMatrix(def, matrix) {
            // if there are several shapes in this definition, do the operation for each
            var shapes = def.match(/M[^zZ]*[zZ]/g) || [];
            //shapes = shapes[0];
            // console.log('shapes',shapes);
            if (shapes.length > 1) {
                for (var i = 0; i < shapes.length; i++) {
                    //ref.shape = instructions[instruction];
                    //console.log(shapes[i].length);
                    shapes[i] = this.defApplyMatrix(shapes[i], matrix);
                }
                return shapes.join(' ');
            }
            var instructions = def.match(/[a-zA-Z]+[^a-zA-Z]*/g) || [];
            //instructions = instructions[0];
            //$return = '';
            for (var instruction = 0; instruction < instructions.length; instruction++) {
                // ref.instruction = instructions[instruction];
                var x = void 0,
                    y = void 0,
                    current_point = void 0;
                var _i = instructions[instruction].charAt(0); //.replace(/[^a-zA-Z]*/g);
                var coords = instructions[instruction].match(/\-?[0-9\.]+/g);
                //coords = coords[0];
                if (!coords) {
                    continue;
                }
                var new_coords = [];
                while (coords.length > 0) {
                    // do the matrix calculation stuff
                    var a = Number(matrix[0]),
                        b = Number(matrix[1]),
                        c = Number(matrix[2]),
                        d = Number(matrix[3]),
                        e = Number(matrix[4]),
                        f = Number(matrix[5]);
                    // exception for relative instruction
                    if (_i.match(/[a-z]/)) {
                        e = 0;
                        f = 0;
                    }
                    // convert horizontal lineto (relative)
                    if (_i == 'h') {
                        _i = 'l';
                        x = Number(coords.shift()).toPrecision(10);
                        y = 0;
                        x = Number(x);
                        y = Number(y);
                        // add new point's coordinates
                        current_point = [a * x + c * y + e, b * x + d * y + f];
                        new_coords = new_coords.concat(current_point);
                    }
                    // convert vertical lineto (relative)
                    else if (_i == 'v') {
                            _i = 'l';
                            x = 0;
                            y = Number(coords.shift()).toPrecision(10);
                            x = Number(x);
                            y = Number(y);
                            // add new point's coordinates
                            current_point = [a * x + c * y + e, b * x + d * y + f];
                            new_coords = new_coords.concat(current_point);
                        }
                        // convert quadratic bezier curve (relative)
                        else if (_i == 'q') {
                                x = Number(coords.shift()).toPrecision(10);
                                y = Number(coords.shift()).toPrecision(10);
                                x = Number(x);
                                y = Number(y);
                                // add new point's coordinates
                                current_point = [a * x + c * y + e, b * x + d * y + f];
                                new_coords = new_coords.concat(current_point);
                                // same for 2nd point
                                x = Number(coords.shift()).toPrecision(10);
                                y = Number(coords.shift()).toPrecision(10);
                                x = Number(x);
                                y = Number(y);
                                // add new point's coordinates
                                current_point = [a * x + c * y + e, b * x + d * y + f];
                                new_coords = new_coords.concat(current_point);
                            }
                            // every other commands
                            // @TODO: handle 'a,c,s' (elliptic arc curve) commands
                            // cf. http://www.w3.org/TR/SVG/paths.html#PathDataCurveCommands
                            else {
                                    x = Number(coords.shift()).toPrecision(5);
                                    y = Number(coords.shift()).toPrecision(5);
                                    x = Number(x);
                                    y = Number(y);
                                    //console.log(x, y);
                                    // add new point's coordinates
                                    current_point = [a * x + c * y + e, b * x + d * y + f];
                                    //if(isNaN(current_point[0])) {console.log(a, b, c, d, e, f, x, y)}
                                    new_coords = new_coords.concat(current_point);
                                }
                }
                instructions[instruction] = _i + new_coords.join(' ');
                // remove useless commas
                instructions[instruction] = instructions[instruction].replace(/,\-/, '-');
            }
            return instructions.join(' ');
        }

        /**
         *
         * Short-hand methods
         *
         */

        /**
         * Return full SVG XML
         * @return string
         */

    }, {
        key: 'asXML',
        value: function asXML() {
            var inner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (inner) return this.svg.innerHTML;
            return this.svg;
        }
        /**
         * Adds an attribute to the SVG
         * @param string $key
         * @param string $value
         */

    }, {
        key: 'addAttribute',
        value: function addAttribute(key, value) {
            return this.svg.setAttribute(key, value);
        }
    }]);

    return EasySVG;
}();

window.EasySVG = EasySVG;
//helpers
function intval(mixedVar, base) {
    //  discuss at: http://locutus.io/php/intval/
    // original by: Kevin van Zonneveld (http://kvz.io)
    // improved by: stensi
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
    //    input by: Matteo
    //   example 1: intval('Kevin van Zonneveld')
    //   returns 1: 0
    //   example 2: intval(4.2)
    //   returns 2: 4
    //   example 3: intval(42, 8)
    //   returns 3: 42
    //   example 4: intval('09')
    //   returns 4: 9
    //   example 5: intval('1e', 16)
    //   returns 5: 30
    var tmp;
    var type = typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar);
    if (type === 'boolean') {
        return +mixedVar;
    } else if (type === 'string') {
        tmp = parseInt(mixedVar, base || 10);
        return isNaN(tmp) || !isFinite(tmp) ? 0 : tmp;
    } else if (type === 'number' && isFinite(mixedVar)) {
        return mixedVar | 0;
    } else {
        return 0;
    }
}

function hexdec(hexString) {
    //  discuss at: http://locutus.io/php/hexdec/
    // original by: Philippe Baumann
    //   example 1: hexdec('that')
    //   returns 1: 10
    //   example 2: hexdec('a0')
    //   returns 2: 160
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
}

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logo = function () {
    function Logo(ingredients) {
        var svgfonts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var container = arguments[2];
        var dbid = arguments[3];

        _classCallCheck(this, Logo);

        this._dbid = dbid;
        this._ingredients = ingredients;
        this._editlogocontainer = container;
        this._logo = {};

        this.monogram_fonts = [];
        this.fontvariations = [];
        this.sloganfontvariations = [];
        this.colorvariations = [];
        this.layoutvariations = [];
        this.symbolvariations = [];
        this.monogramvariations = [];
        this.containervariations = [];
        this.svgfonts = svgfonts ? svgfonts : { main_font: null, slogan_font: null, monogram_font: null };
    }

    _createClass(Logo, [{
        key: 'Init',
        value: function Init() {
            var _this = this;
            this.SetFontWeights();
            this.SetFontTags();
            this.GetFont(window.assets.fonts);
            this.SetColorTag();
            this.SetColor(window.assets.colors);
            this.SetLayout();
            if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                this.SetContainerbg(window.assets.containers, this._ingredients.layout);
            }
            if (this._ingredients.layout == 'text_with_text_in_symbol') this.SetMonogramContainer(window.assets.container_symbols);
            this.AddElementToScreen();
            this.SetSymbolAlignment();
            return this.GetSymbolSVG(this._ingredients.symbols).then(function (symbols) {
                _this._ingredients.symbols = symbols;
                _this.SetSymbol();
            }).catch(function (err) {
                throw err;
            });
        }
    }, {
        key: 'Draw',
        value: function Draw() {
            var _this2 = this;

            var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var _this = this;
            this.colorfill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
            this.colorbg = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';
            var fontqueue = { main_text: this._ingredients.main_text.font, slogan_text: this._ingredients.slogan_text.font, monogram: this._ingredients.monogram.font };
            if (isNaN(Number(this._ingredients.main_text.size))) this._ingredients.main_text.size = 60;
            if (!window.state.fontStore) window.state.fontStore = {};
            if (!this.element) this.AddElementToScreen();
            if (!this.svgfonts.main_text || !this.svgfonts.slogan_text || !this.svgfonts.monogram) {
                this.GetFontSVG(fontqueue).then(function (fonts) {
                    _this.svgfonts = fonts;
                    _this2.PositionElements(_this2._ingredients.layout);
                }).catch(function (err) {
                    throw err;
                });
            } else {
                this.PositionElements(this._ingredients.layout);
            }
        }
    }, {
        key: 'DrawPromise',
        value: function DrawPromise() {
            var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.colorfill = _this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : _this._ingredients.color.hex;
                _this.colorbg = _this._ingredients.color_tag == 'dark_bg' ? _this._ingredients.color.hex : '#ffffff';
                var fontqueue = { main_text: _this._ingredients.main_text.font, slogan_text: _this._ingredients.slogan_text.font, monogram: _this._ingredients.monogram.font };

                if (!window.state.fontStore) window.state.fontStore = {};
                if (!_this.element) _this.AddElementToScreen();
                if (!_this.svgfonts.main_text || !_this.svgfonts.slogan_text || !_this.svgfonts.monogram) {
                    _this.GetFontSVG(fontqueue).then(function (fonts) {
                        _this.svgfonts = fonts;
                        _this.PositionElements(_this._ingredients.layout);
                        resolve();
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
                } else {
                    try {
                        _this.PositionElements(_this._ingredients.layout);
                        resolve();
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                }
            });
        }
    }, {
        key: 'DefineIngredients',
        value: function DefineIngredients(logorequest) {
            //construct ingrededients object pased on
            //generator selections
            var request = {
                version: 2,
                layouts: {
                    plain_text: 0,
                    text_with_filled_container: 1,
                    text_with_outline_container: 2,
                    text_with_symbol: 3 + 2 * logorequest.symbols.length,
                    text_with_text_as_symbol: 2,
                    text_with_text_in_symbol: 2,
                    text_and_symbol_with_filled_container: 1 + 2 * logorequest.symbols.length,
                    text_and_symbol_with_outline_container: 1 + 2 * logorequest.symbols.length
                },
                favorite: false,
                company: logorequest.company,
                weights: {},
                tags: { dark_bg: 1 },
                color_tags: { dark_bg: 1, light_bg: 1 },
                symbol_alignments: { top: 2, left: 0 },
                colors: [],
                color_tag: 'dark_bg',
                symbols: [],
                layout: 'plain_text',
                main_text: {
                    font: null,
                    text: '',
                    letter_spacing: 0,
                    size: 60,
                    color: '#ffffff',
                    alignment: 'left',
                    y_offset: 0,
                    x_offset: 0
                },
                main_text_2: {
                    font: null,
                    text: '',
                    letter_spacing: 0,
                    size: 60,
                    color: '#ffffff',
                    y_offset: 0,
                    x_offset: 0
                },
                slogan_text: {
                    font: null,
                    letter_spacing: 0,
                    size: 20,
                    color: '#ffffff',
                    y_offset: 0,
                    x_offset: 0
                },
                symbol: {
                    path: null,
                    scale: 0,
                    alignment: 'top',
                    y_offset: 0,
                    x_offset: 0
                },
                monogram: {
                    font: null,
                    text: logorequest.company.company_name[0],
                    size: 50,
                    alignment: 'top',
                    y_offset: 0,
                    x_offset: 0
                },
                container: {
                    path: null,
                    scale: 0
                },
                monogram_container: {
                    path: null,
                    scale: 0,
                    x_offset: 0,
                    y_offset: 0
                },
                svg: { height: 0, width: 0 },
                color: { color_class: "blue", tag: 'dark' }
            };

            //process inspiration logos
            logorequest.logos.map(function (logo) {
                if (!request.weights[logo.weight]) request.weights[logo.weight] = 0;
                request.weights[logo.weight]++;
                request.layouts[logo.layout]++;
                if (logo.layout.substring('filled_container')) request.layouts['text_and_symbol_with_filled_container'];
                if (logo.layout.substring('outline_container')) request.layouts['text_and_symbol_with_outline_container'];
                if (logo.symbol_alignment) {
                    //if(!request.symbol_alignments[logo.symbol_alignment]) request.symbol_alignments[logo.symbol_alignment] = 0;
                    request.symbol_alignments[logo.symbol_alignment]++;
                }
                //loop over tag list
                JSON.parse(logo.tags).map(function (tag) {
                    if (tag && tag != '') {
                        if (tag == 'dark_bg' || tag == 'light_bg') {
                            if (!request.color_tags[tag]) request.color_tags[tag] = 0;
                            request.color_tags[tag]++;
                        } else {
                            if (!request.tags[tag]) request.tags[tag] = 0;
                            request.tags[tag]++;
                        }
                    }
                });
            });

            logorequest.symbols.map(function (symbol) {
                if (symbol) request.symbols.push(symbol);
            });
            //set monogram text
            request.monogram.text = request.company.company_name[0].toUpperCase();

            request.colors = logorequest.colors;
            this._ingredients = request;
        }
    }, {
        key: 'GetElement',
        value: function GetElement() {
            //return an html instance of the element
            return this.element;
        }
    }, {
        key: 'GetFontSVG',
        value: function GetFontSVG(fontqueue, force) {
            var _this = this;
            var fonts = {};
            return new Promise(function (resolve, reject) {
                var _loop = function _loop(key) {
                    if (!_this._ingredients[key].font) {
                        _this._ingredients[key].font = _this.GetFont(window.assets.fonts, key);
                    }
                    var font = fontqueue[key] || _this._ingredients[key].font; //_this._ingredients[key].font;
                    if (!_this.svgfonts[key] || force) {
                        $.ajax({
                            url: 'https://s3.ca-central-1.amazonaws.com/logojoy/svgs2/' + encodeURIComponent(font) + '.svg',
                            //url:'logic/app-includes/svg_fonts/'+ font + '.svg',
                            type: 'GET'
                        }).then(function (res) {
                            //res = new XMLSerializer().serializeToString(res);
                            fonts[key] = res; //.replace(/\"/g,'\\"');
                            if (Object.keys(fonts).length == Object.keys(fontqueue).length) resolve(fonts);
                        }, function (err) {
                            console.log('err', err);
                            //if(Object.keys(fonts).length == Object.keys(fontqueue).length) resolve(fonts);
                            throw err;
                        });
                    }
                    // else{
                    // fonts[key] = _this.svgfonts[key];
                    // if(Object.keys(fonts).length == Object.keys(fontqueue).length) resolve(fonts);

                    // }
                };

                for (var key in fontqueue) {
                    _loop(key);
                }
            });
        }
    }, {
        key: 'GetSymbolSVG',
        value: function GetSymbolSVG(symbols) {
            //console.log('Getting Symbol SVG', symbols);
            var _this = this;
            var _symbols = [];
            return new Promise(function (resolve, reject) {
                if (symbols.length) {
                    symbols.map(function (symbol) {
                        //console.log(symbol);
                        $.get(symbol.svgUrl).then(function (res) {
                            // console.log(res);
                            //console.log(res,res.innerHTML);
                            var symbol = $(res).find('svg').html();
                            //    symbol = symbol.replace(/\"/g,'\"').replace(/[\r\n]/g,'');
                            //if(symbol.indexOf('thenounproject.com') !== -1){console.log('the noun project');_symbols.push($(window.assets.symbols[0].src).html());}
                            //else{_symbols.push(symbol)}
                            _symbols.push(symbol);
                            if (_symbols.length == symbols.length) {
                                resolve(_symbols);
                            }
                        }, function (err) {
                            console.log('error', err);
                            reject(err);
                        });
                    });
                } else {
                    //_symbols.push(window.assets.symbols[0].replace(/\"/g,'\"'))
                    //console.log('adding symbols', window.assets.symbols)
                    var symbol = $(window.assets.symbols[0].src).html();
                    // symbol = symbol.replace(/\"/g,'\\"').replace(/[\r\n]/g,'');
                    resolve([symbol]);
                }
            });
        }
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
        *                 Setters
        * * * * * * * * * * * * * * * * * * * * * * * */

    }, {
        key: 'DeepClone',
        value: function DeepClone(ingredients) {
            //preserve documents
            var cloned_ingredients = JSON.parse(JSON.stringify(ingredients));
            return cloned_ingredients;
        }
    }, {
        key: 'SetFontWeights',
        value: function SetFontWeights() {
            //define weight option for font selection
            var weights = [];
            for (var weight in this._ingredients.weights) {
                for (var i = 0; i < this._ingredients.weights[weight]; i++) {
                    weights.push(weight);
                }
            }
            this._ingredients.weight = weights[Math.floor(Math.random() * (weights.length - 1))];
        }
    }, {
        key: 'SetFontTags',
        value: function SetFontTags() {
            //set all capitals
            this._ingredients.all_caps = 0;
            //determine if caps or no caps
            if (this._ingredients.tags['all_caps']) {
                var caps_probability = this._ingredients.tags['all_caps'] / Object.keys(this._ingredients.layouts).length * 100;
                var r = Math.floor(Math.random() * 100);
                if (caps_probability > r) {
                    this._ingredients.main_text.all_caps = 1;
                    this._ingredients.company.company_name = this._ingredients.company.company_name.toLowerCase();
                }
                delete this._ingredients.tags['all_caps'];
            }
            //font tag type
            var tags = [];
            for (var tag in this._ingredients.tags) {
                for (var i = 0; i < this._ingredients.tags[tag]; i++) {
                    tags.push(tag);
                }
            }
            //select a font tag group
            this._ingredients.tag = tags[Math.floor(Math.random() * tags.length) - 1];
        }
    }, {
        key: 'SetSymbol',
        value: function SetSymbol() {
            this._ingredients.symbol.path = this._ingredients.symbols[Math.floor(Math.random() * this._ingredients.symbols.length)];
        }
    }, {
        key: 'GetFont',
        value: function GetFont(_fonts) {
            var returnfont = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //uses the defined inputs to select a font
            var fonts = [],
                slogan_fonts = [],
                symbol_fonts = [],
                main_font = void 0,
                slogan_font = void 0,
                monogram_font = void 0;
            for (var i = 0; i < _fonts.length; i++) {
                var _font = _fonts[i];
                var tags = JSON.parse(_font.tags);
                if (tags.contains(this._ingredients.tag) && _font.weight == this._ingredients.weight && _font.all_caps == this._ingredients.all_caps) {
                    fonts.push(_font);
                } else if (_font.slogan) {
                    slogan_fonts.push(_font);
                } else if (_font.as_symbol) {
                    this.monogram_fonts.push(_font);
                }
            }
            if (returnfont) {
                if (returnfont == 'monogram') return this.monogram_fonts[Math.floor(Math.random() * this.monogram_fonts.length)].font;else if (returnfont == 'slogan_text') return slogan_fonts[Math.floor(Math.random() * slogan_fonts.length)].font;else if (returnfont == 'main_text') return fonts.length ? fonts[Math.floor(Math.random() * fonts.length)].font : _fonts[Math.floor(Math.random() * _fonts.length)].font;
            } else {
                main_font = fonts.length ? fonts[Math.floor(Math.random() * fonts.length)] : _fonts[Math.floor(Math.random() * _fonts.length)];
                this._ingredients.main_text.font = main_font.font;
                this._ingredients.main_text.size = main_font.size <= 0 ? 60 : Number(main_font.size) * 2;
                this._ingredients.main_text.dsize = main_font.size;

                slogan_font = slogan_fonts[Math.floor(Math.random() * slogan_fonts.length)];
                this._ingredients.slogan_text.font = slogan_font.font;
                //this._ingredients.slogan_text.size = Number(slogan_font.size) * 2;
                this._ingredients.slogan_text.dsize = slogan_font.size;

                monogram_font = this.monogram_fonts[Math.floor(Math.random() * this.monogram_fonts.length)];
                this._ingredients.monogram.font = monogram_font.font;
                this._ingredients.monogram.size = Number(monogram_font.size) * 2 * Math.floor(Math.random() * 5);
                this._ingredients.monogram.dsize = monogram_font.size;
            }
        }
    }, {
        key: 'GetFontVariations',
        value: function GetFontVariations(_fonts, tag) {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            tag = tag ? tag : this._ingredients.tag;
            var fonts = [];
            //if (tag != window.currentFontType){$('.edit-logos.company-name-font').html('');this.fontvariations = [];
            $('.edit-logos.company-name-font').html('');this.fontvariations = [];
            window.drawcontainer = 'company-name-font-' + tag;

            for (var i = 0; i < _fonts.length; i++) {
                var _font2 = _fonts[i];
                var tags = JSON.parse(_font2.tags);
                if (tags.contains(tag)) {
                    fonts.push(_font2);
                }
            }
            if (fonts && tag) {

                this.StartFontVariationDraw(0, fonts, 'company-name-font-' + tag, 0);
            }
        }
    }, {
        key: 'StartFontVariationDraw',
        value: function StartFontVariationDraw(i, fonts, container, count) {
            var _this3 = this;

            var ingredients = this.DeepClone(this._ingredients);
            ingredients.favorite = false;
            ingredients.main_text.font = fonts[i].font;
            ingredients.main_text.size = ingredients.main_text.size > 0 ? ingredients.main_text.size : 40;
            //create a new logo for each new font variant
            var fontvariation = new Logo(ingredients, null, $('.edit-logos.company-name-font'));
            fontvariation.DrawPromise().then(function () {
                var pos = _this3.fontvariations.length;
                _this3.AddFontVariationListener(fontvariation.GetElement(), i);
                _this3.fontvariations[pos] = fontvariation;
                window.swiper.onResize();
                if (count <= 10 && window.drawcontainer == container) _this3.StartFontVariationDraw(i + 1, fonts, container, count + 1);else if (i < fonts.length && window.drawcontainer == container) {
                    var ask = document.createElement('div');
                    ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                    ask.appendChild(document.createTextNode('See more logos'));
                    window.swiper.appendSlide(ask);
                    ask.onclick = function () {
                        _this3.StartFontVariationDraw(i + 1, fonts, container, 0);
                        ask.parentNode.removeChild(ask);
                    };
                }
            }).catch(function (err) {
                console.log(err);
                var pos = _this3.fontvariations.length;
                //this.AddFontVariationListener(fontvariation.GetElement(),i);
                _this3.fontvariations[pos] = fontvariation;
                fontvariation.GetElement().remove();
                if (count <= 10 && window.drawcontainer == container) _this3.StartFontVariationDraw(i + 1, fonts, container, count + 1);
            });
        }
    }, {
        key: 'GetSloganFontVariations',
        value: function GetSloganFontVariations(_fonts) {
            var fonts = [];
            for (var i = 0; i < _fonts.length; i++) {
                var _font3 = _fonts[i];
                var tags = JSON.parse(_font3.tags);
                if (_font3.slogan) {
                    fonts.push(_font3);
                }
            }
            window.drawcontainer = 'company-slogan-font';
            if (this._ingredients.company.company_slogan) {
                this.StartSloganVariationDraw(0, fonts, 'company-slogan-font', 0);
            }
        }
    }, {
        key: 'StartSloganVariationDraw',
        value: function StartSloganVariationDraw(i, fonts, container, count) {
            var _this4 = this;

            var ingredients = this.DeepClone(this._ingredients);
            ingredients.favorite = false;
            ingredients.slogan_text.font = fonts[i].font;
            //create a new logo for each new font variant
            var sloganfontvariation = new Logo(ingredients, null, $('.edit-logos.company-slogan-font'));
            sloganfontvariation.DrawPromise().then(function () {
                var pos = _this4.sloganfontvariations.length;
                _this4.sloganfontvariations[pos] = sloganfontvariation;
                _this4.AddSloganFontVariationListener(sloganfontvariation.GetElement(), i);
                window.swiper.onResize();
                if (count <= 10 && window.drawcontainer == container) _this4.StartSloganVariationDraw(i + 1, fonts, container, count + 1);else if (i < fonts.length && window.drawcontainer == container) {
                    var ask = document.createElement('div');
                    ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                    ask.appendChild(document.createTextNode('See more logos'));
                    window.swiper.appendSlide(ask);
                    ask.onclick = function () {
                        _this4.StartSloganVariationDraw(i + 1, fonts, container, 0);
                        ask.parentNode.removeChild(ask);
                    };
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'SetColorTag',
        value: function SetColorTag() {
            //set color tag
            var tags = [];
            for (var tag in this._ingredients.color_tags) {
                for (var i = 0; i < this._ingredients.color_tags[tag]; i++) {
                    tags.push(tag);
                }
            }
            this._ingredients.color_tag = tags[Math.floor(Math.random() * (tags.length - 1))];
        }
    }, {
        key: 'SetColor',
        value: function SetColor(_colors) {
            //pick a color class
            this._ingredients.color.color_class = this._ingredients.colors[Math.floor(Math.random() * this._ingredients.colors.length)];
            //get color tones

            if (this._ingredients.color.tag && this._ingredients.color.color_class) {
                while (!this._ingredients.color.h) {
                    var i = Math.floor(Math.random() * _colors.length) + 1;
                    if (_colors[i] && _colors[i].color_class == this._ingredients.color.color_class && _colors[i].tags.contains(this._ingredients.color.tag)) this._ingredients.color = _colors[i];
                    _colors.splice(i, 1);
                }
            } else {
                this._ingredients.color = JSON.parse(JSON.stringify(_colors[Math.floor(Math.random() * _colors.length)]));
            }
            this._ingredients.color.hex = '#' + window.tinycolor('hsl(' + Number(this._ingredients.color.h) + ',' + Number(this._ingredients.color.s) + '%,' + Number(this._ingredients.color.l) + '%)').toHex();
        }
    }, {
        key: 'SetCustomColor',
        value: function SetCustomColor(hexcolor) {
            var hsl = window.tinycolor(hexcolor).toHsl();
            this._ingredients.color.hex = '#' + hexcolor;
            this._ingredients.color.h = hsl.h, this._ingredients.color.s = hsl.s * 100, this._ingredients.color.l = hsl.l * 100;
            this._ingredients.color.color_class = "blue";
            this._ingredients.color.name = "blue";

            this.colorfill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
            this.colorbg = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';

            if (this._ingredients.color_tag == 'light_bg') {
                this._ingredients.main_text.color = '#' + hexcolor;
                this.colorfill = '#' + hexcolor;
            } else {
                var _hsl = window.tinycolor(hexcolor).toHsl();
                this._ingredients.color.h = _hsl.h, this._ingredients.color.s = _hsl.s * 100, this._ingredients.color.l = _hsl.l * 100;
            }
        }
    }, {
        key: 'GetColorHex',
        value: function GetColorHex() {
            if (this._ingredients.color_tag == 'dark_bg') {
                return '#' + window.tinycolor('hsl(' + Number(this._ingredients.color.h) + ',' + Number(this._ingredients.color.s) + '%,' + Number(this._ingredients.color.l) + '%)').toHex();
            } else return this._ingredients.main_text.color;
        }
    }, {
        key: 'GetColorVariations',
        value: function GetColorVariations(_colors, color_class) {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            color_class = color_class ? color_class : this._ingredients.color.color_class ? this._ingredients.color.color_class : 'blue';
            var colors = [];
            //if (document.querySelector('.default-color')) document.querySelector('.default-color').innerHTML = "";
            if (color_class != window.currentColorClass) {
                $('.edit-logos.color-browser').html('');
            }
            window.currentColorClass = color_class;

            //deep clone
            //_colors = JSON.parse(JSON.stringify(window.assets.colors));

            //get 6 color variations
            //colors.push(this._ingredients.color);
            for (var i = 0; i < _colors.length; i++) {
                //let i = Math.floor(Math.random() * _colors.length);
                if (_colors[i].color_class == color_class && _colors[i].tags.contains("dark")) colors.push(_colors[i]);
                //_colors.splice(i,1);
            }

            //this.colorvariations = [];
            window.drawcontainer = 'color-variations';
            this.StartColorVariationsDraw(0, colors, 'color-variations', 0);
        }
    }, {
        key: 'StartColorVariationsDraw',
        value: function StartColorVariationsDraw(i, colors, container, count) {
            var _this5 = this;

            var ingredients = this.DeepClone(this._ingredients);
            ingredients.favorite = false;
            ingredients.color_tag = window.groupcolor ? window.groupcolor : this._ingredients.color_tag;
            if (!colors[i].hex) {
                ingredients.color.hex = '#' + window.tinycolor('hsl(' + Number(colors[i].h) + ',' + Number(colors[i].s) + '%,' + Number(colors[i].l) + '%)').toHex();
            } else {
                ingredients.color.hex = colors[i].hex;
            }

            var colorvariation = new Logo(ingredients, this.svgfonts, $('.edit-logos.color-browser'));
            colorvariation.colorfill = ingredients.main_text.color;
            colorvariation.DrawPromise().then(function () {
                $(colorvariation.element).addClass('colorvariation').attr('color-name', colors[i].name);
                _this5.AddColorVariationListener(colorvariation.GetElement(), i);
                _this5.colorvariations[i] = colorvariation;
                window.swiper.onResize();
                if (count <= 10 && window.drawcontainer == container) _this5.StartColorVariationsDraw(i + 1, colors, container, count + 1);else if (window.drawcontainer == container) {
                    var ask = document.createElement('div');
                    ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                    ask.appendChild(document.createTextNode('See more colors'));
                    window.swiper.appendSlide(ask);
                    ask.onclick = function () {
                        _this5.StartColorVariationsDraw(i + 1, colors, container, 0);
                        ask.parentNode.removeChild(ask);
                    };
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'GetLayoutVariations',
        value: function GetLayoutVariations() {
            this.layoutvariations = [];
            var layouts = ['plain_text', 'text_with_symbol', 'text_with_filled_container', 'text_with_text_as_symbol', 'text_with_outline_container', 'text_with_text_in_symbol', 'text_and_symbol_with_filled_container', 'text_and_symbol_with_outline_container'];
            if (this._ingredients.company.company_name.split(' ').length > 1) {
                layouts.splice(1, 0, 'multi_text');
                layouts.splice(3, 0, 'multi_text_with_symbol');
                layouts.splice(6, 0, 'multi_text_with_text_as_symbol');
                layouts.splice(9, 0, 'multi_text_with_text_in_symbol');
            }
            this.StartLayoutVariationDraw(0, layouts);
        }
    }, {
        key: 'StartLayoutVariationDraw',
        value: function StartLayoutVariationDraw(i, layouts) {
            var _this6 = this;

            var layout = layouts[i].split('-');

            var ingredients = this.DeepClone(this._ingredients);
            ingredients.layout = layout[0];
            ingredients.favorite = false;

            //maintain alignment
            ingredients.symbol.alignment = this._ingredients.symbol.alignment || this._ingredients.monogram.alignment;
            ingredients.monogram.alignment = this._ingredients.monogram.alignment || this._ingredients.symbol.alignment;

            if (!ingredients.symbol.path) {
                var svg = $(window.assets.symbols[0].svg).html();
                ingredients.symbol.path = svg;
            }

            var layoutvariation = new Logo(ingredients, this.svgfonts, $('.edit-logos.edit-layout'));
            if (layout[0] == 'text_with_outline_container' || layout[0] == 'text_with_filled_container' || layout[0] == 'text_and_symbol_with_outline_container' || layout[0] == 'text_and_symbol_with_filled_container') {
                layoutvariation._ingredients.container = null;layoutvariation.SetContainerbg(window.assets.containers, layout[0]);
            } else if ((layout[0] == 'text_with_text_in_symbol' || layout[0] == 'multi_text_with_text_in_symbol') && !this._ingredients.monogram_container.path) {
                layoutvariation._ingredients.monogram_container = null;layoutvariation.SetMonogramContainer(window.assets.container_symbols, 'text_with_text_in_symbol');
            }

            layoutvariation.DrawPromise().then(function () {
                $(layoutvariation.GetElement()).addClass('layoutvariation').addClass('layoutvariation--' + layout.join('-'));
                _this6.layoutvariations[i] = layoutvariation;
                _this6.AddLayoutVariationListener(layoutvariation.GetElement(), i);
                window.swiper.onResize();
                console.log(i);
                if (i < layouts.length - 1) _this6.StartLayoutVariationDraw(i + 1, layouts);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'GetContainerVariations',
        value: function GetContainerVariations(type) {
            var _this7 = this;

            this.containervariations = [];
            if (!this.containers) {
                this.containers = { text_with_outline_container: [], text_with_filled_container: [] };
                window.assets.containers.map(function (container) {
                    _this7.containers[container.type].push(container);
                });
            }
            //deep clone
            var containers = this.containers;
            $('.edit-logos.container-browser').html('');
            window.drawcontainer = 'container-variation-' + type;
            this.StartContainerVariationDraw(0, type, containers, 'container-variation-' + type, 0);
        }
    }, {
        key: 'StartContainerVariationDraw',
        value: function StartContainerVariationDraw(i, type, containers, container, count) {
            var _this8 = this;

            var ingredients = this.DeepClone(this._ingredients);
            if ((ingredients.layout == 'text_and_symbol_with_filled_container' || ingredients.layout == 'text_and_symbol_with_outline_container') && type == 'text_with_filled_container') ingredients.layout = 'text_and_symbol_with_filled_container';else if ((ingredients.layout == 'text_and_symbol_with_filled_container' || ingredients.layout == 'text_and_symbol_with_outline_container') && type == 'text_with_outline_container') ingredients.layout = 'text_and_symbol_with_outline_container';else {
                ingredients.layout = type;
            }
            ingredients.favorite = false;
            ingredients.container = { path: null, scale: 0 };
            var containervariation = new Logo(ingredients, this.svgfonts, $('.edit-logos.container-browser'));
            containervariation.container = containers[type][Math.floor(Math.random() * containers[type].length)];
            containervariation.DrawPromise().then(function () {
                //bind variation listener
                _this8.AddContainerVariationListener(containervariation.GetElement(), i);
                _this8.containervariations[i] = containervariation;
                window.swiper.onResize();
                if (count <= 10 && window.drawcontainer == container && i < containers[type].length) _this8.StartContainerVariationDraw(i + 1, type, containers, container, count + 1);else if (window.drawcontainer == container && i < containers[type].length) {
                    var ask = document.createElement('div');
                    ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                    ask.appendChild(document.createTextNode('See more logos'));
                    window.swiper.appendSlide(ask);
                    ask.onclick = function () {
                        _this8.StartContainerVariationDraw(i + 1, type, containers, container, 0);
                        ask.parentNode.removeChild(ask);
                    };
                }
            });
        }
    }, {
        key: 'GetSymbolContainerVariations',
        value: function GetSymbolContainerVariations(containers) {
            this.symbolcontainervariations = [];
            window.drawcontainer = 'symbol-container-variation';
            this.StartSymbolContainerVariationDraw(0, containers, 'symbol-container-variation', 0);
        }
    }, {
        key: 'StartSymbolContainerVariationDraw',
        value: function StartSymbolContainerVariationDraw(i, containers, container, count) {
            var _this9 = this;

            var ingredients = this.DeepClone(this._ingredients);
            ingredients.layout = 'text_with_text_in_symbol';
            ingredients.symbol.alignment = this._ingredients.symbol.alignment || this._ingredients.monogram.alignment;
            ingredients.monogram_container = { path: null, scale: 0 };
            ingredients.favorite = false;

            if (this._ingredients.layout.indexOf('multi') !== -1) {
                ingredients.layout = 'multi_' + ingredients.layout;
            }

            var containervariation = new Logo(ingredients, this.svgfonts, $('.edit-logos.symbol-container-browser'));
            containervariation.symbolcontainer = containers[i];
            containervariation.DrawPromise().then(function () {
                //bind variation listener
                _this9.AddSymbolContainerVariationListener(containervariation.GetElement(), i);
                _this9.symbolcontainervariations[i] = containervariation;
                window.swiper.onResize();
                if (count <= 10 && window.drawcontainer == container && i < container.length) _this9.StartSymbolContainerVariationDraw(i + 1, containers, container, count + 1);else if (window.drawcontainer == container && i < containers.length) {
                    var ask = document.createElement('div');
                    ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                    ask.appendChild(document.createTextNode('See more logos'));
                    window.swiper.appendSlide(ask);
                    ask.onclick = function () {
                        _this9.StartSymbolContainerVariationDraw(i + 1, containers, container, 0);
                        ask.parentNode.removeChild(ask);
                    };
                }
            });
        }
    }, {
        key: 'SetSymbolAlignment',
        value: function SetSymbolAlignment() {
            var alignments = [];
            for (var alignment in this._ingredients.symbol_alignments) {
                for (var i = 0; i < this._ingredients.symbol_alignments[alignment]; i++) {
                    alignments.push(alignment);
                }
            }
            this._ingredients.symbol.alignment = alignments[Math.floor(Math.random() * alignments.length)];
            this._ingredients.monogram.alignment = this._ingredients.symbol.alignment;
        }
    }, {
        key: 'GetSymbolVariations',
        value: function GetSymbolVariations(term) {
            var _this = this;
            window.loading.start('Finding icons');
            //$('.edit-logos.symbol-browser').html('');this.symbolvariations = [];
            if (window.currentTerm != term) {
                $('.edit-logos.symbol-browser').html('');this.symbolvariations = [];
            }
            window.currentTerm = term;

            //$.get(window.APIURL+'/generatordata/icons?term='+term)
            $.post('https://symbol-search.logojoy.com/symbols', { term: term }).then(function (res) {
                var symbols = res.symbols;
                window.loading.done();
                window.drawcontainer = 'symbol-variations';
                _this.StartSymbolVariationsDraw(0, symbols, 'symbol-variations', 0);
            }, function (err) {
                console.log(err);
                window.loading.done();
            });
        }
    }, {
        key: 'StartSymbolVariationsDraw',
        value: function StartSymbolVariationsDraw(i, symbols, container, count) {
            var _this10 = this;

            var _this = this;
            var symbol = symbols[i];
            this.GetSymbolSVG([symbol]).then(function (symbol) {
                //    // console.log(symbol);
                //     if(symbol[0] === undefined) return;
                var ingredients = _this.DeepClone(_this._ingredients);
                if (ingredients.layout == 'multi_text_with_symbol' || ingredients.layout == 'text_and_symbol_with_filled_container' || ingredients.layout == 'text_and_symbol_with_outline_container') ingredients.layout = ingredients.layout;else if (ingredients.layout == 'multi_text_with_text_as_symbol') ingredients.layout = 'multi_text_with_symbol';else ingredients.layout = 'text_with_symbol';
                ingredients.symbol = { path: null, scale: 0 };
                ingredients.symbol.alignment = _this10._ingredients.symbol.alignment || _this10._ingredients.monogram.alignment;
                ingredients.symbol.path = symbol[0];
                ingredients.favorite = false;

                var symbolvariation = new Logo(ingredients, _this10.svgfonts, $('.edit-logos.symbol-browser'));
                symbolvariation.DrawPromise().then(function () {
                    _this10.symbolvariations[i] = symbolvariation;
                    _this10.AddSymbolVariationListener(symbolvariation.GetElement(), i);
                    window.swiper.onResize();
                    if (count <= 10 && window.drawcontainer == container) _this10.StartSymbolVariationsDraw(i + 1, symbols, container, count + 1);else if (window.drawcontainer == container) {
                        var ask = document.createElement('div');
                        ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                        ask.appendChild(document.createTextNode('See more logos'));
                        window.swiper.appendSlide(ask);
                        ask.onclick = function () {
                            _this10.StartSymbolVariationsDraw(i + 1, symbols, container, 0);
                            ask.parentNode.removeChild(ask);
                        };
                    }
                });
            }).catch(function (err) {
                console.log('Did not get symbol', err);
            });
        }
    }, {
        key: 'DrawMonogramVariations',
        value: function DrawMonogramVariations() {
            var _this = this;
            this.monogramvariations = [];
            if (!this.monogram_fonts.length) {
                this.GetFont(window.assets.fonts, 'monogram_fonts');
            }
            //randomly select 10
            // let fonts = [], fontoptions = JSON.parse(JSON.stringify(this.monogram_fonts));
            // while(fonts.length < 10){
            //     let i= Math.floor(Math.random() * fontoptions.length);
            //     fonts.push(fontoptions[i]);
            //     fontoptions.splice(i,1)
            // }
            window.drawcontainer = 'monogram-variations';
            this.StartMonogramVariationDraw(0, this.monogram_fonts, 'monogram-variations', 0);
            // fonts.map( (font) => {
            //     let ingredients = this.DeepClone(this._ingredients);
            //     ingredients.monogram.font = font.font;
            //     ingredients.favorite = false;

            //     ingredients.layout = (this._ingredients.layout == 'text_with_text_as_symbol' || this._ingredients.layout == 'text_with_text_in_symbol') ? this._ingredients.layout:'text_with_text_as_symbol';
            //     this.GetFontSVG({monogram:font.font}, true)
            //         .then(f =>{
            //             let svgfonts = {main_text:this.svgfonts.main_text,slogan_text:this.svgfonts.slogan_text,monogram:f.monogram};
            //                 //console.log('svgfonts',svgfonts);
            //             let monogramvariation = new Logo(ingredients, svgfonts, $('.edit-logos.monograms-browser'));
            //             monogramvariation.Draw();
            //             let i = this.monogramvariations.length;
            //             this.monogramvariations[i] = monogramvariation;
            //             this.AddMonogramVariationListener(monogramvariation.GetElement(),i);
            //             i++;
            //         });

            // });
            // window.EditorSwipers.map(swiper=>{ swiper.hasAsk = false;})
        }
    }, {
        key: 'StartMonogramVariationDraw',
        value: function StartMonogramVariationDraw(i, fonts, container, count) {
            var _this11 = this;

            var font = fonts[i];
            var ingredients = this.DeepClone(this._ingredients);
            ingredients.monogram.font = font.font;
            ingredients.favorite = false;

            ingredients.layout = 'text_with_text_as_symbol';
            if (this._ingredients.layout.indexOf('multi') !== -1) {
                ingredients.layout = 'multi_' + ingredients.layout;
            }
            this.GetFontSVG({ monogram: font.font }, true).then(function (f) {
                var svgfonts = { main_text: _this11.svgfonts.main_text, slogan_text: _this11.svgfonts.slogan_text, monogram: f.monogram };
                var monogramvariation = new Logo(ingredients, svgfonts, $('.edit-logos.monograms-browser'));
                monogramvariation.DrawPromise().then(function () {
                    window.swiper.onResize();
                    _this11.monogramvariations[i] = monogramvariation;
                    _this11.AddMonogramVariationListener(monogramvariation.GetElement(), i);
                    if (count <= 10 && window.drawcontainer == container) _this11.StartMonogramVariationDraw(i + 1, fonts, container, count + 1);else if (window.drawcontainer == container && i < fonts.length) {
                        var ask = document.createElement('div');
                        ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                        ask.appendChild(document.createTextNode('See more logos'));
                        window.swiper.appendSlide(ask);
                        ask.onclick = function () {
                            _this11.StartMonogramVariationDraw(i + 1, fonts, container, 0);
                            ask.parentNode.removeChild(ask);
                        };
                    }
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'SetLayout',
        value: function SetLayout() {
            var _this12 = this;

            var layouts = ['plain_text', 'multi_text', 'text_with_symbol', 'text_with_text_as_symbol', 'text_with_filled_container', 'text_with_outline_container', 'text_and_symbol_with_filled_container', 'text_and_symbol_with_outline_container'];
            var layoutchoices = [];
            var numlayouts = 0;
            layouts.map(function (layout) {
                for (var i = 0; i < _this12._ingredients.layouts[layout]; i++) {
                    layoutchoices.push(layout);
                }
            });
            this._ingredients.layout = layoutchoices[Math.floor(Math.random() * layoutchoices.length)];
        }
    }, {
        key: 'GetSymbolContainer',
        value: function GetSymbolContainer(container) {
            container = container[Math.floor(Math.random() * container.length)];
            this._ingredients.monogram_container.path = $(container.src).html();
        }
    }, {
        key: 'SetContainerbg',
        value: function SetContainerbg(containers, key) {
            var _this13 = this;

            if (key.indexOf('filled') !== -1) key = 'text_with_filled_container';else key = 'text_with_outline_container';
            this.containers = { text_with_outline_container: [], text_with_filled_container: [] };
            containers.map(function (container) {
                _this13.containers[container.type].push(container);
            });
            this.container = this.containers[key][Math.floor(Math.random() * this.containers[key].length)];
        }
    }, {
        key: 'SetMonogramContainer',
        value: function SetMonogramContainer(containers) {
            this.symbolcontainer = containers[Math.floor(Math.random() * containers.length)];
        }
    }, {
        key: 'GetSVG',
        value: function GetSVG() {
            return this.element.find('svg')[0];
        }

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
        *                 Animators
        * * * * * * * * * * * * * * * * * * * * * * * */

    }, {
        key: 'DrawMainText',
        value: function DrawMainText() {
            this._ingredients = this.SplitText(this._ingredients);
            var fill = this.colorfill;
            if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                fill = this._ingredients.color_tag == 'dark_bg' ? this.colorbg : '#ffffff';
            }
            var svg = SVG(this.element.find('svg')[0]);

            var easysvg = new window.EasySVG();
            easysvg.setFont(this.svgfonts.main_text);
            easysvg.setFontColor(fill);
            easysvg.setFontSize(parseInt(this._ingredients.main_text.size));
            easysvg.setLetterSpacing(this._ingredients.main_text.letter_spacing);
            easysvg.addText(this._ingredients.main_text.text);

            this._logo.main_text = {};
            this._logo.main_text = svg.group();
            this._logo.main_text.svg(easysvg.asXML(true));
            this._logo.main_text.attr('rel', 'mainfill').attr('name', 'main_text').attr('xmlns:name', 'mainText_mainfill');
            this._logo.main_text.h = this._logo.main_text.bbox().h;
            this._logo.main_text.w = this._logo.main_text.bbox().w;

            if (window.activelogo && window.ineditlogo) {
                if (window.activelogo._ingredients.main_text.font != this._ingredients.main_text.font) {
                    var c_dem = window.ineditlogo._logo.main_text;
                    var v_dem = this._logo.main_text;
                    var limit = 0;
                    while (c_dem.w + 5 < v_dem.w || c_dem.w - 5 > v_dem.w) {
                        if (c_dem.w + 6 < v_dem.w) {
                            this._ingredients.main_text.size = this._ingredients.main_text.size * (c_dem.w / v_dem.w);
                        } else if (c_dem.w - 6 > v_dem.w) {
                            this._ingredients.main_text.size = this._ingredients.main_text.size + this._ingredients.main_text.size * (v_dem.w / c_dem.w);
                        }

                        this._logo.main_text.node.innerHTML = '';
                        easysvg.clearSVG();
                        easysvg.setFontSize(this._ingredients.main_text.size || 30);
                        easysvg.addText(this._ingredients.main_text.text);
                        this._logo.main_text.svg(easysvg.asXML(true));

                        this._logo.main_text.w = this._logo.main_text.bbox().w;
                        this._logo.main_text.h = this._logo.main_text.bbox().h;
                        v_dem = this._logo.main_text;
                        limit++;
                        if (limit > 5) break;
                    }
                }
            }

            if (this._ingredients.layout.indexOf('multi') !== -1) {
                var _easysvg = new window.EasySVG();
                _easysvg.setFont(this.svgfonts.main_text);
                _easysvg.setFontColor(fill);
                _easysvg.setFontSize(parseInt(this._ingredients.main_text.size));
                _easysvg.setLetterSpacing(this._ingredients.main_text_2.letter_spacing);
                _easysvg.addText(this._ingredients.main_text_2.text);

                this._logo.main_text_2 = {};
                this._logo.main_text_2 = svg.group();
                this._logo.main_text_2.svg(_easysvg.asXML(true));
                this._logo.main_text_2.attr('rel', 'mainfill').attr('name', 'main_text_2').attr('xmlns:name', 'mainText2_mainfill');
                this._logo.main_text_2.h = this._logo.main_text_2.bbox().h;
                this._logo.main_text_2.w = this._logo.main_text_2.bbox().w;
            }

            //draw slogan
            if (this._ingredients.company.company_slogan) {
                var slogan_font = SVG(this.element.find('svg')[0]);

                var _easysvg2 = new window.EasySVG();
                _easysvg2.setFont(this.svgfonts.slogan_text);
                _easysvg2.setFontColor(fill);
                _easysvg2.setFontSize(this._ingredients.slogan_text.size);
                _easysvg2.setLetterSpacing(this._ingredients.slogan_text.letter_spacing);
                _easysvg2.addText(this._ingredients.company.company_slogan.replace(/\\"/g, '"'));
                var svgfont = _easysvg2.asXML(true);
                this._logo.slogan_text = {};
                this._logo.slogan_text = svg.group();
                this._logo.slogan_text.svg(svgfont);
                this._logo.slogan_text.attr('rel', 'mainfill').attr('name', 'slogan_text').attr('xmlns:name', 'sloganText_mainfill');
                this._logo.slogan_text.h = this._logo.slogan_text.bbox().h;
                this._logo.slogan_text.w = this._logo.slogan_text.bbox().w;

                if (window.activelogo && window.ineditlogo) {
                    if (window.activelogo._ingredients.slogan_text.font != this._ingredients.slogan_text.font) {
                        var cs_dem = window.ineditlogo._logo.slogan_text;
                        var vs_dem = this._logo.slogan_text;
                        var _limit = 0;
                        while (cs_dem.w + 5 < vs_dem.w || cs_dem.w - 5 > vs_dem.w) {
                            if (cs_dem.w + 6 < vs_dem.w) {
                                this._ingredients.slogan_text.size = this._ingredients.slogan_text.size * (cs_dem.w / vs_dem.w);
                            } else if (cs_dem.w - 6 > vs_dem.w) {
                                this._ingredients.slogan_text.size = this._ingredients.slogan_text.size + this._ingredients.slogan_text.size * (vs_dem.w / cs_dem.w);
                            }

                            this._logo.slogan_text.node.innerHTML = '';
                            _easysvg2.clearSVG();
                            _easysvg2.setFontSize(this._ingredients.slogan_text.size);
                            _easysvg2.addText(this._ingredients.company.company_slogan.replace(/\\"/g, '"'));
                            this._logo.slogan_text.svg(_easysvg2.asXML(true));

                            this._logo.slogan_text.w = this._logo.slogan_text.bbox().w;
                            this._logo.slogan_text.h = this._logo.slogan_text.bbox().h;
                            vs_dem = this._logo.slogan_text;
                            _limit++;
                            if (_limit > 5) break;
                        }
                    }
                }
            }
        }
    }, {
        key: 'DrawSymbol',
        value: function DrawSymbol() {
            var _this = this;
            var cwidth = this.element.width();
            var cheight = this.element.height();
            var fill = this.colorfill;
            if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                fill = this._ingredients.color_tag == 'dark_bg' ? this.colorbg : '#ffffff';
            }

            var symbol_path = this._ingredients.symbol.path ? this._ingredients.symbol.path : $(window.assets.symbols[0].svg).html(); //JSON.parse(JSON.stringify(this._ingredients.symbol.path));
            // symbol_path = symbol_path.replace(/\\"/g,'"').replace(/[\r\n]/g,'');
            symbol_path = symbol_path.replace(/#([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])/g, this.colorfill);
            var symbol = SVG(_this.element.find('svg')[0]);

            this._logo.symbol = {};
            this._logo.symbol = symbol.group();
            this._logo.symbol.svg(symbol_path).fill(fill);
            this._logo.symbol.attr('rel', 'mainfill').attr('name', 'symbol').attr('xmlns:name', 'symbol_mainfill');
        }
    }, {
        key: 'DrawTextSymbol',
        value: function DrawTextSymbol() {
            var fill = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this = this;
            var svg = SVG(this.element.find('svg')[0]);
            var colorfill = fill ? fill : this.colorfill;
            var size = this._ingredients.monogram.size;
            this._ingredients.monogram.size = this._ingredients.monogram.size ? this._ingredients.monogram.size : 90;
            if (this._ingredients.layout.indexOf('text_with_text_in_symbol') !== -1) {
                size = parseInt(size * 0.66);
            }
            var easysvg = new window.EasySVG();
            easysvg.setFont(this.svgfonts.monogram);
            easysvg.setFontColor(colorfill);
            easysvg.setFontSize(size);
            easysvg.setLetterSpacing(0);
            easysvg.addText(this._ingredients.monogram.text);
            var svgfont = easysvg.asXML(true);

            this._logo.symbol = {};
            this._logo.symbol = svg.group();
            this._logo.symbol.svg(svgfont);
            if (fill !== false) {
                this._logo.symbol.attr('rel', 'symbolfill').attr('name', 'monogram').attr('xmlns:name', 'monogram_symbolfill');
            } else {
                this._logo.symbol.attr('rel', 'mainfill').attr('name', 'monogram').attr('xmlns:name', 'monogram_mainfill');
            }
        }
    }, {
        key: 'DrawTextInSymbol',
        value: function DrawTextInSymbol() {
            var svg = SVG(this.element.find('svg')[0]);
            //get symbol container
            var container = this._ingredients.monogram_container.path;
            this._logo.monogram_container = {};
            this._logo.monogram_container = svg.group();
            this._logo.monogram_container.svg(container).fill(this.colorfill);
            this._logo.monogram_container.attr('transform', 'translate(0,0) scale(1)').attr('rel', 'inversefill').attr('name', 'monogram_container').attr('xmlns:name', 'monogram_container_inversefill');

            this.DrawTextSymbol(this.colorbg);
        }
    }, {
        key: 'DrawTextWithOutlineContainer',
        value: function DrawTextWithOutlineContainer() {
            var _this = this;
            var svg = SVG(this.element.find('svg')[0]);
            var container = this._ingredients.container.path;
            container = container.replace(/#([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])/g, this.colorfill);

            this._logo.container = {};
            this._logo.container = svg.group();
            this._logo.container.svg(container).fill(this.colorfill);
            this._logo.container.attr('transform', 'translate(0,0) scale(1)').attr('rel', 'mainfill').attr('name', 'outline_container').attr('xmlns:name', 'outlineContainer_mainfill');
        }
    }, {
        key: 'DrawTextWithFilledContainer',
        value: function DrawTextWithFilledContainer() {
            var _this = this;
            var svg = SVG(_this.element.find('svg')[0]);
            var container = this._ingredients.container.path;
            var fill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;

            container = container.replace(/#([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])/g, fill);
            this._logo.container = {};
            this._logo.container = svg.group();
            this._logo.container.svg(container).fill(fill);
            this._logo.container.attr('transform', 'translate(0,0) scale(1)').attr('rel', 'inversefill').attr('name', 'filled_container').attr('xmlns:name', 'filledContainer_inversefill');
        }

        //HELPERS

    }, {
        key: 'SplitText',
        value: function SplitText(ingredients) {
            var DELIMITER = ' ';
            var splitValue = Math.ceil(ingredients.company.company_name.split(DELIMITER).length / 2);

            if (ingredients.layout.indexOf('multi') !== -1) {
                if (!ingredients.mult_text_2) {
                    ingredients.main_text_2 = { font: ingredients.main_text.font, text: '', letter_spacing: ingredients.main_text.letter_spacing, size: ingredients.main_text.size, color: '#ffffff', block: true, alignment: 'center', y_offset: 0, x_offset: 0 };
                }
                ingredients.main_text = Object.assign({}, ingredients.main_text, {
                    text: ingredients.company.company_name.split(DELIMITER).splice(0, splitValue).join(DELIMITER)
                });

                ingredients.main_text_2 = Object.assign({}, ingredients.main_text_2, {
                    text: ingredients.company.company_name.split(DELIMITER).splice(splitValue, splitValue).join(DELIMITER)
                });

                // const lowerCaseMainFontNoSpaces = toStripedFontName(ingredients.main_text.font);
                // const fontsOfSameFamily = context.fontFamilyDictionary[lowerCaseMainFontNoSpaces];

                // if (fontsOfSameFamily && Object.keys(fontsOfSameFamily).length > 1) {
                //     const fontsOfLowerWeightByAtLeast200 = Object
                //         .values(fontsOfSameFamily)
                //         .filter(font => ingredients.main_text.meta.weight - 200 >= font.weight);

                //     if (fontsOfLowerWeightByAtLeast200.length > 0) {
                //         const chosenFont = pickRandomFromArray(fontsOfLowerWeightByAtLeast200);

                //         ingredients.main_text_2 = {
                //             ...ingredients.main_text_2,
                //             font: chosenFont.font,
                //             meta: {...chosenFont}
                //         };

                //         context.hasSameMultiTextFont = true;
                //     }
                // }
            } else {
                ingredients.main_text = Object.assign({}, ingredients.main_text, {
                    text: ingredients.company.company_name
                });
            }
            return ingredients;
        }
    }, {
        key: 'PositionElements',
        value: function PositionElements(layout, data) {
            var _this14 = this;

            var _this = this;

            $(this.element).removeClass('loading');
            //scale for font and slogan variations
            //this.CheckSloganVariation();

            switch (layout) {
                case 'plain_text':
                    this.DrawMainText();
                    this.PlainTextLayout();
                    break;

                case 'multi_text':
                    this.DrawMainText();
                    this.MultiTextLayout();
                    break;

                case 'text_with_symbol':
                    try {
                        this.DrawMainText();
                        //this.CheckMainVariation();
                        this.DrawSymbol();
                        this.TextWithSymbolLayout();
                    } catch (err) {
                        console.log('Err drawing text symbol', err);
                        throw err;
                    }
                    break;
                case 'multi_text_with_symbol':
                    this.DrawMainText();
                    this.DrawSymbol();
                    this.MultiTextWithSymbolLayout();
                    break;

                case 'text_with_text_as_symbol':
                    try {
                        this.DrawMainText();
                        this.DrawTextSymbol();
                        this.TextWithSymbolLayout();
                    } catch (err) {
                        console.log('Err drawing text with text as symbol', err);
                        throw err;
                    }
                    break;
                case 'multi_text_with_text_as_symbol':
                    this.DrawMainText();
                    this.DrawTextSymbol();
                    this.MultiTextWithSymbolLayout();
                    break;

                case 'multi_text_with_text_in_symbol':
                case 'text_with_text_in_symbol':
                    if (this._ingredients.monogram_container && this._ingredients.monogram_container.path) {
                        this._ingredients.monogram_container.path = this._ingredients.monogram_container.path.replace(/\\"/g, '"');
                        this.DrawMainText();
                        this.DrawTextInSymbol();
                        this.TextWithTextInSymbolLayout();
                    } else {
                        fetch(window.APIURL + '/generatordata/symbolcontainer/' + this.symbolcontainer.id, {
                            headers: new Headers({
                                'Authorization': 'JWT ' + window.state.token,
                                'Content-Type': 'application/json'
                            })
                        }).then(function (response) {
                            response.json().then(function (res) {
                                _this14._ingredients.monogram_container = { path: null, scale: 0 };
                                _this14._ingredients.monogram_container.path = $(res.data.src.replace(/\\"/g, '"'))[0].innerHTML;
                                _this14._ingredients.monogram_container.x_offset = res.data.x_offset;
                                _this14._ingredients.monogram_container.y_offset = res.data.y_offset;
                                _this14.DrawMainText();
                                _this14.DrawTextInSymbol();
                                _this14.TextWithTextInSymbolLayout();
                            });
                        }).catch(function (err) {
                            console.log('Error:', err);
                        });
                    }
                    break;

                case 'text_with_outline_container':
                    if (this._ingredients.container && this._ingredients.container.path) {
                        this._ingredients.container.path = this._ingredients.container.path.replace(/\\"/g, '"');
                        this.DrawMainText();
                        this.DrawTextWithOutlineContainer();
                        this.TextWithOutlineContainer();
                        break;
                    } else {
                        fetch(window.APIURL + '/generatordata/container/' + this.container.id, {
                            headers: new Headers({
                                'Authorization': 'JWT ' + window.state.token,
                                'Content-Type': 'application/json'
                            })
                        }).then(function (response) {
                            response.json().then(function (res) {
                                _this14._ingredients.container = { path: null, scale: 0 };
                                _this14._ingredients.container.path = $(res.data.src.replace(/\\"/g, '"'))[0].innerHTML;
                                _this14.DrawMainText();
                                _this14.DrawTextWithOutlineContainer();
                                _this14.TextWithOutlineContainer();
                            });
                        }).catch(function (err) {
                            console.log('Error:', err);
                        });
                    }
                    break;
                case 'text_with_filled_container':
                    if (this._ingredients.container && this._ingredients.container.path) {
                        this._ingredients.container.path = this._ingredients.container.path.replace(/\\"/g, '"');

                        this.DrawTextWithFilledContainer();
                        this.DrawMainText();
                        this.TextWithFilledContainer();
                    } else {
                        fetch(window.APIURL + '/generatordata/container/' + this.container.id, {
                            headers: new Headers({
                                'Authorization': 'JWT ' + window.state.token,
                                'Content-Type': 'application/json'
                            })
                        }).then(function (response) {
                            response.json().then(function (res) {
                                _this14._ingredients.container = { path: null, scale: 0 };
                                _this14._ingredients.container.path = $(res.data.src.replace(/\\"/g, '"'))[0].innerHTML;
                                _this14.DrawTextWithFilledContainer();
                                _this14.DrawMainText();
                                _this14.TextWithFilledContainer();
                            });
                        }).catch(function (err) {
                            console.log('Error:', err);
                        });
                    }
                    break;
                case 'text_and_symbol_with_outline_container':
                    if (this._ingredients.container && this._ingredients.container.path) {
                        this._ingredients.container.path = this._ingredients.container.path.replace(/\\"/g, '"');
                        this.DrawMainText();
                        this.DrawSymbol();
                        this.DrawTextWithOutlineContainer();
                        this.TextAndSymbolWithOutlineContainer();
                    } else {
                        fetch(window.APIURL + '/generatordata/container/' + this.container.id, {
                            headers: new Headers({
                                'Authorization': 'JWT ' + window.state.token,
                                'Content-Type': 'application/json'
                            })
                        }).then(function (response) {
                            response.json().then(function (res) {
                                _this14._ingredients.container = { path: null, scale: 0 };
                                _this14._ingredients.container.path = $(res.data.src.replace(/\\"/g, '"'))[0].innerHTML;
                                _this14.DrawMainText();
                                _this14.DrawSymbol();
                                _this14.DrawTextWithOutlineContainer();
                                _this14.TextAndSymbolWithOutlineContainer();
                            });
                        }).catch(function (err) {
                            console.log('Error:', err);
                        });
                    }
                    break;
                case 'text_and_symbol_with_filled_container':
                    if (this._ingredients.container && this._ingredients.container.path) {
                        this._ingredients.container.path = this._ingredients.container.path.replace(/\\"/g, '"');
                        this.DrawTextWithFilledContainer();
                        this.DrawMainText();
                        this.DrawSymbol();
                        this.TextAndSymbolWithFilledContainer();
                    } else {
                        fetch(window.APIURL + '/generatordata/container/' + this.container.id, {
                            headers: new Headers({
                                'Authorization': 'JWT ' + window.state.token,
                                'Content-Type': 'application/json'
                            })
                        }).then(function (response) {
                            response.json().then(function (res) {
                                _this14._ingredients.container = { path: null, scale: 0 };
                                _this14._ingredients.container.path = $(res.data.src.replace(/\\"/g, '"'))[0].innerHTML;
                                _this14.DrawTextWithFilledContainer();
                                _this14.DrawMainText();
                                _this14.DrawSymbol();
                                _this14.TextAndSymbolWithFilledContainer();
                            });
                        }).catch(function (err) {
                            console.log('Error:', err);
                        });
                    }
                    break;
                default:
                    this.DrawMainText();
                    this.PlainTextLayout();
                    break;

            }
        }
    }, {
        key: 'PlainTextLayout',
        value: function PlainTextLayout(cwidth, cheight) {
            var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            //create boxs, if there is no slogan text, make a 0d box
            var main_text_box = this._logo.main_text.bbox(),
                slogan_text_box = { h: 0, w: 0, y: 0 };
            if (this._ingredients.company.company_slogan) {
                slogan_text_box = this._logo.slogan_text.bbox();
            }

            if (!cwidth) cwidth = main_text_box.w > slogan_text_box.w ? main_text_box.w : slogan_text_box.w;
            if (!cheight) cheight = main_text_box.h + slogan_text_box.h + 16;

            //define x,y coordinate
            var ygap = (cheight - main_text_box.h - slogan_text_box.h) / 2;
            var mx = (cwidth - main_text_box.w) / 2 - main_text_box.x;
            var my = ygap - main_text_box.y;
            var sx = (cwidth - slogan_text_box.w) / 2 - slogan_text_box.x;
            var sy = ygap + main_text_box.h - slogan_text_box.y + 8;

            if (translate) {
                this._logo.main_text.attr('transform', 'translate(' + mx + ',' + my + ')');
                if (slogan_text_box.h) this._logo.slogan_text.attr('transform', 'translate(' + sx + ',' + sy + ')');
            }
            this.element.find('svg').attr('height', cheight);
            this.element.find('svg').attr('width', cwidth);

            if (cwidth > 470 || cheight > 355) {
                var svg = this.element.find('svg')[0];
                $(svg).attr('viewBox', '0 0 ' + cwidth + ' ' + cheight);
            }

            this._ingredients.svg = {};
            this._ingredients.svg.height = cheight;
            this._ingredients.svg.width = cwidth;
        }
    }, {
        key: 'MultiTextLayout',
        value: function MultiTextLayout(cWidth, cHeight) {
            var translate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var context = this;
            var mainTextBox = context._logo.main_text.bbox();
            var mainTextBox2 = context._logo.main_text_2.bbox();
            var mainTextBox2Buffer = 10;
            var sloganTextBox = { h: 0, w: 0, y: 0 };
            var sloganBuffer = 0;

            if (context._ingredients.company.company_slogan) {
                sloganTextBox = context._logo.slogan_text.bbox();
                sloganBuffer = 20;
            }

            var yGap = void 0;
            var xGap = void 0;
            var mx = void 0;
            var my = void 0;
            var m2x = void 0;
            var m2y = void 0;
            var sx = void 0;
            var sy = void 0;

            if (!context._ingredients.main_text_2.block) {
                if (!cWidth) {
                    cWidth = Math.max(mainTextBox.w + mainTextBox2.w + mainTextBox2Buffer, sloganTextBox.w);
                }

                if (!cHeight) {
                    cHeight = Math.max(mainTextBox.h, mainTextBox2.h) + sloganTextBox.h + sloganBuffer;
                }

                yGap = (cHeight - Math.max(mainTextBox.h, mainTextBox2.h) - sloganTextBox.h - sloganBuffer) / 2;
                xGap = (cWidth - Math.max(mainTextBox.w + mainTextBox2.w + mainTextBox2Buffer, sloganTextBox.w)) / 2;
                mx = xGap - mainTextBox.x;
                my = (cHeight - mainTextBox.h) / 2 - mainTextBox.y;
                m2x = xGap + mainTextBox.w - mainTextBox2.x + mainTextBox2Buffer;
                m2y = (cHeight - mainTextBox2.h) / 2 - mainTextBox2.y;
                sx = (cWidth - sloganTextBox.w) / 2 - sloganTextBox.x;
                sy = yGap + mainTextBox.h + mainTextBox2.h - sloganTextBox.y + sloganBuffer;
            } else {
                if (!cWidth) {
                    cWidth = Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w);
                }

                if (!cHeight) {
                    cHeight = mainTextBox.h + mainTextBox2.h + sloganTextBox.h + sloganBuffer + mainTextBox2Buffer;
                }

                yGap = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - mainTextBox2Buffer - sloganBuffer) / 2;
                xGap = (cWidth - Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w)) / 2;
                mx = (cWidth - mainTextBox.w) / 2 - mainTextBox.x;
                my = yGap - mainTextBox.y;
                //second text alignment
                if (context._ingredients.main_text_2.alignment === 'left') {
                    m2x = (cWidth - mainTextBox.w) / 2 - mainTextBox2.x;
                    m2y = yGap + mainTextBox.h - mainTextBox2.y + mainTextBox2Buffer;
                } else {
                    m2x = (cWidth - mainTextBox2.w) / 2 - mainTextBox2.x;
                    m2y = yGap + mainTextBox.h - mainTextBox2.y + mainTextBox2Buffer;
                }

                sx = (cWidth - sloganTextBox.w) / 2 - sloganTextBox.x;
                sy = yGap + mainTextBox.h + mainTextBox2.h - sloganTextBox.y + sloganBuffer;
            }

            if (translate) {
                context._logo.main_text.attr('transform', 'translate(' + mx + ', ' + my + ')');
                context._logo.main_text_2.attr('transform', 'translate(' + m2x + ', ' + m2y + ')');

                if (sloganTextBox.h) {
                    context._logo.slogan_text.attr('transform', 'translate(' + sx + ', ' + sy + ')');
                }
            }

            context.element.find('svg').attr('height', cHeight);
            context.element.find('svg').attr('width', cWidth);

            if (cWidth > 470 || cHeight > 355) {
                var svg = context.element.find('svg')[0];
                $(svg).attr('viewBox', '0 0 ' + cWidth + ' ' + cHeight);
            }

            context._ingredients.svg = {};
            context._ingredients.svg.height = cHeight;
            context._ingredients.svg.width = cWidth;
        }
    }, {
        key: 'TextWithSymbolLayout',
        value: function TextWithSymbolLayout(cwidth, cheight) {
            //get parent container dimensions

            //create boxs, if there is no slogan text, make a 0d box
            var main_text_box = this._logo.main_text.bbox(),
                slogan_text_box = { h: 0, w: 0, y: 0 },
                symbol_box = this._logo.symbol.bbox(),
                buffer = 0;
            if (this._ingredients.company.company_slogan) {
                slogan_text_box = this._logo.slogan_text.bbox();buffer = 10;
            }

            //define x,y coordinate
            var xgap = void 0,
                ygap = void 0,
                my = void 0,
                mx = void 0,
                sx = void 0,
                sy = void 0,
                symx = void 0,
                symy = void 0,
                scale = void 0;

            //calcute text offsets
            var main_text_y_offset = this._ingredients.main_text.y_offset || 0,
                slogan_text_y_offset = this._ingredients.slogan_text.y_offset || 0;

            // if(!this._ingredients.symbol.scale){
            //     if(window.ineditlogo._logo.symbol){
            //         scale = symbol_box
            //     }
            // }
            if (this._ingredients.symbol.alignment == 'left' || this._ingredients.monogram.alignment == 'left') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = (main_text_box.w > slogan_text_box.w ? main_text_box.w : slogan_text_box.w) + symbol_box.w * scale + 15;
                if (!cheight) cheight = symbol_box.h * scale > main_text_box.h + slogan_text_box.h + main_text_y_offset + slogan_text_y_offset + buffer ? symbol_box.h * scale : main_text_box.h + slogan_text_box.h + main_text_y_offset + slogan_text_y_offset + buffer;
                xgap = (cwidth - Math.max(main_text_box.w, slogan_text_box.w) - symbol_box.w * scale - 15) / 2;
                symx = xgap - symbol_box.x * scale; //xgap - (symbol_box.x * scale);
                symy = (cheight - symbol_box.h * scale) / 2 - symbol_box.y * scale;
                mx = xgap + symbol_box.w * scale - main_text_box.x + 15;
                my = (cheight - main_text_box.h - slogan_text_box.h + main_text_y_offset - buffer) / 2 - main_text_box.y;
                sy = (cheight - main_text_box.h - slogan_text_box.h + slogan_text_y_offset - buffer) / 2 + main_text_box.h - slogan_text_box.y + buffer;
                sx = xgap + symbol_box.w * scale - slogan_text_box.x + 15;
            } else if (this._ingredients.symbol.alignment == 'right' || this._ingredients.monogram.alignment == 'right') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = Math.max(main_text_box.w, slogan_text_box.w) + symbol_box.w * scale + 15;
                if (!cheight) cheight = symbol_box.h * scale > main_text_box.h + slogan_text_box.h + main_text_y_offset + slogan_text_y_offset + buffer ? symbol_box.h * scale : main_text_box.h + slogan_text_box.h + main_text_y_offset + slogan_text_y_offset + buffer;
                xgap = (cwidth - Math.max(main_text_box.w, slogan_text_box.w) - symbol_box.w * scale - 15) / 2;
                mx = xgap - main_text_box.x;
                my = (cheight - main_text_box.h - slogan_text_box.h + main_text_y_offset - buffer) / 2 - main_text_box.y;
                sy = (cheight - main_text_box.h - slogan_text_box.h + slogan_text_y_offset - buffer) / 2 + main_text_box.h - slogan_text_box.y + buffer;
                sx = xgap - slogan_text_box.x;
                symx = xgap + (main_text_box.w > slogan_text_box.w ? main_text_box.w : slogan_text_box.w) + 15 - symbol_box.x * scale;
                symy = (cheight - symbol_box.h * scale) / 2 - symbol_box.y * scale;
            } else if (this._ingredients.symbol.alignment == 'bottom' || this._ingredients.monogram.alignment == 'bottom') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';
                if (!cwidth) {
                    cwidth = main_text_box.w > slogan_text_box.w ? main_text_box.w : slogan_text_box.w;
                    cwidth = cwidth > symbol_box.w * scale ? cwidth : symbol_box.w * scale;
                }
                if (!cheight) cheight = symbol_box.h * scale + main_text_box.h + slogan_text_box.h + 15 + buffer;

                ygap = (cheight - symbol_box.h * scale - main_text_box.h - slogan_text_box.h - 15 - buffer) / 2;
                mx = (cwidth - main_text_box.w) / 2 - main_text_box.x;
                my = ygap - main_text_box.y;
                sx = (cwidth - slogan_text_box.w) / 2 - slogan_text_box.x;
                sy = ygap + main_text_box.h + buffer;
                symx = (cwidth - symbol_box.w * scale) / 2 - symbol_box.x * scale;
                symy = ygap + main_text_box.h + slogan_text_box.h - symbol_box.y * scale + 15 + buffer;
            } else {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';
                if (!cwidth) {
                    cwidth = main_text_box.w > slogan_text_box.w ? main_text_box.w : slogan_text_box.w;
                    cwidth = cwidth > symbol_box.w * scale ? cwidth : symbol_box.w * scale;
                }

                if (!cheight) cheight = symbol_box.h * scale + main_text_box.h + slogan_text_box.h + 15 + buffer;

                ygap = (cheight - symbol_box.h * scale - main_text_box.h - slogan_text_box.h - 15 - buffer) / 2;
                symx = (cwidth - symbol_box.w * scale) / 2 - symbol_box.x * scale;
                symy = ygap - symbol_box.y * scale;
                mx = (cwidth - main_text_box.w) / 2 - main_text_box.x;
                my = ygap + symbol_box.h * scale - main_text_box.y + 15;
                sx = (cwidth - slogan_text_box.w) / 2 - slogan_text_box.x;
                sy = ygap + symbol_box.h * scale + main_text_box.h - slogan_text_box.y + 15 + buffer;
            }
            this._ingredients.symbol.scale = scale;

            this._ingredients.symbol.h = symbol_box.h * scale;
            this._ingredients.symbol.w = symbol_box.w * scale;
            this._ingredients.symbol.x = symbol_box.x * scale;
            this._ingredients.symbol.y = symbol_box.y * scale;

            this._logo.main_text.attr('transform', 'translate(' + mx + ',' + my + ')');
            if (slogan_text_box.h) this._logo.slogan_text.attr('transform', 'translate(' + sx + ',' + sy + ')');
            this._logo.symbol.attr('transform', 'translate(' + symx + ',' + symy + ') scale(' + this._ingredients.symbol.scale + ')');

            this.PlainTextLayout(cwidth, cheight, false);
        }
    }, {
        key: 'MultiTextWithSymbolLayout',
        value: function MultiTextWithSymbolLayout(cwidth, cheight) {
            //get parent container dimensions

            //create boxs, if there is no slogan text, make a 0d box
            var main_text_box = this._logo.main_text.bbox(),
                main_text_box2 = this._logo.main_text_2.bbox(),
                slogan_text_box = { h: 0, w: 0, y: 0 },
                symbol_box = this._logo.symbol.bbox(),
                buffer = 0;
            if (this._ingredients.company.company_slogan) {
                slogan_text_box = this._logo.slogan_text.bbox();buffer = 15;
            }

            //define x,y coordinate
            var xgap = void 0,
                ygap = void 0,
                my = void 0,
                mx = void 0,
                m2y = void 0,
                m2x = void 0,
                sx = void 0,
                sy = void 0,
                symx = void 0,
                symy = void 0,
                scale = void 0;

            //calcute text offsets
            var main_text_y_offset = this._ingredients.main_text.y_offset || 0,
                slogan_text_y_offset = this._ingredients.slogan_text.y_offset || 0;

            if (this._ingredients.symbol.alignment == 'left' || this._ingredients.monogram.alignment == 'left') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = Math.max(main_text_box.w, main_text_box2.w, slogan_text_box.w) + symbol_box.w * scale + 15;
                if (!cheight) cheight = Math.max(symbol_box.h * scale, main_text_box.h + main_text_box2.h + slogan_text_box.h + 10 + buffer);

                mx = 0 - main_text_box.x + symbol_box.w * scale + 15;
                my = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 - main_text_box.y;
                m2x = 0 - main_text_box2.x + symbol_box.w * scale + 15;
                m2y = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 + main_text_box.h + 10 - main_text_box2.y;
                sx = 0 - slogan_text_box.x + symbol_box.w * scale + 15;
                sy = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 + main_text_box.h + main_text_box2.h - slogan_text_box.y + 10 + buffer;
                symx = 0 - symbol_box.x * scale;
                symy = (cheight - symbol_box.h * scale) / 2 - symbol_box.y * scale;
            } else if (this._ingredients.symbol.alignment == 'right' || this._ingredients.monogram.alignment == 'right') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = Math.max(main_text_box.w, main_text_box2.w, slogan_text_box.w) + symbol_box.w * scale + 15;
                if (!cheight) cheight = Math.max(symbol_box.h * scale, main_text_box.h + main_text_box2.h + slogan_text_box.h + 10 + buffer);

                mx = cwidth - symbol_box.w * scale - 15 - main_text_box.w - main_text_box.x;
                my = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 - main_text_box.y;
                m2x = cwidth - symbol_box.w * scale - 15 - main_text_box2.w - main_text_box2.x;
                m2y = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 + main_text_box.h + 10 - main_text_box2.y;
                sx = cwidth - symbol_box.w * scale - 15 - slogan_text_box.w - slogan_text_box.x;
                sy = (cheight - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - buffer) / 2 + main_text_box.h + main_text_box2.h - slogan_text_box.y + 10 + buffer;
                symx = cwidth - symbol_box.w * scale - symbol_box.x * scale;
                symy = (cheight - symbol_box.h * scale) / 2 - symbol_box.y * scale;

                //remove offset errors
            } else if (this._ingredients.symbol.alignment == 'bottom' || this._ingredients.monogram.alignment == 'bottom') {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = Math.max(main_text_box.w, main_text_box2.w, slogan_text_box.w, symbol_box.w * scale);
                if (!cheight) cheight = symbol_box.h * scale + main_text_box.h + main_text_box2.h + slogan_text_box.h + 15 + 15 + buffer;

                ygap = (cheight - symbol_box.h * scale - main_text_box.h - main_text_box2.h - slogan_text_box.h - 10 - 15 - buffer) / 2;
                mx = (cwidth - main_text_box.w) / 2 - main_text_box.x;
                my = ygap - main_text_box.y;
                m2x = (cwidth - main_text_box2.w) / 2 - main_text_box2.x;
                m2y = ygap + main_text_box.h - main_text_box2.y + 10;
                sx = (cwidth - slogan_text_box.w) / 2 - slogan_text_box.x;
                sy = ygap + main_text_box.h + main_text_box2.h + 10 + buffer;
                symx = (cwidth - symbol_box.w * scale) / 2 - symbol_box.x * scale;
                symy = ygap + main_text_box.h + main_text_box2.h + slogan_text_box.h - symbol_box.y * scale + 15 + 10 + buffer;
            } else {
                if (this._ingredients.layout != 'text_with_text_in_symbol' && this._ingredients.layout != 'text_with_text_as_symbol' && this._ingredients.layout != 'multi_text_with_text_as_symbol') {
                    scale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
                } else {
                    scale = 1;
                }
                if (!Number.isFinite(scale)) throw 'Element not in View';

                if (!cwidth) cwidth = Math.max(main_text_box.w, main_text_box2.w, slogan_text_box.w, symbol_box.w * scale);
                if (!cheight) cheight = symbol_box.h * scale + main_text_box.h + main_text_box2.h + slogan_text_box.h + 15 + 15 + buffer;

                ygap = (cheight - symbol_box.h * scale - main_text_box.h - main_text_box2.h - slogan_text_box.h - 15 - 10 - buffer) / 2;
                symx = (cwidth - symbol_box.w * scale) / 2 - symbol_box.x * scale;
                symy = 0 - symbol_box.y * scale;
                mx = (cwidth - main_text_box.w) / 2 - main_text_box.x;
                my = 0 + symbol_box.h * scale - main_text_box.y + 15;
                m2x = (cwidth - main_text_box2.w) / 2 - main_text_box2.x;
                m2y = 0 + symbol_box.h * scale + main_text_box.h + 15 - main_text_box2.y + 10;
                sx = (cwidth - slogan_text_box.w) / 2 - slogan_text_box.x;
                sy = 0 + symbol_box.h * scale + main_text_box.h + main_text_box2.h - slogan_text_box.y + 15 + 10 + buffer;
            }

            this._ingredients.symbol.scale = scale;

            this._ingredients.symbol.h = symbol_box.h * scale;
            this._ingredients.symbol.w = symbol_box.w * scale;
            this._ingredients.symbol.x = symbol_box.x * scale;
            this._ingredients.symbol.y = symbol_box.y * scale;

            this._logo.main_text.attr('transform', 'translate(' + mx + ',' + my + ')');
            this._logo.main_text_2.attr('transform', 'translate(' + m2x + ',' + m2y + ')');
            if (slogan_text_box.h) this._logo.slogan_text.attr('transform', 'translate(' + sx + ',' + sy + ')');
            this._logo.symbol.attr('transform', 'translate(' + symx + ',' + symy + ') scale(' + this._ingredients.symbol.scale + ')');

            this.MultiTextLayout(cwidth, cheight, false);
        }
    }, {
        key: 'TextWithTextInSymbolLayout',
        value: function TextWithTextInSymbolLayout() {
            //create boxs, if there is no slogan text, make a 0d box
            var mainTextBox = this._logo.main_text.bbox(),
                mainTextBox2 = { h: 0, w: 0, y: 0 },
                sloganTextBox = { h: 0, w: 0, y: 0 },
                symbolBox = this._logo.symbol.bbox(),
                symbolBuffer = 15,
                textBuffer = 0,
                sloganBuffer = 0;
            if (this._ingredients.company.company_slogan) {
                sloganTextBox = this._logo.slogan_text.bbox();sloganBuffer = 10;
            }
            if (this._ingredients.layout.indexOf('multi') !== -1) {
                mainTextBox2 = this._logo.main_text_2.bbox();textBuffer = 10;sloganBuffer = 15;
            }
            var monogramContainerBox = this._logo.monogram_container.bbox();

            //define x,y coordinate
            var cWidth = void 0,
                cHeight = void 0,
                xgap = void 0,
                ygap = void 0,
                mcx = void 0,
                mcy = void 0,
                my = void 0,
                mx = void 0,
                m2y = void 0,
                m2x = void 0,
                sx = void 0,
                sy = void 0,
                symx = void 0,
                symy = void 0,
                sscale = void 0,
                mScale = void 0;
            this._ingredients.monogram_container.scale = mScale = this._ingredients.monogram_container.scale ? this._ingredients.monogram_container.scale : (symbolBox.h + 50) / monogramContainerBox.h;
            if (!Number.isFinite(mScale)) throw 'Element not in View';

            //calcute text offsets
            var main_text_y_offset = this._ingredients.main_text.y_offset || 0,
                slogan_text_y_offset = this._ingredients.slogan_text.y_offset || 0;

            if (this._ingredients.monogram.alignment == 'left') {
                cWidth = Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w) + monogramContainerBox.w * mScale + symbolBuffer;
                cHeight = Math.max(mainTextBox.h + mainTextBox2.h + sloganTextBox.h + textBuffer + sloganBuffer, monogramContainerBox.h * mScale);

                mcy = (cHeight - monogramContainerBox.h * mScale) / 2 - monogramContainerBox.x * mScale;
                mcx = 0 - monogramContainerBox.x * mScale;
                symx = 0 + (monogramContainerBox.w * mScale - symbolBox.w) / 2 - symbolBox.x + this._ingredients.monogram_container.x_offset * mScale;
                symy = mcy + (monogramContainerBox.h * mScale - symbolBox.h) / 2 - symbolBox.y + this._ingredients.monogram_container.y_offset * mScale;
                mx = monogramContainerBox.w * mScale - mainTextBox.x + symbolBuffer;
                my = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 - mainTextBox.y;
                m2x = monogramContainerBox.w * mScale - mainTextBox2.x + symbolBuffer;
                m2y = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 + mainTextBox.h + textBuffer - mainTextBox2.y;
                sx = monogramContainerBox.w * mScale - sloganTextBox.x + symbolBuffer;
                sy = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 + mainTextBox.h + mainTextBox2.h + textBuffer + sloganBuffer - sloganTextBox.y;
            } else if (this._ingredients.monogram.alignment == 'right') {
                cWidth = Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w) + monogramContainerBox.w * mScale + symbolBuffer;
                cHeight = Math.max(mainTextBox.h + mainTextBox2.h + sloganTextBox.h + textBuffer + sloganBuffer, monogramContainerBox.h * mScale);

                mx = 0 - mainTextBox.x;
                my = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 - mainTextBox.y;
                m2x = 0 - mainTextBox2.x;
                m2y = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 + mainTextBox.h + textBuffer - mainTextBox2.y;
                sx = 0 - sloganTextBox.x;
                sy = (cHeight - mainTextBox.h - mainTextBox2.h - sloganTextBox.h - textBuffer - sloganBuffer) / 2 + mainTextBox.h + mainTextBox2.h + textBuffer + sloganBuffer - sloganTextBox.y;
                mcy = (cHeight - monogramContainerBox.h * mScale) / 2 - monogramContainerBox.x * mScale;
                mcx = Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w) + symbolBuffer - monogramContainerBox.x * mScale;
                symx = Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w) + (monogramContainerBox.w * mScale - symbolBox.w) / 2 - symbolBox.x + this._ingredients.monogram_container.x_offset * mScale;
                symy = mcy + (monogramContainerBox.h * mScale - symbolBox.h) / 2 - symbolBox.y + this._ingredients.monogram_container.y_offset * mScale;
            } else if (this._ingredients.monogram.alignment == 'bottom') {
                cWidth = Math.max(Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w), monogramContainerBox.w * mScale);
                cHeight = monogramContainerBox.h * mScale + mainTextBox.h + mainTextBox2.h + sloganTextBox.h + textBuffer + sloganBuffer + symbolBuffer;
                //ygap  = ( cHeight - mainTextBox.h - sloganTextBox.h - (symbolBox.h  * scale) )/2 + 10;
                mx = (cWidth - mainTextBox.w) / 2 - mainTextBox.x;
                my = 0 + main_text_y_offset - mainTextBox.y;
                m2x = (cWidth - mainTextBox2.w) / 2 - mainTextBox.x;
                m2y = 0 + mainTextBox.h + textBuffer - mainTextBox.y;
                sx = (cWidth - sloganTextBox.w) / 2 - sloganTextBox.x;
                sy = 0 + mainTextBox.h + mainTextBox2.h + textBuffer + sloganBuffer - sloganTextBox.y;
                mcx = (cWidth - monogramContainerBox.w * mScale) / 2 - monogramContainerBox.x * mScale;
                mcy = mainTextBox.h + mainTextBox2.h + sloganTextBox.h + textBuffer + sloganBuffer + symbolBuffer - monogramContainerBox.y * mScale;
                symx = mcx + (monogramContainerBox.w * mScale - symbolBox.w) / 2 - symbolBox.x + this._ingredients.monogram_container.x_offset * mScale;
                symy = mcy + (monogramContainerBox.h * mScale - symbolBox.h) / 2 - symbolBox.y + this._ingredients.monogram_container.y_offset * mScale;
            } else {
                cWidth = Math.max(Math.max(mainTextBox.w, mainTextBox2.w, sloganTextBox.w), monogramContainerBox.w * mScale);
                cHeight = monogramContainerBox.h * mScale + mainTextBox.h + mainTextBox2.h + sloganTextBox.h + textBuffer + sloganBuffer + symbolBuffer;

                mcx = (cWidth - monogramContainerBox.w * mScale) / 2 - monogramContainerBox.x * mScale;
                mcy = 0;
                symx = mcx + (monogramContainerBox.w * mScale - symbolBox.w) / 2 - symbolBox.x + this._ingredients.monogram_container.x_offset * mScale;
                symy = mcy + (monogramContainerBox.h * mScale - symbolBox.h) / 2 - symbolBox.y + this._ingredients.monogram_container.y_offset * mScale;
                mx = (cWidth - mainTextBox.w) / 2 - mainTextBox.x;
                my = monogramContainerBox.h * mScale - mainTextBox.y + symbolBuffer;
                m2x = (cWidth - mainTextBox2.w) / 2 - mainTextBox.x;
                m2y = monogramContainerBox.h * mScale + mainTextBox.h + textBuffer + symbolBuffer - mainTextBox2.y;
                sx = (cWidth - sloganTextBox.w) / 2 - sloganTextBox.x;
                sy = monogramContainerBox.h * mScale + mainTextBox.h + mainTextBox2.h + textBuffer + sloganBuffer + symbolBuffer - sloganTextBox.y;
            }

            this._logo.main_text.attr('transform', 'translate(' + mx + ',' + my + ')');
            if (sloganTextBox.h) this._logo.slogan_text.attr('transform', 'translate(' + sx + ',' + sy + ')');
            if (mainTextBox2.h) this._logo.main_text_2.attr('transform', 'translate(' + m2x + ',' + m2y + ')');
            this._logo.monogram_container.attr('transform', 'translate(' + mcx + ',' + mcy + ') scale(' + this._ingredients.monogram_container.scale + ')');
            this._logo.symbol.attr('transform', 'translate(' + symx + ',' + symy + ')');

            this._ingredients.monogram_container.path = this._logo.monogram_container.node.innerHTML.replace(/[\r\n]/g, '');
            if (this._ingredients.layout.indexOf('multi') !== -1) {
                this.MultiTextLayout(cWidth, cHeight, false);
            } else {
                this.PlainTextLayout(cWidth, cHeight, false);
            }
        }
    }, {
        key: 'TextAndSymbolWithFilledContainer',
        value: function TextAndSymbolWithFilledContainer() {

            var main_text_box = this._logo.main_text.bbox(),
                slogan_text_box = { h: 0, w: 0, y: 0 },
                symbol_box = this._logo.symbol.bbox(),
                container_box = this._logo.container.bbox(),
                buffer = 10;
            if (this._ingredients.company.company_slogan) {
                slogan_text_box = this._logo.slogan_text.bbox();
            }

            var symscale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
            var symAlignment = this._ingredients.symbol.alignment || this._ingredients.monogram.alignment;

            var scale = this._ingredients.container.scale;
            if (!this._ingredients.container.scale) {
                scale = (main_text_box.w + 100) / container_box.w;
                // let hscale = (main_text_box.h + slogan_text_box.h + 100)/container_box.h;
                if (symAlignment == 'left' || symAlignment == 'right') {
                    scale = (main_text_box.w + symbol_box.w * symscale + 125) / container_box.w;
                } else if (symAlignment == 'top' || symAlignment == 'bottom') {
                    scale = (main_text_box.h + slogan_text_box.h + symbol_box.h * symscale + 125) / container_box.h;
                }

                if (main_text_box.w + 150 >= container_box.w * scale) scale = (main_text_box.w + 150) / container_box.w;
            }
            if (!Number.isFinite(scale)) throw 'Element not in View';

            var cwidth = container_box.w * scale;
            var cheight = container_box.h * scale;

            //console.log('sacle',scale,this._logo.container.node.innerHTML)
            var cx = 0;
            var cy = 0;

            var fill = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';
            this._logo.container.attr('transform', 'translate(' + cx + ',' + cy + ') scale(' + scale + ')');
            this._logo.main_text.fill(fill);
            if (this._logo.slogan_text) this._logo.slogan_text.fill(fill);

            this._ingredients.container = this._ingredients.container ? this._ingredients.container : {};
            this._ingredients.container.path = this._logo.container.node.innerHTML.replace(/[\r\n]/g, '');
            this._ingredients.container.scale = scale;

            this.TextWithSymbolLayout(cwidth, cheight);
        }
    }, {
        key: 'TextAndSymbolWithOutlineContainer',
        value: function TextAndSymbolWithOutlineContainer() {

            var main_text_box = this._logo.main_text.bbox(),
                slogan_text_box = { h: 0, w: 0, y: 0 },
                symbol_box = this._logo.symbol.bbox(),
                container_box = this._logo.container.bbox(),
                buffer = 10;
            if (this._ingredients.company.company_slogan) {
                slogan_text_box = this._logo.slogan_text.bbox();
            }

            var symscale = this._ingredients.symbol.scale ? this._ingredients.symbol.scale : (Math.floor(Math.random() * 75) + 50) / symbol_box.h;
            var symAlignment = this._ingredients.symbol.alignment || this._ingredients.monogram.alignment;

            var scale = this._ingredients.container.scale;
            if (!this._ingredients.container.scale) {
                scale = (main_text_box.w + 100) / container_box.w;
                // let hscale = (main_text_box.h + slogan_text_box.h + 100)/container_box.h;
                if (symAlignment == 'left' || symAlignment == 'right') {
                    scale = (main_text_box.w + symbol_box.w * symscale + 150) / container_box.w;
                } else if (symAlignment == 'top' || symAlignment == 'bottom') {
                    scale = (main_text_box.h + slogan_text_box.h + symbol_box.h * symscale + 150) / container_box.h;
                }

                if (main_text_box.w + 150 >= container_box.w * scale) scale = (main_text_box.w + 150) / container_box.w;
            }

            if (!Number.isFinite(scale)) throw 'Element not in View';
            var cwidth = container_box.w * scale;
            var cheight = container_box.h * scale;

            var cx = 0 - container_box.x * scale;
            var cy = 0 - container_box.y * scale;

            this._logo.container.attr('transform', 'translate(' + cx + ',' + cy + ') scale(' + scale + ')');
            this._ingredients.container = this._ingredients.container ? this._ingredients.container : {};
            this._ingredients.container.path = this._logo.container.node.innerHTML.replace(/[\r\n]/g, '');
            this._ingredients.container.scale = scale;

            this.TextWithSymbolLayout(cwidth, cheight);
        }
    }, {
        key: 'TextWithOutlineContainer',
        value: function TextWithOutlineContainer() {
            var main_text = this._logo.main_text.bbox();
            var slogan_text = this._logo.slogan_text ? this._logo.slogan_text.bbox() : { h: 0, w: 0 };

            var scale = this._ingredients.container.scale;
            if (!this._ingredients.container.scale) scale = ((main_text.w > slogan_text.w ? main_text.w : slogan_text.w) + 100) / this._logo.container.bbox().w;

            if (!Number.isFinite(scale)) throw 'Element not in View';
            var cwidth = this._logo.container.bbox().w * scale;
            var cheight = this._logo.container.bbox().h * scale;

            var cy = (cheight - this._logo.container.bbox().h * scale) / 2 - this._logo.container.bbox().y;
            var cx = (cwidth - this._logo.container.bbox().w * scale) / 2 - this._logo.container.bbox().x;

            this._logo.container.attr('transform', 'translate(' + cx + ',' + cy + ') scale(' + scale + ')');
            this._ingredients.container = this._ingredients.container ? this._ingredients.container : {};
            this._ingredients.container.path = this._logo.container.node.innerHTML.replace(/[\r\n]/g, '');
            this._ingredients.container.scale = scale;

            // if(cwidth > 470 || cheight > 355){
            //     let sloganbbox = this._logo.slogan_text ? this._logo.slogan_text.bbox():{w:0,h:0};
            //     if(this._logo.main_text.bbox().w > sloganbbox.w){this._ingredients.main_text.size = this._ingredients.main_text.size/2}
            //     else{this._ingredients.slogan_text.size = this._ingredients.slogan_text.size/2;} 
            //     if(this._ingredients.main_text.size > 5 && this._ingredients.slogan_text.size > 5){this.Update('refresh')}
            // }else{
            //     this.PlainTextLayout(cwidth, cheight);
            // }
            this.PlainTextLayout(cwidth, cheight);
        }
    }, {
        key: 'TextWithFilledContainer',
        value: function TextWithFilledContainer() {

            var main_text = this._logo.main_text.bbox();
            var slogan_text = this._logo.slogan_text ? this._logo.slogan_text.bbox() : { h: 0, w: 0 };

            var scale = this._ingredients.container.scale;
            if (!this._ingredients.container.scale) scale = ((main_text.w > slogan_text.w ? main_text.w : slogan_text.w) + 100) / this._logo.container.bbox().w;

            if (!Number.isFinite(scale)) throw 'Element not in View';
            var cwidth = this._logo.container.bbox().w * scale;
            var cheight = this._logo.container.bbox().h * scale;

            //console.log('sacle',scale,this._logo.container.node.innerHTML)
            var cy = (cheight - this._logo.container.bbox().h * scale) / 2 - this._logo.container.bbox().y;
            var cx = (cwidth - this._logo.container.bbox().w * scale) / 2 - this._logo.container.bbox().x;

            var fill = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';
            this._logo.container.attr('transform', 'translate(' + cx + ',' + cy + ') scale(' + scale + ')');
            this._logo.main_text.fill(fill);
            if (this._logo.slogan_text) this._logo.slogan_text.fill(fill);

            this._ingredients.container = this._ingredients.container ? this._ingredients.container : {};
            this._ingredients.container.path = this._logo.container.node.innerHTML.replace(/[\r\n]/g, '');
            this._ingredients.container.scale = scale;

            // if(cwidth > 470 || cheight > 355){
            //     let sloganbbox = this._logo.slogan_text ? this._logo.slogan_text.bbox():{w:0,h:0}
            //     if(this._logo.main_text.bbox().w > sloganbbox.w){this._ingredients.main_text.size = this._ingredients.main_text.size/2}
            //     else{this._ingredients.slogan_text.size = this._ingredients.slogan_text.size/2;} 
            //     if(this._ingredients.main_text.size > 5 && this._ingredients.slogan_text.size > 5){this.Update('refresh')}
            // }else{
            //     this.PlainTextLayout(cwidth, cheight);
            // }
            this.PlainTextLayout(cwidth, cheight);
        }
    }, {
        key: 'Update',
        value: function Update(action) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            //clear current svg
            if (action != 'font_variations' && action != 'font_change' && action != 'slogan_font_change' && action != 'slogan_change' && action != 'color_variations' && action != 'layout_change' && action != 'container_change' && action != 'color_change' && action != 'reverse_color') {
                this.element.find('svg').remove();
                this.element.find('.logo-option').html('<div class="vheight"><div class="vcell"><svg></svg></div></div>');
            }

            //redefine update ingredient
            if (action == 'refresh') {
                this.element.find('.atv-card-layers').css('background-color', this.colorbg);
            } else if (action == 'main_font_size') {
                if (data.size > 1) this._ingredients.main_text.size = Number(data.size);else this._ingredients.main_text.size = Number(this.frm.main_text_size.val()) + Number(data.size);
                this.frm.main_text_size.val(parseInt(this._ingredients.main_text.size));
            } else if (action == 'main_font_y_offset') {
                if (data.pos > 1) this._ingredients.main_text.y_offset = Number(data);else if (this._ingredients.main_text.y_offset + data.pos >= 0) this._ingredients.main_text.y_offset = Number(this.frm.main_text_y_offset.val()) + Number(data.pos);
                this.frm.main_text_y_offset.val(parseInt(this._ingredients.main_text.y_offset));
            } else if (action == 'main_text_case') {
                this._ingredients.company.company_name = data == 'up' ? this._ingredients.company.company_name.toUpperCase() : this._ingredients.company.company_name.toLowerCase();
                this.frm.company_name.val(this._ingredients.company.company_name);
            } else if (action == 'main_letter_spacing') {
                if (data.size > 1) this._ingredients.main_text.letter_spacing = Number(data.size);else this._ingredients.main_text.letter_spacing = Number(this.frm.main_text_letter_spacing.val()) + Number(data.size);
                this.frm.main_text_letter_spacing.val(this._ingredients.main_text.letter_spacing.toFixed(2));
            } else if (action == 'text_layout') {
                this._ingredients.layout = data;
                this.frm.text_layout.data('layout', data === 'multi_text' ? 'plain_text' : 'multi_text');
                this.UpdateView();
            } else if (action == 'slogan_font_size') {
                if (data.size > 1) this._ingredients.slogan_text.size = Number(data.size);else this._ingredients.slogan_text.size = Number(this.frm.slogan_text_size.val()) + Number(data.size);
                this.frm.slogan_text_size.val(parseInt(this._ingredients.slogan_text.size));
            } else if (action == 'slogan_font_y_offset') {
                if (data.pos > 1) this._ingredients.slogan_text.y_offset = Number(data);else if (this._ingredients.slogan_text.y_offset + data.pos >= 0) this._ingredients.slogan_text.y_offset = Number(this.frm.slogan_text_y_offset.val()) + Number(data.pos);
                this.frm.slogan_text_y_offset.val(parseInt(this._ingredients.slogan_text.y_offset));
            } else if (action == 'slogan_text_case') {
                if (this._ingredients.company.company_slogan) {
                    this._ingredients.company.company_slogan = data == 'up' ? this._ingredients.company.company_slogan.toUpperCase() : this._ingredients.company.company_slogan.toLowerCase();
                    this.frm.company_slogan.val(this._ingredients.company.company_slogan);
                }
            } else if (action == 'slogan_letter_spacing') {
                if (data.size > 1) this._ingredients.slogan_text.letter_spacing = Number(data.size);else this._ingredients.slogan_text.letter_spacing = Number(this.frm.slogan_text_letter_spacing.val()) + Number(data.size);
                this.frm.slogan_text_letter_spacing.val(this._ingredients.slogan_text.letter_spacing.toFixed(2));
            } else if (action == 'all_caps') {
                this._ingredients.all_caps = data;
            } else if (action == 'layout_change') {
                console.log('layout_change', data.ingredients.layout);
                this._ingredients.layout = data.ingredients.layout;
                if (data.ingredients.layout == 'text_with_outline_container' || 'text_with_filled_container') {
                    this._ingredients.container = data.ingredients.container;
                }
                if (data.ingredients.layout == 'text_with_symbol' || data.ingredients.layout == 'multi_text_with_symbol') {
                    this._ingredients.symbol = data.ingredients.symbol;
                    this._ingredients.monogram.alignment = null;
                }
                if (data.ingredients.layout == 'text_with_text_as_symbol' || data.ingredients.layout == 'multi_text_with_text_as_symbol') {
                    this._ingredients.monogram = data.ingredients.monogram;
                    this._ingredients.symbol.alignment = null;
                }
                if (data.ingredients.layout == 'text_with_text_in_symbol' || data.ingredients.layout == 'multi_text_with_text_in_symbol') {
                    this._ingredients.monogram_container = data.ingredients.monogram_container;
                }
                this.UpdateView();
                //if(this._editlogocontainer.data('view') == 'main') this.ToggleMainFontView();
                //remove layouts
            } else if (action == 'font_change') {
                this._ingredients.main_text.font = data.name;
                this.svgfonts.main_text = data.file;
                this._ingredients.svg = data._ingredients.svg;
                this._ingredients.main_text.size = data._ingredients.main_text.size;
                this.frm.main_text_size.val(parseInt(this._ingredients.main_text.size));
            } else if (action == 'slogan_font_change') {
                this._ingredients.slogan_text.font = data.name;
                this.svgfonts.slogan_text = data.file;
            } else if (action == 'company_name') {
                this._ingredients.company.company_name = data;
            } else if (action == 'company_slogan') {
                this._ingredients.company.company_slogan = data;
            } else if (action == 'color_change') {
                var _this = this;
                this._ingredients.color = data.ingredients.color;
                this._ingredients.color_tag = data.ingredients.color_tag;
                this._ingredients.main_text.color = data.ingredients.main_font_color;
                this._ingredients.slogan_text.color = data.ingredients.main_font_color;

                this.colorfill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
                this.colorbg = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';
                this.element.find('.atv-card-layers').css('background-color', this.colorbg);
                window.groupcolor = null;
            } else if (action == 'reverse_color') {
                this._ingredients.color_tag = this._ingredients.color_tag == 'light_bg' ? 'dark_bg' : 'light_bg';

                this.colorfill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
                this.colorbg = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';

                if (window.groupcolor) {
                    this.colorfill = window.groupcolor == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
                    this.colorbg = window.groupcolor == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';
                }

                this.element.find('.atv-card-layers').css('background-color', this.colorbg);

                if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                    this.element.find('svg [rel="mainfill"]').attr('fill', this.colorbg);
                    this.element.find('svg [rel="mainfill"] path').attr('fill', this.colorbg);
                    this.element.find('svg [rel="mainfill"] path').css('fill', this.colorbg);
                    this.element.find('svg [rel="inversefill"]').attr('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"] path').attr('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"] path').css('fill', this.colorfill);
                } else if (this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'mulit_text_with_text_in_symbol') {
                    this.element.find('svg [rel="mainfill"]').attr('fill', this.colorfill);
                    this.element.find('svg [rel="mainfill"] path').attr('fill', this.colorfill);
                    this.element.find('svg [rel="mainfill"] path').css('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"]').attr('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"] g').attr('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"] path').attr('fill', this.colorfill);
                    this.element.find('svg [rel="inversefill"] path').css('fill', this.colorfill);
                    this.element.find('svg [rel="symbolfill"]').attr('fill', this.colorbg);
                    this.element.find('svg [rel="symbolfill"] path').attr('fill', this.colorbg);
                    this.element.find('svg [rel="symbolfill"] path').css('fill', this.colorbg);
                } else {
                    this.element.find('svg [rel="mainfill"]').attr('fill', this.colorfill);
                    this.element.find('svg [rel="mainfill"] g').attr('fill', this.colorfill);
                    this.element.find('svg [rel="mainfill"] path').attr('fill', this.colorfill);
                    this.element.find('svg [rel="mainfill"] path').css('fill', this.colorfill);
                }
            } else if (action == 'color_variations') {
                this.colorvariations = [];
                this.GetColorVariations(window.assets.colors, data);
            } else if (action == 'font_variations') {
                //remove any unused fonts for space
                //get font variations
                this.fontvariations = [];
                this.GetFontVariations(window.assets.fonts, data);
            } else if (action == 'symbol_size') {
                if (this._ingredients.layout == 'text_with_symbol' || this._ingredients.layout == 'multi_text_with_symbol' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                    this._ingredients.symbol.scale = Number(this._ingredients.symbol.scale) + Number(data.size);
                    this.frm.symbol_scale.val(this._ingredients.symbol.scale.toFixed(2));
                } else if (this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'multi_text_with_text_in_symbol') {
                    this._ingredients.monogram_container.scale = Number(this._ingredients.monogram_container.scale) + Number(data.size);
                    this.frm.symbol_scale.val(this._ingredients.monogram_container.scale.toFixed(2));
                }
            } else if (action == 'container_size') {
                this._ingredients.container.scale = Number(this._ingredients.container.scale) + Number(data.size);
                this.frm.container_scale.val(this._ingredients.container.scale.toFixed(2));
            } else if (action == 'symbol_alignment') {
                console.log('alighnment', data);
                if (this._ingredients.layout == 'text_with_text_as_symbol' || this._ingredients.layout == 'multi_text_with_text_as_symbol' || this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'multi_text_with_text_in_symbol') this._ingredients.monogram.alignment = data;else if (this._ingredients.layout == 'text_with_symbol' || this._ingredients.layout == 'multi_text_with_symbol' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                    this._ingredients.symbol.alignment = data;
                }
                this._ingredients.main_text.y_offset = 0;
                this._ingredients.slogan_text.y_offset = 0;

                this.UpdateView();
            } else if (action == 'monogram_size') {
                if (data.size > 1) this._ingredients.monogram.size = Number(data.size);else this._ingredients.monogram.size = Number(this._ingredients.monogram.size) + Number(data.size);
                this.frm.monogram_size.val(this._ingredients.monogram.size);
            } else if (action == 'symbol_change') {
                this._ingredients.symbol = data.ingredients.symbol;
                this._ingredients.layout = 'text_with_symbol';
                if (data.ingredients.layout.indexOf('multi') !== -1) {
                    this._ingredients.layout = 'multi_' + this._ingredients.layout;
                }
                this.UpdateView();
            } else if (action == 'monogram_text_change') {
                this._ingredients.monogram.text = data;
            } else if (action == 'monogram_change') {
                this._ingredients.monogram.font = data.name;
                this.svgfonts.monogram = data.file;
                this._ingredients.monogram.name = data.name;
                this._ingredients.layout = 'text_with_text_as_symbol';

                if (data.ingredients.layout.indexOf('multi') !== -1) {
                    console.log('is mulit');
                    this._ingredients.layout = 'multi_' + this._ingredients.layout;
                }

                //if(this._editlogocontainer.data('view') == 'main') this.ToggleSymbolView();
                this.UpdateView();
            } else if (action == 'container_change') {
                this._ingredients.layout = data.ingredients.layout;
                this._ingredients.container = data.ingredients.container;
                //if(this._editlogocontainer.data('view') == 'main') this.ToggleMainFontView();
                this.UpdateView();
            } else if (action == 'symbol_container_change') {
                this._ingredients.layout = 'text_with_text_in_symbol';
                this._ingredients.monogram_container = data.ingredients.monogram_container;
                if (data.ingredients.layout.indexOf('multi') !== -1) {
                    this._ingredients.layout = 'multi_' + this._ingredients.layout;
                }
                // if(this._editlogocontainer.data('view') == 'main') this.ToggleMainFontView();
                this.UpdateView();
            }

            //draw main font
            if (action != 'font_variations' && action != 'font_change' && action != 'slogan_font_change' && action != 'slogan_change' && action != 'color_variations' && action != 'layout_change' && action != 'container_change' && action != 'color_change' && action != 'reverse_color') {
                //this.DrawMainText()
                this.PositionElements(this._ingredients.layout);
            }

            //only update if its a saved logo
            if (window.activelogo) {
                // prep payload
                var svg = data.svg ? data.svg : this.GeneratePreviewSVG(this);
                window.previewsvg = $(svg).html();
                window.previewsvg = window.previewsvg.replace(/<rect name=\"background\" .*?>(.*?)<\/rect>/, '');
                var ingredients = JSON.parse(JSON.stringify(this._ingredients));
                var payload = {
                    id: window.activelogo._dbid,
                    svg: svg,
                    data: { ingredients: ingredients }
                    // immediate changes
                };if (action === 'container_change' || action === 'monogram_change' || action === 'symbol_change' || action === 'color_change' || action === 'all_caps' || action === 'layout_change' || action === 'font_change' || action === 'slogan_font_change' || action === 'slogan_text_case' || action == 'symbol_container_change' || action == 'symbol_alignment') {

                    window.putLogo(payload);
                    $('.swiper-container swiper-wrapper').html('');
                    window.snackbar("info", 'Logo Updated');
                }

                // stepped changes
                else if (action === 'monogram_text_change' || action === 'symbol_size' || action === 'slogan_letter_spacing' || action === 'main_letter_spacing' || action === 'slogan_font_size' || action === 'main_font_size' || action === 'company_name' || action === 'company_slogan' || action == 'container_size') {

                        var _this15 = this;
                        window.waitingToSend += 1;

                        setTimeout(function () {
                            window.waitingToSend -= 1;
                            if (window.waitingToSend < 1) {
                                window.putLogo(payload);
                                window.snackbar("info", 'Logo Updated');
                            }
                        }, 2000);
                    }
            }
        }

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
        *                 Listeners
        * * * * * * * * * * * * * * * * * * * * * * * */

    }, {
        key: 'SetContainer',
        value: function SetContainer(container) {
            this._editlogocontainer = container;
        }
    }, {
        key: 'SetEditListeners',
        value: function SetEditListeners() {
            //define listeners for form buttons on screen
            var _this = this;
            var frm = $('form[name="edit-logo"]');
            frm.submit(function (e) {
                e.preventDefault();
            });

            frm.find('.company-name-options .font-size-picker button.plus').unbind('click').click(function () {
                _this.Update('main_font_size', { 'size': 1 });
            });
            frm.find('.company-name-options .font-size-picker button.minus').unbind('click').click(function () {
                _this.Update('main_font_size', { 'size': -1 });
            });
            frm.find('.company-name-options .letter-spacing-picker button.plus').unbind('click').click(function () {
                _this.Update('main_letter_spacing', { 'size': 0.05 });
            });
            frm.find('.company-name-options .letter-spacing-picker button.minus').unbind('click').click(function () {
                _this.Update('main_letter_spacing', { 'size': -0.05 });
            });
            frm.find('.company-name-options .y-offset-picker button.plus').unbind('click').click(function () {
                _this.Update('main_font_y_offset', { 'pos': 1 });
            });
            frm.find('.company-name-options .y-offset-picker button.minus').unbind('click').click(function () {
                _this.Update('main_font_y_offset', { 'pos': -1 });
            });
            frm.find('.company-name-options .font-size-picker input[name="font_size"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('main_font_size', { 'size': $(this).val() });
                }
            });
            frm.find('.company-name-options .letter-spacing-picker input[name="font_letter_spacing"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('main_letter_spacing', { 'size': $(this).val() });
                }
            });
            frm.find('.company-name-options .text-layout').unbind('click').click(function () {
                _this.Update('text_layout', $(this).data('layout'));
            });

            frm.find('.company-slogan-options .font-size-picker button.plus').unbind('click').click(function () {
                _this.Update('slogan_font_size', { 'size': 1 });
            });
            frm.find('.company-slogan-options .font-size-picker button.minus').unbind('click').click(function () {
                _this.Update('slogan_font_size', { 'size': -1 });
            });
            frm.find('.company-slogan-options .letter-spacing-picker button.plus').unbind('click').click(function () {
                _this.Update('slogan_letter_spacing', { 'size': 0.05 });
            });
            frm.find('.company-slogan-options .letter-spacing-picker button.minus').unbind('click').click(function () {
                _this.Update('slogan_letter_spacing', { 'size': -0.05 });
            });
            frm.find('.company-slogan-options .y-offset-picker button.plus').unbind('click').click(function () {
                _this.Update('slogan_font_y_offset', { 'pos': 1 });
            });
            frm.find('.company-slogan-options .y-offset-picker button.minus').unbind('click').click(function () {
                _this.Update('slogan_font_y_offset', { 'pos': -1 });
            });
            frm.find('.company-slogan-options .font-size-picker input[name="font_size"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('slogan_font_size', { 'size': $(this).val() });
                }
            });
            frm.find('.company-slogan-options .letter-spacing-picker input[name="font_letter_spacing"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('slogan_letter_spacing', { 'size': $(this).val() });
                }
            });
            frm.find('.company-slogan-options .y-offset-picker input[name="y_offset_pos"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('slogan_font_y_offset', { 'size': $(this).val() });
                }
            });

            frm.find('.symbol-edit .symbol-size-picker button.plus').unbind('click').click(function () {
                _this.Update('symbol_size', { 'size': 0.05 });
            });
            frm.find('.symbol-edit .symbol-size-picker button.minus').unbind('click').click(function () {
                _this.Update('symbol_size', { 'size': -0.05 });
            });
            frm.find('.symbol-edit .monogram-size-picker button.plus').unbind('click').click(function () {
                _this.Update('monogram_size', { 'size': 1 });
            });
            frm.find('.symbol-edit .monogram-size-picker button.minus').unbind('click').click(function () {
                _this.Update('monogram_size', { 'size': -1 });
            });
            frm.find('.symbol-edit .monogram-size-picker input[name="monogram_size"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.Update('monogram_size', { 'size': $(this).val() });
                }
            });
            frm.find('.symbol-edit .symbol-alignment').unbind('click').click(function () {
                _this.Update('symbol_alignment', $(this).data('alignment'));
            });

            frm.find('.container-edit .container-size-picker button.plus').unbind('click').click(function () {
                _this.Update('container_size', { 'size': 0.05 });
            });
            frm.find('.container-edit .container-size-picker button.minus').unbind('click').click(function () {
                _this.Update('container_size', { 'size': -0.05 });
            });

            frm.find('input[name="company_name"]').unbind('keyup').keyup(function () {
                _this.Update('company_name', $(this).val());
            });
            frm.find('input[name="company_slogan"]').unbind('keyup').keyup(function () {
                _this.Update('company_slogan', $(this).val());
            });

            frm.find('input[name="monogram_text"]').unbind('keyup').keyup(function () {
                _this.Update('monogram_text_change', $(this).val());
            });
            frm.find('input[name="icon-search"]').unbind('keyup').keyup(function (e) {
                if (e.which == 13) {
                    _this.GetSymbolVariations($(this).val());
                }
            });
            frm.find('.color-options li').unbind('click').click(function () {

                //add background css when a color is selected
                var color = $('.color-options li');
                color.removeClass('active');
                $(this).addClass('active');

                //window.currentColorClass = $(this).data('color-class');
                $('.edit-logos.edit-color').removeClass('visible').addClass('hidden');
                $('.edit-logos.color-browser').removeClass('hidden').addClass('visible');
                _this.Update('color_variations', $(this).data('color-class'));
            });

            // Uppercase lowercase toggles
            frm.find('.company-name-options .upp').unbind('click').click(function (e) {
                _this.Update('main_text_case', 'up');
            });
            frm.find('.company-name-options .low').unbind('click').click(function (e) {
                _this.Update('main_text_case', 'low');
            });
            frm.find('.company-slogan-options .upp').unbind('click').click(function (e) {
                _this.Update('slogan_text_case', 'up');
            });
            frm.find('.company-slogan-options .low').unbind('click').click(function (e) {
                _this.Update('slogan_text_case', 'low');
            });

            frm.find('#company-font-options li').unbind('click').click(function () {
                _this.Update('font_variations', $(this).data('font'));
                window.currentFontType = $(this).data('font');
                //window.EditorSwipers.map(swiper=>{ swiper.hasAsk = false;})
            });

            //define form values
            this.frm = {};
            this.frm.main_text_size = frm.find('.company-name-options input[name="font_size"]');
            this.frm.main_text_letter_spacing = frm.find('.company-name-options input[name="font_letter_spacing"]');
            this.frm.text_layout = frm.find('.company-name-options .text-layout');
            this.frm.company_name = frm.find('.company-name-options input[name="company_name"]');
            this.frm.main_text_y_offset = frm.find('.company-name-options input[name="y_offset_pos"]');
            this.frm.slogan_text_size = frm.find('.company-slogan-options input[name="font_size"]');
            this.frm.slogan_text_letter_spacing = frm.find('.company-slogan-options input[name="font_letter_spacing"]');
            this.frm.slogan_text_y_offset = frm.find('.company-slogan-options input[name="y_offset_pos"]');
            this.frm.company_slogan = frm.find('.company-slogan-options input[name="company_slogan"]');
            this.frm.container_scale = frm.find('.container-edit input[name="container_size"]');
            this.frm.symbol_scale = frm.find('.symbol-edit input[name="symbol_size"]');
            this.frm.monogram_size = frm.find('.symbol-edit input[name="monogram_size"]');
            this.frm.monogram_text = frm.find('.symbol-edit input[name="monogram_text"]');
            this.frm.main_text_size.val(this._ingredients.main_text.size);
            this.frm.main_text_letter_spacing.val(this._ingredients.main_text.letter_spacing);
            this.frm.main_text_y_offset.val(this._ingredients.main_text.y_offset || 0);
            this.frm.slogan_text_size.val(this._ingredients.slogan_text.size);
            this.frm.slogan_text_letter_spacing.val(this._ingredients.slogan_text.letter_spacing);
            this.frm.slogan_text_y_offset.val(this._ingredients.slogan_text.y_offset || 0);
            this.frm.company_name.val(this._ingredients.company.company_name);
            this.frm.company_slogan.val(this._ingredients.company.company_slogan);
            this.frm.monogram_text.val(this._ingredients.monogram.text);
            this.frm.monogram_size.val(this._ingredients.monogram.size ? this._ingredients.monogram.size : 50);

            if (this._ingredients.layout == 'text_with_symbol' || this._ingredients.layout == 'multi_text_with_symbol' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                this.frm.symbol_scale.val(this._ingredients.symbol.scale.toFixed(2));
            } else if (this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'multi_text_with_text_in_symbol') {
                this.frm.symbol_scale.val(this._ingredients.monogram_container.scale.toFixed(2));this.frm.monogram_size.val(this._ingredients.monogram.size);frm.find('.monogram-size-picker').removeClass('hidden').addClass('visible');
            } else if (this._ingredients.layout == 'text_with_text_as_symbol' || this._ingredients.layout == 'multi_text_with_text_as_symbol') {
                this.frm.monogram_size.val(this._ingredients.monogram.size);frm.find('.monogram-size-picker').removeClass('hidden').addClass('visible');frm.find('.symbol-size-picker').removeClass('visible').addClass('hidden');
            }

            if (this._ingredients.layout == 'text_with_symbol' || this._ingredients.layout == 'mulit_text_with_symbol' || this._ingredients.layout == 'text_with_text_as_symbol' || this._ingredients.layout == 'multi_text_with_text_as_symbol' || this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'multi_text_with_text_in_symbol' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') $('#edit-logo-nav li[data-option="edit-symbol"]').removeClass('hidden').addClass('visible');else $('#edit-logo-nav li[data-option="edit-symbol"]').removeClass('visible').addClass('hidden');

            if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                $('#edit-logo-nav li[data-option="edit-container"]').removeClass('hidden').addClass('visible');this.frm.container_scale.val(this._ingredients.container.scale.toFixed(2));
            } else $('#edit-logo-nav li[data-option="edit-container"]').removeClass('visible').addClass('hidden');

            this.UpdateView();
        }
    }, {
        key: 'AddFontVariationListener',
        value: function AddFontVariationListener(element, i) {
            var _this16 = this;

            var _this = this;
            element.click(function () {
                _this16.Update('font_change', { _ingredients: _this.fontvariations[i]._ingredients, name: _this.fontvariations[i]._ingredients.main_text.font, file: _this.fontvariations[i].svgfonts.main_text, svg: _this16.GeneratePreviewSVG(_this16.fontvariations[i]) });
            });
        }
    }, {
        key: 'AddSloganFontVariationListener',
        value: function AddSloganFontVariationListener(element, i) {
            var _this17 = this;

            var _this = this;
            element.click(function () {
                _this17.Update('slogan_font_change', { name: _this.sloganfontvariations[i]._ingredients.slogan_text.font, file: _this.sloganfontvariations[i].svgfonts.slogan_text, svg: _this17.GeneratePreviewSVG(_this17.sloganfontvariations[i]) });
            });
        }
    }, {
        key: 'AddColorVariationListener',
        value: function AddColorVariationListener(element, i) {
            var _this18 = this;

            var _this = this;
            element.click(function () {
                _this18.Update('color_change', { ingredients: _this18.colorvariations[i]._ingredients, svg: _this18.GeneratePreviewSVG(_this18.colorvariations[i]) });
            });
        }
    }, {
        key: 'AddLayoutVariationListener',
        value: function AddLayoutVariationListener(element, i) {
            var _this19 = this;

            var _this = this;
            element.unbind('click').click(function () {
                _this19.Update('layout_change', { ingredients: _this19.layoutvariations[i]._ingredients, svg: _this19.GeneratePreviewSVG(_this19.layoutvariations[i]) });
            });
        }
    }, {
        key: 'AddSymbolVariationListener',
        value: function AddSymbolVariationListener(element, i) {
            var _this20 = this;

            var _this = this;
            element.click(function () {
                _this20.Update('symbol_change', { ingredients: _this20.symbolvariations[i]._ingredients, svg: _this20.GeneratePreviewSVG(_this20.symbolvariations[i]) });
            });
        }
    }, {
        key: 'AddMonogramVariationListener',
        value: function AddMonogramVariationListener(element, i) {
            var _this21 = this;

            var _this = this;
            element.click(function () {
                _this21.Update('monogram_change', { ingredients: _this21.monogramvariations[i]._ingredients, name: _this21.monogramvariations[i]._ingredients.monogram.font, file: _this21.monogramvariations[i].svgfonts.monogram, svg: _this21.GeneratePreviewSVG(_this21.monogramvariations[i]) });
            });
        }
    }, {
        key: 'AddContainerVariationListener',
        value: function AddContainerVariationListener(element, i) {
            var _this22 = this;

            var _this = this;
            element.click(function () {
                _this22.Update('container_change', { ingredients: _this22.containervariations[i]._ingredients, svg: _this22.GeneratePreviewSVG(_this22.containervariations[i]) });
            });
        }
    }, {
        key: 'AddSymbolContainerVariationListener',
        value: function AddSymbolContainerVariationListener(element, i) {
            var _this23 = this;

            var _this = this;
            element.click(function () {
                _this23.Update('symbol_container_change', { ingredients: _this23.symbolcontainervariations[i]._ingredients, svg: _this23.GeneratePreviewSVG(_this23.symbolcontainervariations[i]) });
            });
        }
    }, {
        key: 'GeneratePreviewSVG',
        value: function GeneratePreviewSVG(logo) {
            var svg = logo.GetElement().find('svg')[0].innerHTML;
            var dimensions = 'height="' + logo._ingredients.svg.height + '" width="' + logo._ingredients.svg.width + '"';

            if (logo._ingredients.color_tag == 'dark_bg') svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ' + dimensions + '><rect name="background" ' + dimensions + ' fill="' + logo._ingredients.color.hex + '"/>' + svg + '</svg>';else svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ' + dimensions + '>' + svg + '</svg>';

            return svg;
        }

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
        *                 View Toggles
        * * * * * * * * * * * * * * * * * * * * * * * */

    }, {
        key: 'UpdateView',
        value: function UpdateView() {
            var frm = $('form[name="edit-logo"]');

            //plain text settings
            frm.find('.company-name-options .text-layout').removeClass('active');
            if (this._ingredients.layout == 'multi_text') frm.find('.company-name-options .text-layout').addClass('active');
            if (this._ingredients.layout.indexOf('symbol') !== -1) $('#edit-logo-nav li[data-option="edit-symbol"]').removeClass('hidden').addClass('visible');else $('#edit-logo-nav li[data-option="edit-symbol"]').removeClass('visible').addClass('hidden');

            if (this._ingredients.layout == 'text_with_filled_container' || this._ingredients.layout == 'text_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_outline_container' || this._ingredients.layout == 'text_and_symbol_with_filled_container') {
                $('#edit-logo-nav li[data-option="edit-container"]').removeClass('hidden').addClass('visible');this.frm.container_scale.val(this._ingredients.container.scale.toFixed(2));
            } else $('#edit-logo-nav li[data-option="edit-container"]').removeClass('visible').addClass('hidden');

            frm.find('.symbol-edit .symbol-alignment').removeClass('active');
            frm.find('.y-offset-picker').addClass('hidden').removeClass('visible');
            if (this._ingredients.layout == 'text_with_symbol' || this._ingredients.layout == 'multi_text_with_symbol' || this._ingredients.layout == 'text_and_symbol_with_filled_container' || this._ingredients.layout == 'text_and_symbol_with_outline_container') {
                this.frm.symbol_scale.val(this._ingredients.symbol.scale.toFixed(2));
                frm.find('.symbol-size-picker').removeClass('hidden').addClass('visible');
                frm.find('.monogram-size-picker').removeClass('visible').addClass('hidden');
                frm.find('.monogram-text').removeClass('visible').addClass('hidden');
                frm.find('.symbol-edit .symbol-alignment[data-alignment="' + this._ingredients.symbol.alignment + '"]').addClass('active');
            } else if (this._ingredients.layout == 'text_with_text_as_symbol' || this._ingredients.layout == 'multi_text_with_text_as_symbol') {
                this.frm.monogram_size.val(this._ingredients.monogram.size);
                frm.find('.symbol-size-picker').removeClass('visible').addClass('hidden');
                frm.find('.monogram-size-picker').removeClass('hidden').addClass('visible');
                frm.find('.monogram-text').removeClass('hidden').addClass('visible');
                frm.find('.symbol-edit .symbol-alignment[data-alignment="' + this._ingredients.monogram.alignment + '"]').addClass('active');
            } else if (this._ingredients.layout == 'text_with_text_in_symbol' || this._ingredients.layout == 'multi_text_with_text_in_symbol') {
                this.frm.symbol_scale.val(this._ingredients.monogram_container.scale.toFixed(2));
                this.frm.monogram_size.val(this._ingredients.monogram.size);
                frm.find('.symbol-size-picker').removeClass('hidden').addClass('visible');
                frm.find('.monogram-size-picker').removeClass('hidden').addClass('visible');
                frm.find('.monogram-text').removeClass('hidden').addClass('visible');
                frm.find('.symbol-edit .symbol-alignment[data-alignment="' + this._ingredients.monogram.alignment + '"]').addClass('active');
            }
        }
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
        *                 Templates\
        * * * * * * * * * * * * * * * * * * * * * * * */

    }, {
        key: 'AddElementToScreen',
        value: function AddElementToScreen() {
            var prepend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            //creates the logo template box
            if (!this.colorfill) this.colorfill = this._ingredients.color_tag == 'dark_bg' ? '#ffffff' : this._ingredients.color.hex;
            if (!this.colorbg) this.colorbg = this._ingredients.color_tag == 'dark_bg' ? this._ingredients.color.hex : '#ffffff';

            var html = '';
            html += '<div class="logo-container loading not-visible atv-card atv-card-container swiper-slide logo-container--' + this._ingredients.color_tag + ' ">';
            if (this._ingredients.package == 'premium' || this._ingredients.package == 'basic') html += '<span class="purchased-tag">Purchased ' + this._ingredients.package + '</span>';else {
                if (this._ingredients.favorite && this._ingredients.color_tag === 'dark_bg') html += '<a class="favorite-icon"><img src="' + window.imgsrc + '/heart-big-filled-white@2x.png"></a>';else if (this._ingredients.favorite && this._ingredients.color_tag === 'light_bg') html += '<a class="favorite-icon"><img src="' + window.imgsrc + '/heart-big-filled-dark@2x.png"></a>';else if (!this._ingredients.favorite && this._ingredients.color_tag === 'dark_bg') html += '<a class="favorite-icon"><img src="' + window.imgsrc + '/heart-big-outline-white@2x.png"></a>';else if (!this._ingredients.favorite && this._ingredients.color_tag === 'light_bg') html += '<a class="favorite-icon"><img src="' + window.imgsrc + '/heart-big-outline-dark@2x.png"></a>';
            }
            html += '<div class="atv-card-shine" style="background: linear-gradient(262deg, rgba(255, 255, 255, 0.247059) 0%, rgba(255, 255, 255, 0) 80%);"></div>' + '<div class="atv-card-layers" style="background-color: ' + this.colorbg + ';">' + '<div class="logo-option"><div class="vheight"><div class="vcell">' + '<svg></svg>' + '</div></div></div>' + '</div>' + '<div class="atv-card-shadow"></div>';
            if (this._ingredients.package == 'premium' || this._ingredients.package == 'basic') html += '<span class="purchased-tag">Purchased ' + this._ingredients.package + '</span>';
            html += '</div>';

            this.element = $(html);
            if (prepend) this._editlogocontainer.prepend(this.element);else this._editlogocontainer.append(this.element);

            // if ($(this._editlogocontainer).hasClass('swiper-wrapper') && window.EditorSwipers ) {
            //   window.EditorSwipers.map(swiper=>{ swiper.onResize();})
            //   $('.arrow-keys').removeClass('hidden').addClass('visible');
            // };
        }
    }, {
        key: 'UpdateFavoriteIcon',
        value: function UpdateFavoriteIcon() {
            var img = '';
            if (this._ingredients.favorite && this._ingredients.color_tag === 'dark_bg') img = window.imgsrc + '/heart-big-filled-white@2x.png';else if (this._ingredients.favorite && this._ingredients.color_tag === 'light_bg') img = window.imgsrc + '/heart-big-filled-dark@2x.png';else if (!this._ingredients.favorite && this._ingredients.color_tag === 'dark_bg') img = window.imgsrc + '/heart-big-outline-white@2x.png';else if (!this._ingredients.favorite && this._ingredients.color_tag === 'light_bg') img = window.imgsrc + '/heart-big-outline-dark@2x.png';
            this.element.find('.favorite-icon img').attr('src', img);
        }
    }]);

    return Logo;
}();

// for delayed put function at end of update


window.waitingToSend = 0;
//helper method
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
};

window.Logo = Logo;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {

    /* * * * * * * * * * * * * * * * * * * * *
    *   Legacy Jquery JS
    *   Table of contents
    *   1. Constants
    *   2. Auth
    *   3. User Data
    *   4. Navigation/Page Flow
    */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1. Constants
     * * * * * * * * * * * * * * * * * * * * * * * */
    //checkbrowser
    // window.onbeforeunload = function(event){
    //     if(window.state.generatorresults){
    //         window.setState('generatorresults',window.state.generatorresults);
    //         window.setState('lastview','generator_view');
    //         return 'Are you sure you want to leave? You will lose any unsaved changes.';
    //         window.state.generatorresults = false;
    //     }

    // };
    // window.onunload = function() { window.setState('generatorresults',false);window.state.generatorresults = false; }

    window.strd_err = function (err) {
        console.log(err);
    };

    window.setState = function (property, value) {
        if (!window.state) window.state = {};
        //        alert(1)
        if (!localStorage.state) localStorage.state = {};
        //        alert(2)

        window.state[property] = value;
        localStorage.state = JSON.stringify(window.state);

        // let storage = window.sessionStorage;
        // try {
        //     storage.setItem('key', '1');
        //     storage.removeItem('key');
        //     localStorage.state = JSON.stringify(window.state);
        //     return localStorageName in win && win[localStorageName];
        // } catch (error) {
        //     return false;
        // }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 2. AUTH
     * * * * * * * * * * * * * * * * * * * * * * * */

    //callbacks post Auth
    var goToDashboard = function goToDashboard() {
        location.href = BASEURL + "/app";
    };

    var onPage = function onPage() {
        window.GetUser(updateUserData);
        if ($('#signupModal')) $('#signupModal').modal('hide');
        if ($('#loginModal')) $('#loginModal').modal('hide');
    };

    $('form[name="signup"]').submit(function (e) {
        e.preventDefault();
        var frm = $(this);
        frm.find('button').html('<div class="loader"></div>');
        frm.find('.alert-danger').addClass('hidden').removeClass('visible');

        var fname = frm.find('input[name="fname"]').val();
        var lname = frm.find('input[name="lname"]').val();
        var email = frm.find('input[name="email"]').val();
        var password = frm.find('input[name="password"]').val();

        //set callback
        var callback = frm.data('callback') == 'onpage' ? onPage : goToDashboard;
        signup(frm, fname, lname, email, password, callback);
    });

    function signup(frm, fname, lname, email, password, callback) {
        var payload = {
            fname: frm.find('input[name="fname"]').val(),
            lname: frm.find('input[name="lname"]').val(),
            email: frm.find('input[name="email"]').val(),
            password: frm.find('input[name="password"]').val()
        };
        $.ajax({
            type: 'post',
            url: window.APIURL + '/register',
            data: JSON.stringify(payload),
            contentType: 'application/json'
        }).then(function (res) {
            //success
            window.ga('send', 'event', 'Accounts', 'signup');
            if (!res.data.token) {
                frm.find('.alert-danger').html(res.msg).removeClass('hidden').addClass('visible');
            } else {
                window.setState('token', res.data.token);
                window.setState('userid', res.data.userid);
                overlay.data('hold', true);
                if (window.APIURL == 'https://api.logojoy.com') {
                    window.Intercom("update", {
                        name: payload.fname + ' ' + payload.lname,
                        user_id: res.data.userid,
                        email: payload.email
                    });
                }
                // callback();
                var state = localStorage.getItem('state');
                var nextState = Object.assign({}, JSON.parse(state), {
                    user: null,
                    token: null
                });

                localStorage.setItem('state', JSON.stringify(nextState));
                window.location = '/dashboard';
            }
        }, function (err) {
            //error
            frm.find('.alert-danger').html('Could Not Create Account').removeClass('hidden').addClass('visible');
            frm.find('button').html('Sign Up');
        });
    }

    $('form[name="login"]').submit(function (e) {
        e.preventDefault();
        var frm = $(this);
        var email = frm.find('input[name="email"]').val();
        var password = frm.find('input[name="password"]').val();
        frm.find('button').html('<div class="loader"></div>');
        frm.find('.alert-danger').addClass('hidden').removeClass('visible');

        //set callback
        var callback = frm.data('callback') == 'onpage' ? onPage : goToDashboard;
        login(frm, email, password, callback);
    });

    $('form[name="passwordreset"]').submit(function (e) {
        e.preventDefault();
        var frm = $(this);
        frm.find('button').html('<div class="loader"></div>');
        frm.find('.alert-danger').addClass('hidden').removeClass('visible');

        var payload = {
            email: frm.find('input[name="email"]').val()
        };
        fetch(window.APIURL + '/resetpassword', {
            headers: new Headers({
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            }),
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(payload)
        }).then(function (response) {
            frm.find('button').html('Reset Email Sent');
        }).catch(function () {});
    });

    $('form[name="passwordretype"]').submit(function (e) {
        e.preventDefault();
        var frm = $(this);
        frm.find('button').html('<div class="loader"></div>');
        frm.find('.alert-danger').addClass('hidden').removeClass('visible');

        var payload = {
            activation_token: frm.find('input[name="activation_token"]').val(),
            password: frm.find('input[name="password"]').val()
        };
        fetch(window.APIURL + '/resetpassword', {
            headers: new Headers({
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            }),
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(payload)
        }).then(function (response) {

            $('#passwordretypeModal').modal('hide');
            $('#loginModal').modal('show');
        }).catch(function () {
            frm.find('.alert-danger').addClass('visible').removeClass('hidden').html('Invalid Token');
        });
    });

    function login(frm, email, password, callback) {
        var payload = { email: email, password: password };
        $.ajax({
            url: window.APIURL + '/login',
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json'
        }).then(function (res) {
            console.log(res);
            //success
            if (!res.data.token) {
                frm.find('.alert-danger').html(res.msg).removeClass('hidden').addClass('visible');
            } else {
                if (res.data.admin) {
                    window.setState('admin', res.data.admin);
                }
                window.setState('token', res.data.token);
                window.setState('userid', res.data.userid);
                window.setState('user', res.data.user);
                location.href = '/dashboard';
                //callback();
                frm.find('button').html('Log In');
            }
        }, function (err) {
            //error
            frm.find('.alert-danger').html('Incorrect Username or Password').removeClass('hidden').addClass('visible');
            frm.find('button').html('Log In');
        });
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 3. Views
     * * * * * * * * * * * * * * * * * * * * * * * */
    var CURRENT_VIEW = null,
        APP_VIEW = $('.app-view'),
        GENERATOR_VIEW = $('#app-generator'),
        GENERATOR_RESULTS_VIEW = $('#app-generator-results'),
        GENERATOR_SUB_VIEWS = $('.generator-sub-views'),
        DASHBOARD_VIEW = $('#app-dashboard'),
        PACKAGES_VIEW = $('#app-packages'),
        BRANDGUIDELINES_VIEW = $('#app-brandguidelines'),
        FAVORITED_LOGOS = $('#favorite-logos'),
        CHECKOUT_VIEW = $('#app-checkout'),
        SETTINGS_VIEW = $('#app-settings'),
        REFERRAL_VIEW = $('#app-referral'),
        PURCHASE = $('#purchase'),
        APPLYCOUPON = $('#apply-coupon'),
        HAVECOUPON = $('#haveCoupon');

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 4. UserData
     * * * * * * * * * * * * * * * * * * * * * * * */
    window.user;

    //user fields
    var username = $('#username');
    var favorited_logos = $('#favorited_logos');

    //Fetch User Data from API
    window.GetUser = function (callback) {
        if (!window.state.user) {
            $.ajax({
                url: window.APIURL + "/users?user_id=" + window.state.userid,
                type: 'GET',
                contentType: 'application/json',
                headers: {
                    Authorization: window.state.token
                }
            }).then(function (res) {
                window.setState('user', res.data.user);
                UserLoggedIn(res.data, callback);
            }, function (err) {
                console.log(err);
            });
        } else {
            UserLoggedIn(window.state.user);
        }
    };

    //hide side nav toggle if uset not logged in
    window.UserNotLoggedIn = function () {
        //side_nav_btn.addClass('hidden').removeClass('visible');
        // $('.notLoggedIn').show();
        // $('.isLoggedIn').hide();
        //InitGenerator();
        location.href = "/generate";
        // GENERATOR_VIEW.removeClass('hidden').addClass('visible');
        // window.setState('lastview','generator_view');
    };

    function UserLoggedIn(user, callback) {
        $('#username').html(window.state.user.full_name || window.state.user.display_name);
        document.querySelector('#account [name="email"]').value = window.state.user.email;
        $('input.referralCode').val(window.BASEURL + '?referral=' + user.code);
        $('a.fb.referralCode').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=https%3A//logojoy.com?referral=' + user.code);
        $('a.twitter.referralCode').attr('href', 'https://twitter.com/home?status=Entrepreneurs,%20now%20you%20can%20make%20your%20own%20logo.%20Use%20my%20code%20' + user.code + '%20for%20$20%20off.%20https%3A//logojoy.com?referral=' + user.code);
        $('a.email.referralCode').attr('href', 'mailto:?&subject=Cool new tool to make your own logo&body=Hey!%20Thought%20this%20might%20interest%20you,%20it\'s%20a%20site%20that%20allows%20you%20to%20make%20a%20logo.%20Use%20my%20code%20' + user.code + '%20for%20$20%20off.%0A%0ACheck%20it%20out%3A%20https%3A//logojoy.com?referrer=' + user.code);
        $('.isLoggedIn').removeClass('hidden').addClass('visible');
        $('.notLoggedIn').removeClass('visible').addClass('hidden');
        $('.notLoggedIn').hide();
        $('.isLoggedIn').show();
        window.setState('lastview', 'dashboard_view');
        overlay.data('hold', false);

        //check which view to load
        if (callback) {
            callback();
        }
        //else if(window.state && window.state.) window.LoadView(window.state.lastview);
    }

    //logout state
    $('#logout').click(function () {
        delete window.state;
        delete localStorage.state;
        window.Intercom("shutdown");
        $('.isLoggedIn').removeClass('visible').addClass('hidden');
        $('.notLoggedIn').removeClass('hidden').addClass('visible');
        location.href = window.BASEURL;
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 5. Navigation/Page Flow
     * * * * * * * * * * * * * * * * * * * * * * * */

    var side_nav = $('#side-nav'),
        side_nav_btn = $('#toggle-side-nav'),
        overlay = $('#overlay'),
        generator_adj = $('#generator-adjust'),
        prev_btn = $('#btn-previous'),
        gennext_btn = $('.generator-continue'),
        edit_logo_nav = $('#edit-logo-nav li'),
        edit_logo_font_nav = $('#edit-logo-font-nav li'),
        edit_logo_symbol_nav = $('#edit-logo-symbol-nav li'),
        edit_logo_container_nav = $('#edit-logo-container-nav li'),
        logorequest = {
        logos: [],
        colors: [],
        company: {},
        symbols: []
    };

    //On refresh/load
    window.onload = function () {
        if (window.state.lastview != 'generator_results_view') {
            prev_btn.addClass('hidden').removeClass('visible');
        }

        $('#unfavorite').hide();
    };

    //callbacks
    var updateUserData = function updateUserData() {
        overlay.data('hold', false);
        overlay.trigger('click');
        $('#signupModal').modal({ show: false });
        $('#loginModal').modal({ show: false });
        $('.modal').trigger('click');
        side_nav_btn.removeClass('hidden').addClass('visible');
    };

    //helpers
    side_nav_btn.click(function () {
        side_nav.addClass('active');
        overlay.addClass('visible').removeClass('hidden');
    });

    overlay.click(function () {
        if (!overlay.data('hold')) {
            side_nav.removeClass('active');
            overlay.addClass('hidden').removeClass('visible');
        }
        //remove any loaders
        overlay.find('.loader').addClass('hidden').removeClass('visible');
        overlay.find('h5').addClass('hidden').removeClass('visible');
    });

    window.logout = function () {
        delete localStorage.state;
        delete window.state;
        location.href = BASEURL;
    };

    window.LoadView = function (view) {

        var _this = this;
        document.querySelector('body').classList.remove('editor');
        APP_VIEW.addClass('hidden').removeClass('visible');
        if (window.state.admin) $('#show-admin').show();

        this.loadView = function (view) {
            if (view == 'generator_view') {
                InitGenerator();
            } else if (view == 'settings_view') {
                InitSettings();
            } else if (view == 'referral_view') {
                InitReferral();
            } else if (view == 'generator_results_view') {
                ShowGeneratorResults();
            } else if (view == 'edit_logo') {
                InitLogoEditor();
            } else if (view == 'revert_dashboard_view') {
                revertToDashboard();
            } else if (view == 'brandguidelines_view') {
                window.ShowBrandGuidelines();
            } else if (view == 'dashboard_view') {
                InitDashboard();
            } else if (view == 'admin_view') {
                InitAdmin();
            } else {
                InitDashboard();
            }
        };

        //terrible patch
        if (!isNaN(Number(window.logoid)) && window.logoid > 0) {
            if (!window.assets) {
                window.getLogoAssets().then(function (res) {
                    window.assets = res.data;
                });
            }
            $.ajax({
                url: window.APIURL + '/logos/' + window.logoid,
                headers: {
                    'Authorization': 'JWT ' + window.state.token,
                    'Content-Type': 'application/json'
                },
                type: 'GET'
            }).then(function (res) {
                var now = new Date().getTime();
                window.fetchedLogoOn = now;
                window.putLogoOn = now;
                window.activelogo = new window.Logo(JSON.parse(res.data.logo.ingredients), null, null, res.data.logo.id);
                InitLogoEditor();
            }, function (err) {
                console.log(err);
            });
        } else {
            if (!window.assets) {
                window.getLogoAssets().then(function (res) {
                    window.assets = res.data;
                    _this.loadView(view);
                });
            } else {
                _this.loadView(view);
            }
        }
    };
    function InitAdmin() {
        new window.AdminPanel();
        document.querySelector('#addCredit [name="credit"]').value = window.state.user.credit;
        $('#app-admin').removeClass('hidden').addClass('visible');
    }

    function InitSettings() {
        $('.menu-right').removeClass('visible').addClass('hidden');
        prev_btn.removeClass('visible').addClass('hidden');
        SETTINGS_VIEW.removeClass('hidden').addClass('visible');
        window.setState('lastview', 'settings_view');
        document.querySelector('#account').onsubmit = function (e) {
            e.preventDefault();
            var payload = {
                data: {
                    email: document.querySelector('#account [name="email"]').value,
                    password: document.querySelector('#account [name="password"]').value,
                    newpassword: document.querySelector('#account [name="newpassword"]').value
                }
            };
            document.querySelector('#account [type="submit"]').value = 'Updating';
            fetch(window.APIURL + '/users/', {
                method: 'PUT',
                mode: 'cors',
                headers: new Headers({
                    'Authorization': 'JWT ' + window.state.token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(payload)
            }).then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    response.json().then(function (res) {
                        console.log(res);
                        window.state.user.email = document.querySelector('#account [name="email"]').value;
                        window.setState('user', window.state.user);
                        document.querySelector('#account [type="submit"]').value = 'Updated';
                    });
                } else {
                    document.querySelector('#account [type="submit"]').value = 'Error';
                }
            }).catch(function (err) {
                console.log(err);
                document.querySelector('#account [type="submit"]').value = 'Error';
            });
        };
    }

    function InitReferral() {
        $('.menu-right').removeClass('visible').addClass('hidden');
        prev_btn.removeClass('visible').addClass('hidden');
        REFERRAL_VIEW.removeClass('hidden').addClass('visible');
        window.setState('lastview', 'referral_view');
    }

    function InitGenerator() {
        location.href = "/generate";
    }

    function InitLogoEditor() {
        if (!window.activelogo._ingredients.package) {
            // If we haven't purchased a package yet, we can show the editor controls.
            $('#logo-editor .edit-header').removeClass('hidden').addClass('visible');
            $('.js-fullscreen-slider').removeClass('no-editor');
        }

        document.querySelector('body').classList.add('editor');

        var bgl = new window.bglModal();

        prev_btn.removeClass('hidden').addClass('visible');
        if (!window.activelogo) {
            InitDashboard();
            return;
        }
        window.setState('lastview', 'edit_logo');
        // $('.app-dashboard .copy-header').removeClass('active');
        // $('.app-dashboard .edit-header').show();
        // $('.app-dashboard .edit-nav').addClass('active');
        window.initSliders();

        if (document.querySelector('.modal--social')) socialModal(document.querySelector('.modal--social'));
        window.resizeLogoContainer();

        $('.main-navbar__app .menu-right').addClass('visible').removeClass('hidden');
        $('#logo-favorites').removeClass('visible').addClass('hidden');
        $('#logo-editor').addClass('visible').removeClass('hidden');
        $('#logo-editor').unbind('click').click(function () {
            window.resizeLogoContainer();
        });

        $('.app-dashboard .copy-header').removeClass('active');

        $('#edit-logo-nav').find('.active').removeClass('active');
        $('.color-options li').removeClass('active');
        $('#edit-logo-nav').find('[data-option=preview-logo]').addClass('active');

        $('.edit-options').removeClass('visible').addClass('hidden');
        $('.app-dashboard .edit-nav').addClass('active');

        $('.main-navbar__app .menu-right').removeClass('hidden').addClass('visible');
        $('#logo-favorites').addClass('hidden').removeClass('visible');
        $('#logo-editor').removeClass('hidden').addClass('visible');

        DASHBOARD_VIEW.removeClass('hidden').addClass('visible');

        $('.edit-logos').addClass('hidden').removeClass('visible');
        $('.edit-logos.preview-logo').removeClass('hidden').addClass('visible');
        $('.edit-logos.preview-logo .preview-svg').html('');
        $('.edit-logos.company-name-options').html('');

        $('.arrow-keys').addClass('hidden').removeClass('visible');

        //create new logo from existing active logo
        //window.previewlogo = new window.Logo(window.activelogo._ingredients, window.state.assets, $('.edit-logos.preview-logo .preview-svg'));
        window.ineditlogo = new window.Logo(window.activelogo._ingredients, window.activelogo.svgfonts, $('.edit-logos.company-name-options'));
        //window.ineditlogo.AddElementToScreen();
        window.ineditlogo.SetEditListeners();
        window.ActivateCustomColor();

        // window.previewlogo.Draw();
        // window.previewlogo.GetElement().removeClass('atv-card').addClass('preview-mode');
        window.DrawPreviewLogos(true);
        // window.Intercom("trackEvent", 'Edit_Logo',{
        //         user_id: window.state.user.id,
        //         email: window.state.user.email,
        //         logo_id: window.activelogo._dbid
        //     });
        window.Intercom("update", {
            user_id: window.state.user.id,
            email: window.state.user.email,
            logo_id: window.activelogo._dbid
        });

        function proceedToCheckout() {
            localStorage.setItem('current-checkout', JSON.stringify({
                logoid: window.activelogo._dbid,
                referralCode: window.state.referralCode
            }));

            window.location = '/checkout/' + window.activelogo._dbid;
        }

        if (window.state.admin) {
            $('.js-download-button').removeClass('hidden');
            $('#buy-button').html('Regenerate').click(window.GenerateLogoFiles);
            $('#logo-editor .edit-header').removeClass('hidden').addClass('visible');
        } else if (window.activelogo._ingredients.package) {
            console.log('HAS package');
            $('.js-download-button').removeClass('hidden');
            $('#buy-button').html('Purchase Addons').unbind('click').click(proceedToCheckout);

            $.ajax({
                url: window.APIURL + '/purchases/' + window.logoid,
                headers: {
                    'Authorization': 'JWT ' + window.state.token,
                    'Content-Type': 'application/json'
                },
                type: 'GET'
            }).then(function (res) {
                var purchasedAt = new Date(res.data.purchase.purchased_on).getTime();
                var now = new Date().getTime();

                if (purchasedAt + 86400000 > now) {
                    window.activelogo.regenerateBeforeDownloading = true;
                    $('#logo-editor .edit-header').removeClass('hidden').addClass('visible');
                    return;
                }
            });
        } else {
            $('#buy-button').html('Buy').unbind('click').click(proceedToCheckout);

            $('#logo-editor .edit-header').removeClass('hidden').addClass('visible');
        }
    }

    window.ShowBrandGuidelines = function () {
        BRANDGUIDELINES_VIEW.removeClass('hidden').addClass('visible');
        window.setState('lastview', 'brandguidelines_views');
        window.initBrandGuidelines();
    };

    function ShowGeneratorResults() {
        $('.edit-logos.new-logos').removeClass('hidden').addClass('visible');
        $('.arrow-keys').addClass('visible').removeClass('hidden');

        GENERATOR_RESULTS_VIEW.removeClass('hidden').addClass('visible');
        prev_btn.removeClass('hidden').addClass('visible');
        window.setState('lastview', 'generator_results_view');

        if (window.activelogo) {
            window.activelogo.colorfill = window.ineditlogo.colorfill;
            window.activelogo.colorbg = window.ineditlogo.colorbg;
            window.activelogo.Update('refresh');
            window.activelogo.UpdateFavoriteIcon();
            //delete window.activelogo;
        }
        delete window.ineditlogo;

        if (!window.state.userid) {

            $('#signupModal').modal({
                backdrop: 'static',
                keyboard: false
            }).modal('show').find('#loginModalLink').data('backdrop', 'static').data('keyboard', false);
            overlay.data('hold', true);

            $('form[name="login"]').data('callback', 'onpage');
            $('form[name="signup"]').data('callback', 'onpage');
        } else {
            overlay.data('hold', false);
        }

        if (!window.state.generatorresults) {
            window.resizeLogoContainer(false);
            window.newlogocount = 0;
            window.drawinglogos = true;
            window.DrawNewLogos();

            window.genswiper = new Swiper(document.querySelector('.app-generator-results__container'), {
                slidesPerView: 'auto',
                centeredSlides: true,
                mousewheelControl: true,
                keyboardControl: true,
                nextButton: '.arrow-key-3.right',
                prevButton: '.arrow-key-3.left',
                wrapperClass: 'new-logos'
            });
            window.state.generatorresults = true;
        }
    }

    function InitDashboard() {
        console.log('init dash');
        window.state.generatorresults = false;
        document.querySelector('body').classList.remove('editor');
        prev_btn.addClass('hidden').removeClass('visible');
        //if not logged in
        if (!window.state.user) return InitGenerator();
        //update user state

        if (FAVORITED_LOGOS.find('.logo-container').length > 0) {} else {
            console.log('get logos');
            window.getLogos(window.DrawFavoritedLogos, { container: $('#favorite-logos.favorite-logos'), offset: 0, click: 'editlogo' });
        }

        DASHBOARD_VIEW.removeClass('hidden').addClass('visible');
        $('#logo-favorites').removeClass('hidden').addClass('visible');
        window.setState('lastview', 'dashboard_view');

        prev_btn.addClass('hidden').removeClass('visible');
        $('#unfavorite').hide();

        $('.main-navbar__app .menu-right').addClass('hidden').removeClass('visible');
        $('#logo-editor').addClass('hidden').removeClass('visible');
        // empty out all the sliders
        $('.swiper-wrapper').html('');
        window.initSliders();
    }

    window.initSliders = function () {
        if (!window.swiper) {
            window.swiper = new Swiper(document.querySelector('.swiper-container.newload'), {
                slidesPerView: 'auto',
                centeredSlides: true,
                mousewheelControl: true,
                keyboardControl: true,
                nextButton: '.arrow-key-2.right',
                prevButton: '.arrow-key-2.left',
                wrapperClass: 'swiper-wrapper'
            });
        }
    };

    function revertToDashboard() {
        console.trace('DB: revertToDashboard');
        prev_btn.addClass('hidden').removeClass('visible');
        $('#unfavorite').hide();
        DASHBOARD_VIEW.removeClass('hidden').addClass('visible');
        $('.main-navbar__app .menu-right').addClass('hidden').removeClass('visible');
        $('#logo-favorites').removeClass('hidden').addClass('visible');
        $('#logo-editor').addClass('hidden').removeClass('visible');
        //redraw all logos
        window.activelogo.colorfill = window.ineditlogo.colorfill;
        window.activelogo.colorbg = window.ineditlogo.colorbg;
        delete window.activelogo;

        window.RefreshLogos();
        // empty out
        $('.swiper-wrapper').html('');
    }

    window.showPackages = function () {
        var tsvg = void 0;
        if (window.ineditlogo.GetElement()) {
            tsvg = window.ineditlogo.GetElement().find('svg')[0].outerHTML;
        } else {
            tsvg = window.previewlogo.GetElement().find('svg')[0].outerHTML;
        }
        //let tsvg = window.ineditlogo.GetElement().find('svg')[0].outerHTML || window.previewlogo.GetElement().find('svg')[0].outerHTML ;
        document.querySelector('body').classList.remove('editor');
        //window.setState('lastview','checkout_view');

        //window.previewsvg = window.ineditlogo.GetElement().find('svg')[0].innerHTML;
        PACKAGES_VIEW.removeClass('hidden').addClass('active');
        $('.app-checkout').css('height', '100%');
        $('.main-navbar__app .menu-right').addClass('hidden').removeClass('visible');
        $('#logo-editor').addClass('hidden').removeClass('visible');
        window.setState('lastview', 'checkout_view');
    };
    function hideCheckout() {
        CHECKOUT_VIEW.removeClass('active').addClass('hidden').removeClass('visible');
        DASHBOARD_VIEW.removeClass('hidden').addClass('visible');
        PACKAGES_VIEW.addClass('hidden').removeClass('visible');
        $('.main-navbar__app .menu-right').removeClass('hidden').addClass('visible');
        $('#logo-editor').removeClass('hidden').addClass('visible');
        document.querySelector('body').classList.add('editor');
        window.setState('lastview', 'edit_logo');
    }

    window.initCheckout = function () {

        var plans = {
            basic: 20,
            premium: 65,
            enterprise: 165
        };
        window.totalcredit = 0;
        window.checkoutplan = plan;
        var total = plans[plan];

        window.state.referralCode = window.state.referralCode != window.state.user.code ? window.state.referralCode : '';
        window.setState('referralCode', '');
        $('#purchase-flow').show();
        $('#purchase-credit').html('');
        $('.app-checkout .credit').hide();
        $('#credit-card-info').show();
        if (plan == 'basic') $('#haveCoupon').hide();else {
            $('#haveCoupon').show();
            if (Number(window.state.user.credit) > 0 || window.state.referralCode) {
                $('#haveCoupon').hide();
                if (window.state.referralCode) {
                    window.totalcredit = 20;
                } else {
                    //window.totalcredit = 20;
                    window.totalcredit = window.state.user.credit > plans[plan] ? plans[plan] : window.state.user.credit;
                }
                total = total - window.totalcredit;
                if (total < 0.50) $('#credit-card-info').hide();
                $('.app-checkout .credit').show();
                $('#account-credit').html(window.totalcredit);
            }
        }
        $('#purchase-product').html(plan);
        $('#purchase-price').html(total);

        // //reset the form
        // $('#purchase').find('.alert').removeClass('visible').addClass('hidden');
        // $('.couponCode').removeClass('visible').addClass('hidden');
        // PURCHASE.find('#purchase-price').css('text-decoration', 'none');
        // PURCHASE.find('#purchase-price').css('color', 'black');
        // PURCHASE.find('#purchase-discount').hide();
        // APPLYCOUPON.removeClass('hidden').addClass('visible');
        // HAVECOUPON.removeClass('hidden').addClass('visible');
        // APPLYCOUPON.find('button').html('Apply');
        // APPLYCOUPON.find('button').prop('disabled', false);

        // APP_VIEW.addClass('hidden').removeClass('visible');
        // CHECKOUT_VIEW.removeClass('hidden').addClass('visible');


        // window.totalfinal = total;
        // window.totalcredit = window.totalcredit;
        // window.logoprice = plans[window.checkoutplan];

        // paypal.Button.render({
        //     env: window.env == 'prod' ? 'production':'sandbox',

        //     client: {
        // sandbox:    'ASC2XhrRcStI7kNavQjndrJI6krdo7opl3r_ds4GGPQ_qXWn6TDgmITUkkDnIoLOJC1-P5PSUDu_O76B',
        // production: 'AcZc3eJuv-4Il097eAKxkZk8oVtKOfEvyFNbVNh2zwG_2WqWz-ar-A0NpLorHPj4cbC3EmqcVFpsVyYX'
        //     },

        //     commit: true, // Show a 'Pay Now' button

        //     payment: function(data, actions) {
        //         return actions.payment.create({
        //             transactions: [
        //                 {
        //                     amount: { total: window.totalfinal, currency: 'USD' }
        //                 }
        //             ]
        //         });
        //     },

        //     onAuthorize: function(data, actions) {
        //         return actions.payment.execute().then(function(payment) {
        //             window.sendPaymentConversions();
        //             window.activelogo._ingredients.package = window.checkoutplan;
        //             let ingredients = JSON.parse(JSON.stringify(window.activelogo._ingredients));
        //             let payload = {
        //                 data:{
        //                     purchased:1,
        //                     ingredients:ingredients
        //                 },
        //                 id:window.activelogo._dbid,
        //             };
        //             frm.find('button').prop('disabled', false);
        //             window.putLogo(payload,window.GenerateLogoFiles);
        //         });
        //     }

        // }, '#paypal-button');
    };

    //GENERATE Views
    gennext_btn.click(function () {
        prev_btn.removeClass('hidden').addClass('visible');
        var step = Number($(this).attr('data-step'));
        if (step == 1) {
            $('#inspiration-symbols').removeClass('visible').addClass('hidden');window.ga('send', 'event', 'Onboarding', 'choose_inspiration');window.Intercom("trackEvent", "choose_inspiration");
        } else if (step == 2) {
            window.ga('send', 'event', 'Onboarding', 'choose_colors');window.Intercom("trackEvent", "choose_colors");
        } else if (step == 3) {
            $('#inspiration-symbols').removeClass('hidden').addClass('visible');window.ga('send', 'event', 'Onboarding', 'add_company_info');window.Intercom("trackEvent", "add_company_info");
        } else if (step == 4) {
            window.setState('generatorresults', false);$('.new-logos').html('');window.ga('send', 'event', 'Onboarding', 'record_symbols');window.Intercom("trackEvent", "record_symbols");window.LoadView('generator_results_view');
        }

        if (!$('.gnr-step' + step + '-btn').is('[disabled=disabled]')) {
            prev_btn.data('step', step);
            // $('body,html').scrollTop();
            // window.scrollTo(0, 0);
            // $('.generator-sub-views.active').scrollTop();

            $('.generator-sub-views.active').css('top', '0');
            $('.generator-step' + (step + 1)).show();
            $('.bottom-bar').addClass('hidden').removeClass('visible');
            $('.generator-step' + step).removeClass('active').addClass('left');
            setTimeout(function () {
                $('.generator-step' + step).removeClass('active--still');
                $('.generator-step' + (step + 1)).addClass('active--still');
                $('.generator-step' + (step + 1) + ' .bottom-bar').addClass('visible').removeClass('hidden');
            }, 250);
            $('.generator-step' + (step + 1)).addClass('active').removeClass('right');

            setTimeout(function () {
                //                $('.generator-step'+step).hide();
            }, 20);
        }
    });

    //Edit Logo Navigation
    edit_logo_nav.click(function () {

        var option = $(this).data('option');
        edit_logo_nav.removeClass('active');
        $('.edit-logos').addClass('hidden').removeClass('visible');
        $('.edit-options').addClass('hidden').removeClass('visible');
        $('.edit-options.' + option).removeClass('hidden').addClass('visible');
        $('.arrow-keys').addClass('hidden').removeClass('visible');

        switch (option) {
            case 'preview-logo':
                $('.edit-logos.preview-logo').removeClass('hidden').addClass('visible');
                window.DrawPreviewLogos();
                break;
            case 'edit-font':
                var fontview = void 0;
                edit_logo_font_nav.each(function () {
                    if ($(this).hasClass('active')) {
                        fontview = $(this).data('options');
                    }
                });

                $('.edit-logos.company-name-font').html('');
                window.ineditlogo.fontvariations = [];
                $('.edit-logos.company-slogan-font').html('');
                window.ineditlogo.sloganfontvariations = [];

                $('.edit-logos.' + fontview).removeClass('hidden').addClass('visible');
                //draw logo if not already on screen
                if (!window.ineditlogo.element) {
                    window.ineditlogo.Draw();
                }
                window.ineditlogo.Update('refresh');
                break;
            case 'edit-color':
                //draw logo if not already on screen
                if (!window.ineditlogo.element) {
                    window.ineditlogo.Draw();
                }
                //window.ineditlogo.Update('refresh');
                $('.edit-logos.edit-color').removeClass('hidden').addClass('visible');
                $('.color-options li').removeClass('active');
                window.ineditlogo.Update('refresh');
                break;
            case 'edit-layout':
                $('.arrow-keys').addClass('visible').removeClass('hidden');
                $('.edit-logos.edit-layout').html('');
                $('.edit-logos.edit-layout').removeClass('hidden').addClass('visible');
                window.ineditlogo.GetLayoutVariations();
                break;
            case 'edit-symbol':
                var symbolview = void 0;
                //draw logo if not already on screen
                if (!window.ineditlogo.element) {
                    window.ineditlogo.Draw();
                }
                $('#edit-logo-symbol-nav li[data-options="symbol-edit"]').trigger('click');
                window.ineditlogo.Update('refresh');
                break;
            case 'edit-container':
                //draw logo if not already on screen
                if (!window.ineditlogo.element) {
                    window.ineditlogo.Draw();
                }
                $('#edit-logo-container-nav li[data-options="container-edit"]').trigger('click');
                window.ineditlogo.Update('refresh');
                //if(window.ineditlogo.containervariations.length == 0) window.ineditlogo.GetContainerVariations('text_with_filled_container');
                break;
        }
        $(this).addClass('active');
    });

    edit_logo_font_nav.click(function () {
        var option = $(this).data('options');
        edit_logo_font_nav.removeClass('active');
        $('.edit-font .option-menu').addClass('hidden').removeClass('visible');
        $('.edit-logos').addClass('hidden').removeClass('visible');
        $('.edit-logos.' + option).removeClass('hidden').addClass('visible');
        $(this).addClass('active');
        $('.edit-font .' + option).removeClass('hidden').addClass('visible');

        if (option == 'company-name-font') {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            $('.edit-logos.company-name-font').html('');
            window.ineditlogo.fontvariations = [];
            window.ineditlogo.GetFontVariations(window.assets.fonts, null, true);
        } else if (option == 'company-slogan-font') {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            $('.edit-logos.company-slogan-font').html('');
            window.ineditlogo.sloganfontvariations = [];
            window.ineditlogo.GetSloganFontVariations(window.assets.fonts, null, true);
        } else {
            $('.arrow-keys').addClass('hidden').removeClass('visible');
            window.ineditlogo.Update('refresh');
        }
    });

    edit_logo_symbol_nav.click(function () {
        $('.arrow-keys').addClass('hidden').removeClass('visible');
        var option = $(this).data('options');
        edit_logo_symbol_nav.removeClass('active');

        $('.edit-symbol .option-menu').addClass('hidden').removeClass('visible');
        $('.edit-logos').addClass('hidden').removeClass('visible');
        $('.edit-logos.' + option).removeClass('hidden').addClass('visible');
        $(this).addClass('active');
        $('.edit-symbol .' + option).removeClass('hidden').addClass('visible');

        if (option == 'symbol-browser') {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            window.ineditlogo.symbolvariations = [];
            $('.edit-logos.symbol-browser').html('');
            $('.swiper-container.newload .edit-logos').html('');
        } else if (option == 'monograms-browser') {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            $('.edit-logos.monograms-browser').html('');
            window.ineditlogo.DrawMonogramVariations();
        } else if (option == 'symbol-container-browser') {
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            window.ineditlogo.symbolcontainervariations = [];
            $('.edit-logos.symbol-container-browser').html('');
            window.ineditlogo.GetSymbolContainerVariations(window.assets.container_symbols);
        } else {
            window.ineditlogo.Update('refresh');
        }
    });

    edit_logo_container_nav.click(function () {
        $('.arrow-keys').addClass('hidden').removeClass('visible');
        var option = $(this).data('options');
        edit_logo_container_nav.removeClass('active');
        $(this).addClass('active');
        $('.edit-logos.container-browser').removeClass('visible').addClass('hidden');
        $('.edit-logos.edit-container').removeClass('visible').addClass('hidden');
        if (option == 'container-edit') {
            $('.edit-container .container-edit').removeClass('hidden').addClass('visible');
            $('.edit-logos.edit-container').removeClass('hidden').addClass('visible');
            window.ineditlogo.Update('refresh');
        }
        if (option == 'filled-container-variations') {
            $('.edit-logos.container-browser').html('');
            $('.edit-logos.container-browser').removeClass('hidden').addClass('visible');
            $('.edit-container .container-edit').removeClass('visible').addClass('hidden');
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            window.ineditlogo.containervariations = [];
            window.ineditlogo.GetContainerVariations('text_with_filled_container');
            window.currentContainerVariation = 'text_with_filled_container';
        } else if (option == 'outline-container-variations') {
            $('.edit-logos.container-browser').html('');
            $('.edit-logos.container-browser').removeClass('hidden').addClass('visible');
            $('.edit-container .container-edit').removeClass('visible').addClass('hidden');
            $('.arrow-keys').addClass('visible').removeClass('hidden');
            window.ineditlogo.containervariations = [];
            window.ineditlogo.GetContainerVariations('text_with_outline_container');
            window.currentContainerVariation = 'text_with_outline_container';
        }
    });

    prev_btn.click(function () {
        document.querySelector('body').classList.remove('editor');

        if (!isNaN(Number(window.logoid))) {
            location.href = '/generate';
        } else if (window.state.lastview == 'generator_view') {
            var step = $(this).data('step');
            $(this).data('step', step - 1);
            $('body,html').scrollTop();
            window.scrollTo(0, 0);
            $('.generator-step' + step).show();
            $('.generator-step' + (step + 1)).removeClass('active').addClass('right');
            $('.bottom-bar').addClass('hidden').removeClass('visible');
            $('.generator-step' + step).addClass('active').removeClass('left');
            setTimeout(function () {
                $('.generator-step' + step + ' .bottom-bar').addClass('visible').removeClass('hidden');
                $('.generator-step' + (step + 1)).hide();
            }, 20);
            if (step == 1) {
                $(this).addClass('hidden').removeClass('visible');
            }
        } else if (window.state.lastview == 'generator_results_view') {
            if (confirm('Are you sure you want to go back? You will lose any unsaved changes.')) {
                $(this).data('step', 3);
                window.LoadView('generator_view');
                window.setState('generatorresults', false);
                $('.generator-sub-views').removeClass('active');
                $('.generator-step4').show();
                $('.generator-step4').removeClass('right').addClass('active');
                $('.generator-step4 .bottom-bar').removeClass('hidden').addClass('visible');
                $('.generator-step3').addClass('left');
                $('.generator-step2').addClass('left');
                $('.generator-step1').addClass('left');
                $('.app-generator-results__container .new-logos').html('');
            }
        } else if (window.state.lastview == 'edit_logo' && window.state.generatorresults == true) {
            $('.menu-right').removeClass('visible').addClass('hidden');
            $('.edit-logos.new-logos').removeClass('hidden').addClass('visible');
            if (window.newlogocount <= 6) {
                window.drawinglogos = true;
                window.DrawNewLogos();
            }
            window.LoadView('generator_results_view');
        } else if (window.state.lastview == 'edit_logo') {
            $('.menu-right').removeClass('visible').addClass('hidden');
            var svg = window.previewsvg = window.activelogo.GetElement().find('svg')[0].innerHTML;
            svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">' + svg + '</svg>';
            var ingredients = JSON.parse(JSON.stringify(window.activelogo._ingredients));
            var payload = {
                id: window.activelogo._dbid,
                svg: svg,
                data: { ingredients: ingredients }
            };
            window.putLogo(payload, revertToDashboard);
        } else if (window.state.lastview == 'checkout_view') {
            hideCheckout();
        }
    });

    // share url
    function socialModal(socialEl) {
        var shareUrl = window.location.origin + '/s/' + window.activelogo._dbid;

        var shareUrls = document.querySelectorAll('.shareUrls');
        for (var i = 0; i < shareUrls.length; i++) {
            var el = shareUrls[i];
            if (el.tagName == 'INPUT') el.setAttribute('value', shareUrl);
            if (el.tagName == 'A') el.setAttribute('href', shareUrl);
        }

        socialEl.querySelector('.btn--fb').onclick = function (e) {
            e.preventDefault;
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + shareUrl, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            return false;
        };

        socialEl.querySelector('.btn--twitter').onclick = function (e) {
            e.preventDefault;
            window.open('https://twitter.com/home?status=' + shareUrl, +shareUrl, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            return false;
        };

        socialEl.querySelector('.btn--email').setAttribute('href', 'mailto:?&amp;subject=?&amp;body=' + shareUrl);
    }

    window.loading = {
        overlay: document.querySelector('#overlay'),

        start: function start() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Loading";
            var hold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.overlay.classList.add('visible');
            this.overlay.classList.remove('hidden');

            this.overlay.querySelector('.loader').classList.add('visible');
            this.overlay.querySelector('.loader').classList.remove('hidden');

            this.overlay.querySelector('h5').innerHTML = text;
            this.overlay.querySelector('h5').classList.add('visible');
            this.overlay.querySelector('h5').classList.remove('hidden');
        },
        done: function done() {
            this.overlay.classList.remove('visible');
            this.overlay.classList.add('hidden');

            this.overlay.querySelector('.loader').classList.add('hidden');
            this.overlay.querySelector('.loader').classList.remove('visible');

            this.overlay.querySelector('h5').classList.remove('visible');
            this.overlay.querySelector('h5').classList.add('hidden');
        }
    };

    window.snackbar = function (state, text) {

        //Set color fo the snackbar
        if (state == "info") {
            $('.snackbar').css('background', '#454a50');
        }
        if (state == "warning") {
            $('.snackbar').css('background', 'orange');
        }
        if (state == "danger") {
            $('.snackbar').css('background', 'red');
        }
        if (state == "success") {
            $('.snackbar').css('background', 'green');
        }

        //Set the text of the snackbar
        $('.snackbar').find('.message').html(text);

        //Show the message for 2 seconds
        $('.snackbar').addClass('slideUp');
        setTimeout(function () {
            $('.snackbar').removeClass('slideUp');
        }, 2000);
    };
})(window, jQuery);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _querystring = __webpack_require__(16);

(function (window, $, undefined) {
    /* * * * * * * * * * * * * * * * * * * * *
    *   Legacy Jquery JS
    *   Table of contents
    *   1. Constants
    *   2. Event Bindings
    *   3. Old Stuff
    */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1. Constants
     * * * * * * * * * * * * * * * * * * * * * * * */
    var favorited_logos = $('#favorited_logos');
    var prev_btn = $('#btn-previous');
    var company_font_options = $('#company-font-options');
    var reverse_colors = $('#reverse-colors');
    var custom_color = $('#color-picker');
    var overlay = $('#overlay');
    var loadMore = $('button.loadmorelogos');

    var favoritelogos = [];
    var previewlogo = null;
    var logooffset = 0;
    window.newlogocount = 0;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 2. Event Bindings
     * * * * * * * * * * * * * * * * * * * * * * * */
    window.favoriteLogo = function (favorite, logo) {
        if (favorite) {
            window.drawinglogos = false;
            if (!window.activelogo || window.activelogo && window.activelogo._dbid != logo._dbid) {
                window.postLogo(logo, enterEditMode);
                favoritelogos.unshift(new window.Logo(logo.ingredients, logo.svgfonts, $('#favorite-logos.favorite-logos'), logo.id));
                $('#favorite-logos').html('');
                window.ga('send', 'event', 'App', 'favorite_logo_variation');
                window.Intercom("trackEvent", "favorited_logo");
            } else {
                enterEditMode(logo);
            }
        } else {
            $('#unfavorite').toggle();
        }
    };

    window.confirmUnfavorite = function () {
        window.activelogo._ingredients.favorite = false;
        var payload = {
            id: window.activelogo._dbid,
            data: { ingredients: window.ineditlogo._ingredients }
        };
        window.putLogo(payload, unfavoriteLogoSuccess);
    };

    var enterEditMode = function enterEditMode(logo) {
        window.activelogo = logo;
        window.ga('send', 'event', 'App', 'favorite_logo_variation');
        window.LoadView('edit_logo');
    };
    var unfavoriteLogoSuccess = function unfavoriteLogoSuccess() {
        $('#unfavorite').hide();
        window.snackbar("danger", 'Logo unfavorited');
        window.activelogo.GetElement().remove();
        window.LoadView('revert_dashboard_view');
        window.ga('send', 'event', 'App', 'unfavorite_logo');
    };

    //duplicate logo and its callback
    window.duplicateLogo = function () {
        //clean logo
        var logo = void 0;
        window.getLogo(window.activelogo._dbid).then(function (response) {
            response.json().then(function (res) {
                logo = res.data.logo;
                fetch(APIURL + '/logos/', {
                    headers: new Headers({
                        'Authorization': 'JWT ' + window.state.token,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ data: { ingredients: {} } }),
                    method: 'POST',
                    mode: 'cors'
                }).then(function (response) {
                    response.json().then(function (res) {
                        //really bad needs clean up from this patch;
                        var ingredients = JSON.parse(JSON.stringify(window.ineditlogo._ingredients));
                        ingredients.package = null;
                        var payload = { id: res.data.logo.id, data: { ingredients: ingredients }, svg: null };
                        window.putLogo(payload);
                        ingredients = JSON.parse(JSON.stringify(window.ineditlogo._ingredients));
                        ingredients.package = null;
                        var _logo = new window.Logo(ingredients, window.ineditlogo.svgfonts, $('#favorite-logos.favorite-logos'), res.data.logo.id);
                        _logo.AddElementToScreen(true);
                        _logo.GetElement().click(function () {
                            EditLogo(_logo);
                        });

                        _logo.colorfill = window.ineditlogo.colorfill;
                        _logo.colorbg = window.ineditlogo.colorbg;

                        favoritelogos.unshift(_logo);
                        window.snackbar("info", 'Logo duplicated');
                    });
                }).catch(function (err) {
                    console.log('err');
                });
            });
        });
    };

    function EditLogo(logo) {
        window.activelogo = logo;
        window.previewsvg = logo.GetElement().find('svg')[0].innerHTML;
        window.LoadView('edit_logo');
        //bind tooltip listeners
        if (window.innerWidth > 600) {

            $('#company-font-options li').click(function () {
                var font = $('#company-font-options li');
                font.css('filter', 'none');
                $(this).css('filter', 'saturate(70)');
            });

            $('#color-options li').unbind('hover').hover(window.addToolTip, window.removeToolTip);
            $('.menu-right li.action').unbind('hover').hover(window.addToolTip, window.removeToolTip);
            $('#company-font-options li').unbind('hover').hover(window.addToolTip, window.removeToolTip);
        }
        //init custom color picker
        window.ActivateCustomColor();
    }

    window.ActivateCustomColor = function () {
        $('#color-picker').spectrum({
            color: window.ineditlogo.GetColorHex(),
            preferredFormat: "hex",
            showInput: true,
            change: function change(color) {
                $('.edit-logos.edit-color').addClass('visible').removeClass('hidden');
                $('.edit-logos.color-browser').addClass('hidden').removeClass('visible');
                window.ineditlogo.SetCustomColor(color.toHexString().substring(1));
                window.ineditlogo.Update('refresh');
            }
        });
    };

    reverse_colors.click(function () {
        if ($('.edit-logos.edit-color').hasClass('visible')) {
            window.ineditlogo.Update('reverse_color');
        } else {

            if (window.groupcolor) {

                if (window.groupcolor == 'dark_bg') window.groupcolor = 'light_bg';else window.groupcolor = 'dark_bg';
            } else {
                window.groupcolor = window.ineditlogo._ingredients.color_tag == 'dark_bg' ? 'light_bg' : 'dark_bg';
            }
            window.ineditlogo.colorvariations.map(function (logo) {
                logo.Update('reverse_color');
            });
        }
    });

    window.resizeLogoContainer = function () {
        var editor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!document.querySelector('.container--editor')) return;
        var topOffset = 0,
            height = 0;
        if (editor) {
            topOffset = document.querySelector('.edit-header').offsetHeight > 100 ? document.querySelector('.edit-header').offsetHeight : 100;
            height = window.innerHeight - topOffset;
            var minimum = document.querySelector('.container--editor').querySelector('.logo-container') ? document.querySelector('.container--editor').querySelector('.logo-container').offsetHeight : 300;
            document.querySelector('.container--editor').style.minHeight = (height < minimum ? minimum : height) + "px";
            document.querySelector('.container--editor').style.top = topOffset + "px";
        } else {
            topOffset = document.querySelector('.app-generator-results .header').offsetHeight > 100 ? document.querySelector('.edit-header').offsetHeight : 100;
            height = window.innerHeight - topOffset;
            var _minimum = document.querySelector('.app-generator-results .container--editor').querySelector('.logo-container') ? document.querySelector('.container--editor').querySelector('.logo-container').offsetHeight : 300;
            document.querySelector('.app-generator-results .container--editor').style.minHeight = (height < _minimum ? _minimum : height) + "px";
            document.querySelector('.app-generator-results .container--editor').style.top = topOffset + "px";
        }
    };

    window.DrawNewLogos = function () {
        var logo = new window.Logo(null, null, $('.new-logos'));
        logo.DefineIngredients(window.state.logorequest);
        logo.Init();
        logo.DrawPromise().then(function (result) {
            logo.GetElement().click(function () {
                window.favoriteLogo(true, logo);
            }).addClass('swiper-slide').addClass('tip-hold-above').attr('data-tooltip-class', 'hold-above big').attr('data-tooltip', 'Click the logo to favorite it and edit fonts, colors, and even layouts');
            window.genswiper.onResize();

            window.newlogocount++;
            if (window.newlogocount <= 6 && window.drawinglogos) {
                window.DrawNewLogos();
            } else if (window.newlogocount >= 6) {
                var ask = document.createElement('div');
                ask.classList.add('swiper-slide', 'swiper-slide--load-more');
                ask.appendChild(document.createTextNode('See more logos'));
                window.genswiper.appendSlide(ask);
                ask.onclick = function () {
                    window.newlogocount = 0;
                    window.drawinglogos = true;
                    window.DrawNewLogos();
                    ask.parentNode.removeChild(ask);
                };
                window.drawinglogos = false;
                $('.app-generator-results .logo-container').unbind('hover').hover(window.addToolTip, window.removeToolTip);
            }
        }).catch(function (err) {
            logo.element.remove();
            if (window.newlogocount <= 6) {
                window.DrawNewLogos();
            }
        });
    };

    loadMore.click(function () {
        var options = { container: $('#favorite-logos.favorite-logos'), preview: null, click: 'editlogo' };
        window.getLogos(window.DrawFavoritedLogos, options);
        loadMore.addClass('visible').removeClass('hidden').html('<div class="loader"></div>');
    });

    window.RefreshLogos = function () {
        favoritelogos.map(function (logo) {
            console.log('refreshing');
            logo.Update('refresh');
        });
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 2. View Setters/Getters
     * * * * * * * * * * * * * * * * * * * * * * * */

    window.getLogoAssets = function () {
        return $.get(window.APIURL + '/generatordata');
    };

    window.DrawFavoritedLogos = function (logos, options) {
        //Count the number of favorited logos
        //let i = favoritelogos.length;
        console.log('logos', logos);
        if (logos.length < 10) {
            loadMore.addClass('hidden').removeClass('visible');
        } else {
            loadMore.addClass('visible').removeClass('hidden');
        }
        logos.map(function (logo) {
            if (logo && logo.ingredients.favorite) {
                var _logo = new window.Logo(logo.ingredients, null, options.container, logo.id);
                _logo.DrawPromise().then(function () {
                    console.log('draw complete');
                    if (options.click == 'editlogo') {
                        // _logo.GetElement().click(function(){EditLogo(_logo)});
                        _logo.GetElement().click(function () {
                            location.href = '/app?l=' + logo.id;
                        });
                    }

                    // if (options.click === 'brandguidelines') {
                    //     _logo.GetElement().on('click', () => window.onSelectBrandGuidelinesLogo(_logo));
                    // }
                    favoritelogos.push(_logo);
                }).catch(function (err) {
                    console.log(err);
                });
            }
        });
        //favorited_logos.html(favoritelogos.length);
    };

    function UpdateIngredientsVersion(ingredients) {
        //console.log('updating version',ingredients);
        var new_ingredients = JSON.parse(JSON.stringify(ingredients_v2));
        new_ingredients.color_tag = ingredients.dark_bg ? 'dark_bg' : 'light_bg';
        new_ingredients.color.hex = new_ingredients.color_tag == 'dark_bg' ? '#' + ingredients.hex : '#' + ingredients.main_text_color;
        new_ingredients.color_tags = JSON.parse(ingredients.color_tags);
        new_ingredients.company.company_name = ingredients.company_name;
        new_ingredients.company.company_slogan = ingredients.slogan ? ingredients.slogan.replace(/\\"/g, '\"') : ingredients.slogan;
        if (ingredients.layout == 'text_with_filled_container' || ingredients.layout == 'text_with_outline_container') {
            new_ingredients.container.path = $(ingredients.asset_src).html();
            new_ingredients.container.path = new_ingredients.container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
        }
        if (ingredients.layout == 'text_with_symbol') {
            var symbol = $(ingredients.asset_src);
            new_ingredients.symbol.path = symbol.html();
        }
        new_ingredients.favorite = true;
        new_ingredients.layout = ingredients.layout;
        new_ingredients.layouts = ingredients.layout_preferences;
        new_ingredients.main_text.font = ingredients.main_font;
        new_ingredients.main_text.size = ingredients.main_size;
        new_ingredients.main_text.letter_spacing = ingredients.main_letter_spacing;
        new_ingredients.main_text.all_caps = ingredients.company_name == ingredients.company_name.toUpperCase() ? 1 : 0;
        new_ingredients.slogan_text.font = ingredients.slogan_font;
        new_ingredients.slogan_text.size = ingredients.slogan_size;
        new_ingredients.slogan_text.letter_spacing = ingredients.slogan_letter_spacing;
        new_ingredients.monogram.font = ingredients.symbol_font;
        new_ingredients.monogram.text = ingredients.company_name[0].toUpperCase();
        new_ingredients.monogram.size = ingredients.symbol_master_size;
        new_ingredients.symbol.scale = ingredients.layout == 'text_with_symbol' ? ingredients.symbol_size / 50 : ingredients.symbol_master_size / 50;
        new_ingredients.weight = ingredients.main_weight;

        //console.log(new_ingredients);
        return new_ingredients;
    }

    window.DrawPreviewLogos = function () {
        var redraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        //draw main logo
        if (redraw) {
            window.previewlogo = new window.Logo(window.ineditlogo._ingredients, window.ineditlogo.svgfonts, $('#svg-placeholder'));
            window.previewlogo.DrawPromise().then(function () {
                window.ineditlogo.svgfonts = window.previewlogo.svgfonts;
                window.ineditlogo.colorfill = window.previewlogo.colorfill;
                window.ineditlogo.colorbg = window.previewlogo.colorbg;
                window.DrawPreviewLogos();
            });
        } else {
            initPreviewSliders();
            // let svgdimensions = (window.ineditlogo && window.ineditlogo._ingredients.svg.width) ? JSON.parse(JSON.stringify(window.ineditlogo._ingredients.svg)):window.previewlogo._ingredients.svg;

            window.previewlogo.colorfill = window.ineditlogo.colorfill;
            window.previewlogo.colorbg = window.ineditlogo.colorbg;
            if (window.window.previewlogo._ingredients.color_tag == 'light_bg') {
                window.previewlogo.colorfill = window.ineditlogo.colorbg;
                window.previewlogo.colorbg = window.ineditlogo.colorfill;
            }
            window.previewlogo.svgfonts = window.ineditlogo.svgfonts;
            window.previewlogo.Update('refresh');
            var svg = window.previewsvg = window.previewlogo.GetElement().find('svg')[0].innerHTML;
            var previews = {
                'svg': { logo: null, type: 'darkbg' },
                'business-card': { logo: null, type: 'colorinvert', class: 'skew' },
                'letterhead': { logo: null, type: 'colorinvert', class: 'skew' },
                'envelope': { logo: null, type: 'colorinvert', class: 'skew' },
                'building': { logo: null, type: 'colordark', class: 'skew' },
                'box': { logo: null, type: 'colorinvert', class: 'skew' },
                'box2': { logo: null, type: 'colordark', class: 'skew' },
                'iphone': { logo: null, type: 'darkbg', class: 'skew' }, /* re-used this one for live previews */
                'apparel1': { logo: null, type: 'lightbg', class: 'skew' }, /* the rest of these are new June 18 2017 */
                'apparel2': { logo: null, type: 'darkbg', class: 'skew' }, /* the rest of these are new June 18 2017 */
                'title': { logo: null, type: 'colorinvert', class: 'skew' },
                'escalator': { logo: null, type: 'lighten', class: 'skew' },
                'bcard1': { logo: null, type: 'darkbg', class: 'skew' },
                'bcard2': { logo: null, type: 'black', class: 'skew' },
                'bcard3': { logo: null, type: 'darkbg', class: 'skew' },
                'goldfoil': { logo: null, type: 'colorinvert', class: 'skew' } };

            $('.preview-svg').css('background', window.previewlogo.colorbg);
            $('.shirt-colour svg path').css('fill', window.previewlogo.colorbg);
            $('.slider--slide-bcards').css('background', window.previewlogo.colorbg);
            $('.bcard.c1 .colour-bg, .bcard.c3 .colour-bg').css('background-color', window.previewlogo.colorbg);

            var companyNameNoSpace = window.activelogo._ingredients.company.company_name;
            companyNameNoSpace = companyNameNoSpace.replace(/\s/g, '');

            $('.word-wrap .main-title').html(window.activelogo._ingredients.company.company_name);
            $('.word-wrap .email').html('info@' + companyNameNoSpace + '.com');

            // if(window.activelogo._ingredients.svg.height == 0 || window.activelogo._ingredients.svg.width == 0){window.activelogo._ingredients.svg = window.svgd}
            var dimensions = 'height="' + window.previewlogo._ingredients.svg.height + '" width="' + window.previewlogo._ingredients.svg.width + '"';

            // HEIGHT/WIDTH BROKEN OUT FOR VIEWBOX
            var dimHeight = window.previewlogo._ingredients.svg.height;
            var dimWidth = window.previewlogo._ingredients.svg.width;

            // let previews = {'svg':{logo:null},'business-card':{logo:null,type:'colorinvert',class:'skew'},'letterhead':{logo:null,type:'colorinvert',class:'skew'},'envelope':{logo:null,type:'colorinvert',class:'skew'},'iphone':{logo:null,type:'colorinvert',class:'skew'},'building':{logo:null,type:'colordark',class:'skew'},'box':{logo:null,type:'colorinvert',class:'skew'},'box2':{logo:null,type:'colordark',class:'skew'}}
            // if(window.activelogo._ingredients.svg.height == 0 || window.activelogo._ingredients.svg.width == 0){window.activelogo._ingredients.svg = window.svgd}
            // let dimensions = 'height="'+window.activelogo._ingredients.svg.height+'" width="'+window.activelogo._ingredients.svg.width+'"';
            for (var key in previews) {
                //clear preview
                var isvg = JSON.parse(JSON.stringify(svg.replace(/\"/g, '\\"')));
                isvg = isvg.replace(/\\"/g, '"');
                if (true) {
                    isvg = '<div class="plogo skew"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ' + dimensions + ' viewBox="0 0 ' + dimWidth + ' ' + dimHeight + '">' + isvg + '</svg></div>';
                    $('.preview-' + key).html(isvg);
                    if (window.activelogo._ingredients.layout == 'text_with_filled_container' || window.activelogo._ingredients.layout == 'text_and_symbol_with_filled_container') {

                        if (previews[key].type == 'black') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', '#000000');
                        } else if (previews[key].type == 'lightbg') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', window.activelogo._ingredients.color.hex);
                        } else if (previews[key].type == 'lighten') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', 'rgba(255,255,255, 0.7)');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', 'rgba(255,255,255, 0.7)');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', 'rgba(255,255,255, 0.7)');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', 'rgba(0,0,0, 0.9)');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', 'rgba(0,0,0, 0.9)');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', 'rgba(0,0,0, 0.9)');
                        } else {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', '#ffffff');
                        }
                    } else if (window.activelogo._ingredients.layout == 'text_with_text_in_symbol') {
                        if (previews[key].type == 'black') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="symbolfill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').css('fill', '#ffffff');
                        } else if (previews[key].type == 'lightbg') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="symbolfill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').css('fill', '#ffffff');
                        } else if (previews[key].type == 'lighten') {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', 'rgba(0,0,0,0.9)');
                            $('.preview-' + key + ' svg g[rel="symbolfill"]').attr('fill', 'rgba(255,255,255,0.9)');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').attr('fill', 'rgba(255,255,255,0.9)');
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').css('fill', 'rgba(255,255,255,0.9)');
                        } else {
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"]').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="inversefill"] path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="symbolfill"]').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="symbolfill"] > path').css('fill', window.activelogo._ingredients.color.hex);
                        }
                    } else {
                        if (previews[key].type == 'black') {
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#000000');
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#000000');
                        } else if (previews[key].type == 'lightbg') {
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', window.activelogo._ingredients.color.hex);
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', window.activelogo._ingredients.color.hex);
                        } else if (previews[key].type == 'lighten') {
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', 'rgba(0,0,0, 0.9)');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', 'rgba(0,0,0, 0.9)');
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', 'rgba(0,0,0, 0.9)');
                        } else {
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').attr('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"] > path').css('fill', '#ffffff');
                            $('.preview-' + key + ' svg g[rel="mainfill"]').attr('fill', '#ffffff');
                        }
                    }
                } else {
                    var color = window.activelogo._ingredients.color_tag == 'dark_bg' ? window.activelogo._ingredients.color.hex : '#ffffff';
                    $('.preview-' + key).css('background', color);
                    $('.preview-' + key + ' .atv-card-shine').remove();
                    $('.preview-' + key + ' .logo-container').removeClass('atv-card');
                }
            }

            // add the shadow to the building
            // let buildingClone = document.querySelector('.preview-building').querySelector('.plogo').cloneNode('true');
            // buildingClone.classList.add('shadow');
            // document.querySelector('.preview-building').appendChild(buildingClone);
        }
    };
    // ========== LIVE PREVIEW SLIDER NC
    var pageWidth = $(window).width();
    var sliding = false;
    function slideRight(e, next) {
        var current = $('.slider--slide.slider--slide-active');
        var next = next || current.next('.slider--slide').length && current.next('.slider--slide') || $('.slider--slide.slider--slide-first');

        if (sliding) {
            return;
        }
        if (next == current) {
            return;
        }

        sliding = true;

        $('.slider--slide.slider--slide-active').animate({ left: '-=' + pageWidth }, 1000, function () {
            current.removeClass('slider--slide-active').css({ left: 0 });
        });

        next.css({ left: pageWidth + 'px' });
        next.addClass('slider--slide-active');
        next.animate({ left: '-=' + pageWidth }, 1000, function () {
            sliding = false;
        });
        // next.find('video').each(function(i, v) { v.play() })
        next.find('video').each(function (i, v) {
            console.log('video');v.play();
        });

        $('.thumb').removeClass('active-slide');
        $('.thumb[data-thumb="' + next.data('slide') + '"]').addClass('active-slide');
    }

    $('.arrow-right').on('click', slideRight);

    function slideLeft(e, next) {
        if (sliding) {
            return;
        }
        sliding = true;

        var current = $('.slider--slide.slider--slide-active');
        var next = next || current.prev('.slider--slide').length && current.prev('.slider--slide') || $('.slider--slide.slider--slide-last');

        $('.slider--slide.slider--slide-active').animate({ left: '+=' + pageWidth }, 1000, function () {
            current.removeClass('slider--slide-active').css({ left: 0 });
        });

        next.css({ left: '-' + pageWidth + 'px' });
        next.addClass('slider--slide-active');
        next.animate({ left: '+=' + pageWidth }, 1000, function () {
            sliding = false;
        });
        next.find('video').each(function (i, v) {
            console.log('video');v.play();
        });

        $('.thumb').removeClass('active-slide');
        $('.thumb[data-thumb="' + next.data('slide') + '"]').addClass('active-slide');
    }

    $('.arrow-left').on('click', slideLeft);

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:
                slideLeft();break;
            case 39:
                slideRight();break;
            default:
                return;
        }
        e.preventDefault();
    });

    // ===== THUMBNAILS
    $('.thumb').on('click', function (e) {
        if (!$(this).hasClass('active-slide')) {
            $('.thumb').removeClass('active-slide');
            $(this).addClass('active-slide');
            var slide = $(e.target).data('slide');
            slideRight(e, $('.slider--slide.' + slide));
        }
    });

    // ===== SLIDER SWIPING - HAMMER.JS
    function initPreviewSliders() {
        $(function () {
            // var sr = new Hammer($('.slider.fullscreen')[0]);
            // sr.on('swipeleft', slideRight)
            // sr.on('swiperight', slideLeft)
            // var sr = new Hammer.Manager(document.querySelector('.slider.fullscreen'), {
            //     touchAction: 'auto',
            //     inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
            //     recognizers: [
            //     [Hammer.Swipe, {
            //         direction: Hammer.DIRECTION_HORIZONTAL
            //     }]
            //     ]
            // });
            // $('.slider.fullscreen').on("swipeleft",function(){slideLeft});
            // $('.slider.fullscreen').on("swiperight",function(){slideRight});
            // sr.on('swipeleft', slideRight)
            // sr.on('swiperight', slideLeft)
            // var touchArea = document.getElementById('toucharea');
            // var myRegion = new ZingTouch.Region(touchArea);

            // myRegion.bind(touchArea, 'swipe', function(e){
            //     console.log(e.detail);
            // });
        });
    }

    window.updateFavoriteLogos = function () {
        favoritelogos.map(function (logo) {
            logo.Update('refresh');
        });
    };
    window.ToggleLogoFiles = function () {
        $('#logo-files').toggle();
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 3. API Calls
     * * * * * * * * * * * * * * * * * * * * * * * */
    window.DownloadLogo = function () {
        if (window.activelogo.regenerateBeforeDownloading && window.fetchedLogoOn !== window.putLogoOn) {
            window.loading.start('Generating updated logo files');

            var svgElement = window.ineditlogo.GetElement() || window.previewlogo.GetElement();
            var previewSvg = svgElement.find('svg')[0].innerHTML;
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">\n                ' + previewSvg + '\n            </svg>';

            var ingredients = JSON.parse(JSON.stringify(window.activelogo._ingredients));

            var body = {
                logo: {
                    ingredients: ingredients,
                    svg: svg
                },
                id: window.activelogo._dbid,
                packageType: window.activelogo._ingredients.package,
                admin: window.state.admin
            };

            $.ajax({
                method: 'POST',
                url: window.APIURL + '/purchases/fulfillment',
                data: JSON.stringify(body),
                headers: {
                    Authorization: 'JWT ' + window.state.token,
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                window.loading.done();
                window.location.href = res.data.payload.packageUrl;
                window.putLogoOn = window.fetchedLogoOn;
            });
            return;
        }

        var BASE_URL = 'https://s3.ca-central-1.amazonaws.com/logojoy/logos';
        var activelogo = window.activelogo;
        window.location.href = BASE_URL + '/' + activelogo._dbid + '/' + activelogo._dbid + '.zip';
    };

    window.getLogos = function (callback, options) {
        var query = {
            limit: 10,
            offset: options.offset === 0 ? options.offset : logooffset,
            orderby: 'updated_on',
            user_id: window.state.user.id
        };

        if (options.purchased) {
            query.purchased = 1;
        }

        $.ajax({
            url: window.APIURL + '/logos?' + (0, _querystring.stringify)(query),
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            type: 'GET'
        }).then(function (res) {
            logooffset += 10;
            if (res.data.logos.length) loadMore.addClass('visible').removeClass('hidden').html('Load More Logos');
            callback(res.data.logos, options);
        }, function (err) {
            console.log(err);
        });
    };

    window.getLogo = function (logo_id) {
        return fetch(APIURL + '/logos/' + logo_id, {
            headers: new Headers({
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            }),
            method: 'GET',
            mode: 'cors'
        });
    };

    window.postLogo = function (logo, callback) {
        var svg = window.previewsvg = logo.GetElement().find('svg')[0].innerHTML;
        var dimensions = 'height="' + logo._ingredients.svg.height + '" width="' + logo._ingredients.svg.width + '"';
        if (logo._ingredients.color_tag == 'dark_bg') svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ' + dimensions + '><rect ' + dimensions + ' fill="' + logo._ingredients.color.hex + '"/>' + svg + '</svg>';else svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ' + dimensions + '>' + svg + '</svg>';

        var ingredients = JSON.parse(JSON.stringify(logo._ingredients));
        ingredients.favorite = true;
        // ingredients.company.company_name = ingredients.company.company_name.replace(/'/g,"'");
        // if(ingredients.company.company_slogan) ingredients.company.company_slogan = ingredients.company.company_slogan.replace(/'/g,"'");
        //window.svgd = JSON.parse(JSON.stringify(ingredients.svg));
        if (ingredients.layout == 'plain_text' || ingredients.layout == 'multi_text' || ingredients.layout == 'text_with_text_as_symbol' || ingredients.layout == 'multi_text_with_text_as_symbol') {
            ingredients.symbol = { path: null, size: null };
            ingredients.container = { path: null, scale: null };
            ingredients.monogram_container = { path: null, scale: null };
        } else if (ingredients.layout == 'text_with_filled_container' || ingredients.layout == 'text_with_outline_container') {
            ingredients.symbol = { path: null, size: null };
            ingredients.monogram_container = { path: null, scale: null };
            ingredients.container.path = ingredients.container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
        } else if (ingredients.layout == 'text_and_symbol_with_outline_container' || ingredients.layout == 'text_and_symbol_with_filled_container') {
            ingredients.symbol.path = ingredients.symbol.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
            ingredients.monogram_container = { path: null, scale: null };
            ingredients.container.path = ingredients.container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
        } else if (ingredients.layout == 'text_with_text_in_symbol' || ingredients.layout == 'multi_text_with_text_in_symbol') {
            ingredients.symbol = { path: null, size: null };
            ingredients.container = { path: null, scale: null };
            ingredients.monogram_container.path = ingredients.monogram_container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
        } else if (ingredients.layout == 'text_with_symbol' || ingredients.layout == 'multi_text_with_symbol') {
            ingredients.container = { path: null, scale: null };
            ingredients.monogram_container = { path: null, scale: null };
            ingredients.symbol.path = ingredients.symbol.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
        } else ingredients.symbol = { path: null, scale: null, alignment: null };
        ingredients.symbols = [];

        ingredients.company.company_name = ingredients.company.company_name.replace(/'/g, "").replace(/\"/g, '\\"');
        if (ingredients.company.company_slogan) ingredients.company.company_slogan = ingredients.company.company_slogan.replace(/'/g, "").replace(/\"/g, '\\"');
        //Add selected logo to the favorited list
        console.log('ingredients', ingredients);
        $.ajax({
            url: window.APIURL + '/logos',
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ data: { ingredients: ingredients }, svg: svg.replace(/\"/g, '\"') }),
            type: 'POST'
        }).then(function (res) {
            if (!logo._ingredients.favorite) window.snackbar("info", 'Favorited and saved logo to account');
            // res.data.logo.svgfonts = logo.svgfonts;
            logo._dbid = res.data.logo.id;
            logo._ingredients.favorite = true;
            if (callback) callback(logo);
        }, function (err) {
            console.log(err);
        });
    };

    window.putLogo = function (payload, callback) {
        if (payload.data.ingredients) {
            payload.data.ingredients.symbols = [];
            if (payload.data.ingredients.layout == 'plain_text' || payload.data.ingredients.layout == 'multi_text' || payload.data.ingredients.layout == 'text_with_text_as_symbol' || payload.data.ingredients.layout == 'multi_text_with_text_as_symbol') {
                payload.data.ingredients.symbol = { path: null, scale: null };
                payload.data.ingredients.container = { path: null, scale: null };
                payload.data.ingredients.monogram_container = { path: null, scale: null };
            } else if (payload.data.ingredients.layout == 'text_with_filled_container' || payload.data.ingredients.layout == 'text_with_outline_container') {
                payload.data.ingredients.symbol = { path: null, scale: null };
                payload.data.ingredients.monogram_container = { path: null, scale: null };
                payload.data.ingredients.container.path = payload.data.ingredients.container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
            } else if (payload.data.ingredients.layout == 'text_and_symbol_with_outline_container' || payload.data.ingredients.layout == 'text_and_symbol_with_filled_container') {
                payload.data.ingredients.symbol.path = payload.data.ingredients.symbol.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
                payload.data.ingredients.monogram_container = { path: null, scale: null };
                payload.data.ingredients.container.path = payload.data.ingredients.container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
            } else if (payload.data.ingredients.layout == 'text_with_text_in_symbol' || payload.data.ingredients.layout == 'multi_text_with_text_in_symbol') {
                payload.data.ingredients.symbol = { path: null, scale: null };
                payload.data.ingredients.container = { path: null, scale: null };
                payload.data.ingredients.monogram_container.path = payload.data.ingredients.monogram_container.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
            } else if (payload.data.ingredients.layout == 'text_with_symbol' || payload.data.ingredients.layout == 'multi_text_with_symbol') {
                payload.data.ingredients.container = { path: null, scale: null };
                payload.data.ingredients.monogram_container = { path: null, scale: null };
                payload.data.ingredients.symbol.path = payload.data.ingredients.symbol.path.replace(/\"/g, '\\"').replace(/[\r\n]/g, '');
            }

            payload.data.ingredients.company.company_name = payload.data.ingredients.company.company_name.replace(/'/g, '\'\'').replace(/\"/g, '\\"');
            if (payload.data.ingredients.company.company_slogan) payload.data.ingredients.company.company_slogan = payload.data.ingredients.company.company_slogan.replace(/'/g, '\'\'').replace(/\"/g, '\\"');
        }
        window.state.lastEditedLogo = { id: window.activelogo._dbid, ingredients: payload.data.ingredients };
        $.ajax({
            url: window.APIURL + '/logos',
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payload),
            type: 'PUT'
        }).then(function (res) {
            payload.data.ingredients.company.company_name = payload.data.ingredients.company.company_name.replace(/''/g, '\'');
            window.setState('lastEditedLogo', window.state.lastEditedLogo);
            window.putLogoOn = new Date().getTime();
            if (callback) callback();
        }, function (err) {
            console.log(err);
        });
    };

    var ingredients_v1 = {
        asset_can_contain: null,
        asset_fits_in: null,
        asset_src: null,
        bold_light: null,
        bold_light_possible: null,
        can_contain: null,
        can_contain_list: null,
        can_contain_stacked_text: null,
        card_title: null,
        color: null,
        color_name: null,
        color_tags: null,
        colors: {},
        company_name: null,
        company_name_2: null,
        container_can_contain: null,
        container_type: null,
        container_weight: null,
        container_x_offset: null,
        container_y_offset: null,
        core_font: null,
        dark_bg: null,
        db_id: null,
        floor: null,
        hex: null,
        layout: null,
        layout_preferences: {},
        light_bold: null,
        logo_tags: [],
        main_all_caps: null,
        main_all_caps_2: null,
        main_font: null,
        main_font_2: null,
        main_letter_spacing: null,
        main_letter_spacing_2: null,
        main_no_caps: null,
        main_no_caps_2: null,
        main_size: null,
        main_size_2: null,
        main_text_color: null,
        main_text_path: null,
        main_text_path_2: null,
        main_weight: null,
        main_weight_2: null,
        monogram_text: null,
        new_main_size: null,
        number_of_all_caps_tags: null,
        number_of_layouts: null,
        percent_tagged_with_bold_light: null,
        precent_tagged_with_light_bold: null,
        purchased: 0,
        scale_type: null,
        score: 0,
        size_multiplier: null,
        slogan: null,
        slogan_activated: null,
        slogan_all_caps: null,
        slogan_font: null,
        slogan_letter_spacing: null,
        slogan_no_caps: null,
        slogan_size: null,
        slogan_text_color: null,
        slogan_text_path: null,
        slogan_weight: null,
        stacked_main_text: null,
        symbol_alignment: null,
        symbol_alignments: {},
        symbol_all_caps: null,
        symbol_can_be_placed: null,
        symbol_container_can_be_placed: null,
        symbol_container_name: null,
        symbol_container_type: null,
        symbol_container_weight: null,
        symbol_container_x_offset: null,
        symbol_container_y_offset: null,
        symbol_font: null,
        symbol_letter_spacing: null,
        symbol_master_size: null,
        symbol_master_size_ratio: null,
        symbol_name: null,
        symbol_no_caps: null,
        symbol_size: null,
        symbol_text_path: null,
        symbol_weight: null,
        tags: {},
        temp_id: null,
        text_symbol_color: null,
        two_colors: null
    };

    var ingredients_v2 = {
        version: 2,
        color: {},
        color_tag: null,
        color_tags: [],
        company: {
            company_name: null,
            company_slogan: null
        },
        favorite: true,
        layout: null,
        layouts: {},
        main_text: {
            font: null,
            letter_spacing: null,
            size: null,
            all_caps: null
        },
        slogan_text: {
            font: null,
            letter_spacing: null,
            scale: null,
            all_caps: null
        },
        monogram: {
            font: null,
            size: null,
            text: null,
            all_caps: null,
            alignment: null
        },
        monogram_container: {
            path: null,
            scale: null
        },
        container: {
            path: null,
            scale: null
        },
        svg: {
            height: 0,
            width: 0
        },
        symbol: {
            path: null,
            size: null,
            alignment: null
        },
        symbols: [],
        tag: null,
        tags: null,
        weight: null,
        weights: null

    };
})(window, jQuery);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(17);
exports.encode = exports.stringify = __webpack_require__(18);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, Logo) {
    /* * * * * * * * * * * * * * * * * * * * *
    *   Legacy Jquery JS
    *   Table of contents
    *   1. Constants
        2. Views
    *   3. Getters/Setters
    *   4. Request Build
    *   5. Templaters
    *
    */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1. Constants
     * * * * * * * * * * * * * * * * * * * * * * * */
    var INSPIRATIONLOGOS = $('#inspiration-logos');
    var INSPIRATIONCOLORS = $('#inspiration-colors');
    var INSPIRATIONSEL = $('#inspiration .selection-box');
    var PROGRESSBAR = $('#progress-bar');
    var SYMBOLSEARCH = $('#symbol-search');
    var SYMBOLSEARCHRESULTS = $('#symbol-search-results');
    var overlay = $('#overlay');

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1.1 Globals
     * * * * * * * * * * * * * * * * * * * * * * * */
    var logorequest = {
        logos: [],
        colors: [],
        company: {},
        symbols: []
    };
    var inspiration_logos = [];
    var symbol_search_results = [];

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1. Getters/Setters
     * * * * * * * * * * * * * * * * * * * * * * * */

    function LoadGeneratorData() {
        if (window.state && window.state.logorequest) logorequest = window.state.logorequest;
        //load logos
        logorequest.logos.map(function (obj) {
            $('#inspiration-logos .selection-box[data-inspiration-id="' + obj.id + '"]').addClass('selected');
        });

        logorequest.colors.map(function (id) {
            $('#inspiration-colors .selection-box[data-colors-id="' + id + '"]').addClass('selected');
        });

        //symbols have expiry so don't preserve
        logorequest.symbols = [];
        // logorequest.symbols.map( symbol => {
        //     if(symbol){
        //         let s = [symbol];
        //         $('#inspiration-symbols .favorite-symbol.open')
        //             .first()
        //             .removeClass('open').addClass('filled')
        //             .html(DrawSymbolPngs(s))
        //             .click(RemoveInspirationSymbol);
        //             selected_symbols++;
        //     }
        // });
        //company
        $('.gnr-step3-btn').attr('disabled', true);

        for (var key in logorequest.company) {
            if (key == 'company_name' && logorequest.company[key]) $('.gnr-step3-btn').attr('disabled', false);
            $('input[name="' + key + '"]').val(logorequest.company[key]);
        }

        ToggleLogoNav();
        ToggleColorNav();
        //ToggleSymbolNav();

        // if the query is in the url
        var windowArgs = {};
        location.search.substr(1).split("&").forEach(function (item) {
            windowArgs[item.split("=")[0]] = item.split("=")[1];
        });
        if (window.location.search) {
            console.log('setting name');
            $('[name=company_name]').val(decodeURIComponent(window.location.search.split('=')[1]).replace(/\+/g, ' '));
            logorequest.company.company_name = decodeURIComponent(window.location.search.split('=')[1]).replace(/\+/g, ' ');
            $('.gnr-step3-btn').attr('disabled', false);
        }
    }

    // let inspiration;
    window.getInspiration = function () {
        $.ajax({
            url: APIURL + "/generatordata/inspiration",
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: localStorage.token
            }
        }).then(function (res) {
            inspiration_logos = res.data.inspiration;
            INSPIRATIONLOGOS.html(DrawInspiration(res.data.inspiration)).find('.selection-box').click(SelectInspirationLogo);

            INSPIRATIONCOLORS.html(DrawColors()).find('.selection-box').click(SelectInspirationColor);

            if (window.innerWidth > 600) {
                $('#inspiration-colors .logo-colors').unbind('hover').hover(window.addToolTip, window.removeToolTip);
            }

            LoadGeneratorData();
        }, function (err) {
            window.strd_err(err);
        });
    };

    //get noun project symbols
    var current_term = '';

    SYMBOLSEARCH.submit(function (e) {
        e.preventDefault();

        window.loading.start('Finding icons');

        var term = $(this).find('input[name="symbol-search"]').val();
        if (term != '' && current_term != term) {
            current_term = term;

            window.loading.start();
            $.get(window.APIURL + '/generatordata/icons?term=' + term).then(function (res) {
                symbol_search_results = res.data.icons;
                window.loading.done();
                SYMBOLSEARCHRESULTS.html(DrawSymbolPngs(symbol_search_results)).find('img').click(SelectInspirationSymbol);
            }, function (err) {
                console.log(err);
            }).always(function () {
                window.loading.done();
            });
        }
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 3. Request Builder
     * * * * * * * * * * * * * * * * * * * * * * * */

    //logos
    function SelectInspirationLogo() {
        var logo = $(this);
        if (logo.hasClass('selected')) {
            logo.removeClass('selected');
            var index = logorequest.logos.map(function (obj, i) {
                if (logo.data('inspiration-id') == obj.id) return i;
            });
            logorequest.logos.splice(index[0], 1);
        } else {
            logo.addClass('selected');
            logorequest.logos.push(inspiration_logos[logo.data('index')]);
        }

        ToggleLogoNav();
        window.setState('logorequest', logorequest);
    }

    function ToggleLogoNav() {
        var num_selections = logorequest.logos.length;
        PROGRESSBAR.find('.progress-inner').width(50 * num_selections);

        if (num_selections >= 5) {
            PROGRESSBAR.find('.progress-outer').addClass('hidden').removeClass('visible');
            PROGRESSBAR.find('.continue').removeClass('hidden').addClass('visible');
        } else {
            PROGRESSBAR.find('.progress-outer').removeClass('hidden').addClass('visible');
            PROGRESSBAR.find('.continue').addClass('hidden').removeClass('visible');
        }
    }
    //End Logos

    //Colors
    function SelectInspirationColor() {
        var color = $(this);
        if (color.hasClass('selected')) {
            color.removeClass('selected');
            var index = logorequest.colors.map(function (id, i) {
                if (color.data('colors-id') == id) return i;
            });
            logorequest.colors.splice(index[0], 1);
            console.log(logorequest);
        } else {
            color.addClass('selected');
            logorequest.colors.push(color.data('colors-id'));
            console.log(logorequest);
        }
        window.setState('logorequest', logorequest);
        ToggleColorNav();
    }

    function ToggleColorNav() {
        if ($('#inspiration-colors .selection-box.selected').length) {
            $('.gnr-step2-btn-skip').addClass('hidden').removeClass('visible');
            $('.gnr-step2-btn-con').removeClass('hidden').addClass('visible');
        } else {
            $('.gnr-step2-btn-skip').removeClass('hidden').addClass('visible');
            $('.gnr-step2-btn-con').addClass('hidden').removeClass('visible');
        }
    }
    //End colors

    //Company Details

    //Check if name or slogan is too long on load. If so, give warning
    if ($('.company-details input[name="company_name"]').val() > 16) {
        $('.cLengthWarning').show();
    } else {
        $('.cLengthWarning').hide();
    }

    if ($('.company-details input[name="company_slogan"]').val() > 16) {
        $('.sLengthWarning').show();
    } else {
        $('.sLengthWarning').hide();
    }

    //Check there are inputs in the name
    $('.company-details input[name="company_name"]').keyup(function (e) {
        $('.gnr-step3-btn').attr('disabled', true);

        if ($(this).val() != '' && $(this).attr('name') == 'company_name') {
            $('.gnr-step3-btn').attr('disabled', false);
            if (e.keyCode == 13) {
                $('.gnr-step3-btn').click();
            }
        }
        //Check if name is too long on keyup
        if ($(this).val().length > 16) {
            $('.cLengthWarning').show();
        } else {
            $('.cLengthWarning').hide();
        }
        logorequest.company[$(this).attr('name')] = $(this).val();
        console.log(logorequest.company);
    });

    //Check if slogan is too long on keyup
    $('.company-details input[name="company_slogan"]').keyup(function () {
        if ($(this).val().length > 16) {
            $('.sLengthWarning').show();
        } else {
            $('.sLengthWarning').hide();
        }
        logorequest.company[$(this).attr('name')] = $(this).val();
        console.log(logorequest.company);
    });

    if (!$('.company-details input[name="company_name"], .company-details input[name="company_slogan"]').is(':focus') && $('.company-details input[name="company_name"], .company-details input[name="company_slogan"]').val() != '') {
        window.setState('logorequest', logorequest);
    }
    //end company details

    //Add Symbols
    var selected_symbols = $('.favorite-symbol.filled').length;
    function SelectInspirationSymbol() {
        var symbol = $(this);

        if (selected_symbols < 3) {
            //animate symbol to slot
            symbol.addClass('favorite-symbol-img-chosen').unbind('click');

            var initial_symbol_offset = symbol.offset(),
                target = $('.favorite-symbol.open').first(),
                target_offset = target.offset(),
                symbol_number = target.attr('data-symbol-placeholder-number');

            //symbol.after('placeholder')
            symbol.appendTo('body').addClass('fixed');
            target.addClass('filled').removeClass('open');

            symbol.css({
                'left': initial_symbol_offset.left,
                'top': initial_symbol_offset.top
            });
            setTimeout(function () {
                symbol.css({
                    'left': target_offset.left + 2,
                    'top': target_offset.top + 2
                });
            }, 100);

            setTimeout(function () {
                symbol.appendTo(target).removeClass('fixed').removeAttr('style');
            }, 300);

            symbol.attr('data-symbol-number', symbol_number);
            logorequest.symbols[symbol_number] = symbol_search_results[symbol.attr('data-index')];
            selected_symbols = $('.favorite-symbol.filled').length;
            //rebind listeners
            $('.favorite-symbol.filled').unbind('click').click(RemoveInspirationSymbol);

            //window.setState('logorequest',logorequest);
            ToggleSymbolNav();
        } else {
            window.sendAlert("Remove an icon to add a new one", "", 'Okay');
        }
    }

    function RemoveInspirationSymbol() {
        var symbol = $(this);
        symbol.removeClass('filled').addClass('open');
        logorequest.symbols[symbol.attr('data-symbol-placeholder-number')] = null;
        symbol.find('img').remove();
        selected_symbols--;
        ToggleSymbolNav();
    }

    function ToggleSymbolNav() {
        if (selected_symbols >= 1) {
            $('.gnr-step4-btn-skip').addClass('hidden').removeClass('visible');
            $('.gnr-step4-btn-con').removeClass('hidden').addClass('visible');
        } else {
            $('.gnr-step4-btn-skip').removeClass('hidden').addClass('visible');
            $('.gnr-step4-btn-con').addClass('hidden').removeClass('visible');
        }
    }
    //End Symbols

    window.StartGenerator = function () {
        var request = {
            layout: {
                plain_text: 0,
                text_with_filled_container: 0,
                text_with_outline_container: 0,
                text_symbol: 0,
                text_with_symbol: 0,
                text_with_text_as_symbol: 0,
                text_with_text_in_symbol: 0
            },
            company: logorequest.company,
            weights: {},
            tags: {},
            symbol_alignments: {},
            colors: [],
            symbols: []

        };

        //process inspiration logos
        logorequest.logos.map(function (logo) {
            if (!request.weights[logo.weight]) request.weights[logo.weight] = 0;
            request.weights[logo.weight]++;
            request.layout[logo.layout]++;
            if (logo.symbol_alignment) {
                if (!request.symbol_alignments[logo.symbol_alignment]) request.symbol_alignments[logo.symbol_alignment] = 0;
                request.symbol_alignments[logo.symbol_alignment]++;
            }
            //loop over tag list
            JSON.parse(logo.tags).map(function (tag) {
                if (tag && tag != '') {
                    if (!request.tags[tag]) request.tags[tag] = 0;
                    request.tags[tag]++;
                }
            });
        });

        logorequest.symbols.map(function (symbol) {
            if (symbol) request.symbols.push(symbol);
        });

        request.colors = logorequest.colors;

        console.log(request);
        window.setState('logorequest', logorequest);
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 4. Templaters
     * * * * * * * * * * * * * * * * * * * * * * * */
    var COLOR_GROUPS = [{ color: "greyscale", hex: "#111", tooltip: "Power, elegance, reliability, intelligence, modesty, maturity, functionality, and formality" }, { color: "blue", hex: "#0066d0", tooltip: "Depth and stability, trust, loyalty, wisdom, confidence, intelligence, faith, truth, heaven, tranquility and calmness" }, { color: "teal", hex: "#04adad", tooltip: "Creativity, inspiration, credibility, reliability, spiritual development" }, { color: "green", hex: "#12ab0f", tooltip: "Nature, growth, harmony, freshness, fertility, safety, healing, money" }, { color: "purple", hex: "#541eb5", tooltip: "Royalty, power, nobility, luxury, ambition, wealth, extravagance, wisdom, dignity, independence, creativity, mystery, and magic" }, { color: "pink", hex: "#C23BAB", tooltip: "Girly, sweet, innocent, sensitive, passionate, playful, sensual and loving" }, { color: "red", hex: "#ea1b1b", tooltip: "Power, energy, passion, desire, speed, strength, love, fire, intensity, and celebration" }, { color: "orange", hex: "#ea6100", tooltip: "Joy, enthusiasm, fascination, happiness, creativity, determination, attraction, success, encouragement, and stimulation" }, { color: "yellow", hex: "#EEC617", tooltip: "Sunshine, joy, happiness, intellect, cheerfulness, and energy" }];

    function DrawInspiration(inspirations) {
        var html = '';
        inspirations = JSON.parse(JSON.stringify(inspirations));
        while (inspirations.length) {
            var i = Math.floor(Math.random() * inspirations.length);
            console.log(i);
            var inspiration = inspirations[i];
            html += '<div class="col-xs-6 col-md-4">' + '<div class="logo-inspiration selection-box atv-card atv-card-container" data-index="' + i + '" data-inspiration-id="' + inspiration.id + '">' + '<div class="atv-card-shine"></div>' + '<div class="atv-card-layers">' + '<div class="atv-card-layer"><img src="' + window.imgsrc + '/inspiration/' + inspiration.src + '" class="img-responsive"></div>' + '</div>' + '<div class="atv-card-shadow"></div>' + '</div>' + '</div>';

            inspirations.splice(i, 1);
        }

        return html;
    }

    function DrawColors(colors) {
        var html = '';

        COLOR_GROUPS.map(function (c) {
            html += '<div class="col-xs-6 col-md-4">' + '<div class="logo-colors selection-box atv-card atv-card-container tip-hold-below" data-colors-id="' + c.color + '" data-tooltip="' + c.tooltip + '" data-tooltip-class="hold-below big">' + '<div class="atv-card-shine"></div>' + '<div class="atv-card-layers">' + '<div class="atv-card-layer" style="background-color: ' + c.hex + '">' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '<div class="shade"></div>' + '</div>' + '</div>' + '</div>' + '</div>';
        });

        return html;
    }

    function DrawSymbolPngs(symbols) {
        var html = '';
        symbols.map(function (symbol, i) {
            html += '<img ' + 'src="' + symbol.preview_url_84 + '" ' + 'class="favorite-symbol-img" ' + 'data-index="' + i + '" ' + 'data-symbol-url="' + symbol.icon_url + '"' + '>';
        });

        return html;
    }
})(window, jQuery);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {
    /* * * * * * * * * * * * * * * * * * * * *
    *   Legacy Jquery JS
    *   Table of contents
    *   1. Globals
    *   2. Event Bindings
    *   3. Old Stuff
    *
    */
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 1. Globals
     * * * * * * * * * * * * * * * * * * * * * * * */
    var brandeguideform = $('#brandguidelines-form');
    var brandlogo = null;
    var brandguide = null;
    var browseOffset = 0;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 2. Event Bindings
     * * * * * * * * * * * * * * * * * * * * * * * */
    brandeguideform.on('submit', function (e) {
        e.preventDefault();

        var brand = {
            company_name: $('.js-company-name').val(),
            company_name_slug: $('.js-company-name-slug').val().toLowerCase().replace(/ /g, '-'),
            logo_id: brandeguideform.attr('logo-id')
        };

        if (brandguide) {
            window.putBrandguide(brand, brandguide.id);
            return;
        }

        window.postBrandguide(brand).then(function () {
            brandguide = brand;
            brandeguideform.find('button').html('Update');
        });
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 2. View Setters/Getters
     * * * * * * * * * * * * * * * * * * * * * * * */
    window.DrawBrandLogo = function (logo, _brandguide) {
        if (logo) {
            $('#brandlogo-selected .logo-slot').html('');
            $('#brandlogo-selected').addClass('active');
            brandlogo = new window.Logo(logo.ingredients, null, $('#brandlogo-selected .logo-slot'), logo._dbid);
            brandlogo.Draw();
        }

        if (_brandguide) {
            brandeguideform.find('input[name="company_name"]').val(_brandguide.company_name);
            brandeguideform.find('input[name="company_name_slug"]').val(_brandguide.company_name_slug);
            brandeguideform.find('button').html('Update');
            brandguide = _brandguide;
        }
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 1.
     *                 3. API Calls
     * * * * * * * * * * * * * * * * * * * * * * * */
    function getBrandguide(callback) {
        $.ajax({
            url: window.APIURL + '/brandguidelines',
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (res) {
            return callback(res.data.logo, res.data.brandguide);
        }).catch(function (err) {
            return console.log(err);
        });
    }

    window.postBrandguide = function (brandguide) {
        return $.ajax({
            url: window.APIURL + '/brandguidelines',
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(brandguide),
            type: 'POST',
            mode: 'cors'
        });
    };

    window.putBrandguide = function (brandguide, id) {
        return $.ajax({
            url: window.APIURL + '/brandguidelines/' + id,
            headers: {
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(brandguide),
            type: 'PUT'
        });
    };

    window.onSelectBrandGuidelinesLogo = function (logo) {
        // Change input fields
        var company_name = logo._ingredients.company.company_name;

        $('.js-company-name').val(company_name);
        $('.js-company-name-slug').val(company_name.toLowerCase().replace(/ /g, '-'));

        $('#brandlogo-selected .logo-slot').html('');
        $('#brandlogo-selected').addClass('active');
        var selectedLogo = new window.Logo(logo._ingredients, null, $('#brandlogo-selected .logo-slot'), logo._dbid);
        selectedLogo.Draw();

        brandeguideform.attr('logo-id', logo._dbid);
    };

    window.initBrandGuidelines = function () {
        window.getLogos(window.DrawFavoritedLogos, {
            container: $('#brandlogo-selector'),
            click: 'brandguidelines',
            offset: browseOffset
        });

        getBrandguide(window.DrawBrandLogo);
    };
})(window, jQuery);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {

    if (!document.querySelector('body').classList.contains('app')) {
        return;
    }
    var STRIPEKEY = window.env == 'prod' ? 'pk_live_ajZGGyfnGy6AO07SUIzSqb1o' : 'pk_test_ZU1MH8PQz4TFF9B7Ki8I6pRE';
    Stripe.setPublishableKey(STRIPEKEY);
    var overlay = $('#overlay');
    var FORM = $('#purchase');
    var HAVECOUPON = $('#haveCoupon');
    var couponCode = $('.couponCode');
    var APPLYCOUPON = $('#apply-coupon');
    var plans = {
        basic: 20,
        premium: 65,
        enterprise: 165
    };
    var coupon = {};

    HAVECOUPON.click(function () {
        couponCode.removeClass('hidden').addClass('visible');
    });

    FORM.submit(function (e) {
        e.preventDefault();
        var price = coupon.price !== undefined && window.checkoutplan != 'basic' ? coupon.price : plans[window.checkoutplan];
        price = price - window.totalcredit;
        if (price > 0.50) PostCharge();else PurchaseLogo('notoken');
    });

    APPLYCOUPON.submit(function (e) {
        e.preventDefault();
        var couponcode = encodeURIComponent(APPLYCOUPON.find('input[name="coupon-code"]').val());
        couponcode = couponcode.toLowerCase();
        FORM.find('.alert-danger').html('').removeClass('visible').addClass('hidden');
        APPLYCOUPON.find('button').html('<div class="checkoutLoader"></div>');
        fetch(APIURL + '/coupons/' + couponcode, {
            headers: new Headers({
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            }),
            method: 'GET',
            mode: 'cors'
        }).then(function (response) {
            response.json().then(function (res) {
                if (res.data) {
                    window.Intercom("trackEvent", "applied_coupon");
                    coupon = res.data;
                    var price = plans[window.checkoutplan];
                    if (coupon.percent_off) {
                        price = plans[window.checkoutplan];
                        price = price * (1 - coupon.percent_off / 100);
                        $('#purchase-price').html(price.toFixed(2));
                    } else if (coupon.amount_off) {
                        price = plans[window.checkoutplan];
                        price = price - coupon.amount_off;
                        $('#purchase-price').html(price > 0 ? price.toFixed(2) : 0);
                    }
                    if (price < 0.50) $('#credit-card-info').hide();
                    coupon.price = price > 0 ? price.toFixed(2) : 0;
                    APPLYCOUPON.removeClass('visible').addClass('hidden');
                    APPLYCOUPON.find('button').html('Apply');
                    APPLYCOUPON.find('button').attr('disabled', 'disabled');
                    console.log(coupon);
                } else {
                    APPLYCOUPON.find('button').html('Apply');
                    FORM.find('.alert-danger').html('Invalid Coupon').removeClass('hidden').addClass('visible');
                }
            });
        }).catch(function (err) {
            APPLYCOUPON.find('button').html('Apply');
            FORM.find('.alert-danger').html('Invalid Coupon').removeClass('hidden').addClass('visible');
        });
    });

    function PostCharge() {
        var frm = $('#purchase');
        frm.find('button').prop('disabled', true);
        Stripe.card.createToken({
            name: FORM.find('input[name="cc-name"]').val(),
            number: FORM.find('input[name="cc-card"]').val(),
            cvc: FORM.find('input[name="cc-cvc"]').val(),
            exp_month: FORM.find('input[name="exp-month"]').val(),
            exp_year: FORM.find('input[name="exp-year"]').val()
        }, function (status, response) {
            console.log(response.error);
            if (response.error) {
                frm.find('button').prop('disabled', false);
                $('.alert').removeClass('alert-success').addClass('alert-danger');
                FORM.find('.alert-danger').html(response.error.message).removeClass('hidden').addClass('visible');
            } else {
                PurchaseLogo(response.id);
            }
        });
    }

    function PurchaseLogo(token) {
        var frm = $('#purchase');
        var price = coupon.price !== undefined && window.checkoutplan != 'basic' ? coupon.price : plans[window.checkoutplan];
        price = price - window.totalcredit;
        window.totalfinal = price;
        var payload = {
            token: token,
            package: window.checkoutplan,
            dbid: window.activelogo._dbid,
            price: price,
            credit: window.totalcredit,
            email: window.state.user.email,
            referralCode: window.state.referralCode
        };
        if (price > 0.50) {
            window.loading.start('Purchasing');
            fetch(window.APIURL + '/payments/', {
                headers: new Headers({
                    'Authorization': 'JWT ' + window.state.token,
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(payload)
            }).then(function (response) {
                if (response.status == 200) {
                    window.sendPaymentConversions();
                    if (window.state.referralCode) {
                        window.setState('referralCode', '');
                    } else {
                        window.state.user.credit = Number(window.state.user.credit) - Number(window.totalcredit);
                        window.setState('user', window.state.user);
                    }
                    response.json().then(function (res) {
                        FORM.find('.alert-danger').html('').removeClass('visible').addClass('hidden');
                        //update logo
                        window.activelogo._ingredients.package = window.checkoutplan;
                        var ingredients = JSON.parse(JSON.stringify(window.activelogo._ingredients));
                        var payload = {
                            data: {
                                purchased: 1,
                                ingredients: ingredients
                            },
                            id: window.activelogo._dbid
                        };
                        frm.find('button').prop('disabled', false);
                        window.putLogo(payload, window.GenerateLogoFiles);
                    });
                } else {
                    frm.find('button').prop('disabled', false);
                    window.loading.done();
                    FORM.find('.alert-danger').html('Unable to charge card').removeClass('hidden').addClass('visible');
                }
            }).catch(function (err) {
                frm.find('button').prop('disabled', false);
                //let errMsg = err.responseJSON.msg.replace('NaNError: ', '');;
                window.loading.done();
                //$('.alert').removeClass('alert-success').addClass('alert-danger');
                FORM.find('.alert-danger').html('Unable to charge card').removeClass('hidden').addClass('visible');
            });
        } else {
            window.loading.start('Generating Logo Files');
            window.activelogo._ingredients.package = window.checkoutplan;
            if (window.totalcredit > 0) {
                window.state.user.credit = Number(window.state.user.credit) - Number(window.totalcredit);
                window.setState('user', window.state.user);
            }
            var ingredients = JSON.parse(JSON.stringify(window.activelogo._ingredients));
            var _payload = {
                data: {
                    purchased: 1,
                    ingredients: ingredients
                },
                id: window.activelogo._dbid
            };
            window.putLogo(_payload, window.GenerateLogoFiles);
        }
    }

    window.GenerateLogoFiles = function () {
        delete window.ineditlogo;
        console.log(window.LOGOSURL + '/' + window.activelogo._dbid + '/' + window.activelogo._dbid + '.zip');
        window.LoadView('edit_logo');
        window.previewsvg = window.previewsvg.replace(/<rect name=\"background\" .*?>(.*?)<\/rect>/, '');
        var payload = {
            package: window.checkoutplan ? window.checkoutplan : 'premium',
            dbid: window.activelogo._dbid,
            email: window.state.user.email,
            ingredients: window.activelogo._ingredients,
            admin: window.state.admin,
            svg: window.previewsvg
        };

        window.loading.start('Generating logo files');
        fetch(window.APIURL + '/payments/', {
            headers: new Headers({
                'Authorization': 'JWT ' + window.state.token,
                'Content-Type': 'application/json'
            }),
            method: 'put',
            mode: 'cors',
            body: JSON.stringify(payload)
        }).then(function (response) {
            response.json().then(function (res) {
                if (res.data.state == 'delayed') {
                    window.loading.done();
                    $('#delayedpurchasedLogo').modal('show');
                } else {
                    window.loading.done();
                    window.ShowPurchasedLogo(window.activelogo._dbid, payload.package);
                }
            });
        }).catch(function (err) {
            window.loading.done();
            $('#errorpurchasedLogo').modal('show');
        });
    };

    window.ShowPurchasedLogo = function (id, plan) {
        var url = 'https://s3.ca-central-1.amazonaws.com/logojoy/logos/' + id + '/' + id + '.zip';
        if (plan == 'basic') {
            url = 'https://s3.ca-central-1.amazonaws.com/logojoy/logos/' + id + '/' + id + '_basic.png';
        }
        document.querySelector('#downloadLink').setAttribute('href', url);

        /**
        window.getBrandguide(function(logo, brandguide){
          console.log('logo', logo.id);
          console.log('id', id);
           if (logo.id === id) {
            document.querySelector('.brandguidelines-url').classList.remove('hidden')
            document.querySelector('.brandguidelines-url').classList.add('visible')
             let brandUrl = window.location.origin + '/b/' + brandguide.company_name_slug;
            document.querySelector('#brandguidelinesLink').setAttribute('href', brandUrl)
             document.querySelector('.brandguidelines-form').classList.remove('visible')
            document.querySelector('.brandguidelines-form').classList.add('hidden')
           } else if (logo.id && logo.id != id) {
            document.querySelector('.brandguidelines-disabled').classList.add('visible')
            document.querySelector('.brandguidelines-disabled').classList.remove('hidden')
             document.querySelector('.brandguidelines-form').classList.remove('visible')
            document.querySelector('.brandguidelines-form').classList.add('hidden')
          }
        })
        **/
        $('#purchasedLogo').modal('show');
    };
})(window, jQuery);

window.sendPaymentConversions = function () {
    if (window.env == 'prod') {
        console.log('Sending Payment confirmation');
        window.ga('send', 'event', 'Purchases', 'purchase', window.checkoutplan, window.totalfinal);
        window.Intercom("trackEvent", "purchased_" + window.checkoutplan + "_logo");
        window.fbq('track', 'Purchase', { value: window.totalfinal, currency: 'USD' });
        $('body').append('<img src="https://shareasale.com/sale.cfm?amount=' + window.totalfinal + '&tracking=' + window.activelogo._dbid + '&transtype=sale&merchantID=69265" width="1" height="1">');
        goog_report_conversion(undefined);
        // window.goog_snippet_vars = function() {
        //     var w = window;
        //         w.google_conversion_id = 863143512;
        //         w.google_conversion_label = "h5dmCLyB_m0Q2IzKmwM";
        //         w.google_conversion_value = w.totalfinal;
        //         w.google_conversion_currency = "USD";
        //         w.google_remarketing_only = false;
        // }
        // // DO NOT CHANGE THE CODE BELOW.
        // window.goog_report_conversion = function(url) {
        //         goog_snippet_vars();
        //         window.google_conversion_format = "3";
        //         var opt = new Object();
        //         opt.onload_callback = function() {
        //             if (typeof(url) != 'undefined') {
        //                 window.location = url;
        //             }
        //         }
        //         var conv_handler = window['google_trackConversion'];
        //         if (typeof(conv_handler) == 'function') {
        //             conv_handler(opt);
        //         }
        // }
        // window.goog_report_conversion();
    }
    // window._qevents.push({
    //     qacct:'p-DB-KB-3QQCf-5',
    //     labels:'_fp.event.Payment Confirmation,_fp.pcat.'+window.checkoutplan,
    //     orderid:window.activelogo._dbid,
    //     event:'refresh'
    // });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.AdminPanel = function () {
  var couponFormEl = document.querySelector('#addCoupon'),
      sendNominationEmailEl = document.querySelector('#sendNominationEmail'),
      sendLogoEmail = document.querySelector('#sendLogoEmail'),
      addCreditEl = document.querySelector('#addCredit'),
      _this = this;

  this.init = function () {

    // bind things
    addCreditEl.addEventListener('submit', function (e) {
      e.preventDefault();
      _this.addCredit();
    });

    addCreditEl.querySelector('#credit').value = window.state.user.credit || 0;

    couponFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      _this.newCoupon();
    });

    sendNominationEmailEl.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('send  nomination email ?');
    });

    sendLogoEmail.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('send logo email ?');
    });
  };

  this.newCoupon = function () {
    var payload = { data: {} };

    payload.data.name = couponFormEl.querySelector('#couponName').value;
    payload.data.description = couponFormEl.querySelector('[name="description"]').value;
    payload.data.remaining_uses = couponFormEl.querySelector('[name="remaining_uses"]').value;

    if (couponFormEl.querySelector('[name="type"]').value === "percent") {
      payload.data.percent_off = couponFormEl.querySelector('#discountAmount').value;
    } else if (couponFormEl.querySelector('[name="type"]').value === "amount") {
      payload.data.amount_off = couponFormEl.querySelector('#discountAmount').value;
    }

    fetch(window.APIURL + '/coupons', {
      method: "POST",
      headers: new Headers({
        'Authorization': 'JWT ' + window.state.token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (response.status != 200) {
        throw response.status;
      }
      alert('Coupon Added');
      window.snackbar('Coupon Added', 'success');
    }).catch(function (error) {
      alert('Error');
      window.snackbar('Error: ' + error, 'danger');
    });
  };

  this.addCredit = function () {
    var payload = {
      id: window.state.user.id,
      data: {
        credit: Number(document.querySelector('#addCredit [name="credit"]').value)
      }
    };
    console.log(payload);
    fetch(window.APIURL + '/users', {
      method: "PUT",
      headers: new Headers({
        'Authorization': 'JWT ' + window.state.token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (response.status != 200) throw response;
      window.state.user.credit = payload.data.credit.toFixed(2);
      window.setState('user', window.state.user);
      //window.snackbar('User updated', 'success')
    }).catch(function (error) {
      console.log(error);
    });
  };

  this.init();
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This has to be global
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (cb) {
    window.setTimeout(cb, 1000 / 60);
};

function HeroAnimation() {

    this.config = {
        $heroCanvas: document.querySelector('.canvas'),
        logoSize: document.querySelector('.hero__logo_container').offsetWidth
    };

    // Shapes
    // Size is multiplier, 1 = 100% of logo
    // speed is arbitrary 1-10
    this.circles = [{
        size: 0.5,
        speed: .6
    }, {
        size: .75,
        speed: .7
    }, {
        size: 1,
        speed: .5
    }];

    this.context = this.config.$heroCanvas.getContext("2d");

    this.init = function () {
        // Blurry when sized with CSS
        this.config.$heroCanvas.setAttribute('height', this.config.logoSize + 2);
        this.config.$heroCanvas.setAttribute('width', this.config.logoSize + 2);

        for (var i = 0; i < this.circles.length; i++) {
            var circle = this.circles[i];
            circle.size = this.config.logoSize * circle.size / 2;
            circle.progress = 0;
            circle.angle = 0;
        }

        window.circle(this.circles, this.context);
    };

    // Easing "algorithm" from https://github.com/component/ease

    window.easeIn = function (n) {
        var s,
            a = 0.1,
            p = 0.4;
        if (n === 0) return 0;
        if (n === 1) return 1;
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return -(a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
    };

    // Circle drawing

    window.circle = function (circles, context) {
        var pos = context.canvas.offsetHeight / 2;
        var done = false;

        if (circles.filter(function (obj) {
            return obj.progress >= 1;
        }).length < circles.length) {
            context.clearRect(0, 0, context.canvas.offsetHeight, context.canvas.offsetWidth);
        } else {
            done = true;
        };

        for (var i = 0; i < circles.length; i++) {

            var theCircle = circles[i];
            if (theCircle.progress <= 1) theCircle.progress += .01 * theCircle.speed;
            var easeIn = window.easeIn(theCircle.progress);

            // actual circle drawing here
            context.beginPath();
            context.arc(pos, pos, theCircle.size, 0, theCircle.progress * 2 * Math.PI);
            context.strokeStyle = "#FFF";
            context.setLineDash([10, 10]);
            context.stroke();
        }

        if (!done) {
            requestAnimationFrame(function () {
                window.circle(circles, context);
            });
        }
    };

    this.init();
};

// Populates section navigation
// Hijacks scrolling with giant slider

function Sections() {
    var _this = this;

    this.config = {
        template: '',
        sectionSelector: '.section',
        navSelector: '.bpager__list',
        sectionActiveClass: 'section--active',
        sectionPrevClass: 'section--previous',
        sectionNextClass: 'section--next'
    };

    window.sections = [];

    this.init = function () {
        var $sections = document.querySelectorAll(this.config.sectionSelector);
        var _this = this;

        for (var i = 0; i < $sections.length; i++) {
            var section = {};
            section.el = $sections[i];
            section.num = i + 1;

            if (section.el.className.indexOf(this.config.sectionActiveClass) != -1) {
                section.active = true;
            }

            if (section.el.querySelector('.sectionNumber')) {
                section.el.querySelector('.sectionNumber').innerHTML = section.num;
            }

            section.title = section.el.getAttribute('data-title');
            section.id = section.el.getAttribute('id');
            section.top = section.el.offsetTop;
            section.height = section.el.offsetHeight;
            section.bottom = section.el.offsetTop + section.el.offsetHeight;
            // We
            window.sections.push(section);
        };

        this.addNavs();
        this.bindings();
    };

    this.bindings = function () {

        // Binding keyboard events
        document.onkeydown = function (e) {
            e = e || window.event;
            switch (e.which || e.keyCode) {
                case 33:
                    // page up
                    _this.changeSection('prev');
                    break;

                case 38:
                    // up
                    _this.changeSection('prev');
                    break;

                case 40:
                    // down
                    _this.changeSection('next');
                    break;

                case 34:
                    // page down
                    _this.changeSection('next');
                    break;

                default:
                    return; // exit this handler for other keys
            }
        };

        // Scroll wheel
        var animating;

        window.addEventListener('wheel', function (wheelEvent) {

            if (animating == true) return; // so we

            animating = true;

            if (wheelEvent.deltaY > 25) _this.changeSection('next');
            if (wheelEvent.deltaY < -25) _this.changeSection('prev');

            window.setTimeout(function () {
                animating = false;
            }, 750);
        });

        // Swipe up or down
        // From: http://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
        // 🚨 UNTESTED 🚨 UNTESTED 🚨
        //        document.addEventListener('touchstart', window.handleTouchStart, false);
        //        document.addEventListener('touchmove', window.handleTouchMove, false);
        //
        //        var xDown = null;
        //        var yDown = null;
        //
        //        window.handleTouchStart = function(evt){
        //            console.log('touchstart');
        //            xDown = evt.originalEvent.touches[0].clientX;
        //            yDown = evt.originalEvent.touches[0].clientY;
        //        };
        //
        //        window.handleTouchMove = function(evt){
        //            if ( ! xDown || ! yDown ) {
        //                return;
        //            }
        //
        //            var xUp = evt.originalEvent.touches[0].clientX;
        //            var yUp = evt.originalEvent.touches[0].clientY;
        //
        //            var xDiff = xDown - xUp;
        //            var yDiff = yDown - yUp;
        //
        //            if ( Math.abs( xDiff ) < Math.abs( yDiff ) ) {
        //                if ( yDiff > 0 ) { // up
        //                  _this.changeSection('next')
        //                } else { // down
        //                  _this.changeSection('prev')
        //                }
        //            }
        //            /* reset values */
        //            xDown = null;
        //            yDown = null;
        //        };
    };

    this.addNavs = function (section) {
        var _this = this;
        var nav = document.querySelector(this.config.navSelector);
        var navItems = "";

        var _loop = function _loop(i) {
            var section = window.sections[i];
            section.navItem = document.createElement('li');
            section.navItem.className = 'bpager__list_item';
            if (section.active == true) section.navItem.setAttribute('active', true);
            section.navItem.innerHTML = '<a href="#' + section.id + '">\n              <span class="tooltip"><em>s' + section.num + '.</em>' + section.title + '</span>\n              <i></i>\n            </a>\n          </li>';

            section.navItem.onclick = function (e) {
                _this.changeSection(section.num);
                e.preventDefault();
            };
            nav.appendChild(section.navItem);
        };

        for (var i = 0; i < window.sections.length; i++) {
            _loop(i);
        };
    };

    this.changeSection = function (targetSection) {
        var current = window.sections.filter(function (obj) {
            return obj.active == true;
        })[0];

        // Get correct section number
        if (targetSection == 'next') targetSection = current.num + 1;
        if (targetSection == 'prev') targetSection = current.num - 1;

        if (targetSection > window.sections.length || targetSection < 1) return;

        // Deactivate current slide
        current.active = false;

        for (var i = 0; i < window.sections.length; i++) {
            var section = window.sections[i];
            section.navItem.setAttribute('active', '');

            if (section.num == targetSection) {
                section.active = true;
                section.el.classList.remove(this.config.sectionPrevClass);
                section.el.classList.add(this.config.sectionActiveClass);
                section.navItem.setAttribute('active', true);
            } else if (section.num < targetSection) {
                section.el.classList.add(this.config.sectionPrevClass);
                section.el.classList.remove(this.config.sectionActiveClass);
            } else if (section.num > targetSection) {
                section.el.classList.remove(this.config.sectionPrevClass);
                section.el.classList.remove(this.config.sectionActiveClass);
            }
        }
    };

    this.init();
};

function BrandInfo(logo) {
    var _this = this;
    this.config = {
        logoSelectors: '.logo',
        apiURL: 'http://api.logojoy.dev/logos/',
        logoBaseURL: 'http://s3.ca-central-1.amazonaws.com/logojoy/logos/'
    };

    this.logo = logo;
    this.logoEls = [];
    this.colours = {};
    this.path = '';

    this.init = function () {
        _this.displayCompany();
        _this.displayColors();
        _this.displayLogos();
        _this.displayFonts();
    };

    this.displayColors = function () {
        var _this = this;
        this.colours.title = this.logo.ingredients.color.name;

        this.colours.hsl = "hsl " + this.logo.ingredients.color.h + ' ' + this.logo.ingredients.color.s + ' ' + this.logo.ingredients.color.l;
        this.colours.main = window.tinycolor(this.colours.hsl);
        this.colours.light = window.tinycolor(this.colours.hsl).lighten(30);
        this.colours.dark = window.tinycolor(this.colours.hsl).darken(10);

        var brandBgs = document.querySelectorAll(".brandcolor--bg");
        for (var i = 0; i < brandBgs.length; i++) {
            brandBgs[i].style.backgroundColor = _this.colours.main.toHexString();
        }

        var brandColors = document.querySelectorAll(".brandcolor");
        for (var i = 0; i < brandColors.length; i++) {
            brandColors[i].style.color = _this.colours.main.toHexString();
        }

        var brandLites = document.querySelectorAll(".brandcolor--bg-lite");
        for (var i = 0; i < brandLites.length; i++) {
            brandLites[i].style.backgroundColor = _this.colours.light.toHexString();
        }

        var brandDarks = document.querySelectorAll(".brandcolor--bg-dark");
        for (var i = 0; i < brandDarks.length; i++) {
            brandDarks[i].style.backgroundColor = _this.colours.dark.toHexString();
        };

        // Populate swatches
        // @TODO there is probably a DRYer way of doing this, also switches are bad etc.

        var colorCards = document.querySelectorAll('.color__card');
        for (var i = 0; i < colorCards.length; i++) {
            var el = colorCards[i];
            if (el.getAttribute('colorVariant') == 'main') {
                el.querySelector('h3').innerHTML = _this.colours.title;
                el.querySelector('.hex').innerHTML = _this.colours.main.toHexString();
                el.querySelector('.rgb').innerHTML = _this.colours.main.toRgbString();
                el.querySelector('.hsl').innerHTML = _this.colours.main.toHslString();
            } else if (el.getAttribute('colorVariant') == 'light') {
                el.querySelector('h3').innerHTML = _this.colours.title + ' (light variant)';
                el.querySelector('.hex').innerHTML = _this.colours.light.toHexString();
                el.querySelector('.rgb').innerHTML = _this.colours.light.toRgbString();
                el.querySelector('.hsl').innerHTML = _this.colours.light.toHslString();
            } else if (el.getAttribute('colorVariant') == 'dark') {
                el.querySelector('h3').innerHTML = _this.colours.title + ' (dark variant)';
                el.querySelector('.hex').innerHTML = _this.colours.dark.toHexString();
                el.querySelector('.rgb').innerHTML = _this.colours.dark.toRgbString();
                el.querySelector('.hsl').innerHTML = _this.colours.dark.toHslString();
            };
        }
    };

    this.displayLogos = function () {
        var _this = this;
        this.logoEls = document.querySelectorAll(this.config.logoSelectors);

        fetch(_this.config.logoBaseURL + _this.logo.id + '/' + _this.logo.id + '.svg').then(function (response) {
            return response.text();
        }).then(function (text) {
            _this.path = text;

            for (var i = 0; i < _this.logoEls.length; i++) {
                var el = _this.logoEls[i];
                var logoType = el.getAttribute('logo-type') || 'colorinvert';
                var path = void 0;

                if (logoType === 'colordark') {
                    path = _this.path.replace(/#ffffff/g, "#000000");
                } else if (logoType === 'colorinvert') {
                    path = _this.path.replace(/#ffffff/g, _this.colours.main.toHexString());
                } else {
                    path = _this.path;
                }
                el.innerHTML = '<img height="' + _this.logo.ingredients.svg.height + '" width="' + _this.logo.ingredients.svg.width + '" src=\'data:image/svg+xml;utf8,' + path + '\'>';
            }
        }).catch(function (err) {
            console.log(err);
        });
    };

    this.displayFonts = function () {
        var font = this.logo.ingredients.main_font;
        var sloganfont = _this.logo.ingredients.slogan_font;

        var brandFonts = document.querySelectorAll(".brandfont");
        for (var i = 0; i < brandFonts.length; i++) {
            var el = brandFonts[i];
            el.style.fontFamily = font;
            el.innerHTML = font;
        }

        var sloganFonts = document.querySelectorAll(".sloganfont");
        for (var i = 0; i < sloganFonts.length; i++) {
            var _el = sloganFonts[i];
            if (_this.logo.ingredients.company.company_slogan) {
                _el.style.fontFamily = sloganfont;
                _el.innerHTML = sloganfont;
            } else {
                _el.parentNode.remove();
            }
        };
    };

    this.displayCompany = function () {
        var company = this.logo.ingredients.company.company_name;

        var companyNames = document.querySelectorAll('.companyName');
        for (var i = 0; i < companyNames.length; i++) {
            companyNames[i].innerHTML = company;
        };
    };
    this.init();
}

window.BrandInfo = BrandInfo;

document.addEventListener("DOMContentLoaded", function (event) {
    if (document.querySelector('body').className.indexOf('brandguidelines') >= 0) {

        // delay animation by one second
        window.setTimeout(function () {
            new HeroAnimation();
        }, 1000);

        new Sections();
    }
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {
    var Landing = function Landing() {

        this.init = function () {
            if (document.querySelector('body').className.indexOf('landing') >= 0) {
                this.stats();
                this.heroForm();
                this.particles();
            } else if (document.querySelector('body').className.indexOf('page-about') >= 0) {
                this.particles();
            }
        };

        this.stats = function () {
            var d = new Date();
            var n = d.getTime();

            var logos_made = Math.round((n - 1486992447321) * .00047);

            $('.logos-made').text(logos_made.toLocaleString('en-US'));

            setInterval(function () {
                var d = new Date();
                var n = d.getTime();

                var logos_made = Math.round((n - 1486992447321) * .00047);

                $('.logos-made').text(logos_made.toLocaleString('en-US'));
            }, 2000);
        };

        this.heroForm = function () {
            $('.company-name-container input').trigger('focus');
            $('.company-name-container form').on('submit', function (e) {
                // e.preventDefault();
                // var companyName = encodeURIComponent($('.company-name-container input').val());
                // location.href = `/generate/${companyName}`;
                // window.state.lastview = 'generator_view';
                // window.setState('lastview','generator_view');
            });
        };

        this.particles = function () {
            var config = {
                "particles": {
                    "number": {
                        "value": 40,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.22885281607335908,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 0.4795204795204795,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.2762016745712954,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 3,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "repulse"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 119.88011988011988,
                            "line_linked": {
                                "opacity": 0.6557058552104332
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 2
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            };
            new particlesJS('particles-js', config);
        };

        this.init();
    };

    document.addEventListener("DOMContentLoaded", function (event) {
        new Landing();
    });
})(window, jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {
  window.bglModal = function () {
    var _this = this;

    this.init = function () {
      _this.modalEl = document.querySelector('#brand_guidelines_modal');
      _this.logo = window.activelogo;
      if (!_this.logo) return;

      fetch(window.APIURL + '/brandguidelines/?logo_id=' + _this.logo._dbid, {
        headers: new Headers({
          'Authorization': 'JWT ' + window.state.token,
          'Content-Type': 'application/json'
        })
      }).then(function (res) {
        if (res.status != 200) throw res.status;
        return res.json();
      }).then(function (body) {
        if (document.querySelector('.bgl-modal-trigger')) {
          var button = document.querySelector('.bgl-modal-trigger');
          button.parentNode.removeChild(button);
        }
        if (body.data.brandguide) {
          _this.bgl = body.data.brandguide;
          _this.addTrigger();
          _this.initBglDash();
          return;
        }

        fetch(window.APIURL + '/addons/allowed', {
          method: 'POST',
          body: JSON.stringify({
            addon: 'brand-guidelines',
            logoId: window.activelogo._dbid
          }),
          headers: {
            Authorization: 'JWT ' + window.state.token,
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          return res.json();
        }).then(function (response) {
          if (response.data.isAllowed) {
            _this.addCTA();
            _this.initOnboard();
          }
        }).catch(function () {});
      }).catch(function (err) {
        console.log(err);
      });

      _this.modalEl.querySelector('.modal2__backdrop').onclick = function () {
        _this.hide();
      };
      _this.modalEl.querySelector('.modal2__close').onclick = function () {
        _this.hide();
      };
    };

    this.initBglDash = function () {
      _this.bglUrl = window.BASEURL + '/b/' + _this.bgl.company_name_slug;
      var badgeCode = '<a href="' + _this.bglUrl + '" target="_blank" rel="nofollow"><img src="https://s3.ca-central-1.amazonaws.com/logojoy/public/brand-guidelines-badge.png" style="width: 217px; height: 61px" alt="View our Brand guidelines"></a>';

      _this.modalEl.querySelector('#copyBadge').value = badgeCode;
      _this.modalEl.querySelector('#bglBadge-example').innerHTML = badgeCode;
      _this.modalEl.querySelector('#bglUrl').value = _this.bglUrl;
      _this.modalEl.querySelector('#bglUrlLink').setAttribute('href', _this.bglUrl);
      _this.modalEl.querySelector('#changeUrl').onclick = function (e) {
        e.preventDefault();
        _this.initOnboard();
        _this.setView('onboardBgl');
      };

      _this.social();

      var copyButtons = _this.modalEl.querySelectorAll('.bgl-badge__copy');
      for (var i = 0; i < copyButtons.length; i++) {
        copyButtons[i].onclick = function (e) {
          e.preventDefault();
          var copyTextarea = document.querySelector(this.getAttribute('target'));
          copyTextarea.select();
          try {
            var successful = document.execCommand('copy');
          } catch (err) {
            window.prompt('Press CTRL+C or CMD+C to copy', copyTextarea.value);
          }
        };
      }
    };

    this.initOnboard = function () {
      _this.submitSlug = _this.modalEl.querySelector('#submitSlug');
      _this.checkSlug = _this.modalEl.querySelector('#checkSlug');
      _this.slugInput = _this.modalEl.querySelector('.bgl-slug__input');
      _this.status = _this.modalEl.querySelector('.bgl-alert');
      _this.status.classList.add('hidden');
      _this.slugInput.value = '';

      _this.submitSlug.classList.add('hidden');
      _this.checkSlug.classList.remove('hidden');

      _this.submitSlug.innerHTML = "Continue";
      _this.submitSlug.disabled = false;

      _this.slugInput.onkeyup = function () {
        _this.slugInput.parentNode.classList.remove('invalid');
        _this.slugInput.parentNode.classList.remove('valid');
        _this.checkSlug.classList.remove('hidden');
        _this.submitSlug.classList.add('hidden');
        _this.status.classList.add('hidden');
      };

      _this.checkSlug.onclick = function (e) {
        _this.slugInput.value = _this.slugInput.value.replace(/\W+/g, "-");
        fetch(window.APIURL + '/vanitynamecheck/' + _this.slugInput.value, {
          headers: new Headers({
            'Authorization': 'JWT ' + window.state.token,
            'Content-Type': 'application/json'
          })
        }).then(function (res) {
          if (res.status != 200) throw res.status;
          return res.json();
        }).then(function (body) {
          if (body.data.length == 0) {
            _this.slugInput.parentNode.classList.remove('invalid');
            _this.slugInput.parentNode.classList.add('valid');
            _this.checkSlug.classList.add('hidden');
            _this.submitSlug.classList.remove('hidden');
            _this.status.innerHTML = "That URL is available!";
            _this.status.classList.remove('hidden');
          } else {
            _this.slugInput.parentNode.classList.remove('valid');
            _this.slugInput.parentNode.classList.add('invalid');
            _this.status.innerHTML = "Sorry, that URL isn't available, try another.";
            _this.status.classList.remove('hidden');
          }
        });
      };

      _this.submitSlug.onclick = function (e) {
        _this.submitSlug.setAttribute('disabled', 'true');
        window.loading.start();
        var brand = {
          company_name: window.activelogo._ingredients.company.company_name.replace(/'/g, '\\\'').replace(/\"/g, '\\"'),
          company_name_slug: _this.slugInput.value.toLowerCase().replace(/ /g, '-'),
          logo_id: window.activelogo._dbid
        };
        if (_this.bgl) {
          _this.putBrandguide(brand, _this.bgl.id).then(function (response) {
            response.json().then(function (res) {
              console.log(res.data);
            });
            window.loading.done();
            _this.init();
            _this.setView('bglDash');
          }).catch(function (err) {
            console.log('err', err);
            window.snackbar('Sorry, we ran into an error. Please try again.');
          });
        } else {
          _this.postBrandguide(brand).then(function () {
            window.loading.done();
            _this.init();
            _this.setView('bglDash');
          }).catch(function (err) {
            console.log('err', err);
            window.loading.done();
            _this.close();
            window.snackbar('Sorry, we ran into an error. Please try again.');
          });
        }
      };
    };

    this.social = function () {
      var url = _this.bglUrl;
      _this.modalEl.querySelector('.social-buttons__single--facebook').onclick = function (e) {
        e.preventDefault;
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
      };

      _this.modalEl.querySelector('.social-buttons__single--twitter').onclick = function (e) {
        e.preventDefault;
        window.open('https://twitter.com/home?status=Check%20out%20our%20company%27s%20brand%20guidelines%20at%20' + url, +url, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
      };

      _this.modalEl.querySelector('.social-buttons__single--email').setAttribute('href', 'mailto:?body=Check%20out%20our%20company%27s%20brandguides%20at%20' + url);
    };

    this.addTrigger = function () {
      var trigger = document.createElement('button');
      trigger.classList.add('bgl-modal-trigger');
      trigger.innerHTML = "View your brand guidelines";
      trigger.onclick = function () {
        _this.show('bglDash');
      };

      var editor = document.querySelector('.container--editor');
      editor.insertBefore(trigger, editor.firstChild);
    };

    this.addCTA = function () {
      var trigger = document.createElement('button');
      trigger.classList.add('bgl-modal-trigger');
      trigger.innerHTML = "Activate brand guidelines for this logo";
      trigger.onclick = function () {
        _this.show('onboardBgl');
      };

      var editor = document.querySelector('.container--editor');
      editor.insertBefore(trigger, editor.firstChild);
    };

    this.show = function (view) {
      if (view) _this.setView(view);
      _this.modalEl.classList.add('visible');
      _this.modalEl.classList.remove('hidden');
    };

    this.hide = function () {
      _this.modalEl.classList.remove('visible');
      _this.modalEl.classList.add('hidden');
    };

    this.setView = function (view) {
      var views = _this.modalEl.querySelectorAll('.modal2__body');

      for (var i = 0; i < views.length; i++) {
        if (views[i].getAttribute('id') === view) {
          views[i].classList.remove('hidden');
        } else {
          views[i].classList.add('hidden');
        }
      };
    };

    this.postBrandguide = function (brandguide) {
      return fetch(window.APIURL + '/brandguidelines', {
        headers: new Headers({
          'Authorization': 'JWT ' + window.state.token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(brandguide),
        method: 'POST',
        mode: 'cors'
      });
    };

    this.putBrandguide = function (brandguide, id) {
      console.log('brandguide', brandguide);
      return fetch(window.APIURL + '/brandguidelines/' + id, {
        headers: new Headers({
          'Authorization': 'JWT ' + window.state.token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(brandguide),
        method: 'PUT',
        mode: 'cors'
      });
    };

    this.init();
  };
})(window, jQuery);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, $, undefined) {
  var Gallery = function Gallery() {

    this.config = {
      logoBaseURL: window.LOGOSURL,
      apiURL: window.APIURL
    };

    this.init = function () {
      // routing main v single page
      var path = window.location.pathname.split('/').filter(Boolean);
      if (path.length > 1) this.getLogo(path[1]);else this.viewLogos();

      // binding / els
      this.voteButton = document.querySelector('.upvote');
      this.voteButton.onclick = this.updateVote.bind(this);

      // config: stay on page after log in
      document.querySelector('form[name="login"]').setAttribute('data-callback', 'onpage');
      document.querySelector('form[name="signup"]').setAttribute('data-callback', 'onpage');
    };

    this.getLogo = function (id) {
      var _this = this;
      this.getVotes(id);
      fetch(this.config.apiURL + '/logos/' + id).then(function (response) {
        if (response.status !== 200) {
          console.log('Error, status code: ' + response.status);
          return;
        }
        response.json().then(function (res) {
          _this.logo = res.data.logo;
          _this.viewLogo(id);
        });
      }).catch(function (err) {
        console.log('Error:', err);
      });
    };

    this.getVotes = function (id) {
      var _this = this;

      fetch(this.config.apiURL + '/votes/' + id).then(function (response) {
        if (response.status !== 200) {
          console.log('Error, status code: ' + response.status);
          return;
        }
        response.json().then(function (res) {
          _this.voteCount = res.data["count(*)"] || 0;
        });
      }).catch(function (err) {
        console.log('Error:', err);
      });

      // if user is logged in, check if they have voted on this before
      if (window.state.token) {
        fetch(this.config.apiURL + '/votes/' + id + '?user_id=' + window.state.user.id, {
          headers: new Headers({
            'Authorization': 'JWT ' + window.state.token,
            'Content-Type': 'application/json'
          })
        }).then(function (response) {
          if (response.status !== 200) {
            console.log('Error, status code: ' + response.status);
            return;
          }
          response.json().then(function (res) {
            if (res.data["count(*)"] > 1) {
              _this.voteButton.setAttribute('disabled', true);
              _this.hasAlreadyVoted = true;
            }
          });
        }).catch(function (err) {
          console.log('Error:', err);
        });
      }
    };

    this.updateVote = function () {
      var _this2 = this;

      var _this = this;

      if (!window.state.token) {
        $('#loginModal').modal('show');
      } else if (this.hasAlreadyVoted) {
        return;
      } else {
        fetch(_this.config.apiURL + '/votes/' + this.logo.id, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Authorization': 'JWT ' + window.state.token,
            'Content-Type': 'application/json'
          })
        }).then(function (res) {
          var count = parseInt(_this.voteButton.querySelector('[template=number_of_votes]').innerHTML);
          _this.voteButton.querySelector('[template=number_of_votes]').innerHTML = count + 1;
          _this.voteButton.setAttribute('disabled', true);
          _this2.hasAlreadyVoted = true;
        });
      }
    };

    this.drawLogo = function (el, logo) {
      var link = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


      var colorfill = logo.ingredients.color_tag == 'dark_bg' ? '#ffffff' : logo.ingredients.color.hex,
          colorbg = logo.ingredients.color_tag == 'dark_bg' ? logo.ingredients.color.hex : '#ffffff';

      el.className = "gallery-logo";
      el.style.backgroundColor = colorbg;

      //el.innerHTML = '<a href="/gallery/' + logo.id + ' "><div class="logo" style="background:url(' + this.config.logoBaseURL +'/'+ logo.id + '/' + logo.id + '.svg);background-size:contain;background-position:center;background-repeat:no-repeat;"></div></a>';
      el.innerHTML = '<a href="/gallery/' + logo.id + ' "><div class="vheight"><div class="vcell"><img src="' + this.config.logoBaseURL + '/' + logo.id + '/' + logo.id + '.svg" /></div></div></a>';
    };

    this.social = function (el) {
      var shareUrl = window.location.origin + '/gallery/' + this.logo.id;

      el.querySelector('.btn--fb').onclick = function (e) {
        e.preventDefault;
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + shareUrl, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
      };

      el.querySelector('.btn--twitter').onclick = function (e) {
        e.preventDefault;
        window.open('https://twitter.com/home?status=' + shareUrl, +shareUrl, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
      };

      el.querySelector('.btn--email').setAttribute('href', 'mailto:?&amp;subject=Can you upvote my logo?&amp;body=Playing around with logos and this one was actually nominated for logo of the day! Please give me an upvote so I win! https://www.logojoy.com/gallery/' + shareUrl);
    };

    this.viewLogos = function () {
      document.querySelector('.specific-logo').style.display = 'none';
      window.state = {};

      var logos = window.logos.data.logos;

      for (var i = 0; i < logos.length; i++) {
        var logo = logos[i];
        var logoEl = document.createElement('div');

        this.drawLogo(logoEl, logo);

        document.querySelector('.favorite-logos').appendChild(logoEl);
      };
    };

    this.viewLogo = function (id) {
      var logoEl = document.querySelector('.specific-logo-container');

      this.social(document.querySelector('.social'));
      this.drawLogo(logoEl, this.logo, false);

      var strings = document.querySelectorAll('.template');

      for (var i = 0; i < strings.length; i++) {
        var stringEl = strings[i];
        var stringName = stringEl.getAttribute('template');
        if (stringName == 'company_name') stringEl.innerHTML = this.logo.ingredients.company.company_name;
        if (stringName == 'owner_name') stringEl.innerHTML = this.logo.ingredients.company.company_name;
        if (stringName == 'number_of_votes') stringEl.innerHTML = this.voteCount || 0;
      }
    };

    this.init();
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    if (document.querySelector('body').className.indexOf('gallery-master') >= 0) {
      new Gallery();
    }
  });
})(window, jQuery);

/***/ })
/******/ ]);