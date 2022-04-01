<template>
    <el-header class="header">
        <img
            style="height: 50px"
            :src="logoLr"
            @click="$router.push({ name: 'index' })"
        />
        <div class="user">
            <i
                class="fal fa-home-alt"
                @click="$router.push({ name: 'index' })"
            />
            <i
                :class="['fal', theme === 'light' ? 'fa-sun' : 'fa-moon']"
                @click="changeTheme()"
            />

            <el-badge :hidden="!haveDot" is-dot>
                <i
                    class="fal fa-bell"
                    @click="messages()"
                    style="margin-right: "
                />
            </el-badge>

            <i class="fal fa-comment-edit" @click="$router.push('/write')"></i>

            <i
                class="fal fa-sign-in-alt"
                @click="$router.push('/user/login')"
                v-if="!loggedIn"
            ></i>

            <el-dropdown v-else>
                <span class="el-dropdown-link">
                    {{ user.username }}
                    <i class="fal fa-angle-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="$router.push('/user/edit')">
                            个人中心
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
            :size="this.isMobile ? '75%' : '30%'"
            :lock-scroll="false"
        >
            <el-scrollbar full>
                <p v-for="item in 20" :key="item" class="scrollbar-item">
                    {{ item }}{{ isMobile }}
                </p>
            </el-scrollbar>
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
import { ElMessageBox } from 'element-plus';
import { mapState, mapGetters } from "vuex";
import logoLr from "@/assets/img/logo-lr.png";

export default {
    data() {
        return {
            title: "QA瓜田",
            username: "test",
            viewTransition: "slide-right-leave-active",
            drawer: false,
            haveDot: true,
            yiyan: {},
            logoLr: logoLr,
            windowWidth: 0,
            windowHeight: 0,
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
            this.drawer = !this.drawer;
            this.haveDot = false;
        },
        updateWindowSize() {
            (this.windowWidth = window.innerWidth),
                (this.windowHeight = window.innerHeight);
        },
        logout() {
            ElMessageBox.confirm(
                '确认退出登录吗？',
                '提示',
                {
                    confirmButtonText: '登出',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    this.$store.commit('logout');
                    this.$router.push({ name: 'login' });
                })
                .catch(() => { })
        }
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
