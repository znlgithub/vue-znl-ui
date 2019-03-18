import LinkAll from './src/main.vue'

LinkAll.install = function(Vue, opts = {}) {
    Vue.component(LinkAll.name, LinkAll);
}

export default LinkAll