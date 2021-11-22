<template>
  <div ref="body" class="x-carousel">
    <div
      ref="main"
      class="x-carousel-main"
      :style="{ transform: `translateX(${offset}px)` }"
    >
      <slot />
    </div>
    <slot
      name="controller"
      :index="index"
      :count="count"
      :prev="prev"
      :next="next"
      :to="to"
    />
  </div>
</template>

<script>
import {
  reactive,
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { key } from "./context";
import throttle from "lodash/throttle";

// TODO
// 1. 窗口大小改变时停用动画
// 2. 支持循环滚动
// 3. 懒加载
// 4. 仅用两个容器实现切换效果
// 5. 自动播放
// 6. 轮播到底事件，可用于加载更多功能
export default {
  name: "XCarousel",
  props: {
    defaultIndex: {
      type: Number,
      default: 0,
    },
    // autoplay: Boolean,
    // loop: Boolean,
  },
  setup(props) {
    const body = ref(null);
    const main = ref(null);
    const size = reactive({
      width: 0,
      height: 0,
    });
    const index = ref(props.defaultIndex);
    const offset = computed(() => -(size.width * index.value));
    const count = ref(0);

    const resize = throttle(() => {
      size.width = body.value.offsetWidth;
      size.height = body.value.offsetHeight;
    }, 300);

    const next = () =>
      index.value < count.value - 1 ? index.value++ : (index.value = 0);
    const to = (target) => {
      if (target > -1 && target < count.value) {
        index.value = target;
      }
    };
    const prev = () =>
      index.value > 0 ? index.value-- : (index.value = count.value - 1);
    const register = () => {
      count.value++;
    };
    const unregister = () => {
      count.value--;
      // 防止越界
      if (index.value > count.value - 1) index.value = count.value - 1;
    };

    provide(key, { size, register, unregister });

    onMounted(() => {
      resize();
      window.addEventListener("resize", resize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resize);
    });

    return { body, main, offset, index, count, prev, to, next };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-carousel {
  position: relative;
  overflow: hidden;

  &-main {
    display: flex;
    transition: $TRANSITION_DURATION-NORMAL;
  }
}
</style>
