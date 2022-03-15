<template>
  <el-row justify="space-evenly">
    <el-col :span="5" :xs="24" :sm="18" :md="6" style="margin-bottom: 20px">
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
    </el-col>
    <el-col :span="18" style="min-width: 300px">
      <el-card full shadow="hover">
        <h2>编辑文章</h2>
        <el-divider />
        <el-input
          v-model="article"
          :rows="17"
          type="textarea"
          placeholder="写点东西……"
          @input="change($event)"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

import { ref } from 'vue'

export default {



  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      activeName: ref("first"),
      article: article
    };
  },

  change(e) {
    this.$forceUpdate(); // 更新视图
    return {
      e: e, //返回值
    };
  },
};

const article = ref('')

</script>

<style>
</style>