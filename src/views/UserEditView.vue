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
            <gt-user :user="this.user"></gt-user>
        </el-col>

        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <el-card full shadow="hover">
                <h2>个人信息编辑</h2>
                <el-divider />
                <el-form :model="form" label-position="top" label-width="120px">
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="this.$router.push('/user/repassword')"
                            >修改密码</el-button
                        >
                    </el-form-item>
                    <!-- <el-form-item label="真实姓名">
            <el-input placeholder="请输入" v-model="form.name" maxlength="5" />
          </el-form-item> -->
                    <el-form-item label="年级">
                        <el-select
                            v-model="form.grade"
                            placeholder="请选择你的年级"
                        >
                            <el-option
                                v-for="item in grades"
                                v-bind:key="item"
                                v-bind:value="item"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                            <el-radio label="0">保密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input
                            placeholder="介绍自己……"
                            v-model="form.introduction"
                            type="textarea"
                            maxlength="100"
                            show-word-limit
                        />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input
                            placeholder=""
                            v-model="form.email"
                            maxlength="70"
                            show-word-limit
                        />
                    </el-form-item>
                    <el-form-item label="pushplus token">
                        <el-input
                            maxlength="32"
                            v-model="form.token"
                            disabled
                        />
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-input
                            v-model="form.portrait"
                            maxlength="200"
                            show-word-limit
                        />
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button type="primary" @click="confirm"
                            >保存</el-button
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
                <el-divider />

                <h2>实名认证</h2>

                <el-form label-position="top" label-width="120px">
                    <div
                        v-if="user.yunxiao !== null"
                        style="margin-bottom: 20px"
                    >
                        实名信息：已认证 · {{ user.yunxiao || "已隐藏" }}
                    </div>
                    <div
                        style="color: #c11700; margin-bottom: 20px"
                        v-if="user.yunxiao === null"
                    >
                        此实名信息提交后将不可更改（展示状态除外），请慎重填写！
                    </div>
                    <el-form-item
                        label="爱云校账号"
                        v-if="user.yunxiao === null"
                    >
                        <el-input
                            v-model="yunxiaoInfo.student_id"
                            maxlength="30"
                            placeholder="冒充他人认证可能会被封号"
                        />
                    </el-form-item>
                    <el-form-item
                        label="爱云校密码"
                        v-if="user.yunxiao === null"
                    >
                        <el-input
                            v-model="yunxiaoInfo.password"
                            type="password"
                            maxlength="50"
                            show-password
                            placeholder="仅用于验证, 不会被保存"
                        />
                    </el-form-item>
                    <el-form-item label="是否公开展示">
                        <el-switch
                            v-model="yunxiaoInfo.show"
                            active-value="true"
                            inactive-value="false"
                            inline-prompt
                            size="large"
                            active-text="是"
                            inactive-text="否"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-popconfirm
                            title="确认要提交吗？提交后信息将不能更改。"
                            confirm-button-text="确定提交"
                            cancel-button-text="返回"
                            @confirm="confirmYunxiao"
                            v-if="user.yunxiao === null"
                        >
                            <template #reference>
                                <el-button type="primary">
                                    提交实名信息
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <el-button
                            type="primary"
                            @click="confirmYunxiao"
                            v-if="user.yunxiao !== null"
                        >
                            更新实名信息
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script>
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
import gtUser from "@/components/gtUser.vue";

export default {
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
            form: { ...this.$store.state.user },
            grades: [
                "保密",
                "一年级",
                "二年级",
                "三年级",
                "四年级",
                "五年级",
                "六年级",
                "七年级",
                "八年级",
                "九年级",
                "十年级",
                "十一年级",
                "十二年级",
                "国际九年级",
                "国际十年级",
                "国际十一年级",
                "国际十二年级",
                "114514",
            ],
            yunxiaoInfo: {
                student_id: "",
                password: "",
                show: "true",
            },
        };
    },
    components: {
        gtUser,
    },
    methods: {
        confirm() {
            this.$axios
                .patch(`user/${this.$store.state.user.id}/`, this.form)
                .then(res => {
                    this.$store.commit("setUser", res);
                    this.form = { ...this.$store.state.user };
                    ElMessage.success("保存成功");
                })
                .catch(err => {
                    ElMessage.error(err);
                });
        },
        cancel() {
            ElMessage.info("已取消");
            this.$router.go(-1);
        },
        confirmYunxiao() {
            this.$axios
                .post("/user/yunxiao_auth/", this.yunxiaoInfo)
                .then(res => {
                    ElMessage.success("提交成功");
                    this.$store.commit("setUser", res.user);
                    this.$store.commit("setUser", res.user);
                });
        },
    },
    created() {
        this.yunxiaoInfo.show = String(
            Boolean(this.user.yunxiao !== null && this.user.yunxiao)
        );
    },
};
</script>
