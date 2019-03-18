
/**
 * 添加焦点到元素
 * 使用方法：
 * v-focus="true"
 */

const version = '1.0.0'

const focus = {
  bind (el) {
    el.setAttribute('tabIndex', '-1')
  },
  inserted (el, binding) {
    if (binding.value) el.focus()
    else el.blur()
  },

  componentUpdated (el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return
      }
    }

    if (binding.value) el.focus()
    else el.blur()
  }
}

const mixin = {
  directives: {
    focus: focus
  }
}
export {
  version,
  focus,
  mixin
}
