
import CellRender from './src/main.js'

CellRender.install = function(Vue, opts = {}) {

  Vue.component(CellRender.name, CellRender);
}

export default CellRender