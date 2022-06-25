<template>
    <el-row style="text-align: center; justify-content: center">
        <el-col :span="24" style="max-width: 450px">
            <el-card full class="password-card">
                <h3>更改密码</h3>
                <el-divider />
                <el-form @submit.prevent>
                    <el-input
                        v-model="old_password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="旧密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 10px"
                    />
                    <el-input
                        v-model="new_password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="新密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 10px"
                    />
                    <el-input
                        v-model="re_new_password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="重复新密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 15px"
                    />
                    <el-button
                        type="primary"
                        native-type="submit"
                        @click="contrast"
                        style="width: 100%; margin: 5px 0"
                    >
                        &emsp;&emsp;&emsp;确&emsp;认&emsp;&emsp;&emsp;
                    </el-button>
                </el-form>
                <p style="text-align: center">
                    *修改密码后不会使已登录的账号退出
                </p>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
            new_password: "",
            re_new_password: "",
            old_password: "",
        };
    },
    methods: {
        contrast() {
            if (
                !this.old_password ||
                !this.new_password ||
                !this.re_new_password
            ) {
                ElMessage.error("请将字段填写完整");
                return;
            } else if (this.new_password !== this.re_new_password) {
                ElMessage.error("两次密码不匹配，请确认重新输入！");
            }
            this.$axios
                .post("/user/change_password", {
                    old_password: this.old_password,
                    new_password: this.new_password,
                })
                .then(res => {
                    if (res.status === "success") {
                        ElMessage.success("修改成功");
                        this.$router.push("/");
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.password-card {
    height: 375px;
}
</style>
