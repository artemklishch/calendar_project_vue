<template>
  <div v-if="eventObjects.length">
    <div
      v-for="event in eventObjects"
      :key="event._id"
      class="main__sidebar_day_object eventObj"
      :style="eventObjStyle(event)"
      :data-event-id="event._id"
      @click="onShowFormOnEditing"
    >
      <h4 class="eventObj" :data-event-id="event._id">
        {{ event.header }}
      </h4>
      <p class="eventObj" :data-event-id="event._id">
        {{ getTimeString(event) }}
      </p>
    </div>
  </div>
</template>

<script>
import { forHeightTopAndParagraph } from "../../helpers/funcForRenderEvents";
import moment from "moment";

export default {
  props: [
    "onShowFormOnEditing",
    "index",
    "arrayOfEventsForRender",
    "arrDaysOfWeek",
    "dayNumber",
  ],
  data() {
    return {
      placeForEventObject: false,
    };
  },
  computed: {
    eventObjects() {
      return this.arrayOfEventsForRender
        .map((objectElem) => {
          this.arrDaysOfWeek.forEach((day) => {
            if (
              objectElem.startDate.getDay() === this.dayNumber &&
              moment(objectElem.startDate).format("l") ===
                moment(day).format("l") &&
              objectElem.startDate.getHours() === this.index
            ) {
              this.placeForEventObject = true;
            }
          });
          if (this.placeForEventObject) {
            this.placeForEventObject = false;
            return objectElem;
          }
          return null;
        })
        .filter((item) => item);
    },
  },
  methods: {
    eventObjStyle(objectElem) {
      const { top, height, padding } = forHeightTopAndParagraph(objectElem);
      return {
        top: top,
        height: height,
        padding: padding,
        backgroundColor: objectElem.backgroundColor,
      };
    },
    getTimeString(objectElem) {
      let timeString;
      let timesOfRange =
        (objectElem.endDate - objectElem.startDate) / 1000 / 60 / 15;
      if (timesOfRange < 4) {
        timeString = "";
      } else {
        const startTime = moment(objectElem.startDate).format("HH:mm");
        const endTime = moment(objectElem.endDate).format("HH:mm");
        timeString = `${startTime} - ${endTime}`;
      }
      return timeString;
    },
  },
};
</script>