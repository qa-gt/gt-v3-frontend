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

                    <!-- <v-md-editor
                        v-model="atc.content"
                        height="600px"
                        style="box-shadow: 0 0"
                        :left-toolbar="
                            isMobile
                                ? 'undo redo | link image | save'
                                : 'undo redo | h bold italic strikethrough quote emoji | ul ol table hr | link image | save'
                        "
                        :right-toolbar="
                            isMobile
                                ? 'preview'
                                : 'preview toc sync-scroll fullscreen'
                        "
                        :disabled-menus="[]"
                        :mode="isMobile ? 'edit' : 'editable'"
                        :before-preview-change="beforePreviewChange"
                        @upload-image="uploadImage"
                        @save="save"
                    ></v-md-editor> -->
                    <md-editor
                        style="height: 600px; margin-bottom: 20px"
                        v-model="atc.content"
                        katexJs="https://cdn.staticfile.org/KaTeX/0.15.1/katex.min.js"
                        katexCss="https://cdn.staticfile.org/KaTeX/0.15.1/katex.min.css"
                        highlightJs="https://cdn.staticfile.org/highlight.js/11.2.0/highlight.min.js"
                        highlightCss="https://cdn.staticfile.org/highlight.js/10.0.0/styles/atom-one-dark.min.css"
                        prettierCDN="https://cdn.staticfile.org/prettier/2.0.3/standalone.min.js"
                        prettierMDCDN="https://cdn.staticfile.org/prettier/2.0.3/parser-markdown.min.js"
                        cropperCss="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.css"
                        cropperJs="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.js"
                        screenfullJs="https://cdn.staticfile.org/screenfull.js/5.1.0/screenfull.min.js"
                        :toolbars="
                            isMobile
                                ? [
                                      'link',
                                      'image',
                                      '-',
                                      'save',
                                      '-',
                                      'pageFullscreen',
                                      'preview',
                                  ]
                                : [
                                      'revoke',
                                      'next',
                                      '-',
                                      'bold',
                                      'underline',
                                      'strikeThrough',
                                      'quote',
                                      '-',
                                      'link',
                                      'image',
                                      'table',
                                      '-',
                                      'save',
                                      '-',
                                      'pageFullscreen',
                                      'preview',
                                  ]
                        "
                        :preview="!isMobile"
                        noMermaid
                        :historyLength="20"
                        showCodeRowNumber
                        :sanitize="processMarkdown"
                        previewTheme="vuepress"
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
                        <el-button type="primary" @click="doSubmit">
                            <i class="fal fa-paper-plane"/>
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
import { processMd, MdEditor } from "@/plugins/markdown";
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
        MdEditor,
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
            // katex: katex,
        };
    },
    methods: {
        processMarkdown(content) {
            return processMd(content, true);
        },
        doSubmit() {
            if (
                this.atc.title.trim() === "" ||
                this.atc.content.trim() === ""
            ) {
                ElMessage.error("标题或正文不能为空");
                return;
            }
            if (this.atc.exist) {
                let atc = this.atc;
                atc._topic = atc.topic;
                delete atc.topic;
                this.$axios.patch(`/article/${atc.id}/`, atc).then(res => {
                    ElMessage.success("修改成功!");
                    this.$router.push(`/article/${res.id}`);
                });
            } else {
                let atc = this.atc;
                atc._topic = atc.topic;
                delete atc.topic;
                this.$axios.post("/article/", atc).then(res => {
                    ElMessage.success("提交成功!");
                    this.$router.push(`/article/${res.id}`);
                });
            }
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
                    ElMessage.error("上传未授权!");
                    return;
                }
                this.$store.commit("setUploadKey", res);
            }
            const bucket = res.Buckets[0];
            const s3 = new AWS.S3({
                // const s3 = new window.S3({
                region: "automatic",
                endpoint: bucket.s3Endpoint,
                credentials: res.Credentials,
                params: {
                    Bucket: bucket.s3Bucket,
                },
            });
            const fileKey = res.scope.replace("*", file.name);
            let s3Upload = s3
                .upload({
                    Key: fileKey,
                    Body: file,
                    ContentType: file.type,
                })
                .on("httpUploadProgress", evt => {
                    console.log(evt);
                });
            s3Upload.send((err, data) => {
                if (err) {
                    ElMessage.error("上传失败!");
                    return;
                } else {
                    callback([`https://gtcdn.yxzl.top/${fileKey}/30`]);
                    ElMessage.success("上传成功!");
                }
            });
        },
        cancel() {
            this.$router.go(-1);
            ElMessage.info("已取消");
        },
        save() {
            ElMessage.info("草稿保存功能正在开发中, 敬请期待!");
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
            // this.topics = data.results;
            this.topics = data;
        });
    },
};
</script>
