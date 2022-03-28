<template>
    <el-header class="header">
        <h3
            style="color: #000000"
            @click="$router.push({ name: 'index' })"
        >
            {{ title }}
        </h3>
        <div class="user">
            <el-icon
                @click="$router.push({ name: 'index' })"
            >
                <home-filled />
            </el-icon>
            <el-icon @click="changeTheme()">
                <sunny v-if="theme === 'light'" />
                <moon v-else />
            </el-icon>
            <el-icon v-if="loggedIn" style="margin-top: 5px">
                <el-badge
                    :hidden="!haveDot"
                    is-dot
                >
                    <bell
                        v-if="loggedIn"
                        @click="messages()"
                    />
                </el-badge>
             </el-icon>
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
                @click="$router.push('/write')"
            >
                <edit />
            </el-icon>
            <el-icon
                @click="$router.push('/user/' + (loggedIn ? 'edit' : 'login'))"
            >
                <user style="width: 1em; height: 1em" />
            </el-icon>
            <span>{{ user.username }}</span>
        </div>
    </el-header>
    <div style="margin: 45px 25px">
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

<script>
import { mapState, mapGetters } from "vuex";
import Wasm from "@/assets/pkg/gt_v3_sign_bg.wasm";

export default {
    mode: "history",
    data() {
        return {
            title: "QA瓜田",
            username: "test",
            viewTransition: "slide-right-leave-active",
            drawer: false,
            haveDot: true,
        };
    },
    computed: {
        ...mapState(["user", "theme"]),
        ...mapGetters(["loggedIn"]),
        isMobile() {
            return window.innerWidth < 960;
        }
    },
    methods: {
        changeTheme() {
            this.$store.commit("changeTheme");
            document.firstElementChild.className = this.theme;
        },
        messages() {
            this.drawer = !this.drawer;
            this.haveDot = false;
        },
    },
    created() {
        document.firstElementChild.className = this.theme;
        Wasm().then(e=>{
            console.log(e)
        })
    },
};
</script>
