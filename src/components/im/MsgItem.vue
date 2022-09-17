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
    <el-button type="text" @click="downloadFile(msg.id)" :title="msg.file.name">
      <el-icon><i class="fal fa-file-alt" /></el-icon>
      <span>
        {{ formatName(msg.file.name) }}
        <small>{{ formatSize(msg.file.size) }}</small>
      </span>
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
  methods: {
    formatName(name, length = 30) {
      if (name.length > length) {
        name =
          name.substring(0, parseInt(length / 2)) +
          '...' +
          name.substring(name.length - parseInt(length / 2), name.length);
      }
      return name;
    },
    formatSize(size, pointLength = 1) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB'];
      let unit;
      while ((unit = units.shift()) && size > 1024) size /= 1024;
      return (unit === 'B' ? size : size.toFixed(pointLength)) + unit;
    },
  },
};
</script>
