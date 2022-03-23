<template>
  <el-row justify="space-evenly" style="margin-top: 50px; padding: 0 25px">
    <el-col
      :xs="24"
      :sm="18"
      :md="6"
      :lg="5"
      :xl="4"
      style="margin-bottom: 20px"
    >
      <gt-user :user="user"></gt-user>
    </el-col>

    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-row justify="left">
        <el-card shadow="hover" class="content-card" style="padding: -10px">
          <el-tabs
            v-model="value"
            class="demo-tabs hidden-sm-and-down"
            @tab-click="handleClick"
            style="padding: -10px"
          >
            <el-tab-pane
              v-for="item in topics"
              :key="item.id"
              v-bind:label="item.name"
              v-bind:name="item.id"
            ></el-tab-pane>
          </el-tabs>
          <el-select
            v-model="value"
            class="m-2 hidden-md-and-up"
            placeholder="Select"
            style="width: 100%; margin-bottom: 5px"
          >
            <el-option
              v-for="item in topics"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="mt-4">
            <el-input
              v-model="searchInput"
              placeholder="想找什么？"
              class="input-with-select"
              @keydown.enter.self.stop="doSearch(searchInput)"
            >
              <template #append>
                <el-button type="primary" @click="doSearch(searchInput)">
                  <el-icon style="vertical-align: middle">
                    <search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </el-row>

      <el-card
        shadow="hover"
        class="content-card"
        v-for="item in atcs.results"
        :key="item.id"
      >
        <template #header>
          <div class="content-card-header">
            <el-button
              type="text"
              style="color: black; font-width: 2500px; font-size: 18px"
              @click="to_article(item.id)"
            >
              {{ item.title }}
            </el-button>
            <el-button class="button" type="text">Operation button</el-button>
          </div>
        </template>
        <!-- <el-button
          type="text"
          style="color: black; font-width: 2500px; font-size: 13px"
          @click="route_to_article()"
        >
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }} <br /><br />
          </div>
        </el-button> -->
        <div class="article-preview">
          {{ item.content }}{{ item.content }}{{ item.content }}
        </div>
      </el-card>
      <el-pagination
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="200"
        :page-size="5"
        :pager-count="7"
        :hide-on-single-page="true"
        class="hidden-sm-and-down"
      />
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        :page-size="5"
        :pager-count="5"
        :hide-on-single-page="true"
        class="hidden-md-and-up"
      />
    </el-col>
  </el-row>
  <el-backtop />
</template>

<style lang="scss" scoped>
@import url("@/assets/scss/style.scss");
@import url("@/assets/scss/Index.scss");
.article-preview {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";
import axios from "axios";

export default {
  computed: {
    ...mapState(["user", "theme", "isMobile"]),
  },
  data() {
    return {
      theme: "light",
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      //tags: "创始人",
      activeName: ref("first"),
      searchInput: "",
      article_id: "1",
      topics: [],
      value: 0,
      atcs: {},
    };
  },
  components: {
    gtUser,
  },
  methods: {
    handleClick: (tab, event) => {
      console.log(tab, event);
    },
    doSearch: (text) => {
      if (!text) return;
      ElMessageBox.alert("搜索：" + text);
    },
    router: (article_id) => {
      console.log(article_id);
      ElMessage.info("clicked!");
    },
    to_article(atc_id) {
      this.$router.push(`/article/${atc_id}`);
    },
  },
  name: "IndexView",
  created() {
    axios
      .get("/article/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.atcs = data;
      });
    axios
      .get("/topic/")
      .then((res) => res.data)
      .then((data) => {
        this.topics = data.results;
      });
  },
};
</script>