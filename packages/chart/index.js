import Chart from './src/main.vue'

/* istanbul ignore next */
Chart.install = function(Vue, opts = {}) {
    Vue.component(Chart.name, Chart);
}

export default Chart