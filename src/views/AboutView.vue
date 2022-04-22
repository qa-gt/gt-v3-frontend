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
        <el-divider />
        <el-timeline>
          <el-timeline-item timestamp="2022年02月24日" placement="top">
            <el-card>
              <h3>瓜田项目正式提出！</h3>
              <p>
                我们的站长作为青岛中学校学生会的宣传部长名正言顺地接下了这桩差事……
              </p>
              <p>本项目最初架构为 Flask，前后端不分离</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022年02月26日" placement="top">
            <el-card>
              <h3>瓜田正式上线</h3>
              <p>
                经过了不到24小时的简单开发，瓜田以“QA瓜田”这个名字正式在公众面前亮相了！
              </p>
              <p>虽说这一天我们值得尊重的站长修了一天BUG……</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022年03月" placement="top">
            <el-card>
              <h3>开发组正式提出瓜田升级计划</h3>
              <p>
                开发组打算把以前的 Flask 改成 Django + Vue3
                的架构，并且搞个前后端分离
              </p>
              <p>然而我们开发组里面所有人都没有接触过这几样新东西……</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            :key="item"
            v-for="item in timelineItems"
            :type="item.type"
            :timestamp="item.timestamp"
            placement="top"
          >
            <el-card>
              <h3>{{ item.title }}</h3>
              <p>
                {{ item.content }}
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
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
      timelineItems: [
        {
          timestamp: "2022年3月20日",
          type: "success",
          title: "QA瓜田 V2 正式上线",
          content: "经过两周网课时间的开发，我们的功能基本完成啦！",
        },
        {
          timestamp: "2022年3月20日",
          type: "success",
          title: "QA瓜田 V2 正式上线",
          content: "经过两周网课时间的开发，我们的功能基本完成啦！",
        },
        {
          timestamp: "2022年3月20日",
          type: "success",
          title: "QA瓜田 V2 正式上线",
          content: "经过两周网课时间的开发，我们的功能基本完成啦！",
        },
        {
          timestamp: "2022年3月20日",
          type: "success",
          title: "QA瓜田 V2 正式上线",
          content: "经过两周网课时间的开发，我们的功能基本完成啦！",
        },
        {
          timestamp: "2022年3月20日",
          type: "success",
          title: "QA瓜田 V2 正式上线",
          content: "经过两周网课时间的开发，我们的功能基本完成啦！",
        },
      ],
    };
  },
  created: {
    about() {
      this.$axios
        .get("/about")
        .then(res => {
                    this.timelineItems = res;
                })
        .catch((err) => err);
    },
  }
};
</script>