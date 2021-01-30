<template>
  <main class="main">
    <div class="main__sidebar_timing">
      <TimeSidebar />
    </div>
    <div class="main__sidebar_days" @click="onShowForm">
      <div
        v-for="(element, index) of 7"
        :key="index"
        class="main__sidebar_days_line"
        :data-day-number="index"
      >
        <DaysSidebar
          :arrDaysOfWeek="arrDaysOfWeek"
          :dayNumber="index"
          :arrayOfEventsForRender="arrayOfEventsForRender"
          :onShowFormOnEditing="onShowFormOnEditing"
          :positionOfRedLine="positionOfRedLine"
        />
      </div>
    </div>
  </main>
</template>

<script>
import "./main.scss";
import TimeSidebar from "./TimeSidebar";
import DaysSidebar from "./DaysSidebar";

export default {
  props: [
    "arrDaysOfWeek",
    "onShowForm",
    "arrayOfEventsForRender",
    "onShowFormOnEditing",
    "positionOfRedLine",
  ],
  components: {
    TimeSidebar,
    DaysSidebar,
  },
  data() {
    return {
      dayNumber: 0,
    };
  },
};
</script>