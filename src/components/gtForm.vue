<template>
    <el-row justify="center" class="gt-form">
        <el-col :xs="23" :sm="16" :md="14" :lg="12" :xl="10">
            <el-card>
                <template #header>
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
                        />
                    </div>
                </template>
                <div
                    class="question"
                    v-for="(i, id) in formdata.questions"
                    :key="id"
                    
                >
                    <span v-if="in_edit" style="float: right; margin-bottom: 20px">
                        <el-button
                            size="small"
                            type="primary"
                            plain
                            @click="settings"
                        >
                            题目设置
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            plain
                            @click="remove"
                        >
                            删除该题
                        </el-button>
                    </span>
                    <div v-if="!in_edit">
                        <h4 style="margin-top: 0">
                            {{ id + 1 }}. {{ i.title }}
                        </h4>
                    </div>
                    <span v-if="in_edit">
                        <span> {{ id + 1 }}. </span>
                        <el-input
                            style="margin-top: 0"
                            v-model="formdata.questions[id].title"
                            placeholder="请输入题目"
                        />
                    </span>
                    <div style="margin: 15px" v-if="!in_edit">
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
                    <div style="margin: 15px" v-if="in_edit">
                        <el-radio
                            v-for="(j, index) in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            <el-input
                                placeholder="请输入选项内容"
                                v-model="
                                    formdata.questions[id].choices[index].title
                                "
                            />
                        </el-radio>
                    </div>
                </div>
                <!-- {{ formdata.end_time }} -->
                <el-button type="primary"> &ensp;提&emsp;交&ensp; </el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
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
    methods: {},
};
</script>

<style scoped>
.gt-form {
    margin: 20px 0 40px 0;
}
</style>
