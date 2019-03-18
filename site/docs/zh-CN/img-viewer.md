<script>
 export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
       
    }
  };
</script>

<style>

</style>
## ImgViewer 图片查看器

### 基本用法

:::demo 
```html
<znl-button @click.stop="visible=true">打开</znl-button>
<znl-img-viewer
  :visible.sync="visible"
  title="测试"
  :img-src-array="['http://vitozhang.oss-cn-shenzhen.aliyuncs.com/domesticbrand/ybErsP_1532432327271.png', 'http://vitozhang.oss-cn-shenzhen.aliyuncs.com/domesticbrand/MZ8jY4_1532432330029.jpg']">
</znl-img-viewer>


```
:::




### Attributes
| name          | Description | default |     type      | indispensable |
| ------------- | ----------- | :-----: | :-----------: | ------------- |
| img-src-array | 图片地址数组      |         |     Array     | yes           |
| initial-index | 初始激活索引      |    0    |    Number     |               | 
| visible       | 模块是否显示      |  false  |    Boolean    |               |

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

