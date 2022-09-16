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
  },
  components: {
    IconPicture,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
