import BackTop from './src/main'

/* istanbul ignore next */
BackTop.install = function(Vue, opts = {}) {
    Vue.component(BackTop.name, BackTop);
}

export default BackTop