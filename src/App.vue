<template>
    <el-header class="header">
        <el-button @click="$router.push({ name: 'index' })" type="text">
            <img style="height: 50px" :src="logoLr" />
        </el-button>

        <div class="user">
            <el-button @click="$router.push({ name: 'about' })" type="text">
                <div
                    style="color: #000000; font-size: 16px; margin-right: 30px"
                >
                    About
                </div>
            </el-button>
            <el-button @click="changeTheme()" type="text">
                <i :class="['fal', theme === 'light' ? 'fa-sun' : 'fa-moon']" />
            </el-button>

            <el-button @click="messages()" type="text">
                <el-badge :hidden="!haveDot" is-dot>
                    <i class="fal fa-bell" />
                </el-badge>
            </el-button>

            <el-button @click="$router.push('/write')" type="text">
                <i class="fal fa-comment-edit"></i>
            </el-button>

            <el-button
                @click="$router.push('/user/login')"
                type="text"
                v-if="!loggedIn"
            >
                <i class="fal fa-sign-in-alt"></i>
            </el-button>

            <el-dropdown v-else>
                <span class="el-dropdown-link" style="cursor: pointer">
                    {{ user.username }}
                    <i class="fal fa-angle-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            @click="$router.push(`/user/${user.id}`)"
                        >
                            个人主页
                        </el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/user/edit')">
                            设置
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout">
                            登出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-drawer
            v-model="drawer"
            title="消息列表"
            direction="rtl"
            :size="this.isMobile ? '75%' : '35%'"
            :lock-scroll="false"
        >
            <el-scrollbar full v-loading="loading" v-if="notices.length">
                <el-card
                    shadow="never"
                    v-for="item in notices"
                    :key="item"
                    :style="{
                        'box-shadow': '0 0px 0px #ffffff !important',
                        'margin-bottom': '15px',
                        'font-weight': item.state === 0 ? 'bold' : 'normal',
                    }"
                    @click="$router.push(item.url)"
                >
                    <template #header>
                        {{ item.title }}
                        <small style="float: right">
                            {{ $moment(item.time).fromNow() }}
                        </small>
                    </template>
                    {{ item.content }}
                </el-card>
            </el-scrollbar>
            <el-empty description="Empty" v-else />
        </el-drawer>
    </el-header>
    <div
        :style="{ margin: '45px 25px 20px 25px', minHeight: `${minHeight}px` }"
    >
        <router-view v-slot="{ Component }">
            <keep-alive v-if="$route.meta.keepAlive">
                <component :is="Component" />
            </keep-alive>
            <component :is="Component" v-else />
        </router-view>
    </div>
    <div
        style="
            color: rgb(190, 190, 190);
            height: 28px;
            padding: 0px 20px 0px 20px;
        "
        id="footer"
    >
        <el-link
            :href="`https://yiyan.yixiangzhilv.com/?id=${yiyan.uuid}`"
            target="_blank"
            :underline="false"
            class="footer-yiyan"
            v-if="!isMobile"
        >
            {{ yiyan.content }}
            <span v-show="yiyan.from_show">
                - 「 {{ yiyan.from_show }} 」
            </span>
        </el-link>
        <el-link
            href="https://beian.miit.gov.cn/"
            target="_blank"
            :underline="false"
            :class="isMobile ? 'footer-beian-center' : 'footer-beian'"
        >
            鲁ICP备2020034769号-2
        </el-link>
    </div>
    <el-backtop />
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { mapState, mapGetters } from "vuex";
import logoLr from "@/assets/img/logo-lr.png";
import "@/assets/js/dev-guard";

export default {
    data() {
        return {
            title: "QA瓜田",
            drawer: false,
            haveDot: false,
            yiyan: {},
            logoLr: logoLr,
            windowWidth: 0,
            windowHeight: 0,
            loading: false,
            notices: [],
        };
    },
    computed: {
        ...mapState(["user", "theme"]),
        ...mapGetters(["loggedIn"]),
        isMobile() {
            return this.windowWidth < 960;
        },
        minHeight() {
            return this.windowHeight - 50 - 30 - 45 - 20;
        },
    },
    methods: {
        changeTheme() {
            this.$store.commit("changeTheme");
            document.firstElementChild.className = this.theme;
        },
        messages() {
            if (!this.loggedIn) {
                ElMessage.warning("请先登录");
                this.$router.push("/user/login");
                return;
            }
            this.getNotices(false);
            this.drawer = !this.drawer;
            this.haveDot = false;
            this.$axios.post("/notice/read/");
        },
        getNotices(dot = true) {
            if (!this.loggedIn) return;
            this.loading = true;
            this.$axios.get("/notice/").then(data => {
                for (let i = 0; dot && i < data.length; i++) {
                    if (data[i].state === 0) {
                        this.haveDot = true;
                        break;
                    }
                }
                this.notices = data;
                this.loading = false;
            });
        },
        updateWindowSize() {
            (this.windowWidth = window.innerWidth),
                (this.windowHeight = window.innerHeight);
        },
        logout() {
            ElMessageBox.confirm("确认退出登录吗？", "提示", {
                confirmButtonText: "登出",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$store.commit("logout");
                    this.$router.push({ name: "login" });
                })
                .catch(err => err);
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowSize);
        this.updateWindowSize();
        let awsSdk = document.createElement("script");
        awsSdk.setAttribute(
            "src",
            "https://sdk.dogecloud.com/sdk/s3/js/aws-sdk-2.683.0.min.js"
        );
        document.head.appendChild(awsSdk);
    },
    created() {
        document.firstElementChild.className = this.theme;
        if (import.meta.env.DEV) window.STOP_DEV_GUARD = true;
        this.$axios.get("https://yiyan.yixiangzhilv.com/get").then(res => {
            if (res.from_who && res.from) {
                res.from_show = `${res.from} · ${res.from_who}`;
            } else {
                res.from_show = `${res.from || res.from_who || "未知"}`;
            }
            this.yiyan = res;
        });
        this.getNotices();
        setInterval(this.getNotices, 120000);
    },
};
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
    display: inline;
    float: left;
}

.footer-beian {
    color: rgb(190, 190, 190);
    float: right;
}
.footer-beian-center {
    color: rgb(190, 190, 190);
    text-align: center;
    width: 100%;
    display: inline-block;
    margin-bottom: 15px;
}
</style>
