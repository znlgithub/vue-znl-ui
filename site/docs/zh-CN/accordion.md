<style>
  
</style>

<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        datas: [
          {
            name: '库存推广',
            isUnfold: true,
            click: () => {
            },
            scope: [
              {
                title: '管理推广库存',
                name: 'Pubstocklist',
                isUnfold: true,
                click: () => {
                  console.log('123456')
                },
                scope: [
                  {
                    title: '二级',
                    active: true,
                    name: 'two',
                    click: () => {
                      console.log('222')
                    }
                  }
                ]
              }
            ]
          },
          {
            name: '库存推广2',
            isUnfold: false,
            scope: [
              {
                title: '管理推广库存3'
              },
              {
                title: '管理推广库存4'
              },
              {
                title: '管理推广库存5'
              }
            ]
          }
        ]
      };
    }
  };
</script>

## Accordion 折叠面板


### 基础用法


:::demo
```html
<znl-accordion
  :datas="datas"
  :router="false"
  >
  <div></div>
</znl-accordion>
<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        datas: [
          {
            name: '库存推广',
            isUnfold: true,
            click: () => {
            },
            scope: [
              {
                title: '管理推广库存',
                name: 'Pubstocklist',
                isUnfold: true,
                click: () => {
                  console.log('123456')
                },
                scope: [
                  {
                    title: '二级',
                    active: true,
                    name: 'two',
                    click: () => {
                      console.log('222')
                    }
                  }
                ]
              }
            ]
          },
          {
            name: '库存推广2',
            isUnfold: false,
            scope: [
              {
                title: '管理推广库存3',
                scope: undefined
              },
              {
                title: '管理推广库存4'
              },
              {
                title: '管理推广库存5'
              }
            ]
          }
        ]
      };
    }
  };
</script>
```
:::





### Attributes
| name        | Description | default |  type   | indispensable | arguments |
| ----------- | ----------- | :-----: | :-----: | ------------- | --------- |
| datas       | 数据          |   []    |  Array  |               |           |
| line-height | 二级面板行高      |   30    | Number  |               |           |
| router      | 是否为router跳转 |  true   | Boolean |               |           |

### datas配置字段
| name                | Description |
| ------------------- | ----------- | 
|title  | 标题 |
|isUnfold  | 是否展开 |
|scope | 子元素 |
| active      | 是否选中状态 |
| disabled | 禁用（不显示） |

### datas配置可选字段
| name                | Description |
| ------------------- | ----------- | 
|click | 点击事件方法



### 方法

| 方法名             | 说明                                       | 参数                                       |
| --------------- | ---------------------------------------- | ---------------------------------------- |

### Events
| name          | Description    | arguments |
| ------------- | -------------- | --------- |
| changing-over | 切换面板展开及收缩后触发 | 当前节点数据    |


### Scoped Slot
| name   | Description |
| ------ | ----------- |
