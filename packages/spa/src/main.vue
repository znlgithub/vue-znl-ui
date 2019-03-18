<template>

  <div class="znl-layout-spa"
        v-loading="pageLoading"
        :element-loading-text="znlLoadingText"
        >
    <slot name="znlLayoutSpa"></slot>
    <slot></slot>
    
  </div>

</template>

<script>
export default {
  name: 'znl-layout-spa',
  props: {
    pageLoading: {
      type: Boolean,
      default: false
    },
    znlLoadingText: {
      type: [String, Function],
      default () {
        return '页面加载中，请稍后'
      }
    }
  },
  data () {
    return {
      
    }
  },
  watch: {

  },
  methods: {

  },
  mounted () {
  }
}
</script>

