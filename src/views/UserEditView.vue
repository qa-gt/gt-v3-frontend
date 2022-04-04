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
                <el-form
                    :model="form"
                    label-position="top"
                    label-width="120px"
                    @keydown="disabled.save = false"
                >
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
                                @click="disabled.save = false"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group
                            v-model="form.gender"
                            @click="disabled.save = false"
                        >
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
                        <el-button
                            type="primary"
                            @click="confirm"
                            :disabled="form == formold || disabled.save"
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
                <el-dialog
                    v-model="dialogVisible"
                    title="我们收集您的部分信息的原因"
                >
                    <div v-if="dialogContent === 'wechat'">
                        <p>
                            瓜田的老用户们应该有所见，部分极端用户在瓜田首页持续刷贴，严重影响普通用户的体验。我们优先尝试了限制机器人操作，但是众所周知，人工手动刷贴的行为是无论如何无法被自动系统识别并防止的。
                        </p>
                        <p>
                            我们尝试使用爱云校这一操作成本最低的认证方式，然而过多的同学没有修改自己的初始密码导致该行为未能达到预期目的。
                        </p>
                        <p>
                            因此，我们做出这个艰难的抉择：只有通过微信认证的用户可以发贴、上传图片等。
                        </p>
                        <p>
                            一个微信可以用于多个账号的认证，但是请注意，一旦出现违规行为该微信绑定的所有账号都将被封禁。
                        </p>
                        <p>
                            隐私方面的问题，我们使用三方平台进行登录校验，三方平台向我们发送的内容包括一个无意义的用户ID、昵称（可能）和头像（可能）。<span
                                style="font-weight: bold"
                                >无论昵称和头像是否发送，我们保证只对您的唯一用户ID做保存。</span
                            >
                        </p>
                    </div>
                    <div v-else-if="dialogContent === 'yunxiao'">
                        <p>
                            该信息无任何强制性措施，可自愿填写。填写后可方便大家在瓜田证明自己的身份。请注意，每个云校账号只能帮顶一个瓜田账号！
                        </p>
                        <p>如果你的云校账号被他人盗用，请与我们联系。</p>
                    </div>
                </el-dialog>
                <h2>实名认证</h2>
                <el-button
                    type="text"
                    @click="
                        dialogVisible = true;
                        dialogContent = 'yunxiao';
                    "
                    style="margin-bottom: 15px"
                >
                    为什么需要？
                </el-button>
                <el-form label-position="top" label-width="120px">
                    <div
                        v-if="user.yunxiao !== null"
                        style="margin-bottom: 20px"
                    >
                        实名信息：已认证 · {{ user.yunxiao || "已隐藏" }}
                    </div>
                    <template v-else>
                        <div
                            style="color: #c11700; margin-bottom: 20px"
                            v-if="user.yunxiao === null"
                        >
                            此实名信息提交后将不可更改（展示状态除外），请慎重填写！
                        </div>
                        <el-form-item label="爱云校账号">
                            <el-input
                                v-model="yunxiaoInfo.student_id"
                                maxlength="30"
                                placeholder="冒充他人认证可能会被封号"
                            />
                        </el-form-item>
                        <el-form-item label="爱云校密码">
                            <el-input
                                v-model="yunxiaoInfo.password"
                                type="password"
                                maxlength="50"
                                show-password
                                placeholder="仅用于验证, 不会被保存"
                            />
                        </el-form-item>
                    </template>
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

                <el-divider />

                <h2>微信认证</h2>
                <el-button
                    type="text"
                    @click="
                        dialogVisible = true;
                        dialogContent = 'wechat';
                    "
                    style="margin-bottom: 15px"
                >
                    为什么需要？
                </el-button>
                {{ weChat }}
                <el-form label-position="top" label-width="120px">
                    <div v-if="user.wechat" style="margin-bottom: 20px">
                        微信状态：已认证
                    </div>
                    <template v-else>
                        <div style="color: #c11700; margin-bottom: 20px">
                            此认证信息提交后将不可更改！
                        </div>
                        <el-form-item>
                            <qrcode-vue
                                :value="wechatQrCode"
                                :size="250"
                                level="H"
                                v-if="wechatQrCode"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getWeChatCode">
                                开始认证
                            </el-button>
                        </el-form-item>
                    </template>
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
import QrcodeVue from "qrcode.vue";
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
            wechatQrCode: "",
            wechatChecker: undefined,
            disabled: {
                save: true,
            },
            dialogContent: "",
            dialogVisible: false,
        };
    },
    components: {
        gtUser,
        QrcodeVue,
    },
    methods: {
        confirm() {
            this.disabled.save = true;
            this.$axios
                .patch(`user/${this.$store.state.user.id}/`, this.form)
                .then(res => {
                    this.$store.commit("setUser", res);
                    this.form = { ...this.$store.state.user };
                    ElMessage.success("保存成功");
                })
                .catch(err => {
                    ElMessage.error(err);
                    this.disabled.save = false;
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
                    this.$store.commit("setUser", res.user);
                    ElMessage.success("提交成功");
                });
        },
        async getWeChatCode() {
            clearInterval(this.wechatChecker);
            const res = await this.$axios.get(
                "/user/wechat_auth/",
                {
                    params: {
                        qrcode: true,
                    },
                },
                this.yunxiaoInfo
            );
            this.wechatQrCode = res.data.qrCode;
            this.wechatChecker = setInterval(() => {
                this.$axios
                    .get(
                        "/user/wechat_auth/",
                        {
                            params: {
                                tempUID: res.data.tempUserId,
                            },
                        },
                        this.yunxiaoInfo
                    )
                    .then(res => {
                        if (res.detail === "success") {
                            clearInterval(this.wechatChecker);
                            this.$store.commit("setUser", res.user);
                            ElMessage.success("提交成功");
                        }
                    });
            }, 2000);
        },
    },
    created() {
        this.yunxiaoInfo.show = String(
            Boolean(this.user.yunxiao !== null && this.user.yunxiao)
        );
    },
};
</script>
