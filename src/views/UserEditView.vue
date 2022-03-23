<template>
  <el-row justify="space-evenly">
    <el-col
      :xs="24"
      :sm="18"
      :md="6"
      :lg="5"
      :xl="4"
      style="margin-bottom: 20px"
    >
      <gt-user :user="this.user"></gt-user>
    </el-col>

    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-card full shadow="hover">
        <h2>个人信息编辑</h2>
        <el-divider />
        <el-form :model="form" label-position="top" label-width="120px">
          <el-form-item>
            <el-button type="primary" @click="turn_to_password"
              >修改密码</el-button
            >
          </el-form-item>
          <!-- <el-form-item label="真实姓名">
            <el-input placeholder="请输入" v-model="form.name" maxlength="5" />
          </el-form-item> -->
          <el-form-item label="年级">
            <el-select v-model="form.grade" placeholder="请选择你的年级">
              <el-option
                v-for="item in grades"
                v-bind:key="item"
                v-bind:value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="0">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              placeholder="介绍自己……"
              v-model="form.introduction"
              type="textarea"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input placeholder="" v-model="form.email" maxlength="70" />
          </el-form-item>
          <el-form-item label="pushplus token">
            <el-input maxlength="32" v-model="form.token" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="form.portrait" />
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="confirm">保存</el-button>
            <el-popconfirm
              title="确认要取消吗？本次编辑内容将不会保存。"
              confirm-button-text="确定取消"
              cancel-button-text="再想想看"
              @confirm="cancel"
            >
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
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";
import axios from "axios";

export default {
  computed: {
    ...mapState(["user", "loggedIn"]),
  },
  data() {
    return {
      tags: ref([
        { text: "创始人", type: "" },
        { text: "超级管理员", type: "" },
        { text: "实名信息：王**(210819**)", type: "info" },
      ]),
      form: { ...this.$store.state.user },
      grades: [
        "保密",
        "一年级",
        "二年级",
        "三年级",
        "四年级",
        "五年级",
        "六年级",
        "七年级",
        "八年级",
        "九年级",
        "十年级",
        "十一年级",
        "十二年级",
        "国际九年级",
        "国际十年级",
        "国际十一年级",
        "国际十二年级",
        "114514",
      ],
    };
  },
  components: {
    gtUser,
  },
  methods: {
    confirm: function () {
      console.log(this.form);
      axios
        .patch(`user/${this.$store.state.user.id}/`, this.form, {
          headers: {
            Authorization: `${this.$store.state.jwt}`,
          },
        })
        .then((res) => {
          this.$store.commit("setUser", res.data);
          this.form = {...this.$store.state.user};
          ElMessage.success("保存成功");
        })
        .catch((err) => {
          console.log(err.response.data);
          ElMessage.error(err.response.data.detail);
        });
    },
    handleChange: (value) => {
      console.log(value);
    },
    turn_to_password: function () {
      this.$router.push("/password");
    },
    cancel: () => {
      ElMessage.info("已取消");
      this.$router.go(-1);
    },
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push({ path: "/login", query: { back: true } });
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
