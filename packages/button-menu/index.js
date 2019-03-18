import ButtonMenu from './src/main.vue'

/* istanbul ignore next */
ButtonMenu.install = function(Vue, opts = {}) {
    Vue.component(ButtonMenu.name, ButtonMenu);
}

export default ButtonMenu