<template>
  <el-row justify="space-evenly">
    <el-col :span="5" :xs="24" :sm="18" :md="6" style="margin-bottom: 20px">
      <el-card shadow="hover" class="box-card">
        <template #header>
          <div class="card-header">
            <h2>{{ username }}</h2>
          </div>
        </template>
        <div>
          <div>ID:{{ id }} | {{ grade }} | {{ sex }}</div>
          <br />
          <div>
            <b>认证:{{ tags }}</b>
          </div>
          <br />
        </div>
      </el-card>
      <br />
    </el-col>
    <el-col :span="19" :xs="24" :sm="18" :md="17" style="min-width: 300px">
      <el-card shadow="hover" full class="read-card">
        <h2>{{ articleTitle }}</h2>
        <!-- <el-row justify="space-between"> -->
        <!-- <el-col :span="12"> -->
        <div class="info">
          作者: {{ writer }}<el-divider direction="vertical" /> 发布时间:{{
            time
          }}<el-divider direction="vertical" /> 话题: {{ topic
          }}<el-divider direction="vertical" /> ID: {{ articleid
          }}<el-divider direction="vertical" /> 阅读量: {{ reads }}
        </div>
        <el-divider />
        <div>
          {{ articleContent }}
        </div>
      </el-card>
      <br /><br />
      <el-card shadow="hover" class="comments-card">
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <el-row gutter="3" v-if="showComment">
            <el-col :span="24">
              <el-input
                v-model="comment"
                maxlength="200"
                placeholder="说点什么……"
                show-word-limit
                :rows="3"
                type="textarea"
              >
              </el-input>
            </el-col>
          </el-row>
        </transition>
        <el-row
          justify="right"
          :style="{ float: 'right', 'margin-top': showComment ? '10px' : '0' }"
        >
          <el-button
            type="primary"
            style="padding: 10px; margin-right: 5px"
            v-show="showComment"
            @click="commentSubmit"
          >
            发表评论
          </el-button>
          <el-dropdown trigger="click">
            <el-button type="primary" style="padding: 10px">
              互动<el-icon style="margin-left: 10px"><arrow-down /></el-icon>
            </el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <span>
                  <el-dropdown-item @click="like">赞</el-dropdown-item>
                  <el-dropdown-item @click="writeComment"
                    >评论</el-dropdown-item
                  >
                </span>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
        <el-divider style="margin-top: 60px" />
        <el-row justify="left">
          <div class="info-2">赞: {{ users }}</div>
        </el-row>
        <!-- 往后评论加在这里，新开一个el-row -->
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
import Velocity from "velocity-animate";
//import { Warning } from '@element-plus/icons-vue'

export default {
  methods: {
    report: () => {
      ElMessage.warning("已举报");
    },
    commentSubmit: () => {
      ElMessage.success("评论成功1");
    },
    writeComment: function () {
      this.showComment = !this.showComment;
      ElMessage.info("展示评论");
    },
    like: () => {
      ElMessage.success("点赞成功！");
    },
    // 动画
    beforeEnter: (el) => {
      el.style.opacity = 0;
      el.style.height = 0;
      // console.log(el);
    },
    enter: (el, done) => {
      Velocity(el, { opacity: 1, height: "80px" }, { duration: 300 });
      done();
    },
    leave: (el, done) => {
      console.log(el);
      Velocity(
        el,
        { opacity: 0, height: 0 },
        { duration: 300, complete: done }
      );
    },
  },

  data() {
    return {
      showComment: false,
      username: "test",
      id: "1",
      grade: "九年级",
      sex: "♂",
      tags: "创始人",
      articleContent: "test",
      articleTitle: "test",
      writer: "test",
      time: "2022/03/16 10:16:59",
      topic: "默认话题",
      articleid: "1",
      reads: "100",
      users:
        "aaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,dddaaa,bbb,ccc,ddd",
      comment: "",
    };
  },
};
</script>

<style>
/* .v-enter-active {
  transition: opacity 0.5s;
}
.v-enter {
  opacity: 0;
}
.v-leave-active {
  transition: opacity 0.5s;
}
.v-leave-to {
  opacity: 0;
} */
/* 
@keyframes show {
  0% {
    opacity: 0;
    left: 32px;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    left: 0;
  }
  100% {
    opacity: 0;
    left: -32px;
  }
}
.v-enter-active {
  animation: show 1.2s;
}
.v-leave-active {
  animation: hide 1.2s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
} */

.info {
  font-size: 14px;
  color: #7a7a7a;
}

.info-2 {
  /* font-size: 1.3rem; */
  color: #7c7c7c;
  align-items: center;
  display: inline;
  word-break: break-all;
}

.read-card {
  min-height: 550px;
}

.conments-card {
  min-width: none;
  min-height: 200px;
}

.report-icon {
  width: 20px;
  height: 20px;
}

.oncomment-button {
  width: 100%;
  height: 100%;
}
</style>