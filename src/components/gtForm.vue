<template>
    <el-row justify="center" class="gt-form">
        <el-col :xs="23" :sm="16" :md="14" :lg="12" :xl="10">
            <el-card>
                <template #header>
                    <!-- 表单标题部分 -->
                    <div
                        style="
                            font-size: 20px;
                            font-weight: bold;
                            display: inline-block;
                            word-break: break-all;
                            vertical-align: middle;
                        "
                        v-if="!in_edit"
                    >
                        {{ formdata.title }}
                    </div>
                    <div
                        style="
                            font-size: 20px;
                            font-weight: bold;
                            display: inline-block;
                            word-break: break-all;
                            vertical-align: middle;
                        "
                        v-if="in_edit"
                    >
                        <el-input
                            v-model="formdata.title"
                            placeholder="表单标题"
                            clearable
                        />
                    </div>
                </template>
                <!-- 表单题目 -->
                <div
                    class="question"
                    v-for="(i, id) in formdata.questions"
                    :key="id"
                >
                    <span
                        v-if="in_edit"
                        style="float: right; margin-bottom: 20px"
                        ><el-switch
                            v-model="i.mustDo"
                            size="small"
                            active-text="必做题"
                            inactive-text="选做题"
                            style="margin-right: 20px"
                        />
                        <el-popconfirm
                            title="确定要删除本题吗？删除后将不可恢复。"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="del_que(id)"
                        >
                            <template #reference>
                                <el-button size="small" type="danger" plain>
                                    删除该题
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </span>
                    <!-- 如果 !in_edit，那么显示预览界面（题目标题） -->
                    <div v-if="!in_edit">
                        <h4 style="margin-top: 0">
                            {{ id + 1 }}. [{{ isMust(i.mustDo) }}]
                            {{ i.title }}
                        </h4>
                    </div>
                    <!-- 如果 in_edit，那么显示编辑界面（题目标题） -->
                    <span v-if="in_edit">
                        <span> {{ id + 1 }}. </span>
                        <el-input
                            style="margin-top: 0"
                            v-model="formdata.questions[id].title"
                            placeholder="请输入题目"
                        />
                    </span>
                    <!-- 如果 !in_edit，那么显示预览界面（单选选项） -->
                    <div
                        style="margin: 15px"
                        v-if="!in_edit"
                        v-show="i.type === 1"
                    >
                        <el-radio
                            v-for="(j, index) in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            {{ i.choices[index].title }}
                        </el-radio>
                    </div>
                    <!-- 如果 in_edit，那么显示编辑界面（单选选项） -->
                    <div
                        style="margin: 15px"
                        v-if="in_edit"
                        v-show="i.type === 1"
                    >
                        <el-radio
                            v-for="(j, index) in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            :disabled="in_edit"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            <el-input
                                placeholder="请输入选项内容"
                                v-model="
                                    formdata.questions[id].choices[index].title
                                "
                                size="small"
                                style="width: 90%; margin-right: 10px"
                            />
                            <el-popconfirm
                                title="确定要删除本选项吗？删除后将不可恢复。"
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                                @confirm="del_choice(id, index)"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        size="small"
                                        plain
                                        circle
                                    >
                                        <i class="far fa-trash"></i>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </el-radio>
                        <el-button
                            style="width: 103.1%"
                            type="primary"
                            size="small"
                            plain
                            @click="add_choice(id)"
                        >
                            + 添加选项
                        </el-button>
                    </div>

                    <!-- 如果 !in_edit，那么显示预览界面（多选选项） -->
                    <div
                        style="margin: 15px"
                        v-if="!in_edit"
                        v-show="i.type === 2"
                    >
                        <el-checkbox
                            v-for="(j, index) in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            {{ i.choices[index].title }}
                        </el-checkbox>
                    </div>
                    <!-- 如果 in_edit，那么显示编辑界面（多选选项） -->
                    <div
                        style="margin: 15px"
                        v-if="in_edit"
                        v-show="i.type === 2"
                    >
                        <!-- i 是当前题目，j 是当前选项 -->
                        <el-checkbox
                            v-for="(j, index) in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            :disabled="in_edit"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            <el-input
                                placeholder="请输入选项内容"
                                v-model="
                                    formdata.questions[id].choices[index].title
                                "
                                size="small"
                                style="width: 245%; margin-right: 10px"
                            />
                            <el-popconfirm
                                title="确定要删除本选项吗？删除后将不可恢复。"
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                                @confirm="del_choice(id, index)"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        size="small"
                                        plain
                                        circle
                                    >
                                        <i class="far fa-trash"></i>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </el-checkbox>
                        <el-button
                            style="width: 103.1%"
                            type="primary"
                            size="small"
                            plain
                            @click="add_choice(id)"
                        >
                            + 添加选项
                        </el-button>
                    </div>
                </div>
                <el-button type="primary" v-if="!in_edit" @click="confirmed">
                    &ensp;提&emsp;交&ensp;
                </el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
    name: "gtForm",
    props: {
        showFollow: {
            type: Boolean,
            default() {
                return true;
            },
        },
        formdata: {
            type: Object,
            default: {},
        },
        in_edit: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            max: 4,
            questionnumber: 4,
            dialogVisible: false, // 设置表单设置选项卡初始状态为不显示
            form1: {
                id: 2,
                questions: [
                    {
                        id: 4,
                        title: "请选择你的性别",
                        type: 1,
                        choices: [
                            {
                                id: 3,
                                num: 1,
                                title: "男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男",
                                // title: "男",
                            },
                            {
                                id: 4,
                                num: 2,
                                title: "女",
                            },
                        ],
                        choice: 0,
                    },
                    {
                        id: 5,
                        title: "请选择你的性别",
                        type: 1,
                        choices: [
                            {
                                id: 3,
                                num: 1,
                                title: "男",
                            },
                            {
                                id: 4,
                                num: 2,
                                title: "女",
                            },
                        ],
                        choice: 0,
                    },
                ],
                creator: {
                    id: 3,
                    username: "dw",
                    portrait: "",
                },
                title: "表单标题",
                create_time: "2022-04-21T21:43:49.791713+08:00",
                end_time: null,
            },
        };
    },
    methods: {
        del_choice(id, index) {
            this.formdata.questions[id].choices.splice(index, 1);
            ElMessage.info("已删除");
        },
        del_que(id) {
            // this.$delete(this.formdata.questions, id);
            this.formdata.questions.splice(id, 1);
            ElMessage.info("已删除");
        },
        add_choice(id) {
            let max = this.formdata.questions[id].choices.length;
            this.formdata.questions[id].choices.push({
                id: (this.max = this.max + 1 + max),
                num: this.max,
                title: "",
            });
            ElMessage.success("添加成功");
        },
        confirmed() {},
        isMust(mustDo) {
            if (mustDo === true) {
                return "必做";
            } else if (mustDo === false) {
                return "选做";
            }
        },
    },
};
</script>

<style scoped>
.gt-form {
    margin: 20px 0 40px 0;
}
</style>
