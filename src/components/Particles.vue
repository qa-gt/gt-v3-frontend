<template>
  <div class="particles-js-box">
    <div id="particles-js" v-show="show"></div>
  </div>
</template>

<script>
/* eslint-disable */
import particlesJs from "./particles.js";
import particlesConfig from "./particles.json";
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      // show: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      particlesJS("particles-js", particlesConfig);
      document.body.style.overflow = "hidden";
    },
  },
};
</script>

<style scoped>
.particles-js-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
#particles-js {
  background-color: #2d3a4b97;
  width: 100%;
  height: 100%;
}
</style>
