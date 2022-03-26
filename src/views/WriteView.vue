<template>
    <el-row justify="space-evenly">
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
                <el-divider />
                <el-form label-position="top">
                    <el-form-item>
                        <el-input
                            v-model="atc.title"
                            class="w-50 m-2"
                            maxlength="100"
                            show-word-limit
                            placeholder="起个名字..."
                            @input="change($event)"
                        />
                    </el-form-item>

                    <v-md-editor
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
                    ></v-md-editor>

                    <br />

                    <el-row gutter="20" justify="space-between">
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
                    <br /><br />
                    <el-form-item>
                        <el-button type="primary" @click="doSubmit">
                            <el-icon><promotion /></el-icon>
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

<style>


.v-md-editor {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0) !important;
    border: 1px solid #dcdfe6 !important;
}
</style>

<script>
import { mapState } from "vuex";
import gtUser from "@/components/gtUser.vue";

import { VMdEditor, processMarkdown } from "@/plugins/mdEditor";
import { ElMessage } from "element-plus";

export default {
    computed: {
        ...mapState(["user", "isMobile"]),
    },
    components: {
        gtUser,
        VMdEditor,
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
        };
    },
    methods: {
        beforePreviewChange(text, next) {
            next(processMarkdown(text, true));
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
        uploadImage(event, insertImage, files) {
            const file = files[0];
            const formData = new FormData();
            formData.append("file", file);
            ElMessage.info("正在上传图片...");
            this.$axios.post("/utils/upload_image", formData).then(res => {
                insertImage({ url: res.url, desc: file.name });
                ElMessage.success("上传成功！");
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
            this.$axios.get(`/article/${this.atc.id}/`).then(res => {
                this.atc.topic = res.topic.id;
                this.atc.title = res.title;
                this.atc.content = res.content;
                this.atc.exist = true;
            });
        }
        this.$axios.get("/topic/?min_state=0").then(data => {
            this.topics = data.results;
        });
    },
};
</script>
