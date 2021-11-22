<template>
  <component ref="reference" :is="reference" />
  <PopoverBubble
    ref="popover"
    :get-reference="getReference"
    :placement="placement"
    :offset="offset"
    :show-arrow="showArrow"
    :bordered="bordered"
    :visible="visible"
  >
    <slot />
  </PopoverBubble>
</template>

<script>
import PopoverBubble from "./popover-bubble";

export default {
  name: "XPopover",
  components: { PopoverBubble },
  props: {
    placement: {
      type: String,
      default: "bottom",
    },
    offset: {
      type: Array,
      default() {
        return [0, 5];
      },
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      default: "hover",
    },
    bordered: Boolean,
    delayOpenInterval: Number,
    delayCloseInterval: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    reference() {
      const referenceSlot = this.$slots.reference();
      return referenceSlot[0];
    },
  },
  mounted() {
    const referenceSlot = this.$slots.reference();
    if (referenceSlot.length > 1)
      console.warn("[Popover] Reference插槽内应始终保持只有唯一的元素");
    this.bindTrigger();
  },
  beforeUnmount() {
    this.unbindTrigger();
    this.unbindContextTrigger();
  },
  methods: {
    getReference() {
      return this.$refs.reference?.$el ?? this.$refs.reference;
    },
    bindTrigger() {
      const reference = this.getReference();
      switch (this.trigger) {
        case "hover":
          reference.addEventListener("mouseenter", this.delayOpen);
          reference.addEventListener("mouseleave", this.delayClose);
          break;
        case "focus":
          reference.addEventListener("click", this.openBubble);
          break;
      }
    },
    delayOpen() {
      if (!this.delayOpenInterval) {
        this.openBubble();
      } else {
        this.delayOpenTimer = this.delay(
          this.openBubble,
          this.delayOpenInterval,
          this.delayOpenTimer
        );
      }
    },
    openBubble() {
      this.visible = true;
      this.bindContextTrigger();
    },
    bindContextTrigger() {
      switch (this.trigger) {
        case "hover":
          document.addEventListener("mouseover", this.handleDocumentMouseOver);
          break;
        case "focus":
          document.addEventListener("click", this.handleDocumentClick);
          break;
      }
    },
    handleDocumentMouseOver(e) {
      if (this.contains(e.target)) {
        clearTimeout(this.closeDelayTimer);
        this.closeDelayTimer = null;
      } else {
        this.delayClose();
      }
    },
    contains(el) {
      return (
        this.getReference().contains(el) ||
        this.$refs.popover.bubble.contains(el)
      );
    },
    handleDocumentClick(e) {
      if (!this.contains(e.target)) this.closeBubble();
    },
    delay(func, delay, timer) {
      if (timer) clearTimeout(timer);
      return setTimeout(func, delay);
    },
    delayClose() {
      if (this.delayOpenTimer) {
        clearTimeout(this.delayOpenTimer);
        this.delayOpenTimer = null;
        return;
      }
      const minimumInterval = this.offset[1] * 20; // 间隔时间太短会导致鼠标还没移到bubble就已经触发close了
      const delayCloseInterval =
        this.delayCloseInterval < minimumInterval
          ? minimumInterval
          : this.delayCloseInterval;
      this.closeDelayTimer = this.delay(
        this.closeBubble,
        delayCloseInterval,
        this.closeDelayTimer
      );
    },
    closeBubble() {
      this.visible = false;
      this.unbindContextTrigger();
    },
    unbindContextTrigger() {
      switch (this.trigger) {
        case "hover":
          document.removeEventListener(
            "mouseover",
            this.handleDocumentMouseOver
          );
          break;
        case "focus":
          document.removeEventListener("click", this.handleDocumentClick);
          break;
      }
    },
    unbindTrigger() {
      const reference = this.getReference();
      switch (this.trigger) {
        case "hover":
          reference.removeEventListener("mouseenter", this.delayOpen);
          reference.removeEventListener("mouseleave", this.delayClose);
          break;
      }
    },
  },
};
</script>
