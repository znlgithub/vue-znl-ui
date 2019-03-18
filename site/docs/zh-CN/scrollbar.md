<style>
.container{
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
}
.test{
  line-height: 20px;
  margin: 20px 0;
  padding: 0 20px;
}
.demo{
  width: 500px;
}
</style>

<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        list: [
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'}
        ],
        wrapStyle: {
          color: 'red',
          backgroundColor: '#F2f2f2'
        },
        viewStyle: {
          fontWeight: '900'
        }
      };
    }
  };
</script>

## 滚动条组件
鼠标悬浮时滚动条出现，离开时消失

### 纵向
只在纵向高度超出父盒子

:::demo
```html
<div class="container">
  <znl-scrollbar
    tag="ul"
    :wrap-style="wrapStyle"
    wrap-class="abc"
    :view-style="viewStyle"
    view-class="xyz"
    :noresize="true"
    >
    <li v-for="item in list" class="test">{{item.name}}</li>
  </znl-scrollbar>
</div>
<style>
.container{
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
}
.test{
  line-height: 20px;
  margin: 20px 0;
  padding: 0 20px;
}
.demo{
  width: 500px;
}
</style>

<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        list: [
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'}
        ],
        wrapStyle: {
          color: 'red',
          backgroundColor: '#F2f2f2'
        },
        viewStyle: {
          fontWeight: '900'
        }
      };
    }
  };
</script>
```
:::

### 纵、横向
在纵横方向宽高均超出父盒子

:::demo
```html
<div class="container">
  <znl-scrollbar
    tag="ul"
    >
    <li v-for="item in list" class="test demo">{{item.name}}</li>
  </znl-scrollbar>
</div>
<style>
.container{
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
}
.test{
  line-height: 20px;
  margin: 20px 0;
  padding: 0 20px;
}
.demo{
  width: 500px;
}
</style>

<script>
  export default {
    methods: {
    
    },
    data() {
      return {
        list: [
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'},
          {name: 'znl'}
        ]
      };
    }
  };
</script>
```
:::



### Attributes
| name                  | Description            | default |   type   | indispensable |
| --------------------- | ---------------------- | :-----: | :------: | ------------- |
| tag | 包含znl-scrollbar下dom的标签名 | div | String | |
| wrap-style | 滚动区域范围内容的样式 | | Object ||
| wrap-class | 滚动区域范围内容的class | | String ||
| view-style | 滚动内容的样式 | | Object ||
| view-class | 滚动内容的class | | String ||
| noresize | 如果container尺寸不会发生变化，最好设置它为true可以优化性能 | false | Boolean ||



### 方法
| name          | Description | arguments | retrun |
| ------------- | ----------- | --------- | ------ |

### Events
| name              | Description  | arguments  |
| ----------------- | ------------ | :--------: |


### Scoped Slot
| name   | Description |
| ------ | ----------- |
