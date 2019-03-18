import topBottom from './src/main.vue'

/* istanbul ignore next */
topBottom.install = function(Vue, opts = {}) {
    Vue.component(topBottom.name, topBottom);
}

export default topBottom