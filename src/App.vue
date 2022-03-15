<template>
  <el-header class="header" style="::shadow ">
    <h3>{{ title }}</h3>
    <div class="user">
      <bell
        style="width: 1em; height: 1em; margin-right: 10px"
        v-if="this.$store.state.loggedIn"
      />
      <user style="width: 1em; height: 1em" />
      <!-- {{ username }} -->
      {{ this.$store.state.user.name }}
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/index">Index</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/write">Write</router-link> |
      <router-link to="/Article">Article</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-view style="margin-top: 30px" />
    </nav>
  </el-header>
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