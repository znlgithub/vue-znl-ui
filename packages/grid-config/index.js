import GridConfig from './src/main.vue'

GridConfig.install = function(Vue, opts = {}) {
    Vue.component(GridConfig.name, GridConfig);
}

export default GridConfig