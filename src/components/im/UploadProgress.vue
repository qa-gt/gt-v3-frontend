<template>53251523</template>

<script>
export default {
  name: 'UploadProgress',
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
  data() {
    return {};
  },
  methods: {},
};
</script>
