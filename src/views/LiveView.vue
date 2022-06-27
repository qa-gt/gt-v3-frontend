<template>
    <el-row justify="space-evenly">
        <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
            <el-card>
                <h2>瓜田直播</h2>
                <p>目前仅支持电脑观看，若播放失败请更换谷歌浏览器。</p>
                <el-divider />
                <el-button
                    type="primary"
                    @click="loadLive"
                    style="margin-bottom: 20px"
                >
                    加载直播
                </el-button>
                <el-button
                    type="primary"
                    @click="loadPushAddress"
                    style="margin-bottom: 20px"
                    v-if="user && user.is_staff"
                >
                    加载推流地址
                </el-button>
                <p v-if="pushUri">推流地址：{{ pushUri }}</p>
                <video
                    v-if="play"
                    ref="liveVideo"
                    autoplay
                    muted
                    controls
                    style="width: 100%"
                />
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped></style>

<script>
import "element-plus/theme-chalk/display.css";
import { mapState } from "vuex";
import flv from "flv.js";
import { ElMessage } from "element-plus";
export default {
    data() {
        return {
            uri: "",
            play: false,
            pullPath: "/gt/main.flv",
            pullUri: "",
            pushPath: "/gt/main",
            pushUri: "",
            player: null,
        };
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        async loadLive() {
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha("comment");
            this.play = true;
            const data = await this.$axios.get(
                `/utils/live_key?path=${this.pullPath}&recaptcha=${token}`
            );
            const auth_key = data.auth_key;
            this.player = flv.createPlayer(
                {
                    type: "flv",
                    isLive: true,
                    url: `https://live.yixiangzhilv.com${this.pullPath}?auth_key=${auth_key}`,
                },
                {
                    enableWorker: true,
                    enableStashBuffer: false,
                    stashInitialSize: 128,
                }
            );
            console.log(this.player);
            this.player.attachMediaElement(this.$refs.liveVideo);
            this.player.load();
            this.player.play();
            setInterval(() => {
                if (!this.player.buffered.length) return;
                const end = this.player.buffered.end(0);
                if (end - this.player.currentTime >= 5) {
                    // 延时如果大于5秒，就让直播跳到当前时间位置播放
                    this.player.currentTime = end - 0.5;
                }
            }, 30 * 1000);
        },
        loadPushAddress() {
            this.$axios
                .post("/utils/live_key", { path: this.pushPath })
                .then(data => {
                    const auth_key = data.auth_key;
                    this.pushUri = `rtmp://live-push.yixiangzhilv.com${this.pushPath}?auth_key=${auth_key}`;
                    console.log(this.pushUri);
                });
        },
    },
    mounted() {
        if (!flv.isSupported()) {
            ElMessage.error("浏览器不支持FLV播放器");
        }
    },
};
</script>
