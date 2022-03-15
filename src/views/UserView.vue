<template>
  <el-row justify="space-around">
    <el-col :span="5" class="user-info">
      <el-card shadow="hover" class="box-card">
        <template #header>
          <div class="card-header">
            <h2>{{ username }}</h2>
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div>
          <br />
          <div>
            <b>认证: {{ tags }}</b>
          </div>
          <br />
        </div>
      </el-card>
      <br />
      <el-scrollbar height="300px">
        <p v-for="item in 20" :key="item" class="scrollbar-message">
          <el-card shadow="hover" class="message-card">{{ item }}</el-card>
        </p>
      </el-scrollbar>
    </el-col>
    <el-col :span="18" style="min-width: 300px">
      <el-card full>
        <h2>个人信息编辑</h2>
        <el-divider />
        <el-form :model="form" :label-position="top" label-width="120px">
          <el-form-item label="真实姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="年级">
            <el-cascader
              v-model="grade"
              :options="options"
              :props="props"
              @change="handleChange"
            />
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
            <el-input v-model="form.about" type="textarea" />
          </el-form-item>
          <el-form-item label="pushplus token">
            <el-input v-model="form.token" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";
import { ref } from "vue";

export default {
  data() {
    return {
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      turename: "王子涵",
      mail: "yxzl",
      sign: "官方账户",
      password: "yxzlwzh",
      form: reactive({
        name: "",
        grade: "",
        sex: "",
        about: "",
        token: "",
      }),

      value: ref([]),

      props: {
        expandTrigger: "hover",
      },

      options: [
        {
          value: "xiaoxue",
          label: "小学部",
          children: [
            {
              value: "yi",
              label: "一年级",
            },
            {
              value: "er",
              label: "二年级",
            },
            {
              value: "san",
              label: "三年级",
            },
            {
              value: "si",
              label: "四年级",
            },
            {
              value: "wu",
              label: "五年级",
            },
          ],
        },
        {
          value: "chuzhong",
          label: "初中部",
          children: [
            {
              value: "liu",
              label: "六年级",
            },
            {
              value: "qi",
              label: "七年级",
            },
            {
              value: "ba",
              label: "八年级",
            },
          ],
        },
        {
          value: "gaozhong",
          label: "高中部",
          children: [
            {
              value: "jiu",
              label: "九年级",
            },
            {
              value: "shi",
              label: "十年级",
            },
            {
              value: "shiyi",
              label: "十一年级",
            },
            {
              value: "shier",
              label: "十二年级",
            },
          ],
        },
        {
          value: "guoji",
          label: "国际部",
          children: [
            {
              value: "guojijiu",
              label: "国际九年级",
            },
            {
              value: "guojishi",
              label: "国际十年级",
            },
            {
              value: "guojishiyi",
              label: "国际十一年级",
            },
            {
              value: "guojishier",
              label: "国际十二年级",
            },
          ],
        },
        {
          value: "qita",
          label: "其他年级",
        },
        {
          value: "baomi",
          label: "保密年级",
        },
      ],
    };
  },
  methods: {
    onSubmit: () => {
      console.log("submit!");
    },
    handleChange: (value) => {
      console.log(value);
    },
  },
};
</script>

<style>
</style>