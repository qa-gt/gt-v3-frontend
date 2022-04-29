<template>
    <el-card style="width: 70%; margin-left: 15%">
        <h2>Tape提问箱</h2>
        <el-divider />
        <el-card
            style="
                margin: 20px 50% 20px 0px;
                algin: center;
                display: inline-block;
                vertical-align: middle;
            "
        >
            <div>
                <span>
                    <el-avatar />
                </span>
                <span> 由 {{ username }} 创建的提问箱 </span>
            </div>
        </el-card>

        <div>
            <el-tag size="large" style="width: 100%; justify-content: left">
                <div style="font-size: 13px; justify-content: left">
                    Ta的留言 > &emsp; {{ message }}
                </div>
            </el-tag>
        </div>
        <div style="margin-top: 20px">
            <el-input
                type="textarea"
                maxlength="150"
                rows="4"
                show-word-limit
                placeholder="说点悄悄话吧！"
                v-model="asr"
            />
        </div>
        <div style="margin-top: 20px; float: right; margin-bottom: 20px">
            <el-button type="primary">投递</el-button>
        </div>
    </el-card>
    <el-card style="margin-top: 20px; width: 70%; margin-left: 15%">
        <h3>看看别人都说了些啥</h3>
        <el-divider />
        <div v-for="item in reply" :key="item">
            <span>
                {{ item.answer }}
            </span>
            <span style="float: right; font-size: 13px; color: gray">
                发表时间：{{ item.time }}
            </span>
            <el-divider />
        </div>
    </el-card>
</template>

<script>
import ElLoading from "element-plus";

export default {
    props: {
        message: {
            type: String,
            default: "请在这里对我说悄悄话！",
        },
        id: {
            type: Number,
            default: null,
        },
        username: {
            type: String,
            default: "",
        },
        userid: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            asr: "",
            reply: [
                { answer: "hhh", time: "2022/04/30 12:00:00" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },

            ],
        };
    },
    init() {
        const loading = ElLoading.service({ fullscreen: true });
        this.$axios
            .get(`/tapebox/${this.$route.params.aid}/`)
            .then((res) => {
                res.create_time = this.$moment(res.create_time).fromNow();
                res.update_time = this.$moment(res.update_time).fromNow();
                this.atc = res;
            })
            .then(() => setTimeout(loading.close, 100))
            .catch((err) => err);
        this.$axios
            .get("/like/", { params: { article: this.$route.params.aid } })
            .then((res) => {
                this.atcLike = res;
                this.liked = this.atcLike.some(
                    (item) => item.user.id === this.user.id
                );
            });
        this.getCmts();
        if (!this.readedAtc.includes(this.$route.params.aid)) {
            this.$axios
                .patch(`/article/${this.$route.params.aid}/read/`)
                .then(() => {
                    this.atc.read_count += 1;
                })
                .catch((err) => err);
            this.$store.commit("addReadedAtc", this.$route.params.aid);
        }
    },
};
</script>

<style></style>
