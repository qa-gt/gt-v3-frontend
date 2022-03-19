<template>
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
          style="margin: 0 2px"
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
</template>

<script>
export default {
  name: "gtUser",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      default: "1",
    },
    grade: {
      type: String,
      default: "",
    },
  },
};
</script>
