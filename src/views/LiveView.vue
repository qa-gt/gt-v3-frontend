<template>
  <el-row justify="space-evenly">
    <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
      <el-card>
        <h2>瓜田直播</h2>
        <span>目前仅支持电脑观看，若播放失败请更换谷歌浏览器。</span>
        &ensp;
        <el-link
          style="margin-bottom: 0px"
          type="primary"
          href="https://www.google.cn/chrome/index.html"
          >前往官网下载
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
        <el-row justify="space-evenly">
          <el-col :xs="12" :sm="14" :md="16" :lg="17" :xl="18">
            <video
              v-if="play"
              ref="liveVideo"
              autoplay
              controls
              style="width: 100%"
            />
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="7" :xl="6">
            <div v-show="play" style="margin: 10px 5px 0 20px">
              <el-scrollbar style="height: 500px">
                <div v-for="item in dm" :key="item">
                  <div>
                    <span>{{ item.username }}</span>
                    &ensp;
                    <span style="color: #999">{{ item.send_time }}</span>
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
                v-model="send_dm"
                type="textarea"
                placeholder="发一条友善的弹幕"
              ></el-input>
              <div style="float: right; margin: 10px 0 0 0">
                <el-button type="primary" @click="sendDm">发送</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

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
      send_dm: "",
      dm: [
        { username: "YXZL", send_time: "now", message: "Hi" },
        { username: "YXZL", send_time: "now", message: "Hi" },
        { username: "YXZL", send_time: "now", message: "Hi" },
        { username: "YXZL", send_time: "now", message: "Hi" },
        { username: "YXZL", send_time: "now", message: "Hi" },
      ],
      last_timestamp: 0,
      getDmInterval: null,
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
      clearInterval(this.getDmInterval);
      this.getDmInterval = setInterval(() => {
        this.getDm();
      }, 1000);
    },
    loadPushAddress() {
      this.$axios
        .post("/utils/live_key", { path: this.pushPath })
        .then((data) => {
          const auth_key = data.auth_key;
          this.pushUri = `rtmp://live-push.yixiangzhilv.com${this.pushPath}?auth_key=${auth_key}`;
          console.log(this.pushUri);
        });
    },
    sendDm() {
      this.$axios
        .post("https://dm.qdzx.icu/create", {
          room: "main",
          message: this.send_dm,
          user: this.user.username,
        })
        .then((data) => {
          console.log(data);
        });
    },
    getDm() {
      console.log("getDm", this.last_timestamp);
      this.$axios
        .get("https://dm.qdzx.icu/get", {
          params: {
            room: "main",
            last_timestamp: this.last_timestamp,
          },
        })
        .then((data) => {
          data = data.data;
          if (data.length) {
            this.last_timestamp = data[0].time;
            data.push(...this.dm);
            this.dm = data;
          }
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
