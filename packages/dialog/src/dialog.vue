<template>
  <transition name="dialog-fade">
    <div 
      class="znl-dialog__wrapper" 
      v-show="visible" 
      @click.self="handleWrapperClick" 
      v-loading="loading"
      :element-loading-text="loadingText">
      <div
        class="znl-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'znl-dialog--center': center }, 'znl-dialog']"
        ref="dialog"
        :style="style">

        <div class="znl-dialog__header" :style="headerStyle" v-if="isHeaderShow">

          <slot name="title">
          </slot>

          <div class="znl-title" v-if="(title || subhead) && !$slots.title">
            <span class="header" v-if="title">{{title}}</span>
            <span class="znl-subhead" v-if="subhead">{{subhead}}</span>
          </div>

          <button
            type="button"
            class="znl-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            title="关闭"
            @click="handleClose">
            <i class="iconfont icon-close_btn"></i>
          </button>

        </div>

        <div class="znl-dialog__body" v-if="rendered" :style="bodyStyle">
          <slot name="znl-dialog" ref="Dialog"></slot>
          <slot></slot>
        </div>

        <div class="znl-dialog__footer" v-if="isFooterShow" :style="footerStyle">
          <slot name="footer"></slot>
          <div slot="footer" class="znl-dialog_footer"  v-if="!$slots.footer" :style="footerStyle">
              <span class="paramStringTips">{{paramStringTips}}</span>
              <span @click="cancel"  class="znl-dialog-button">关闭</span>
              <span @click="confirm" class="znl-dialog-button main">确认</span>
          </div>
        </div>
        

      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from '@/utils/popup';
  import Migrating from './mixins/migrating';
  import emitter from './mixins/emitter';

  export default {
    name: 'ZnlDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: [String, Number],
      height: [String, Number],

      footerHeight: {
        type: Number,
        default: 50
      },
      headerHeight: {
        type: Number,
        default: 50
      },

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      subhead: {
        type: String,
        default: ''
      },
      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      paramStringTips: {
        type: String,
        default: ''
      },

      isFooterShow: {
        type: Boolean,
        default: true
      },
      confirmCallBack: Function,
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '...'
      }
    },

    data() {
      return {
        closed: false
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          // if (this.$el.parentNode && this.$el.parentNode.querySelector('.v-modal')) {
          //   this.$el.parentNode.removeChild(this.$el.parentNode.querySelector('.v-modal'));
          // }
          if (!this.closed) this.$emit('close');
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (this.width) {
          style.width = isNaN(this.width) ? this.width : this.width + 'px'
        }
        if (this.height) {
          style.height = isNaN(this.height) ? this.height : this.height + 'px'
        }
        return style;
      },

      isHeaderShow () {
        return this.title || this.subhead || this.$slots.title
      },

      headerStyle () {
        return {
          height: this.headerHeight + 'px',
          lineHeight: this.headerHeight + 'px'
        }
      },
      footerStyle () {
        return {
          height: this.footerHeight + 'px',
          lineHeight: this.footerHeight + 'px'
        }
      },

      bodyStyle () {
        let style = {}
        let headerHeight = this.isHeaderShow ? this.headerHeight : 0
        let footerHeight = this.isFooterShow ? this.footerHeight : 0
        if(!isNaN(this.height)) {
          style.height = this.height - headerHeight - footerHeight + 'px'
        } else {
          if (this.height && this.height.substr && this.height.substr(-2) === 'px') {
            style.height = parseFloat(this.height.substr(0, this.height.length - 2)) - headerHeight - footerHeight + 'px'
          }
        }
        return style
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },

      cancel () {
        this.$emit('close');
        this.$emit('update:visible', false);
      },
      async confirm () {
        this.$emit('update:loading', true)
        let confirm = this.confirmCallBack &&　await this.confirmCallBack(this)
        if (confirm && confirm.then) {
          confirm.then(() => {
            let timeid = setTimeout(() => {
              this.$emit('update:loading', false)
              clearTimeout(timeid)
            }, 200);
          })
        } else {
          let timeid = setTimeout(() => {
            this.$emit('update:loading', false)
            clearTimeout(timeid)
          }, 200);
        }
      } 
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
