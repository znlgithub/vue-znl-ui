import Multiples from './src/main.vue'

/* istanbul ignore next */
Multiples.install = function(Vue, opts = {}) {
    Vue.component(Multiples.name, Multiples);
}

export default Multiples