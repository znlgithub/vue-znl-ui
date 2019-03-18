<template>
  <div class="actionBtns">

    <el-tooltip 
      effect="light" 
      :visible-arrow="true" 
      placement="top" 
      :open-delay="300" 
      :hide-after="3000" 
      v-for="(btn, index) in actionBtnsCom" 
      :popper-class="tipShowHide(btn)" 
      :content="btn.tip?btn.tip:''" 
      :key="index">
      <el-button v-show="btn.isShow && btn.hasBtn" size="mini" type="default" @click="btn.click" class="znl-components-btn">
        <i :class="['znl-icon', 'iconfont', btn.iconName ? btn.iconName : '']" v-if="btn.iconName"></i>
        {{btn.name}}
      </el-button>
    </el-tooltip>

    <span class="znl-line" v-if="isDropdownShow"></span>
    
    <el-dropdown @command="handleCommand" v-if="isDropdownShow">
      <div>
        <el-button type="default" class="form-group znl-morebtn znl-components-btn" size="mini">
          <span class="ver znl-btn-more">更多</span>
          </i>
        </el-button>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(btn, index) in actionBtnsCom" :key="index" v-show="(btn.isShow && !btn.hasBtn)" :command="index">
          <i :class="['znl-icon','iconfont', btn.iconName ? btn.iconName : '']" v-if="btn.iconName"></i>{{btn.name}}
        </el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>
<script>
import { elResize } from '~/utils/dom'
export default {
  name: 'znl-action-btns',

  data() {
    return {
      isDropdownShow: false,
      isFieldsSearchWidth: 0,
      rightbtnsWidth: 0,
      znlHeaderTextWidth: 0,
      actionBtnsWidth: 0,
      remainWidth: 0
    }
  },

  props: {
    actionBtnsCom: {
      type: Array,
      default: () => {
        return []
      }
    },
    elWidth: 0
  },

  watch: {
    actionBtnsCom() {
      this.btnsWidthCompute()
    }
  },
  methods: {
    btnsWidthCompute() { // 按钮组宽度计算
      // 大于5已更多显示
      if (this.elWidth < 1000) {
        _.each(this.actionBtnsCom, (btn, index) => {
          if (index < 6) {
            this.$set(btn, 'hasBtn', true)
          } else {
            this.$set(btn, 'hasBtn', false)
            this.isDropdownShow = true
          }
        })
      } else {
        _.each(this.actionBtnsCom, (btn, index) => {
          if (index < 8) {
            this.$set(btn, 'hasBtn', true)
          } else {
            this.$set(btn, 'hasBtn', false)
            this.isDropdownShow = true
          }
        })
      }
    },
    isShowCom() {
      let hideNum = 0
      _.each(this.actionBtnsCom, item => {
        if (!item.hasBtn) {
          hideNum++
        }
      })
      if (hideNum > 0) {
        this.isDropdownShow = true
      } else {
        this.isDropdownShow = false
      }
    },
    handleCommand(command) {
      this.actionBtnsCom[command].click()
    },
    tipShowHide(btn) {
      return btn.tip ? '' : 'znl-tip-hide'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.btnsWidthCompute()
    })
    elResize.on(document.body, this.btnsWidthCompute)
  },
  destroyed () {
    elResize.off(document.body, this.btnsWidthCompute)
  }
}
</script>


