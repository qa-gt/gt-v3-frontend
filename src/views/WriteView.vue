<template>
  <el-row justify="space-evenly">
    <el-col :span="5" :xs="24" :sm="18" :md="6" style="margin-bottom: 20px">
      <el-card shadow="hover" class="box-card">
        <template #header>
          <div class="card-header" style="justify-content: space-around;">
            <h2>{{ username }}</h2>
            
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div>
          <br />
          <div>
            <b>认证: &ensp;</b
            ><el-tag v-for="tag in tags" :key="tag" class="mx-1" style="justify-content: space-around;margin: 10px 0;">{{
              tag
            }}</el-tag>&ensp;
          </div>
          <br />
          <div>
            <b>实名认证: &ensp;</b
            ><el-tag class="mx-1" type="info">{{ real_info }}</el-tag>
          </div>
          <br />
        </div>
      </el-card>
      <br />
    </el-col>
    <el-col :span="19" :xs="24" :sm="18" :md="17" style="min-width: 300px">
      <el-card full shadow="hover">
        <h2>编辑文章</h2>
        <el-divider />
        <el-form label-position="top">
          <el-form-item>
            <el-input
              v-model="articleTitle"
              class="w-50 m-2"
              maxlength="100"
              show-word-limit
              placeholder="起个名字..."
              @input="change($event)"
            />
          </el-form-item>

          <el-input
            v-model="articleContent"
            :autosize="{ minRows: 15, maxRows: 30 }"
            type="textarea"
            placeholder="写点东西..."
            maxlength="8000"
            show-word-limit
            @input="change($event)"
          />

          <br />

          <br />
          <el-row gutter="20" justify="space-between">
            <el-col>
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1:5000/upload"
                :on-change="handleChange"
                :file-list="fileList"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                show-file-list="true"
                multiple="true"
                limit="2"
                accept=".jpg, .jpeg, .png, .gif"
                :style="{
                  display: 'inline-block',
                  width: isMobile ? '50%' : '0',
                }"
              >
                <el-button type="primary"> 点我上传图片 </el-button>
              </el-upload>
              <el-select
                v-model="articleTopic"
                placeholder="请选择话题"
                :style="{
                  float: 'right',
                  width: isMobile ? '45%' : '25%',
                  'min-width': '120px',
                  'margin-right': isMobile ? '5%' : '55%',
                }"
              >
                <el-option
                  key="item.value"
                  label="item.lab21e212e1e12el"
                  value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <br /><br />
          <el-form-item>
            <el-button type="primary" @click="doSubmit"> <el-icon><promotion /></el-icon> &emsp;提&ensp;交 &ensp;</el-button>
            <el-popconfirm 
            title="确认要取消吗？本次编辑内容将不会保存。" 
            confirm-button-text="确定取消"
            cancel-button-text="再想想看"
            @confirm="cancel" >
              <template #reference>
                <el-button > 取 消 </el-button>
              </template>
            </el-popconfirm>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

import { ElMessage } from "element-plus";
export default {
  computed: {
    ...mapState(["user", "isMobile"]),
  },
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      //tags: "创始人",
      activeName: ref("first"),
      articleContent: "",
      articleTitle: "",
      articleTopic: "",
      fileList: [],
      article_id: "1",
      real_info: "王**（210819**）",
      tags: ref([
        "创始人",
        "超级管理员",
      ]),
    };
  },

  change(e) {
    this.$forceUpdate(); // 更新视图
    return {
      e: e, //返回值
    };
  },
  methods: {
    doSubmit: function () {
      ElMessage.success("贴子发布成功！");
      this.$router.push({ name: "article" });
      location.href="/#/article/"; //在后面加上帖子id
    },
    uploadSuccess(res) {
      console.log(res);
      ElMessage.success("上传成功！");
    },
    uploadError(err) {
      console.log(err);
      ElMessage.error("上传失败: " + err);
    },
    cancel: () => {
      location.href="/#/index";
      ElMessage.info("已取消")
    }
  },
};
</script>
