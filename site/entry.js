import Vue from 'vue';
import entry from './app.vue';
import VueRouter from 'vue-router';
// import Element from '~/index.js';
import ElementUi from '~node_modules/element-ui/lib/element-ui.common.js'
import VueZnlUi from 'main/index.js'
// import VueZnlUi from '../dist/vue-znl-ui.js'
import routes from './route.config';
import demoBlock from './components/demo-block.vue';
import MainFooter from './components/footer/footer';
import MainHeader from './components/header/header';
import SideNav from './components/side-nav.vue';
import FooterNav from './components/footer-nav.vue';
import title from './i18n/title.json';

import '~node_modules/element-ui/packages/theme-chalk/src/index.scss'
import 'packages/theme-chalk/src/index.scss'

import 'site/styles/base.scss'

// console.log(VueZnlUi)

Vue.use(ElementUi);
Vue.use(VueZnlUi);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Vueznlui';
});

new Vue({ // eslint-disable-line
  render: h => h(entry),
  router
}).$mount('#app');
