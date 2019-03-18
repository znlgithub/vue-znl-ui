<template>
  <div class="znl-accordion">

    <div class="accordion-wrapper">

      <div
        class="accordion-body"
        v-for="(item, index) in datas"
        :key="index"
        v-if="!item.disabled"
        >

        <div
          class="accordion-header"
          @click.stop="accordionHeaderClick(item, index, $event)">

          <span class="accordion-line"></span>{{item.name}}

          <i :class="['unfold-icon', 'iconfont', !item.isUnfold?'icon-arrow_retract_btn' : 'icon-arrow_unfold_btn']"></i>

        </div>

        <znl-collapse-transition>

          <div class="accordion-child" v-show="item.isUnfold">
            <div v-for="(child, j) in item.scope" :key="j" v-if="!child.disabled">
              <div
                :class="['accordion-row', child.active ? 'active':'']"
                @click.stop="accordionChildClick(child, true)"
                :style="{
                  'line-height': lineHeight + 'px'
                }">
                <span 
                  :class="[!child.scope ? 'accordion-row-title' : 'accordion-row-title_blod']"
                  :style="{
                    'line-height': lineHeight + 'px'
                  }">
                  {{child.title}}
                </span>

                <znl-collapse-transition>

                  <div class="accordion-child" v-show="child.isUnfold">
                    <div v-for="(val, j) in child.scope" :key="j" v-if="!val.disabled">
                      <div
                        :class="['accordion-row', 'accordion-row-body', val.active ? 'active':'']"
                        @click.stop="accordionChildClick(val, false)"
                        :style="{
                          'line-height': lineHeight + 'px'
                        }">
                        {{val.title}}

                        
                      </div>
                    </div>
                  </div>
                  
                </znl-collapse-transition>

              </div>
            </div>
          </div>
          
        </znl-collapse-transition>

      </div>

    </div>

  </div>
</template>
<script>
  import ZnlCollapseTransition from 'packages/transition/collapse-transition'

  export default{

    name: 'znl-accordion',

    components: {
      ZnlCollapseTransition
    },

    props: {
      datas: {
        type: Array,
        default () {
          return []
        }
      },
      lineHeight: {
        type: Number,
        default: 30
      },
      router: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        activeRow: {}
      }
    },

    methods: {
      accordionHeaderClick (item, index, event) {
        _.isFunction(item.click) ? item.click() : ''
        this.$set(item, 'isUnfold', !item.isUnfold)
        this.$emit('changing-over', item)
      },
      accordionChildClick (child, controlShow) {
        this.activeRow = child
        if (this.router && !child.scope) {
          this.routeToItem(child)
        } else {
          _.isFunction(child.click) ? child.click() : ''
        }
        controlShow && this.accordionHeaderClick(child)
      },
      routeToItem(item, onError) {
        let route = item.name
        if (!this.$router) {
          return false
        }
        try {
          this.$router.push(route, () => {}, onError)
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>