<template>
  <Bubble
    ref="bubble"
    :get-reference="getReference"
    :placement="placement"
    :body-class="[
      'x-tooltip',
      `__placement-${currentPlacement}`,
      { __arrow: showArrow },
    ]"
    content-class="x-tooltip-content"
    :show-arrow="showArrow"
    :arrow-class="['x-tooltip-arrow', `__placement-${currentPlacement}`]"
    @update="currentPlacement = $event.placement"
  >
    {{ content }}
  </Bubble>
</template>

<script>
import Bubble from "../../components/bubble";

// TODO
// 1. 延迟打开
export default {
  name: "XTooltipBubble",
  components: { Bubble },
  props: {
    getReference: Function,
    showArrow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      placement: "top",
      currentPlacement: "top",
      content: "",
    };
  },
  methods: {
    open() {
      this.$refs.bubble.open();
    },
    setPlacement(placement) {
      this.placement = placement || "top";
    },
    setContent(content) {
      this.content = content;
    },
    close() {
      this.$refs.bubble.close();
    },
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

$x-tooltip__padding: $SPACING-SMALL !default;
$x-tooltip__max_width: 300px !default;
$x-tooltip__font_color: $COLOR-WHITE !default;
$x-tooltip__font_size: $FONT_SIZE-SMALL !default;
$x-tooltip__background_color: rgba($COLOR-BLACK, 0.9) !default;
$x-tooltip__border_radius: $BORDER_RADIUS-NORMAL !default;
$x-tooltip__box_shadow: 0 4px 4px rgba($COLOR-BLACK, 0.2) !default;
$x-tooltip-arrow__size: 4px !default;

.x-tooltip {
  &.__arrow.__placement {
    &-top,
    &-top-start,
    &-top-end {
      margin-bottom: $x-tooltip-arrow__size;
    }

    &-bottom,
    &-bottom-start,
    &-bottom-end {
      margin-top: $x-tooltip-arrow__size;
    }

    &-left,
    &-left-start,
    &-left-end {
      margin-right: $x-tooltip-arrow__size;
    }

    &-right,
    &-right-start,
    &-right-end {
      margin-left: $x-tooltip-arrow__size;
    }
  }

  &-content {
    padding: $x-tooltip__padding;
    max-width: $x-tooltip__max_width;
    color: $x-tooltip__font_color;
    font-size: $x-tooltip__font_size;
    line-height: 1.8em;
    letter-spacing: 0.02em;
    word-wrap: break-word;
    word-break: normal;
    background: $x-tooltip__background_color;
    border-radius: $x-tooltip__border_radius;
    box-shadow: $x-tooltip__box_shadow;
  }

  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-width: $x-tooltip-arrow__size;
    border-color: transparent;
    border-style: solid;

    &.__placement {
      &-top,
      &-top-start,
      &-top-end {
        bottom: -$x-tooltip-arrow__size * 2;
        border-top-color: $x-tooltip__background_color;
      }

      &-bottom,
      &-bottom-start,
      &-bottom-end {
        top: -$x-tooltip-arrow__size * 2;
        border-bottom-color: $x-tooltip__background_color;
      }

      &-left,
      &-left-start,
      &-left-end {
        right: -$x-tooltip-arrow__size * 2;
        border-left-color: $x-tooltip__background_color;
      }

      &-right,
      &-right-start,
      &-right-end {
        left: -$x-tooltip-arrow__size * 2;
        border-right-color: $x-tooltip__background_color;
      }
    }
  }
}
</style>
