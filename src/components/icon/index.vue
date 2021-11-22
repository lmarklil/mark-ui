<template>
  <component :is="$slots.default" class="x-icon"/>
</template>

<script>
export default {
  name: "XIcon"
};
</script>

<style lang="scss">
.x-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
