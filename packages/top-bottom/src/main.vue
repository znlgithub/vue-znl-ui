<template>

  <div
    class="znl-layout-topbottom"
    v-loading="pageLoading"
    :element-loading-text="znlLoadingText"
   
    >
    <el-row
      class="znlTop"
      :style="{
        height: topComponentHeight
      }"
        >
        <slot
          name="znlTop"
          ></slot>
    </el-row>
    <el-row
    class="znlBottom"
    :style="{
        height: bottomComponentHeight
      }">
        <slot name="znlBottom"></slot>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'znl-layout-topbottom',

  props: {
    topHeight: {
      type: String,
      default: '50%'
    },
    pageLoading: {
      type: Boolean,
      default: false
    },
    znlLoadingText: {
      type: [String, Function],
      default: '页面加载中，请稍后'
    }
  },

  components: {

  },

  mixins: [
  ],

  data () {
    return {
      topComponentHeight: 0,
      bottomComponentHeight: 0,
    }
  },

  watch: {
  },

  methods: {
    setHeight () {
      if (this.topHeight && this.topHeight.substr(-1) === '%') {
          let HeightPoint = parseFloat(this.topHeight.substr(0, this.topHeight.length - 1)) / 100
          HeightPoint = HeightPoint > 0.8 ? 0.8 : HeightPoint
          let parentElementHeight = this.$el && this.$el.parentElement && this.$el.parentElement.offsetHeight
          let noMarginHeight = this.$el && this.$el.parentElement && this.$el.parentElement.style.height
          let noMarginHeightNum = parseFloat(noMarginHeight.substr(0, noMarginHeight.length - 2))
          let PHEIGHT =  noMarginHeightNum ? noMarginHeightNum : parentElementHeight
          this.topComponentHeight = PHEIGHT * HeightPoint - 2.5 + 'px'
          this.bottomComponentHeight = PHEIGHT - PHEIGHT * HeightPoint - 2.5 + 'px'
      } else if (this.topHeight && this.topHeight.substr(-2) === 'px') {
        let Height = parseFloat(this.topHeight.substr(0, this.topHeight.length - 2))
        let parentElementHeight = this.$el.parentElement.offsetHeight
        this.topComponentHeight = Height + 'px'
        this.bottomComponentHeight = parentElementHeight - Height + 'px'
      } else if (parseFloat(this.topHeight)) {
        let Height = parseFloat(this.topHeight)
        let parentElementHeight = this.$el.parentElement.offsetHeight
        this.topComponentHeight = Height + 'px'
        this.bottomComponentHeight = parentElementHeight - Height + 'px'
      }
    }
  },

  mounted () {
    this.$nextTick(()=>{
      this.setHeight()
    })
  },

  updated () {
    this.setHeight()
  }
}
</script>
