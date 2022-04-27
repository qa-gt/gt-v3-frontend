<template>
    <el-card style="width: 70%; margin-left: 15%">
        <h2>Tape提问箱</h2>
        <el-divider />
        <el-card style="margin: 20px 50% 20px 0px; algin: center; display:inline-block;">
            <div >
                <span>
                    <el-avatar />
                </span>
                <span> 由 {{ username }} 创建的提问箱 </span>
            </div>
        </el-card>

        <div>
            <el-tag size="large" style="width: 100%; justify-content: left">
                <div style="font-size: 13px; justify-content: left">
                    > {{ message }}
                </div>
            </el-tag>
        </div>
        <div style="margin-top: 20px">
            <el-input
                type="textarea"
                maxlength="150"
                rows="4"
                show-word-limit
                placeholder="说点悄悄话吧！"
                v-model="asr"
            />
        </div>
        <div style="margin-top: 20px; float: right; margin-bottom: 20px">
            <el-button type="primary">投递</el-button>
        </div>
    </el-card>
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
            default: '',
        },
        userid: {
            type: Number,
            default: null,
        }
    },
    data() {
        return {
            asr: "",
        };
    },
};
</script>

<style></style>
