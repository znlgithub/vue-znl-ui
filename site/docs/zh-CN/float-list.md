<style>
  
</style>

<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        floatListData: [
          {
            name: '打印本表'
          },
          {
            name: '打印全部表单'
          }
        ]
      };
    }
  };
</script>

## FloatList 悬浮列表

用悬浮结构触发数组列表数据。

### 基础用法

基础的树形结构展示。

:::demo
```html

<znl-float-list :lists="floatListData" :disable-transitions="false">

  <znl-button :height="30" :width="200">FloatList</znl-button>

</znl-float-list>

```
:::





### Attributes
| name                | Description | default |  type   | indispensable | arguments |
| ------------------- | ----------- | :-----: | :-----: | ------------- | --------- |
| lists               | 悬浮列表数组      |   []    |  Array  |               |           |
| disable-transitions | 是否禁用下拉按钮动画  |  false  | Boolean |               |           |

### lists配置必含字段
| name                | Description |
| ------------------- | ----------- | 
| name | 显示在列表的lable |
| iconName | 字体库中包含的字体类 |
| click | 点击事件 |
| isShow | 是否显示 |



### 方法

| 方法名             | 说明                                       | 参数                                       |
| --------------- | ---------------------------------------- | ---------------------------------------- |

### Events
| name               | Description  |          arguments          |
| ------------------ | ------------ | :-------------------------: |


### Scoped Slot
| name   | Description |
| ------ | ----------- |
| header | 悬浮列表头部slot  |
| footer | 悬浮列表底部slot  |
