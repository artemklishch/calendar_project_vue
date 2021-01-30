<template>
  <div class="header__week-block">
    <div class="header__week-block_gmt-cell">
      gmt+02
      <div class="header__week-block_gmt-cell_part-bord"></div>
    </div>

    <div class="header__week-block_line">
      <WeekDays
        v-for="(weekday, index) in arrDaysOfWeek"
        :key="index"
        :dayDate="weekday"
      />
    </div>
  </div>
</template>

<script>
import WeekDays from "./WeekDays";
export default {
  props: ["arrDaysOfWeek"],
  components: {
    WeekDays,
  },
};
</script>