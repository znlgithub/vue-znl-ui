<template>
    <el-row
      class="znl-layout-leftright"
      v-loading="pageLoading"
      :element-loading-text="znlLoadingText"
   
      :style="{
          height: heightCom
      }"
      >
      <el-col
        :span="span"
        class="znlLeft"
         :style="{
          width: leftComponentWidth
          }" 
        >
        <slot name="znlLeft" ></slot>
      </el-col>
      <el-col
        :span="24-span"
        class="znlRight"
         :style="{
          width: rightComponentWidth
          }" 
        >
        <slot name="znlRight"></slot>
      </el-col>
    </el-row>
</template>

<script>
import { elResize } from '~/utils/dom'

export default {
  name: 'znl-layout-leftright',

  props: {
    leftWidth: {
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

  mixins: [

  ],

  data () {
    return {
      span: 12,
      heightCom: 0,
      leftComponentWidth: 0,
      rightComponentWidth: 0
    }
  },

  watch: {

  },

  methods: {
    setWidth () {
      if (this.leftWidth && this.leftWidth.substr(-1) === '%') {
        let widthPoint = parseFloat(this.leftWidth.substr(0, this.leftWidth.length - 1)) / 100
        let parentElementWidth = this.$el.parentElement.offsetWidth
        this.leftComponentWidth = parentElementWidth * widthPoint + 'px'
        this.rightComponentWidth = parentElementWidth - parentElementWidth * widthPoint + 'px'
      } else if (this.leftWidth && this.leftWidth.substr(-2) === 'px') {
        let width = parseFloat(this.leftWidth.substr(0, this.leftWidth.length - 2))
        let parentElementWidth = this.$el.parentElement.offsetWidth
        this.leftComponentWidth = width + 'px'
        this.rightComponentWidth = parentElementWidth - width + 'px'
      } else if (parseFloat(this.leftWidth)) {
        let width = parseFloat(this.leftWidth)
        let parentElementWidth = this.$el.parentElement.offsetWidth
        this.leftComponentWidth = width + 'px'
        this.rightComponentWidth = parentElementWidth - width + 'px'
      }
    },

    setHeight () {
        this.heightCom = this.$el.parentElement.offsetHeight + 'px'
    },

    elResizeFunc () {
      this.setWidth()
      this.setHeight()
    }
  },

  mounted () {
    this.setWidth()
    this.setHeight()
    elResize.on(document.body, this.elResizeFunc)
  },

  updated () {
    this.setHeight()
    this.setWidth()   
  },

  destroyed () {
    elResize.off(document.body, this.elResizeFunc)
  }
}
</script>

