<template>
    <el-row justify="space-evenly" style="margin-bottom: 40px">
        <el-col
            :xs="24"
            :sm="18"
            :md="6"
            :lg="5"
            :xl="4"
            style="margin-bottom: 20px"
        >
            <gt-user :user="user"></gt-user>
        </el-col>
        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <el-card full shadow="hover">
                <h2>编辑文章</h2>
                <p style="color: rgb(200, 200, 200)">
                    若预览显示异常, 请复制源文本后刷新页面
                </p>
                <el-divider />
                <el-form label-position="top">
                    <el-form-item>
                        <el-input
                            v-model="atc.title"
                            class="w-50 m-2"
                            maxlength="100"
                            show-word-limit
                            placeholder="起个名字..."
                        />
                    </el-form-item>
                    <gt-md-editor
                        style="height: 600px; margin-bottom: 20px"
                        v-model="atc.content"
                        :onSave="save"
                        :onUploadImg="uploadImage"
                    />

                    <el-row
                        :gutter="20"
                        justify="space-between"
                        style="margin-bottom: 30px"
                    >
                        <el-col>
                            <el-select
                                v-model="atc.topic"
                                placeholder="请选择话题"
                            >
                                <el-option
                                    v-for="item in topics"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="doSubmit"
                            :disabled="disabled.submit"
                        >
                            <i class="fal fa-paper-plane" />
                            &emsp;提&ensp;交&ensp;
                        </el-button>
                        <el-popconfirm
                            title="确认要取消吗？本次编辑内容将不会保存。"
                            confirm-button-text="确定取消"
                            cancel-button-text="再想想看"
                            @confirm="cancel"
                        >
                            <template #reference>
                                <el-button> 取 消 </el-button>
                            </template>
                        </el-popconfirm>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss">
.v-md-editor {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0) !important;
    border: 1px solid #dcdfe6 !important;
}
</style>

<script>
import { mapState } from "vuex";
import gtUser from "@/components/gtUser.vue";
import gtMdEditor from "@/components/mdEditor.vue";
import { ElMessage } from "element-plus";
export default {
    computed: {
        ...mapState(["user", "uploadKey"]),
        isMobile() {
            return this.$root.isMobile;
        },
    },
    components: {
        gtUser,
        gtMdEditor,
    },
    data() {
        return {
            atc: {
                exist: false,
                id: "",
                title: "",
                content: "",
                topic: "",
            },
            topics: [],
            disabled: { submit: false },
        };
    },
    methods: {
        async doSubmit() {
            this.disabled.submit = true;
            if (
                this.atc.title.trim() === "" ||
                this.atc.content.trim() === ""
            ) {
                ElMessage.error("标题或正文不能为空");
                this.disabled.submit = false;
                return;
            } else if (this.atc.content.length > 10000) {
                ElMessage.error(
                    "正文内容不能超过10000字符！如果确有需要请与管理员联系申请。"
                );
                this.disabled.submit = false;
                return;
            }

            await this.$recaptchaLoaded();
            const token = await this.$recaptcha("write");

            let atc = this.atc;
            atc._topic = atc.topic;
            delete atc.topic;
            atc.recaptcha = token;

            if (this.atc.exist) {
                this.$axios
                    .patch(`/article/${atc.id}/`, atc)
                    .then(res => {
                        ElMessage.success("修改成功！");
                        this.$router.push(`/article/${res.id}`);
                    })
                    .finally(() => {
                        this.disabled.submit = false;
                    });
            } else {
                this.$axios
                    .post("/article/", atc)
                    .then(res => {
                        ElMessage.success("提交成功！");
                        this.$router.push(`/article/${res.id}`);
                    })
                    .finally(() => {
                        this.disabled.submit = false;
                    });
            }

            //setTimeout(() => this.disabled.submit = false, 3000);
        },
        async uploadImage(files, callback) {
            const file = files[0];
            if (file.size > 1024 * 1024 * 5) {
                ElMessage.error("图片大小不能超过5M");
                return;
            }
            // const formData = new FormData();
            // formData.append("file", file);
            // ElMessage.info("正在上传图片...");
            // this.$axios.post("/utils/upload_image", formData).then(res => {
            //     insertImage({ url: res.url, desc: file.name });
            //     ElMessage.success("上传成功！");
            // });
            let res = this.uploadKey;
            if (!res || !res.expire || res.expire < Date.now()) {
                res = await this.$axios
                    .post("/utils/upload_key")
                    .then(res => res.data);
                if (!res.Credentials) {
                    ElMessage.error("上传未授权！");
                    return;
                }
                this.$store.commit("setUploadKey", res);
            }
            const bucket = res.Buckets[0];
            const s3 = new AWS.S3({
                region: "automatic",
                endpoint: bucket.s3Endpoint,
                credentials: res.Credentials,
                params: {
                    Bucket: bucket.s3Bucket,
                },
            });
            const fileKey = res.scope.replace(
                "*",
                String(new Date().getTime()) + file.name
            );
            let s3Upload = s3
                .upload({
                    Key: fileKey,
                    Body: file,
                    ContentType: file.type,
                })
                .on("httpUploadProgress", evt => {});
            s3Upload.send(err => {
                if (err) {
                    ElMessage.error("上传失败！");
                    return;
                } else {
                    callback([`https://gtcdn.yxzl.top/${fileKey}/30`]);
                    ElMessage.success("上传成功！");
                }
            });
        },
        cancel() {
            this.$router.go(-1);
            ElMessage.info("已取消");
        },
        save() {
            ElMessage.info("草稿保存功能正在开发中, 敬请期待！");
        },
    },
    created() {
        if (this.$route.query.id) {
            this.atc.id = this.$route.query.id;
            this.$axios
                .get(`/article/${this.atc.id}/`)
                .then(res => {
                    this.atc.topic = res.topic.id;
                    this.atc.title = res.title;
                    this.atc.content = res.content;
                    this.atc.exist = true;
                })
                .catch(err => err);
        }
        this.$axios.get("/topic/", { params: { min_state: 0 } }).then(data => {
            this.topics = data;
        });
    },
};
</script>
