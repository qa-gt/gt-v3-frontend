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
      <gt-user username="ets"></gt-user>
    </el-col>

    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-row justify="left">
        <el-card shadow="hover" class="content-card" style="padding: -10px">
          <el-tabs
            v-model="value"
            class="demo-tabs hidden-sm-and-down"
            @tab-click="handleClick()"
            style="padding: -10px"
          >
            <el-tab-pane
              v-for="item in options"
              :key="item.value"
              v-bind:label="item.label"
              v-bind:name="item.value"
            ></el-tab-pane>
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
      <div v-if="value === '0'">
        <el-card
          shadow="hover"
          class="content-card"
          v-for="item in my_article"
          :key="item"
        >
          <template #header>
            <div class="content-card-header">
              <el-button
                type="text"
                style="color: black; font-width: 2500px; font-size: 18px"
                @click="route_to_article(id)"
              >
                {{ item.title }}
              </el-button>
              <el-button class="button" type="text">删除帖子</el-button>
            </div>
          </template>
          <el-button
            type="text"
            style="color: black; font-width: 2500px; font-size: 13px"
            @click="route_to_article()"
          >
            <div class="text item">
              {{ item.info }}
            </div>
          </el-button>
        </el-card>
      </div>
      <div v-if="value === '1'">
        <el-card
          shadow="hover"
          class="content-card"
          v-for="item in my_collection"
          :key="item"
        >
          <template #header>
            <div class="content-card-header">
              <el-button
                type="text"
                style="color: black; font-width: 2500px; font-size: 18px"
                @click="route_to_article(id)"
              >
                {{ item.title }}
              </el-button>
              <el-button class="button" type="text">取消收藏</el-button>
            </div>
          </template>
          <el-button
            type="text"
            style="color: black; font-width: 2500px; font-size: 13px"
            @click="route_to_article()"
          >
            <div class="text item">
              {{ item.info }}
            </div>
          </el-button>
        </el-card>
      </div>
      <div v-if="value === '2'">
        <el-card
          shadow="hover"
          class="content-card"
          v-for="item in my_followed"
          :key="item"
        >
          
            <div class="content-card-header">
              <el-button
                type="text"
                style="color: black; font-width: 2500px; font-size: 18px"
                @click="route_to_user(id)"
              >
                <el-avatar :src="item.avatar_url"> </el-avatar>&ensp;

                {{ item.username }}
              </el-button>
              <el-button class="button" type="text">取消关注</el-button>
            </div>
        </el-card>
      </div>
      <div v-if="value === '3'">
        <el-card
          shadow="hover"
          class="content-card"
          v-for="item in my_fans"
          :key="item"
        >
          
            <div class="content-card-header">
              <el-button
                type="text"
                style="color: black; font-width: 2500px; font-size: 18px"
                @click="route_to_user(id)"
              >
                <el-avatar :src="item.avatar_url"> </el-avatar>&ensp;

                {{ item.username }}
              </el-button>
              <el-button class="button" type="text">互相关注</el-button>
            </div>
          
        </el-card>
      </div>
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
// @import url("@/assets/scss/config-dark.scss");
</style>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";

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
      value: "0",
      real_info: "王**（210819**）",
      tags: ref([
        { text: "创始人", type: "" },
        { text: "超级管理员", type: "" },
        { text: "实名信息：王**(210819**)", type: "info" },
      ]),
      message: "message here",
      information: "information",
      article_id: "1",
      SHOWIT: false,
      avatar_url:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      options: [
        {
          value: "0",
          label: "我的帖子",
        },
        {
          value: "1",
          label: "我的收藏",
        },
        {
          value: "2",
          label: "我关注的",
        },
        {
          value: "3",
          label: "我的粉丝",
        },
      ],
      my_article: [
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
      ],
      my_collection: [
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
        {"title": "This is title", "info": "This is article info"},
      ],
      my_followed: [
        {"avatar_url": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", "username": "test"},
        {"avatar_url": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", "username": "test"},
      ],
      my_fans: [
        {"avatar_url": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", "username": "test"},
        {"avatar_url": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", "username": "test"},
      ],
    };
  },
  components: {
    gtUser,
  },
  methods: {
    handleClick(tab, event) {
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
    route_to_article() {
      this.$router.push("/article/:id"); //要加上文章的id
    },
    route_to_user(id) {
      this.$router.push(`/user/`+id);
    },
    tabs() {},
  },
  name: "UserInfoView",
};
</script>