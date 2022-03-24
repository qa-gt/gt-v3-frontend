// 基础组件和样式配置
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
VMdEditor.use(vuepressTheme, {
    Prism,
});
VMdEditor.xss.extend({
    whiteList: {
        source: ["iframe"],
        iframe: ["src", "frameborder", "allowfullscreen"],
    },
});

// emoji插件
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
VMdEditor.use(createEmojiPlugin());

// KaTeX插件
import "@/assets/katex/katex.min.js";
import "@/assets/katex/katex.min.css";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
VMdEditor.use(createKatexPlugin());

// 快捷复制代码插件
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
VMdEditor.use(createCopyCodePlugin());

// 更多语法糖适配
const processMarkdown = text => {
    // audio和video标签
    text = text.replace(/!!!AUDIO:(.*?)!!!/g, (match, p1) => {
        return `<audio src="${p1}" controls="controls" style="width: 100%;"></audio>`;
    });
    text = text.replace(/!!!VIDEO:(.*?)!!!/g, (match, p1) => {
        return `<video src="${p1}" controls="controls" style="width: 100%;"></video>`;
    });
    // 哔哩哔哩视频
    text = text.replace(/!!!BILIBILI:(.*?)!!!/g, (match, p1) => {
        if (p1.split("-") === 1) {
            p1 = `${p1}-1`;
        }
        p1 = p1.split("-");
        return `<iframe src="//player.bilibili.com/player.html?bvid=${p1[0]}&page=${p1[1]}&high_quality=1" allowfullscreen="allowfullscreen" style="width: 100%; height: 16rem" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>`;
    });
    return text;
};

// 导出
export { VMdEditor, processMarkdown };
