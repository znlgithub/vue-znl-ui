<template>
   <el-dialog
   custom-class="znl-dialog"
   :visible.sync="p_visible"
   ref="znlDialog"
   @open="$emit('open', true)"
   @close="$emit('close', true)" 
   :close-on-click-modal="closeOnClickModal"
   :close-on-press-escape="closeOnPressEscape"
   :show-close="showClose"
   :width="widthCom"
   :modal-append-to-body="modalAppendToBody"
   :append-to-body="appendToBody"
   >
   <!-- v-move-to.body -->
        <div class="znl-title" slot="title">{{title}}<span class="znl-subhead">{{subhead}}</span></div>

        <slot name="znl-dialog" ref="Dialog"></slot>

        <slot></slot>  

        <div slot="footer" v-if="$slots.footer">
          <slot name="footer"></slot> 
        </div>

        <div slot="footer" class="footer" v-else-if="isFooterShow">
            <span class="paramStringTips">{{paramStringTips}}</span>
            <el-button @click="cancel" class="znl-btn znl-btn-auxiliary">关闭</el-button>
            <el-button @click="confirm" class="znl-btn znl-btn-main">确认</el-button>
        </div>
  </el-dialog>
</template>
<script>
import {mixin as propSyncMixin} from '~/mixins/propSync'
import globalMixin from '~/mixins/global'
import {getDocumentRect, setStyle} from '~/utils/dom'
export default {
  name: 'ZnlDialog',
  mixins: [propSyncMixin, globalMixin],
  data () {
    return {
      widthCom: '50%'
    }
  },
  components: {
  },
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false,
      propsync: true
    },
    height: {
      type: [Number, String],
      default: '50%'
    },
    confirmCallBack: Function,
    isFooterShow: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '800px'
    },
    paramStringTips: {
      type: String,
      default: ''
    },
    subhead: {
      type: String,
      default: ''
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
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
        if (val) {
            this.$nextTick(()=>{
                this.setHeight()
            })
        }
    }
  },
  methods: {
    cancel () {
      this.p_visible = false
    },
    confirm () {
      this.confirmCallBack &&　this.confirmCallBack(this)
    },
    setHeight () {
      let headerHeight = this.title ? this.globalDomRect.dialogTitleHeight : 0
      let footerHeight = this.isFooterShow ? this.globalDomRect.dialogFooterHeight : 0
      if (this.height && this.height.substr && this.height.substr(-1) === '%') {
        let point = parseFloat(this.height.substr(0, this.height.length - 1)) / 100
        let height = point * getDocumentRect().height - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-dialog .el-dialog__body'), 'height', height)
        // console.log(height, headerHeight, footerHeight)
        return
      } else if (this.height && this.height.substr && this.height.substr(-2) === 'px') {
        let height = parseFloat(this.height.substr(0, this.height.length - 2)) - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-dialog .el-dialog__body'), 'height', height)
        return
      } else if (this.height && parseFloat(this.height)) {
        let height = parseFloat(this.height)  - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-dialog .el-dialog__body'), 'height', height)
        return
      } 
    },
    setWidth () {
      this.widthCom = this.width
      let diaLog = this.$el.querySelector('.znl-dialog')
      // let point = parseFloat(this.width.substr(0, this.width.length - 1)) / 100
      // this.widthCom = point * 100 + '%'
      // diaLog && (diaLog.style.width = this.widthCom)
      if (this.width && this.width.substr && this.width.substr(-1) === '%') {
        let point = parseFloat(this.width.substr(0, this.width.length - 1)) / 100
        this.widthCom = point * 100 + '%'
        diaLog && (diaLog.style.width = this.widthCom)
        return
      } else if (this.width && this.width.substr && this.width.substr(-2) === 'px') {
        diaLog && (diaLog.style.width = this.widthCom)
        return
      } else if (this.width && parseFloat(this.width)) {
        diaLog && (diaLog.style.width = this.widthCom + 'px')
        return
      } 
    }
  },
  mounted () {
      this.$nextTick(()=>{
          this.setHeight()
          this.setWidth()
          if (!this.title && !this.subhead) {
            this.$el.querySelector('.el-dialog__header') && (this.$el.querySelector('.el-dialog__header').style.display = 'none')
          }  
      })
  }

}
</script>


