import ChartMini from './src/main.vue'

ChartMini.install = function(Vue, opts = {}) {
    Vue.component(ChartMini.name, ChartMini);
}

export default ChartMini