<template>
  <div
    style="
      text-align: center;
      justify-content: center;
      align-items: center;
      display: inine-box;
      height: 500px;
    "
  >
    <div class="oops">Oops!</div>
    <embed :src="Svg404" type="image/svg+xml" style="height: 55%" />
    <h3 class="pagenf">404 Page Not Found</h3>
  </div>
</template>

<script>
import Svg404 from '@/assets/img/404.svg';
export default {
  data() {
    return {
      Svg404: Svg404,
    };
  },
  activated() {
    setTimeout(() => {
      this.$router.push('/');
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.oops {
  color: #a5a5a5;
  font-size: 60px;
  font-weight: 70px;
  padding-bottom: 10px;
}
.pagenf {
  color: #c5c5c5;
  font-size: 25px;
}
</style>
