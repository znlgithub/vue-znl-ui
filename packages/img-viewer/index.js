import ImgViewer from './src/main.vue'

ImgViewer.install = function(Vue, opts = {}) {
    Vue.component(ImgViewer.name, ImgViewer);
}

export default ImgViewer