<script>
 export default {
    data() {
      return {
   
      }
    },
    methods: {
       
    }
  };
</script>

<style>

</style>
## Chart 图表

### 基本用法
`xyoption`配置见echarts官网

:::demo 

```html


```
:::




### Attributes
| name      | Description                              | default |     type      | indispensable |
| --------- | ---------------------------------------- | :-----: | :-----------: | ------------- |
| xyoption  | 图表配置                                     |         |               | yes           |
| resizable | 是否随页面大小改变                                |  true   |    Boolean    |               |
| loading   | loading是否显示                              |  true   |    Boolean    |               |
| titles    | 标题                                       |         |    String     |               |
| height    | 组件高度（传入高度为整个组件高度，包括标题，一般用默认100%即占满整个父盒子） |  100%   | String,Number |               |
| on-ready  | 渲染前执行的方法                                 |         |   Function    |               |
| grid-show | 模块是否显示                                   |  true   |    Boolean    |               |
| onInit    | 初始化方法                                    |         |   Function    |               |
| isInit    | 是否用onInit初始化                             |  true   |    Boolean    |               |

### SLOTS
| name       | Description | type | default |
| ---------- | ----------- | ---- | ------- |

### METHODS
| name   | Description | arguments | retrun |
| ------ | ----------- | --------- | ------ |


### Events
| name  | Description | arguments |
| ----- | ----------- | :-------: |
| open  | 打开模块时的回调    |     无     |
| close | 关闭模块时的回调    |     无     |

