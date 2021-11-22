<template>
  <div>
    <Carousel style="height:200px;">
      <template #default>
        <CarouselItem style="background:red;">red</CarouselItem>
        <CarouselItem style="background:orange;">orange</CarouselItem>
        <CarouselItem style="background:yellow;">yellow</CarouselItem>
        <CarouselItem style="background:blue;">blue</CarouselItem>
      </template>
      <template #controller="{next}">
        <Popover placement="bottom" bordered>
          <template #reference>
            <XButton
              type="primary"
              style="position: absolute;bottom:10px;left:10px;"
              @click="next"
              >next</XButton
            >
          </template>
          123
        </Popover>
      </template>
    </Carousel>
  </div>
  <div>
    <XRadioGroup v-model="val">
      <Popover placement="bottom" bordered :offset="[0, 50]">
        <template #reference>
          <XRadio v-tooltip:top="val" label="apple" value="apple" />
        </template>
        {{ val }}
      </Popover>
      <XRadio label="orange" value="orange" />
    </XRadioGroup>
  </div>
  <Popover placement="bottom" bordered>
    <template #reference>
      <span v-tooltip:top="val">haha</span>
    </template>
    {{ val }}
  </Popover>
</template>

<script>
import Carousel from "@/components/carousel";
import CarouselItem from "@/components/carousel-item";
import XButton from "@/components/button";
import XRadio from "@/components/radio/radio";
import XRadioGroup from "@/components/radio/radio-group";
import tooltip from "@/directives/tooltip";
import Popover from "@/components/popover";

export default {
  components: { Carousel, CarouselItem, XButton, XRadio, XRadioGroup, Popover },
  directives: { tooltip },
  data() {
    return {
      val: "",
    };
  },
};
</script>
