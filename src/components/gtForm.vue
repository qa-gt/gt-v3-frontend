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
                        style="float: right; margin-bottom: 18px"
                    >
                        <span style="margin-right: 15px; margin-top: 15px">
                            <el-checkbox
                                v-model="i.mustDo"
                                label="必做"
                                size="small"
                            />
                        </span>
                        <span>
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
                    <div style="margin: 15px" v-if="in_edit && i.type === 1">
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
                    <div style="margin: 15px" v-if="!in_edit && i.type === 2">
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
                    <div style="margin: 15px" v-if="in_edit && i.type === 2">
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
                                        <i class="far fa-trash" />
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
                    <!-- 填空部分不涉及是否正在编辑 -->
                    <div style="margin: 15px" v-if="i.type === 3">
                        <el-input
                            :placeholder="i.options.placeholder"
                            :type="i.options.type"
                            :maxlength="i.options.maxlength"
                            :minlength="i.options.minlength"
                            show-word-limit="true"
                            v-model="formdata.questions[id].message"
                            rows="4"
                            clearable
                            style="
                                width: 100%;
                                margin-right: 10px;
                                margin-bottom: 5px;
                            "
                            :disabled="in_edit"
                        />
                        <el-button
                            style="width: 100%"
                            type="primary"
                            size="small"
                            plain
                            v-show="in_edit"
                            @click="blankSetting(id)"
                        >
                            填空题设置
                        </el-button>
                    </div>
                </div>

                <el-button type="primary" v-if="!in_edit" @click="confirmed">
                    &ensp;提&emsp;交&ensp;
                </el-button>
            </el-card>
        </el-col>
    </el-row>
    <el-drawer v-model="show_setting" direction="ltr">
        <h3>填空题设置</h3>
        <el-divider />
        <el-form label-position="top">
            <el-form-item label="文本框类型">
                <el-select
                    v-model="formdata.questions[questionId].options.type"
                >
                    <el-option value="text" label="单行输入框" />
                    <el-option value="textarea" label="多行文本框" />
                </el-select>
            </el-form-item>
            <el-form-item label="字符数上限(设为零即为无限制)">
                <el-input-number
                    v-model="formdata.questions[questionId].options.maxlength"
                />
            </el-form-item>
            <el-form-item label="文本框占位文本">
                <el-input
                    v-model="formdata.questions[questionId].options.placeholder"
                />
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
    name: "gtForm",
    props: {
        formdata: {
            type: Object,
            default: { questions: [] },
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
            show_setting: false, //设置填空题选项卡初始状态为不显示
            questionId: null, // 填空题设置——读取题号所用临时变量
            limit: false,
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

        isMust(mustDo) {
            if (mustDo === true) {
                return "必做";
            } else if (mustDo === false) {
                return "选做";
            }
        },
        blankSetting(id) {
            this.show_setting = true;
            this.questionId = id;
        },
        confirmed() {
            let que = this.formdata.questions;
            for (let i = 0; i < que.length; i++) {
                if (que[i].mustDo === true) {
                    if (que[i].type === 1 && que[i].choice === 0) {
                        ElMessage.error("你有一道单选题未完成");
                        break;
                    } else if (que[i].type === 2 && que[i].choice.length === 0) {
                        ElMessage.error("你有一道多选题未完成");
                        break;
                    } else if (que[i].type === 3 && que[i].message === "") {
                        ElMessage.error("你有一道填空题未完成");
                        break;
                    }
                }
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
