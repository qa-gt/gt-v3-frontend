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
    <el-col :span="5" class="test1">
      <el-card class="box-card">
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

        <el-scrollbar height="300px">
          <p v-for="item in 20" :key="item" class="scrollbar-message">
            <el-card shadow="hover" class="content-card">{{ item }}</el-card>
          </p>
        </el-scrollbar>
      </el-col>
 
    <el-col :span="18">
      <el-scrollbar>
        <p v-for="item in 10" :key="item" class="scrollbar-content">
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
.test1{
  min-width: 20rem;
}

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
.scrollbar-content {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 230px;
  margin: 10px;
  text-align: left;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.scrollbar-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin: 0px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

<style>
.box-card-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.content-card {
  width: 100%;
  height: 100%;
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
      tags: "创始人",
    };
  },
};
</script>
