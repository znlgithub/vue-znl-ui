
export default {
  name: 'HeaderContextMenu',

  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    onSaveConfig: Function,
    showShortcutColumn: {
      type: Boolean,
      default: true
    },
    isShowVisible: Boolean,
    visibleColumnsArray: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    lists () {
      let lists = []
      if (this.isShowVisible && !!this.onSaveConfig) {
        lists.push({
          name: '隐藏列',
          dataType: 'hideColumn',
          icon: 'icon-revoke_btn_ic'
        })
      }

      if (!this.isShowVisible && !!this.onSaveConfig) {
        lists.push({
          name: '显示列',
          dataType: 'showColumn',
          icon: 'icon-uploading-wh_btn_ic'
        })
      }

      if (!!this.onSaveConfig) {
        lists.push({
          name: '修改列名',
          dataType: 'changeColumn',
          icon: 'icon-table_edit_ic'
        })
      }

      lists.push({
        name: '表格设置',
        dataType: 'openseting',
        icon: 'icon-table_edit_ic'
      })

      return lists
    }
  },

  data () {
    return {
      headerContextmenuConfig: {
        show: false,
        left: 0,
        top: 0,
        column: {},
        isShowVisible: true
      }
    }
  },

  methods: {
    onContextMenuHide (e) {
      if (e.type === 'blur' || (e.type === 'keyup' && e.keyCode === 27)) {
        _.delay(() => {
          this.headerContextmenuConfig.show = false
        }, 100)
      }
    },

    headerContextmenuHandler (event) {
      let target = event.target || event.srcElement
      let column = _.find(this.columns, item => {
        return item.binding === this.headerContextmenuConfig.column.property
      })
      let saveColumn = _.find(this.visibleColumnsArray, item => {
        return item.binding === this.headerContextmenuConfig.column.property
      })
      
      if (target.dataset.type === 'hideColumn') {
        column.visible = false
        saveColumn.visible = false
        this.showVisibleColumn = false
        this.$emit('switch-hide-column', column, this.visibleColumnsArray)
      } else if (target.dataset.type === 'showColumn') {
        saveColumn.visible = true
        _.find(this.columns, (item, index) => {
          if (item.binding === column.binding) {
            this.$parent.visibleArray[index] = true
            return
          }
        })
        this.$emit('switch-hide-column', column, this.visibleColumnsArray)
      } else if (target.dataset.type === 'changeColumn') {
        this.changeColumn(column)
      } else if (target.dataset.type === 'openseting') {
        this.$emit('openseting')
      }
      this.headerContextmenuConfig.show = false
      return false
    },

    changeColumn (column) {
      this.$emit('change-column', column)
    },

    headerContextmenu (column, event) {
      event.returnValue = false
      event.stopPropagation()
      let columnCom = _.find(this.columns, item => {
        return item.binding === column.property
      })
      // if (!this.showShortcutColumn || columnCom.isSystem) return
      if (this.visibleColumnsArray.length === 0) {
        this.$parent.visibleColumnsArray = []
        let lists = []
        _.each(this.columns, column => {
          if (!column.isSystem && (_.isUndefined(column.hasRole) || column.hasRole)) {
            lists.push(JSON.parse(JSON.stringify(column)))
          }
        })
        this.$parent.visibleColumnsArray = lists
      }
      // let targetRect = event.target.getBoundingClientRect()
      let leftStep = document.body.offsetWidth - event.pageX < 85 ? event.pageX - 85 : event.pageX
      this.headerContextmenuConfig.show = true
      this.headerContextmenuConfig.left = leftStep
      this.headerContextmenuConfig.top = event.pageY
      this.headerContextmenuConfig.column = column
      this.$nextTick(() => {
        this.$el.focus && this.$el.focus()
      })
    }
  },

  render (h) {
    if (this.$parent.showShortcutColumn && this.headerContextmenuConfig.show) {
      return (
        <div 
          class = {`wj-right-menu znl-header-contextmenu ${this.headerContextmenuConfig.show ? '' : 'hide'}`}
          tabindex = "1"
          on-blur = { this.onContextMenuHide }
          on-keyup = { this.onContextMenuHide }
          on-click = { this.headerContextmenuHandler }
          style = {{left: this.headerContextmenuConfig.left + 'px',top: this.headerContextmenuConfig.top + 'px'}}
          >
            <ul>
              {
                this.lists.map(item => {
                  return (
                    <li data-type = { item.dataType }>
                      <span class = "menu-item" data-type = { item.dataType }>
                        <i class = { `iconfont ${item.icon}`}  data-type = { item.dataType }></i> 
                        {item.name}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
        </div>
      )
    } else {
      return null
    }
  }
}