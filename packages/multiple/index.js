import Multiple from './src/main.vue'

/* istanbul ignore next */
Multiple.install = function(Vue, opts = {}) {
    Vue.component(Multiple.name, Multiple);
}

export default Multiple