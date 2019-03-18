<template>
  <div 
    :class="[
      'znl-button',
      btns && btns.length > 0 ? 'znl-btn-select' : '',
      `znl-btn-${type}`,
      countTime>0?'timekeeping':'',
      disabled?'znl-button_disabled':'',
      styleType
    ]"
    :style="buttonStyle">

    <div 
      v-if="$slots.default && type!=='multiple'"
      :class="['button']"
      @click="buttonClick($event)"
      :title="tip"
      :style="{
      height: height - 2 + 'px',
      'line-height': height - 2 + 'px',
      width: '100%',
      'padding-right': btns && btns.length > 0 ? '8px' : 'none'
      }">

      <!-- 非倒计时时显示 -->
      <slot v-if="countTime <= 0"></slot>
      <span v-else>{{prefixText}}{{countTime}}{{suffixText}}</span>

    </div>

    <slot v-if="type==='multiple'"></slot>

    <div 
      v-if="btns && btns.length > 0"
      class="icon"
      :style="{
        height: height
      }">

      <i 
        :class="['iconfont', !mouseMenuConfig.show ? 'icon-arrow_unfold_btn' : 'icon-arrow_up_btn']"
        @click="!disabled&&unfoldSelete($event)"
        :style="{
          display: 'inline-block',
          height: height - 2 + 'px',
          'line-height': height - 2 + 'px'
        }"
      ></i>
    </div>

    <znl-collapse-transition :disable-transitions="disableTransitions">

      <div 
        class="znl-button-wrapper wj-right-menu"
        ref="mouseMenuConfig"
        tabindex="-1"
        @blur="blur"
        v-if="btns.length > 0"
        v-show="mouseMenuConfig.show"
        :style="{left:mouseMenuConfig.left + 'px',top:mouseMenuConfig.top + 'px',
        width: mouseMenuConfig.width + 'px',
        position: 'fixed'}">

        <ul>
          <template v-for="(menu, index) in btnsCom">
            <li :key="index" v-if="menu.isShow">
              <span 
                class="menu-item"
                @click="(e)=>{menu.click(), mouseMenuConfig.show=false}">
                <i :class="['iconfont',menu.iconName]"></i>
                {{menu.name}}
              </span>
            </li>
          </template>
        </ul>

      </div>

    </znl-collapse-transition>

  </div>
</template>
<script>

  import ZnlCollapseTransition from 'packages/transition/collapse-transition'

  export default{
    name: 'znl-button',

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    components: {
      ZnlCollapseTransition
    },

    computed: {
      options () {
        return _.filter(this.btns, (btn, index) => {
          return index !== 0
        })
      },
      buttonStyle () {
        let style = {
          height: this.height + 'px',
          width: this.width + 'px',
          lineHeight: this.height + 'px'
        }
        if (this.type === 'multiple') {
          style.padding = '0'
        }
        return style
      }
    },

    data () {
      return {
        mouseMenuConfig: {
          show: false,
          left: 0,
          top: 0
        },
        btnsCom: [],
        countTime: 0,
        timeId: null,
        blurTimeId: ''
        
      }
    },

    watch: {
      btns (val) {
        this.btnsComInit()
      },
      countTime (val) {
        if (val <= 0) {
          clearInterval(this.timeId)
        }
      }
    },

    methods: {
      clearCountdown () {
        this.countTime = 0
      },

      startCountdown () {
        clearInterval(this.timeId)
        this.countTime = this.timeDelay
        this.timeId = setInterval(() => {
          this.countTime--
        }, 1000)
      },

      buttonClick (event) {
        if (this.disabled) return
        if (this.type !== 'countdown') {
          this.$emit('click', event)
        } else {
          if (this.countTime > 0) return
          this.countTime = this.timeDelay
          this.timeId = setInterval(() => {
            this.countTime--
          }, 1000)
          this.$emit('click', event)
        }
      },

      blur (e) {
        this.blurTimeId = setTimeout(() => {
          this.mouseMenuConfig.show = false
          clearTimeout(this.blurTimeId)
        }, 200);
      },

      btnsComInit () {
        this.btnsCom = _.map(this.btns, btn => {
            return {
              name: btn.name,
              isShow: _.isUndefined(btn.isShow)?!btn.isShow:btn.isShow,
              iconName: btn.iconName,
              click: btn.click
            }
        })
      },

      unfoldSelete () {
        clearTimeout(this.blurTimeId)
        this.mouseMenuConfig.show = !this.mouseMenuConfig.show
        this.$nextTick(() => {
          this.$refs.mouseMenuConfig.focus()
        })

        _.find(event.path, item => {
          let classList = item.className ? item.className.split(' ') : []
          if (_.indexOf(classList, 'znl-button') > -1) {
            let Rect = item.getBoundingClientRect()
            this.mouseMenuConfig.left = Rect.left
            this.mouseMenuConfig.top = Rect.top + Rect.height
            this.mouseMenuConfig.width = Rect.width
            return
          }
        })
      }
    },

    props: {
      btns: {
        type: Array,
        default () {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      tip: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 24
      },
      width: {
        type: [Number, String],
        default: 'auto'
      },
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return _.contains(['default', 'countdown', 'multiple', 'text'], value)
        }
      },
       timeDelay: {
        type: Number,
        default: 3
      },
      styleType: {
        type: String,
        default: 'default',
        validator(value) {
          return _.contains(['default', 'main', 'minor', 'info', 'mac', 'link'], value)
        }
      },
      suffixText: {
        type: String,
        default: 'S重发'
      },
      prefixText: {
        type: String,
        default: ''
      },
      disableTransitions: {
        type: Boolean,
        default: false
      }
    },
    
    mounted () {
      this.btnsComInit()
    }
  }
</script>
