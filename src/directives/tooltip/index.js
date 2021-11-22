import { createApp } from "vue";
import TooltipBubble from "./tooltip-bubble";

export default {
  mounted(el, binding) {
    const container = document.createElement("div");
    const app = createApp(TooltipBubble, {
      getReference() {
        return el;
      },
    });

    el.tooltip = { container, app, instance: app.mount(container) };
    el.tooltip.instance.setPlacement(binding.arg);
    el.tooltip.instance.setContent(binding.value);
    el.addEventListener("mouseenter", el.tooltip.instance.open);
    el.addEventListener("mouseleave", el.tooltip.instance.close);
    document.body.appendChild(container);
  },
  updated(el, binding) {
    el.tooltip.instance.setPlacement(binding.arg);
    el.tooltip.instance.setContent(binding.value);
  },
  beforeUnmount(el) {
    el.removeEventListener("mouseenter", el.tooltip.instance.open);
    el.removeEventListener("mouseleave", el.tooltip.instance.close);
    el.tooltip.tooltip.app.unmount(el.tooltip.container);
    document.body.removeChild(el.tooltip.container);
  },
};
