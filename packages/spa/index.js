import Spa from './src/main.vue'

/* istanbul ignore next */
Spa.install = function(Vue, opts = {}) {
    Vue.component(Spa.name, Spa);
}

export default Spa