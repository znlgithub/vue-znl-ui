/* istanbul ignore next */

import Vue from 'vue'
const isServer = Vue.prototype.$isServer
const SPECIAL_CHARS_REGEXP = /([\\:\-\\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.documentMode)

/* istanbul ignore next */
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
/* istanbul ignore next */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
// get scroll width
export function getScrollWidth() {
  var noScroll, scroll, oDiv = document.createElement("DIV");
  oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = "scroll";
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll-scroll;
}

/* istanbul ignore next */
export const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/* element resize */
export const elResize = (function () {
  var EleResize = {
    _handleResize: function (e) {
      var ele = e.target || e.srcElement
      var trigger = ele.__resizeTrigger__
      if (trigger) {
        var handlers = trigger.__z_resizeListeners
        if (handlers) {
          var size = handlers.length
          for (var i = 0; i < size; i++) {
            var h = handlers[i]
            var handler = h.handler
            var context = h.context
            handler.apply(context, [e])
          }
        }
      }
    },
    _removeHandler: function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners
      if (handlers) {
        var size = handlers.length
        for (var i = 0; i < size; i++) {
          var h = handlers[i]
          if (h.handler === handler && h.context === context) {
            handlers.splice(i, 1)
            return
          }
        }
      }
    },
    _createResizeTrigger: function (ele) {
      var obj = document.createElement('object')
      obj.setAttribute('style',
            'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;')
      obj.onload = EleResize._handleObjectLoad
      obj.type = 'text/html'
      ele.appendChild(obj)
      obj.data = 'about:blank'
      return obj
    },
    _handleObjectLoad: function (evt) {
      this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
      this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize)
    }
  }
  if (!isServer && document.attachEvent) { // ie9-10
    EleResize.on = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners
      if (!handlers) {
        handlers = []
        ele.__z_resizeListeners = handlers
        ele.__resizeTrigger__ = ele
        ele.attachEvent('onresize', EleResize._handleResize)
      }
      handlers.push({
        handler: handler,
        context: context
      })
    }
    EleResize.off = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners
      if (handlers) {
        EleResize._removeHandler(ele, handler, context)
        if (handlers.length === 0) {
          ele.detachEvent('onresize', EleResize._handleResize)
          delete ele.__z_resizeListeners
        }
      }
    }
  } else {
    EleResize.on = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners
      if (!handlers) {
        handlers = []
        ele.__z_resizeListeners = handlers

        if (getComputedStyle(ele, null).position === 'static') {
          ele.style.position = 'relative'
        }
        var obj = EleResize._createResizeTrigger(ele)
        ele.__resizeTrigger__ = obj
        obj.__resizeElement__ = ele
      }
      handlers.push({
        handler: handler,
        context: context
      })
    }
    EleResize.off = function (ele, handler, context) {
      var handlers = ele.__z_resizeListeners
      if (handlers) {
        EleResize._removeHandler(ele, handler, context)
        if (handlers.length === 0) {
          var trigger = ele.__resizeTrigger__
          if (trigger) {
            trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize)
            ele.removeChild(trigger)
            delete ele.__resizeTrigger__
          }
          delete ele.__z_resizeListeners
        }
      }
    }
  }
  return EleResize
})()
// 根据字符串计算像素
export function calcStringPixelsCount (str, strFontSize) {
  // 字符串字符个数
  let stringCharsCount = str.length
  // 字符串像素个数
  let stringPixelsCount = 0
  // 创建HTML元素：span
  let elementPixelsLengthRuler = document.createElement("span");
  elementPixelsLengthRuler.style.fontSize = strFontSize  // 设置span的fontsize
  elementPixelsLengthRuler.style.visibility = "hidden"  // 设置span不可见
  elementPixelsLengthRuler.style.display = "inline-block"
  elementPixelsLengthRuler.style.wordBreak = "break-all !important"  // 打断单词
  // 添加span
  document.body.appendChild(elementPixelsLengthRuler);
  for (let i =0; i < stringCharsCount; i++) {
      if (str[i] == " ") {
          elementPixelsLengthRuler.innerHTML = "&nbsp;"
      } else {
          elementPixelsLengthRuler.innerHTML = str[i]
      }
      stringPixelsCount += elementPixelsLengthRuler.offsetWidth
  }
  return stringPixelsCount
}

/* istanbul ignore next */
export const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function getDocumentRect () {
  var win = {width: 0, height: 0, scrollLeft: 0, scrollTop: 0}
  if (isServer) return win
  if (window.innerHeight) {
    win.height = window.innerHeight
    win.width = window.innerWidth
  } else if (document.body && document.body.clientHeight) {
    win.height = document.body.clientHeight
    win.width = document.body.clientWidth
  }
  if (document.documentElement && document.documentElement.clientHeight) {
    win.height = document.documentElement.clientHeight
    win.width = document.documentElement.clientWidth
  }
  win.scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  win.scrollLeft = Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft)
  return win
}

/* istanbul ignore next */
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
};

export function getCursortPosition (textDom) { //获取光标位置函数
  var cursorPos = 0;
  let cursorStart = 0;
  let cursorEnd = 0;
  if (document.selection) {
      // IE Support
      textDom.focus ();
      var selectRange = document.selection.createRange();
      selectRange.moveStart ('character', -textDom.value.length);
      cursorPos = selectRange.text.length;
  }else if (textDom.selectionStart || textDom.selectionStart == '0') {
      // Firefox support
      cursorPos = textDom.selectionStart;
      cursorStart = textDom.selectionStart;
      cursorEnd = textDom.selectionEnd;
  }
  console.log('dom.js', cursorStart, cursorEnd)
  let obj = {
    cursorStart: cursorStart,
    cursorEnd: cursorEnd
  }
  // return cursorPos;
  return obj;
}
export function getStrLeng(str){ //UTF8字符集实际长度计算
  var realLength = 0;
  var len = str.length;
  var charCode = -1;
  for(var i = 0; i < len; i++){
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) { 
          realLength += 1;
      }else{ 
          // 如果是中文则长度加3
          realLength += 2;
      }
  } 
  return realLength;
}

/* istanbul ignore next */
export function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
};
// export function getBoundingClientRect (ele, height) {
//   // console.log(ele.getBoundingClientRect(), ele.getBoundingClientRect().top, window.innerHeight, height)
// };

/* istanbul ignore next */
export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
};

/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'styleFloat'
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100
        } catch (e) {
          return 1.0
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null)
    }
  } catch (e) {
    return element.style[styleName]
  }
} : function (element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

/* istanbul ignore next */
export function setStyle (element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
};
export function getClientWidthHeight () {
  if (isServer) return {
    clientWidth: 0,
    clientHeight: 0
  }
  let win = {
    clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
  }
  return win
}

 // 获取DOM元素data属性
export function getData (element, dataName) {
  if (!element || !dataName) return
  return element.getAttribute('data-' + dataName)
}

// 设置DOM元素data属性
export function setData (element, dataName, value) {
  if (!element || !dataName) return

  if (typeof dataName === 'object') {
    for (var prop in dataName) {
      if (dataName.hasOwnProperty(prop)) {
        setData(element, prop, dataName[prop])
      }
    }
  } else {
    element.setAttribute('data-' + dataName, value)
  }
}

  // 移出DOM元素data属性
export function removeData (element, dataName) {
  if (!element || !dataName) return
  element.removeAttribute('data-' + dataName)
}

