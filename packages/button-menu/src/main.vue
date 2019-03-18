<template>
  <div 
    :class="['znl-button-menu', disabled?'menu-disabled':'']"
    :style="elStyle"
    :title="tip"
    @click="e=> !disabled && $emit('click',e)">
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name: 'ZnlButtonMenu',

    computed: {
      elStyle () {
        let __parentHeight = this.$parent.height
        let style = {
          height: __parentHeight - 2 + 'px',
          lineHeight: __parentHeight - 2 + 'px',
          width: _.isNumber(this.width) ? this.width + 'px' : this.width
        }
        return style
      }
    },

    watch: {

    },

    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: 'auto'
      },
      tip: {
        type: String,
        default: ''
      }
    },

    methods: {
      // menuStyle () {
      //   this.$nextTick(() => {
      //     let parentEl = this.$parent.$el
      //     if (_.isUndefined(parentEl)) {
      //       return
      //     }
      //     let style = {}
      //     style.height = parentEl.offsetHeight - 2 + 'px'
      //     style.lineHeight = parentEl.offsetHeight - 2 + 'px'
      //     this.elStyle = style
      //     return  1
      //   })
      // }
    },

    data () {
      return {
        // elStyle: {
        //   height: 'auto',
        //   lineHeight: '0'
        // }
      }
    },

    mounted () {
    }
  }
</script>
