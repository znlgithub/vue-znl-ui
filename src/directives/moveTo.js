/**
 * 移动元素到指定的节点
 * 使用方法：
 * v-move-to.body //移到body目录
 * v-move-to="moveTo" //可以为Node节点元素或检索元素的字符串或Function
 */

const version = '1.0.0'

const moveTo = {
  inserted: function (el, binding) {
    if (binding.modifiers.body) {
      let body = document.getElementsByTagName('body')[0]
      body.appendChild(el)
    } else if (binding.value) {
      let value = binding.value
      if (typeof value === 'function') {
        value = value()
      }
      if (value) {
        if (typeof value === 'string') {
          var panel = document.querySelector(value)
        } else if (value && value.nodeType === 1 && value.appendChild) {
          panel = value
        }
        panel && panel.appendChild(el)
      }
    }
  }
}

const mixin = {
  directives: {
    moveTo: moveTo
  }
}

export {
  version,
  moveTo,
  mixin
}
