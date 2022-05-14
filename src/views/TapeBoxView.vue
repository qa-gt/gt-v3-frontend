<template>
    <el-drawer v-model="drawer" direction="ttb" size="35%">
        <div style="text-align: center">
            <el-input
                v-model="reply.content"
                placeholder="内容"
                style="margin-bottom: 10px; max-width: 800px"
            />
            <el-input
                v-model="reply.token"
                placeholder="识别码（选填）"
                style="margin-bottom: 10px; max-width: 800px"
            />
            <el-button
                type="primary"
                @click="sendReply"
                :disabled="!reply.content || sending"
                style="
                    margin: 10px auto;
                    display: block;
                    width: 100%;
                    max-width: 800px;
                "
            >
                发送
            </el-button>
        </div>
    </el-drawer>

    <el-row justify="space-evenly">
        <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
            <el-card>
                <h2>Tape提问箱</h2>
                <el-divider />
                <div class="el-card tape-title">
                    <div
                        style="
                            background: #000;
                            opacity: 0.6;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            padding: 20px !important;
                        "
                    >
                        <div
                            style="
                                color: #ffffff;
                                font-size: 200%;
                                display: block;
                                text-align: center;
                                font-weight: bold;
                                padding: 10px 10px 20px 10px;
                            "
                        >
                            {{ box.title || $root.yiyan.content }}
                        </div>
                        <el-row style="margin: 10px 0" />
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                flex-grow: 1;
                            "
                        >
                            <el-avatar style="margin-right: 10px" />
                            <span style="font-weight: bold; color: #dcdcdc">
                                由 {{ box.user.username }} 创建的提问箱
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    v-show="
                        this.user === undefined ||
                        this.user.id !== this.box.user.id
                    "
                >
                    <div style="padding-top: 20px">
                        <el-input
                            type="textarea"
                            maxlength="150"
                            rows="4"
                            show-word-limit
                            placeholder="说点悄悄话吧！"
                            v-model="new_question"
                            style="margin: 0 5%; width: 90%"
                        />
                    </div>
                    <div style="padding: 5px 5% 30px 0; float: right">
                        <el-button
                            type="primary"
                            @click="sendQuestion"
                            :disabled="!new_question || sending"
                        >
                            投递
                        </el-button>
                    </div>
                </div>
            </el-card>
            <el-row style="margin: 10px 0" />
            <el-card>
                <h3>{{ box.user.username }} 的其他回答</h3>
                <el-divider />
                <div v-for="item in questions" :key="item">
                    <div class="question">
                        <span style="font-weight: bold">
                            {{ item.content }}
                        </span>
                        <span
                            style="float: right; font-size: 13px; color: gray"
                        >
                            {{ $moment(item.time).format("lll") }}
                        </span>
                    </div>
                    <div
                        class="reply"
                        v-for="reply in item.reply"
                        :key="reply.id"
                    >
                        {{ reply.is_owner ? "答" : "问" }}： {{ reply.content }}
                        <span
                            style="float: right; font-size: 13px; color: gray"
                        >
                            {{ $moment(reply.time).format("lll") }}
                        </span>
                    </div>
                    <el-button
                        style="margin-left: 15px; color: gray"
                        size="small"
                        @click="
                            target = item.id;
                            drawer = true;
                        "
                    >
                        新增
                    </el-button>
                    <el-divider />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
            box: { user: {} },
            target: 0,
            reply: {
                content: "",
                token: "",
            },
            drawer: false,
            questions: [],
            new_question: "",
            sending: false,
        };
    },
    methods: {
        async sendQuestion() {
            if (this.new_question.length > 300) {
                ElMessage.warning("提问内容不能超过300字！");
                return;
            }
            this.sending = true;
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha("tape");
            this.$axios
                .post("/tape_question/", {
                    box: this.$route.params.id,
                    content: this.new_question,
                    recaptcha: token,
                })
                .then(res => {
                    // Copy the question's key to clipboard
                    const t = document.createElement("input");
                    t.value = res.token;
                    document.body.appendChild(t);
                    t.select();
                    document.execCommand("copy");
                    t.remove();
                    ElMessage.success(
                        "投递成功！问题token已保存至剪贴板，请注意留存。"
                    );
                    this.new_question = "";
                    this.init();
                })
                .finally(() => {
                    this.sending = false;
                });
        },
        async sendReply() {
            if (this.reply.content.length > 300) {
                ElMessage.warning("回复内容不能超过300字！");
                return;
            }
            if (!this.reply.token) {
                if (!this.$root.loggedIn) {
                    ElMessage.warning("未登录时识别码为必填项！");
                    return;
                } else {
                    let ans = await ElMessageBox.confirm(
                        "您没有填写识别码，请确认该提问是使用当前账号发出的，否则无法新增回复。是否继续发送？",
                        "提示",
                        {
                            confirmButtonText: "发送",
                            cancelButtonText: "取消",
                            type: "warning",
                        }
                    )
                        .then(() => true)
                        .catch(() => false);
                    if (!ans) return;
                }
            }
            this.sending = true;
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha("tape");
            this.$axios
                .post("/tape_reply/", {
                    question: this.target,
                    content: this.reply.content,
                    token: this.reply.token,
                    recaptcha: token,
                })
                .then(res => {
                    this.init();
                    this.drawer = false;
                })
                .finally(() => {
                    this.sending = false;
                });
        },
        init() {
            this.$axios.get(`/tape_box/${this.$route.params.id}/`).then(res => {
                this.box = res;
            });
            this.$axios
                .get("/tape_question/", {
                    params: { box: this.$route.params.id },
                })
                .then(res => res.results)
                .then(res => {
                    this.questions = res;
                });
        },
    },
    created() {
        this.init();
    },
};
</script>

<style scoped lang="scss">
.tape-title {
    background: url(https://api.yixiangzhilv.com/utils/wallpaper);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 10px 5%;
}
.el-card {
    padding: 0 !important;
}

.question {
    word-break: break-all;
}

.reply {
    border-left: 5px solid #dcdcdc;
    color: gray;
    padding-left: 10px;
    word-break: break-all;
    margin: 10px 0 10px 15px;
    line-height: 1.5rem;
}
</style>
