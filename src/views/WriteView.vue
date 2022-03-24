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
                            v-model="ayc.title"
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
                    ></v-md-editor>

                    <br />

                    <el-row gutter="20" justify="space-between">
                        <el-col>
                            <el-select
                                v-model="atc.topic"
                                placeholder="请选择话题"
                            >
                                <el-option
                                    key="item.value"
                                    label="item.lable"
                                    value="item.value"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                    <br /><br />
                    <el-form-item>
                        <el-button type="primary" @click="doSubmit">
                            <el-icon><promotion /></el-icon> &emsp;提&ensp;交
                            &ensp;</el-button
                        >
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

<style scoped>
.v-md-editor {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
    border: 1px solid #dcdfe6;
}
</style>

<script>
import { ref } from "vue";
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
            activeName: ref("first"),
            atc: {
                id: "",
                title: "",
                content: "",
                topic: "",
            },
            tags: ref([
                { text: "创始人", type: "" },
                { text: "超级管理员", type: "" },
                { text: "实名信息：王**(210819**)", type: "info" },
            ]),
        };
    },
    change(e) {
        this.$forceUpdate(); // 更新视图
        return {
            e: e, //返回值
        };
    },
    methods: {
        beforePreviewChange(text, next) {
            console.log(text);
            next(processMarkdown(text));
        },
        doSubmit() {
            ElMessage.success("贴子发布成功！");
            this.$router.push({ name: "article" });
            location.href = "/#/article/"; //在后面加上帖子id
        },
        uploadSuccess(res) {
            console.log(res);
            ElMessage.success("上传成功！");
        },
        uploadError(err) {
            console.log(err);
            ElMessage.error("上传失败: " + err);
        },
        cancel: () => {
            location.href = "/#/index";
            ElMessage.info("已取消");
        },
    },
};
</script>
