<template>
    <el-row justify="space-evenly">
        <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
            <el-card>
                <h2>瓜田直播</h2>
                <span>
                    如若直播插件在您的设备上无法正常使用，请下载安装最新版谷歌浏览器。
                </span>
                &ensp;
                <el-link
                    style="margin-bottom: 0px"
                    type="primary"
                    href="https://www.google.cn/chrome/index.html"
                >
                    前往官网下载
                </el-link>
                <el-divider />
                <div>
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
                </div>
                <div v-if="pushUri">推流地址：{{ pushUri }}</div>
                <el-row justify="space-evenly" v-if="!isMobile">
                    <el-col :xs="12" :sm="14" :md="16" :lg="17" :xl="18">
                        <video
                            v-if="play"
                            ref="liveVideo"
                            autoplay
                            controls
                            style="width: 100%"
                        />
                        <h2>{{ live_info.title }}</h2>
                        <p>
                            {{
                                $moment(live_info.time).calendar()
                            }}&emsp;观看人次：{{ live_info.watched
                            }}<span v-show="current_info.online"
                                >&emsp;当前在线：{{ current_info.online }}</span
                            >
                        </p>
                        <el-divider />
                        <p>{{ live_info.description }}</p>
                    </el-col>
                    <el-col :md="8" :lg="7" :xl="6">
                        <div v-show="play" style="margin: 10px 5px 0 20px">
                            <el-scrollbar style="height: 75vh">
                                <div v-for="item in dm" :key="item">
                                    <div>
                                        <span>{{ item.user }}</span>
                                        &ensp;
                                        <span style="color: #999">
                                            {{
                                                $moment(
                                                    item.time * 1000
                                                ).fromNow()
                                            }}</span
                                        >
                                    </div>
                                    <div>
                                        <b>{{ item.message }}</b>
                                    </div>
                                    <el-divider />
                                </div>
                            </el-scrollbar>
                            <el-input
                                maxlength="50"
                                show-word-limit
                                v-model="dmInput"
                                style="margin-top: 10px"
                                type="textarea"
                                placeholder="发一条友善的弹幕"
                            />
                            <div style="float: right; margin: 10px 0 0 0">
                                <el-button type="primary" @click="sendDm">
                                    发送
                                </el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col>
                        <h2>{{ live_info.title }}</h2>
                        <p>
                            {{
                                $moment(live_info.time).calendar()
                            }}&emsp;观看人次：{{ live_info.watched
                            }}<span v-show="current_info.online"
                                >&emsp;当前在线：{{ current_info.online }}</span
                            >
                        </p>
                        <el-divider />
                        <p>{{ live_info.description }}</p>
                    </el-col>
                    <el-col>
                        <video
                            v-if="play"
                            class="live-video"
                            ref="liveVideo"
                            autoplay
                            controls
                            style="width: 100%"
                        />
                    </el-col>
                    <el-col>
                        <div v-show="play" style="margin: 10px 5px 0 20px">
                            <el-scrollbar style="height: 500px">
                                <div v-for="item in dm" :key="item">
                                    <div>
                                        <span>{{ item.user }}</span>
                                        &ensp;
                                        <span style="color: #999">
                                            {{
                                                $moment(
                                                    item.time * 1000
                                                ).fromNow()
                                            }}</span
                                        >
                                    </div>
                                    <div>
                                        <b>{{ item.message }}</b>
                                    </div>
                                    <el-divider />
                                </div>
                            </el-scrollbar>
                            <el-input
                                maxlength="50"
                                show-word-limit
                                v-model="dmInput"
                                type="textarea"
                                style="margin-top: 10px"
                                placeholder="发一条友善的弹幕"
                            />
                            <div style="float: right; margin-top: 10px">
                                <el-button type="primary" @click="sendDm">
                                    发送
                                </el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped>
.live-video {
    margin-bottom: 20px;
}
</style>

<script>
import "element-plus/theme-chalk/display.css";
import { mapState } from "vuex";
import flv from "flv.js";
import { ElMessage } from "element-plus";
import io from "socket.io-client";
export default {
    data() {
        return {
            play: false,
            pullPath: "/gt/main.flv",
            pullUri: "",
            pushPath: "/gt/main",
            pushUri: "",
            player: null,
            dmInput: "",
            dm: [
                {
                    user: "系统提示",
                    message: "正在加载弹幕...",
                },
            ],
            last_timestamp: 0,
            getDmInterval: null,
            live_info: {},
            socket: null,
            current_info: {},
        };
    },
    computed: {
        ...mapState(["user"]),
        isMobile() {
            return this.$root.isMobile;
        },
    },
    methods: {
        async loadLive() {
            this.play = true;
            this.socket.emit("join_room", {
                room: "main" + this.live_info.id,
            });
            await this.$recaptchaLoaded();
            const token = await this.$recaptcha("pull_live");
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
        sendDm() {
            if (!this.dmInput) return;
            this.socket.emit("send_dm", {
                message: this.dmInput,
                user: this.user.username,
            });
        },
        heartbeat() {
            this.socket.emit("heartbeat");
        },
    },
    mounted() {
        if (!flv.isSupported()) {
            ElMessage.error("浏览器不支持FLV播放器");
        }
        this.heartbeat();
        setInterval(this.heartbeat, 3 * 1000);
    },
    created() {
        this.$axios.get("/utils/live_info").then(data => {
            this.live_info = data.data;
        });
        this.socket = io.connect("https://dm-ws.qdzx.icu/live_dm");
        this.socket.on("all_dm", data => {
            this.dm = data;
        });
        this.socket.on("dm", data => {
            console.log(data, this.dm);
            data = [data];
            data.push(...this.dm);
            this.dm = data;
        });
        this.socket.on("current_info", data => {
            console.log(data);
            this.current_info = data;
        });
    },
};
</script>
