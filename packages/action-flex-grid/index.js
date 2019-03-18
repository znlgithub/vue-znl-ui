import ActionFlexGrid from './src/main.vue'

/* istanbul ignore next */
ActionFlexGrid.install = function(Vue, opts = {}) {
    Vue.component(ActionFlexGrid.name, ActionFlexGrid);
}


export default ActionFlexGrid