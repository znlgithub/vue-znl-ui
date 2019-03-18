<style>
.button-test{
  padding: 3px;
}
.znl-header-pagination .el-pagination__jump{
  top: -2px;
  .el-input .el-input__inner{
    right: -18px;
  }
}
.znl-dialog-mini li{
  list-style: none;
  padding: 3px 10px;
  &:hover{
    background-color: #ee7700;
  }
}
.znl-red{
  .znl-tablecell{
    color: red;
  }
}
</style>
<script>
  export default {
    data() {
      let __this = this
      return {
        columns: [],
        itemSource: [],
        columns1: [],
        itemSource1: [],
        options: {},
        dialogMiniVisible: false,
        btnMouseEnterMenus: {
          List: [
            {
              name: '增加',
              click () {
                __this.dialogMiniVisible = true
                console.log(123)
              },
              mouseenter (config) {
                console.log(config)
              }
            },
            {
              name: '设置1',
              isShow: false
            },
            {
              name: '设置2',
            },
             {
              name: '设置3'
            }
          ],
          Binding: 'Year'
        },
        rightMenus: [
          {
            text: '测试',
            iconName: 'icon-table_set_btn_n',
            disabled: false,
            display: true,
            click: (row) => {
              console.log(row)
            }
          }
        ]
      };
    },

    methods: {
      clickHandler1() {
        console.log(this.$refs.edittable.searchModle)
      },
      onSearch (value) {
        console.log(123, value)
      },
      getChangedData () {
        console.log(this.$refs.edittable.getChangedData())
      },
      selectChange (rows) {
        console.log(rows)
      },
      clickHandler () {
        console.log(123)
        this.$set(this.btnMouseEnterMenus, 'List', [
          {
            name: '增加',
            click () {
              this.dialogMiniVisible = true
            }
          }
        ])
        _.each(this.columns1, col => {
          col.isReadOnly = true
          this.$set(col, 'isReadOnly', true)
        })
        this.$refs.flexGrid.reFMHeight()
        console.log(this.columns1)
      },
      shortcutColumnHandler () {
        console.log(123)
      },
      mouseMenuConfig (config) {
        this.options = config
      },
      async onInit () {
        this.columns = [
          {
            binding: 'HolidayModel',
            name: 'HolidayModel',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            sort: 0
          },
          {
            binding: 'ID',
            name: 'ID',
            header: 'ID',
            visible: false,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: true,
            sort: 1
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
            width: 200,
            isReadOnly: true,
            isFieldSearch: true,
            isSystem: false,
            sort: 2,
            renderHeader: (h, column) => {
              return h('span', [
                column.header,
                h('i', {
                  attrs: {
                    class: 'iconfont icon-share_btn'
                  }
                })
              ])
            },
            customFilter: (val, col, row) => {
              return val
            }
          },
          {
            binding: 'AdoptQty',
            name: 'AdoptQty',
            header: '采纳数量',
            visible: true,
            dataType: 2,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            sort: 3,
            // extraConfig: {
            //   cellColors: [
            //     {
            //       expression: "\"{AdoptQty}\"!==\" \"",
            //       params: "",
            //       color: "#FF0000",
            //       operator: "unEqual"
            //     }
            //   ]
            // }
          },
          {
            binding: 'ProductCategory',
            name: 'ProductCategory',
            header: '产品类型',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            sort: 4,
            dataMap: [{ key: 1, value: '可用' }, { key: 2, value: '禁用' }],
            showDropDown: true,
          },
          {
            binding: 'StorageName',
            name: 'StorageName',
            header: '位置',
            visible: false,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            sort: 5
          },
           {
            binding: 'age',
            name: 'age',
            header: '年龄',
            visible: false,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: true,
            hasRole: false,
            sort: 6
          }
        ]
        this.itemSource = [
          {
            HolidayModel: 'LM358ff',
            Year: '2015-05-01',
            AdoptQty: '',
            ProductCategory: '',
            StorageName: '深圳北',
            ID: 1,
            age: 123
          },
          {
            HolidayModel: 'ASTgg',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '',
            StorageName: '北京',
            ID: 2,
            age: 123,
            ReadOnlyBindings: ['AdoptQty']
          },
          {
            HolidayModel: 'LM357hh',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: 1,
            StorageName: '上海',
            ID: 3,
            age: 123
          },
          {
            HolidayModel: 'LM356jj',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: 2,
            StorageName: '广州',
            ID: 4,
            age: 123
          },
          {
            HolidayModel: 'LM359kk',
            Year: '2018-05-01',
            AdoptQty: 500,
            ProductCategory: 1,
            StorageName: '深圳北',
            ID: 5,
            age: 123
          }
        ]
        this.columns1 = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
            width: 200,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'AdoptQty',
            name: 'AdoptQty',
            header: '采纳数量',
            visible: true,
            dataType: 2,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'ProductCategory',
            name: 'ProductCategory',
            header: '产品类型',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'StorageName',
            name: 'StorageName',
            header: '位置',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          }
        ]
        this.itemSource1 = [
          {
            Model: 'LM358aa',
            Year: '2015-05-01',
            AdoptQty: 100,
            ProductCategory: '原装',
            StorageName: '深圳北24552454254245254245242345345345354adgfadfgadfgad'
          },
          {
            Model: 'ASTbb',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '现货',
            StorageName: '北京'
          },
          {
            Model: 'LM357cc',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: '原装',
            StorageName: '上海'
          },
          {
            Model: 'LM356ee',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: '现货',
            StorageName: '广州'
          },
          {
            Model: 'LM359ff',
            Year: '2018-05-01',
            AdoptQty: 500,
            ProductCategory: '原装',
            StorageName: '深圳北'
          }
        ]

        _.each(this.columns1, column => {
          if (column.binding === 'Model') {
            let __this = this
            column.renderCell = (h, obj) => {
              return h ('div', {

                attrs: {
                  class: 'znl-table-btn',
                },

                domProps: {
                  innerHTML: obj.row[obj.column.binding]
                },

                on: {
                  // mouseenter (e) {
                  //   __this.dialogMiniVisible = true
                  //   let option = e.srcElement.getBoundingClientRect()
                  //   __this.options = {
                  //     left: option.left + obj.column.width / 2,
                  //     top: option.top + 14
                  //   }
                  // }
                }
              })
            }
          }
          if (column.binding === 'Year') {
            column.buttons = [
              {
                content: (row) => {return row.Model},
                className: 'button-test'
              }
            ]
          }
        })

      },

      async onRefresh () {
        console.log(123)
      },
      onSaveSetting () {
        console.log(123)
      },
      onPageChanged (index) {
        if (index === 1) {
          this.itemSource = [
            {
              Model: 'LM358ff',
              Year: '2015-05-01',
              AdoptQty: 100,
              ProductCategory: '原装',
              StorageName: '深圳北',
              ID: 1,
              age: 123
            },
            {
              Model: 'ASTgg',
              Year: '2014-05-04',
              AdoptQty: 200,
              ProductCategory: '现货',
              StorageName: '北京',
              ID: 2,
              age: 123
            },
            {
              Model: 'LM357hh',
              Year: '2016-05-01',
              AdoptQty: 300,
              ProductCategory: '原装',
              StorageName: '上海',
              ID: 3,
              age: 123
            },
            {
              Model: 'LM356jj',
              Year: '2017-05-04',
              AdoptQty: 400,
              ProductCategory: '现货',
              StorageName: '广州',
              ID: 4,
              age: 123
            },
            {
              Model: 'LM359kk',
              Year: '2018-05-01',
              AdoptQty: 500,
              ProductCategory: '原装',
              StorageName: '深圳北',
              ID: 5,
              age: 123
            }
          ]
        }
        if (index === 2) {
          this.itemSource = [
            {
              Model: 'LM358ff',
              Year: '2015-05-01',
              AdoptQty: 100,
              ProductCategory: '原装',
              StorageName: '深圳北',
              ID: 10,
              age: 123
            },
            {
              Model: 'ASTgg',
              Year: '2014-05-04',
              AdoptQty: 200,
              ProductCategory: '现货',
              StorageName: '北京',
              ID: 20,
              age: 123
            },
            {
              Model: 'LM357hh',
              Year: '2016-05-01',
              AdoptQty: 300,
              ProductCategory: '原装',
              StorageName: '上海',
              ID: 30,
              age: 123
            },
            {
              Model: 'LM356jj',
              Year: '2017-05-04',
              AdoptQty: 400,
              ProductCategory: '现货',
              StorageName: '广州',
              ID: 40,
              age: 123
            },
            {
              Model: 'LM359kk',
              Year: '2018-05-01',
              AdoptQty: 500,
              ProductCategory: '原装',
              StorageName: '深圳北',
              ID: 50,
              age: 123
            }
          ]
        }
      },
      shortcutColumnSwitch (val, cols) {
        console.log(123, val, cols)
      },
      switchHideColumn (col, cols) {
        console.log(222, col, cols)
      },

      onSaveRow () {
        console.log(123)
        this.$message({ message: '操作失败，该操作需要快捷版软件协助', type: 'error' })
      },

      changeColumn (column) {
        console.log(123, column)
      },

      async onSaveConfig () {
        console.log(123)
      },

      tableRowClassName (obj) {
        if (obj.row.AdoptQty > 200) {
          return 'znl-red'
        } else {
          return ''
        }
      },

      cellClick(row, column, cell, event) {
        // console.log(row, column, cell, event)
      },

      changeCurrentCell() {
        this.itemSource.map(item => {
          item.Model = '222'
        })
        // this.itemSource.unshift({DisplayEdit: true})
        // this.$refs.znltablebase.changeCurrentCell(this.itemSource[1], this.columns[3])
      },

      currentRowChange(row) {
        // console.log(row, 222)
      }

    },

    watch: {

    }
  };
</script>

## Table 表格

用于展示多条结构类似的数据。

### 基础表格

基础的表格数据展示用法。

:::demo 需要传入表格的列配置`columns`，及表格的数据`item-source`，我们规定这两个数据在初始化方法中赋值，`on-init`方法会在组件内部自动执行，如果不想自动组件执行`on-init`方法，只需传`is-init`属性为`false`即可。
```html
<znl-gridmodule
  :on-init="onInit"
  :columns="columns"
  :item-source="itemSource"
  :on-refresh="onRefresh"
  :show-header="false"
  :on-save-setting="null"
  @cell-click="cellClick"
  :on-save-config="onSaveConfig"
  ref="znltablebase"
  gridtype="action"
  @current-row-change="currentRowChange"
  >
  <!-- <znl-griddialog
  :on-init="onInit"
  :columns="columns"
  :item-source="itemSource"
  :is-fields-search="true"
  :search-fields="{Year: '00'}"
  :visible="true">

  </znl-griddialog> -->
  <znl-button @click="changeCurrentCell">changeCurrentCell</znl-button>
</znl-gridmodule>
<script>
  export default {
    data() {
      return {
        columns: [],
        itemSource: []
      };
    },

    methods: {
      async onInit () {
        this.columns = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
            width: 200,
            isReadOnly: true,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'AdoptQty ',
            name: 'AdoptQty ',
            header: '采纳数量',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            dataMap: [{ key: 1, value: '可用' }, { key: 2, value: '禁用' }],
            showDropDown: true,
            isSystem: false
          },
          {
            binding: 'ProductCategory ',
            name: 'ProductCategory ',
            header: '产品类型',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'StorageName ',
            name: 'StorageName ',
            header: '位置',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          }
        ]
        this.itemSource = [
          {
            Model: 'LM358',
            Year: '2015-05-01',
            AdoptQty: 1,
            ProductCategory: '原装',
            StorageName: '深圳北'
          },
          {
            Model: 'AST',
            Year: '2014-05-04',
            AdoptQty: 2,
            ProductCategory: '现货',
            StorageName: '北京'
          },
          {
            Model: 'LM357',
            Year: '2016-05-01',
            AdoptQty: 1,
            ProductCategory: '原装',
            StorageName: '上海'
          },
          {
            Model: 'LM356',
            Year: '2017-05-04',
            AdoptQty: 2,
            ProductCategory: '现货',
            StorageName: '广州'
          },
          {
            Model: 'LM359',
            Year: '2018-05-01',
            AdoptQty: 1,
            ProductCategory: '原装',
            StorageName: '深圳北'
          }
        ]
      }

    },

    watch: {

    }
  };
</script>

```
:::

### 可编辑表格

可编辑的、灵活的配置表格。

:::demo `gridtype`属性可以修改表格类型，传入`action`时为可编辑表格, 传入对应标题`header`，`action-form`插槽，`heading-slot`插槽，`on-refresh`刷新方法， `is-multi-rows-check`多选属性, `right-menus`可扩展右键显示的按钮列表功能。`cell-line-height`控制单元格行高
```html
<znl-gridmodule
  gridtype="action"
  header="供应商库存"
  :on-init="onInit"
  :columns="columns"
  :item-source="itemSource"
  :on-refresh="onRefresh"
  :right-menus="rightMenus"
  :on-page-changed="onPageChanged"
  pagination-position="top"
  :page-index="1"
  :page-size="5"
  :total-count="30"
  :cell-line-height="30"
  :is-fields-search="true"
  :is-multi-rows-check="true"
  ref="edittable"
  :on-search="onSearch"
  @select-change="selectChange"
  :enter-cellmoves-direction="true"
  @shortcut-column-switch="shortcutColumnSwitch"
  @switch-hide-column="switchHideColumn"
  :on-save-setting="onSaveSetting"
  >

  <div slot="action-form">
    <znl-input placeholder="请输入数据" :width="100"></znl-input>
    <znl-button >点击执行</znl-button>
    <znl-button style-type="main" @click="getChangedData">获取修改的数据</znl-button>
  </div>

  <div slot="heading-slot">
    <znl-input placeholder="请输入数据" :width="100"></znl-input>
    <znl-button >点击执行</znl-button>
    <znl-button @click="clickHandler1">点击搜索</znl-button>
  </div>
</znl-gridmodule>
<script>
  export default {
    data() {
      return {
        columns: [],
        itemSource: [],
        rightMenus: [
          {
            text: '测试',
            iconName: 'icon-table_set_btn_n',
            disabled: true,
            display: true,
            click: (row) => {
              console.log(row)
            }
          }
        ]
      };
    },

    methods: {
      async onInit () {
        this.columns = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
            width: 200,
            isReadOnly: true,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'AdoptQty ',
            name: 'AdoptQty ',
            header: '采纳数量',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'ProductCategory ',
            name: 'ProductCategory ',
            header: '产品类型',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'StorageName ',
            name: 'StorageName ',
            header: '位置',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          }
        ]
        this.itemSource = [
          {
            Model: 'LM358',
            Year: '2015-05-01',
            AdoptQty: 100,
            ProductCategory: '原装',
            StorageName: '深圳北'
          },
          {
            Model: 'AST',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '现货',
            StorageName: '北京'
          },
          {
            Model: 'LM357',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: '原装',
            StorageName: '上海'
          },
          {
            Model: 'LM356',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: '现货',
            StorageName: '广州'
          },
          {
            Model: 'LM359',
            Year: '2018-05-01',
            AdoptQty: 500,
            ProductCategory: '原装',
            StorageName: '深圳北'
          }
        ]
      },
      async onRefresh () {
        console.log(123)
      },
      onPageChanged () {

      }

    },

    watch: {

    }
  };
</script>
```
:::

### 灵活的列配置
对`columns`中需要的列进行灵活的配置

:::demo  `buttons`配置按钮元素
```html
<znl-gridmodule
  gridtype="action"
  header="供应商库存"
  loading-type="animation"
  ref="flexGrid"
  :on-init="onInit"
  :columns="columns1"
  :item-source="itemSource1"
  :on-refresh="onRefresh"
  :is-multi-rows-check="true"
  :right-menus="rightMenus"
  :on-save-rows="onSaveRow"
  :btn-mouse-enter-menus="btnMouseEnterMenus"
  >

  <div slot="action-form">
    <znl-input placeholder="请输入数据" :width="100"></znl-input>
    <znl-button  @click="clickHandler">点击执行</znl-button>
    <znl-button style-type="main">点击搜索</znl-button>
  </div>

  <div slot="heading-slot">
    <znl-input placeholder="请输入数据" :width="100"></znl-input>
    <znl-button >点击执行</znl-button>
    <znl-button >点击搜索</znl-button>
  </div>

  <znl-dialog-mini :visible.sync="dialogMiniVisible" :options="options">
    <div>123</div>
  </znl-dialog-mini>
</znl-gridmodule>
<script>
  export default {
    data() {
      return {
        columns: [],
        itemSource: [],
        options: {},
        dialogMiniVisible: false,
        btnMouseEnterMenus: {
          List: [
            {
              name: '增加',
              click () {
                this.dialogMiniVisible = true
              }
            },
            {
              name: '设置'
            }
          ],
          Binding: 'Model'
        },
        rightMenus: [
          {
            text: '测试',
            iconName: 'icon-table_set_btn_n',
            disabled: false,
            display: true,
            click: (row) => {
              console.log(row)
            }
          }
        ]
      };
    },

    methods: {
      mouseMenuConfig (config) {
        this.options = config
      },
      async onInit () {
        this.columns1 = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 100,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
            width: 200,
            isReadOnly: true,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'AdoptQty ',
            name: 'AdoptQty ',
            header: '采纳数量',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            IsUpperCase: true
          },
          {
            binding: 'ProductCategory ',
            name: 'ProductCategory ',
            header: '产品类型',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'StorageName ',
            name: 'StorageName ',
            header: '位置',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          }
        ]
        this.itemSource1 = [
          {
            Model: 'LM358',
            Year: '2015-05-01',
            AdoptQty: 100,
            ProductCategory: '原装',
            StorageName: '深圳北'
          },
          {
            Model: 'AST',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '现货',
            StorageName: '北京'
          },
          {
            Model: 'LM357',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: '原装',
            StorageName: '上海'
          },
          {
            Model: 'LM356',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: '现货',
            StorageName: '广州'
          },
          {
            Model: 'LM359',
            Year: '2018-05-01',
            AdoptQty: 500,
            ProductCategory: '原装',
            StorageName: '深圳北'
          }
        ]

        _.each(this.columns1, column => {
          if (column.binding === 'Model') {
            column.buttons = [
              {
                content: (row) => {return row.Model},
                className: 'button-test'
              }
            ]
          }
        })
      },
      async onRefresh () {

      }

    },

    watch: {

    }
  };
</script>
<style>
.znl-dialog-mini li{
  list-style: none;
  padding: 3px 10px;
  &:hover{
    background-color: #ee7700;
  }
}
</style>
```
:::

### Table Attributes

| name                       | Description                              | default               | type          | indispensable | arguments                 |
| -------------------------- | ---------------------------------------- | --------------------- | ------------- | ------------- | ------------------------- |
| on-init         | 初始化函数                                    |                       | Function      | yes           |                           |
| columns                    | 表格列配置                                    |                       | Array         | yes           |                           |
| item-source                | 表格数据        | []             | Array         |               |                           |
| table-row-class-name | 表格行类名 | | Function | | [{row, rowIndex}] |
| show-header                | 是否显示**标题行**（兼容hasZnlBtns）                | true                  | Boolean       |               |                           |
| on-refresh                 | 刷新方法(存在时显示刷新按钮及右键刷新菜单)                   |                       | Function      |               |                           |
| on-save-setting    | 设置方法（用于配置表格，存在时显示设置按钮及展开列按钮）      |           | Function      |      | columns, pageSize       |
| on-save-config    | 单列设置方法    |           | Function      |      | columns, pageSize       | column |
| header                     | 标题                                       |                       |               |               |                           |
| is-init                    | 是否用传入的初始化函数初始化组件                         | true                  | Boolean       |               |                           |
| is-fields-search           | 是否支持搜索                                   | false                 | Boolean       |               |                           |
| search-fields              | 搜索条件（组件会监听这个传入的参数变化，传入搜索条件改变时触发onsearch） |                       | Object        |               |                           |
| on-search                  | 搜索方法                                     |                       | Function      |               | params                    |
| on-page-changed            | 翻页方法(存在时显示分页器)                           |                       | Function      |               |                           |
| page-size                  | 每页条数                                     | 20                    | Number        |               |                           |
| page-index                 | 当前页                                      | 1                     | Number        |               |                           |
| total-count                | 总条数                                      |                       | Number        |               |                           |
| action-btns                | 顶部按钮组数据[name:名称，iconName:图标，click:点击事件，tip: 提示文字] | []                    | Array         |               |                           |
| gridtype                   | 表格类型（action / base）                      | base                  | String        |               |                           |
| is-multi-rows-check        | 可否**多选**（多选情况下有第一列选择框）                   | false                 | Boolean       |               |                           |
| is-multi-rows-check-fixed  | 多选项是否冻结（默认冻结，建议弹框中使用时修改false,否则有不可预估的bug） | true                  | Boolean       |               |                           |
| show-delete-row-right-menu | 是否显示**右键删除**按钮                           | true                  | Boolean       |               |                           |
| show-save-btn              | 是否存在保存按钮                                 | true                  | Boolean       |               |                           |
| onResetSetting     | 重置列设置方法          |         | Function      |         |               |
| onResetParams     | 重置参数设置方法          |         | Function      |         |               |
| users                      | 权限设置所有用户                                 |                       | Array         |               |                           |
| tooltip-content            | 表格的说明文字，鼠标悬浮在**标题处**显示                   |                       | String        |               |                           |
| from-btns                  | 表单按钮组（配置同action-btns）                    |                       | Array         |               |                           |
| from-save-btns             | 表单按钮组（配置同action-btns，增加class配置）          |                       | Array         |               |                           |
| btn-mouse-enter-menus      | 鼠标悬浮在**单元格按钮上**显示的列表，必含字段{List: [{iconName,name,click}] Binding} | {List: [],Binding:''} | Object        |               |                           |
| is-show-rightbtns          | 是否显示**头部右侧**全部按钮                         | true                  | Boolean       |               |                           |
| is-show-frombtns           | 是否显示**form表单按钮**行                        | true                  | Boolean       |               |                           |
| show-summary               | 是否显示**表格底部的合计行**                         | false                 | Boolean       |               |                           |
| sum-text                   | 合计行第一列默认文字                               | 合计                    | String        |               |                           |
| summary-method             | 自定义合计计算方法（默认累加number类型数据）                |                       | Function      |               | { columns, data } = param |
| is-activity                | 是否为可活动表格（控件右上角可切换表格隐藏）                   | false                 | Boolean       |               |                           |
| loading                    | loading                                  | false                 | Boolean       |               |                           |
| element-loading-text       | loading说明文字                              | 数据加载中,请稍后...          | String        |               |                           |
| pagination-position        | 分页器位置(top,bottom)                        | bottom                | String        |               |                           |
| cell-draggable             | 是否允许单元格拖动                                | false                 | Boolean       |               |                           |
| table-tip                  | 表格提示（鼠标悬浮显示）                             |                       | String        |               |                           |
| action-form-height         | action-form插槽高度                          | 38                    | Number        |               |                           |
| header-height              | 标题行高度                                    | 38                    | Number        |               |                           |
| height                     | 表格组件高度                                   | 100%                  | Number,String |               |                           |
| max-height                 | 表格组件最大高度                                 |                       | Number        |               |                           |
| min-height                 | 表格组件最小高度                                 |                       | Number        |               |                           |
| footer-height              | 分页器高度(pagination-position为bottom时，即分页器位置在底部时有效) | 32                    | Number        |               |                           |
| loading-type              | 加载loading的动画效果(默认原效果，新增animation选项，在刷新出体现loading动画，小视觉效果) | icon                    | String        |               |                           |
| cell-line-height  | 单元格行高 | 28px  | Number        |               |                           |
| shortcut-column-handler | 自定义便捷操作列的方法，可在外部自定义显示/隐藏时显示的列(仍会触发图标切换和`shortcut-column-switch`事件) | | Function | |
| enter-cellmoves-direction | 回车键选中单元格向下移动 | | | |


### Table Events
| name               | Description           | arguments                                |
| ------------------ | --------------------- | ---------------------------------------- |
| page-loading       | 初始化请求时/请求失败时触发        | 初始化请求true/请求失败false                      |
| ondblclick         | 双击单元格时触发              | row, col, cell, grid, noVisibleCols, index |
| config-tab-changed | 表格配置切换到权限时触发          |                                          |
| multiple-change    | 组件编辑有多选下拉框时，多选值被修改时抛出 | val,row                                  |
| shortcut-column-switch | 表格切换/隐藏默认设置隐藏的列的时候触发 | 当前隐藏/显示的状态, cols |
| switch-hide-column | 点击表头单独隐藏列时触发 | column, columns |
| cell-click | 点击单元格触发 | row, column, cell, event |


### Table Methods
| name            | Description                              | arguments                                | retrun |
| --------------- | ---------------------------------------- | ---------------------------------------- | ------ |
| search          | 执行搜索函数                                   | 当前条件                                     |        |
| getSelectedRows | 获取选择的数据                                  |                                          | datas  |
| toggleTableShow | 设置表格内容显示或隐藏                              | true（显示）/false（隐藏）/无参数（隐藏、显示切换）          |        |
| checkRow        | 选中单行数据                                   | index(Number类型，不设置时默认选中第一行数据，设置index时显示设置的行数据) |        |
| reFMHeight      | 当**formModule模块在外部切换其高度**时,或 **表格外部布局调整**时可能需要调用此方法重新布局表格高度。 |                                          |        |
| getChangedData | 获取修改过的数据 |  | datas |

### Table Slot
| name            | Description                              |
| --------------- | ---------------------------------------- |
| header          | 标题的solt形式嵌入                              |
| action-form     | 顶部搜索栏(按钮组下方,存在该插槽时has-znl-actions参数必需为true) |
| from-module     | 表格中插入表单（或其他）插槽                           |
| znl-footer-slot | 底部插槽                                     |
| from-content    | 表单按钮行中间插槽，适用于存放其他按钮，下拉、输入框等              |
| heading-slot    | 表头slot                                   |


### column 配置
| key             | Description                              | default                                  | type             | indispensable | arguments                                |
| --------------- | ---------------------------------------- | ---------------------------------------- | ---------------- | ------------- | ---------------------------------------- |
| visible         | 是否显示                                     |                                          | Boolen           | yes           |                                          |
| className         | 列类名                                     |                                          | String           |            |                                          |
| align           | 单元格对齐方式(left,right,center)               | left                                     | String           |               |                                          |
| name            | 列字段                                      |                                          | String           |               |                                          |
| isReadOnly      | 是否只读                                     | true                                     | Boolen           |               |                                          |
| dataType        | 数据类型                                     | String-1,Number-2,Object-3, Date-4,Boolean-5,Array-6 | Number           | yes           |                                          |
| showDropDown    | 数据是否以下拉框方式显示（需配置dataMap）                 | false                                    | Boolen           |               |                                          |
| dataMap         | 如果数据是下拉选择数据需配置该属性                        |                                          | Array            |               |                                          |
| binding         | **列绑定字段**                                |                                          | String           | yes           |                                          |
| header          | **列名**                                   |                                          | String           |               |                                          |
| width           | 列宽度                                      |                                          | Number           | yes           |                                          |
| isFieldSearch   | 该列是否允许搜索                                 | false                                    | Boolean          |               |                                          |
| isSystem        | 是否系统配置(系统配置不显示，用户不可修改)                       | false                                    | Boolean          |               |                                          |
| multiple        | 是否为多选下拉框                                 | false                                    | Boolean          |               |                                          |
| mapping         | 为多选下拉框时，选项字段（包含在数据itemSource中,字段绑定数组，列binding绑定String） |                                          | String           |               |                                          |
| separator       | 数据显示分隔符                                  | /                                        | String           |               |                                          |
| IsUpperCase     | 该列数据编辑时是否转换为大写                           | false                                    | Boolean          |               |                                          |
| renderCell      | 单元格渲染方法                                  |                                          | Function         |               | h, cellObj{row,column, columnIndex}      |
| headerElement   | 表头渲染方法                                   |                                          | Function         |               | header                                   |
| buttons         | 自定义渲染的按钮,需返回数组[{content, icon,click()}]  |                                          | Function / Array |               | row, colunm                              |
| elements        | 自定义html渲染,需返回数组                          |                                          | Function         |               | currentValue, {row, column, columnIndex} |
| isCheckedColumn | 是否为选择列           |          | Boolean          |               |                       |
| IsUpperCase     | 该列在编辑输入时是否转换为大写              | false            | Boolean          |           |                 |
| hasRole     | 是否有权限查看该列，无权限时全部展开后不会显示该列     | false       | Boolean          |           |               |
| customFilter | 自定义数据过滤方法 | | Function(value, column, row) | | |
| renderHeader  | 表头渲染方法 |  | Function(h) | | |

### item-source中包含字段isReadOnly为true时该行只读（不可编辑）
isReadOnly  行不可编辑
DisplayEdit 正行允许编辑（当列不可编辑时设置该属性可使行可编辑）
ReadOnlyBindings Arrat 当前行可编辑时，该参数决定不可编辑的列

### column.buttons配置

| key       | Description | default | type                | indispensable |
| --------- | ----------- | ------- | ------------------- | ------------- |
| content   | 按钮显示文字的内容   |         | String              | yes           |
| className | 类名          |         | String              |               |
| when      | 是否显示        | true    | [Function, Boolean] |               |
| click     | 点击方法        |         | Function            |               |

### column.elements配置

| key        | Description | default | type     | indispensable |
| ---------- | ----------- | ------- | -------- | ------------- |
| name       | 显示元素        |         | String   | yes           |
| click      | 单击事件        |         | Function |               |
| mouseenter | 鼠标移入事件      |         | Function |               |
| mouseleave | 鼠标移出事件      |         | Function |               |

### rightMenus右键菜单配置选项

| key      | Description | default | type     | indispensable |
| -------- | ----------- | ------- | -------- | ------------- |
| iconName | 字体图标        |         | String   |               |
| text     | 显示内容        |         | String   | yes           |
| display  | 是否显示        | true    | Boolean  |               |
| click    | 触发函数        |         | Function |               |