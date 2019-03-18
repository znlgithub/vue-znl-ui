<script>
  module.exports = {
    data() {
      return {
        visible: false,
        options: {
        },
        visible1: false,
        options1: {
        },
        visible2: false,
        options2: {
          left: '40%',
          top: '40%'
        }
      }
    },
    methods: {
      clickHanler (e) {
        this.visible2 = true
        let optionObj = e.srcElement.getBoundingClientRect()
        this.options2 = {
          left: optionObj.left + e.srcElement.offsetWidth/2,
          top: optionObj.top + e.srcElement.offsetHeight/2
        }
      },
      leave () {
        this.visible2 = false
      },
      leave1 () {
        this.visible2 = true
      },
      clickHanlerOnes (e, type) {
        this[type] = true
        let options = e.srcElement.getBoundingClientRect()
        this.options = {
          left: options.left + 90,
          top: options.top + 30
        }
        this.options1 = {
          left: options.left + 90,
          top: options.top + 30
        }
      }
    }
  };
</script>

<style>
  .mini{
    width: 300px;
    height: 200px;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
## DialogMini 小型弹出框
小型弹出框,无遮罩层

### 基本用法

`DialogMini` 固定定位,弹出一个对话框且无遮罩层，适合少内容自定义弹窗使用,大型的多内容弹窗请使用`Dialog`。

:::demo `visible`组件是否显示, `options`组件配置选项,目前有`left`,`top`属性

```html
<znl-button style-type="info" @click="e=>clickHanlerOnes(e,'visible')">点击弹出</znl-button>

<znl-dialog-mini 
  :visible.sync="visible" 
  :options="options">
  <div class="mini">这是小型弹出框
    <input type="radio"></input>
    <input type="radio"></input>
    <input type="radio"></input>
    <input type="checkbox"></input>

  </div>
</znl-dialog-mini>

<script>
  export default {
    data () {
      return {
        visible: false,
        options: {
        }
      }
    }
  }
</script>

```
:::

### 点击外部关闭

:::demo `close-on-click-modal`属性决定是否弹框在点击外部的时候会自动关闭

```html
<znl-button  @click="e=>clickHanlerOnes(e,'visible1')">点击弹出</znl-button>

<znl-dialog-mini 
  :visible.sync="visible1" 
  :options="options1"
    :close-on-click-modal="false">
  <div class="mini">这是小型弹出框</div>
  <div slot="header">123</div>
</znl-dialog-mini>

<script>
  export default {
    data () {
      return {
        visible1: false,
        options1: {
        }
      }
    }
  }
</script>

```
:::

### 出现方式

:::demo 可以以hover或其他形式展示

```html
<znl-button 
  @mouseenter.native="clickHanler"
  @mouseleave.native="leave"
  >鼠标悬浮弹出</znl-button>

<znl-dialog-mini 
  :visible.sync="visible2" 
  :options="options2">
  <div class="mini" @mouseleave.native="leave1">这是小型弹出框</div>
</znl-dialog-mini>

<script>
  export default {
    data () {
      return {
        visible2: false,
        options2: {
          left: '40%',
          top: '40%'
        }
      }
    },

    methods: {
      clickHanler (e) {
        this.visible2 = true
        let optionObj = e.srcElement.getBoundingClientRect()
        this.options2 = {
          left: optionObj.left + 90,
          top: optionObj.top + 30
        }
      }
    }
  }
</script>

```
:::



### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| options | 配置, 包含left,top,right, bottom属性(取其二即可,Number或String),决定弹窗位置 | Object |  |  |
| visible.sync | 是否显示 | Boolean | | false |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog           | Boolean  |        |     true          |
| show-close  | 是否显示关闭按钮         | Boolean  |        |     true          |


### Slot
| name | 说明 |
|------|--------|
| 默认 | |
| header | 标题 |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close | 弹窗关闭时触发 | |
| open | 弹窗打开时触发 | |

