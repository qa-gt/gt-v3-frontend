<template>
  <el-row justify="center" style="height: 100%; margin-top: -20px" :gutter="20">
    <!-- 房间列表 -->
    <el-col :span="6">
      <el-card style="width: 90%; height: 90vh">
        <el-row style="height: 3vh; margin-bottom: 10px" justify="center">
          <el-col :span="16">
            <el-input
              v-model="searchUser"
              size="small"
              placeholder="搜索用户"
            />
          </el-col>
          <el-col :span="1" />
          <el-col :span="4">
            <el-dropdown>
              <el-button size="small" style="width: 100%"> 更多 + </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="dialogVisible.createGroup = true">
                    创建群聊
                  </el-dropdown-item>
                  <el-dropdown-item @click="dialogVisible.joinGroup = true">
                    加入群聊
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="1" />
        </el-row>
        <el-scrollbar height="76vh">
          <div
            v-for="item in rooms"
            :key="item"
            :class="{
              'room-item': true,
              'room-item-current': currentRoom.room.id === item.room.id,
            }"
            :title="item.room.name || item.single_chat_with.username"
            @click="showRoom(item)"
          >
            <el-badge :hidden="item.unread <= 0" :value="item.unread">
              <el-avatar
                shape="square"
                :src="
                  item.room.is_group
                    ? item.room.avatar
                    : item.single_chat_with.portrait
                "
                :size="40"
                style="margin-bottom: 17.5px; margin-left: 10px"
              />
            </el-badge>
            <span style="margin-left: 20px; margin-bottom: 17.5px">
              <i v-if="item.room.is_group" class="fal fa-users" />
              {{ item.room.name || item.single_chat_with.username }}
            </span>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>

    <!-- 聊天界面 -->
    <el-col :span="14" style="height: 90vh">
      <el-card style="margin-left: -20px; height: 100%">
        <div v-show="currentRoom.room.id">
          <h3 style="margin: 0">
            <i v-if="currentRoom.room.is_group" class="fal fa-users" />
            {{ currentRoom.room.name || currentRoom.single_chat_with.username }}
          </h3>

          <el-scrollbar
            style="
              height: 60vh;
              border-top: 1px var(--el-border-color) var(--el-border-style);
              border-bottom: 1px var(--el-border-color) var(--el-border-style);
              padding: 10px 0;
              margin: 10px 0;
            "
            max-height="60vh"
            ref="chatBox"
            v-loading="currentRoom.load.loading"
          >
            <div v-for="item in currentRoom.message" :key="item">
              <!-- 系统消息 -->
              <div class="msg-item msg-item-system" v-if="!item.sender">
                {{ $wechatTime(item.time) }}&emsp;{{ item.content }}
              </div>

              <!-- 自己的消息 -->
              <div
                class="msg-item msg-item-right"
                v-else-if="item.sender.id === user.id"
              >
                <span class="msg-item-content">
                  <div class="msg-sender">
                    {{ item.sender.username }}
                    &ensp;
                    {{ $wechatTime(item.time) }}
                  </div>
                  <msg-item :msg="item" :downloadFile="downloadFile" />
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
                  <msg-item :msg="item" :downloadFile="downloadFile" />
                </span>
              </div>
            </div>
          </el-scrollbar>

          <!-- 工具栏 -->
          <div>
            <div style="align-items: right; text-align: right">
              <el-button @click="dialogVisible.sendImage = true" size="small">
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
          v-show="!currentRoom.room.id"
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

  <!-- el-dialog -->

  <el-dialog v-model="dialogVisible.joinGroup" title="加入群聊">
    <el-input
      v-model="joinGroupData.inviteCode"
      placeholder="邀请码（不区分大小写）"
    />
    <p>点击确认后将自动刷新界面，请注意保存当前页面状态。</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.joinGroup = false">取消</el-button>
        <el-button type="primary" @click="joinGroup">确认加入</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible.createGroup" title="创建群聊">
    <div v-if="createGroupData.inviteCode">
      <h3 style="text-align: center">您的邀请码是（点击复制）</h3>
      <h1
        style="text-align: center; cursor: pointer"
        @click="copyText(createGroupData.inviteCode, true)"
      >
        {{ createGroupData.inviteCode }}
      </h1>
    </div>
    <div v-else>
      <el-input v-model="createGroupData.name" placeholder="群聊名称" />
      <el-input
        v-model="createGroupData.avatar"
        placeholder="群聊头像(URL地址)"
        style="margin-top: 10px"
      />
      <p>创建后需刷新界面以使该群聊显示在列表中。</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.createGroup = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible.createGroup = false"
          v-if="createGroupData.inviteCode"
        >
          完成
        </el-button>
        <el-button type="primary" @click="createGroup" v-else>
          确认创建
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import AlertAudio from '@/assets/alert.mp3';
import MsgItem from '@/components/im/MsgItem.vue';
import { saveAs } from 'file-saver';
import UploadProgress from '@/components/im/UploadProgress.vue';
export default {
  computed: {
    ...mapState(['user', 'jwt']),
  },
  components: {
    UploadProgress,
    MsgItem,
  },
  data() {
    return {
      currentRoom: { room: { id: 0 }, single_chat_with: {}, load: {} },
      message: '',
      rooms: [],
      ws: undefined,
      wsHeartbeat: undefined,
      wsOncloseLock: false,
      dialogVisible: {
        createGroup: false,
        joinGroup: false,
      },
      createGroupData: {
        name: '',
        avatar: '',
        inviteCode: '',
      },
      joinGroupData: {
        inviteCode: '',
      },
      focus: false,
      searchUser: '',
      uploadFile: null,
      uploadFileNotification: null,
    };
  },
  methods: {
    copyText(text, alert = false) {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      if (alert) {
        ElMessage.success('复制成功');
      }
    },
    createGroup() {
      this.ws.send(
        JSON.stringify({
          action: 'create_group',
          data: this.createGroupData,
        })
      );
    },
    joinGroup() {
      this.ws.send(
        JSON.stringify({
          action: 'join_group',
          data: {
            invite_code: this.joinGroupData.inviteCode,
          },
        })
      );
    },
    loadMore() {
      if (this.currentRoom.load.loading || this.currentRoom.load.noMore) return;
      const element = this.$refs.chatBox.wrap$;
      if (element.scrollTop !== 0) return;
      this.currentRoom.load.loading = true;
      this.ws.send(
        JSON.stringify({
          action: 'more_message',
          data: {
            room_id: this.currentRoom.room.id,
            oldest_time: this.currentRoom.message[0].time,
          },
        })
      );
    },
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
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, i * 5);
      }
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
      const image_re = new RegExp('^IMAGE\n(.*)?$');
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
    async doUpload(uploadUrl, fileId) {
      const total = this.uploadFile.size;
      const piece = parseInt(Math.min(1024 * 1024 * 10, total / 2 + 1));
      let start = 0;
      let end = start + piece;
      let cnt = Math.ceil(total / piece);
      const upload_progress_bar = document.getElementById(
          'upload-progress-bar'
        ),
        upload_progress_text = document.getElementById('upload-progress-text');
      upload_progress_text.innerText = '0%';
      while (start < total - 1) {
        const current = Math.min(end, total);
        await this.$axios.put(
          uploadUrl,
          this.uploadFile.slice(start, current),
          {
            headers: {
              'Content-Range': `bytes ${start}-${current - 1}/${total}`,
            },
          }
        );
        cnt--;
        if (cnt === 0) {
          upload_progress_bar.style.width = '100%';
          upload_progress_text.innerText = '上传成功';
          setTimeout(() => {
            this.uploadFileNotification.close();
            this.uploadFileNotification = null;
          }, 2000);
          this.ws.send(
            JSON.stringify({
              action: 'upload_finish',
              data: {
                file_id: fileId,
              },
            })
          );
          this.uploadFile = null;
        } else {
          upload_progress_bar.style.width = upload_progress_text.innerText =
            Math.round((1 - cnt / Math.ceil(total / piece)) * 100) + '%';
        }
        start = current;
        end = start + piece;
      }
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
        for (let i in this.rooms) {
          if (this.rooms[i].room.id === data.room_id) {
            const obj = this.rooms[i];
            obj.message.push(data);
            if (
              data.room_id !== this.currentRoom.room.id &&
              data.sender.id !== this.user.id
            ) {
              obj.unread = obj.unread += 1;
              new Audio(AlertAudio).play();
            }
            this.rooms.splice(i, 1);
            this.rooms.unshift(obj);
            break;
          }
        }
        if (
          data.room_id === this.currentRoom.room.id &&
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
      } else if (action === 'upload_file') {
        setTimeout(() => {
          this.doUpload(data.upload_url, data.file_id);
        });
      } else if (action === 'download_file') {
        saveAs(data.download_url, data.file_name);
      } else if (action === 'more_message') {
        for (let i in this.rooms) {
          if (this.rooms[i].room.id === data.room_id) {
            const element = this.$refs.chatBox.wrap$;
            const oldScrollTop = element.scrollHeight;
            const obj = this.rooms[i];
            obj.message.unshift(...data.message);
            if (data.message.length < 50) obj.load.noMore = true;
            setTimeout(() => {
              const newScrollTop = element.scrollHeight;
              element.scrollTop += newScrollTop - oldScrollTop;
            });
            setTimeout(() => {
              obj.load.loading = false;
            }, 250);
            break;
          }
        }
      } else if (action === 'create_group') {
        this.createGroupData.inviteCode = data.invite_code;
      } else if (action === 'join_group') {
        window.location.reload();
      } else if (action === 'init') {
        this.rooms = data;
      } else {
        console.error('接收到包含未知action的WebScoket数据！');
        console.log(action, data);
      }
    },
    oncloseWebsocket(e) {
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
    },
    dropFile(e) {
      e.preventDefault();
      if (this.uploadFile) return;
      else if (this.uploadFileNotification) {
        this.uploadFileNotification.close();
        this.uploadFileNotification = null;
      }
      this.uploadFile = e.dataTransfer.files[0];
      ElMessageBox.confirm(
        `确定要上传文件 ${this.uploadFile.name} 吗？`,
        '确认上传',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }
      )
        .then(async () => {
          this.uploadFileNotification = await ElNotification.info({
            title: '上传文件',
            message: `<div class="el-progress el-progress--line" role="progressbar"><div class="el-progress-bar"><div class="el-progress-bar__outer" style="height: 6px;"><div class="el-progress-bar__inner" style="width: 0%; animation-duration: 3s;" id="upload-progress-bar"></div></div></div><div class="el-progress__text" style="font-size: 14.4px;"><span id="upload-progress-text">准备中...</span></div></div>`,
            dangerouslyUseHTMLString: true,
            duration: 0,
            offset: 60,
          });
          this.ws.send(
            JSON.stringify({
              action: 'upload_file',
              data: {
                file_name: this.uploadFile.name,
                file_size: this.uploadFile.size,
                room_id: this.currentRoom.room.id,
              },
            })
          );
        })
        .catch(() => {
          this.uploadFile = null;
        });
    },
    downloadFile(message_id) {
      this.ws.send(
        JSON.stringify({
          action: 'download_file',
          data: {
            message_id,
          },
        })
      );
    },
    showRoom(room) {
      if (room.unread > 0) {
        room.unread = 0;
        this.ws.send(
          JSON.stringify({
            action: 'update_last_read_time',
            data: {
              room_id: room.room.id,
              last_read_time: room.message[room.message.length - 1].time,
            },
          })
        );
      }
      if (room.load === undefined) {
        room.load = {
          loading: false,
          noMore: room.message.length < 20,
        };
      }
      this.currentRoom = room;
      this.toBottom();
      setTimeout(() => {
        const element = this.$refs.chatBox.wrap$;
        if (!room.load.noMore) element.onscroll = this.loadMore;
        element.addEventListener('drop', this.dropFile, false);
        element.addEventListener(
          'dragenter',
          e => {
            e.preventDefault();
            console.log(123);
          },
          false
        );
        element.addEventListener('dragover', e => e.preventDefault(), false);
        element.addEventListener('dragleave', e => e.preventDefault(), false);
      });
    },
  },

  created() {
    this.ws = new WebSocket(
      (import.meta.env.PROD || document.cookie.indexOf('USE_PROD_SERVER') !== -1
        ? 'wss://gtapi.yxzl.top/ws/im/?jwt='
        : 'ws://127.0.0.1:8000/ws/im/?jwt=') + encodeURIComponent(this.jwt)
    );
    this.wsHeartbeat = setInterval(() => {
      this.ws.send(JSON.stringify({ action: 'heartbeat' }));
    }, 5000);
    this.ws.onmessage = this.receiveWebsocket;
    this.ws.onclose = this.oncloseWebsocket;
    window.addEventListener('focus', () => {
      if (window.document.title.slice(0, 6) === '【有新消息】')
        window.document.title = window.document.title.slice(6);
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.focus = true;
      if (vm.currentRoom.room.id && vm.currentRoom.message && vm.atBottom()) {
        vm.ws.send(
          JSON.stringify({
            action: 'update_last_read_time',
            data: {
              room_id: vm.currentRoom.room.id,
              last_read_time:
                vm.currentRoom.message[vm.currentRoom.message.length - 1].time,
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

<style scoped>
.fa-users {
  color: rgba(0, 0, 0, 0.3);
}
</style>
