
import BaseFlexGrid from './src/main.vue'

/* istanbul ignore next */
BaseFlexGrid.install = function(Vue, opts = {}) {
    Vue.component(BaseFlexGrid.name, BaseFlexGrid);
}

export default BaseFlexGrid