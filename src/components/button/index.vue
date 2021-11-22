<template>
  <button
    :class="[
      'x-button',
      `__size-${size}`,
      `__type-${type}`,
      { __danger: danger, __loading: loading },
    ]"
    :type="action"
    @click="click"
    :disabled="disabled || loading"
  >
    <XSpinRing v-if="loading" class="x-button-spin" />
    <span v-if="$slots.icon" class="x-button-icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="x-button-text">
      <slot />
    </span>
  </button>
</template>

<script>
import XSpinRing from "../spin-ring";

// TODO
// 1. 优化可访问性
export default {
  name: "XButton",
  components: { XSpinRing },
  props: {
    type: {
      type: String,
      default: "normal",
    },
    action: {
      type: String,
      default: "button",
    },
    size: {
      type: String,
      default: "normal",
    },
    danger: Boolean,
    loading: Boolean,
    disabled: Boolean,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const click = (event) => {
      if (props.disabled || props.loading) return;
      emit("click", event);
    };

    return { click };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: $BORDER_RADIUS-NORMAL;
  transition: $TRANSITION_DURATION-NORMAL;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.__loading &-icon,
  &.__loading &-text {
    visibility: hidden;
  }

  &.__size {
    &-small {
      padding: 0 $SPACING-SMALL;
      height: 26px;
      font-size: $FONT_SIZE-SMALL;
    }

    &-normal {
      padding: 0 $SPACING-NORMAL;
      height: 32px;
      font-size: $FONT_SIZE-NORMAL;
    }

    &-large {
      padding: 0 $SPACING-LARGE;
      height: 38px;
      font-size: $FONT_SIZE-LARGE;
    }
  }

  &.__type {
    &-primary {
      color: $COLOR-WHITE;
      background: $COLOR-PRIMARY;
      border-color: $COLOR-PRIMARY;

      &:hover {
        background: mix($COLOR-BLACK, $COLOR-PRIMARY, 20%);
        border-color: mix($COLOR-BLACK, $COLOR-PRIMARY, 20%);
      }

      &:active {
        background: mix($COLOR-BLACK, $COLOR-PRIMARY, 40%);
        border-color: mix($COLOR-BLACK, $COLOR-PRIMARY, 40%);
      }

      &.__danger {
        background: $COLOR-DANGER;
        border-color: $COLOR-DANGER;

        &:hover {
          background: mix($COLOR-BLACK, $COLOR-DANGER, 20%);
          border-color: mix($COLOR-BLACK, $COLOR-DANGER, 20%);
        }

        &:active {
          background: mix($COLOR-BLACK, $COLOR-DANGER, 40%);
          border-color: mix($COLOR-BLACK, $COLOR-DANGER, 40%);
        }
      }
    }

    &-normal {
      color: $FONT_COLOR-NORMAL;
      background: none;
      border-color: mix($COLOR-WHITE, $COLOR-GREY, 60%);

      &:hover {
        border-color: mix($COLOR-WHITE, $COLOR-GREY, 20%);
      }

      &:active {
        background: mix($COLOR-WHITE, $COLOR-GREY, 80%);
      }

      &.__danger {
        color: $COLOR-DANGER;

        &:hover {
          border-color: mix($COLOR-WHITE, $COLOR-DANGER, 20%);
        }

        &:active {
          background: mix($COLOR-WHITE, $COLOR-DANGER, 80%);
        }
      }
    }

    &-ghost {
      color: $FONT_COLOR-NORMAL;
      background: none;
      border-color: transparent;

      &:hover {
        background: mix($COLOR-WHITE, $COLOR-GREY, 90%);
        border-color: mix($COLOR-WHITE, $COLOR-GREY, 90%);
      }

      &:active {
        background: mix($COLOR-WHITE, $COLOR-GREY, 80%);
        border-color: mix($COLOR-WHITE, $COLOR-GREY, 80%);
      }

      &.__danger {
        color: $COLOR-DANGER;

        &:hover {
          background: mix($COLOR-WHITE, $COLOR-DANGER, 90%);
        }

        &:active {
          background: mix($COLOR-WHITE, $COLOR-DANGER, 80%);
        }
      }
    }

    &-text {
      padding: 0;
      height: auto;
      color: $COLOR-PRIMARY;
      background: none;
      border: none;

      &:hover {
        color: mix($COLOR-WHITE, $COLOR-PRIMARY, 40%);
      }

      &:active {
        color: mix($COLOR-BLACK, $COLOR-PRIMARY, 40%);
      }

      &.__danger {
        color: $COLOR-DANGER;

        &:hover {
          color: mix($COLOR-WHITE, $COLOR-DANGER, 40%);
        }

        &:active {
          color: mix($COLOR-BLACK, $COLOR-DANGER, 40%);
        }
      }
    }
  }

  &-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-icon + &-text {
    margin-left: $SPACING-MINI;
  }
}
</style>
