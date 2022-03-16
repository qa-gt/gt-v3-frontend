<template>
  <el-row style="text-align: center; justify-content: center">
    <el-col :span="24" style="max-width: 450px">
      <el-card full class="login-card shadow-1">
        <h3>登录到瓜田</h3>
        <el-divider />
        <br />
        <el-form :model="form" @submit.prevent>
          <el-input
            v-model="name"
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
          <!-- <el-row> -->
          <!-- <el-col :span="10" :offset="6"> -->
          <el-button type="primary" native-type="submit" @click="login">
            &emsp;&emsp;&emsp;登&emsp;录&emsp;&emsp;&emsp;
          </el-button>
          <br /><br />
          <span style="font-size: 14px">
            &#8195;忘记密码？
            <el-button type="text" @click="repass"> 点此重置 </el-button>
          </span>
        </el-form>
        <!-- </el-col> -->
        <!-- </el-row> -->
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
import { ElMessage } from "element-plus";
// import { ref } from "vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      this.$store.commit("login", {
        name: this.name,
        password: this.password,
      });
      ElMessage.success(`${this.name}，欢迎回来！`);
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