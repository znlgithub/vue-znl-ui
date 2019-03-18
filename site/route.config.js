
// const Home = () => import('./App' /* webpackChunkName: "pages/index" */)
import navConfig from './nav.config.json'

// import Home from './App.vue'

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () => {
      r(require(`site/pages/zh-CN/${name}.vue`))
    },
    'zh-CN');
  }
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () => {
      r(require(`site/docs/zh-CN${path}.md`))
    },
    'zh-CN');
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  // console.log('123', navConfig, Object.keys(navConfig))
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : page.path === '/standard'
        ? load(lang, 'standard')
        :loadDocs(lang, page.path);

    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let routes = registerRoute(navConfig);

// routes = routes.concat( [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     meta: {
//       title: '首页',
//       closable: false,
//       display: false
//     }
//   }
// ])

// console.log(routes)

export default routes