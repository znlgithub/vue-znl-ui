import { getDocumentRect} from '~/utils/dom'
import copy from 'clipboard-copy'
export default {
  name: 'rightMenu',

  data () {
    return {
      rightMenuConfig: {
        show: false,
        left: 0,
        top: 0
      }
    }
  },

  computed: {
    gridRightMenus () {
      const defaultMenus = [{
        iconName: 'icon-copy_btn_ic',
        text: '复制',
        disabled: false,
        display: true,
        index: -4,
        click: (data) => {
          copy(data.cell)
        }
      }, {
        iconName: 'icon-copy_btn_ic',
        text: '复制行',
        disabled: false,
        display: true,
        index: -3,
        click: (data) => {
          copy(data.rowText)
        }
      }, {
        iconName: 'icon-refresh_btn_ic',
        text: '刷新',
        disabled: false,
        display: !!this.onRefresh,
        index: -2,
        click: (rowData, grid) => {
          this.onRefresh()
        }
      }]
      _.reject(this.rightMenus, menu => !this.contextMenuDisplay(menu.display)).length &&
        this.rightMenus[0].type !== 'separator' &&
        this.rightMenus.unshift({
          type: 'separator',
          index: -1
        })
      return _.sortBy(_.union(defaultMenus, this.rightMenus), 'index')
    }
  },

  props: {
    onRefresh: Function,
    rightMenus: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  methods: {
    contextMenuDisabled (disabled = true) { // 右击判断
      if (_.isBoolean(disabled)) {
        return disabled
      } else {
        return false
      }
      return true
    },

    contextMenuDisplay (display = true) {
      if (_.isBoolean(display)) {
        return display
      } else {
        return false
      }
      return true
    },

    contextMenuClick (e, method) {
      _.isFunction(method) && method(this.clickCellData)
      _.delay(() => {
        this.rightMenuConfig.show = false
      }, 100)
      // return false
    },

    rowContextmenu (row, e) { // 右击事件
      // 阻止右键默认行为
      e.returnValue = false
      let pathName = []
      _.each(e.path, item => {
        pathName.push(item.className)
      })
      let isStorage = _.contains(pathName, 'storageList')
      this.rightMenuConfig.show = true
      this.$nextTick(() => {
        this.$el.focus()
      })
      if (_.contains(pathName, 'storageList')) {
        this.rightMenuConfig.left = e.screenX - 625
        this.rightMenuConfig.top = e.screenY - 190
      } else {
         let { document, menuHeight, menuWidth } = {
            document: getDocumentRect(),
            menuHeight: this.$el.offsetHeight || (this.gridtype==='action' ? 200 : 130),
            menuWidth: this.$el.offsetWidth || 130
          }
         if (event.pageY + menuHeight + 20> document.height) {
            this.$set(this.rightMenuConfig, 'top', e.pageY - menuHeight)
          } else {
            this.$set(this.rightMenuConfig, 'top', e.pageY)
          }
          if (event.pageX + menuWidth > document.width) {
            this.$set(this.rightMenuConfig, 'left', e.pageX - menuWidth)
          } else {
            this.$set(this.rightMenuConfig, 'left', e.pageX)
          }
      }
      let rowText = ''
      _.each(this.columns, column => {
        if (column.visible && !_.isUndefined(row[column.binding])) {
          rowText += (' ' + row[column.binding])
        }
      })
      let com = {}
      let rightItem = _.each(_.keys(row), key => {
        com[key] = row[key]
      })
      let rightRow = com
      this.clickCellData = {
        cell: e.target.innerText,
        rowText: rowText,
        row: rightRow
      }
    },

    onContextMenuHide (e) {
      if (e.type === 'blur' || (e.type === 'keyup' && e.keyCode === 27)) {
        _.delay(() => {
          this.rightMenuConfig.show = false
        }, 200)
      }
    }
  },

  render (h) {
    if (this.rightMenuConfig.show) {

      return (
          <div 
            class = "wj-right-menu"
            ref = "contextMenu"
            on-blur = { this.onContextMenuHide }
            on-keyup = { this.onContextMenuHide }
            tabindex = '1'
            style = { {
              left: this.rightMenuConfig.left + 'px',
              top: this.rightMenuConfig.top + 'px'} }
            >
    
            <ul>
              {
                this.gridRightMenus.map((item, index) => {
                  if (item.type === 'separator') {
                    return (
                      <li 
                        key = { index }
                        class = "divider">
                      </li>
                    )
                  } else if (!this.contextMenuDisabled(item.display)) {
                    return (
                      <li 
                        key = { index } 
                        class = { !this.contextMenuDisabled(item.display) ? 'display' : '' }
                        on-click = { e => {this.contextMenuClick(e, !this.contextMenuDisabled(item.display) ? '' : item.click)} }>
                        <span >
                          <i class = {`iconfont ${item.iconName}`}></i> 
                          { item.text }
                        </span>
                      </li>
                    )
                  } else {
                    return (
                      <li  key = { index } on-click = { e => {this.contextMenuClick(e, item.click)} }>
                        <a 
                          href="#"
                        >
                          <i class={ `iconfont ${item.iconName}`}></i> 
                          {item.text}
                        </a>
                      </li>
                    )
                  }
    
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