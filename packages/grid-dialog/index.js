import GridDialog from './src/main.vue'

GridDialog.install = function(Vue, opts = {}) {
    Vue.component(GridDialog.name, GridDialog);
}

export default GridDialog