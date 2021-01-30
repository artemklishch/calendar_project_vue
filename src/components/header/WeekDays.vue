<template>
  <div :class="['header__week-block_days', dateClass]">
    <div class="header__week-block_part-bord"></div>
    <p class="header__week-block_dayname">{{ day }}</p>
    <p class="header__week-block_daydate">{{ date }}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["dayDate"],
  computed: {
    dateClass() {
      return {
        "today__header__week-block_days":
          moment(this.dayDate).format("ll") === moment(new Date()).format("ll"),
      };
    },
    day() {
      return moment(this.dayDate).format("ddd");
    },
    date() {
      return moment(this.dayDate).format("D");
    },
  },
};
</script>