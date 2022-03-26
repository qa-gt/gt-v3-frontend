<template>
    <el-row style="text-align: center; justify-content: center">
        <el-col :span="24" style="max-width: 450px">
            <el-card full class="login-card shadow-1">
                <h3>注册新账号</h3>
                <el-divider />
                <br />
                <el-form :model="form" @submit.prevent>
                    <el-input
                        v-model="username"
                        class="w-50 m-2"
                        placeholder="用户名"
                        maxlength="30"
                    />
                    <br /><br />
                    <el-input
                        v-model="password"
                        type="password"
                        class="w-50 m-2"
                        placeholder="密码"
                        maxlength="30"
                        show-password
                    />
                    <br /><br />
                    <el-input
                        v-model="repassword"
                        type="password"
                        class="w-50 m-2"
                        placeholder="请再次输入密码"
                        maxlength="30"
                        show-password
                    />
                    <br /><br /><br />
                    <div>
                        <el-button
                            type="primary"
                            native-type="submit"
                            @click="register"
                        >
                            &ensp;&ensp;&emsp;&emsp;&emsp;注&emsp;册&emsp;&emsp;&emsp;&ensp;&ensp; </el-button
                        >&ensp;
                        <el-button native-type="submit" @click="cancel">
                            &ensp;&ensp;&emsp;&emsp;&emsp;取&emsp;消&emsp;&emsp;&emsp;&ensp;&ensp;
                        </el-button>
                    </div>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ElMessage, ElLoading } from "element-plus";
// import { ref } from "vue";
import { mapState } from "vuex";
import axios from "axios";
import "@/plugins/vaptcha";
import loadJs from "@/plugins/loadJs";

export default {
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
            username: "",
            password: "",
            repassword: "",
        };
    },
    methods: {
        register() {
            if (this.username === "" || this.password === "") {
                ElMessage.error("用户名或密码不能为空！");
                return;
            } else if (this.password != this.repassword) {
                ElMessage.error("两次输入的密码不一致！请确认后重新输入！");
                return;
            }
            let loading = ElLoading.service({
                fullscreen: true,
                text: "注册中...",
            });
            grecaptcha
                .execute("6LdU6xAfAAAAAIY7YrFlAByuqIhOHO1stDNGWgnx", {
                    action: "register",
                })
                .then(token => {
                    console.log(token);
                    this.$axios
                        .post("/user/register", {
                            username: this.username,
                            password: this.password,
                            recaptcha: token,
                        })
                        .then(res => {
                            this.$store.commit("setJwt", res.token);
                            this.$store.commit("setUser", res.user);
                            if (this.$route.query.next) {
                                this.$router.push(this.$route.query.next);
                            } else {
                                this.$router.go(-1);
                            }
                            ElMessage.success("注册成功！");
                        })
                        .catch(err => err)
                        .then(() => {
                            loading.close();
                        });
                });
        },
        cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        loadJs(
            "https://www.recaptcha.net/recaptcha/api.js?render=6LdU6xAfAAAAAIY7YrFlAByuqIhOHO1stDNGWgnx"
        );
    },
};
</script>

<style>
.login-card {
    height: 410px;
}
</style>
