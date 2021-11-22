<template>
  <div :class="['x-space-item', `__${direction}_spacing-${spacing}`]">
    <slot />
  </div>
</template>

<script>
import { inject } from "vue";
import { key } from "./context";

export default {
  name: "XSpaceItem",
  setup() {
    const space = inject(key);

    return { direction: space.direction, spacing: space.spacing };
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-space-item {
  &.__row_spacing {
    &-mini {
      margin-right: $SPACING-MINI;
    }

    &-small {
      margin-right: $SPACING-SMALL;
    }

    &-normal {
      margin-right: $SPACING-NORMAL;
    }

    &-large {
      margin-right: $SPACING-LARGE;
    }
  }

  &.__column_spacing {
    &-mini {
      margin-bottom: $SPACING-MINI;
    }

    &-small {
      margin-bottom: $SPACING-SMALL;
    }

    &-normal {
      margin-bottom: $SPACING-NORMAL;
    }

    &-large {
      margin-bottom: $SPACING-LARGE;
    }
  }

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
