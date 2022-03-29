<template>
    <el-header class="header">
        <h3 style="color: #000000" @click="$router.push({ name: 'index' })">
            {{ title }}
        </h3>
        <div class="user">
            <el-icon @click="$router.push({ name: 'index' })">
                <home-filled />
            </el-icon>
            <el-icon @click="changeTheme()">
                <sunny v-if="theme === 'light'" />
                <moon v-else />
            </el-icon>
            <el-icon v-if="loggedIn" style="margin-top: 5px">
                <el-badge :hidden="!haveDot" is-dot>
                    <bell v-if="loggedIn" @click="messages()" />
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
                    <p v-for="item in 20" :key="item" class="scrollbar-item">
                        {{ item }}{{ isMobile }}
                    </p>
                </el-scrollbar>
            </el-drawer>
            <el-icon @click="$router.push('/write')">
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
    <div style="margin: 45px 25px 20px 25px" id="main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
    <div style="color: rgb(190, 190, 190); padding: 20px" id="footer">
        <el-link
            :href="`https://yiyan.yixiangzhilv.com/?id=${yiyan.uuid}`"
            target="_blank"
            :underline="false"
            :class="isMobile ? 'footer-yiyan-center' : 'footer-yiyan'"
            v-if="!isMobile"
        >
            {{ yiyan.content }}
            <span v-show="yiyan.from_show">
                - 「 {{ yiyan.from_show }} 」
            </span>
        </el-link>
        <el-link
            href="https://beian.miit.gov.cn/"
            :class="isMobile ? 'footer-beian-center' : 'footer-beian'"
        >
            鲁ICP备2020034769号-2
        </el-link>
    </div>
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

.footer-yiyan {
    color: rgb(190, 190, 190);
    display: inline-block;
    // max-width: 35%;
}

.footer-beian {
    color: rgb(190, 190, 190);
    float: right;
}
.footer-beian-center {
    color: rgb(190, 190, 190);
    text-align: center;
    width: 100%;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    mode: "history",
    data() {
        return {
            title: "QA瓜田",
            username: "test",
            viewTransition: "slide-right-leave-active",
            drawer: false,
            haveDot: true,
            yiyan: {},
        };
    },
    computed: {
        ...mapState(["user", "theme"]),
        ...mapGetters(["loggedIn"]),
        isMobile() {
            return window.innerWidth < 960;
        },
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
    mounted() {
        document.querySelector("#main").style.minHeight =
            window.innerHeight - 50 - 65 - 65 + "px";
    },
    created() {
        document.firstElementChild.className = this.theme;
        this.$axios.get("https://yiyan.yixiangzhilv.com/get").then(res => {
            if (res.from_who && res.from) {
                res.from_show = `${res.from} · ${res.from_who}`;
            } else {
                res.from_show = `${res.from || res.from_who || "未知"}`;
            }
            this.yiyan = res;
        });
    },
};
</script>
