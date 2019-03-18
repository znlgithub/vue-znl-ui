import Dialog from './src/dialog.vue'

/* istanbul ignore next */
Dialog.install = function(Vue, opts = {}) {
    Vue.component(Dialog.name, Dialog);
}

export default Dialog