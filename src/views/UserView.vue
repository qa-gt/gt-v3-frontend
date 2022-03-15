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
            <b>认证:{{ tags }}</b>
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
        
        <el-form :label-position="top" :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";

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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }),
    };
  },
  methods: {
    onSubmit: () => {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>