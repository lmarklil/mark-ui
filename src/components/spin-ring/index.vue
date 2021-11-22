<template>
  <div class="x-spin_ring">
    <div class="x-spin_ring-body">
      <div class="x-spin_ring-light"></div>
      <div class="x-spin_ring-ring"></div>
    </div>
  </div>
</template>

<script>
import "../../animations/spin/spin.scss";

export default {
  name: "XSpinRing",
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-spin_ring {
  display: inline-block;

  &-body {
    position: relative;
    width: 1em;
    height: 1em;
    animation: XAnimationSpin $TRANSITION_DURATION-LONG linear infinite;
  }

  &-light {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-width: 0.2em;
    border-top-color: currentColor;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-style: solid;
    border-radius: $BORDER_RADIUS-CIRCLE;
  }

  &-ring {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-width: 0.2em;
    border-color: currentColor;
    border-style: solid;
    border-radius: $BORDER_RADIUS-CIRCLE;
  }
}
</style>
