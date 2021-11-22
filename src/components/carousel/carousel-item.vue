<template>
  <div
    class="x-carousel-item"
    :style="{ width: `${size.width}px`, height: `${size.height}px` }"
  >
    <slot />
  </div>
</template>

<script>
import { inject, computed, onMounted, onBeforeUnmount } from "vue";
import { key } from "./context";

export default {
  name: "XCarouselItem",
  setup() {
    const carousel = inject(key);

    onMounted(() => carousel.register());

    onBeforeUnmount(() => carousel.unregister());

    return { size: carousel.size };
  },
};
</script>

<style lang="scss">
.x-carousel-item {
  flex-shrink: 0;
  height: 100%;
}
</style>
