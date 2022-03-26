// 基础组件和样式配置
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
VMdEditor.use(vuepressTheme, {
    Prism,
});
VMdPreview.use(vuepressTheme, {
    Prism,
});
VMdEditor.xss.extend({
    whiteList: {
        source: ["iframe"],
    },
});
VMdPreview.xss.extend({
    whiteList: {
        source: ["iframe"],
    },
});

// emoji插件
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
VMdEditor.use(createEmojiPlugin());
VMdPreview.use(createEmojiPlugin());

// KaTeX插件
import "@/assets/katex/katex.min.js";
import "@/assets/katex/katex.min.css";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
VMdEditor.use(createKatexPlugin());
VMdPreview.use(createKatexPlugin());

// 快捷复制代码插件
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
VMdEditor.use(createCopyCodePlugin());
VMdPreview.use(createCopyCodePlugin());

// 内容定位插件
import createAlignPlugin from "@kangc/v-md-editor/lib/plugins/align";
VMdEditor.use(createAlignPlugin());
VMdPreview.use(createAlignPlugin());

// 更多语法糖适配
const processMarkdown = (text, writing = false) => {
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
    // 网易云和QQ音乐
    if (writing) {
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            (match, p1, p2, p3) => {
                return `!!!MUSIC-${p1}-${p2}:${p3}!!!&emsp;<small style="color: rgb(200, 200, 200)">为减小服务器压力，编辑时音乐不会渲染</small>`;
            }
        );
    } else {
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            (match, p1, p2, p3) => {
                return `<audio controls="controls" src="/api/utils/get_music_url?site=${p1}&by=${p2}&value=${p3}"></audio>`;
            }
        );
    }
    return text;
};

// 导出
export { VMdEditor, VMdPreview, processMarkdown };
