<template>
  <!--
  <el-row :gutter="40">
    <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
    -->
  <el-row justify="space-around">
    <el-col :span="5">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h2>{{ username }}</h2>
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div><br>
          <div><b>认证:{{ tags }}</b></div><br>
        </div>
      </el-card>

      <el-scrollbar height="300px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="18">
      <el-scrollbar>
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>

      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="200"
        :pager-count="9"
        :page-size="20"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-col>

    <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

<script>
export default {
  data() {
    return {
        username: "test",
        id: "1",
        grade: "九年级",
        sex: "♂",
        tags: "创始人"
    };
  },
};
</script>
