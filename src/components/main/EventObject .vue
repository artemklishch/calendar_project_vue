<template>
  <div
    class="main__sidebar_day_object eventObj"
    style="eventObjStyle"
    :data-event-id="objectElem._id"
    @click="onShowFormOnEditing;"
  >
    <h4 class="eventObj" :data-event-id="objectElem._id">
      {{ objectElem.header }}
    </h4>
    <p class="eventObj" :data-event-id="objectElem._id">{{ timeString }}</p>
  </div>
</template>

<script>
import { forHeightTopAndParagraph } from "../../helpers/funcForRenderEvents";

export default {
  props: ["objectElem", "onShowFormOnEditing"],
  computed: {
    eventObjStyle() {
      const { top, height, padding, timeString } = forHeightTopAndParagraph(
        objectElem
      );
      return {
        top: top,
        height: height,
        padding: padding,
        backgroundColor: objectElem.backgroundColor,
      };
    },
  },
};
</script>