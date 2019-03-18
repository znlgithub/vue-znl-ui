<style>

</style>
<script>
  export default {
    data() {
      let __this = this
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
            Model: 'LM358ff',
            Year: '2015-05-01',
            AdoptQty: 100,
            ProductCategory: '原装',
            StorageName: '深圳北',
            ReadOnlyBindings: ['AdoptQty']
          },
          {
            Model: 'ASTgg',
            Year: '2014-05-04',
            AdoptQty: 200,
            ProductCategory: '现货',
            StorageName: '北京'
          },
          {
            Model: 'LM357hh',
            Year: '2016-05-01',
            AdoptQty: 300,
            ProductCategory: '原装',
            StorageName: '上海'
          },
          {
            Model: 'LM356jj',
            Year: '2017-05-04',
            AdoptQty: 400,
            ProductCategory: '现货',
            StorageName: '广州'
          },
          {
            Model: 'LM359kk',
            Year: '2018-05-01',
            AdoptQty: 500,
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

## Table 表格

用于展示多条结构类似的数据。

### 基础表格

基础的表格数据展示用法。

:::demo 需要传入表格的列配置`columns`，及表格的数据`item-source`，我们规定这两个数据在初始化方法中赋值，`on-init`方法会在组件内部自动执行，如果不想自动组件执行`on-init`方法，只需传`is-init`属性为`false`即可。
```html
<znl-table
:data="itemSource"
>
  <el-table-column
    label="测试">
  </el-table-column>

  <el-table-column
    label="测试">
  </el-table-column>

  <!-- <el-table-column
    label="测试">
  </el-table-column> -->
</znl-table>
<script>
  export default {
    data () {

    }
  };
</script>

```
:::


### Table Attributes

| name    | Description  | default   | type   | indispensable | arguments                 |
| ------ | ---- | ---------- | ---- | ----------- | ---------------- |



### Table Events
| name               | Description           | arguments                                |
| ------------------ | --------------------- | ---------------------------------------- |


### Table Methods
| name            | Description                              | arguments                                | retrun |
| --------------- | ---------------------------------------- | ---------------------------------------- | ------ |


### Table Slot
| name            | Description                              |
| --------------- | ---------------------------------------- |


### column 配置
| key     | Description   | default     | type     | indispensable | arguments    |
| --------| ------------ | --------- | ---- | -------- | ------------------- |


### column.buttons配置

| key       | Description | default | type                | indispensable |
| --------- | ----------- | ------- | ------------------- | ------------- |


### column.elements配置

| key        | Description | default | type     | indispensable |
| ---------- | ----------- | ------- | -------- | ------------- |


### rightMenus右键菜单配置选项

| key      | Description | default | type     | indispensable |
| -------- | ----------- | ------- | -------- | ------------- |
