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
      <el-card full shadow="hover">
        <h2>编辑文章</h2>
        <el-divider />
        <el-form :model="form" label-width="120px">
          <el-form-item lable="标题：">
            <el-input
              v-model="articletitle"
              class="w-50 m-2"
              placeholder="起个名字……"
              @input="change($event)"
            />
          </el-form-item>
          <el-input
            v-model="article"
            :rows="17"
            type="textarea"
            placeholder="写点东西……"
            @input="change($event)"
          />
          <br />

          <br />
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            on-preview
            file-list
            on-remove
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖动文件到这里 或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png 文件，不大于 5Mb。 最多支持20张。
              </div>
            </template>
          </el-upload>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default {
  components: {
    UploadFilled: UploadFilled,
  },
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      activeName: ref("first"),
      article: article,
    };
  },

  change(e) {
    this.$forceUpdate(); // 更新视图
    return {
      e: e, //返回值
    };
  },
};

const article = ref("");
</script>

<style>
.upload-demo {
  width: 100%;
}
</style>