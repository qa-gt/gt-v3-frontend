<template>
  <el-header class="header">
    <h3>{{ title }}</h3>
    <div class="user">
      <div class="svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#33CCCC"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <div style="float: right">{{ username }}</div>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/layout">Layout</router-link>
      <router-view />
    </nav>
  </el-header>

  <el-row justify="space-evenly">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="默认分类" name="first">默认分类</el-tab-pane>
      <el-tab-pane label="八卦内容" name="second">八卦内容</el-tab-pane>
      <el-tab-pane label="消息通知" name="third">消息通知</el-tab-pane>
      <el-tab-pane label="知识相关" name="fourth">知识相关</el-tab-pane>
      <el-tab-pane label="时政新闻" name="fifth">时政新闻</el-tab-pane>
      <el-tab-pane label="灌水区" name="seventh">灌水区</el-tab-pane>
      <el-tab-pane label="站务" name="eighth">站务</el-tab-pane>
      <el-tab-pane label="校方讯息" name="ninth">校方讯息</el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #3287d6;
}
</style>

<script>
export default {
  data() {
    sessionStorage.setItem(
      "isMobile",
      (navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      ) &&
        "true") ||
        ""
    );
    return {
      title: "QA瓜田",
      username: "test",
      isMobile: sessionStorage.getItem("isMobile"),
    };
  },
};
</script>