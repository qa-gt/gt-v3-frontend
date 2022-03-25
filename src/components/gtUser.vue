<template>
  <el-card shadow="hover" class="box-card" v-if="!user.id">
    <template #header>
      <div class="card-header" style="vertical-align: middle">
        <el-avatar
          :size="40"
          :src="user.portrait || circleUrl"
          fit="cover"
          style="vertical-align: middle"
          @click="$router.push('/user/' + user.id)"
        />&emsp;
        <div
          style="
            font-size: 20px;
            font-weight: bold;
            display: inline-block;
            word-break: break-all;
            vertical-align: middle;
            max-width: 120px;
          "
          @click="$router.push('/user/' + user.id)"
        >
          {{ user.username }}
        </div>
        <el-button
          type="primary"
          size="small"
          style="float: right; margin-top: 10px"
          @click="follow"
          >关&ensp;注</el-button
        >
      </div>
    </template>
    <div>
      <div>
        ID:{{ user.id }} | {{ user.grade }} |
        {{ { 0: "性别保密", 1: "♂", 2: "♀" }[user.gender] }}
      </div>
      <br />
      <div>
        {{ user.introduction }}
      </div>
      <br />
      <div style="display: inline">
        <b>认证: &ensp;</b>
        <el-tag
          v-for="tag in tags"
          :key="tag"
          style="margin: 2px 2px !important"
          :type="tag.type"
        >
          {{ tag }}
        </el-tag>
      </div>
      
      <div style="margin: 2px 2px !important">
        <b>实名: &ensp;</b>
        <el-tag type="info" style="margin: 3px 0px !important">{{
          real_name
        }}</el-tag>
      </div>

      <br />
      <br />
    </div>
  </el-card>
  <el-card shadow="hover" class="box-card" v-else>
    <template #header>
      <h2 style="text-align: center">欢迎回来，请登录</h2>
    </template>
    <!-- <div>
      <div>
        ID:{{ user.id }} | {{ user.grade }} |
        {{ { 0: "性别保密", 1: "♂", 2: "♀" }[user.gender] }}
      </div>
      <br />
      <div>
        {{ user.introduction }}
      </div>
      <br />
      <div style="display: inline">
        <b>认证: &ensp;</b>
        <el-tag
          v-for="tag in user.tags"
          :key="tag"
          style="margin: 0 2px"
          :type="tag.type"
        >
          {{ tag.text }}
        </el-tag>
      </div>
      <br />
      <br />
    </div> -->
  </el-card>
  <br />
</template>

<script>
export default {
  name: "gtUser",
  props: {
    user: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      data: "",
      tags: [],
      real_name: "王子涵（210409**）",
    };
  },
  mounted() {
    this.data = "创始人 超级管理";
    var data1 = this.data;
    var info = data1.split(" ");
    //console.log(info);
    this.tags = info;
  },
};
</script>
