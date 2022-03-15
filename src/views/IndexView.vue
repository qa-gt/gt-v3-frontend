<template>
  <el-row justify="space-evenly">
    <el-col :span="5" :xs="24" :sm="18" :md="6" style="margin-bottom: 20px;">
      <el-card shadow="hover" class="box-card">
        <template #header>
          <div class="card-header">
            <h2>{{ username }}</h2>
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div>
          <br />
          <div>
            <b>认证:{{ tags }}</b>
          </div>
          <br />
        </div>
      </el-card>
      <br />
      <el-scrollbar height="300px">
        <p v-for="item in 20" :key="item" class="scrollbar-message">
          <el-card shadow="hover" class="message-card">
            <el-popover
              v-bind:placement="isMobile ? 'top' : 'right'"
              v-bind:title="item"
              :width="200"
              trigger="click"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-button>Click to activate</el-button>
              </template>
            </el-popover></el-card
          >
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="19" :xs="24" :sm="18" :md="17">
      <el-row justify="left">
        <el-card shadow="never" class="content-card">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="全部帖子" name="first">全部帖子</el-tab-pane>
            <el-tab-pane label="默认分类" name="second">默认分类</el-tab-pane>
            <el-tab-pane label="八卦内容" name="third">八卦内容</el-tab-pane>
            <el-tab-pane label="消息通知" name="fourth">消息通知</el-tab-pane>
            <el-tab-pane label="知识相关" name="fifth">知识相关</el-tab-pane>
            <el-tab-pane label="时政新闻" name="seventh">时政新闻</el-tab-pane>
            <el-tab-pane label="灌 水 区" name="eighth">灌水区</el-tab-pane>
            <el-tab-pane label="站    务" name="ninth">站 务</el-tab-pane>
            <el-tab-pane label="校方讯息" name="tenth">校方讯息</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>

      <el-scrollbar>
        <p
          v-for="item in 20"
          :key="item"
          class="scrollbar-content"
          style="margin: 0;"
        >
          <el-card shadow="hover" class="content-card">
            <template #header>
              <div class="content-card-header">
                <span>Card name</span>
                <el-button class="button" type="text"
                  >Operation button</el-button
                >
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </p>
        <el-pagination
          background
          index="prev, pager, next, jumper"
          style="max-width: 100%"
          :total="200"
          :page-size="5"
          :pager-count="7"
          :hide-on-single-page="true"
          class="hidden-sm-and-down"
        >
        </el-pagination>
        <el-pagination
          small
          index="prev, pager, next"
          :total="50"
          :page-size="5"
          :pager-count="6"
          :hide-on-single-page="true"
          class="hidden-md-and-up"
        >
        </el-pagination>
      </el-scrollbar>
    </el-col>

  </el-row>
</template>

<style lang="scss" scoped>
@import url("@/../public/scss/Index.scss");
</style>

<script>
import { ref } from "vue";
export default {
  data() {
    this.isMobile = sessionStorage.getItem("isMobile");
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      activeName: ref("first"),
    };
  },
  methods: {
    handleClick: (tab, event) => {
      console.log(tab, event);
    },
  },
};
</script>
