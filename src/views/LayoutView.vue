<template>

  <el-row justify="space-around">
    <el-col :span="5" class="test1">
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
          <el-card shadow="hover" class="message-card">{{ item }}</el-card>
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="18">
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
      </el-scrollbar>

      <el-pagination
        background
        layout="prev, pager, next, jumper"
        style="max-width: 100%"
        :total="200"
        :page-size="5"
        :pager-count="7"
        :hide-on-single-page="true"
        v-if="!isMobile"
      >
      </el-pagination>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50"
        :page-size="5"
        :pager-count="6"
        :hide-on-single-page="true"
        v-if="isMobile"
      >
      </el-pagination>
    </el-col>

    <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
  </el-row>
</template>

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
