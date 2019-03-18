import Accordion from './src/main.vue'

/* istanbul ignore next */
Accordion.install = function(Vue, opts = {}) {
    Vue.component(Accordion.name, Accordion);
}


export default Accordion