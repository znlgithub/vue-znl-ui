import DialogMini from './src/main.vue'

/* istanbul ignore next */
DialogMini.install = function(Vue, opts = {}) {
    Vue.component(DialogMini.name, DialogMini);
}

export default DialogMini