<template>
    <md-editor
        v-model="content"
        katexJs="https://cdn.staticfile.org/KaTeX/0.15.1/katex.min.js"
        katexCss="https://cdn.staticfile.org/KaTeX/0.15.1/katex.min.css"
        highlightJs="https://cdn.staticfile.org/highlight.js/11.2.0/highlight.min.js"
        highlightCss="https://cdn.staticfile.org/highlight.js/10.0.0/styles/atom-one-dark.min.css"
        prettierCDN="https://cdn.staticfile.org/prettier/2.0.3/standalone.min.js"
        prettierMDCDN="https://cdn.staticfile.org/prettier/2.0.3/parser-markdown.min.js"
        cropperCss="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.css"
        cropperJs="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.js"
        screenfullJs="https://cdn.staticfile.org/screenfull.js/5.1.0/screenfull.min.js"
        :toolbars="
            isMobile
                ? [
                      'link',
                      'image',
                      '-',
                      'save',
                      '-',
                      'pageFullscreen',
                      'preview',
                  ]
                : [
                      'revoke',
                      'next',
                      '-',
                      'bold',
                      'underline',
                      'strikeThrough',
                      'quote',
                      '-',
                      'link',
                      'image',
                      'table',
                      '-',
                      'save',
                      '-',
                      'pageFullscreen',
                      'preview',
                  ]
        "
        :preview="previewOnly || !isMobile"
        :previewOnly="previewOnly"
        noMermaid
        :historyLength="20"
        showCodeRowNumber
        :sanitize="processMarkdown"
        previewTheme="vuepress"
        :onSave="onSave"
        :onUploadImg="onUploadImg"
    />
</template>

<script>
import { processMd, MdEditor } from "@/plugins/markdown";

export default {
    name: "gtMdEditor",
    props: {
        contentValue: String,
        previewOnly: {
            type: Boolean,
            default() {
                return false;
            },
        },
        onSave: {
            type: Function,
            default() {
                return () => {};
            },
        },
        onUploadImg: {
            type: Function,
            default() {
                return () => {};
            },
        },
    },
    computed: {
        content: {
            get() {
                return this.contentValue;
            },
            set(value) {
                this.$emit("update:contentValue", value);
            },
        },
        isMobile() {
            return this.$root.isMobile;
        },
    },
    components: {
        MdEditor,
    },
    data() {
        return {};
    },
    methods: {
        processMarkdown(content) {
            return processMd(content, !this.previewOnly);
        },
    },
};
</script>
