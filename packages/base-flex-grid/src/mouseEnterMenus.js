export default {
  name: 'MouseEnterMenus',

  props: {
    btnMouseEnterMenus: {
      type: Object,
      default: () => {
        return {
          List: [],
          Binding: ''
        }
      }
    }
  },

  data () {
    return {
      mouseMenuConfig: {
        show: false,
        left: 0,
        top: 0
      },
      mouseLeaveTimeId: null,
      mouseEnterRow: {}
    }
  },

  computed: {
    gridBtnMouseMenus () {
      const defaultMenus = []
      return _.sortBy(_.union(defaultMenus, this.btnMouseEnterMenus.List), 'index')
    }
  },

  watch: {
    mouseMenuConfig:{
      handler (value) {
        if (!value.show) {
          this.removeHoveClass()
        }
      },
      deep: true
    } 
  },

  methods: {
    mouseleaveBtnlists (type) {
      if (type) {
        clearTimeout(this.mouseLeaveTimeId)
        this.mouseMenuConfig.show = true
      } else {
        this.mouseLeaveTimeId = setTimeout(() => {
          this.mouseMenuConfig.show = false
          clearTimeout(this.mouseLeaveTimeId)
        }, 300);
      }
      return false
    },

    onContextMenuHide (e) {
      if (e.type === 'blur' || (e.type === 'keyup' && e.keyCode === 27)) {
        _.delay(() => {
          this.mouseMenuConfig.show = false
        }, 100)
      }
    },

    removeHoveClass () {
      let oldHoverRows = this.$parent.$el.querySelectorAll('.znl-hover-row')
      _.each(oldHoverRows, item => {
        item.classList.remove('znl-hover-row')
      })
    },

    addHoveClass (row) {
      let hoverRow = this.$parent.$el.querySelectorAll('.el-table__row')[_.indexOf(this.$parent.itemSourceCom, row)]
      hoverRow.classList.add('znl-hover-row')
    },

    Btnmouseenter (event, row, column) {
      if (column.binding !== this.btnMouseEnterMenus.Binding) return
      clearTimeout(this.mouseLeaveTimeId)
      let targetRect = event.target.getBoundingClientRect()
      this.mouseEnterRow = row
      this.mouseMenuConfig.show = true
      this.mouseMenuConfig.left = targetRect.left + targetRect.width - 5
      this.mouseMenuConfig.top = targetRect.top + targetRect.height / 2
      this.$emit('mouse-menu-config', {
        top: this.mouseMenuConfig.top,
        left: this.mouseMenuConfig.left
      })
      
      this.$nextTick(() => {
        this.$el.focus()
      })

      if (this.$parent.$el.querySelectorAll('.el-table__row')) {
        this.removeHoveClass()
        this.addHoveClass(row)
      }

    }
  },

  render (h) {
    if (this.btnMouseEnterMenus.List.length > 0 && this.mouseMenuConfig.show) {
      return (
        <div 
          class = { `wj-right-menu znl-btnMouseEnterMenus ${this.mouseMenuConfig.show ? '' : 'hide'}` }
          tabindex = "-1"
          on-mouseenter = { e => this.mouseleaveBtnlists(true) }
          on-mouseleave = { e => this.mouseleaveBtnlists(false) }
          on-blur = { this.onContextMenuHide }
          on-keyup = { this.onContextMenuHide }
          style = {{left: this.mouseMenuConfig.left + 'px',top: this.mouseMenuConfig.top + 'px'}}
          >
  
            <ul>
              {
                this.gridBtnMouseMenus.map((menu, index) => {
                  if (typeof menu.isShow === 'undefined' ? true : menu.isShow) {
                    return (
                      <li key = {index}>

                        <span 
                          class = "menu-item"
                          on-click = { (e) => {menu.click && menu.click(this.mouseEnterRow), this.mouseMenuConfig.show = false} }
                          on-mouseenter = { e => {menu.mouseenter && menu.mouseenter(this.mouseMenuConfig)} }>
                          <i class = {`iconfont ${menu.iconName}`}></i> 
                          { menu.name }
                        </span>

                      </li>
                    )
                  } else {
                    return null
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