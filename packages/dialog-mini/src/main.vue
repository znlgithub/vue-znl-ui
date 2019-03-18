<template>
<!-- <div 
  class="znl-shade" 
  v-show="visible" 
  @click.self="shadeClickHandler"> -->
  <div 
    class="znl-dialog-mini"
    tabindex="1"
    ref="dialogMini"
    v-show="visible" 
    :style="dialogMiniStyle"
    @mouseenter="mouseenter"
    @mouseout="mouseout"
    >

    <div class="znl-dialog-mini-header" v-if="showClose">
      <slot name="header"></slot>
      <i @click="$emit('update:visible', false),$emit('close')" class="iconfont icon-close_btn"></i>
    </div>

    <slot></slot>

  </div>
<!-- </div> -->
</template>
<script>
  export default{
    name: 'ZnlDialogMini',

    props: {
      options: {
        type: Object,
        default () {
          return {
            top: 0,
            left: 0
          }
        }
      },

      visible: {
        type: Boolean,
        default: false
      },

      // isBlurClose: {
      //   type: Boolean,
      //   default: true
      // },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      }
    },

    watch: {
      visible (val) {
        if (val) {
          this.$nextTick(() => {
            this.$emit('open')
          })
        }
      }
    },

    computed: {
      dialogMiniStyle () {
        let style = {}
        !_.isUndefined(this.options.top) ? (style.top = _.isNumber(this.options.top) ? this.options.top + 'px' : this.options.top) : '';
        !_.isUndefined(this.options.left) ? (style.left = _.isNumber(this.options.left) ? this.options.left + 'px' : this.options.left) : '';
        !_.isUndefined(this.options.bottom) ? (style.bottom = _.isNumber(this.options.bottom) ? this.options.bottom + 'px' : this.options.bottom) : '';
        !_.isUndefined(this.options.right) ? (style.right = _.isNumber(this.options.right) ? this.options.right + 'px' : this.options.right) : '';
        return style
      }
    },

    data () {
      return {
      }
    },

    methods: {
      mouseenter (event) {
        this.$emit('update:visible', true)
        this.$emit('mouseenter', event)
      },

      mouseout (event) {
        this.$emit('mouseout', event)
      }
    }
  }
</script>
