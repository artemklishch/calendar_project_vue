<template>
  <div class="redline" :style="{ top: positionOfRedLine }">
    <div class="redline__ball"></div>
    <div class="redline__line"></div>
  </div>
</template>

<script>
import "./redLine.scss";
export default {
  props: ["positionOfRedLine"],
};
</script>