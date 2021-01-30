<template>
  <div
    class="main__sidebar_days_hours"
    v-for="(hourPeriod, index) of 24"
    :key="hourPeriod"
    :data-hour-number="index"
  >
    <div v-for="(event, i) in eventObjects(index)" :key="i">
      <EventObject
        v-if="event"
        :key="event.id"
        :objectElem="event"
        :onShowFormOnEditing="onShowFormOnEditing"
      />
    </div>
    <RedLine v-if="isRedLine(index)" :positionOfRedLine="positionOfRedLine" />
  </div>
</template>

<script>
import EventObject from "./EventObject ";
import RedLine from "../redLine/RedLine";
import moment from "moment";
export default {
  props: [
    "arrDaysOfWeek",
    "dayNumber",
    "arrayOfEventsForRender",
    "onShowFormOnEditing",
    "positionOfRedLine",
  ],
  components: {
    EventObject,
    RedLine,
  },
  data() {
    return {
      currentDate: new Date(),
      placeForEventObject: false,
    };
  },
  computed: {
    currentDay() {
      return this.arrDaysOfWeek.find(
        (day) => day.getDate() === this.currentDate.getDate()
      );
    },
  },
  methods: {
    eventObjects(index) {
      return this.arrayOfEventsForRender.map((objectElem) => {
        this.arrDaysOfWeek.forEach((day) => {
          if (
            objectElem.startDate.getDay() === this.dayNumber &&
            moment(objectElem.startDate).format("l") ===
              moment(day).format("l") &&
            objectElem.startDate.getHours() === index
          ) {
            this.placeForEventObject = true;
          }
        });
        if (this.placeForEventObject) {
          this.placeForEventObject = false;
          return objectElem;
        }
        return null;
      });
    },
    isRedLine(index) {
      return (
        this.currentDate.getDay() === this.dayNumber &&
        this.currentDate.getHours() === index &&
        this.currentDay
      );
    },
  },
};
</script>