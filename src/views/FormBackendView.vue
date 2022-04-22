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
      <gt-user :user="user" :showFollow="false"></gt-user>
    </el-col>

    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-card>
        <h2>创建一个表单</h2>
        <el-divider />
        <el-card>
          <el-dropdown>
            <el-button type="primary" plain>
              Dropdown List
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="choice">单选题</el-dropdown-item>
                <el-dropdown-item command="muiltichoice">多选题</el-dropdown-item>
                <el-dropdown-item>填空题</el-dropdown-item>
                <el-dropdown-item>时间选择</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-card>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";
export default {
  computed: {
    ...mapState(["user"]),
  },
  components: {
    gtUser,
  },
};
</script>

<style>
</style>