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
                    <h2>创建一个表单</h2>
                    <el-divider />
                    <el-card>
                        <el-dropdown>
                            <el-button type="primary" plain>
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
                                    <el-dropdown-item command="filling"
                                        >填空题</el-dropdown-item
                                    >
                                    <el-dropdown-item command="timeChoice"
                                        >时间选择</el-dropdown-item
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
                    </el-card>
                </el-card>
            </div>

            <el-card>
                <h2>表单预览 & 编辑</h2>
                <el-divider />
                <gt-form :formdata="form" :in_edit="true" />
                <div
                    :key="item"
                    v-for="item in formitems"
                    stlye="margin-bottom: 15px"
                >
                    <div style="margin-bottom: 15px">
                        <el-card> </el-card>
                    </div>
                </div>
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
            form: {
                id: 2,
                title: "",
                creator: {
                    id: 3,
                    username: "dw",
                    portrait: "",
                },
                create_time: "2022-04-21T21:43:49.791713+08:00",
                end_time: null,
                questions: [
                    {
                        id: 1,
                        title: "",
                        type: 1,
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
                    },
                ],
            },
        };
    },
    methods: {
        choice() {
            console.log("press");
            ElMessage.info("Added a chioce");
            this.form.questions.push({
                id: 1,
                title: "",
                type: 1,
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
            });
            console.log(this.form);
        },
        multipleChoice() {
            ElMessage.info("Added a multiplechioce");
            this.form.questions.push({
                id: 2,
                title: "",
                type: 2,
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
            });
        },
    },
};
</script>

<style></style>
