import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import sanitizeHtml from "sanitize-html";

const sanitizeData = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "audio",
        "video",
        "del",
        "math",
        "semantics",
        "mrow",
        "annotation",
        "blockquote",
        "br",
        "hr",
    ]),
    allowedIframeHostnames: ["player.bilibili.com"],
    allowedAttributes: {
        a: ["href", "name", "target"],
        img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
        audio: ["src", "controls"],
        video: ["src", "controls"],
        "*": ["style", "title"],
    },
    allowedStyles: {
        "*": {
            width: [/^\d+(?:px|em|rem|%)$/],
            height: [/^\d+(?:px|em|rem|%)$/],
            color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d)\s*,\s*(\d)\s*,\s*(\d)\s*\)$/,
            ],
            "text-align": [/^left$/, /^right$/, /^center$/],
            "font-size": [/^\d+(?:px|em|rem|%)$/],
        },
    },
    disallowedTagsMode: "escape",
    enforceHtmlBoundary: true,
};

const cleanMd = text => sanitizeHtml(text, sanitizeData);

const extMd = (text, writing = false) => {
    const nameMap = { BILIBILI: "哔哩哔哩视频", AUDIO: "音频", VIDEO: "视频" };
    if (writing) {
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            match => {
                console.log(match);
                return `${match}&emsp;<small style="color: rgb(200, 200, 200)">为减小服务器压力，编辑时音乐不会渲染</small>`;
            }
        );
        text = text.replace(
            /!!!(AUDIO|VIDEO|BILIBILI):(.*?)!!!/g,
            (match, p1, p2) => {
                console.log(typeof p1, nameMap, nameMap.p1);
                return `${match}&emsp;<small style="color: rgb(200, 200, 200)">为减小服务器压力，编辑时${nameMap[p1]}不会渲染</small>`;
            }
        );
    } else {
        text = text.replace(/!!!AUDIO:(.*?)!!!/g, (match, p1) => {
            return `<audio src="${p1}" controls="controls" style="width: 100%;"></audio>`;
        });
        text = text.replace(/!!!VIDEO:(.*?)!!!/g, (match, p1) => {
            return `<video src="${p1}" controls="controls" style="width: 100%;"></video>`;
        });
        text = text.replace(/!!!BILIBILI:(.*?)!!!/g, (match, p1) => {
            if (p1.split("-") === 1) {
                p1 = `${p1}-1`;
            }
            p1 = p1.split("-");
            return `<iframe src="//player.bilibili.com/player.html?bvid=${p1[0]}&page=${p1[1]}&high_quality=1" allowfullscreen="allowfullscreen" style="width: 100%; height: 16rem" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>`;
        });
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            (match, p1, p2, p3) => {
                return `<audio controls="controls" src="/api/utils/get_music_url?site=${p1}&by=${p2}&value=${p3}"></audio>`;
            }
        );
    }
    return text;
};

const processMd = (text, writing = false) => {
    text = cleanMd(text);
    text = extMd(text, writing);
    return text;
};

// 导出
export { processMd, MdEditor };
