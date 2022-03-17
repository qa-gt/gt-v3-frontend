<template>
  <el-row justify="space-evenly" style="margin-bottom: 50px">
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
        <div class="info">
          <el-collapse
            v-model="activeNames"
            @change="handleChange"
            style="border: 0"
          >
            <el-collapse-item name="1" class="articleInfo">
              <template #title>
                <h2 class="overflow">{{ articleTitle }}</h2>
              </template>
              <p>标题&emsp;{{ articleTitle }}</p>
              <p>话题&emsp;{{ topic }}</p>
              <p>作者&emsp;{{ writer }}</p>
              <p>发布时间&emsp;{{ time }}</p>
              <p>阅读量&emsp;{{ reads }}</p>
              <p>
                ID&emsp;{{ articleid }}
                <el-button
                  type="danger"
                  size="small"
                  plain
                  @click="report"
                  style="float: right"
                >
                  <el-icon>
                    <Warning class="report-icon" />
                  </el-icon>
                  <div style="font-size: 12px">&ensp;举&ensp;报</div>
                </el-button>
              </p>
            </el-collapse-item>
          </el-collapse>
        </div>
        <el-divider style="margin-top: 10px" />
        <div style="min-height: 250px">
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
                maxlength="400"
                placeholder="说点什么……"
                show-word-limit
                :rows="3"
                type="textarea"
              >
              </el-input>
            </el-col>
          </el-row>
        </transition>
        <el-row justify="right" style="float: right">
          <el-button
            type="primary"
            style="padding: 10px; margin-right: 5px"
            v-show="showComment"
            @click="commentSubmit"
          >
            发表评论
          </el-button>
          <el-dropdown trigger="hover">
            <el-button type="primary" style="padding: 10px">
              互动<el-icon style="margin-left: 10px"><arrow-down /></el-icon>
            </el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <span>
                  <el-dropdown-item @click="like"
                    >&ensp;赞&ensp;</el-dropdown-item
                  >
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
        <el-divider />
        
      </el-card>
    </el-col>
  </el-row>
</template>

<style>
.el-collapse-item__header,
.el-collapse-item__wrap {
  border-bottom: 0px solid rgba(255, 255, 255, 0) !important;
}

.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.articleInfo,
.el-collapse-item__content {
  border: 0;
  margin-bottom: 0 !important;
}
.articleInfo p {
  margin: 5px !important;
}
</style>

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
      ElMessage.success("评论成功！");
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
      who: "test",
      comments: "zbczbczbczbczbc"
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