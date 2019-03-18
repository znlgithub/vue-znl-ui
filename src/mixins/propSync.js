/**
 * 扩展props 属性不能双向绑定
 * 使用方法：
 * 在props属性的配置中添加propsync=true,会自动生成一个以p_开头的data属性用于双向绑定
 * 当data属性修改后会触发updata:加上props属性名（小写）的事件
 */

const version = '1.0.0'

const isEnableName = 'propsync'

const getDataName = (propName) => {
  return 'p_' + propName
}

const data = function () {
  let data = {}
  let propsKeys = Object.keys((this.$options.props) || {})
  propsKeys.forEach((prop, i) => {
    let dataName = getDataName(prop)
    let isEnable = this.$options.props[prop][isEnableName]
    isEnable = (typeof isEnable === 'boolean') ? isEnable : false
    if (!isEnable) { return }
    data[dataName] = this[prop]
  })
  return data
}

const created = function () {
  let unwatchPropsFnArr = []
  let unwatchDataFnArr = []
  let propsKeys = Object.keys((this.$options.props) || {})
  propsKeys.forEach((prop, i) => {
    let dataName = getDataName(prop)
    let isEnable = this.$options.props[prop][isEnableName]
    isEnable = (typeof isEnable === 'boolean') ? isEnable : false
    if (!isEnable) { return }
    let propsFn = this.$watch(prop, function (newVal, oldVal) {
      this[dataName] = newVal
    }, {})
    unwatchPropsFnArr.push(propsFn)
    let dataFn = this.$watch(dataName, function (newVal, oldVal) {
      let capitalLetters = prop.match(/[A-Z]/g)
      capitalLetters && capitalLetters.forEach((letter, index) => {
        let firstIndex = capitalLetters.indexOf(letter)
        if (firstIndex >= index) {
          prop = prop.replace(new RegExp(letter, 'g'), '-' + letter.toLowerCase())
        }
      })

      prop.substr(0, 1) === '-' && (prop = prop.substr(1))
      this.$emit('update:' + prop, newVal, oldVal)
    }, {})
    unwatchDataFnArr.push(dataFn)
  })
}

const mixin = {
  data: data,
  created: created
}

export {
  version,
  isEnableName as keyName,
  mixin
}
