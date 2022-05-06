<template>
    <el-row justify="space-evenly">
        <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
            <el-card>
                <h2>Tape提问箱</h2>
                <el-divider />
                <div class="el-card tape-title">
                    <div
                        style="
                            background: #000;
                            opacity: 0.5;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            padding: 20px !important;
                        "
                    >
                        <div
                            style="
                                color: #ffffff;
                                font-size: 200%;
                                display: block;
                                text-align: center;
                                font-family: zh96;
                                padding: 10px 0 20px 0;
                            "
                        >
                            {{ message }}
                        </div>
                        <el-row style="padding: 10px 0" />
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                flex-grow: 1;
                            "
                        >
                            <el-avatar style="padding-right: 10px" />
                            <span style="font-weight: bold; color: #dcdcdc">
                                由 {{ username }} 创建的提问箱
                            </span>
                        </div>
                    </div>
                </div>

                <div style="padding-top: 20px">
                    <el-input
                        type="textarea"
                        maxlength="150"
                        rows="4"
                        show-word-limit
                        placeholder="说点悄悄话吧！"
                        v-model="asr"
                        style="margin: 0 5%; width: 90%"
                    />
                </div>
                <div style="padding: 5px 5% 30px 0; float: right">
                    <el-button type="primary">投递</el-button>
                </div>
            </el-card>
            <el-row style="margin: 10px 0" />
            <el-card>
                <h3>{{ username }} 的其他回答</h3>
                <el-divider />
                <div v-for="item in reply" :key="item">
                    <span>
                        {{ item.answer }}
                    </span>
                    <span style="float: right; font-size: 13px; color: gray">
                        发表时间：{{ item.time }}
                    </span>
                    <el-divider />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: "请在这里对我说悄悄话！",
        },
        id: {
            type: Number,
            default: null,
        },
        username: {
            type: String,
            default: "",
        },
        userid: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            asr: "",
            reply: [
                { answer: "hhh", time: "2022/04/30 12:00:00" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
                { answer: "hhh", time: "2022/04/30" },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
.tape-title {
    background: url("https://api.yixiangzhilv.com/utils/wallpaper");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 10px 5%;
}
.el-card {
    padding: 0 !important;
}
</style>
