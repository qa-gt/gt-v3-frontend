<template>
  <el-row justify="space-evenly" style="margin-bottom: 50px">
    <el-col
      :xs="24"
      :sm="18"
      :md="6"
      :lg="5"
      :xl="4"
      style="margin-bottom: 20px"
    >
      <gt-user :user="atc.author" />
    </el-col>

    <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
      <el-card shadow="hover" full class="read-card">
        <el-collapse style="border: 0">
          <el-collapse-item class="articleInfo">
            <template #title>
              <h2 class="overflow" style="float: left">
                <template v-if="atc.top">【置顶】</template>
                {{ atc.title }}
              </h2>
            </template>
            <p>
              标&emsp;&emsp;题&emsp;
              <template v-if="atc.top">【置顶】</template>
              {{ atc.title }}
            </p>
            <p>
              话&emsp;&emsp;题&emsp;
              {{ atc.topic.name }}
              <el-button
                type="primary"
                size="small"
                plain
                @click="this.$router.push(`/write?id=${atc.id}`)"
                style="float: right; margin-right: 5px"
                v-if="user.id === atc.author.id"
              >
                <i class="fal fa-edit" />
                <div>&ensp;修改文章</div>
              </el-button>
            </p>
            <p>
              作&emsp;&emsp;者&emsp;
              {{ atc.author.username }}
            </p>
            <p>
              发布时间&emsp;
              {{ $moment(atc.create_time).format('lll') }}
              <el-popconfirm
                confirm-button-text="确定删除"
                cancel-button-text="我再想想"
                icon="InfoFilled"
                icon-color="red"
                title="确定要删除文章吗？"
                @confirm="deleteArticle"
                v-if="user.id === atc.author.id"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    plain
                    style="float: right; margin-right: 5px"
                  >
                    <i class="fal fa-trash" />
                    <div>&ensp;删除文章</div>
                  </el-button>
                </template>
              </el-popconfirm>
            </p>
            <p>
              更新时间&emsp;
              {{ $moment(atc.update_time).format('lll') }}
            </p>
            <p>
              阅读人数&emsp;
              {{ atc.read_count }}
            </p>
            <p>
              文章&emsp;ID&emsp;
              {{ atc.id }}
              <el-button
                type="danger"
                size="small"
                plain
                @click="report"
                style="float: right; margin-right: 5px"
                v-if="!(user.id === atc.author.id)"
              >
                <i class="fal fa-exclamation-circle"></i>
                <div>&ensp;举&ensp;报</div>
              </el-button>
            </p>
          </el-collapse-item>
        </el-collapse>
        <el-divider style="margin-top: 10px" />
        <gt-md-editor :modelValue="atc.content" :previewOnly="true" />
        <!-- <gt-form :formdata="form" /> -->
      </el-card>
      <br /><br />
      <el-card shadow="hover" class="comments-card">
        <transition
          v-on:before-enter="commentAnimation1"
          v-on:enter="commentAnimation2"
          v-on:leave="commentAnimation3"
        >
          <el-row gutter="3" v-if="showComment" style="height: auto">
            <el-col :span="24">
              <el-input
                id="comment"
                v-model="comment"
                maxlength="400"
                :placeholder="
                  reply.status ? '回复 ' + reply.username : '说点什么...'
                "
                show-word-limit
                :rows="3"
                type="textarea"
                style="height: auto; max-height: 500px !important"
              >
              </el-input>
            </el-col>
          </el-row>
        </transition>
        <el-row style="margin-top: 10px; float: right">
          <el-button
            type="primary"
            style="padding: 10px; margin-right: 5px"
            v-show="showComment"
            @click="commentSubmit"
            :disabled="!comment || disabled.comment"
          >
            发表<span v-if="!reply.status">评论</span>
            <span v-else>回复</span>
          </el-button>

          <el-dropdown trigger="hover">
            <el-button type="primary" style="padding: 10px">
              互动&emsp;<i class="fal fa-angle-down"></i>
            </el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <span>
                  <el-dropdown-item @click="like">
                    <i class="fal fa-thumbs-up"></i>
                    <span v-if="!liked"> &ensp;吃&ensp;瓜&ensp; </span>
                    <span v-else> &ensp;取&ensp;消&ensp; </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="writeComment">
                    <i class="fal fa-comment-dots"></i>
                    &ensp;评&ensp;论&ensp;
                  </el-dropdown-item>
                  <el-dropdown-item @click="collect">
                    <i class="fal fa-star"></i>
                    <span v-if="!atc.collected"> &ensp;收&ensp;藏&ensp; </span>
                    <span v-else> &ensp;取&ensp;消&ensp; </span>
                  </el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
        <el-divider style="margin-top: 60px" />
        <p style="font-weight: bold; font-size: 1.1rem">吃瓜</p>
        <el-row>
          <div class="info-2">
            <span v-for="item in atcLike" :key="item.user.id">
              <span
                @click="this.$router.push(`/user/${item.user.id}`)"
                style="cursor: pointer"
              >
                {{ item.user.username }}
              </span>
              <span v-if="item.user.id !== atcLike[atcLike.length - 1].user.id">
                ,&ensp;
              </span>
            </span>
          </div>
        </el-row>
        <el-divider />
        <p style="font-weight: bold; font-size: 1.1rem">评论</p>
        <div v-loading="pageInfo.loading">
          <el-row
            class="comment-item"
            v-for="item in atcComment"
            :key="item.id"
          >
            <el-col
              :xs="4"
              :sm="3"
              :md="2"
              :lg="1"
              :xl="1"
              style="padding: 5px"
            >
              <el-avatar
                shape="square"
                :src="item.author.portrait"
                :size="40"
                style="cursor: pointer"
                @click="this.$router.push(`/user/${item.author.id}`)"
              />
            </el-col>
            <el-col :xs="20" :sm="21" :md="22" :lg="23" :xl="23">
              <div
                class="comment-content"
                :style="{
                  'padding-left': $root.isMobile ? '5px' : '20px',
                }"
              >
                <div class="comment-title">
                  <span
                    class="comment comment-user"
                    style="cursor: pointer"
                    @click="this.$router.push(`/user/${item.author.id}`)"
                  >
                    {{ item.author.username }}
                  </span>
                  <span class="comment comment-user" v-if="item.reply">
                    &ensp;回复&ensp;
                    <span
                      style="cursor: pointer"
                      @click="
                        this.$router.push(`/user/${item.reply.author.id}`)
                      "
                    >
                      {{ item.reply.author.username }}
                    </span>
                  </span>
                  <span class="comment comment-time">
                    {{ $moment(item.time).fromNow() }}
                    <el-dropdown trigger="hover">
                      <i
                        class="fal fa-plus"
                        style="
                          margin-left: 5px;
                          margin-top: 4px;
                          color: rgb(185, 185, 185);
                        "
                      ></i>
                      <template v-slot:dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item disabled>
                            ID: {{ item.id }}
                          </el-dropdown-item>
                          <el-dropdown-item @click.prevent="replyCmt(item)">
                            <i class="fal fa-reply"></i>
                            &ensp;回&ensp;复&ensp;
                          </el-dropdown-item>
                          <el-dropdown-item @click="report">
                            <i class="fal fa-exclamation-circle"></i>
                            &ensp;举&ensp;报&ensp;
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </span>
                </div>
                <div
                  class="comment comment-text"
                  v-html="processMd(item.content).replaceAll('\n', '<br />')"
                ></div>
              </div>
            </el-col>
            <el-divider class="comment-divider" />
          </el-row>
        </div>
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          v-model:current-page="pageInfo.num"
          :total="pageInfo.total"
          :page-size="pageInfo.size"
          :pager-count="7"
          :hide-on-single-page="true"
          @current-change="getCmts"
          class="hidden-sm-and-down"
        />
        <el-pagination
          layout="prev, pager, next"
          v-model:current-page="pageInfo.num"
          :total="pageInfo.total"
          :page-size="pageInfo.size"
          :pager-count="5"
          :hide-on-single-page="true"
          @current-change="getCmts"
          class="hidden-md-and-up"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus';
import Velocity from 'velocity-animate';
import { mapState, mapGetters } from 'vuex';
import gtUser from '@/components/gtUser.vue';
import gtMdEditor from '@/components/mdEditor.vue';
import { ElLoading } from 'element-plus';
import { processMd } from '@/plugins/markdown';
export default {
  components: {
    gtUser,
    gtMdEditor,
  },
  data() {
    return {
      atc: { topic: {}, author: {} },
      atcLike: [],
      atcComment: [],
      showComment: false,
      liked: false,
      comment: '',
      reply: { status: false, id: 0, username: '' },
      pageInfo: { total: 0, num: 1, size: 20, loading: false },
      disabled: { comment: false },
    };
  },
  computed: {
    ...mapState(['user', 'theme', 'readedAtc']),
    ...mapGetters(['loggedIn']),
  },
  methods: {
    processMd,
    getCmts() {
      this.pageInfo.loading = true;
      this.$axios
        .get('/comment/', {
          params: {
            article: this.$route.params.aid,
            min_state: 0,
            page: this.pageInfo.num,
          },
        })
        .then(res => {
          this.pageInfo.total = res.count;
          this.atcComment = res.results;
        })
        .then(() => {
          this.pageInfo.loading = false;
        })
        .catch(err => err);
    },
    init() {
      const loading = ElLoading.service({ fullscreen: true });
      this.$axios
        .get(`/article/${this.$route.params.aid}/`)
        .then(res => (this.atc = res))
        .finally(() => setTimeout(loading.close, 100));
      this.$axios
        .get('/like/', { params: { article: this.$route.params.aid } })
        .then(res => {
          this.atcLike = res;
          this.liked = this.atcLike.some(item => item.user.id === this.user.id);
        });
      this.getCmts();
      if (!this.readedAtc.includes(this.$route.params.aid)) {
        this.$axios
          .patch(`/article/${this.$route.params.aid}/read/`)
          .then(() => {
            this.atc.read_count += 1;
          })
          .catch(err => err);
        this.$store.commit('addReadedAtc', this.$route.params.aid);
      }
    },
    refresh() {
      this.$axios
        .get('/like/', { params: { article: this.$route.params.aid } })
        .then(res => {
          this.atcLike = res;
        })
        .catch(err => err);
      this.getCmts();
    },
    replyCmt(cmt) {
      if (!this.loggedIn) {
        ElMessage.warning('请先登录');
        return;
      }
      this.reply.status = true;
      this.reply.id = cmt.id;
      this.reply.username = cmt.author.username;
      this.showComment = true;
      document.querySelector('#comment').scrollIntoView({ behavior: 'smooth' });
    },
    report() {
      if (!this.loggedIn) {
        ElMessage.warning('请先登录');
        return;
      }
      ElMessage.warning('举报功能暂未开通');
    },
    async commentSubmit() {
      if (this.comment.trim() === '') {
        ElMessage.error('评论不能为空！');
        return;
      }
      this.disabled.comment = true;
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('comment');

      this.$axios
        .post('/comment/', {
          article: this.$route.params.aid,
          content: this.comment,
          reply: (this.reply.status && this.reply.id) || '',
          recaptcha: token,
        })
        .then(() => {
          ElMessage.success((this.reply.status ? '回复' : '评论') + '成功！');
          this.refresh();
          this.comment = '';
          setTimeout(() => {
            this.writeComment();
          }, 100);
        })
        .finally(() => {
          this.disabled.comment = false;
        });
    },
    writeComment() {
      if (!this.loggedIn) {
        ElMessage.warning('请先登录');
        return;
      }
      this.showComment = true;
      this.reply.status = false;
    },
    like() {
      if (!this.loggedIn) {
        ElMessage.warning('请先登录');
        return;
      }
      this.$axios
        .post('/like/', { article: this.$route.params.aid })
        .then(res => {
          if (res.opt === 'add') {
            this.liked = true;
          } else if (res.opt === 'cancel') {
            this.liked = false;
          }
          this.refresh();
          ElMessage.success(res.detail);
        });
    },
    commentAnimation1(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    commentAnimation2(el, done) {
      Velocity(el, { opacity: 1, height: '80px' }, { duration: 300 });
      done();
    },
    commentAnimation3(el, done) {
      Velocity(
        el,
        { opacity: 0, height: 0 },
        { duration: 300, complete: done }
      );
    },
    collect() {
      if (!this.loggedIn) {
        ElMessage.warning('请先登录');
        return;
      }
      if (!this.atc.collected) {
        this.$axios
          .post('/collect/', {
            article: this.$route.params.aid,
          })
          .then(res => {
            ElMessage.success(res.detail);
          })
          .catch(err => err);
      } else {
        this.$axios
          .delete(`/collect/0/`, {
            params: { article: this.$route.params.aid },
          })
          .then(res => {
            ElMessage.success(res.detail);
          })
          .catch(err => err);
      }
    },
    deleteArticle() {
      this.$axios.delete(`/article/${this.$route.params.aid}/`).then(res => {
        ElMessage.success('删除成功');
        this.$router.push('/');
      });
    },
  },
  watch: {
    $route(now, old) {
      if (
        now.name !== 'article' ||
        !now.params.aid ||
        old.params.aid === now.params.aid
      )
        return;
      this.init();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.vuepress-markdown-body {
  margin-top: -10px;
  padding: 0 10px !important;
}

.info {
  font-size: 14px;
  color: #7a7a7a;
}

.info-2 {
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

.comment-item {
  margin-top: -5px;
  padding: 5px 15px;
  flex-wrap: wrap;
}

.comment {
  word-break: break-all;
}

.comment-user {
  font-weight: bold;
}

.comment-title {
  margin-bottom: 5px;
}

.comment-time {
  float: right;
  color: rgb(185, 185, 185);
}

.comment-divider {
  margin: 10px;
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
  margin: 0 5px !important;
}
</style>

<style>
.el-collapse-item__header,
.el-collapse-item__wrap {
  border-bottom: 0px solid rgba(255, 255, 255, 0) !important;
}
</style>
