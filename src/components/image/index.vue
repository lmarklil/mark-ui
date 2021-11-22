<template>
  <div ref="target" class="x-image" :style="{ width, height }">
    <template v-if="!loaded && !visible">
      <div class="x-image-loading"></div>
    </template>
    <template v-else>
      <transition name="x-image-content-transition">
        <img
          v-show="visible"
          class="x-image-content"
          :src="src"
          @load="visible = true"
        />
      </transition>
    </template>
  </div>
</template>

<script>
// TODO
// 1. 存在拖动滚动条时懒加载的监测无效的问题
// 2. blur动画效果在大图展示时会掉帧
import { ref } from "vue";
import { useLazyLoad } from "../../composables/use-lazyload";

export default {
  name: "XImage",
  props: {
    src: String,
    width: String,
    height: String,
  },
  setup() {
    const visible = ref(false);
    const { target, loaded } = useLazyLoad({
      onLoad: () => (visible.value = true),
    });

    return {
      target,
      loaded,
      visible,
    };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-image {
  display: inline-block;
  position: relative;
  background: mix($COLOR-WHITE, $COLOR-GREY, 90%);
  overflow: hidden;

  &-loading {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba($COLOR-BLACK, 0),
      rgba($COLOR-BLACK, 0.1),
      rgba($COLOR-BLACK, 0)
    );
    animation: XImageLoadingAnimation 0.8s infinite;

    @keyframes XImageLoadingAnimation {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(100%);
      }
    }
  }

  &-content {
    width: 100%;
    height: 100%;

    &-transition {
      &-enter-active {
        animation: XImageContentTransition 0.4s;
      }

      &-leave-active {
        animation: XImageContentTransition 0.4s reverse;
      }

      @keyframes XImageContentTransition {
        0% {
          opacity: 0;
          //transform: scale(1.2);
          //filter: blur(20px);
        }

        100% {
          opacity: 1;
          //transform: scale(1);
          //filter: blur(0);
        }
      }
    }
  }
}
</style>
