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
      <gt-user username="ets"></gt-user>
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
              <el-option label="一年级" value="一年级" />
              <el-option label="二年级" value="二年级" />
              <el-option label="三年级" value="三年级" />
              <el-option label="四年级" value="四年级" />
              <el-option label="五年级" value="五年级" />
              <el-option label="六年级" value="六年级" />
              <el-option label="七年级" value="七年级" />
              <el-option label="八年级" value="八年级" />
              <el-option label="九年级" vale="九年级" />
              <el-option label="十年级" value="十年级" />
              <el-option label="十一年级" value="十一年级" />
              <el-option label="十二年级" value="十二年级" />
              <el-option label="国际九年级" value="国际九年级" />
              <el-option label="国际十年级" value="国际十年级" />
              <el-option label="国际十一年级" value="国际十一年级" />
              <el-option label="国际十二年级" value="国际十二年级" />
              <!-- <el-option label="114514年级" value="114514年级" /> -->
              <el-option label="保密" value="保密" />
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
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
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
import { reactive, ref } from "vue";
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser";
import axios from "axios";

export default {
  computed: {
    ...mapState(["user", "loggedIn"]),
  },
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      //tags: "创始人",
      turename: "王子涵",
      mail: "yxzl",
      sign: "官方账户",
      password: "yxzlwzh",
      real_info: "王**（210819**）",
      tags: ref([
        { text: "创始人", type: "" },
        { text: "超级管理员", type: "" },
        { text: "实名信息：王**(210819**)", type: "info" },
      ]),

      formm: reactive({
        // grade: this.user.grade,
        // gender: this.user.gender,
        // introduction: "",
        // token: "",
        // email: "",
      }),
      form: this.$store.state.user,
      value: ref([]),
    };
  },
  components: {
    gtUser,
  },
  methods: {
    confirm: function () {
      if (!this.loggedIn) {
        ElMessage.error("请先登录");
        location.replace("/#/login");
        return;
      }
      axios
        .patch(`user/${this.$store.state.user.id}/`, this.form, {
          headers: {
            Authorization: `${this.$store.state.jwt}`,
          },
        })
        .then((res) => {
          this.$store.commit("setUser", res.data);
          ElMessage.success("保存成功");
        })
        .catch((err) => {
          console.log(err.response.data);
          ElMessage.error(err.response.data);
        });
    },
    handleChange: (value) => {
      console.log(value);
    },
    turn_to_password: () => {
      location.href = "/#/password";
    },
    cancel: () => {
      location.href = "/#/index";
      ElMessage.info("已取消");
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
