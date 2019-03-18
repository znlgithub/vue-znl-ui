<template>

  <div 
    class="znl-layout-multiple" 
    :style="multiplesStyle"
    >
      <div 
        class="znl-layout-multiple_config" 
        :style="configButtonStyle">
        <i 
          class="iconfont"
          :class="[draging ? 'font' : 'icon-float_drag_ic']"
          :title="'模块拖动'" 
          @click.stop="changeState">
          {{draging ? '保存' : ''}}
        </i>
        <i 
          class="iconfont icon-float_edit_ic"
          title="修改页面配置" 
          @click.stop="changeConfig">
        </i>
      </div>

      <config-dialog
        :visible.sync="configDialogShow"
        :menus="layoutConfig"
        :on-save-config="onSaveConfig"
        :on-reset-setting="onResetSetting"
        @page-change="(visible, obj, index)=>$emit('page-change', visible, obj, index)"
      >
      </config-dialog>

      <div ref="multipleScroll" class="znl-layout-multiple_scroll" @scroll="multiplesScrollHandler">
        <slot></slot>
      </div>



  </div>

</template>

<script>
import { getScrollWidth } from '~/utils/dom'
import configDialog from './ConfigDialog.vue'
export default {
  name: 'ZnlLayoutMultiple',

  props: {
    space: {
      type: [Number],
      default: 5
    },

    height: {
      type: [Number, String],
      default: 'auto'
    },
    onSaveConfig: Function,
    onResetSetting: Function,
    layoutConfig: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    configDialog
  },

  computed: {
    multiplesStyle () {
      let style = {}
      style.height = _.isNumber(this.height) ? this.height + 'px' : this.height
      return style
    },

    configButtonStyle () {
      let style = {}
       style.opacity = this.opacity
       return style
    }
  },

  data () {
    return {
      menus: [],
      fixedIndex: null,
      scrollWidth: 0,
      configDialogShow: false,
      opacity: 1,
      draging: false
    }
  },

  watch: {

    menus (val) {
      let space = this.space

      this.layouts = []

      _.each(val, (item, index) => {
        if (_.isUndefined(item)) {
          return this.menus.splice(index,1)
        }
        item.space = space
      })

      _.each(val, (item, index) => {
        if (!!item.fixed) {
          this.fixedIndex = index
        }
      })
    },

    layoutConfig: {
      handler() {
       this.synchronizationConfig()
      },
      deep: true
    },

    draging (val) {
      _.each(this.menus, menu => {
        menu.setDragState(val)
      })
    }

  },

  methods: {
    changeConfig () {
      this.configDialogShow = true
    },

    changeState () {
      this.draging = !this.draging
      this.$emit('draging-change', this.draging)
    },

    multiplesScrollHandler (e) {
      this.scrollHandler(e)
      if (!this.scrollWidth) {
        this.scrollWidth = getScrollWidth()
      }
    },

    appointBackTo (top = 0) {
      this.$refs.multipleScroll.scrollTop = top
    },

    getCurrentStyle (node) {
        var style = null;
        if(window.getComputedStyle) {
            style = window.getComputedStyle(node, null);
            //chrome、firefox、ie9(含)+
        }else{
            style = node.currentStyle;
            //ie7、ie8
        }    
        return style;
    },

    scrollHandler (e) {
      // if (this.$refs.multipleScroll.scrollTop > 100 ) {
      //   this.opacity = 0
      // } else {
      //   this.opacity = 1
      // }

      let menusIndex = this.menus[this.fixedIndex]
      let menusNext = this.menus[this.fixedIndex + 1]
      if (!menusIndex || !menusNext) return;
      let fixDom =  menusIndex.$el
      let nextDom =  menusNext.$el

      if (
        _.isNull(this.fixedIndex) 
        || !this.menus[this.fixedIndex].visible 
        || !nextDom.getBoundingClientRect 
        || !this.$el.getBoundingClientRect) return;

      let offsetTopSelf = this.$el.getBoundingClientRect().top
      let offsetTopNext = nextDom.getBoundingClientRect().top
      let offsetTopWidth = this.$el.offsetWidth

      let offsetTopPaddingLeft = parseFloat(this.getCurrentStyle(this.$refs.multipleScroll).paddingLeft.substr(0, this.getCurrentStyle(this.$refs.multipleScroll).paddingLeft.length - 2))
      let offsetTopPaddingRight = parseFloat(this.getCurrentStyle(this.$refs.multipleScroll).paddingRight.substr(0, this.getCurrentStyle(this.$refs.multipleScroll).paddingRight.length - 2))

      if(!menusIndex.$el.getBoundingClientRect) return;

      let offsetTopFixed = menusIndex.$el.getBoundingClientRect().top
      let offsetHeightFixed = menusIndex.$el.getBoundingClientRect().height

      if (offsetTopSelf > offsetTopFixed) {
        // 本身滚动top > 固定元素滚动top
        fixDom.style.position = 'fixed'
        fixDom.style.top = offsetTopSelf + 'px'
        fixDom.style.zIndex = '10'
        fixDom.style.boxSizing = 'border-box'
        fixDom.style.width = offsetTopWidth - this.scrollWidth - offsetTopPaddingLeft - offsetTopPaddingRight + 'px'
        nextDom.style.marginTop = offsetHeightFixed + this.space + 5 + 'px'

        _.each(this.menus, (item, index) => {
          if (index < this.fixedIndex) {
            item.isShow = false
          }
        })
      } else if (offsetTopNext >= (offsetTopFixed + offsetHeightFixed)) {
        // 固定元素的下一个兄弟元素的滚动top  >=  固定元素的滚动top+固定元素的高度
        fixDom.style.position = 'relative'
        fixDom.style.top = 0 + 'px'
        fixDom.style.width = '100%'
        nextDom.style.marginTop = '0px'

        _.each(this.menus, (item, index) => {
          if (index < this.fixedIndex) {
            item.isShow = true
          }
        })
      }
    },

     sortByIndex () {
        this.$nextTick(() => {
          let new_list = this.$refs.multipleScroll
          let new_list_child = new_list.children
          // new_list_child = Array.prototype.slice.call(new_list_child).sort(function(a,b){
          // 　　return Number(a.dataset.index) - Number(b.dataset.index) > 0
          // })
          let unLists = _.sortBy(Array.prototype.slice.call(new_list_child), (a) => {
            return Number(a.dataset.index)
          })
          unLists.forEach(function(el){
          　　new_list.appendChild(el);
          })
        })
      },

    synchronizationConfig () {
      if (this.layoutConfig.length <= 0) return
      this.$nextTick(() => {
        _.each(this.layoutConfig, (item, index) => {
          _.find(this.menus, data => {
            if (item.name === data.name) {
              data.setData({
                visible: item.visible,
                title: item.title,
                hasRight: item.hasRight,
                index: item.index,
                allowDrag: item.allowDrag
              })
              return data
            }
          })
        })
        this.sortByIndex()
      })
    }
  },

  mounted () {
    this.synchronizationConfig()
  }
}
</script>



