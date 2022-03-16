<template>
  <el-row justify="space-evenly">
    <el-col
      :span="5"
      :xs="24"
      :sm="18"
      :md="6"
      :lg="5"
      :xl="4"
      style="margin-bottom: 20px"
    >
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
          >
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="19" :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-row justify="left">
        <el-card shadow="hover" class="content-card" style="padding: -10px; width: 99%;">
          <el-tabs
            v-model="activeName"
            class="demo-tabs hidden-sm-and-down"
            @tab-click="handleClick"
            style="padding: -10px"
          >
            <el-tab-pane label="全部帖子" name="first"></el-tab-pane>
            <el-tab-pane label="默认分类" name="second"></el-tab-pane>
            <el-tab-pane label="八卦内容" name="third"></el-tab-pane>
            <el-tab-pane label="消息通知" name="fourth"></el-tab-pane>
            <el-tab-pane label="知识相关" name="fifth"></el-tab-pane>
            <el-tab-pane label="时政新闻" name="seventh"></el-tab-pane>
            <el-tab-pane label="灌 水 区" name="eighth"></el-tab-pane>
            <el-tab-pane label="站    务" name="ninth"></el-tab-pane>
            <el-tab-pane label="校方讯息" name="tenth"></el-tab-pane>
          </el-tabs>
          <el-select
            v-model="value"
            class="m-2 hidden-md-and-up"
            placeholder="Select"
            style="width: 100%; margin-bottom: 5px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="mt-4">
            <el-input
              v-model="searchInput"
              placeholder="想找什么？"
              class="input-with-select"
            >
              <template #append>
                <el-button type="primary">
                  <el-icon style="vertical-align: middle">
                    <search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </el-row>

      <el-scrollbar>
        <p v-for="item in 20" :key="item" class="scrollbar-content">
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
@import url("@/assets/scss/Index.scss");
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
      searchInput: "",
      value: "0",
      options: [
        {
          value: "0",
          label: "默认分类",
        },
        {
          value: "Option2",
          label: "fdsjhlllllllllsjfjhaflahjd",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
    };
  },
  methods: {
    handleClick: (tab, event) => {
      console.log(tab, event);
    },
  },
};
</script>