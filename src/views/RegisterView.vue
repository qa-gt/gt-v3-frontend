<template>
  <el-row style="text-align: center; justify-content: center">
    <el-col :span="24" style="max-width: 450px">
      <el-card full class="login-card shadow-1">
        <h3>注册新账号</h3>
        <el-divider />
        <br />
        <el-form :model="form" @submit.prevent>
          <el-input
            v-model="username"
            class="w-50 m-2"
            placeholder="用户名"
            maxlength="30"
          />
          <br /><br />
          <el-input
            v-model="password"
            type="password"
            class="w-50 m-2"
            placeholder="密码"
            maxlength="30"
            show-password
          />
          <br /><br />
          <el-input
            v-model="repassword"
            type="password"
            class="w-50 m-2"
            placeholder="请再次输入密码"
            maxlength="30"
            show-password
          />
          <br /><br /><br />
          <div>
            <el-button type="primary" native-type="submit" @click="register">
              &ensp;&ensp;&emsp;&emsp;&emsp;注&emsp;册&emsp;&emsp;&emsp;&ensp;&ensp; </el-button
            >&ensp;
            <el-button native-type="submit" @click="cancel">
              &ensp;&ensp;&emsp;&emsp;&emsp;取&emsp;消&emsp;&emsp;&emsp;&ensp;&ensp;
            </el-button>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
import { ElMessage } from "element-plus";
// import { ref } from "vue";
import { mapState } from "vuex";
import axios from "axios";
import "@/plugins/vaptcha";

export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    register() {
      if (this.username === "" || this.password === "") {
        ElMessage.error("用户名或密码不能为空！");
        return;
      } else if (this.password != this.repassword) {
        ElMessage.error("两次输入的密码不一致！请确认后重新输入！");
        return;
      }
      if (!this.vaptchaData) {
        this.vaptchaObj.validate();
        return;
      }
      ElMessage.success("人机验证已通过!");
      console.log(this.vaptchaData);

      axios
        .post("/user/register", {
          username: this.username,
          password: this.password,
          ...this.vaptchaData,
        })
        .then((res) => {
          if (res.data.status !== "success") {
            ElMessage.error(res.data.detail);
            return;
          }
          this.$store.commit("setJwt", res.data.token);
          this.$store.commit("setUser", res.data.user);
          if (this.$route.query.next) {
            this.$router.push(this.$route.query.next);
          } else {
            this.$router.go(-1);
          }
          ElMessage.success("注册成功！");
        })
        .catch((err) => {
          ElMessage.error(err.response.data.detail);
        })
        .finally(() => {
          this.vaptchaData = null;
          this.vaptchaObj.reset();
        });
    },
    cancel() {
      this.$router.go(-1);
      ElMessage.info("已取消！");
    },
  },
  mounted() {
    vaptcha({
      vid: "623adf7fe82e6539de8faf81",
      mode: "invisible",
      scene: 1,
      area: "auto",
    }).then((vaptchaObj) => {
      this.vaptchaObj = vaptchaObj;
      vaptchaObj.listen("pass", () => {
        let serverToken = vaptchaObj.getServerToken();
        this.vaptchaData = {
          server: serverToken.server,
          token: serverToken.token,
          scene: 1,
        };
        this.register();
      });
    });
  },
};
</script>

<style>
.login-card {
  height: 410px;
}
</style>