import HighCharts from './src/main.vue'

/* istanbul ignore next */
HighCharts.install = function (Vue, opts = {}) {
  Vue.component(HighCharts.name, HighCharts);
}

export default HighCharts