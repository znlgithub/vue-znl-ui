<style>
  .hljs{
   display: block;
  }
</style>
## 快速上手

### 引入 vue-znl-ui

可以引入整个vue-znl-ui，或是根据需要仅引入部分组件。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import vueZnlUi from 'vue-znl-ui'
import 'vue-znl-ui/dist/theme-chalk/index.css';

Vue.use(vueZnlUi)
```

注意样式文件需要单独引入。

### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)可以只引入需要的组件，以达到减小项目体积的目的。

安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "vue-znl-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

如果只希望引入部分组件，比如 Button 和 Lists，需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Lists } from 'vue-znl-ui';
import App from './App.vue';

Vue.use(Button)
Vue.use(Lists)

```

完整组件列表和引入方式

```javascript
import Vue from 'vue';
import { 
  BaseFlexGrid,
  ActionFlexGrid,
  GridModule,
  Chart,
  ChartMini,
  GridDialog,
  ImgViewer,
  Dialog,
  DialogMini,
  Input,
  Lists,
  Button,
  ButtonMenu，
  Tree,
  FloatList，
  Accordion，
  Step，
  Steps,
  Transition,
  LinkAll,
  Scrollbar,
  BackTop,

  Multiples,
  Multiple,
  Spa,
  LeftRight,
  TopBottom
} from 'vue-znl-ui'

Vue.use(Baseflexgrid) // 基础展示表格
Vue.use(Actionflexgrid)
Vue.use(Gridmodule) // 完整表格
Vue.use(Chart) // 完整图表
Vue.use(ChartMini) // 小型图表
Vue.use(Imgviewer) // 图片查看
Vue.use(Dialog) // 弹窗
Vue.use(DialogMini)
Vue.use(Griddialog) // 数据选择弹窗
Vue.use(Input) // 表单
Vue.use(Lists) // 列表
Vue.use(Button) // 按钮组件
Vue.use(ButtonMenu) // 按钮组件
Vue.use(Tree) // 文件树
Vue.use(FloatList) // 浮动列表
Vue.use(Accordion) // 折叠面板
Vue.use(Step) // 步骤条
Vue.use(Steps) // 步骤条
Vue.use(Transition) // 隐藏/显示过渡动画组件
Vue.use(LinkAll) // linkALl
Vue.use(Scrollbar) // 滚动条
Vue.use(BackTop) // 回到顶部

Vue.use(Multiples)
Vue.use(Multiple)
Vue.use(Spa)
Vue.use(LeftRight)
Vue.use(TopBottom)
```


