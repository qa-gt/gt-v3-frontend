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
            :rows="17"
            type="textarea"
            placeholder="写点东西..."
            maxlength="10000"
            show-word-limit
            @input="change($event)"
          />

          <br />

          <br />

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
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">仅限大小小于5MB的图片文件</div>
            </template>
          </el-upload>
          <br /><br />
          <el-form-item>
            <el-button type="primary" @click="confirm"> 提 交 </el-button>
            <el-popconfirm title="确认要取消吗？本次编辑内容将不会保存。">
              <template #reference>
                <el-button> 取 消 </el-button>
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
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      activeName: ref("first"),
      articleContent: "",
      articleTitle: "",
      fileList: [],
    };
  },

  change(e) {
    this.$forceUpdate(); // 更新视图
    return {
      e: e, //返回值
    };
  },
  methods: {
    confirm: () => {
      ElMessage.success("提交成功！");
    },
    uploadSuccess(res) {
      console.log(res);
      ElMessage.success("上传成功！");
    },
    uploadError(err) {
      console.log(err);
      ElMessage.error("上传失败: " + err);
    },
  },
};
</script>
