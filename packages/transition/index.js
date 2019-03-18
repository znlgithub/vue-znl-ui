import Transition from './collapse-transition.js'

/* istanbul ignore next */
Transition.install = function(Vue, opts = {}) {
    Vue.component(Transition.name, Transition);
}

export default Transition