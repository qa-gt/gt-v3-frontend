<template>
  <el-header class="header" style="::shadow ">
    <el-button
      type="text"
      style="font-size: 20px; color: #000000; font-weight: 600"
      @click="home()"
    >
      {{ title }}
    </el-button>
    <div class="user">
      <el-icon
        style="width: 1em; height: 1em; margin-right: 10px"
        @click="home()"
      >
        <home-filled />
      </el-icon>
      <el-icon style="margin-right: 10px" @click="changeTheme()">
        <sunny v-if="theme === 'light'" />
        <moon v-else />
      </el-icon>
      <bell
        style="width: 1em; height: 1em; margin-right: 10px"
        v-if="loggedIn"
      />
      <el-icon
        style="width: 1em; height: 1em; margin-right: 10px"
        @click="$router.push('/write')"
      >
        <edit />
      </el-icon>
      <el-icon @click="$router.push(loggedIn ? '/user/edit' : '/user/login')">
        <user style="width: 1em; height: 1em" />
      </el-icon>
      {{ user.username }}
    </div>
  </el-header>
  <keep-alive>
    <router-view style="margin: 50px 25px" />
  </keep-alive>
</template>

<style lang="scss" scoped>
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
import { mapState } from "vuex";

export default {
  mode: "history",
  computed: {
    ...mapState(["user", "theme", "isMobile", "loggedIn"]),
  },
  data() {
    return {
      title: "QA瓜田",
      username: "test",
      isMobile: this.isMobile,
      viewTransition: "slide-right-leave-active",
    };
  },
  methods: {
    changeTheme() {
      this.$store.commit("changeTheme");
      document.getElementsByTagName("html")[0].className = this.theme;
    },
    home() {
      location.assign("/#/index");
    },
    route_to_write() {
      location.assign("/#/write");
    },
  },
  created() {
    console.log(this.theme);
    document.getElementsByTagName("html")[0].className = this.theme;
  },
};
</script>