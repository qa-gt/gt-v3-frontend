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
            <gt-user :user="user" :showFollow="false"></gt-user>
        </el-col>

        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <div style="margin-bottom: 15px">
                <el-card>
                    <h2>
                        创建一个表单 &emsp;
                        <el-button type="text" > 使用帮助 </el-button>
                    </h2>

                    <el-divider />
                    <el-card>
                        <el-dropdown :disabled="!in_edit">
                            <el-button
                                type="primary"
                                plain
                                :disabled="!in_edit"
                            >
                                添加组件
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="choice()"
                                        >单选题</el-dropdown-item
                                    >
                                    <el-dropdown-item
                                        command="multipleChoice"
                                        @click="multipleChoice()"
                                        >多选题</el-dropdown-item
                                    >
                                    <el-dropdown-item
                                        command="filling"
                                        @click="gapFilling()"
                                        >填空题</el-dropdown-item
                                    >
                                    <el-dropdown-item command="timeChoice"
                                        >时间选择</el-dropdown-item
                                    >
                                    <el-dropdown-item @click="rating()"
                                        >评分</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span style="margin-left: 3%">设置表单截止时间:</span>
                        <span style="margin-left: 0.3%">
                            <el-date-picker
                                v-model="form.end_time"
                                type="datetime"
                                placeholder="选择日期和时间"
                                format="YYYY/MM/DD hh:mm:ss"
                                style="margin-left: 1%"
                            />
                        </span>
                        <span style="margin-left: 3%">谁可以填写表单:</span>
                        <span style="margin-left: 0.3%">
                            <el-select
                                style="margin-left: 1%"
                                v-model="form.whoCanEdit"
                            >
                                <el-option label="随意填写(默认)" value="0">
                                </el-option>
                                <el-option label="登录后填写" value="1">
                                </el-option>
                                <el-option label="微信认证后填写" value="2">
                                </el-option>
                            </el-select>
                        </span>
                        <span style="margin-left: 3%">
                            <el-switch
                                v-model="in_edit"
                                active-text="编辑模式"
                                inactive-text="预览模式"
                                active-color="#409eff"
                                inactive-color="#409eff"
                            />
                        </span>
                        <span style="margin-right: 3%; float: right">
                            <el-popconfirm
                                title="确定要保存吗？保存后将不可更改。"
                                confirm-button-text="确定保存"
                                cancel-button-text="继续编辑"
                                @confirm="uploadForm"
                            >
                                <template #reference>
                                    <el-button type="primary">
                                        保存表单
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </span>
                    </el-card>
                </el-card>
            </div>

            <el-card>
                <h2>表单预览 & 编辑</h2>
                <el-divider />
                <gt-form :formdata="form" :in_edit="in_edit" />
                <!-- <div
                    v-for="item in form.questions"
                    :key="item"
                    style="margin-bottom: 15px"
                >
                    <div style="margin-bottom: 15px">
                        <el-card>
                            {{ item }}
                        </el-card>
                    </div>
                </div> -->
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";
import gtForm from "@/components/gtForm.vue";
export default {
    computed: {
        ...mapState(["user"]),
    },
    components: {
        gtUser,
        gtForm,
    },
    data() {
        return {
            num: 1,
            in_edit: true,
            form: {
                id: 2,
                title: "",
                creator: {
                    id: 3,
                    username: "dw",
                    portrait: "",
                },
                whoCanEdit: "0",
                create_time: "2022-04-21T21:43:49.791713+08:00",
                end_time: null,
                message: "",
                questions: [
                    {
                        id: 1,
                        title: "",
                        type: 1,
                        mustDo: true,
                        options: {
                            type: "text",
                            maxlength: "",
                            minlength: "",
                            show_word_limit: false,
                            placeholder: "请输入",
                        },
                        choices: [
                            {
                                id: 1,
                                num: 1,
                                title: "",
                            },
                            {
                                id: 2,
                                num: 2,
                                title: "",
                            },
                            {
                                id: 3,
                                num: 3,
                                title: "",
                            },
                            {
                                id: 4,
                                num: 4,
                                title: "",
                            },
                        ],
                        choice: 0,
                    },
                ],
            },
        };
    },
    methods: {
        choice() {
            console.log("press");
            ElMessage.info("Added a choice");
            this.form.questions.push({
                id: (this.num += 1),
                title: "",
                type: 1,
                mustDo: true,
                choices: [
                    {
                        id: 1,
                        num: 1,
                        title: "",
                    },
                    {
                        id: 2,
                        num: 2,
                        title: "",
                    },
                    {
                        id: 3,
                        num: 3,
                        title: "",
                    },
                    {
                        id: 4,
                        num: 4,
                        title: "",
                    },
                ],
                choice: 0,
            });
            console.log(this.form);
        },
        multipleChoice() {
            ElMessage.info("Added a multiple choice");
            this.form.questions.push({
                id: (this.num += 1),
                title: "",
                type: 2,
                mustDo: true,
                choices: [
                    {
                        id: 1,
                        num: 1,
                        title: "",
                    },
                    {
                        id: 2,
                        num: 2,
                        title: "",
                    },
                    {
                        id: 3,
                        num: 3,
                        title: "",
                    },
                    {
                        id: 4,
                        num: 4,
                        title: "",
                    },
                ],
                choice: [], //多选题需要数组形式来存储用户的选择
            });
        },
        gapFilling() {
            console.log("press");
            ElMessage.info("Added a gap filling");
            this.form.questions.push({
                id: (this.num += 1),
                title: "",
                type: 3,
                mustDo: true,
                message: "",
                options: {
                    type: "text",
                    maxlength: null,
                    minlength: "",
                    show_word_limit: false,
                    placeholder: "请输入",
                },
            });
            console.log(this.form);
        },
        rating() {
            console.log("press");
            ElMessage.info("Added a gap filling");
            this.form.questions.push({
                id: (this.num += 1),
                title: "",
                type: 4,
                mustDo: true,
                rate: 0,
            });
            console.log(this.form);
        },
        uploadForm() {
            if (this.form.title === "") {
                ElMessage.error("你还没有填写表单标题！");
            } else if (this.form.questions.length === 0) {
                ElMessage.error("表单中应至少有一道题！");
            } else {
                // 在这里写前后端交互
                ElMessage.success("表单保存成功！");
            }
        },
    },
};
</script>

<style></style>
