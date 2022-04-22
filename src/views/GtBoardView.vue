<template>
  <div
    :key="pos"
    v-for="pos in positions"
    :style="{ '--posx': pos.posx + 'px', '--posy': pos.posy + 'px' }"
    class="pack"
  >
    <el-card class="card">
      <h3>小测一下</h3>
      <p>aaaaaaaaaaaaaaaaaaaaaa</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: window.screen.availWidth, // 屏幕尺寸
      screenHeight: window.screen.availHeight,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,
      positions: [],
    };
  },
  // 钩子函数
  mounted() {
    var i, posx, posy;
    let posx_old = 0,
      posy_old = 0;
      console.log(this.windowWidth, this.windowHeight)
    //console.log(this.screenWidth, this.screenHeight);
    for (i = 0; i < 20; i++) {
      posx = Math.round(Math.random() * this.windowWidth);
      posy = Math.round(Math.random() * this.windowHeight);
      if (posx >= this.windowWidth - 300) {
        console.log(posx);
        let posx1 = posx
        posx = posx1 - 100;
        console.log(posx);
      }
      if (posx < 50) {
        posx = posx + 50;
      }
      if (posy >= this.windowHeight - 200) {
        posy = posy -  3050;
      }
      if (posy <= 20) {
        posy = posy + 100;
      }
      for (var j = 0; j < this.positions.length; j++) {
        if (
          Math.abs(this.positions[j].posx - posx) <= 100 ||
          Math.abs(this.positions[j].posy - posy) <= 100
        ) {
          posx = Math.round(Math.random() * this.windowWidth);
          posy = Math.round(Math.random() * this.windowHeight);
          break;
        }
      }
      this.positions.push({ posx, posy });
    }
    console.log(this.positions);
  },
};
</script>

<style scoped>
.card {
  max-width: 240px;
  max-height: 170px !important;
}
.pack {
  position: absolute;
  left: var(--posx) !important;
  top: var(--posy) !important;
}
</style>