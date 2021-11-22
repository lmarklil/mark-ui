<template>
  <slot />
</template>

<script>
import { provide } from "vue";
import { key } from "./context";

export default {
  name: "XSelector",
  props: {
    multiple: Boolean,
    limit: Number,
    modelValue: [String, Number, Array],
    disabled: Boolean,
  },
  emits: ["update:modelValue", "filled"],
  setup(props, { emit }) {
    const findValueIndex = (value) =>
      props.modelValue.findIndex((item) => item === value);

    const isSelected = (value) => {
      return props.multiple
        ? findValueIndex(value) > -1
        : props.modelValue === value;
    };

    const select = (value) => {
      if (props.disabled) return;
      if (props.multiple) {
        if (isSelected(value)) {
          emit(
            "update:modelValue",
            [...props.modelValue].splice(findValueIndex(value), 1)
          );
        } else {
          if (props.modelValue.length >= props.limit) {
            emit("filled");
            return;
          }
          emit("update:modelValue", [...props.modelValue, value]);
        }
        emit("update:modelValue", props.modelValue);
      } else {
        if (isSelected(value)) return;
        emit("update:modelValue", value);
      }
    };

    provide(key, { select, isSelected });
  },
};
</script>
