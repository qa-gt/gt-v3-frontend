<template>
  <el-card full>
    <h1>所有用户</h1>
    <el-divider />
    <el-input
      v-model="searchInput"
      placeholder="想找什么？"
      @keydown.enter.self.stop="doSearch"
      clearable
      @clear="doSearch"
    >
      <template #append>
        <el-button type="primary" @click="doSearch">
          <i class="fal fa-search" />
        </el-button>
      </template>
    </el-input>
    <el-divider />
    <el-empty description="Empty" v-if="!users" />
    <div>
      <el-card v-for="user in users" :key="user" style="margin-bottom: 20px">
        <el-collapse class="overflow" style="border: 0">
          <el-collapse-item>
            <template #title>
              <el-avatar
                :size="40"
                :src="user.portrait"
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
                {{ user.username }}
              </div>
            </template>
            <p>用户名&emsp;&emsp;&emsp;{{ user.username }}</p>
            <p>用户ID&emsp;&emsp;&emsp;{{ user.id }}</p>
            <p>用户简介&emsp;&emsp;{{ user.introduction }}</p>
            <el-button @click="$router.push(`/user/${user.id}`)">
              查看详情
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <el-pagination
      background
      layout="prev, pager, next, jumper, ->, total"
      v-model:current-page="pageInfo.num"
      :total="pageInfo.total"
      :page-size="pageInfo.size"
      :pager-count="7"
      :hide-on-single-page="true"
      @current-change="search"
      class="hidden-sm-and-down"
    />
    <el-pagination
      layout="prev, pager, next"
      v-model:current-page="pageInfo.num"
      :total="pageInfo.total"
      :page-size="pageInfo.size"
      :pager-count="5"
      :hide-on-single-page="true"
      @current-change="search"
      class="hidden-md-and-up"
    />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      searchText: '',
      users: [],
      pageInfo: { total: 0, num: 1, size: 20 },
    };
  },
  methods: {
    doSearch() {
      if (this.searchInput === this.searchText) return;
      this.searchText = this.searchInput;
      this.pageInfo.num = 1;
      this.search();
    },
    search() {
      this.$axios
        .get('/user/', {
          params: {
            search: this.searchText,
            page: this.pageInfo.num,
          },
        })
        .then(res => {
          this.pageInfo.total = res.count;
          this.users = res.results;
        });
    },
  },
  created() {
    this.search();
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
