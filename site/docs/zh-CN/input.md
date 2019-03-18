<script>
  export default {
    data() {
      return {
        loading: false,
        input: '',
        input1: '',
        input2: '',
        input3: [],
        valuetest: 1,
        selectOptions: [
          {
            key: 1,
            value: '打印销售单'
          },
          {
            key: 2,
            value: '打印发货单'
          },
          {
            key: 3,
            value: '打印入库单'
          }
        ],
        restaurants:[
          {
            value: '正能量'
          },
          {
            value: '深圳'
          },
           {
            value: '上海'
          }
        ]
      };
    },
    methods: {
      remoteMethod(query) {
        console.log(query)
        const that = this;
        if (query !== '') {
          that.loading = true
          setTimeout(() => {
            that.loading = false
            that.selectOptions.push({
              key: 10,
              value: '打印销售单'
            })
            console.log(that.selectOptions)
          }, 1000)
        }
      },
      changeHandler(value) {
        console.log(1111, value)
      },
      fetchSuggestions (queryString, callback) {
        console.log(queryString)
        callback([{name: 111}])
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      clickTest () {
        this.$refs.testtest.clear()
      },
      changeDate (value) {
        console.log('input', value)
      },
      clearHandler () {
        console.log(1234)
      }
    },
    mounted() {

    }
  };
</script>

<style>
  .znl-component-input{
    margin-right: 50px;
  }
  .znl-row{
    padding-top: 30px;
  }
</style>

## Input 输入框


### 基础用法

:::demo 通过传入`border`属性决定是否是全边框, 通过`form-type`决定表单类型
```html
<div class="znl-row">
  <znl-input
    form-type="autocomplete"
    :fetch-suggestions="querySearch"
    ref="inputTest"
    v-model="input"
    placeholder="请输入内容"
    tabindex="1"
    @keydown.enter.native="$refs.inputTest.blur()">
  </znl-input>
  <znl-input
    pattern="^[0-9]*$"
    :border="true"
    v-model="input"
    placeholder="请输入内容"
    tabindex="5"
    :clearable="true"
    @clear="clearHandler">
  </znl-input>

<div>

<div class="znl-row">
  <znl-input
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容"
    tabindex="3"
    v-model="valuetest"
    filterable
    ref="testtest">
  </znl-input>
  <znl-input :border="true"
    v-model="input1"
    form-type="select"
    :select-options="selectOptions"
    tabindex="4"
    placeholder="请输入内容">
  </znl-input>
   <znl-button @click="clickTest">测试</znl-button>
<div>

<div class="znl-row">
  <znl-input
    v-model="input2"
    form-type="datepicker"
    placeholder="请输入内容"

    @change="changeDate">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input2"
    date-type="daterange"
    form-type="datepicker"
    tabindex="4"
    placeholder="请输入内容1">
  </znl-input>
<div>
<div class="znl-row">
  <znl-input
    type="textarea"
    ref="inputTest"
    v-model="input"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    type="textarea"
    placeholder="请输入内容"
     >
  </znl-input>
<div>


<script>
export default {
  data() {
    return {
      input: '',
      input1: '',
      input2: '',
      selectOptions: [
        {
          key: 1,
          value: '打印销售单'
        },
        {
          key: 2,
          value: '打印发货单'
        },
        {
          key: 3,
          value: '打印入库单'
        }
      ]
    }
  }
}
</script>
```
:::


### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<div class="znl-row">
  <znl-input
    v-model="input"
    :disabled="true"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    :disabled="true"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input1"
    :disabled="true"
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
  <znl-input :border="true"
    v-model="input1"
    :disabled="true"
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input2"
    :disabled="true"
    form-type="datepicker"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input2"
    :disabled="true"
    form-type="datepicker"
    placeholder="请输入内容">
  </znl-input>
<div>


<script>
export default {
  data() {
    return {
      input: '',
      input1: '',
      input2: '',
      selectOptions: [
        {
          key: 1,
          value: '打印销售单'
        },
        {
          key: 2,
          value: '打印发货单'
        },
        {
          key: 3,
          value: '打印入库单'
        }
      ]
    }
  }
}
</script>

```
:::

### 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```html
<div class="znl-row">
  <znl-input
    v-model="input"
    :clearable="true"
    :is-upper-case="true"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    :clearable="true"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input1"
    :clearable="true"
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
  <znl-input :border="true"
    v-model="input1"
    :clearable="true"
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input2"
    :clearable="true"
    form-type="datepicker"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input2"
    :clearable="true"
    form-type="datepicker"
    placeholder="请输入内容">
  </znl-input>
<div>


<script>
export default {
  data() {
    return {
      input: '',
      input1: '',
      input2: '',
      selectOptions: [
        {
          key: 1,
          value: '打印销售单'
        },
        {
          key: 2,
          value: '打印发货单'
        },
        {
          key: 3,
          value: '打印入库单'
        }
      ]
    }
  }
}
</script>
```
:::

### 带 icon 的输入框

带有图标标记输入类型

:::demo 通过 slot 来放置input前后图标。
```html
<div class="znl-row">
  <znl-input
    v-model="input"
    :clearable="true"
    placeholder="请输入内容">
    <span slot="prefix"><i class="iconfont icon-print_btn_ic"></i></span>
    <span slot="suffix"><i class="iconfont icon-print_btn_ic"></i></span>
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    :clearable="true"
    placeholder="请输入内容">
    <span slot="prefix"><i class="iconfont icon-print_btn_ic"></i></span>
    <span slot="suffix"><i class="iconfont icon-print_btn_ic"></i></span>
  </znl-input>
<div>

```
:::

### 带标题的表单

:::demo 通过`title`设置标题, 通过`title-width`设置标题宽度，默认50px,通过`layout`设置标题的位置。
```html
<div class="znl-row">
  <znl-input
    v-model="input"
    title="公司："
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    title="姓名："
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input1"
    title-width="80px"
    title="公司类型："
    form-type="select"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
  <znl-input :border="true"
    v-model="input1"
    title-width="80px"
    form-type="select"
    title="可选人员："
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input"
    layout="top"
    title="公司："
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    layout="top"
    title="姓名："
    placeholder="请输入内容">
  </znl-input>
<div>

```
:::

### 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制
```html
<div class="znl-row">
  <znl-input
    v-model="input"
    type="textarea"
    :clearable="true"
    :rows="5"
    placeholder="请输入内容">
  </znl-input>
<div>

```
:::


### 尺寸

:::demo 可通过`width`,`height`属性控制表单大小，默认宽`250px`，高`30px`。
```html
<div class="znl-row">
  <znl-input
    v-model="input"
    :width="150"
    :height="20"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input"
    :width="150"
    :height="20"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input1"
    form-type="select"
    :width="200"
    :height="40"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
  <znl-input :border="true"
    v-model="input1"
    form-type="select"
    :width="200"
    :height="40"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
<div>

<div class="znl-row">
  <znl-input
    v-model="input2"
    form-type="datepicker"
    :width="250"
    :height="50"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    v-model="input2"
    :width="250"
    :height="50"
    form-type="datepicker"
    placeholder="请输入内容">
  </znl-input>
<div>


<script>
export default {
  data() {
    return {
      input: '',
      input1: '',
      input2: '',
      selectOptions: [
        {
          key: 1,
          value: '打印销售单'
        },
        {
          key: 2,
          value: '打印发货单'
        },
        {
          key: 3,
          value: '打印入库单'
        }
      ]
    }
  }
}
</script>

```
:::

### 多选下拉框

:::demo 可type为`selete`的下拉选择框可以通过`multiple`属性配置为多选下拉框,绑定值必须是`数组`, `tags-clear`属性控制tags是否可以允许关闭按钮关闭。
```html

<div class="znl-row">
  <znl-input
    v-model="input3"
    form-type="select"
    :multiple="true"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
  <znl-input
    :border="true"
    :height="30"
    v-model="input3"
    :tags-clear="false"
    form-type="select"
    :multiple="true"
    :select-options="selectOptions"
    placeholder="请输入内容">
  </znl-input>
<div>

<script>
export default {
  data() {
    return {
      input3: [],
      selectOptions: [
        {
          key: 1,
          value: '打印销售单'
        },
        {
          key: 2,
          value: '打印发货单'
        },
        {
          key: 3,
          value: '打印入库单'
        }
      ]
    }
  }
}
</script>

```
:::

### 远程搜索

:::demo
```html

<div class="znl-row">
  <znl-input
    v-model="input3"
    form-type="select"
    :select-options="selectOptions"
    @input="changeHandler"
    :remote="true"
    :loading="loading"
    :remote-method="remoteMethod"
    placeholder="请输入内容">
  </znl-input>

<div>
```
:::


### 通用 Attributes

绑定值统一用 **v-model** 绑定

| 参数           | 说明                                       | 默认值     | 类型            | 可选值         |
| ------------ | ---------------------------------------- | ------- | ------------- | ----------- |
| name         | Description                              | default | type          | options     |
| border       | 是否带全边框                                   | false   | String        |             |
| form-type    | 输入类型，可选择input,下拉选择，日期选择。 对应以下不同参数 | input   | String        | input,select,datepicker,autocomplete  |
| title        | 组件标题                                     |         | String        |             |
| layout       | 布局方式，   top:title在上边； left: title在左边     | top     | String        | top,left    |
| width        | 组件宽度                                     | 250px   | String,Number | px,,number  |
| height       | 组件高度                                     | 30      | Number        |             |
| title-width  | 标题宽度(left布局有效)                           | 50px    | String        | px          |
| disabled     | 是否禁用                                     | false   | Boolean       | true,false  |
| name         | name                                     |         | String        |             |
| is-must-fill | 是否必填选项                                   | false   | Boolean       | true, false |
| is-upper-case | 是否自动转换为大写(input有效) | false | Boolean | |

### Input Attributes
| name          | Description                              | default   | type             | options                          |
| ------------- | ---------------------------------------- | --------- | ---------------- | -------------------------------- |
| type          | 类型                                       |           | String           | text / textarea                  |
| maxlength     | 最大输入长度                                   |           | Number           |                                  |
| minlength     | 最小输入长度                                   |           | Number           |                                  |
| placeholder   | 占位符                                      |           | String           |                                  |
| size          | 输入框尺寸，只在 type!="textarea" 时有效            |           | String           | medium / small / mini            |
| rows          | 输入框行数，只对 type="textarea" 有效              | 2         | Number           |                                  |
| autosize      | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | false     | Boolean / Object |                                  |
| autofocus     | 是否自动获取焦点                                 | false     | Boolean          |                                  |
| form          | input 元素所属的一个或多个表单,值必须是其所属表单的 id,如需引用一个以上的表单，请使用空格分隔的列表 |           |                  |                                  |
| resize        | 控制是否能被用户缩放                               |           | String           | none, both, horizontal, vertical |
| clearable     | 是否可以清空选项                                 | false     | Boolean          |                                  |
| pattern       | 表单验证的正则表达式                               |           | String           |                                  |
| pattern-delay | 表单验证失败时提示框显示的时间，单位s，默认3s，为0时提示框不自动关闭     | 3         | Number           |                  |
| pattern-tip   | 表单验证失败时的提示文字                             | 数据格式输入不正确 | String           |               |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | | Function(queryString, callback)| |

### Input Events

| name            | Description              | arguments                 |
| --------------- | ------------------------ | ------------------------- |
| blur            | 在 Input 失去焦点时触发          | (event: Event)            |
| focus           | 在 Input 获得焦点时触发          | (event: Event)            |
| change          | 在 Input 值改变时触发           | (value: string \| number) |
| clear           | 可清空的单选模式下用户点击清空按钮时触发     | 无                         |
| pattern-authend | 有表单验证情况下，每次失去焦点验证表单完毕时触发 | isSuccess                 |

### Input Slots

| name   | Description | type |
| ------ | ----------- | ---- |
| prefix | 输入框前置内容     |      |
| suffix | 输入框后置内容     |      |

### Input Methods

| name        | Description     | arguments      | return |
| ----------- | --------------- | -------------- | ------ |
| blur        | 在 Input 失去焦点时触发 | (event: Event) |        |
| focus       | 获得焦点时触发         | (event: Event) |        |
| change      | 在 Input 值改变时触发  | val            |        |
| handleFocus | 使input获得焦点      |                |        |



### Select Attributes

| name           | Description                              | default | type    | options |
| -------------- | ---------------------------------------- | ------- | ------- | ------- |
| value-key      | 作为 value 唯一标识的键名，绑定值为对象类型时必填             | value   | String  |         |
| clearable      | 单选时是否可以清空选项                              | false   | Boolean |         |
| placeholder    | 占位符                                      |         | String  |         |
| popper-class   | Select 下拉框的类名                            |         | String  |         |
| select-options | options的配置{value:value,key:key,disabled:disabled(是否禁用)} | []      | Array   |         |
| multiple       | 是否为多选下拉框(为true时绑定值为数组)                   | false   | Boolean |         |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制                 | 0       | Number  |         |
| tags-clear     | 多选时是否显示清除选项按钮                            | true    | Boolean |         |
| allow-create | 下拉框是否可输入 | false | Boolean | |

### Select Events

| name            | Description          | arguments            |
| --------------- | -------------------- | -------------------- |
| change          | 选中值发生变化时触发           | 选中的value对象           |
| visible-change  | 下拉框出现/隐藏时触发          | 出现则为 true，隐藏则为 false |
| clear           | 可清空的单选模式下用户点击清空按钮时触发 | 无                    |
| blur            | 在 Input 失去焦点时触发      | event                |
| focus           | 在 Input 失去得到时触发      | event                |
| remove-tag      | 多选模式下移除tag时触发        | 移除的tag               |
| multiple-change | 多选模式下点击选项改变时触发       | flag,item            |

### Select Methods

| name        | Description | arguments | return |
| ----------- | ----------- | --------- | ------ |
| handleFocus | 使input获得焦点  |           |        |
| clear | 清空数据 | | |

### Datepicker Attributes

| name              | Description                | default    | type    | options                                  |
| ----------------- | -------------------------- | ---------- | ------- | ---------------------------------------- |
| readonly          | 是否只读                       | false      | Boolean |                                          |
| editable          | 文本框可输入                     | true       | Boolean |                                          |
| clearable         | 是否显示清除按钮                   | false      | Boolean |                                          |
| placeholder       | 非范围选择时的占位内容                |            | String  |                                          |
| start-placeholder | 范围选择时开始日期的占位内容             |            | String  |                                          |
| end-placeholder   | 范围选择时结束日期的占位内容             |            | String  |                                          |
| date-type         | 显示类型                       | date       | String  | year/month/date/week/ datetime/datetimerange/daterange |
| format            | 显示在输入框中的格式                 | yyyy-MM-dd | String  | 年 yyyy，月 MM，日 dd，小时 HH，分 mm，秒 ss         |
| value-format      | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | Date       | String  |                                          |
| align             | 对齐方式                       | left       | String  | left, center, right                      |
| popper-class      | DatePicker 下拉框的类名          |            | String  |                                          |
| picker-options    | 当前时间日期选择器特有的选项参考下表         |            |         |                                          |

### picker-options配置

|                |                                          |                                |      |
| -------------- | ---------------------------------------- | ------------------------------ | ---- |
| shortcuts      | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 | Object[]                       |      |
| disabledDate   | 设置禁用状态，参数为当前日期，要求返回 Boolean              | Function                       |      |
| onPick         | 选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效 | Function({ maxDate, minDate }) |      |
| firstDayOfWeek | 周起始日                                     | Number                         | 1-7  |

### Datepicker Events

| name   | Description     | arguments                         |
| ------ | --------------- | --------------------------------- |
| change | 用户确认选定的值时触发     | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur   | 在 Input 失去焦点时触发 | event                             |
| focus  | 在 Input 失去得到时触发 | event                             |

### Datepicker Methods

| name        | Description | arguments | return |
| ----------- | ----------- | --------- | ------ |
| handleFocus | 使input获得焦点  |           |        |