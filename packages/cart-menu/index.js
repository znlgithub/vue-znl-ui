import CartMenu from './src/main.vue'

/* istanbul ignore next */
CartMenu.install = function(Vue, opts = {}) {
    Vue.component(CartMenu.name, CartMenu);
}

export default CartMenu