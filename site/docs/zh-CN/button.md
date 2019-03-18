<style>
  .demo-box{
    .znl-button{
      margin-right: 10px;
    }
    .znl-row{
      padding: 10px 0;
    }
  }
</style>

## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`style-type`属性来定义 Button 的样式, 非文本按钮时有效。

```html
<div class="znl-row">
  <znl-button>
    默认按钮
  </znl-button>

  <znl-button style-type="main">
    <span>主要按钮</span>
  </znl-button>

  <znl-button style-type="minor">
    <span>次要按钮</span>
  </znl-button>

  <znl-button style-type="info">
    <span>信息按钮</span>
  </znl-button>

  <znl-button style-type="mac">
    <span>mac样式按钮</span>
  </znl-button>

  <znl-button style-type="link">
    <span>link样式按钮</span>
  </znl-button>
  
  </div>

  <div class="znl-row">
   <znl-button :height="30" :width="80">
    默认按钮
  </znl-button>

  <znl-button :height="30" :width="80" style-type="main">
    <span>主要按钮</span>
  </znl-button>

  <znl-button :height="30" :width="80" style-type="minor">
    <span>次要按钮</span>
  </znl-button>

  <znl-button :height="30" :width="80" style-type="info">
    <span>信息按钮</span>
  </znl-button>

  <znl-button :height="30" :width="80" style-type="mac">
    <span>mac样式按钮</span>
  </znl-button>

  <znl-button :height="30" :width="80" style-type="link">
    <span>link样式按钮</span>
  </znl-button>
</div>

```
:::

### 按钮类型

不同类型的按钮用法。

:::demo 使用`type`属性来定义 Button 的类型，当btns属性传入的数组长度>0时显示为下拉按钮。

```html
<div class="znl-row">
  <znl-button>
    默认按钮
  </znl-button>

  <znl-button type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button type="multiple">
    <znl-button-menu>按钮1</znl-button-menu>
    <znl-button-menu>按钮2</znl-button-menu>
    <znl-button-menu>按钮3</znl-button-menu>
  </znl-button>

  <znl-button :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button type="text">
    <span>文本按钮</span>
  </znl-button>
</div>

<div class="znl-row">
  <znl-button style-type="main">
    默认按钮
  </znl-button>

  <znl-button style-type="main" type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button style-type="main" type="multiple">
    <znl-button-menu>按钮1</znl-button-menu>
    <znl-button-menu>按钮2</znl-button-menu>
    <znl-button-menu>按钮3</znl-button-menu>
  </znl-button>

  <znl-button style-type="main" :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button type="text">
    <span>文本按钮</span>
  </znl-button>
</div>

<script>
export default {
  data() {
    return {
      printznlbtns: [
        {
          name: '打印',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('123')
          }
        },
        {
          name: '确定',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('124')
          }
        }
      ]
    }
  }
}
</script>

```
:::

### 禁用状态

按钮不可用状态。

:::demo 使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值, 需要注意的是多段按钮必须加在每一个按钮元素上。

```html
<div class="znl-row">
  <znl-button :disabled="true">
    默认按钮
  </znl-button>

  <znl-button :disabled="true" type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button type="multiple">
    <znl-button-menu :disabled="true">按钮1</znl-button-menu>
    <znl-button-menu :disabled="true">按钮2</znl-button-menu>
    <znl-button-menu :disabled="true">按钮3</znl-button-menu>
  </znl-button>

  <znl-button :disabled="true" :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button type="text" :disabled="true">
    <span>文本按钮</span>
  </znl-button>
</div>

<div class="znl-row">
  <znl-button :disabled="true" style-type="main">
    默认按钮
  </znl-button>

  <znl-button :disabled="true" style-type="main" type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button style-type="main" type="multiple">
    <znl-button-menu :disabled="true">按钮1</znl-button-menu>
    <znl-button-menu :disabled="true">按钮2</znl-button-menu>
    <znl-button-menu :disabled="true">按钮3</znl-button-menu>
  </znl-button>

  <znl-button :disabled="true" style-type="main" :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button type="text" :disabled="true">
    <span>文本按钮</span>
  </znl-button>
</div>

<div class="znl-row">
  <znl-button :disabled="true" style-type="mac">
    默认按钮
  </znl-button>

  <znl-button :disabled="true" style-type="mac" type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button style-type="mac" type="multiple">
    <znl-button-menu :disabled="true">按钮1</znl-button-menu>
    <znl-button-menu :disabled="true">按钮2</znl-button-menu>
    <znl-button-menu :disabled="true">按钮3</znl-button-menu>
  </znl-button>

  <znl-button :disabled="true" style-type="mac" :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button type="text" :disabled="true">
    <span>文本按钮</span>
  </znl-button>
</div>

<div class="znl-row">
  <znl-button style-type="link" :disabled="true">
    默认按钮
  </znl-button>

  <znl-button style-type="link" :disabled="true" type="countdown" :time-delay="30">
    <span>倒计时按钮</span>
  </znl-button>

  <znl-button style-type="link" type="multiple">
    <znl-button-menu :disabled="true">按钮1</znl-button-menu>
    <znl-button-menu :disabled="true">按钮2</znl-button-menu>
    <znl-button-menu :disabled="true">按钮3</znl-button-menu>
  </znl-button>

  <znl-button style-type="link" :disabled="true" :btns='printznlbtns'>
    <span>下拉按钮</span>
  </znl-button>

  <znl-button style-type="link" type="text" :disabled="true">
    <span>文本按钮</span>
  </znl-button>
</div>

<script>
export default {
  data() {
    return {
      printznlbtns: [
        {
          name: '打印',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('123')
          }
        },
        {
          name: '确定',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('124')
          }
        }
      ]
    }
  }
}
</script>

```
:::

### 带图标按钮

带图标的按钮用法。

:::demo 直接在组件中写进项目中引入的字体图标即可, 下拉按钮在数据中配置`iconName`。

```html
<div class="znl-row">
  <znl-button>
  <i class="iconfont icon-table_set_btn_n"></i>默认按钮
  </znl-button>

  <znl-button type="countdown" :time-delay="30">
    <span><i class="iconfont icon-table_set_btn_n"></i>倒计时按钮</span>
  </znl-button>

  <znl-button type="multiple">
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮1</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮2</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮3</znl-button-menu>
  </znl-button>

  <znl-button :btns='printznlbtns'>
    <span><i class="iconfont icon-table_set_btn_n"></i>下拉按钮</span>
  </znl-button>

  <znl-button type="text">
    <span><i class="iconfont icon-table_set_btn_n"></i>文本按钮</span>
  </znl-button>
</div>

<div class="znl-row">
  <znl-button style-type="minor">
    <i class="iconfont icon-table_set_btn_n"></i>默认按钮
  </znl-button>

  <znl-button style-type="minor" type="countdown" :time-delay="30">
    <span><i class="iconfont icon-table_set_btn_n"></i>倒计时按钮</span>
  </znl-button>

  <znl-button style-type="minor" type="multiple">
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮1</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮2</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮3</znl-button-menu>
  </znl-button>

  <znl-button style-type="minor" :btns='printznlbtns'>
    <span><i class="iconfont icon-table_set_btn_n"></i>下拉按钮</span>
  </znl-button>

  <znl-button type="text">
    <span><i class="iconfont icon-table_set_btn_n"></i>文本按钮</span>
  </znl-button>
</div>

<script>
export default {
  data() {
    return {
      printznlbtns: [
        {
          name: '打印',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('123')
          }
        },
        {
          name: '确定',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('124')
          }
        }
      ]
    }
  }
}
</script>

```
:::


### 不同尺寸

Button 组件提供默认高度`24px`，宽度默认由内容决定，可以传入`height`和`width`自定义按钮大小。

:::demo 

```html
<div class="znl-row">
  <znl-button :height="20" style-type="mac">
    <i class="iconfont icon-table_set_btn_n"></i>默认按钮
  </znl-button>

  <znl-button :height="30" style-type="mac" type="countdown" :time-delay="30">
    <span><i class="iconfont icon-table_set_btn_n"></i>倒计时按钮</span>
  </znl-button>

  <znl-button :height="50" style-type="mac" type="multiple">
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮1</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮2</znl-button-menu>
    <znl-button-menu><i class="iconfont icon-table_set_btn_n"></i>按钮3</znl-button-menu>
  </znl-button>

  <znl-button :height="40" style-type="mac" :btns='printznlbtns'>
    <span><i class="iconfont icon-table_set_btn_n"></i>下拉按钮</span>
  </znl-button>

  <znl-button :height="30" type="text">
    <span><i class="iconfont icon-table_set_btn_n"></i>文本按钮</span>
  </znl-button>
</div>

<script>
export default {
  data() {
    return {
      printznlbtns: [
        {
          name: '打印',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('123')
          }
        },
        {
          name: '确定',
          iconName: 'icon-table_set_btn_n',
          click: () => {
            console.log('124')
          }
        }
      ]
    }
  }
}
</script>
```
:::

### Attributes
| 参数                  | 说明                                       | 默认值     | 类型      | 参数   |
| ------------------- | ---------------------------------------- | ------- | ------- | ---- |
| type                | 按钮类型 default (默认)/ countdown（倒计时）/multiple （多段按钮）/text(文本按钮) | default | String  |      |
| style-type          | 样式类型 default(默认)/main(主要按钮)/minor(次要按钮)/info(信息按钮)/mac(仿苹果)  | default | String  |      |
| btns                | 下拉选项配置（如有传该参数，则为以下拉形式展示的多按钮组）            | []      | Array   |      |
| disable-transitions | 是否禁用下拉按钮动画                               | false   | Boolean |      |
| time-delay          | time-delay 倒计时延时时间（单位秒）                  | 3       | Number  |      |
| height               | 高度                                       | 24px    | Number  |      |
| width               | 宽度                                       | auto    | Number  |      |
| suffix-text         | 倒计时间后的说明文字                               | S重发     | String  |      |
| prefix-text         | 倒计时前的说明文字                                |         | String  |      |
| tip                 | 按钮提示文字（鼠标悬浮时显示）                          |         | String  |      |
| disabled            | 是否禁用(多段按钮请使用单独属性)                        | false   | Boolean |      |
|                     |                                          |         |         |      |

### METHODS

| name           | Description | arguments | retrun |
| -------------- | ----------- | --------- | ------ |
| clearCountdown | 清除计时        |           |        |
| startCountdown | 开始/重新开始计时   |           |        |

### Events

| name  | Description | arguments |
| ----- | ----------- | --------- |
| click | 点击事件        |           |

### btns配置

- name // 按钮显示的名称
- iconName // 图标字体，需支持iconfont字体库
- click // 点击事件

### 多段按钮 **znl-button-menu**  : props

| name     | Description     | default | type          | indispensable | arguments |
| -------- | --------------- | ------- | ------------- | ------------- | --------- |
| disabled | 是否禁用(多段按钮只在此有效) | false   | Boolean       |               |           |
| width    | 单个按钮宽度          | auto    | String/Number |               |           |
| tip      | 单个按钮说明（鼠标移入显示）  |         | String        |               |           |

### 多段按钮 **znl-button-menu**  : Events

| name  | Description | arguments |
| ----- | ----------- | --------- |
| click | 点击事件        |           |