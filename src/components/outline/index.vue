<template>
  <div class="x-outline">
    <div class="x-outline-title" @click="targetScrollTo(0)">{{ title }}</div>
    <div ref="content" class="x-outline-content">
      <div
        v-for="(item, index) in outline"
        :key="index"
        :ref="`content-item-${index}`"
        :class="['x-outline-content-item', { __focus: currentIndex === index }]"
        @click="targetScrollTo(item.offsetTop)"
      >
        <div
          class="x-outline-content-item-title"
          :style="{ marginLeft: `${(item.level - 1) * 10}px` }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import {
  getScrollContainer,
  getScrollDataContainer,
  isVerticalOverflow,
  isVisibleInScrollContainer,
} from "../../utils/dom";

export default {
  name: "XOutline",
  props: {
    title: {
      type: String,
      default: "大纲",
    },
    getTarget: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      outline: [],
      currentIndex: -1,
    };
  },
  mounted() {
    this.target = this.getTarget();
    this.scrollContainer = getScrollContainer(this.target);
    this.scrollContainer.addEventListener("scroll", this.focusOutlineItem);
    this.targetObserver = new MutationObserver(debounce(this.getOutline, 500));
    this.targetObserver.observe(this.target, {
      attributes: true,
      childList: true,
    });
    this.getOutline();
  },
  beforeUnmount() {
    this.scrollContainer.removeEventListener("scroll", this.focusOutlineItem);
    this.targetObserver.disconnect();
  },
  methods: {
    getOutline() {
      this.outline = [];
      this.target.children.forEach((item) => {
        if (/^H\d$/.test(item.tagName)) {
          this.outline.push({
            level: parseInt(item.tagName.replace(/[^\d]/g, "")),
            title: item.textContent,
            offsetTop: item.offsetTop,
          });
        }
      });
    },
    targetScrollTo(offsetTop) {
      getScrollDataContainer(this.scrollContainer).scrollTop = offsetTop;
    },
    focusOutlineItem: throttle(function() {
      const outlineContent = this.$refs.content;

      for (let i = 0; i < this.outline.length; i++) {
        if (
          getScrollDataContainer(this.scrollContainer).scrollTop <
          this.outline[i].offsetTop
        ) {
          this.currentIndex = i - 1;

          if (this.currentIndex > -1 && isVerticalOverflow(outlineContent)) {
            const currentOutlineContentItem = this.$refs[
              `content-item-${this.currentIndex}`
            ];

            if (
              !isVisibleInScrollContainer(
                currentOutlineContentItem,
                outlineContent
              )
            ) {
              getScrollDataContainer(outlineContent).scrollTop =
                currentOutlineContentItem.offsetTop -
                outlineContent.offsetHeight / 2 +
                currentOutlineContentItem.offsetHeight / 2;
            }
          }

          break;
        }
      }
    }, 500),
  },
};
</script>

<style lang="scss">
@import "../../style/constants.scss";

.x-outline {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-title {
    margin-bottom: $SPACING-NORMAL;
    padding-bottom: $SPACING-SMALL;
    color: $FONT_COLOR-PRIMARY;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px mix($COLOR-WHITE, $COLOR-GREY, 80%) solid;
    overflow: hidden;
    transition: $TRANSITION_DURATION-NORMAL;
    cursor: pointer;

    &:hover {
      color: $COLOR-PRIMARY;
    }

    &:active {
      color: mix($COLOR-BLACK, $COLOR-PRIMARY, 20%);
    }
  }

  &-content {
    position: relative;
    overflow-y: hidden;

    &:hover {
      overflow-y: auto;
    }

    &-item {
      display: flex;
      align-items: center;
      padding: 0 $SPACING-SMALL;
      height: 32px;
      color: $FONT_COLOR-SECONDARY;
      border-radius: $BORDER_RADIUS-NORMAL;
      transition: $TRANSITION_DURATION-NORMAL;
      cursor: pointer;

      &:hover {
        background: rgba($COLOR-GREY, 0.1);
      }

      &:active {
        background: rgba($COLOR-GREY, 0.2);
      }

      &.__focus {
        color: $COLOR-PRIMARY;
      }

      &-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
