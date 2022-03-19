<template>
  <el-row justify="space-evenly">
    <el-col :span="5" :xs="24" :sm="18" :md="6" style="margin-bottom: 20px">
      <el-card shadow="hover" class="box-card">
        <template #header>
          <div class="card-header" style="justify: space-around">
            <b style="font-size: 28px">{{ username }}</b>
            <el-button
              type="primary"
              size="small"
              style="float: right; margin-top: 10px"
              
              @click="follow"
              >关&ensp;注</el-button
            >
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div>
          <br />
          <div style="display: inline">
            <b>认证: &ensp;</b
            ><el-tag
              v-for="tag in tags"
              :key="tag"
              style="margin : 0 2px;"
              :type="tag.type"
              >{{ tag.text }}</el-tag
            >
          </div>
          <br />
          <br />
          <br />
        </div>
      </el-card>
      <br />
    </el-col>
    <el-col :span="19" :xs="24" :sm="18" :md="17" style="min-width: 300px">
      <el-card full shadow="hover">
        <h2>个人信息编辑</h2>
        <el-divider />
        <el-form :model="form" label-position="top" label-width="120px">
          <el-form-item>
            <el-button type="primary" @click="turn_to_password"
              >修改密码</el-button
            >
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入" v-model="form.name" maxlength="5" />
          </el-form-item>
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
              <el-option label="国内九年级" vale="国内九年级" />
              <el-option label="国内十年级" value="国内十年级" />
              <el-option label="国内十一年级" value="国内十一年级" />
              <el-option label="国内十一年级" value="国内十一年级" />
              <el-option label="国际九年级" value="国际九年级" />
              <el-option label="国际十年级" value="国际十年级" />
              <el-option label="国际十一年级" value="国际十一年级" />
              <el-option label="国际十二年级" value="国际十二年级" />
              <el-option label="114514年级" value="114514年级" />
              <el-option label="保密年级" value="保密年级" />
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男" />
              <el-radio label="女" />
              <el-radio label="保密" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              placeholder="介绍自己……"
              v-model="form.about"
              type="textarea"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input placeholder="" v-model="form.mail" maxlength="70" />
          </el-form-item>
          <el-form-item label="pushplus token">
            <el-input maxlength="32" v-model="form.token" />
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
import { reactive } from "vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
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
        {text: "创始人", type: ""}, 
        {text: "超级管理员",type: ""},
        {text: "实名信息：王**(210819**)", type: "info"}
        ]),
        
      

      form: reactive({
        name: "",
        grade: "",
        sex: "",
        about: "",
        token: "",
        mail: "",
      }),

      value: ref([]),
    };
  },
  methods: {
    confirm: () => {
      location.replace("/#/index");
      ElMessage.success("保存成功！");
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
};
</script>

<style>
</style>