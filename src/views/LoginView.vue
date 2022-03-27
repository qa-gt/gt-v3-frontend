<template>
    <el-row style="text-align: center; justify-content: center">
        <el-col :span="24" style="max-width: 450px">
            <el-card full class="login-card shadow-1">
                <h3>登录到瓜田</h3>
                <el-divider />
                <el-form :model="form" @submit.prevent>
                    <el-input
                        v-model="username"
                        class="w-50 m-2"
                        placeholder="用户名"
                        maxlength="30"
                        style="margin-bottom: 20px"
                    />
                    <el-input
                        v-model="password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="密码"
                        maxlength="30"
                        show-password
                        style="margin-bottom: 20px"
                    />
                    <el-row justify="space-between" style="margin-bottom: 40px">
                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <el-button
                                type="primary"
                                native-type="submit"
                                @click="login"
                                style="width: 100%; margin: 10px 0"
                            >
                                登&emsp;录
                            </el-button>
                        </el-col>
                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <el-button
                                plain
                                type="primary"
                                native-type="submit"
                                @click="$router.push('/user/register')"
                                style="width: 100%; margin: 10px 0"
                            >
                                注&emsp;册
                            </el-button>
                        </el-col>
                    </el-row>
                    <span style="font-size: 14px">
                        忘记密码？
                        <el-button
                            type="text"
                            @click="$router.push('/user/repassword')"
                        >
                            点此重置
                        </el-button>
                    </span>
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
            username: "",
            password: "",
        };
    },
    methods: {
        login() {
            if (this.username === "" || this.password === "") {
                ElMessage.error("用户名或密码不能为空");
                return;
            }
            this.$axios
                .post("/user/login", {
                    username: this.username,
                    password: this.password,
                })
                .then(res => {
                    this.$store.commit("setJwt", res.token);
                    this.$store.commit("setUser", res.user);
                    ElMessage.success("登录成功");
                    if (this.$route.query.next) {
                        this.$router.push(this.$route.query.next);
                    } else {
                        this.$router.go(-1);
                    }
                })
                .catch(err => {
                    ElMessage.error(err);
                });
        },
    },
};
</script>

<style>
.login-card {
    height: 425px;
}
</style>
