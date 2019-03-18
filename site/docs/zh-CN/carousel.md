<style>
.demoblock{
  margin-bottom: 20px;
  border: 1px solid #E6E6E6;
  .box{
    height: 80%;
    width: 80%;
    background-color: #f2f2f2;
    margin: 20px auto;
  }
  .bln{
    background-color: #f2f2f2;
     height: 100%;
     width: 100%;
  }
  .vertical{
     background-color: #f2f2f2;
     height: 100px;
     width: 250px;
     margin: 17px auto;
  }
  .znl-carousel__item--card.is-active{
    .box{
      background-color: #ddd;
    }
  }
  .znl-button {
    margin-right: 10px;
  }
  /* .znl-carousel__item.is-active{
    .box{
      border: 1px solid #ee7700;
      box-sizing: border-box;
    }
  } */

  .container{
    display: flex;
    .znl-carousel{
      width: 680px;
    }
    .button{
      width: 20px;
      &>div{
        cursor: pointer;
        height: 80px;
        &:hover{
          background-color: #EE7700;
        }
      }
    }
  }
}
</style>
<script>
  export default {
    data () {
      return {
        index: 0,
        active: 'advertising'
      }
    },
    methods: {
      change (index) {
        // console.log('index', index)
      },
      setActiveItem () {
        this.$refs.znlCarousel.setActiveItem(++this.index)
        if (this.index >= 4) {
          this.index = 0
        }
      },
      setActiveItemByNama () {
         this.$refs.znlCarousel.setActiveItem('name3')
      }
    },
    mounted() {
    }
  }
</script>
## Carousel 轮播图
### 基础用法
:::demo
```html
 <div class="demoblock">
    <znl-carousel 
      height="200px"
      :autoplay="false"
      >
      <znl-carousel-item v-for="item in 5" :key="item">
        <h3 class="box">{{ item }}</h3>
      </znl-carousel-item>
    </znl-carousel>
  </div>
```
:::

### 呼吸灯模式
:::demo type="bln"
```html
 <div class="demoblock">
    <znl-carousel 
      height="200px"
      type="bln"
      arrow="never"
      :autoplay="false"
      >
      <znl-carousel-item v-for="item in 5" :key="item" :label="item">
        <h3 class="bln">{{ item }}</h3>
      </znl-carousel-item>
    </znl-carousel>
  </div>
```
:::

### 垂直模式
:::demo type="vertical"
```html
 <div class="demoblock" :style="{width: '400px',margin: '0 auto'}">
    <znl-carousel 
      height="400px"
      type="vertical"
      arrow="always"
      :item-count="3"
      :autoplay="false"
      trigger="click"
      >
      <znl-carousel-item v-for="item in 5" :key="item" :label="item">
        <h3 class="vertical">{{ item }}</h3>
      </znl-carousel-item>
    </znl-carousel>
  </div>
```
:::

### 嵌套用法

:::demo 
```html
  <div class="demoblock">
    <div class="container">
      <div class="button">
        <div @click="active='advertising'">广告创意</div>
        <div @click="active='video'">相关视频</div>
      </div>
      <znl-carousel 
        ref="znlCarousel"
        height="200px" 
        :initial-index="0" 
        indicator-position="outside"
        :autoplay="false"
        trigger="click"
        @change="change"
        :item-count="5"
        >
  
        <znl-carousel-item v-if="active==='advertising'" v-for="item in 8" :key="item" :name="`name${item}`" :label="item">
          <h3 class="box">{{ item }}广告创意</h3>
        </znl-carousel-item>

        <znl-carousel-item v-if="active==='video'" v-for="item in 10" :key="item" :name="`name${item}`" :label="item">
          <h3 class="box">{{ item }}相关视频</h3>
        </znl-carousel-item>
  
      </znl-carousel>
    </div>

    <znl-button 
      :height="30"
      @click="setActiveItem">
      手动切换
    </znl-button>

    <znl-button 
      :height="30"
      @click="setActiveItemByNama">
      指定切换
    </znl-button>

    <znl-button 
      :height="30"
      @click="$refs.znlCarousel.prev()">
      上一张
    </znl-button>

    <znl-button 
      :height="30"
      @click="$refs.znlCarousel.next()">
      下一张
    </znl-button>
  </div>

<style>
  
</style>
```
:::

### 不同风格
:::demo
```html
 <div class="demoblock">
    <znl-carousel 
      trigger="click" 
      height="150px"
      type="card"
      :autoplay="false"
      >
      <znl-carousel-item v-for="item in 4" :key="item">
        <h3 class="box">{{ item }}</h3>
      </znl-carousel-item>
    </znl-carousel>
  </div>
```
:::

### Carousel Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | 轮播的高度 | string | — | — |
| initial-index | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0 |
| trigger | 指示器的触发方式 | string | click | hover |
| autoplay | 是否自动切换 | boolean | — | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | — | 3000 |
| indicator-position | 指示器的位置 | string | outside/none | — |
| arrow | 切换箭头的显示时机 | string | always/hover/never | hover |
| type | 轮播的类型 | string | 'default', 'card'走马灯, 'vertical'垂直, 'bln'呼吸灯 | default |
| item-count | 每页显示的数量 | Number | | 1 |

### Carousel Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 轮播切换时触发 | 目前激活的轮播索引，原路轮播模块的索引 |

### Carousel Methods
| 方法名      | 说明          | 参数 |
|---------- |-------------- | -- |
| setActiveItem | 手动切换轮播 | 需要切换的轮播的索引，从 0 开始；或相应 `znl-carousel-item` 的 `name` 属性值 |
| prev | 切换至上一张轮播 | — |
| next | 切换至下一张轮播 | — |

### Carousel Slots
| name | 说明 |
|--- |--- |
| arrow-left | 左/上箭头的替代插槽 |
| arrow-right | 右/下箭头的替代插槽 |

### Carousel-Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 轮播的名字，可用作 `setActiveItem` 的参数 | string | — | — |
| label | 该轮播所对应指示器的文本 | string | — | — |
