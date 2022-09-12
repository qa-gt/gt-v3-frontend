<template>
  <el-row :gutter="10" justify="space-around" style="height: 100%">
    <!-- 房间列表 -->
    <el-col :span="6">
      <el-card style="width: 90%; height: 90vh">
        <el-scrollbar max-height="83vh">
          <div
            v-for="item in roomList"
            :key="item"
            :class="{
              'room-list': true,
              'room-list-current': currentRoom.id === item.id,
            }"
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
    <el-col :span="18" style="height: 90vh">
      <el-card style="margin-left: -20px; height: 90vh">
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
                <span>
                  <div class="msg-sender">
                    {{ item.sender.username }}
                    &ensp;
                    {{ $wechatTime(item.time) }}
                  </div>
                  <div class="msg-content">
                    {{ item.content }}
                  </div>
                </span>
                <span>
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="item.sender.portrait"
                  />
                </span>
              </div>

              <!-- 别人的消息 -->
              <div class="msg-item msg-item-left" v-else>
                <span>
                  <el-avatar
                    shape="square"
                    :size="35"
                    :src="item.sender.portrait"
                  />
                </span>
                <span>
                  <div class="msg-sender">
                    {{ item.sender.username }}
                    &ensp;
                    {{ $wechatTime(item.time) }}
                  </div>
                  <div class="msg-content">
                    {{ item.content }}
                  </div>
                </span>
              </div>
            </div>
          </el-scrollbar>

          <el-divider />

          <div>
            <el-input
              :rows="3"
              resize="none"
              clearable
              v-model="message"
              placeholder="按下Ctrl+Enter发送"
              type="textarea"
              style="margin-bottom: -20px; margin-top: 0; width: 100%"
              maxlength="50000"
              v-on:keydown.ctrl.enter="sendMessage"
            />
            <!-- <el-button
            type="primary"
            style="margin-bottom: -20px; width: 5%; height: 94px"
          >
            发送
          </el-button> -->
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
</template>

<script>
import { mapState } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  computed: {
    ...mapState(['user', 'jwt']),
  },
  methods: {
    sendMessage() {
      if (!this.message) return;
      this.ws.send(
        JSON.stringify({
          action: 'new_message',
          data: {
            content: this.message,
            content_type: 0,
            room_id: this.currentRoom.room.id,
          },
        })
      );
      this.message = '';
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
            if (data.room_id !== this.currentRoom.id)
              obj.unread = obj.unread += 1;
            this.roomList.splice(i, 1);
            this.roomList.unshift(obj);
            break;
          }
        }
        if (data.room_id === this.currentRoom.id && this.focus) {
          this.ws.send(
            JSON.stringify({
              action: 'update_last_read_time',
              data: {
                room_id: data.room_id,
                last_read_time: data.time,
              },
            })
          );
          setTimeout(() => {
            this.$refs.chatBox.wrap$.scrollTop =
              this.$refs.chatBox.wrap$.scrollTopMax;
          });
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
      setTimeout(() => {
        this.$refs.chatBox.wrap$.scrollTop =
          this.$refs.chatBox.wrap$.scrollTopMax;
      });
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
      focus: false,
    };
  },
  created() {
    this.ws = new WebSocket(
      (import.meta.env.PROD
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
        }, 500 * (i + 1));
      }
      this.roomList = res;
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.focus = true;
      if (vm.chat[vm.currentRoom.id]) {
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

<style lang="scss" scoped>
.room-list {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  vertical-align: middle;
  align-content: center;
  padding-top: 20px;
  color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
}
.room-list:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.room-list:active {
  background-color: rgba(0, 0, 0, 0.08);
}
.room-list-current {
  background-color: rgba(0, 0, 0, 0.12);
}
.room-list-current:hover {
  color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.12);
}

#el-input::-webkit-scrollbar {
  width: 2px;
}

.msg-sender {
  margin-top: -2.5px;
  color: rgba(0, 0, 0, 0.5);
  font-size: small;
}
.msg-item {
  display: flex;
  margin: 10px;
}
.msg-item-left {
  margin-bottom: 20px;
  padding-top: 12px;
  .msg-sender {
    margin-left: 10px;
  }
  .msg-content {
    margin-left: 10px;
    white-space: pre;
  }
}
.msg-item-right {
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 17.5px;
  .msg-sender {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  .msg-content {
    margin-right: 10px;
    white-space: pre;
  }
}
</style>
<style>
.el-badge__content {
  border: none !important;
}
</style>
