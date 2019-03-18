<template>
  <div
    v-show="ready"
    class="znl-carousel__item"
    :class="{
      'is-active': active,
      'znl-carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating &&  $parent.type !== 'bln',
      'is-breathing-light': $parent.type === 'bln'
    }"
    @click="handleItemClick"
    :style="carouselItemStyle">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="znl-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import {PROCESSINDEX, PROCESSANIMATING} from './processIndex'
  const CARD_SCALE = 0.83;
  export default {
    name: 'ZnlCarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    computed: {
      carouselItemStyle () {
        let vertical = this.$parent.type === 'vertical'
        let style = {}
        const itemCount = this.$parent.itemCount;

        style.msTransform = `translate${vertical?'Y':'X'}(${ this.translate }px) scale(${ this.scale })`
        style.webkitTransform = `translate${vertical?'Y':'X'}(${ this.translate }px) scale(${ this.scale })`
        style.transform = `translate${vertical?'Y':'X'}(${ this.translate }px) scale(${ this.scale })`

        style.opacity = this.opacity

        if (this.$parent.type === 'vertical') {
          style.width='100%';
          style.height = `${(1 / itemCount * 100).toFixed(2)}%`
        } else if (this.$parent.type !== 'card') {
          style.height = '100%';
          style.width = `${(1 / itemCount * 100).toFixed(2)}%`
        }

        return style
      }
    },

    data() {
      return {
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false,
        opacity: 1,
        initEnd: false
      };
    },

    methods: {
      processIndex(index, activeIndex, length) {
        const itemCount = this.$parent.itemCount;
        return PROCESSINDEX({itemCount, index, activeIndex, length})
      },

      calculateTranslate(index, activeIndex, parentWidth) {
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },

      translateItem(index, activeIndex, oldIndex) {
        // 偏移计算
        this.$nextTick(() => {
          const parentWidth = this.$parent.$el.offsetWidth;
          const parentHeight = this.$parent.$el.offsetHeight;
          const length = this.$parent.items.length;
          const itemCount = this.$parent.itemCount;
          const parentType = this.$parent.type;
          if (parentType !== 'card' && oldIndex !== undefined) {
            this.animating = PROCESSANIMATING({itemCount, index, activeIndex, oldIndex, length})
            // 呼吸灯模式去除动画
            if (parentType === 'bln') {
              this.opacity = index === activeIndex ? 1 : 0
              this.animating = false
            }
          }
          // 计算index
          if (index !== activeIndex && length > 2) {
            index = this.processIndex(index, activeIndex, length);
          }
          if (length === itemCount) {
            // 长度等于每页的个数时不切换
            this.active = index === activeIndex
            !this.initEnd && (this.translate = parentWidth * (index - activeIndex ) / itemCount);
            this.initEnd = true
          } else {
            // 卡片风格
            if (parentType === 'card') {
              this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
              this.active = index === activeIndex;
              this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
              this.scale = this.active ? 1 : CARD_SCALE;
            } else {
              this.active = index === activeIndex;
              let offset = itemCount < 3 ? 0 : (itemCount % 2 ===0) ? Math.floor(itemCount / 2) - 1 : Math.floor(itemCount / 2)
              if (parentType === 'vertical') {
                // 垂直模式按高度计算
                this.translate = parentHeight * (index - activeIndex + offset) / itemCount;
              } else {
                this.translate = parentWidth * (index - activeIndex + offset) / itemCount;
              }
            }
          }

          this.ready = true;
        })
      },

      handleItemClick() {
        const parent = this.$parent;
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this);
          parent.setActiveItem(index);
        }
      }
    },

    created() {
      this.$parent && this.$parent.updateItems();
    },

    destroyed() {
      this.$parent && this.$parent.updateItems();
    }
  };
</script>
