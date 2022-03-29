<template>
    <el-row style="text-align: center; justify-content: center">
        <el-col :span="24" style="max-width: 450px">
            <el-card full class="password-card">
                <h3>重置密码</h3>
                <el-divider />
                <el-form :model="form" @submit.prevent>
                    <el-input
                        v-model="passwordold"
                        type="password"
                        class="w-50 m-2"
                        placeholder="旧密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 10px"
                    />
                    <el-input
                        v-model="password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="新密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 10px"
                    />
                    <el-input
                        v-model="password2"
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
            name: "",
            password: "",
            password2: "",
            passwordold: "",
        };
    },
    methods: {
        contrast() {
            if (this.password == this.password2 && this.password != "") {
                ElMessage.success("更改成功！");
                this.$router.push("/user/edit");
            } else if (this.password != this.password2) {
                ElMessage.error("两次密码不匹配，请确认重新输入！");
            } else if (this.password == "") {
                ElMessage.error("你还没有输入新密码！");
            } else if (this.password2 == "") {
                ElMessage.error("你还没有重复新密码！");
            }
        },
        match() {
            ElMessage.success("更改成功！");
        },
    },
};
</script>

<style lang="scss" scoped>
.password-card {
    height: 375px;
}
</style>
