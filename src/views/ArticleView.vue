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
        <el-row justify="space-between">
          <el-col :span="12">
            <div class="info">
              作者: {{ writer }}<el-divider direction="vertical" /> 发布时间:{{
                time
              }}<el-divider direction="vertical" /> 话题: {{ topic
              }}<el-divider direction="vertical" /> ID: {{ articleid
              }}<el-divider direction="vertical" /> 阅读量: {{ reads }}
            </div>
          </el-col>
          <el-col :span="3">
            <el-button type="danger" size="small" plain @click="report">
              <el-icon>
                <Warning class="report-icon" />
              </el-icon>
              <div style="font-size: 12px">&ensp;举&ensp;报</div>
            </el-button>
          </el-col>
        </el-row>
        <el-divider />
        <div>
          {{ articleContent }}
        </div>
      </el-card>
      <br /><br />
      <el-card shadow="hover" class="comments-card">
        <el-row justify="left">
          <el-col :span="3">
            <el-button type="primary" round @click="like">
              <svg
                t="1647409126068"
                class="icon"
                viewBox="0 0 1137 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1270"
                width="18"
                height="18"
              >
                <path
                  d="M786.99844883 62a298.88768232 298.88768232 0 0 0-225 102.99875888A298.78994707 298.78994707 0 0 0 337.05429717 62C182.07446504 62 62 179.70089961 62 331.74868115c0 186.38070117 169.97517862 335.95718291 427.49301885 566.47223086l72.50542998 63.77908799L634.44802959 898.23487432C892.03568135 667.70586406 1061.99689766 518.12938232 1061.99689766 331.74868115c0-152.04778154-119.97672979-269.74868115-275.05429717-269.74868115z m-194.07384404 771.70183067l-10.15048125 9.08935751-20.70586406 18.15079132-20.70586407-18.15079132-10.2342542-9.08935751C409.95066729 725.20198614 305.31833721 631.55786504 236.08004961 547.78498261c-67.18585166-81.37139326-97.16258144-147.99875888-97.16258144-216.05026376 0-53.5867207 20.25907558-102.94291055 57.0353704-139.00713575S282.60192325 137.0046544 337.05429717 137.0046544c62.82966182 0 124.96121631 28.5246668 166.1495502 76.27520917l58.8364875 68.26093682 58.83648837-68.26093682c41.21625849-47.75054326 103.31988838-76.27520918 166.14954932-76.27520917 54.34067636 0 104.43686045 19.79832481 141.01768564 55.73689101s57.03537041 85.42041592 57.0353713 139.00713574c0 68.05150489-29.97672979 134.6649082-97.16258145 216.05026377C818.74837109 631.55786504 714.03226807 725.20198614 592.86875557 833.70183067z m0 0"
                  fill="#FFFFFF"
                  p-id="1271"
                ></path>
              </svg>
              &ensp;点&ensp;赞&ensp;
            </el-button>
          </el-col>
          <el-col :span="21">
            <div class="info-2">{{ users }}</div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="22">
            <el-input
            v-model="comment"
            maxlength="200"
            placeholder="说点什么……"
            show-word-limit
            type="textarea"
            @input="comment"
            >
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="oncomment">评论
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
//import { Warning } from '@element-plus/icons-vue'

export default {
  methods: {
    report: () => {
      ElMessage.warning("已举报");
    },
    oncomment: () => {
      ElMessage.success("评论成功1")
    },
    like: () => {
      ElMessage.success("点赞成功！")
    }
  },

  data() {
    return {
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
      users: "aaa,bbb,ccc,ddd",
    };
  },
};
</script>

<style>
.info {
  font-size: 14px;
  color: #7a7a7a;
}

.info-2 {
  font-size: 16px;
  color: #7c7c7c;
  align-items: center;
}

.read-card {
  min-height: 600px;
}

.conments-card {
  min-width: none;
  min-height: 200px;
}

.report-icon {
  width: 20px;
  height: 20px;
}
</style>