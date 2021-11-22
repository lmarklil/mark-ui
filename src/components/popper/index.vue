<template>
  <div :class="['x-popper', { __smooth: smooth && entered }]">
    <Transition v-bind="mergedTransitionProps">
      <div v-show="visible" :class="bodyClass">
        <div :class="contentClass">
          <slot />
        </div>
        <div v-if="showArrow" :class="arrowClass" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

// TODO
// 1. 内容更新后更新popper
// 2. 可选择是否append到body上
export default {
  name: "XPopper",
  props: {
    getReference: {
      type: Function,
      required: true,
    },
    placement: {
      type: String,
      default: "bottom",
    },
    transitionProps: Object,
    offset: {
      type: Array,
      default() {
        return [0, 0];
      },
    },
    bodyClass: [String, Array, Object],
    contentClass: [String, Array, Object],
    showArrow: Boolean,
    arrowClass: [String, Array, Object],
    smooth: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update"],
  data() {
    return {
      entered: false,
    };
  },
  computed: {
    mergedTransitionProps() {
      return {
        ...this.transitionProps,
        onBeforeEnter: () => {
          if (this.transitionProps && this.transitionProps.onBeforeEnter) {
            this.transitionProps.onBeforeEnter();
          }
          this.createPopper();
        },
        onAfterEnter: () => {
          this.entered = true;
        },
        onBeforeLeave: () => {
          this.entered = false;
        },
        onAfterLeave: () => {
          this.destroyPopper();
          if (this.transitionProps && this.transitionProps.onAfterLeave) {
            this.transitionProps.onAfterLeave();
          }
        },
      };
    },
  },
  mounted() {
    if (this.visible) this.createPopper();
  },
  beforeUnmount() {
    this.destroyPopper();
  },
  methods: {
    createPopper() {
      if (this.popper) return;
      this.popper = createPopper(this.getReference(), this.$el, {
        placement: this.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: this.offset,
            },
          },
          {
            name: "arrow",
            options: {
              padding: 5,
            },
          },
        ],
        onFirstUpdate: (state) => this.$emit("update", state),
      });
    },
    updatePopper() {
      if (!this.popper) return;
      this.popper.update();
    },
    destroyPopper() {
      if (!this.popper) return;
      this.popper.destroy();
      this.popper = null;
    },
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

$x-popper__zIndex: 100 !default;

.x-popper {
  z-index: $x-popper__zIndex;

  &.__smooth {
    transition: $TRANSITION_DURATION-NORMAL;
  }
}
</style>
