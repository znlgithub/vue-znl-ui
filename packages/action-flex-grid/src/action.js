
import {mixin as baseMixin} from 'packages/base-flex-grid/src/base'

const VERSION = '1.0.0'

const PK_COLUMN = '_PKIndex'
const PK_INDEX = '_PKRowindex'


const DIALOG_PARAMS = {
  loading: false,
  show: false,
  title: '标题',
  searchTxt: '',
  searchPlaceholder: '',
  columns: [],
  itemSource: [],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  selectedRowData: null,
  action: 'cancel',
  onPageChange: _.noop,
  onSearch: _.noop
}

// 添加行
const ADD_NEWROW = function (defaultVal = {}, isNew) {
  if (!isNew && this.isAddingNewRow()) {
    this.$message({ message: '请保存后再新增', type: 'warning' })
    return
  }
  defaultVal[PK_COLUMN] = -1
  defaultVal[PK_INDEX] = this.rowIndex++
  defaultVal.isEdit = true
  if (!isNew) {
    this.itemSourceCom.unshift(_.clone(defaultVal))
  } else {
    this.itemSourceCom.push(_.clone(defaultVal))
  }
}
// 保存行
const SAVE_ROW = function (rowData, rowIndex) {
  let items = this.gridItemSource.items.slice()
  if (!_.has(rowData, PK_COLUMN) || rowData[PK_COLUMN] === -1) rowData[PK_COLUMN] = _.max(items, item => item[PK_COLUMN])[PK_COLUMN] + 1
  let oldData = items.splice(rowIndex, 1, rowData)
  if (!oldData.length) return
  else if (oldData[0][PK_COLUMN] === -1) {
    this.cacheItemSource.push(_.clone(rowData))
  } else {
    let orginalSavingIndex = _.findIndex(this.cacheItemSource, item => item[PK_COLUMN] === oldData[0][PK_COLUMN])
    this.cacheItemSource.splice(orginalSavingIndex, 1, _.clone(rowData))
  }
  REMOVE_FROM_EDITING.call(this, this.editedRows, oldData[0])
  this.gridItemSource.sourceCollection = items
}
// 移出行
const REMOVE_ROW = function (deleteItem) {
  let items = this.gridItemSource.items.slice()
  let deletingIndex = _.findIndex(this.gridItemSource.items, deleteItem)
  if (deletingIndex > -1) {
    this.editingSelection && this.editingSelection.row === deletingIndex && (this.editingSelection = null)
    items.splice(deletingIndex, 1)
    this.gridItemSource.sourceCollection = items
  }
}
// 取消编辑
const CANCEL_EDIT = function (rowData, rowIndex) {
  let items = this.gridItemSource.items.slice()
  if (rowData[PK_COLUMN] === -1) {
    items.splice(rowIndex, 1)
  } else {
    let originalData = _.find(this.cacheItemSource, cache => cache[PK_COLUMN] === rowData[PK_COLUMN])
    originalData && items.splice(rowIndex, 1, _.clone(originalData))
  }
  this.gridItemSource.sourceCollection = items
}

// 从改变数据行中删除
const REMOVE_FROM_EDITING = function (editedItems, rowData) {
  let removeIndex = _.findIndex(editedItems, item => IS_ROWDATA_MATCHED.call(this, item, rowData))
  removeIndex > -1 && editedItems.splice(removeIndex, 1)
}

// 是否是正在编辑的行
const IS_ROWDATA_CHANGED = function (editItems, rowData) {
  return rowData && (rowData[PK_COLUMN] === -1 || _.findIndex(editItems, item => IS_ROWDATA_MATCHED.call(this, item, rowData)) > -1)
}

// 列数据是否匹配（显匹配显示列的数据值）
const IS_ROWDATA_MATCHED = function (data, rowData) {
  let columnNames = _.map(this.columns, column => column.name)
  return _.isEqual(
    _.pick(data, (value, key, object) => columnNames ? _.indexOf(columnNames, key) > -1 : true),
    _.pick(rowData, (value, key, object) => columnNames ? _.indexOf(columnNames, key) > -1 : true))
}

const PROPS = {
  showAddRowRightMenu: {
    type: Boolean,
    default: true
  },
  rightMenus: {
    type: Array,
    default () {
      return []
    }
  },
  showDeleteRowRightMenu: {
    type: Boolean,
    default: true
  },
  onBeforeAddRow: Function,
  onSaveRow: Function,
  onSaveRows: Function,
  onDeleteRow: Function,
  onDeleteCheckedRow: Function,
  onRefresh: Function,
  onSearch: Function,
  onPageChanged: Function
}

const METHODS = {

  isAddingNewRow () {
    _.each(this.itemSourceCom, item => {
    })
    return _.findIndex(this.itemSourceCom, item => item[PK_COLUMN] === -1) > -1
  },

  getSelectedRows () {
    return this.$refs.baseFlexGrid.getSelectedRows()
  },

  addRow (isNew) {
    if (this.onBeforeAddRow) {
      var beforeAddRow = this.onBeforeAddRow()
      if (!_.isUndefined(beforeAddRow) && beforeAddRow.then) {
        beforeAddRow.then(d => {
          ADD_NEWROW.call(this, d, isNew)
        })
      } else if (_.isObject(beforeAddRow)) {
        ADD_NEWROW.call(this, beforeAddRow, isNew)
      }
    } else {
      ADD_NEWROW.call(this, {}, isNew)
    }
  },

  deleteRow (rowData) {
    let deleteRow = this.onDeleteRow && this.onDeleteRow(_.clone(rowData))
    if (_.isBoolean(deleteRow) && deleteRow) {
      this.onRefresh()
    } else if (!_.isUndefined(deleteRow) && deleteRow.then) {
      deleteRow.then(d => {
        if (_.isBoolean(d) && d) {
          this.onRefresh()
        }
      })
    }
    this.editingSelection = null
    // })
  },

  deleteCheckedRows () {
    let rowsData = this.getSelectedRows()
    if (!_.isUndefined(rowsData[0]) && (rowsData.length !== 0)) {
      this.$confirm('删除确认, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteCheckedRow = this.onDeleteCheckedRow && this.onDeleteCheckedRow(_.map(rowsData, rowData => _.clone(rowData)))
        this.cancelAllChecked()
        if (_.isBoolean(deleteCheckedRow) && deleteCheckedRow) {
          this.$message.info('删除成功')
          this.onRefresh()
        } else if (!_.isUndefined(deleteCheckedRow) && deleteCheckedRow.then) {
          deleteCheckedRow.then(d => {
            if (_.isBoolean(d) && d) {
              this.$message.info('删除成功')              
              this.onRefresh()
            }
          })
        }
        this.editingSelection = null
      })
    } else {
      this.$message.error('请选择要删除的数据行')
    }
  },

  saveRow () {
    return this.onSaveRows()
  },

  getChangedData () {
    // 获取修改的数据
    let oldItemSource = this.$refs.baseFlexGrid.oldItemSource
    let items = this.$refs.baseFlexGrid.itemSourceCom
    let requestData = []
    _.each(items, (item, index) => {
      if (!_.isEqual(item, oldItemSource[index])) {
        requestData.push(_.extend({}, item))
      }
    })
    return requestData
  },

  saveRows () {
    let oldItemSource = this.$refs.baseFlexGrid.oldItemSource
    let items = this.$refs.baseFlexGrid.itemSourceCom
    // 保存时数据处理：有编辑时才会传到服务器
    let requestData = []
    _.each(items, (item, index) => {
      if (!_.isEqual(item, oldItemSource[index])) {
        requestData.push(_.extend({}, item))
      }
    })
    // 点击即可执行
    this.saveClickImmediately()
    // 请求判断执行
    if (requestData.length > 0) {
      let savedRows = {}
      if (this.onSaveRows) {
        savedRows = this.onSaveRows && this.onSaveRows(requestData)
      } else if (this.onSaveRow) {
        savedRows = this.onSaveRow && this.onSaveRow(requestData)
      }
      if (_.isBoolean(savedRows) && savedRows) {
        this.onRefresh()
        this.saveScueess()
      } else if (!_.isUndefined(savedRows) && savedRows.then) {
        savedRows.then(d => {
          if (_.isBoolean(d) && d) {
            this.saveScueess()
            this.onRefresh()
          } else {
            this.saveScueess()
            this.onRefresh()
          }
        }, e => {
        })
      }
    } else {
      return this.$message({message: '表格未做任何修改', type: 'error'})
    }
  },

  saveScueess () {
    // 保存成功后处理
    // 清楚所有多余属性
    _.each(this.$refs.baseFlexGrid.itemSourceCom, item => {
      if (_.isUndefined(item.isEdit)) {
        delete item.isEdit
      }
      if (_.isUndefined(item['ZNL_isEditInputShow'])) {
        delete item['ZNL_isEditInputShow']
      }
      if (item[PK_COLUMN]) {
        delete item[PK_COLUMN]
      }
       if (item[PK_INDEX]) {
        delete item[PK_INDEX]
      }
    })


    // 取消选中
    this.clearSelection()
    this.cancelEdit()
    this.editingSelection = null
  },

  saveClickImmediately () {
    // 点击保存立即处理
    // 选中行
     let currentRowDivs = this.$el.querySelectorAll('.current-row')
     _.each(currentRowDivs, item => {
       item.classList && item.classList.remove('current-row')
     })

  },

  cancelEdit () {
    _.each(this.itemSourceCom, item => {
      if (item && item['_PKIndex'] && (item['_PKIndex'] === -1)) {
        this.itemSourceCom.shift(item)
      }
    })
    this.itemSourceCom = JSON.parse(JSON.stringify(this.$refs.baseFlexGrid.oldItemSource))
    _.each(this.itemSource, item => {
      if (item.isEdit) {
        delete item.isEdit
      }
    })
    this.cancelAllChecked()
  },
  
  onToggleTag (tag) {
    let value = this.grid.getCellData(this.editingSelection.row, this.editingSelection.col)
    let tags = value && value.split(',')
    if (_.findIndex(tags, t => t === tag) > -1) {
      var newValue = _.reject(tags, t => t === tag)
    } else {
      newValue = _.union(tags, [tag])
    }
    this.currentTags = newValue
    this.grid.setCellData(this.editingSelection.row, this.editingSelection.col, newValue.join(','))
  }
}

let mixin = {
  props: Object.assign({}, baseMixin.props, PROPS),
  methods: Object.assign({}, baseMixin.methods, METHODS)
}


export {
  VERSION as version,
  mixin
}
