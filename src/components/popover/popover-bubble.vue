<template>
  <Bubble
    ref="bubble"
    :get-reference="getReference"
    :placement="placement"
    :offset="offset"
    :body-class="[
      'x-popover',
      `__placement-${currentPlacement}`,
      { __arrow: showArrow },
    ]"
    :content-class="['x-popover-content', { __bordered: bordered }]"
    :show-arrow="showArrow"
    :arrow-class="[
      'x-popover-arrow',
      `__placement-${currentPlacement}`,
      { __bordered: bordered },
    ]"
    @update="currentPlacement = $event.placement"
  >
    <slot />
  </Bubble>
</template>

<script>
// TODO
// 1. 检验 CompositionAPI 改造后的稳定性
import { ref, watch } from "vue";
import Bubble from "../bubble";

export default {
  name: "XPopoverBubble",
  components: { Bubble },
  props: {
    getReference: Function,
    placement: {
      type: String,
      default: "bottom",
    },
    offset: {
      type: Array,
      default() {
        return [0, 5];
      },
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    bordered: Boolean,
    visible: Boolean,
  },
  setup(props) {
    const bubble = ref(null);
    const currentPlacement = ref(props.placement);

    watch(
      () => props.visible,
      (visible) => (visible ? bubble.value.open() : bubble.value.close())
    );

    return { bubble, currentPlacement };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";
@import "../../style/functions.scss";

$x-popover__padding: $SPACING-SMALL !default;
$x-popover__background_color: $COLOR-WHITE !default;
$x-popover__border_width: 1px !default;
$x-popover__border_color: tint($COLOR-GREY, 80%) !default;
$x-popover__border_radius: $BORDER_RADIUS-NORMAL !default;
$x-popover-arrow__size: 4px !default;

.x-popover {
  &.__arrow.__placement {
    &-top,
    &-top-start,
    &-top-end {
      margin-bottom: $x-popover-arrow__size;
    }

    &-bottom,
    &-bottom-start,
    &-bottom-end {
      margin-top: $x-popover-arrow__size;
    }

    &-left,
    &-left-start,
    &-left-end {
      margin-right: $x-popover-arrow__size;
    }

    &-right,
    &-right-start,
    &-right-end {
      margin-left: $x-popover-arrow__size;
    }
  }

  &-content {
    padding: $SPACING-NORMAL;
    color: $FONT_COLOR-NORMAL;
    font-size: $FONT_SIZE-NORMAL;
    background: $x-popover__background_color;
    border-radius: $x-popover__border_radius;
    box-shadow: 0 8px 8px rgba($COLOR-BLACK, 0.1);

    &.__bordered {
      border-width: $x-popover__border_width;
      border-color: $x-popover__border_color;
      border-style: solid;
    }
  }

  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-width: $x-popover-arrow__size;
    border-color: transparent;
    border-style: solid;

    &.__bordered {
      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: $x-popover-arrow__size - $x-popover__border_width;
        border-color: transparent;
        border-style: solid;
      }
    }

    &.__placement {
      &-top,
      &-top-start,
      &-top-end {
        bottom: -$x-popover-arrow__size * 2;
        border-top-color: $x-popover__background_color;

        &.__bordered {
          border-top-color: $x-popover__border_color;

          &::before {
            bottom: -($x-popover-arrow__size - $x-popover__border_width * 3);
            left: -($x-popover-arrow__size - $x-popover__border_width);
            border-top-color: $x-popover__background_color;
          }
        }
      }

      &-bottom,
      &-bottom-start,
      &-bottom-end {
        top: -$x-popover-arrow__size * 2;
        border-bottom-color: $x-popover__background_color;

        &.__bordered {
          border-bottom-color: $x-popover__border_color;

          &::before {
            top: -($x-popover-arrow__size - $x-popover__border_width * 3);
            left: -($x-popover-arrow__size - $x-popover__border_width);
            border-bottom-color: $x-popover__background_color;
          }
        }
      }

      &-left,
      &-left-start,
      &-left-end {
        right: -$x-popover-arrow__size * 2;
        border-left-color: $x-popover__background_color;

        &.__bordered {
          border-left-color: $x-popover__border_color;

          &::before {
            top: -($x-popover-arrow__size - $x-popover__border_width);
            right: -($x-popover-arrow__size - $x-popover__border_width * 3);
            border-left-color: $x-popover__background_color;
          }
        }
      }

      &-right,
      &-right-start,
      &-right-end {
        left: -$x-popover-arrow__size * 2;
        border-right-color: $x-popover__background_color;

        &.__bordered {
          border-right-color: $x-popover__border_color;

          &::before {
            top: -($x-popover-arrow__size - $x-popover__border_width);
            left: -($x-popover-arrow__size - $x-popover__border_width * 3);
            border-right-color: $x-popover__background_color;
          }
        }
      }
    }
  }
}
</style>
