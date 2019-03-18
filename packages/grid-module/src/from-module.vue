<template>
  <div>
    <div class="znl-fromstyle">

      <slot name="fromModule"></slot>

    </div>

    <div class="znl-frombtns" v-if="isShowFrombtns" :style="frombtnsStyle()">

      <div class="frombtns" v-if="fromBtns[0] !== 'undefined'">

          <el-button 
            v-show="btn.isShow" 
            size="mini" 
            type="default" 
            :title="(btn.tip)?btn.tip:''"
            v-for="(btn, index) in fromBtns" 
            :key="index"
            @click="btn.click" 
            class="znl-components-btn">

            <i :class="['znl-icon', 'iconfont', (btn.iconName) ? btn.iconName : '']" v-if="btn.iconName"></i>
            {{btn.name}}

          </el-button>

      </div>

      <div class="fromsave">

        <slot name="fromContent"></slot>

          <el-button 
            :class="btn.class" 
            v-show="btn.isShow" 
            size="mini" 
            type="default" 
            v-for="(btn, index) in fromSaveBtns"
            :key="index"
            @click="btn.click">

            <i :class="['znl-icon', 'iconfont', (btn.iconName) ? btn.iconName : '']" v-if="btn.iconName"></i>
            {{btn.name}}

          </el-button>

      </div>
    </div>
  </div>
</template>
<script>
import globalMixin from '~/mixins/global'
export default {
  name: 'znl-from-module',

  mixins: [globalMixin],

  data() {
    return {
      fromModuleHeight: 0
    }
  },

  watch: {

  },
  methods: {
    frombtnsStyle() {
      return {
        height: this.globalDomRect.fromModuleBtnsHeight + 'px'
      }
    },

    tipShowHide(btn) {
      return btn ? ((btn.tip) ? '' : 'znl-tip-hide') : ''
    },

    formBtnShow(show) {
      return (this.gridtype === 'action') && show
    },

    reFMHeight () {
      this.$nextTick(() => {
        let fromModuleHeight = 0
        this.fromModuleHeight = this.$el.offsetHeight
        this.$emit('get-height', this.fromModuleHeight)
      })
    }
  },

  props: {

    fromBtns: {
      type: Array,
      default() {
        return []
      }
    },

    fromSaveBtns: {
      type: Array,
      default() {
        return []
      }
    },
    
    isShowFrombtns: {
      type: Boolean,
      default: true
    }
  },

  mounted() {

    this.$nextTick(() => {
      this.reFMHeight()
    })

  }
}
</script>

