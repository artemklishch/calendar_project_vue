<template>
  <header class="header">
    <NavigationElems
      :onArrowBtns="onArrowBtns"
      :onClickTodayWeek="onClickTodayWeek"
      :dateTitle="dateTitle"
      :onCreateButton="onCreateButton"
      :onShowForm="onShowForm"
    />
    <WeekBlock :arrDaysOfWeek="arrDaysOfWeek" />
  </header>
</template>

<script>
import NavigationElems from "./NavigationElems";
import WeekBlock from "./WeekBlock";
import "./header.scss";

export default {
  props: [
    "arrDaysOfWeek",
    "dateTitle",
    "onArrowBtns",
    "onClickTodayWeek",
    "onCreateButton",
    "onShowForm",
  ],
  components: {
    NavigationElems,
    WeekBlock,
  },
};
</script>