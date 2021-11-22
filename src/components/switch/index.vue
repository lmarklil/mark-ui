<template>
  <div
    :class="['x-switch', { __checked: modelValue, __disabled: disabled }]"
    @click="toggle"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "XSwitch",
  props: {
    modelValue: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const toggle = () => {
      if (props.disabled) return;
      emit("update:modelValue", !props.modelValue);
    };

    return { toggle };
  },
});
</script>

<style lang="scss">
@import "../../style/constants.scss";

$x-switch__spacing: $SPACING-MINI !default;
$x-switch-ball__size: $FONT_SIZE-NORMAL !default;

.x-switch {
  display: inline-block;
  padding: $x-switch__spacing;
  width: $x-switch-ball__size * 2;
  background: mix($COLOR-WHITE, $COLOR-GREY, 40%);
  border-radius: $x-switch-ball__size + $x-switch__spacing * 2;
  transition: 0.3s;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: $x-switch-ball__size;
    height: $x-switch-ball__size;
    background: $COLOR-WHITE;
    border-radius: $BORDER_RADIUS-CIRCLE;
    transition: $TRANSITION_DURATION-NORMAL;
  }

  &.__checked {
    background: $COLOR-PRIMARY;

    &::after {
      transform: translateX(100%);
    }
  }

  &.__disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
