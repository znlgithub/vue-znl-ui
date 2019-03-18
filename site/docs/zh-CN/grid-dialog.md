<script>
 export default {
    data() {
      return {
   
      }
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
       }
    }
  };
</script>

<style>
  .znl-button{
    margin-left: 5px;
  }
  .img{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
## GridDialog 表格选择/编辑弹框
**1.3.35起不再提供外接插槽，如有需要请使用自定义弹出框，以模块方式注入**

### 基本用法

:::demo 

```html


```
:::




### Attributes
| name                  | Description                              | default |     type     | indispensable |
| --------------------- | ---------------------------------------- | :-----: | :----------: | ------------- |
| on-refresh            | 刷新方法(存在时显示刷新按钮及右键刷新菜单)                   |         |   Function   |               |
| on-save-setting       | 设置方法（用于配置表格，存在时显示设置按钮）                   |         |   Function   |               |
| on-init               | 初始化函数                                    |         |   Function   | yes           |
| search-fields         | 搜索条件（组件会监听这个传入的参数变化，传入搜索条件改变时触发onsearch） |         |    Object    |               |
| page-size             | 每页条数                                     |   20    |    Number    |               |
| page-index            | 当前页                                      |    1    |    Number    |               |
| total-count           | 总条数                                      |         |    Number    |               |
| gridtype              | 选择模块(base)/编辑编辑(action)                  |  base   |    String    |               |
| visible               | dialog模块是否显示                             |  false  |   Boolean    |               |
| columns               | 列配置                                      |         |    Array     | yes           |
| item-source           | 表格数据                                     |         |    Array     | yes           |
| height                | 弹出框高度                                    |   50%   | Array,String |               |
| is-multi-rows-check   | 可否多选（多选情况下有第一列选择框）                       |  false  |   Boolean    |               |
| grid-show             | 弹出框中表格是否显示                               |  true   |   Boolean    |               |
| on-page-changed       | 翻页回调(同时page-index>0,total-count>0时显示分页器) |         |   Function   |               |
| is-footer-show        | 底部栏是否显示                                  |  true   |   Boolean    |               |
| width                 | 宽度                                       |   50%   |    String    |               |
| tooltip-content       | 表格的说明文字，鼠标悬浮在标题处显示                       |         |    String    |               |
| paramStringTips       | 重要提示（显示再底部）                              |         |    String    |               |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                 |  true   |   Boolean    |               |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                   |  true   |   Boolean    |               |
| show-close            | 是否显示关闭按钮                                 |  true   |   Boolean    |               |

### METHODS
| name   | Description | arguments | retrun |
| ------ | ----------- | --------- | ------ |
| search | 执行搜索函数      |           |        |


### Events
| name                  | Description |  arguments  |
| --------------------- | ----------- | :---------: |
| confirm / base 选择模块   | 获取选择数据      | 选择的数据Array  |
| confirm /action  编辑模块 | 获取已编辑的数据    | 已编辑的数据Array |
| open                  | 打开模块时的回调    |      无      |
| close                 | 关闭模块时的回调    |      无      |

