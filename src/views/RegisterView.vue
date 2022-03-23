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
          /><br /><br />
          <el-input
            v-model="regist_code"
            class="w-50 m-2"
            placeholder="验证码"
            maxlength="10"
          />
          <br /><br /><br />
          <div>
            <el-button type="primary" native-type="submit" @click="registered">
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

export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      regist_code: "",
    };
  },
  methods: {
    registered: function () {
      // if (this.username === "" || this.password === "") {
      //   ElMessage.error("用户名或密码不能为空");
      //   return;
      // }

      if (this.username === "" || this.password === "") {
        ElMessage.error("用户名或密码不能为空！");
      } else if (this.password != this.repassword) {
        ElMessage.error("两次输入的密码不一致！请确认后重新输入！");
      } else {
        axios
          .post("/user/register", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            console.log(res.data);
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
          });
      }

      // location.href = "/#/index";
    },
    cancel: function () {
      this.$router.go(-1);
      ElMessage.info("已取消！");
    },
  },
};
</script>

<style>
.login-card {
  height: 410px;
}
</style>