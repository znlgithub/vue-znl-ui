import Upload from './src/main.vue'

/* istanbul ignore next */
Upload.install = function(Vue, opts = {}) {
    Vue.component(Upload.name, Upload);
}

export default Upload