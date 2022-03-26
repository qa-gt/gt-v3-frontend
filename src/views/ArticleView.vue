<template>
    <el-row justify="space-evenly" style="margin-bottom: 50px">
        <el-col
            :xs="24"
            :sm="18"
            :md="6"
            :lg="5"
            :xl="4"
            style="margin-bottom: 20px"
        >
            <gt-user :user="atc.author"></gt-user>
        </el-col>

        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <el-card shadow="hover" full class="read-card">
                <div class="info">
                    <el-collapse style="border: 0">
                        <el-collapse-item class="articleInfo">
                            <template #title>
                                <h2 class="overflow" style="float: left">
                                    {{ atc.title }}
                                </h2>
                            </template>
                            <p>标题&emsp;{{ atc.title }}</p>
                            <p>话题&emsp;{{ atc.topic.name }}</p>
                            <p>作者&emsp;{{ atc.author.username }}</p>
                            <p>发布时间&emsp;{{ atc.create_time }}</p>
                            <p>更新时间&emsp;{{ atc.update_time }}</p>
                            <p>阅读量&emsp;{{ atc.read_count }}</p>
                            <p>
                                ID&emsp;{{ atc.id }}
                                <el-button
                                    type="danger"
                                    size="small"
                                    plain
                                    @click="report"
                                    style="float: right; margin-right: 5px"
                                >
                                    <el-icon>
                                        <Warning class="report-icon" />
                                    </el-icon>
                                    <div>&ensp;举&ensp;报</div>
                                </el-button>
                            </p>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-divider style="margin-top: 10px" />
                <v-md-preview
                    :text="atc.content"
                    :style="{
                        minHeight: '250px',
                        maxHeight: '250px',
                        overflow: 'auto',
                        padding: '10px',
                    }"
                />
            </el-card>
            <br /><br />
            <el-card shadow="hover" class="comments-card">
                <transition
                    v-on:before-enter="commentAnimation1"
                    v-on:enter="commentAnimation2"
                    v-on:leave="commentAnimation3"
                >
                    <el-row gutter="3" v-if="showComment" id="commentArea">
                        <el-col :span="24">
                            <el-input
                                v-model="comment"
                                maxlength="400"
                                :placeholder="
                                    reply.status
                                        ? '回复 ' + reply.username
                                        : '说点什么...'
                                "
                                show-word-limit
                                :rows="3"
                                type="textarea"
                                @keydown.ctrl.enter="commentSubmit"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </transition>
                <el-row justify="right" style="float: right">
                    <el-button
                        type="primary"
                        style="padding: 10px; margin-right: 5px"
                        v-show="showComment"
                        @click="commentSubmit"
                        id="commentButton"
                    >
                        发表<span v-if="!reply.status">评论</span>
                        <span v-else>回复</span>
                    </el-button>

                    <el-dropdown trigger="hover">
                        <el-button type="primary" style="padding: 10px">
                            互动<el-icon style="margin-left: 10px"
                                ><arrow-down
                            /></el-icon>
                        </el-button>
                        <template v-slot:dropdown>
                            <el-dropdown-menu>
                                <span>
                                    <el-dropdown-item @click="like">
                                        <el-icon><watermelon /></el-icon>
                                        <span v-if="!liked">
                                            &ensp;吃&ensp;瓜&ensp;
                                        </span>
                                        <span v-else>
                                            &ensp;取&ensp;消&ensp;
                                        </span>
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="writeComment">
                                        <el-icon><comment /></el-icon>
                                        &ensp;评&ensp;论&ensp;
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="collect">
                                        <el-icon><star /></el-icon>
                                        &ensp;收&ensp;藏&ensp;
                                    </el-dropdown-item>
                                </span>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-row>
                <el-divider style="margin-top: 60px" />
                <p style="font-weight: bold; font-size: 1.1rem">吃瓜</p>
                <el-row justify="left">
                    <div class="info-2">
                        <span v-for="item in atcLike" :key="item.user"
                            >{{ item.user.username }},
                        </span>
                    </div>
                </el-row>
                <el-divider />
                <p style="font-weight: bold; font-size: 1.1rem">评论</p>
                <el-row
                    class="comment-item"
                    v-for="item in atcComment"
                    :key="item.id"
                >
                    <el-col
                        :xs="4"
                        :sm="3"
                        :md="2"
                        :lg="1"
                        :xl="1"
                        style="padding: 5px"
                    >
                        <img :src="item.author.portrait" style="width: 100%" />
                    </el-col>
                    <el-col :xs="20" :sm="21" :md="22" :lg="23" :xl="23">
                        <div
                            class="comment-content"
                            :style="{
                                'padding-left': isMobile ? '5px' : '20px',
                            }"
                        >
                            <div class="comment-title">
                                <span>
                                    <span class="comment comment-user">
                                        {{ item.author.username }}
                                    </span>
                                    <span
                                        class="comment comment-user"
                                        v-if="item.reply"
                                    >
                                        &ensp;回复&ensp;
                                        {{ item.reply.author.username }}
                                    </span>
                                    <span class="comment comment-time">
                                        {{ $moment(item.time).fromNow() }}
                                        <el-dropdown trigger="hover">
                                            <el-icon
                                                style="
                                                    margin-left: 5px;
                                                    margin-top: 4px;
                                                "
                                            >
                                                <!-- <arrow-down /> -->
                                                <plus
                                                    style="
                                                        color: rgb(
                                                            185,
                                                            185,
                                                            185
                                                        );
                                                    "
                                                />
                                            </el-icon>
                                            <template v-slot:dropdown>
                                                <el-dropdown-menu>
                                                    <span>
                                                        <el-dropdown-item
                                                            disabled
                                                        >
                                                            ID: {{ item.id }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item
                                                            @click="
                                                                replyCmt(item)
                                                            "
                                                        >
                                                            <el-icon
                                                                ><comment
                                                            /></el-icon>
                                                            &ensp;回&ensp;复&ensp;
                                                        </el-dropdown-item>
                                                        <el-dropdown-item
                                                            @click="report"
                                                        >
                                                            <el-icon>
                                                                <warning />
                                                            </el-icon>
                                                            &ensp;举&ensp;报&ensp;
                                                        </el-dropdown-item>
                                                    </span>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </span>
                                </span>
                            </div>
                            <div class="comment comment-text">
                                {{ item.content }}
                            </div>
                        </div>
                    </el-col>
                    <el-divider class="comment-divider" />
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
import Velocity from "velocity-animate";
import { mapState } from "vuex";
import gtUser from "@/components/gtUser.vue";
import { ElLoading } from "element-plus";
import { VMdPreview, processMarkdown } from "@/plugins/mdEditor";

export default {
    components: {
        gtUser,
        VMdPreview,
    },
    data() {
        return {
            atc: { topic: {}, author: {} },
            atcLike: [],
            atcComment: [],
            showComment: false,
            liked: false,
            comment: "",
            reply: { status: false, id: 0, username: "" },
        };
    },
    computed: {
        ...mapState(["user", "theme", "isMobile", "loggedIn"]),
    },
    methods: {
        refresh() {
            this.$axios
                .get(`/like/?article=${this.$route.params.id}`)
                .then(res => {
                    this.atcLike = res;
                });
            this.$axios
                .get(`/comment/?article=${this.$route.params.id}&min_state=0`)
                .then(res => {
                    this.atcComment = res;
                });
        },
        replyCmt(cmt) {
            this.reply.status = true;
            this.reply.id = cmt.id;
            this.reply.username = cmt.author.username;
            this.showComment = true;
            console.log(1);
            setTimeout(function () {
                console.log(2);
                document.getElementById("commentButton").scrollIntoView();
            }, 100);
        },
        report() {
            ElMessage.warning("举报功能暂未开通");
        },
        commentSubmit() {
            if (this.comment.trim() === "") {
                ElMessage.error("评论不能为空!");
                return;
            }
            this.$axios
                .post(`/comment/`, {
                    article: this.$route.params.id,
                    content: this.comment,
                    reply: (this.reply.status && this.reply.id) || "",
                })
                .then(res => {
                    console.log(res);
                    ElMessage.success("评论成功！");
                    this.refresh();
                    this.comment = "";
                    setTimeout(() => {
                        this.writeComment();
                    }, 100);
                });
        },
        writeComment() {
            this.showComment = true;
            this.reply.status = false;
        },
        like() {
            this.$axios
                .post("/like/", { article: this.$route.params.id })
                .then(res => {
                    if (res.opt === "add") {
                        this.liked = true;
                    } else if (res.opt === "cancel") {
                        this.liked = false;
                    }
                    this.refresh();
                    ElMessage.success(res.detail);
                });
        },
        // 动画
        commentAnimation1(el) {
            el.style.opacity = 0;
            el.style.height = 0;
        },
        commentAnimation2(el, done) {
            Velocity(el, { opacity: 1, height: "80px" }, { duration: 300 });
            done();
        },
        commentAnimation3(el, done) {
            console.log(el);
            Velocity(
                el,
                { opacity: 0, height: 0 },
                { duration: 300, complete: done }
            );
        },
        collect() {
            this.$axios
                .post(`/collect/`, {
                    article: this.$route.params.id,
                })
                .then(res => {
                    ElMessage.success(res.detail);
                });
        },
        follow() {
            ElMessage.success(`已关注 ${this.username}!`);
        },
    },
    created() {
        const loading = ElLoading.service({ fullscreen: true });
        this.$axios.get(`/article/${this.$route.params.id}/`).then(res => {
            res.create_time = this.$moment(res.create_time).fromNow();
            res.update_time = this.$moment(res.update_time).fromNow();
            res.content = processMarkdown(res.content);
            this.atc = res;
            setTimeout(loading.close, 100);
            this.$axios
                .patch(`/article/${this.$route.params.id}/read/`)
                .then(res => {
                    this.atc.read_count += 1;
                });
        });
        this.$axios.get(`/like/?article=${this.$route.params.id}`).then(res => {
            this.atcLike = res;
            for (let i in res) {
                if (res[i].user.id === this.user.id) {
                    this.liked = true;
                    break;
                }
            }
        });
        this.$axios
            .get(`/comment/?article=${this.$route.params.id}&min_state=0`)
            .then(res => {
                this.atcComment = res;
            });
    },
};
</script>

<style>
.vuepress-markdown-body {
    margin-top: -10px;
    padding: 0 10px !important;
}

.info {
    font-size: 14px;
    color: #7a7a7a;
}

.info-2 {
    /* font-size: 1.3rem; */
    color: #7c7c7c;
    align-items: center;
    display: inline;
    word-break: break-all;
}

.read-card {
    min-height: 550px;
}

.conments-card {
    min-width: none;
    min-height: 200px;
}

.report-icon {
    width: 20px;
    height: 20px;
}

.oncomment-button {
    width: 100%;
    height: 100%;
}
</style>

<style>
.comment-item {
    margin-top: -5px;
    padding: 5px 15px;
    flex-wrap: wrap;
}

.comment {
    word-break: break-all;
}

.comment-user {
    font-weight: bold;
}

.comment-title {
    margin-bottom: 5px;
}

.comment-time {
    float: right;
    color: rgb(185, 185, 185);
}

.comment-divider {
    margin: 10px;
    /* margin-left: 5%; */
    /* width: 90%; */
}

.el-collapse-item__header,
.el-collapse-item__wrap {
    border-bottom: 0px solid rgba(255, 255, 255, 0) !important;
}

.overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.articleInfo,
.el-collapse-item__content {
    border: 0;
    margin-bottom: 0 !important;
}
.articleInfo p {
    margin: 0 5px !important;
}
</style>
