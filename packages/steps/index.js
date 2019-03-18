import Steps from './src/main.vue'

/* istanbul ignore next */
Steps.install = function(Vue, opts = {}) {
    Vue.component(Steps.name, Steps);
}

export default Steps