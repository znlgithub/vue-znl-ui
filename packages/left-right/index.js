import LeftRight from './src/main.vue'

/* istanbul ignore next */
LeftRight.install = function(Vue, opts = {}) {
    Vue.component(LeftRight.name, LeftRight);
}

export default LeftRight