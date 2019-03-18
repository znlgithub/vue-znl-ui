<template>
  <div
    class="znl-steps"
    :style="style"
    >
      <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'znl-steps',

    props: {
      space: [Number, String], // 间距，不填则自适应
      active: { // 当前激活步骤
        type: Number,
        default: 1
      },
      processStatus: { // 设置当前步骤的状态
        type: String,
        default: 'process',
        validator (val) {
          return _.contains(['wait', 'process', 'finish', 'error', 'success'], val)
        }
      },
      finishStatus: { // 设置结束步骤的状态
        type: String,
        default: 'finish',
        validator (val) {
          return _.contains(['wait', 'process', 'finish', 'error', 'success'], val)
        }
      },
      alignCenter: { // 进行居中对齐
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        steps: [],
        stepOffset: 0,
        style: {}
      }
    },

    computed: {
    },

    watch: {
      active () {
        this.heightCom()
      }
    },

    methods: {
      heightCom () {
        this.$nextTick(() => {
          let style = {}
          if (this.steps[this.active - 1]) {
            let domEl = this.steps[this.active - 1].$el
            let topHeight = domEl.querySelector('.znl-step__top').offsetHeight
            let headerHeight = domEl.querySelector('.znl-step__head').offsetHeight
            let titleHeight = domEl.querySelector('.znl-step__main').offsetHeight
            let slotHeight = domEl.querySelector('.znl-step__content').offsetHeight
            style.height = headerHeight + titleHeight + slotHeight + topHeight + 'px'
            this.style = style
          }
        })
      }
    },

    mounted () {
      this.heightCom()
    }
  }
</script>
