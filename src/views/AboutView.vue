<template>
  <el-row
    :gutter="10"
    style="width: 86%; margin-left: 7%"
    justify="space-evenly"
  >
    <el-col
      style="width: 80%; margin-bottom: 20px; align-items: center !important"
    >
      <el-card>
        <h2>关于瓜田</h2>
        <p>大概就是升级日志之类的吧！</p>
        <el-divider />
        <div style="margin-right: 35px">
          <el-timeline>
            
            <el-timeline-item
              :key="item"
              v-for="item in timelineItems"
              :type="item.types"
              :timestamp="$moment(item.time).format('LL')"
              placement="top"
            >
            <div style="margin-bottom: 25px">
              <el-card>
                <h3>{{ item.title }}</h3>
                <p>
                  {{ item.content }}
                </p>
              </el-card>
            </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
</style>

<script>
import "element-plus/theme-chalk/display.css";
export default {
  data() {
    return {
      isMobile: sessionStorage.getItem("isMobile"),
      timelineItems: [],
    };
  },
  created() {
    this.$axios
      .get("/about/")
      .then((data) => {
        this.timelineItems = data;
      })
      .catch((err) => err);
  },
};
</script>