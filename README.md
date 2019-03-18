vue-znl-ui

## 正能量vue组件库

**查看完整文档**[查看文档](https://vitozyf.github.io/vue-znl-ui/index.html#/zh-CN/component/quickstart)

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

```javascript
import Vue from 'vue';
import { Button, Lists } from 'vue-znl-ui';
import App from './App.vue';

Vue.use(Button)
Vue.use(Lists)

```


## License

[MIT](https://choosealicense.com/licenses/mit/)
  ​