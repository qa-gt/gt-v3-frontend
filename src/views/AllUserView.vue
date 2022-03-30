<template>
  <el-card full>
    <h1>所有用户</h1>
    <el-divider />
    <el-empty description="Empty" v-if="!users" />
    <div>
      <el-card v-for="user in users" :key="user">
        <el-collapse class="overflow" style="border: 0">
          <el-collapse-item>
            <template #title>
              <el-avatar
                :size="40"
                :src="user.portrait || circleUrl"
                fit="cover"
                style="vertical-align: middle"
              />&emsp;
              <div
                style="
                  font-size: 20px;
                  font-weight: bold;
                  display: inline-block;
                  word-break: break-all;
                  vertical-align: middle;
                  max-width: 120px;
                "
              >
                {{ user.name }}
                
              </div>
              <div style="float: right display: inline-block;">
          <el-button type="primary" plain> 用户信息页 </el-button>
        </div>
            </template>
            <p>用户名&emsp;&emsp;&emsp;{{ user.name }}</p>
            <p>用户ID&emsp;&emsp;&emsp;{{ user.id }}</p>
            <p>注册时间&emsp;&emsp;{{ user.registTime }}</p>
            <p>用户简介&emsp;&emsp;{{ user.info }}</p>
            <p>文章数量&emsp;&emsp;{{ user.atccount }}</p>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </el-card>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      users: [
        {
          name: "wzh",
          id: "1",
          portrait: "",
          registTime: "2022/03/30",
          atccount: "10",
          info: "Hi",
        },
      ],
    };
  },
  methods: {
    DelateUser() {
      ElMessage.warning("已删除");
    },
  },
};
</script>

<style>
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>