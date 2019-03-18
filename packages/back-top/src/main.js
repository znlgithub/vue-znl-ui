export default {
  name: 'ZnlBackTop',

  data () {
    return {
      showBackToTop: false
    }
  },

  props: {
    target: {
      type: Function,
      default () {
        return window
      }
    },

    visibilityHeight: {
      type: Number,
      default: 400
    },

    clickHandlerCb: Function
  },

  methods: {
    init () {
      this.target().addEventListener('scroll', this.scrollHandler)
    },

    scrollHandler () {
      let scrollTop = this.target().scrollTop
      if (scrollTop >= this.visibilityHeight) {
        this.showBackToTop = true
      } else {
        this.showBackToTop = false
      }
    },

    clickHandler () {
      this.target().scrollTop = 0;

      this.clickHandlerCb && this.clickHandlerCb();
    }
  },

  watch: {
  },

  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },

  beforeDestroy() {
    this.target().addEventListener('scroll', this.scrollHandler)
  },

  render (h) {
    let _this = this
    let divClass = 'znl-back-top'

    const defaultSlot = this.$slots.default ? this.$slots.default[0] : h('i', {attrs: {class: 'iconfont icon-table_pack-up_btn_n1'}})

    if (_this.showBackToTop) {
      return (
        <transition name="znl-back-top-fade">

          <div class="znl-back-top" onClick={_this.clickHandler}>

            {defaultSlot}

          </div>

        </transition>

      )
    } else {
      return (

        <div class="znl-back-top hide">
        </div>

      )
    }
  }
}