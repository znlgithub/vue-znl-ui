<template>
  <znl-dialog 
    :title="title" 
    :visible.sync="p_visible" 
    :height="height" 
    :confirm-call-back="confirm" 
    :is-footer-show="isFooterShow" 
    :width="width" 
    :subhead="subhead" 
    :param-string-tips="paramStringTips" 
    :close-on-click-modal="closeOnClickModal" 
    :close-on-press-escape="closeOnPressEscape" 
    :show-close="showClose" @open="$emit('open', true)" @close="$emit('close', true)">
      <grid-module 
        slot="znl-dialog" 
        ref="flexGrid" 
        height="100%" 
        layoutType="other" 
        :columns="columns" 
        :item-source="itemSource" 
        :gridtype="gridtype" 
        :has-znl-btns="false" 
        :on-init="onInit" 
        :on-page-changed="onPageChanged" 
        :total-count="totalCount" 
        :page-size="pageSize" 
        :on-search="onSearch" 
        :is-fields-search="isFieldsSearch" 
        :page-index="pageIndex" 
        :grid-show="gridShow"
        :search-fields="searchFields"
        :is-multi-rows-check="isMultiRowsCheck" 
        @ondblclick="ondblclick" 
        @edit-end-rows="editEndRows" 
        :tooltip-content="tooltipContent"
        >
      </grid-module>
  </znl-dialog>
</template>
<script>
import { mixin as propSyncMixin } from '~/mixins/propSync'
import globalMixin from '~/mixins/global'
import { mixin as moveToMixin } from '~/directives/moveTo'
import GridModule from '~packages/grid-module/src/main.vue'
import znlDialog from '~packages/dialog/src/main.vue'
import { setStyle, getDocumentRect } from '~/utils/dom'
export default {
  name: 'znl-griddialog',

  mixins: [propSyncMixin, moveToMixin, globalMixin],

  data() {
    return {
      editRows: [],
      widthCom: '50%'
    }
  },

  components: {
    GridModule,
    znlDialog
  },

  props: {
    isFooterShow: {
      type: Boolean,
      default: true
    },
    title: String,
    visible: {
      type: Boolean,
      default: false,
      propsync: true
    },
    height: {
      type: [Number, String],
      default: '60%'
    },
    size: {
      type: String,
      default: 'small'
    },
    actionBtns: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultValue: '',
    isInit: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false,
      propsync: true
    },
    gridtype: {
      type: String,
      default: 'base',
      validator(value) {
        return _.contains(['base', 'action'], value)
      }
    },
    gridShow: {
      type: Boolean,
      default: true
    },
    header: String,
    columns: Array,
    maxHeight: String,
    minHeight: {
      type: String
    },
    frozenColumns: Number,
    itemSource: Array,
    resourceList: Array,
    isMultiRowsCheck: Boolean,
    isFieldsSearch: Boolean,
    searchFields: Object,
    pageSize: Number,
    pageIndex: Number,
    totalCount: Number,
    rightMenus: Array,
    showAddRowRightMenu: {
      type: Boolean,
      default: true
    },
    showDeleteRowRightMenu: {
      type: Boolean,
      default: true
    },
    onInit: Function,
    onRefresh: Function,
    onSearch: Function,
    onBeforeAddRow: Function,
    onSaveRow: Function,
    onDeleteRow: Function,
    onDeleteCheckedRows: Function,
    onPageChanged: Function,
    onSaveSetting: Function,
    onResetSetting: Function,
    hasZnlActions: {
      type: Boolean,
      default: false
    },
    hasZnlBtns: {
      type: Boolean,
      default: true
    },
    checkboxBindingKey: {
      type: String,
      default: ''
    },
    searchTodayDate: {
      type: Boolean,
      default: false
    },
    initData: {
      type: Boolean,
      default: true
    },
    gridShow: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '50%'
    },
    tooltipContent: {
      type: String,
      default: ''
    },
    subhead: {
      type: String,
      default: ''
    },
    paramStringTips: {
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
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.setHeight()
        })
      }
    }
  },

  methods: {
    confirm() {
      if (this.gridtype === 'base') {
        this.$emit('confirm', this.$refs.flexGrid.getSelectedRows())
      } else {
        this.$emit('confirm', this.editRows)
      }
      this.p_visible = false
    },
    cancel() {
      this.p_visible = false
    },
    toggleRowSelection() {
      return this.$refs.flexGrid.toggleRowSelection
    },
    editEndRows(rows) {
      this.editRows = rows
    },
    ondblclick() {
      if (this.gridtype === 'base') {
        this.$emit('confirm', this.$refs.flexGrid.getSelectedRows())
        // console.log('22222')
        this.p_visible = false
      }
    },
    setHeight() {
      let headerHeight = this.hasZnlBtns ? this.globalDomRect.tabHeaderHeight : 0
      let footerHeight = this.onPageChanged && this.totalCount >= 0 && this.pageIndex >= 0 ? this.globalDomRect.footerHeight : 0
      // let headerHeight = this.$el.querySelector('.znl-dialog .el-dialog__header') ? this.$el.querySelector('.znl-dialog .el-dialog__header').offsetHeight : 0
      // let footerHeight = this.$el.querySelector('.znl-dialog .el-dialog__footer')? this.$el.querySelector('.znl-dialog .el-dialog__footer').offsetHeight : 0
      if (this.height && this.height.substr && this.height.substr(-1) === '%') {
        let point = parseFloat(this.height.substr(0, this.height.length - 1)) / 100
        let height = point * getDocumentRect().height - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-griddialog .el-dialog__body'), 'height', height)
        return
      } else if (this.height && this.height.substr && this.height.substr(-2) === 'px') {
        let height = parseFloat(this.height.substr(0, this.height.length - 2)) - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-griddialog .el-dialog__body'), 'height', height)
        return
      } else if (this.height && parseFloat(this.height)) {
        let height = parseFloat(this.height) - headerHeight - footerHeight + 'px'
        setStyle(this.$el.querySelector('.znl-griddialog .el-dialog__body'), 'height', height)
        return
      }
    },
    setWidth() {
      this.widthCom = this.width
      let diaLog = this.$el.querySelector('.znl-griddialog')
      let point = parseFloat(this.width.substr(0, this.width.length - 1)) / 100
      this.widthCom = point * 100 + '%'
      diaLog && (diaLog.style.width = this.widthCom)
    },
    close() {
      this.$emit('close', true)
      this.p_visible = false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setHeight()
      this.setWidth()
    })
  }
}
</script>


