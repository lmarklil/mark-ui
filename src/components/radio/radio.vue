<template>
  <div :class="['x-radio', { __disabled: disabled }]" @click="select">
    <div :class="['x-radio-input', { __selected: selected }]"></div>
    <div v-if="label || $slots.default" class="x-radio-label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script>
import { useSelector } from "../selector";

export default {
  name: "XRadio",
  props: {
    label: String,
    value: String,
    disabled: Boolean,
  },
  setup(props) {
    const selectorItem = useSelector(props.value);

    const select = () => {
      if (props.disabled) return;
      selectorItem.select();
    };

    return { selected: selectorItem.selected, select };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";
@import "../../style/mixins.scss";

.x-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &.__disabled {
    @include disabled;
  }

  &-input {
    display: flex;
    position: relative;
    width: $FONT_SIZE-NORMAL;
    height: $FONT_SIZE-NORMAL;
    border: 1px mix($COLOR-WHITE, $COLOR-GREY, 80%) solid;
    border-radius: $BORDER_RADIUS-CIRCLE;
    transition: $TRANSITION_DURATION-NORMAL;

    &:hover {
      border-color: $COLOR-PRIMARY;
    }

    &:active {
      transform: scale(0.8);
    }

    &.__selected {
      border-color: $COLOR-PRIMARY;

      &::after {
        transform: scale(1);
      }
    }

    &::after {
      content: "";
      display: block;
      margin: auto;
      width: $FONT_SIZE-NORMAL - $SPACING-SMALL;
      height: $FONT_SIZE-NORMAL - $SPACING-SMALL;
      transform: scale(0);
      background: $COLOR-PRIMARY;
      border-radius: $BORDER_RADIUS-CIRCLE;
      transition: $TRANSITION_DURATION-NORMAL;
    }
  }

  &-label {
    margin-left: $SPACING-MINI;
    color: $FONT_COLOR-NORMAL;
  }
}
</style>
