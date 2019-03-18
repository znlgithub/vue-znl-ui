<template>
  <div
    class="znl-step"
    :style="style"
    :class="[
      isLast && !space && !isCenter && 'is-flex',
      isCenter && 'is-center'
    ]">
    <div class="znl-step__top">
      <div
        class="znl-step__header"
        ref="header"
        :class="['is-' + currentStatus]">
        <slot name="header">{{ header }}</slot>
      </div>
    </div>
    <!-- icon & line -->
    <div
      class="znl-step__head"
      :class="`is-${currentStatus}`">
      <div
        class="znl-step__line"
        :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
      >
        <span class="znl-step__line-inner" :style="lineStyle" ref="stepLine">
          <i class="znl-step__line-inner-in" :style="lineInStyle"></i>
        </span>
      </div>

      <div class="znl-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon">
          <div :class="[index+1 ===$parent.active ? 'active' : '']">
            <i v-if="index+1 < $parent.active && currentStatus==='finish'" class="znl-step__icon-inner iconfont" :class="[icon]"></i>
            <div class="znl-step__icon-inner" v-else>{{ index + 1 }}</div>
          </div>
        </slot>
        <i
          v-else
          :class="['znl-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
          class="znl-step__icon-inner is-status"
        >
        </i>
      </div>
    </div>
    <!-- title & description -->
    <div class="znl-step__main">
      <div
        class="znl-step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        class="znl-step__description"
        :class="['is-' + currentStatus]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <div :class='["znl-step__content"]' ref="znlstepContent" :style="stepContentStyle" v-if="index + 1 ===$parent.active">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'ZnlStep',

    props: {
      title: String,
      header: String,
      icon: {
        type: String,
        default: 'icon-bomlist_save_btn1'
      },
      description: String,
      status: String
    },

    data () {
      return {
        index: -1,
        lineStyle: {},
        lineInStyle: {},
        stepContentStyle: {},
        internalStatus: ''
      }
    },

    beforeCreate() {
      this.$parent.steps.push(this);
    },

    beforeDestroy() {
      const steps = this.$parent.steps;
      const index = steps.indexOf(this);
      if (index >= 0) {
        steps.splice(index, 1);
      }
    },

    computed: {
      currentStatus() {
        return this.status || this.internalStatus;
      },
      prevStatus() {
        const prevStep = this.$parent.steps[this.index - 1];
        return prevStep ? prevStep.currentStatus : 'wait';
      },
      isCenter() {
        return this.$parent.alignCenter;
      },
      isVertical() {
        return this.$parent.direction === 'vertical';
      },
      isSimple() {
        return this.$parent.simple;
      },
      isLast() {
        const parent = this.$parent;
        return parent.steps[parent.steps.length - 1] === this;
      },
      stepsCount() {
        return this.$parent.steps.length;
      },
      space() {
        const { isSimple, $parent: { space } } = this;
        return isSimple ? '' : space ;
      },
      style: function() {
        const style = {};
        const parent = this.$parent;
        const len = parent.steps.length;

        const space = (typeof this.space === 'number'
          ? this.space + 'px'
          : this.space
            ? this.space
            : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
        style.flexBasis = space;
        if (this.isVertical) return style;
        if (this.isLast) {
          style.maxWidth = 100 / this.stepsCount + '%';
        } else {
          style.marginRight = -this.$parent.stepOffset + 'px';
        }

        return style;
      }
    },

    methods: {
      updateStatus(val) {
        const prevChild = this.$parent.$children[this.index - 1];
        if (val > this.index) {
          this.internalStatus = this.$parent.finishStatus;
        } else if (val === this.index && this.prevStatus !== 'error') {
          this.internalStatus = this.$parent.processStatus;
        } else {
          this.internalStatus = 'wait';
        }

        if (prevChild) prevChild.calcProgress(this.internalStatus);
      },

      calcProgress(status) {
        let step = 100;
        const style = {};

        if (status === this.$parent.processStatus) {
          step = this.currentStatus !== 'error' ? 0 : 0;
        } else if (status === 'wait') {
          step = 0;
        }

        style.borderWidth = step ? '5px' : 0;
        style.width = step + '%';

        this.lineStyle = style;

        this.$nextTick(() => {
          let width = this.$refs.stepLine.offsetWidth - 30
          this.lineInStyle = {
            width: step ? width + 'px' : '0',
            borderWidth: step ? '5px' : '0',
            zIndex: this.isCenter ? '' : '1'
          }

          let parentWidth = this.$parent.$el.offsetWidth
          
          this.stepContentStyle = {
            width: parentWidth + 'px'
          }
        })
      }
    },

    mounted() {
      const unwatch = this.$watch('index', val => {
        this.$watch('$parent.active', this.updateStatus, { immediate: true });
        unwatch();
      });

      const index = this.$parent.steps.indexOf(this);
      this.index = index
    }
  }
</script>