<template>
  <Popper
    ref="popper"
    :get-reference="getReference"
    :placement="placement"
    :transition-props="{ name: 'x-bubble-transition' }"
    :offset="offset"
    :body-class="['x-bubble-body', bodyClass]"
    :content-class="contentClass"
    :show-arrow="showArrow"
    :arrow-class="arrowClass"
    :visible="visible"
    @update="$emit('update', $event)"
    ><slot v-if="rendered"
  /></Popper>
</template>

<script>
import Popper from "../popper";
import "../../animations/zoom/zoom-in.scss";
import "../../animations/zoom/zoom-out.scss";

export default {
  name: "XBubble",
  components: { Popper },
  inject: {
    xBubbleParent: { default: null },
  },
  props: {
    getReference: Function,
    placement: String,
    offset: {
      type: Array,
      default() {
        return [0, 5];
      },
    },
    bodyClass: [String, Array, Object],
    contentClass: [String, Array, Object],
    showArrow: Boolean,
    arrowClass: [String, Array, Object],
    lazyRender: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update"],
  data() {
    return {
      rendered: false,
      visible: false,
      children: [],
    };
  },
  provide() {
    return {
      xBubbleParent: this,
    };
  },
  mounted() {
    if (!this.lazyRender) this.rendered = true;
    this.register();
  },
  beforeUnmount() {
    this.unregister();
  },
  methods: {
    register() {
      if (this.xBubbleParent) this.xBubbleParent.children.push(this);
    },
    open() {
      if (!this.rendered) this.rendered = true;
      this.visible = true;
    },
    contains(el) {
      return (
        this.$el.contains(el) ||
        this.children.filter((child) => child.contains(el)).length > 0
      );
    },
    update() {
      this.$refs.popper.updatePopper();
    },
    close() {
      this.visible = false;
      this.children.forEach((child) => child.close());
    },
    unregister() {
      if (!this.xBubbleParent) return;
      this.xBubbleParent.children.splice(
        this.xBubbleParent.children.findIndex(
          (child) => child.$.uid === this.$.uid
        ),
        1
      );
    },
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-bubble {
  &-body {
    position: relative;
  }

  &[data-popper-placement="top"] &-body {
    transform-origin: bottom;
  }

  &[data-popper-placement="top-start"] &-body {
    transform-origin: left bottom;
  }

  &[data-popper-placement="top-end"] &-body {
    transform-origin: right bottom;
  }

  &[data-popper-placement="bottom"] &-body {
    transform-origin: top;
  }

  &[data-popper-placement="bottom-start"] &-body {
    transform-origin: left top;
  }

  &[data-popper-placement="bottom-end"] &-body {
    transform-origin: right top;
  }

  &[data-popper-placement="left"] &-body {
    transform-origin: right;
  }

  &[data-popper-placement="left-start"] &-body {
    transform-origin: right top;
  }

  &[data-popper-placement="left-end"] &-body {
    transform-origin: right bottom;
  }

  &[data-popper-placement="right"] &-body {
    transform-origin: left;
  }

  &[data-popper-placement="right-start"] &-body {
    transform-origin: left top;
  }

  &[data-popper-placement="right-end"] &-body {
    transform-origin: left bottom;
  }

  &-transition {
    &-enter-active {
      animation: XAnimationZoomIn 0.4s;
    }

    &-leave-active {
      animation: XAnimationZoomOut 0.2s;
    }
  }
}
</style>
