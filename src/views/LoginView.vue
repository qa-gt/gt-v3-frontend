<template>
  <el-row style="text-align: center; justify-content: center">
    <el-col :span="24" style="max-width: 450px">
      <el-card full class="login-card">
        <h3>登录到瓜田</h3>
        <el-divider />
        <br />
        <el-form :model="form" @submit.prevent>
          <el-input
            v-model="username"
            class="w-50 m-2"
            placeholder="用户名"
            @input="change($event)"
          />
          <br /><br />
          <el-input
            v-model="password"
            type="password"
            class="w-50 m-2"
            placeholder="密码"
            @input="change($event)"
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
import { ref } from "vue";

export default {
  data() {
    return {
      username: username,
      password: password,
    };
  },
  change(e) {
    // this.$forceUpdate(); // 更新视图
    return {
      e: e, //返回值
    };
  },

  methods: {
    login: () => {
      ElMessage.success("登录成功！");
    },
    repass: () => {
      ElMessage.info("请联系网站管理员进行更改");
    },
  },
};

const username = ref("");
const password = ref("");
</script>

<style>
.login-card {
  height: 400px;
}
</style>