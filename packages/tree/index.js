import Tree from './src/main.vue'

/* istanbul ignore next */
Tree.install = function(Vue, opts = {}) {
    Vue.component(Tree.name, Tree);
}

export default Tree