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
                    >
                        {{ form.title }}
                    </div>
                </template>
                <div
                    class="question"
                    v-for="(i, id) in form.questions"
                    :key="id"
                >
                    <h4 style="margin-top: 0">{{ id + 1 }}. {{ i.title }}</h4>
                    <div style="margin: 15px">
                        <el-radio
                            v-for="j in i.choices"
                            :key="j.id"
                            :label="j.id"
                            v-model="i.choice"
                            size="large"
                            style="display: block; width: 100%; margin: -10px 0"
                        >
                            {{ j.title }}
                        </el-radio>
                    </div>
                </div>
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
            default: () => {},
        },
    },
    data() {
        return {
            form: {
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
