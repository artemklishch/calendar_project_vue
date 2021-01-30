<template>
  <nav class="nav">
    <button class="nav__button" @click="onShowForm">
      <img
        src="https://img.icons8.com/color/48/000000/plus-math.png"
        class="plus"
        alt="Plus img"
      />
      Create
    </button>
    <button class="nav_day" @click="onClickTodayWeek">Today</button>
    <div class="nav__arow" @click="onArrowBtns">
      <div class="nav__arow_left"></div>
      <div class="nav__arow_right"></div>
    </div>
    <div class="nav__dateMonEar">
      <h2 class="nav__dateMonEar-today">{{ dateTitle }}</h2>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["onArrowBtns", "dateTitle", "onClickTodayWeek", "onShowForm"],
};
</script>