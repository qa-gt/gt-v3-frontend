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
    <el-col :span="19" :xs="24" :sm="18" :md="17" style="min-width: 300px">
      <el-card shadow="hover" full class="read-card">
        <h2>{{ articleTitle }}</h2>
        <div class="info">
          作者: {{ writer }}<el-divider direction="vertical" /> 
          发布时间:{{ time }}<el-divider direction="vertical" /> 
          话题: {{ topic }}<el-divider direction="vertical" />
          ID: {{ articleid}}<el-divider direction="vertical" />
          阅读量: {{ reads }}
        </div>
        <el-divider />
        <div>
          {{ articleContent }}
        </div>
      </el-card>

      <el-card shadow="hover" class="comments-card"> </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      articleContent: "test",
      articleTitle: "test",
      writer: "test",
      time: "2022/03/16 10:16:59",
      topic: "默认话题",
      articleid: "1",
      reads: "100",
    };
  },
};
</script>

<style>
.info {
  font-size: 14px;
  color: #7a7a7a;
}

.read-card {
  min-height: 600px;
}

.conments-card {
  min-width: none;
  min-height: 200px;
}
</style>