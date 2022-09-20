<template>
  <el-row justify="space-evenly" style="margin-bottom: 40px">
    <el-col
      :xs="24"
      :sm="18"
      :md="6"
      :lg="5"
      :xl="4"
      style="margin-bottom: 20px"
    >
      <gt-user :user="user"></gt-user>
    </el-col>
    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-card full shadow="hover">
        <h2>编辑文章</h2>
        <el-divider />
        <el-form label-position="top">
          <el-form-item>
            <el-input
              v-model="atc.title"
              class="w-50 m-2"
              maxlength="100"
              show-word-limit
              placeholder="起个名字..."
            />
          </el-form-item>
          <gt-md-editor
            style="height: 600px; margin-bottom: 20px"
            v-model="atc.content"
            :onSave="save"
            :onUploadImg="uploadImage"
          />

          <el-row
            :gutter="20"
            justify="space-between"
            style="margin-bottom: 30px"
          >
            <el-col>
              <el-select v-model="atc.topic" placeholder="请选择话题">
                <el-option
                  v-for="item in topics"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="doSubmit"
              :disabled="disabled.submit"
            >
              <i class="fal fa-paper-plane" />
              &emsp;提&ensp;交&ensp;
            </el-button>
            <el-popconfirm
              title="确认要取消吗？"
              confirm-button-text="确定取消"
              cancel-button-text="再想想看"
              @confirm="cancel"
            >
              <template #reference>
                <el-button> 取 消 </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              title="确认要清除吗？若有，我们将同时删除缓存"
              confirm-button-text="确定清除"
              cancel-button-text="再想想看"
              @confirm="clear"
            >
              <template #reference>
                <el-button> 清 除 </el-button>
              </template>
            </el-popconfirm>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.v-md-editor {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0) !important;
  border: 1px solid #dcdfe6 !important;
}
</style>

<script>
import { mapState } from 'vuex';
import gtUser from '@/components/gtUser.vue';
import gtMdEditor from '@/components/mdEditor.vue';
import { ElMessage, ElNotification } from 'element-plus';

const atc_default = '{"exist":false,"id":"","title":"","content":"","topic":0}';

export default {
  computed: {
    ...mapState(['user', 'uploadKey', 'writingAtc', 'imageCache']),
    isMobile() {
      return this.$root.isMobile;
    },
  },
  components: {
    gtUser,
    gtMdEditor,
  },
  data() {
    return {
      atc: JSON.parse(atc_default),
      topics: [],
      disabled: { submit: false },
    };
  },
  methods: {
    async doSubmit() {
      this.disabled.submit = true;
      if (this.atc.title.trim() === '' || this.atc.content.trim() === '') {
        ElMessage.error('标题或正文不能为空');
        this.disabled.submit = false;
        return;
      } else if (this.atc.content.length > 100000) {
        ElMessage.error(
          '正文内容不能超过100,000字符！如果确有需要请与管理员联系申请。'
        );
        this.disabled.submit = false;
        return;
      }

      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('write');

      let atc = this.atc;
      atc._topic = atc.topic;
      delete atc.topic;
      atc.recaptcha = token;

      if (this.atc.exist) {
        this.$axios
          .patch(`/article/${atc.id}/`, atc)
          .then(res => {
            ElMessage.success('修改成功！');
            this.$router.push(`/article/${res.id}`);
          })
          .finally(() => {
            this.disabled.submit = false;
          });
      } else {
        this.$axios
          .post('/article/', atc)
          .then(res => {
            ElMessage.success('提交成功！');
            this.$router.push(`/article/${res.id}`);
          })
          .finally(() => {
            this.disabled.submit = false;
          });
      }
      atc.topic = atc._topic;
    },
    async uploadImage(files, callback) {
      const file = files[0];
      const key = file.name + file.type + file.size;
      if (this.imageCache[key]) {
        callback([this.imageCache[key]]);
        ElMessage.success('已从缓存中读取！');
        return;
      }
      if (file.size > 1024 * 1024 * 10) {
        ElMessage.error('图片大小不能超过10M');
        return;
      }
      // const formData = new FormData();
      // formData.append("file", file);
      // ElMessage.info("正在上传图片...");
      // this.$axios.post("/utils/upload_image", formData).then(res => {
      //     insertImage({ url: res.url, desc: file.name });
      //     ElMessage.success("上传成功！");
      // });
      let res = this.uploadKey;
      if (!res || !res.expire || res.expire < Date.now()) {
        res = await this.$axios.post('/utils/upload_key').then(res => res.data);
        if (!res.Credentials) {
          ElMessage.error('上传未授权！');
          return;
        }
        this.$store.commit('setUploadKey', res);
      }
      const bucket = res.Buckets[0];
      const s3 = new AWS.S3({
        region: 'automatic',
        endpoint: bucket.s3Endpoint,
        credentials: res.Credentials,
        params: {
          Bucket: bucket.s3Bucket,
        },
      });
      const fileKey = res.scope.replace(
        '*',
        String(new Date().getTime()) + file.name.replace(/[^\w0-9_-]/g, '')
      );
      const s3Upload = s3
        .upload({
          Key: fileKey,
          Body: file,
          ContentType: file.type,
        })
        .on('httpUploadProgress', evt => {});
      s3Upload.send(err => {
        if (err) {
          ElMessage.error('上传失败！');
          return;
        } else {
          callback([`https://gtcdn.yxzl.top/${fileKey}/30`]);
          ElMessage.success('上传成功！');
          this.$store.commit('addImageCache', {
            key: key,
            url: `https://gtcdn.yxzl.top/${fileKey}/30`,
          });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
      ElMessage.info('已取消');
    },
    save() {
      if (this.atc.content.length > 15000) {
        ElMessage.error('暂不支持缓存超过15000字符的文章！');
        return;
      }
      this.$store.commit('setWritingAtc', this.atc);
      ElNotification.success({
        title: '草稿保存成功',
        message:
          '本地缓存具有不稳定性，无痕模式、清除浏览器数据都可能造成草稿丢失，请尽快发布！',
      });
    },
    clear() {
      this.atc = JSON.parse(atc_default);
      this.$store.commit('delWritingAtc');
      ElMessage.info('已清空');
    },
    init() {
      if (this.$route.query.id) {
        this.atc.id = this.$route.query.id;
        this.$axios.get(`/article/${this.atc.id}/`).then(res => {
          this.atc.topic = res.topic.id;
          this.atc.title = res.title;
          this.atc.content = res.content;
          this.atc.exist = true;
        });
        ElMessage.info('当前处于编辑模式');
      } else if (this.writingAtc.title || this.writingAtc.content) {
        this.atc = this.writingAtc;
        ElMessage.info('已加载草稿');
      } else {
        this.atc = JSON.parse(atc_default);
      }
    },
  },
  watch: {
    $route(now, old) {
      if (now.name !== 'write') return;
      if (now.query.id !== this.atc.id) this.init();
    },
  },
  mounted() {
    this.$axios.get('/topic/', { params: { min_state: 0 } }).then(data => {
      this.topics = data;
    });
    this.init();
  },
};
</script>
