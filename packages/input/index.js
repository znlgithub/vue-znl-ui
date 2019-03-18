import Input from './src/main.vue'

/* istanbul ignore next */
Input.install = function(Vue, opts = {}) {
    Vue.component(Input.name, Input);
}

export default Input