<template>
  <div class="x-space" :style="{ flexDirection: direction, alignItems: align }">
    <slot />
  </div>
</template>

<script>
import { provide } from "vue";
import { key } from "./context";

export default {
  name: "XSpace",
  props: {
    direction: {
      type: String,
      default: "row",
    },
    spacing: {
      type: String,
      default: "small",
    },
    align: {
      type: String,
      default: "center",
    },
  },
  setup(props) {
    provide(key, { direction: props.direction, spacing: props.spacing });
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-space {
  display: flex;
}
</style>
