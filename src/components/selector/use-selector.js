import { inject, computed } from "vue";
import { key } from "./context";

export const useSelector = (value) => {
  const selector = inject(key);
  const selected = computed(() => selector.isSelected(value));

  const select = () => {
    selector.select(value);
  };

  return { selected, select };
};
