<template>
  <div class="znl-float-list">

    <znl-collapse-transition :disable-transitions="disableTransitions">
      <div 
        class="znl-float-wrapper wj-right-menu"
        ref="mouseMenuConfig"
        tabindex="-1"
        @mouseenter.stop="mouseMenuConfig.show=true"
        @mouseleave.stop="mouseMenuConfig.show=false"
        v-show="mouseMenuConfig.show"
        :style="{left:mouseMenuConfig.left + 'px',top:mouseMenuConfig.top + 'px',
        width: mouseMenuConfig.width + 'px',
        position: 'fixed'}">
        <slot name="header"></slot>
        <ul>
          <template
            v-for="(menu, index) in listsCom"
            >
            <li :key="index" v-if="menu.isShow">
              <span class="menu-item"
                @click="(e)=>{menu.click(), mouseMenuConfig.show=false}">
                <i :class="['iconfont',menu.iconName]"></i> 
                {{menu.name}}</span>
            </li>
          </template>
        </ul>
        <slot name="footer"></slot>
      </div>
    </znl-collapse-transition>


    <!-- <bodyview v-if="destroyClear"></bodyview> -->
    <div
      ref="mouseenterSlot"
      class="znl-mouseenterSlot"
      @mouseenter.stop="Btnmouseenter($event)"
      @mouseleave.stop="mouseMenuConfig.show=false"
     >
      <slot></slot>
    </div>
  </div>
</template>
<script>

  import ZnlCollapseTransition from 'packages/transition/collapse-transition'

  export default{

    name: 'znl-float-list',

    components: {
      ZnlCollapseTransition
    },

    computed: {
      listsCom () {
        _.each(this.lists, item => {
        if (_.isUndefined(item.isShow)) {
          _.extend(item, {
            isShow: true
          })
        }
      })
        return this.lists
      }
    },

    props: {
      lists: {
        type: Array,
        default () {
          return []
        }
      },

      disableTransitions: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        destroyClear: true,
        mouseMenuConfig: {
          show: false,
          left: 0,
          top: 0
        }
      }
    },

    methods: {
      Btnmouseenter (event) {
        this.mouseMenuConfig.show = true
        this.$refs.mouseMenuConfig.focus()
        // console.log(event)
        _.find(event.path, item => {
          if (item.className === this.$refs.mouseenterSlot.className) {
            let Rect = item.getBoundingClientRect()
            this.mouseMenuConfig.left = Rect.left
            this.mouseMenuConfig.top = Rect.top + Rect.height
            this.mouseMenuConfig.width = Rect.width
            return
          }
        })
      }
    },

    beforeDestroy () {

    }
  }
</script>