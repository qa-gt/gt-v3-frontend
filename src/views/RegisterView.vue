<template>
  <el-row style="text-align: center; justify-content: center">
    <el-col :span="24" style="max-width: 450px">
      <el-card full class="register-card shadow-1">
        <h3>注册新账号</h3>
        <el-divider />
        <el-form :model="form" @submit.prevent>
          <el-input
            v-model="username"
            class="w-50 m-2"
            placeholder="用户名"
            maxlength="30"
            style="margin-bottom: 20px"
          />
          <el-input
            v-model="password"
            type="password"
            class="w-50 m-2"
            placeholder="密码"
            maxlength="30"
            show-password
            style="margin-bottom: 20px"
          />
          <el-input
            v-model="repassword"
            type="password"
            class="w-50 m-2"
            placeholder="请再次输入密码"
            maxlength="30"
            show-password
            style="margin-bottom: 20px"
          />
          <div style="margin: 20px">
            <CaptchaBar v-model:code="captchaCode" style="z-index: 99999" />
          </div>
          <el-row justify="space-between">
            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
              <el-button
                type="primary"
                native-type="submit"
                @click="register"
                style="width: 100%; margin: 5px 0"
              >
                注&emsp;册
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
              <el-button
                plain
                native-type="submit"
                @click="cancel"
                style="width: 100%; margin: 5px 0"
              >
                取&emsp;消
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage, ElLoading } from 'element-plus';
import { mapState } from 'vuex';
import { CaptchaBar } from '@/components/hccaptcha';

export default {
  computed: {
    ...mapState(['user']),
  },
  components: { CaptchaBar },
  data() {
    return {
      username: '',
      password: '',
      repassword: '',
      captchaCode: null,
    };
  },
  methods: {
    async register() {
      if (this.username === '' || this.password === '') {
        ElMessage.error('用户名或密码不能为空！');
        return;
      } else if (this.password != this.repassword) {
        ElMessage.error('两次输入的密码不一致！请确认后重新输入！');
        return;
      } else if (!this.captchaCode) {
        ElMessage.error('未通过人机识别！');
        return;
      }
      let loading = ElLoading.service({
        fullscreen: true,
        text: '注册中...',
      });

      this.$axios
        .post('/user/register', {
          username: this.username,
          password: this.password,
          ...this.captchaCode,
        })
        .then(res => {
          this.$store.commit('setJwt', res.token);
          this.$store.commit('setUser', res.user);
          if (this.$route.query.next) {
            this.$router.push(this.$route.query.next);
          } else {
            this.$router.go(-1);
          }
          ElMessage.success('注册成功！');
        })
        .finally(() => {
          loading.close();
        });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.register-card {
  min-height: 420px;
}
</style>
