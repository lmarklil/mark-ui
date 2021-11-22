<template>
  <component :is="() => $slots.default({ selected })" @click="select" />
</template>

<script>
import { useSelector } from "./use-selector";

export default {
  name: "XSelectorItem",
  props: {
    value: [String, Number],
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
