<script>
 export default {
    data() {
      return {
        visible: false,
        visible1: false,
        visible2: false,
        columns: [],
        itemSource: [],
        loading: false,
        visibleIn: false,
        title: ''
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
       },
      confirmCallBack (val) {
         console.log('confirmCallBack')
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
## Dialog 对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置`visible`属性，它接收`Boolean`，当为`true`时显示。

```html
<znl-button :height="40" @click="visible=!visible, title='标题'">打开dialog</znl-button>
<znl-dialog 
  :visible.sync="visible"
  height="500"
  :title="title"
  param-string-tips="底部提示"
  :confirm-call-back="confirmCallBack"
  :loading.sync="loading"
  loading-text="数据加载中"
  :lock-scroll="false"
  >
  <div>
    <znl-button @click="visibleIn=!visibleIn">
      内部
    </znl-button>
    <znl-dialog 
      :visible.sync="visibleIn"
      class="aaaa"
      height="300px"
      width="300px"
      title="你好111"
      :append-to-body="true"
      subhead="提示文字111"
      param-string-tips="底部提示111"
      :confirm-call-back="confirmCallBack"
      :loading.sync="loading"
      loading-text="数据加载中"
      >
    </znl-dialog>
  </div>
</znl-dialog>

<script>
  module.exports = {
    data() {
      return {
        visible: false
      }
    }
  };
</script>

```
:::

### 自定义内容

可以和其他组件搭配使用,以下为搭配表格.

:::demo Dialog 组件的内容可以是任意的, 插入`znl-dialog`或`不具名slot`即可定义body里的内容, `footer`插槽会替代现有footer, `title`展示组件标题, `subhead`标题描述。
```html

<znl-button :height="40" @click="visible1=!visible1">打开dialog</znl-button>

<znl-dialog 
  title="自定义标题"
  subhead="这是一段描述性文字"
  :visible.sync="visible1"
  height="600px"
>

  <znl-gridmodule
    :on-init="onInit"
    :columns="columns"
    :item-source="itemSource"
    >
  </znl-gridmodule>

  <div slot="footer">
    <znl-button :height="35">自定义按钮</znl-button>
    <znl-button :height="35" style-type="main" @click="visible1=false">自定义关闭</znl-button>
  </div>

</znl-dialog>

<style>
  .znl-button{
    margin-left: 5px;
  }
</style>

```
:::

### 不同尺寸

:::demo 支持宽高设置`width`和`height`, `is-footer-show`可以隐藏footer
```html
<znl-button :height="40" @click="visible2=!visible2">打开dialog</znl-button>

<znl-dialog 
  :visible.sync="visible2"
  width="300px"
  :height="200"
  :is-footer-show="false"
  >

  <div class="img">
    <img width="245px" height="180px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525666384275&di=9a14eac36a1ff9e7ca018acab9b6d7a7&imgtype=0&src=http%3A%2F%2Fp1.wmpic.me%2Farticle%2F2017%2F12%2F06%2F1512530142_hjZNksWm.jpg"></img>
  </div>


</znl-dialog>

<script>
  module.exports = {
    data() {
      return {
        visible1: false
      }
    }
  };
</script>

<style>
  .img{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

```
:::



### Attributes
| 参数                    | 说明                                 | 默认    | 类型            | indispensable | arguments    |
| --------------------- | ---------------------------------- | ----- | ------------- | ------------- | ------------ |
| visible               | 模块是否显示                             | false | Boolean       | yes           |              |
| loading.sync | loading | false | Boolean | | |
| loading-text | loading文字 | ... | String | | |
| width                 | 宽度               | 800px | string        |               |              |
| height                | 模块高度 (不能设置百分比)                              |   | String,Number |               |              |
| headerHeight     | 头部高度    | 50  | Number |         |       |
| footerHeight     | 底部高度    | 50  | Number |         |       |
| title                 | 标题                                 |       | String        |               |              |
| lock-scroll | 是否在显示后将body锁定 | | Boolean | | |
| subhead               | 头部提示文字（副标题）                        |       | String        |               |              |
| paramStringTips       | 重要提示（显示在底部,非自定义footer时存在）           |       | String        |               |              |
| confirm-call-back     | 确认时的回调（组件内部点击确认按钮不再自动关闭，需自行传递参数关闭） |       |      |         | projects组件实例 |
| is-footer-show        | 底部栏是否显示                            | true  | Boolean       |               |              |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog           | true  | Boolean       |               |              |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog             | true  | Boolean       |               |              |
| show-close            | 是否显示关闭按钮                           | true  | Boolean       |               |              |
| append-to-body | Dialog 自身是否插入至 body 元素上。嵌套在外部有`transfrom`属性的元素中时 Dialog 必须指定该属性并赋值为 true | false |	Boolean | | |	
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上   | true   | Boolean |  | |


### Slot
| name       | Description |
| ---------- | ----------- |
| 默认         | 默认，插入body   |
| znl-dialog | 自定义插槽(可用默认插槽取代) |
| footer     | 自定义底部插槽     |
| title     | 自定标题,可替换默认标题部分     |


### Events
| name  | Description | arguments |
| ----- | ----------- | --------- |
| open  | 打开模块时的回调    | 无         |
| close | 关闭模块时的回调    | 无         |

