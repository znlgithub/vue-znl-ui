<style>
  .model-test{
    line-height: 30px;
  }
  .heightChange{
    height: 100px;
  }
  .test-list-row{
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
  }
</style>

<script>
  export default {
    methods: {
      async onInit () {
         this.columns = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',

            dataType: 1,
      
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            className: 'model-test'
          },
          {
            binding: 'ID',
            name: 'ID',
            header: 'ID',
            visible: true,
            dataType: 1,
      
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: true,
            customFilter: (val, col, row) => {
              return val + '123'
            }
          },
          {
            binding: 'Year',
            name: 'Year',
            header: '年份',
            visible: true,
            dataType: 1,
       
            isReadOnly: true,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'AdoptQty',
            name: 'AdoptQty',
            header: '采纳数量',
            visible: true,
            dataType: 2,
     
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'ProductCategory',
            name: 'ProductCategory',
            header: '产品类型',
            visible: true,
            dataType: 1,
  
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
          {
            binding: 'StorageName',
            name: 'StorageName',
            header: '位置',
            visible: false,
            dataType: 1,
         
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          },
           {
            binding: 'age',
            name: 'age',
            header: '年龄',
            visible: false,
            dataType: 1,
      
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
          }
        ]
        this.itemSource = [
          {
            Model: 'LM358ff111',
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
            age: 123,
            renderRow: (h, rowObj) => {
              return h(
                'div',
                {
                  attrs: {
                    class: 'test-list-row'
                  },
                  on: {
                    click () {
                      console.log(212)
                    }
                  }
                },
                [
                  h('span', rowObj.row.Model),
                  h('span', ' 这里是自定义插入的行')
                ]
                
              )
            }
          },
          {
            Model: 'LM357hh',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: '原装',
            StorageName: '上海',
            ID: 3,
            age: 123,
            renderRow: function () {
              return true
            }
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
      },
      onSearch () {
        console.log('123')
      },
      onPageChanged (index) {
        this.pageIndex = index++
        console.log('page-change', index)        
      },
      clickHandler () {
        this.heightChange = !this.heightChange
        this.$refs.bomaiList.listPrependHeightMethod()
      },
      async onRefresh () {

      }
    },
    data() {
      return {
        itemSource: [],
        columns: [],
        searchFields: {},
        loading: false,
        heightChange: false,
        pageIndex: 1,
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
        }
      };
    }
  };
</script>

## Lists 数据列表
表格结构的数据展示列表


### 基础用法ERP
固定行高

:::demo
```html
<znl-lists
  :on-init="onInit"
  :columns="columns"
  :item-source="itemSource"
  max-height="200"
  :show-title-row="true"
  header="测试标题"
  tooltip-content="标题提示"
  :is-activity="true"
  footer-position="top"
  :on-refresh="onRefresh"
  :loading.sync="loading"
  loading-type="animation"
  :page-size="10"
  :page-index="pageIndex"
  :total-count="100"
  :on-page-changed="onPageChanged"
  >
  <div slot="header-prepend">前置</div>
  <div slot="header-append">后置</div>
  <div slot="heading-slot">标题行</div>
</znl-lists>
```
:::

### 基础用法BOM
行高随内容确定

:::demo
```html
<znl-lists
  type="bomai"
  ref="bomaiList"
  :loading.sync="loading"
  :on-init="onInit"
  :columns="columns"
  :item-source="itemSource"
  :search-fields="searchFields"
  :on-search="onSearch"
  :page-size="10"
  :page-index="1"
  :total-count="100"
  :on-page-changed="onPageChanged"
  :btn-mouse-enter-menus="btnMouseEnterMenus"
  header="测试标题"
  >
  <!-- max-height="400px" -->
  <div slot="list-prepend" :class="heightChange?'heightChange':''">
    <p>列表前置</p>
    <znl-button @click="clickHandler">高度改变</znl-button>
    <p>注意：该位置高度改变时需调用内置`listPrependHeightMethod`方法</p>
  </div>
  <div slot="header-prepend">头部前置</div>
  <div slot="header-append">头部后置</div>
  <div slot="listrow">1234</div>
</znl-lists>
<znl-button @click="searchFields={age:18}">改变搜索条件</znl-button>

<style>
  .model-test{
    line-height: 30px;
  }
  .heightChange{
    height: 100px;
  }
</style>

<script>
  export default {
    methods: {
      async onInit () {
         this.columns = [
          {
            binding: 'Model',
            name: 'Model',
            header: '型号',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false,
            className: 'model-test'
          },
          {
            binding: 'ID',
            name: 'ID',
            header: 'ID',
            visible: true,
            dataType: 1,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: true
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
            binding: 'AdoptQty',
            name: 'AdoptQty',
            header: '采纳数量',
            visible: true,
            dataType: 2,
            width: 150,
            isReadOnly: false,
            isFieldSearch: true,
            isSystem: false
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
            isSystem: false
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
            isSystem: false
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
            isSystem: false
          }
        ]
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
            age: 123,
            renderRow: (h, rowObj) => {
              return h(
                'div',
                {
                  attrs: {
                    class: 'test-list-row'
                  },
                  on: {
                    click () {
                      console.log(212)
                    }
                  }
                },
                [
                  h('span', rowObj.row.Model),
                  h('span', ' 这里是自定义插入的行')
                ]
                
              )
            }
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
      },
      onSearch () {
        console.log('123')
      },
      onPageChanged (index) {
        console.log('page-change', index)        
      },
      clickHandler () {
        this.heightChange = !this.heightChange
        this.$refs.bomaiList.listPrependHeightMethod()
      }
    },
    data() {
      return {
        itemSource: [],
        columns: [],
        searchFields: {},
        loading: false,
        heightChange: false
      };
    }
  };
</script>
```
:::



### Attributes
| name                  | Description            | default |   type   | indispensable | value    |
| -------------------- | ------------------- | ------------- | ----- | ----- |  ----- |
| on-init               | 初始化方法(异步)              |         | Function | yes           |                        |
| is-init               | 是否自动执行初始化方法    |    true     | Boolean |            |            |
| item-source           | 数据        |         |  Array   | yes           |             |
| columns               | 列配置             |         |  Array   | yes           |                 |
| page-size             |                 |         |  Number  |               |              |
| page-index            |          |         |  Number  |               |                   |
| total-count           | 总条数                    |         |  Number  |               |                   |
| header-align          | 头部对其方式       | 'left'  |  String  |               | 'center', 'left', 'right'       |
| show-header           | 是否显示头部        |  true   | Booleab  |               |                       |
| show-footer           | 是否显示底部        |  true   | Booleab  |               |                       |
| list-row-class-name   | 行class,参数( row, index) |         | Function |               |                     |
| list-row-style   | 行style,参数( row, index) |         | Function |               |                     |
| footer-position       | 分页器位置                  | center  |  String  |               | 'center', 'left', 'right' ,'top' |
| is-multi-rows-check   | 是否允许多选(第一列选择框)         |  true   | Boolean  |               |            |
| on-page-changed       | 翻页回掉(参数index)(异步)          |         | Function |               |                 |
| is-fields-search      | 是否允许搜索                 |    false     | Boolean  |               |                |
| type                  | erp/bomai              |   erp   |  String  |               |                  |
| btn-mouse-enter-menus | 鼠标悬浮列表     |         |  Object  |      | {List:[{iconName:'',name:'',isShow:'',click: ()=>{}}], Binding: ''} |
| list-tip              | 列表鼠标悬浮提示         |         |  String  |        | 
| search-fields | 搜索条件(修改时会触发传入的`on-search`方法) | | Object | | |
| on-search | 搜索方法 | | Function | | |
| loading.sync | 列表loading | false | Boolean | | |
| znl-loading-text | loading文字 | 数据加载中,请稍后... | String | | |
| height | 列表高度 | 100% | String,Number | | %,px,auto,Number... |
| max-height | 列表最大高度 |  | String,Number | | px,Number... |
| min-height | 列表最小高度 |  | String,Number | | %,px,Number... |
| header-height | 列表头部高度 | Erp: 28 / Bom: 50 | Number | |  |
| fotter-height | 列表底部高度 | Erp: 30 / Bom: 50 | Number | |  |
| ERP列表头部行属性 | | | | | |
| show-title-row | 是否显示固定列表标题行(固定样式，同ERP标题行，其他参数见下面) | false | Boolean | | |
| title-height | 固定列表标题行高度 | Erp: 28 / Bom: 50 | Number | | |
| is-activity | 是否为可活动列表（控件右上角可切换表格隐藏） | true | Boolean | | |
| header | 标题 | | String | | |
| tooltip-content    | 列表的说明文字，鼠标悬浮在**标题处**显示   |   | String    |      |      |
| loading-type | 加载loading的动画效果(默认原效果，可选animation选项，在刷新出体现loading动画，小视觉效果) | icon | String | | |
| on-refresh | 刷新方法，存在时显示刷新按钮 | | Function | | |


### columns特殊字段
| name                   | Description                          | type                                     |
| ---------------------- | ------------------------------------ | ---------------------------------------- |
| column.className       | 列class                               | String                                   |
| column.headerClassName   | 列头class                               | String                                   |
| column.renderCell      | 单元格渲染方法                              | Function(h, cellObj{row,column, columnIndex}) |
| column.renderHeader | 头部渲染方法 | Function(h, cellObj{column, columnIndex}) |
| column.headerElement   | 表头渲染`html`方法(注意，禁止传入用户输入的内容)            | Function(header)                         |
| column.element        | 自定义html渲染,需返回String                  | Function(currentValue, {row, column, columnIndex}) |
| column.buttons         | 自定义渲染的按钮,需返回数组[{name, icon,click()}] | Function(row, colunm) / Array            |
| column.isCheckedColumn | 该列是否是选择框                             | Boolean                                  |
| column.customFilter | 自定义数据过滤方法 | | Function(value, column, row) |


### item-source特殊字段
| name                   | Description                          | type                                     |
| ---------------------- | ------------------------------------ | ---------------------------------------- |
| row.renderRow       | 该行的下面自定义渲染行方法     | Function(h, {row, rowIndex})    |


### 方法
| name          | Description | arguments | retrun |
| ------------- | ----------- | --------- | ------ |
| getSelectRows | 获取选择        |           |        |
| clearSelect   | 清空选择        |           |        |
| listPrependHeightMethod | 列表前置内容高度修改时调用 | | |
| ERP列表头部行方法 | | | |
| tableActivity | 设置表格内容显示或隐藏 | true（显示）/false（隐藏）/无参数（隐藏、显示切换） | |

### Events
| name              | Description  | arguments  |
| ----------------- | ------------ | :--------: |
| selection-changed | 单击行选中数据改变时触发 | currentRow |
| ERP列表头部行方法 | | |
| switch-to-hide | 活跃表格切换显示隐藏时触发 | 是否隐藏Boolean值 |


### Scoped Slot
| name   | Description |
| ------ | ----------- |
| 默认 | 置于内容后，一般存放不直接显示的弹窗等 |
| header-prepend | 表头前置内容(表头内部，如果`show-header`属性为`false`,不显示) |
| header-append | 表头后置内容(表头内部，如果`show-header`属性为`false`,不显示) |
| list-prepend | 列表前置内容 |
| heading-slot    | 标题行slot         |
| empty | 空数据内容 |
| body | 隐藏数据显示自定义内容 |
