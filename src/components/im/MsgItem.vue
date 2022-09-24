<template>
  <div
    class="msg-content msg-content-text"
    v-if="msg.content_type === 0"
    v-html="parseUrl(msg.content)"
  />
  <div class="msg-content msg-content-image" v-else-if="msg.content_type === 1">
    <el-image
      :src="msg.content"
      :preview-src-list="[
        msg.content.indexOf('https://gtcdn.yxzl.top/') === 0 &&
        msg.content.slice(-3) === '/30'
          ? msg.content.slice(0, -3)
          : msg.content,
      ]"
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
  <div
    class="msg-content msg-content-file"
    v-else-if="[3, 4].includes(msg.content_type) && !playAudio"
  >
    <el-button
      type="text"
      :title="
        msg.file ? msg.file.name : { 4: '音频' }[msg.content_type] + '文件'
      "
    >
      <el-icon @click="getDirectUrl(msg.id, true)">
        <i class="fal fa-file-alt" />
      </el-icon>
      <span @click="getDirectUrl(msg.id, true)">
        {{
          formatName(
            msg.file ? msg.file.name : { 4: '音频' }[msg.content_type] + '文件'
          )
        }}
      </span>
      <small>{{ msg.file ? formatSize(msg.file.size) : '' }}</small>
      <small
        v-if="[4].includes(msg.content_type)"
        @click="
          getDirectUrl(msg.id, false);
          playAudio = true;
        "
      >
        播放
      </small>
    </el-button>
  </div>
  <div v-if="playAudio">
    <el-card class="music-preview-card">
      <div class="music-preview">
        <div class="fileInfo">
          <span class="fileName">
            {{ msg.file.name }}
          </span>
          <br />
          <span class="fileSize">
            {{ msg.file ? formatSize(msg.file.size) : '' }}
          </span>
        </div>
        <audio :src="directUrls[msg.id]" class="player" controls />
      </div>
    </el-card>
  </div>
</template>

<script>
import { Picture as IconPicture } from '@element-plus/icons-vue';
export default {
  name: 'MsgItem',
  props: {
    msg: {
      type: Object,
      default() {
        return {};
      },
    },
    getDirectUrl: {
      type: Function,
      default() {
        return () => {};
      },
    },
    directUrls: {
      type: Object,
      default: '',
    },
  },
  components: {
    IconPicture,
  },
  data() {
    return {
      playAudio: false,
    };
  },
  methods: {
    parseUrl(content) {
      const reg =
        /(http:\/\/|https:\/\/)?([A-Z|a-z|0-9|\-|\.]+)([.])([A-Z|a-z|0-9|\-]+)([\/]?)([A-Z|a-z|0-9|\/|=|\?|\&|\-|%]+)/g;
      return content.replace(reg, match => {
        if (match.slice(0, 4) !== 'http') {
          return `<a class="el-link el-link--primary el-link-message-content" target="_blank" href="http://${match}"><span class="el-link__inner">${match}</span></a>`;
        }
        return `<a class="el-link el-link--primary el-link-message-content" target="_blank" href="${match}"><span class="el-link__inner">${match}</span></a>`;
      });
    },
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

<style lang="scss" scoped>
.msg-content-file {
  small {
    margin-left: 3px;
  }
}

.music-preview {
  .player {
    margin-bottom: -25px;
    /* height: 20px; */
    width: 100%;
    min-width: 250px;
    max-width: 1000px;
  }
  audio::-webkit-media-controls-enclosure {
    border-radius: 5px !important;
    background-color: rgba(255, 255, 255, 0);
  }
  audio::-moz-media-controls-enclosure {
    border-radius: 5px !important;
    background-color: rgba(255, 255, 255, 0);
  }
  .fileName {
    display: inline-block;
    font-size: 16px;
    margin-left: 20px;
    overflow: hidden;
    width: 90% !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fileSize {
    margin-left: 20px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>

<style lang="scss">
.music-preview-card {
  .el-card__body {
    padding: 20px 5px !important;
  }
}

.el-link-message-content {
  display: unset;
  font-size: unset;
  vertical-align: unset;
}
</style>
