<template>
    <el-card shadow="hover" class="box-card" v-if="user.id || show">
        <template #header>
            <div class="card-header" style="vertical-align: middle">
                <el-avatar
                    :size="40"
                    :src="user.portrait || circleUrl"
                    fit="cover"
                    style="vertical-align: middle"
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
                >
                    关&ensp;注
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
                    style="margin: 2px 2px !important"
                    :type="tag.type"
                >
                    {{ tag }}
                </el-tag>
            </p>
            <p v-if="user.yunxiao" style="margin-top: -8px">
                <b>实名: &ensp;</b>
                <el-tag type="info" style="margin: 3px 0px !important">
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
    },
    data() {
        return {
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

            data: "",
            show: true,
        };
    },
    methods: {
        follow() {
            this.$axios.post(`/user/${this.user.id}/follow/`).then(res => {
                this.$message.success(res.detail);
            });
        },
    },
    mounted() {
        setTimeout(() => {
            this.show = false;
        }, 50);
        setTimeout(() => {
            console.log(this.user);
        }, 1000);
    },
};
</script>
