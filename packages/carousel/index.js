import Carousel from './src/main.vue'

/* istanbul ignore next */
Carousel.install = function(Vue, opts = {}) {
    Vue.component(Carousel.name, Carousel);
}

export default Carousel