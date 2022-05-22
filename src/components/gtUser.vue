<template>
    <el-card shadow="hover" class="box-card" v-if="user.id || show">
        <template #header>
            <div class="card-header" style="vertical-align: middle">
                <el-avatar
                    :size="40"
                    :src="user.portrait || circleUrl"
                    fit="cover"
                    style="vertical-align: middle; cursor: pointer"
                    @click="$router.push('/user/' + user.id)"
                />&emsp;
                <div
                    style="
                        font-size: 20px;
                        font-weight: bold;
                        display: inline-block;
                        word-break: break-all;
                        vertical-align: middle;
                        max-width: 120px;
                        cursor: pointer;
                    "
                    @click="$router.push('/user/' + user.id)"
                >
                    {{ user.username }}
                </div>
                <el-button
                    type="primary"
                    size="small"
                    style="float: right; margin-top: 10px"
                    @click="follow"
                    :disabled="user.id === $store.state.user.id"
                    v-bind:title="
                        user.id === $store.state.user.id ? '不能关注自己哦' : ''
                    "
                    v-if="showFollow && user.id !== $store.state.user.id"
                >
                    {{ !followed ? "关&ensp;注" : "取&ensp;关" }}
                </el-button>
            </div>
        </template>
        <div>
            <p>
                ID:{{ user.id }} |
                {{ user.grade === "保密" ? "年级保密" : user.grade }} |
                {{ { 0: "性别保密", 1: "♂", 2: "♀" }[user.gender] }}
            </p>
            <p>
                {{ user.introduction }}
            </p>
            <p v-if="user && user.tags">
                <b>认证: &ensp;</b>
                <el-tag
                    v-for="tag in user.tags.split(' ')"
                    :key="tag"
                    style="margin: 2px 2px"
                    :type="tag.type"
                >
                    {{ tag }}
                </el-tag>
            </p>
            <p v-if="user.yunxiao" style="margin-top: -8px">
                <b>实名: &ensp;</b>
                <el-tag type="info" style="margin: 3px 0px">
                    {{ user.yunxiao }}
                </el-tag>
            </p>
        </div>
    </el-card>
    <el-card shadow="hover" class="box-card" v-else>
        <template #header>
            <p style="font-size: 25px; text-align: center">
                <el-link
                    :underline="false"
                    @click="$router.push('/user/login')"
                    style="font-size: 25px"
                >
                    欢迎回来，请登录
                </el-link>
            </p>
        </template>
    </el-card>
</template>

<script>
export default {
    name: "gtUser",
    props: {
        user: {
            type: Object,
            default() {
                return {
                    id: false,
                };
            },
        },
        showFollow: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },
    data() {
        return {
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

            data: "",
            show: true,
            followed: false,
        };
    },
    methods: {
        follow() {
            if (!this.$store.state.jwt) {
                this.$message.warning("请先登录");
                return;
            }
            if (!this.followed) {
                this.$axios.post(`/user/${this.user.id}/follow/`).then(res => {
                    this.$message.success(res.detail);
                    this.followed = true;
                });
            } else {
                this.$axios
                    .post(`/user/${this.user.id}/unfollow/`)
                    .then(res => {
                        this.$message.success(res.detail);
                        this.followed = false;
                    });
            }
        },
    },
    watch: {
        user(val) {
            if (val.id) {
                this.show = true;
            } else {
                this.show = false;
            }
            this.followed = val.followed;
        },
    },
    mounted() {
        setTimeout(() => {
            this.show = false;
        }, 50);
    },
};
</script>
