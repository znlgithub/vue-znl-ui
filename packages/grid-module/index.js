import GridModule from './src/main.vue'

GridModule.install = function(Vue, opts = {}) {
    Vue.component(GridModule.name, GridModule);
}

export default GridModule