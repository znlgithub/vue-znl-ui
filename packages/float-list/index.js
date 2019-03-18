import FloatList from './src/main.vue'

/* istanbul ignore next */
FloatList.install = function(Vue, opts = {}) {
    Vue.component(FloatList.name, FloatList);
}

export default FloatList