<script>
  export default {
    data() {
      return {
        active: 1
      };
    },
    
    methods: {
      next() {
        if (this.active++ > 4) this.active = 0;
      },
      rpev () {
        if (this.active-- < 0) this.active = 4;
      }
    }
  }
</script>

<style>
.znl-button{
  margin-top: 10px;
}
.textData1{
  height: 100px;
  border: 1px solid #ccc;
}
.textData2{
  height: 200px;
  border: 1px solid #ccc;
}
.textData3{
  height: 300px;
  border: 1px solid #ccc;
}
.textData4{
  height: 200px;
  border: 1px solid #ccc;
}
</style>

## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个`Number`，表明步骤的 index。
```html
<znl-steps :active="active">
  <znl-step title="步骤 1" description="这是步骤 1" header="创建订单">

  </znl-step>
  <znl-step title="步骤 2" description="这是步骤 2" header="提交审核">

  </znl-step>
  <znl-step title="步骤 3" description="这是步骤 3" header="审核通过">

  </znl-step>
  <znl-step title="步骤 4" description="这是步骤 4" header="客户付款">

  </znl-step>
</znl-steps>

<znl-button @click="rpev" :width="80" :height="35">上一步</znl-button>
<znl-button @click="next" :width="80" :height="35">下一步</znl-button>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 4) this.active = 0;
      },
      rpev () {
        if (this.active-- < 0) this.active = 4;
      }
    }
  }
</script>
```
:::

### 定宽


:::demo 需要定宽的步骤条时，设置`space`属性即可，如果不设置，则为自适应。
```html
<znl-steps :active="active" space="100px">
  <znl-step title="步骤 1" description="这是步骤 1" header="创建订单">

  </znl-step>
  <znl-step title="步骤 2" description="这是步骤 2" header="提交审核">

  </znl-step>
  <znl-step title="步骤 3" description="这是步骤 3" header="审核通过">

  </znl-step>
  <znl-step title="步骤 4" description="这是步骤 4" header="客户付款">

  </znl-step>
</znl-steps>

<znl-button @click="rpev" :width="80" :height="35">上一步</znl-button>
<znl-button @click="next" :width="80" :height="35">下一步</znl-button>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 4) this.active = 0;
      },
      rpev () {
        if (this.active-- < 0) this.active = 4;
      }
    }
  }
</script>
```
:::

### 带自定义内容


:::demo 需要带自定义内容,在`znl-step`中写入任意内容即可。
```html
<znl-steps :active="active">
  <znl-step title="步骤 1" description="这是步骤 1">
    <div class="textData1">
        <div>步骤1的自定义组件内容</div>
        <znl-button>组件高度修改</znl-button>
    </div>
  </znl-step>
  <znl-step title="步骤 2" description="这是步骤 2">
     <div class="textData2">
        <div>步骤2的自定义组件内容</div>
    </div>
  </znl-step>
  <znl-step title="步骤 3" description="这是步骤 3">
    <div class="textData3">
        <div>步骤3的自定义组件内容</div>
    </div>
  </znl-step>
  <znl-step title="步骤 4" description="这是步骤 4">
    <div class="textData4">
        步骤4的自定义组件内容
    </div>
  </znl-step>
</znl-steps>

<znl-button @click="rpev" :width="80" :height="35">上一步</znl-button>
<znl-button @click="next" :width="80" :height="35">下一步</znl-button>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 4) this.active = 0;
      },
      rpev () {
        if (this.active-- < 0) this.active = 4;
      }
    }
  }
</script>
```
:::



### Steps Attributes

| name         | Description                  | default | type          | indispensable | arguments |
| ------------ | ---------------------------- | ------- | ------------- | ------------- | --------- |
| space        | 每个 step 的间距，不填写将自适应间距。支持百分比。 |         | String/Number |               |           |
| active       | 当前的激活步骤序号                    | 1       | Number        |               |           |
| align-center | 是否居中对齐                       | true    | Boolean       |               |           |


### Step Attributes
| name        | Description | default                | type   | indispensable | arguments |
| ----------- | ----------- | ---------------------- | ------ | ------------- | --------- |
| title       | 标题          |                        | String |               |           |
| description | 标题描述        |                        | String |               |           |
| icon        | 步骤完成的图标     | icon-bomlist_save_btn1 | String |               |           |


### Step Slot
| name | Description | type | default |
| ---- | ----------- | ---- | ------- |
| 自定义  |             |      |         |

### METHODS

| name      | Description         | arguments | retrun |
| --------- | ------------------- | --------- | ------ |
| heightCom | 外部高度改变时用于组件内部高度重新计算 |           |        |