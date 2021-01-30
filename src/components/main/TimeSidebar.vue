<template>
  <div>
    <div
      v-for="(timePoint, index) in arrOfTimePoints"
      :key="index"
      class="main__sidebar_timing_place"
    >
      <span class="main__sidebar_time">{{ timePoint }}</span>
      <div class="main__sidebar_timing_place-bord"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    arrOfTimePoints() {
      return Array(25)
        .fill(null)
        .map((elem, index) => {
          if (index !== 0 && index !== 24) {
            elem = `${index}:00`;
          }
          return elem;
        });
    },
  },
};
</script>