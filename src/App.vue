<template>
    <el-header class="header" style="::shadow ">
        <el-button
            type="text"
            style="font-size: 20px; color: #000000; font-weight: 600"
            @click="$router.push({ name: 'index' })"
        >
            {{ title }}
        </el-button>
        <div class="user">
            <el-icon
                style="width: 1em; height: 1em; margin-right: 10px"
                @click="$router.push({ name: 'index' })"
            >
                <home-filled />
            </el-icon>
            <el-icon style="margin-right: 10px" @click="changeTheme()">
                <sunny v-if="theme === 'light'" />
                <moon v-else />
            </el-icon>
            <el-badge
                :hidden="have_dot"
                v-if="loggedIn"
                is-dot
                style="margin-right: 10px !important"
            >
                <bell
                    style="width: 1em; height: 1em; margin-bottom: 4px"
                    v-if="loggedIn"
                    @click="messages()"
            /></el-badge>
            <el-drawer
                v-model="drawer"
                title="消息列表"
                direction="rtl"
                :size="this.isMobile ? '75%' : '30%'"
                :lock-scroll="false"
            >
                <el-scrollbar full>
                    <p
                        v-for="item in 20"
                        :key="item"
                        class="scrollbar-item"
                    >
                        {{ item }}{{ isMobile }}
                    </p>
                </el-scrollbar>
            </el-drawer>
            <el-icon
                style="width: 1em; height: 1em; margin-right: 10px"
                @click="$router.push('/write')"
            >
                <edit />
            </el-icon>
            <el-icon
                @click="$router.push('/user/' + (loggedIn ? 'edit' : 'login'))"
            >
                <user style="width: 1em; height: 1em" />
            </el-icon>
            {{ user.username }}
        </div>
    </el-header>
    <div style="margin: 50px 25px">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
    <div style="height: 20px"></div>
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

.scrollbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    margin: 10px;
    text-align: center;
    border-radius: 0px;
    font-size: 16px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>

<style lang="scss">
.grecaptcha-badge { 
    visibility: hidden;
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
            viewTransition: "slide-right-leave-active",
            drawer: false,
            have_dot: false,
            drawerSize: this.isMobile ? "70%" : "50%",
        };
    },
    methods: {
        changeTheme() {
            this.$store.commit("changeTheme");
            document.querySelector("html").className = this.theme;
        },
        messages() {
            this.drawer = !this.drawer;
            this.have_dot = true;
        },
    },
    created() {
        document.querySelector("html").className = this.theme;
    },
};
</script>
