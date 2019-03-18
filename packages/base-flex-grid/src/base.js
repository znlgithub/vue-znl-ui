import Vue from 'vue'
import { DatePicker, Select, Option } from 'element-ui'
import { mixin as propSyncMixin } from '~/mixins/propSync'

const VERSION = '1.0.0'

const PROPS = {
  columns: {
    type: Array,
    default: function () {
      return []
    },
    required: true
  },
  minHeight: {
    type: Number,
    validator (val) {
      return val >= 0
    }
  },
  itemSource: {
    type: [Array, Object],
    default () {
      return []
    }
  },
  isMultiRowsCheck: {
    type: Boolean,
    default: false
  },
  isFieldsSearch: {
    type: Boolean,
    default: false
  },
  searchFields: {
    type: Object,
    default () {
      return {}
    }
  },
  pageSize: {
    type: Number,
    default: 20,
    validator (val) {
      return val > 0
    }
  },
  pageIndex: {
    type: Number,
    default: 1,
    validator (val) {
      return val > 0
    }
  },
  totalCount: {
    type: Number,
    default: 0,
    validator (val) {
      return val >= 0
    }
  },
  rightMenus: {
    type: Array,
    default: () => {
      return []
    }
  },
  btnMouseEnterMenus: {
    type: Object,
    default: () => {
      return {
        List: [],
        Binding: ''
      }
    }
  },
  onRefresh: Function,
  onSearch: Function,
  onPageChanged: Function
}

const METHODS = {

  getSelectedRows () {
    this.checkedRows = this.checkedRows
    return this.checkedRows.length !== 0 ? this.checkedRows : (_.isNull(this.currentRow) ? [] : [this.currentRow])
  }
  
}

const mixin = {
  props: PROPS,
  methods: METHODS
}

export {
  VERSION as version,
  mixin
}
