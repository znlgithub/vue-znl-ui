import Scrollbar from './src/main.js'

/* istanbul ignore next */
Scrollbar.install = function(Vue, opts = {}) {
    Vue.component(Scrollbar.name, Scrollbar);
}

export default Scrollbar