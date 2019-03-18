<template>
  <div ref="znlChart" 
       class="znl-grid-chart rela fs16" 
       v-loading="loading"
       :style="{
         width: sumWidth,
         height: sumHeight,
         'background-color': backgroundColor
       }"
       element-loading-text="数据加载中,请稍后..." >
    <div class="znl-header" v-show="p_gridShow">
       <span class="znl-header-text">{{'· '+titles}}</span>
    </div>
    <div class="znl-action" v-show="p_gridShow">
        <slot name="znl-action"></slot>
    </div>
    <div class="echarts" :style="'height:'+rectHeight+'px;'" v-show="p_gridShow">
      <IEcharts ref="iecharts"
                :option="xyoption"
                :resizable="resizable"
                 @ready="onReady&&onReady()">
      </IEcharts>
    </div>
  </div>
</template>
l
<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'
import globalMixin from '~/mixins/global'
import { elResize } from '~/utils/dom'
import { mixin as propSyncMixin } from '~/mixins/propSync'

export default {
  name: 'ZnlChart',
  components: {
    IEcharts
  },
  mixins: [
    propSyncMixin,
    globalMixin
  ],
  data () {
    return {
      rectHeight: 500
    }
  },
  watch: {
  },
  props: {
    sumWidth: {
      type: String,
      defalut: '100%'
    },
    sumHeight: {
      type: String,
      defalut: '100%'
    },
    backgroundColor: {
      type: String,
      defalut: '#fff'
    },
    height: {
        type: [String, Number],
        default: '100%'
    },
    xyoption: Object,
    titles: String,
    onReady: Function,
    loading: {
      type: Boolean,
      default: true
      },
    resizable: {
        type: Boolean,
        default: true
    },
    gridShow: {
      type: Boolean,
      default: true,
      propsync: true
    },
    layoutType: {
      type: String,
      defalut: 'spa',
      validator (value) {
        return _.contains(['spa', 'other'], value)
      }
    },
    onInit: Function,
    isInit: {
      type:Boolean,
      default: true
    },
    initData: {
      type:Boolean,
      default: true
    }
  },
  watch: {
  },
  methods: {
    async init (refresh) {
      // this.p_loading = this.loading ? true: false
      this.$emit('page-loading', true)  
      this.p_gridShow = false  
      let init = this.onInit && this.onInit(null, refresh)
      if (_.isBoolean(init)) { 
      } else if (!_.isUndefined(init) && init.then && this.initData) {
        // this.p_loading = true      
        init.then(response => {
          _.delay(() => {
            // this.p_loading = false 
            this.p_gridShow = true
            this.$emit('page-loading', false)   
          }, 200)
        }, e => {
          // this.p_loading = false
          this.p_gridShow = true
          this.$emit('page-loading', false)     
        })
      }
    },
    setHeight () {
        // let headerHeight = this.$el.querySelector('.znl-header') ? (this.$el.querySelector('.znl-header').offsetHeight) : 0 // 上下padding
        // let actionHeight = this.$el.querySelector('.znl-action') ? ( this.$el.querySelector('.znl-action').offsetHeight) : 0 // 上下padding
      let headerHeight = this.titles ? this.globalDomRect.tabHeaderHeight : 0
      let actionHeight = this.globalDomRect.actionHeight
      let parentHeight = this.globalDomRect.clientHeight - this.globalDomRect.headerHeight
      if (this.height && this.height.substr && this.height.substr(-1) === '%') {
        let point = parseFloat(this.height.substr(0, this.height.length - 1)) / 100
        let height = 0
        if (this.layoutType === 'spa') {
          height = point * parentHeight - headerHeight - actionHeight
        } else {
          height = point * (this.$el.parentElement.offsetHeight) - headerHeight - actionHeight
        }
        this.rectHeight = height
        return
      } else if (this.height && this.height.substr && this.height.substr(-2) === 'px') {
        let height = parseFloat(this.height.substr(0, this.height.length - 2))
        this.rectHeight = height - headerHeight - actionHeight
        return
      } else if (this.height && parseFloat(this.height)) {
        let height = parseFloat(this.height)
        this.rectHeight = height - headerHeight - actionHeight        
        return
      } 
    },
    resize () {
      return this.$refs.iecharts.resize
    },
    updateChart () {
      return this.$refs.iecharts.update
    }
  },
  mounted () {
      this.isInit && this.init()
      this.$nextTick(()=>{
        this.setHeight()
      })
      elResize.on(document.body, this.setHeight)
  },
  updated () {
      this.setHeight()
  },
  destroyed () {
    elResize.off(document.body, this.setHeight)
  }
}
</script>
