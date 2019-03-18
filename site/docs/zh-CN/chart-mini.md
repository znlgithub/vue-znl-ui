<script>
 export default {
    data() {
      return {
        loading: false,
        line: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '80px',
            right: '20px',
            top: '30px',
            bottom: '30px'
          },
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c5c5c5'
              }
            },
            data: []
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#c5c5c5'
              }
            }
          },
          series: [{
            name: '金额',
            type: 'line',
            data: [],
            width: '500px',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#EE7700',
                lineStyle: {
                  color: '#EE7700'
                },
                areaStyle: {
                  type: 'default',
                  // color: '#fef2e5'
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#EE7700' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#EEF2F5' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            }
          }]
        }
      }
    },
    methods: {
       
    }
  };
</script>

<style>

</style>
## ChartMini 小图表

### 基本用法
`xyoption`配置见echarts官网

:::demo 

```html
<znl-chart-mini
  titles="销售趋势"
  :xyoption="line"
  :loading="loading"
  :grid-show="true"
  width="100%"
  height="300px"
  backgroundColor="transparent"
  class="index-charts">
</znl-chart-mini>

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
| onInit    | 初始化方法（非必要参数，如果存在则会自动执行）                             |         |   Function    |               |
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

