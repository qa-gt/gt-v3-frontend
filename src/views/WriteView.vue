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
            full
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
          <br /><br />
          <el-form-item>
            <el-button type="primary" @click="confirm"> 确 定 </el-button>
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
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
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
  methods: {
    confirm: () => {
      ElMessage.success("提交成功！");
    },
  },
};

const article = ref("");
</script>

<style>
.upload-demo {
  width: 100%;
}
</style>