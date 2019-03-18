<template>
<div 
    ref="znlHighCharts"
    class="znlHighCharts"
    v-loading="loading">
    <div class="znl-header">
       <span class="znl-header-text">{{titles}}</span>
    </div>
    <div class="znl-action">
        <slot name="znl-action"></slot>
    </div>
    <highcharts :options="chartOptions" ref="highcharts">
    </highcharts>
</div>
</template>

<script>
import Option from './option.js'
import Vue from 'vue'
import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts);
export default {
  name: 'ZnlHighcharts',
  components: {

  },
  data () {
    return {
        chartOptions: {}
    }
  },
  watch: {
  },
  props: {
    options: {
        type: Object
    },
    loading: {
      type: Boolean,
      default: false
    },
    titles: ''
  },
  watch: {
    options () {
        this.setOptions()
    }
  },
  methods: {
    setOptions () {
        this.chartOptions = _.extend(Option, this.options ? this.options : {})
        // console.log(this.chartOptions.chart.backgroundColor)
    }
  },
  mounted () {
     this.setOptions()
  },
  updated () {
    
  }
}
</script>

