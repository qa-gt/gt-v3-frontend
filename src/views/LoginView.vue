<template>
  <el-row style="text-align: center; justify-content: center">
    <el-col :span="24" style="max-width: 450px">
      <el-card full class="login-card shadow-1">
        <h3>登录到瓜田</h3>
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
          <br /><br /><br />

          <el-button type="primary" native-type="submit" @click="login">
            &emsp;&emsp;&emsp;登&emsp;录&emsp;&emsp;&emsp;
          </el-button>

          <br /><br />
          <span style="font-size: 14px">
            &#8195;忘记密码？
            <el-button type="text" @click="repass"> 点此重置 </el-button>
          </span>
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
    };
  },
  methods: {
    login: function () {
      // if (this.username === "" || this.password === "") {
      //   ElMessage.error("用户名或密码不能为空");
      //   return;
      // }
      axios
        .post("/user/login", {
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
        })
        .catch((err) => {
          ElMessage.error(err.response.data.detail);
        });
      // location.href = "/#/index";
    },
    repass: () => {
      ElMessage.info("请联系网站管理员进行更改");
    },
  },
};
</script>

<style>
.login-card {
  height: 400px;
}
</style>