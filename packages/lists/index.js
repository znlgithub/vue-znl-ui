
import Lists from './src/main.vue'

/* istanbul ignore next */
Lists.install = function(Vue, opts = {}) {
    Vue.component(Lists.name, Lists);
}

export default Lists