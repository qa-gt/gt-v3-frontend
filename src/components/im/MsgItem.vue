<template>
  <div class="msg-content msg-content-text" v-if="msg.content_type === 0">
    {{ msg.content }}
  </div>
  <div class="msg-content msg-content-image" v-else-if="msg.content_type === 1">
    <el-image
      :src="msg.content"
      :preview-src-list="[msg.content]"
      :hide-on-click-modal="true"
    >
      <template #error>
        <div style="font-size: 60px">
          <el-icon>
            <icon-picture />
          </el-icon>
        </div>
      </template>
    </el-image>
  </div>
  <div class="msg-content msg-content-file" v-else-if="msg.content_type === 3">
    <el-button type="text" @click="downloadFile(msg.id)">
      <el-icon>
        <icon-files />
      </el-icon>
      <span>{{ msg.file.name }}</span>
    </el-button>
  </div>
</template>

<script>
import {
  Picture as IconPicture,
  Files as IconFiles,
} from '@element-plus/icons-vue';
export default {
  name: 'MsgItem',
  props: {
    msg: {
      type: Object,
      default() {
        return {};
      },
    },
    downloadFile: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  components: {
    IconPicture,
    IconFiles,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
