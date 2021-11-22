import { ref, onMounted, onBeforeUnmount } from "vue";
import throttle from "lodash/throttle";
import { getScrollContainer, isVisibleInScrollContainer } from "../utils/dom";

export function useLazyLoad(options = {}) {
  const target = ref(null);
  const loaded = ref(false);

  let scrollContainer = null;

  const load = () => {
    options.load && options.onLoad();
    loaded.value = true;
  };

  const checkVisible = throttle(() => {
    if (isVisibleInScrollContainer(target.value, scrollContainer)) {
      load();
      scrollContainer.removeEventListener("scroll", checkVisible);
    }
  }, 250);

  onMounted(() => {
    scrollContainer = getScrollContainer(target.value);

    if (!scrollContainer || isVisibleInScrollContainer(target.value, scrollContainer)) {
      load();
    } else {
      scrollContainer.addEventListener("scroll", checkVisible);
    }
  });

  onBeforeUnmount(() =>
    scrollContainer.removeEventListener("scroll", checkVisible)
  );

  return {
    loaded,
    target,
  };
}
