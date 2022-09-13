<template>
  <el-row :gutter="20" justify="center" style="height: 100%; margin-top: -20px">
    <!-- 房间列表 -->
    <el-col :span="6">
      <el-card style="width: 90%; height: 90vh">
        <el-scrollbar height="80vh">
          <div
            v-for="item in roomList"
            :key="item"
            :class="{
              'room-item': true,
              'room-item-current': currentRoom.id === item.id,
            }"
            :title="item.room.name || item.single_chat_with.username"
            @click="showRoom(item)"
          >
            <el-badge :hidden="item.unread <= 0" :value="item.unread">
              <el-avatar
                shape="square"
                :src="item.room.avatar || item.single_chat_with.portrait"
                :size="40"
                style="margin-bottom: 17.5px; margin-left: 10px"
              />
            </el-badge>
            <span style="margin-left: 20px; margin-bottom: 17.5px">
              {{ item.room.name || item.single_chat_with.username }}
            </span>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>

    <!-- 聊天界面 -->
    <el-col :span="14" style="height: 90vh">
      <el-card style="margin-left: -20px; height: 100%">
        <div v-show="currentRoom.id">
          <h3 style="margin: 0">
            {{ currentRoom.room.name || currentRoom.single_chat_with.username }}
          </h3>

          <el-divider style="margin-top: 10px" />

          <el-scrollbar style="height: 60vh" max-height="60vh" ref="chatBox">
            <div v-for="item in chat[currentRoom.id]" :key="item">
              <!-- 自己的消息 -->
              <div
                class="msg-item msg-item-right"
                v-if="item.sender.id === user.id"
              >
                <span class="msg-item-content">
                  <div class="msg-sender">
                    {{ item.sender.username }}
                    &ensp;
                    {{ $wechatTime(item.time) }}
                  </div>
                  <msg-item :msg="item" />
                </span>
                <span class="msg-item-avatar">
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="item.sender.portrait"
                  />
                </span>
              </div>

              <!-- 别人的消息 -->
              <div class="msg-item msg-item-left" v-else>
                <span class="msg-item-avatar">
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="item.sender.portrait"
                  />
                </span>
                <span class="msg-item-content">
                  <div class="msg-sender">
                    {{ item.sender.username }}
                    &ensp;
                    {{ $wechatTime(item.time) }}
                  </div>
                  <msg-item :msg="item" />
                </span>
              </div>
            </div>
          </el-scrollbar>

          <el-divider style="margin: 12px 0" />

          <div>
            <!-- 工具栏 -->
            <div
              style="margin-top: -10px; align-items: right; text-align: right"
            >
              <el-button @click="dialogVisible = true" size="small">
                发送图片
              </el-button>
              <el-button type="primary" @click="sendMessage" size="small">
                发&emsp;送
              </el-button>
            </div>
            <el-input
              :rows="3"
              resize="none"
              clearable
              v-model="message"
              placeholder="按下Ctrl+Enter发送"
              type="textarea"
              style="margin-bottom: -20px; margin-top: 10px; width: 100%"
              maxlength="50000"
              v-on:keydown.ctrl.enter="sendMessage"
            />
          </div>
        </div>
        <h1
          v-show="!currentRoom.id"
          style="
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            margin-top: 35vh;
            color: rgba(0, 0, 0, 0.3);
          "
        >
          请选择一个聊天
        </h1>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" title="请上传图片">
    <el-upload
      v-model:file-list="fileList"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      >+
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认上传</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import AlertAudio from '@/assets/alert.mp3';
import MsgItem from '@/components/MsgItem.vue';
export default {
  computed: {
    ...mapState(['user', 'jwt']),
  },
  components: {
    MsgItem,
  },
  methods: {
    atBottom() {
      const element = this.$refs.chatBox.wrap$;
      return (
        Math.abs(
          element.clientHeight + element.scrollTop - element.scrollHeight
        ) < 3
      );
    },
    toBottom() {
      const element = this.$refs.chatBox.wrap$;
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      });
    },
    sendImg() {},
    sendMessage() {
      while ([' ', '\n'].includes(this.message.slice(-1))) {
        this.message = this.message.slice(0, -1);
      }
      if (!this.message) return;
      const msg = {
        content: this.message,
        content_type: 0,
        room_id: this.currentRoom.room.id,
      };
      const image_re = new RegExp(
        '^IMAGE\n([https:]*?//[A-Za-z0-9-.:]+[.][A-Za-z0-9-:]+/[-A-Za-z0-9+&@#/%=!~_|]*)$'
      );
      if (image_re.test(this.message)) {
        msg.content_type = 1;
        msg.content = image_re.exec(this.message)[1];
      } else {
        msg.content_type = 0;
        msg.content = this.message;
      }
      this.ws.send(
        JSON.stringify({
          action: 'new_message',
          data: msg,
        })
      );
      this.message = '';
      this.toBottom();
    },
    receiveWebsocket(res) {
      let data = res.data;
      data = JSON.parse(data);
      const action = data.action;
      data = data.data;
      if (action === 'heartbeat') return;
      else if (action === 'error') {
        ElMessage.error(data);
        return;
      } else if (action === 'new_message') {
        this.chat[data.room_id].push(data);
        for (let i in this.roomList) {
          if (this.roomList[i].id === data.room_id) {
            const obj = this.roomList[i];
            if (
              data.room_id !== this.currentRoom.id &&
              data.sender.id !== this.user.id
            ) {
              obj.unread = obj.unread += 1;
              new Audio(AlertAudio).play();
            }
            this.roomList.splice(i, 1);
            this.roomList.unshift(obj);
            break;
          }
        }
        if (
          data.room_id === this.currentRoom.id &&
          this.focus &&
          !window.document.hidden &&
          this.atBottom()
        ) {
          this.ws.send(
            JSON.stringify({
              action: 'update_last_read_time',
              data: {
                room_id: data.room_id,
                last_read_time: data.time,
              },
            })
          );
          this.toBottom();
        } else if (
          (!this.focus || window.document.hidden) &&
          window.document.title.slice(0, 6) !== '【有新消息】'
        ) {
          window.document.title = '【有新消息】' + window.document.title;
        }
      } else if (action === 'get_room_message') {
        const chat = this.chat[data.room_id];
        this.chat[data.room_id] = chat.concat(data.messages);
      }
    },
    showRoom(room) {
      if (room.unread > 0) {
        room.unread = 0;
        this.ws.send(
          JSON.stringify({
            action: 'update_last_read_time',
            data: {
              room_id: room.id,
              last_read_time:
                this.chat[room.id][this.chat[room.id].length - 1].time,
            },
          })
        );
      }
      this.currentRoom = room;
      this.toBottom();
    },
  },
  data() {
    return {
      currentRoom: { room: { id: 0 }, single_chat_with: {} },
      message: '',
      chat: {},
      roomList: [],
      ws: undefined,
      wsHeartbeat: undefined,
      wsOncloseLock: false,
      dialogVisible: false,
      focus: false,
    };
  },
  created() {
    this.ws = new WebSocket(
      (import.meta.env.PROD || document.cookie.indexOf('USE_PROD_SERVER') !== -1
        ? 'wss://gtapi.qdzx.icu/ws/im/?jwt='
        : 'ws://127.0.0.1:8000/ws/im/?jwt=') + encodeURIComponent(this.jwt)
    );
    this.wsHeartbeat = setInterval(() => {
      this.ws.send(JSON.stringify({ action: 'heartbeat' }));
    }, 15000);
    this.ws.onmessage = this.receiveWebsocket;
    this.ws.onclose = e => {
      if (!this.wsOncloseLock) {
        this.wsOncloseLock = true;
        setTimeout(() => {
          ElMessageBox.confirm(
            '很抱歉，浏览器与服务器的WebSocket连接意外断开了，页面无法获取实时消息。是否刷新页面重连？',
            '连接丢失',
            {
              confirmButtonText: '刷新',
              cancelButtonText: '留在此界面',
              type: 'error',
            }
          ).then(() => {
            window.location.reload();
          });
        }, 1000);
      }
    };
    this.$axios.get('/im_room/').then(res => {
      for (let i in res) {
        res[i].id = res[i].room.id;
        this.chat[res[i].id] = [];
        res[i].unread = res[i].unread ?? 0;
        setTimeout(() => {
          this.ws.send(
            JSON.stringify({
              action: 'get_room_message',
              data: {
                room_id: res[i].id,
              },
            })
          );
        }, 500 * (Number(i) + 1));
      }
      this.roomList = res;
    });
    window.addEventListener('focus', () => {
      if (window.document.title.slice(0, 6) === '【有新消息】')
        window.document.title = window.document.title.slice(6);
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.focus = true;
      if (vm.currentRoom.id && vm.chat[vm.currentRoom.id] && vm.atBottom()) {
        vm.ws.send(
          JSON.stringify({
            action: 'update_last_read_time',
            data: {
              room_id: vm.currentRoom.id,
              last_read_time:
                vm.chat[vm.currentRoom.id][
                  vm.chat[vm.currentRoom.id].length - 1
                ].time,
            },
          })
        );
        setTimeout(() => {
          vm.$refs.chatBox.wrap$.scrollTop =
            vm.$refs.chatBox.wrap$.scrollTopMax;
        });
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.focus = false;
    next();
  },
};
</script>
