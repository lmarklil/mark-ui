<template>
  <XSelector
    :disabled="disabled"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <slot />
  </XSelector>
</template>

<script>
import XSelector from "../selector";

export default {
  name: "XRadioGroup",
  components: { XSelector },
  props: {
    modelValue: String,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
};
</script>
