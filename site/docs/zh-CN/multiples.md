<style>
  .demo{
    height: 300px;
    border: 1px solid #000;
    margin: 0;
  }
  .multipletest{
    .znl-layout-multiple_scroll{
      padding-right: 10px;
    }
  }
</style>

<script>
  export default {
    methods: {
      clickHandler () {
        this.$refs.layoutMultiple.appointBackTo()
      },
      async onSaveConfig (config) {
        console.log(config)
      },
      pageChange (visible, obj, index) {
        console.log(visible, obj, index)
      },
      async onInit () {
        console.log(123)
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
            isSystem: true,
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
            sort: 3
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
            Model: 'LM358ff',
            Year: '2015-05-01',
            AdoptQty: 100,
            ProductCategory: '',
            StorageName: '深圳北',
            ID: 1,
            age: 123
          },
          {
            Model: 'ASTgg',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '',
            StorageName: '北京',
            ID: 2,
            age: 123
          },
          {
            Model: 'LM357hh',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: 1,
            StorageName: '上海',
            ID: 3,
            age: 123
          },
          {
            Model: 'LM356jj',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: 2,
            StorageName: '广州',
            ID: 4,
            age: 123
          },
          {
            Model: 'LM359kk',
            Year: '2018-05-01',
            AdoptQty: 500,
            ProductCategory: 1,
            StorageName: '深圳北',
            ID: 5,
            age: 123
          }
        ]
      }
    },
    data() {
      return {
        layoutConfig: [],
        columns: [],
        itemSource: []
      };
    },
    mounted() {
      _.delay(() => {
        this.layoutConfig =  [
          {name: "demo1", visible: true, title: "配单1", hasRight: true, index: 1, allowDrag: false, allowDeploy: false},
          {name: "demo2", visible: true, title: "配单2", hasRight: true, index: 0, allowDrag: true, allowDeploy: true},
          {name: "demo3", visible: true, title: "配单3", hasRight: true, index: 3, allowDrag: true, allowDeploy: true},
          {name: "demo4", visible: true, title: "配单4", hasRight: true, index: 2, allowDrag: true, allowDeploy: true},
          {name: "demo5", visible: true, title: "配单5", hasRight: true, index: 5, allowDrag: true, allowDeploy: true},
          {name: "demo6", visible: true, title: "配单6", hasRight: true, index: 4, allowDrag: true, allowDeploy: true},
          {name: "demo7", visible: true, title: "配单7", hasRight: true, index: 6, allowDrag: true, allowDeploy: true}
        ]
      }, 200)
    }
  };
</script>

## multiples 多行布局
多组件顺序布局,因固定属性`fixed`会以全局位置固定计算,所以改属性只能在布局为最外层的时候使用

### 基础用法

:::demo
```html
  <znl-layout-multiple 
    height="800px" 
    class="multipletest" 
    ref="layoutMultiple" 
    :on-save-config="onSaveConfig"
    :layout-config="layoutConfig"
    @page-change="pageChange">
    <multiple name="demo1">
      <div class="demo">
        <znl-gridmodule
        :on-init="onInit"
        :columns="columns"
        :item-source="itemSource"
        >
  
        </znl-gridmodule>

      </div>
    </multiple>
  
    <multiple name="demo2">
      <div class="demo"  >222</div> 
    </multiple>
  
    <multiple name="demo3">
      <div class="demo" >333</div> 
    </multiple>
  
    <multiple name="demo4">
      <div class="demo" >444</div> 
    </multiple>

    <multiple name="demo5">
      <div class="demo" >555</div> 
    </multiple>

    <multiple name="demo6">
      <div class="demo" >666</div> 
    </multiple>

    <multiple name="demo7">
      <znl-button @click="clickHandler" >appointBackTo-777</znl-button> 
    </multiple>
  </znl-layout-multiple>

```
:::





### Attributes
| name                  | Description            | default |   type   | indispensable |
| --------------------- | ---------------------- | :-----: | :------: | ------------- |
| space | 不同模块之间的上下间距 | 5px | Number | |
| height | 布局高度 | auto | Number, String | |
| layout-config | 页面配置 | | Array | |
| on-save-config | 保存配置异步方法 | | Function| |
| on-reset-setting | 重置设置方法 | | Function | |

### 配置字段
| name                  | Description            | 
| --------------------- | ---------------------- |
| name | 模块name，必须在子组件Multiple上传入的name | 
| visible | 是否显示 | 
| title | 配置时显示的模块名称 | 
| hasRight | 是否有权限查看模块 | 
| allowDeploy | 是否有设置权限 |
| allowDrag | 是否有拖动权限 |


### 方法
| name          | Description | arguments | retrun |
| ------------- | ----------- | --------- | ------ |
| appointBackTo | 模块可滚动时跳转到指定滚动位置，默认跳转到顶部 | topDistance | |

### Events
| name              | Description  | arguments  |
| ----------------- | ------------ | :--------: |
| page-change | 每次修改页面配置时触发 | visible, obj, index |
| draging-change | 修改拖动允许状态时触发 | 当前是否允许拖动 |


### Scoped Slot
| name   | Description |
| ------ | ----------- |


### Multiple Attributes
| name                  | Description            | default |   type   | indispensable |
| --------------------- | ---------------------- | :-----: | :------: | ------------- |
| fixed | 固定的模块(只能有一个，设置多个则以最后一个为准，滚动到该模块后固定，注意：不能选取最后一个模块作为固定模块) | false | Boolean | |
| name | 模块名称 |  | String | |