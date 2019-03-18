import Cart from './src/main.js'

/* istanbul ignore next */
Cart.install = function(Vue, opts = {}) {
    Vue.component(Cart.name, Cart);
}

export default Cart