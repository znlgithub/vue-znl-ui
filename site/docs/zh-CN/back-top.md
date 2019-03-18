<style>
#back-top-test{
  /* height: 800px; */
  width: 200px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.back-box{
  height: 500px;
  overflow-y: auto;
  border: 1px solid green;
  
}
.my_backtop{
  bottom: 150px;
  font-weight: 700;
  color: red;
}
</style>

<script>
  export default {
    methods: {
      target () {
        return  document.querySelector('.el-scrollbar__wrap')
      },

      clickHandlerCb () {
        console.log('点击回调')
      }
    },
    data() {
      return {
        
      };
    },
    mounted () {
    }
  };
</script>

## BackTop 回到顶部


### 基础用法
默认到达400px高度时出现
:::demo
```html
<div class="back-box">
  <div id="back-top-test" ref="backtoptest" >
    <znl-back-top >
    </znl-back-top>
  </div>
</div>

<style>
#back-top-test{
  /* height: 800px; */
  width: 200px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.back-box{
  height: 500px;
  overflow-y: auto;
  border: 1px solid green;
  
}
.my_backtop{
  bottom: 150px;
  font-weight: 700;
  color: red;
}
</style>

<script>
  export default {
    methods: {
      target () {
        return  document.querySelector('.el-scrollbar__wrap')
      }
    }
  };
</script>
```
:::

### 自定义内容
可以自定义内容及到达高度
:::demo 
```html
<div class="back-box">
  <div id="back-top-test" ref="backtoptest" >
    <znl-back-top
      class="my_backtop"
      :target="target" 
      :visibility-height="100"
      :click-handler-cb="clickHandlerCb">
      <span>top</span>
    </znl-back-top>
  </div>
</div>

<style>
#back-top-test{
  /* height: 800px; */
  width: 200px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.back-box{
  height: 500px;
  overflow-y: auto;
  border: 1px solid green;
  
}
.my_backtop{
  bottom: 150px;
  font-weight: 700;
  color: red;
}
</style>

<script>
  export default {
    methods: {
      target () {
        return  document.querySelector('.el-scrollbar__wrap')
      },

      clickHandlerCb () {
        console.log('点击回调')
      }
    }
  };
</script>
```
:::



### Attributes
| name                  | Description            | default |   type   |
| -------------------- | ------------------- | ------------- | ----- |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => window | Function |
| visibility-height | 滚动高度达到此参数值才出现 `BackTop` | 400 | Number |
| click-handler-cb | 点击按钮的回调函数 |  | Function |


### 方法
| name          | Description | arguments | retrun |
| ------------- | ----------- | --------- | ------ |


### Events
| name              | Description  | arguments  |
| ----------------- | ------------ | :--------: |



### Scoped Slot
| name   | Description |
| ------ | ----------- |
| 默认 | |