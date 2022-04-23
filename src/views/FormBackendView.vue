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
                                    <el-dropdown-item command="Choice"
                                        >单选题</el-dropdown-item
                                    >
                                    <el-dropdown-item command="MultipleChoice"
                                        >多选题</el-dropdown-item
                                    >
                                    <el-dropdown-item command="Filling"
                                        >填空题</el-dropdown-item
                                    >
                                    <el-dropdown-item command="TimeChoice"
                                        >时间选择</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-card>
                </el-card>
            </div>

            <el-card>
                <h2>表单预览</h2>
                <el-divider />
                <div
                    :key="item"
                    v-for="item in formitems"
                    stlye="margin-bottom: 15px"
                >
                    <div style="margin-bottom: 15px">
                        <el-card>
                            <template #header>
                                <div class="card-header">
                                    <h4>{{ item.title }}</h4>
                                </div>
                            </template>
                            <p>题目内容</p>
                        </el-card>
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
export default {
    computed: {
        ...mapState(["user"]),
    },
    components: {
        gtUser,
    },
    data() {
        return {
            formitems: [
                { type: "单选", title: "请输入标题" },
                { type: "单选", title: "请输入标题" },
                { type: "单选", title: "请输入标题" },
            ],
        };
    },
    methods: {
        Choice() {},
        MultipleChoice() {},
    },
};
</script>

<style></style>
