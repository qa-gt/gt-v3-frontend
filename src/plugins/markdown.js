import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import sanitizeHtml from "sanitize-html";

const katexTag = [
    "math",
    "semantics",
    "mrow",
    "annotation",
    "blockquote",
    "mn",
    "mi",
    "mo",
    "mtext",
    "mspace",
    "ms",
    "mfrac",
    "mroot",
    "msqrt",
    "mstyle",
    "mtable",
    "mtr",
    "mtd",
    "msub",
    "msup",
    "span",
    "mover",
    "munder",
    "munderover",
    "munderm",
    "mrow",
    "columnspacing",
    "rowspacing",
    "columnalign",
    "rowalign",
    "columnwidth",
    "rowlines",
    "columnlines",
    "mpadded",
];
const katexAttr = [
    "xmlns",
    "encoding",
    "class",
    "data-*",
    "aria-*",
    "style",
    "fence",
    "accent",
    "scriptlevel",
    "mathcolor",
    "mathbackground",
    "mathsize",
    "width",
    "height",
    "depth",
    "lspace",
    "voffset",
    "hoffset",
    "mathvariant",
    "displaystyle",
    "scriptsizemultiplier",
    "scriptminsize",
    "infixlinebreakstyle",
    "linebreakmultchar",
    "lineleading",
    "linebreakstyle",
    "indentalign",
    "indentshift",
    "indenttarget",
    "indentalignfirst",
    "indentshiftfirst",
    "indentalignlast",
    "indentshiftlast",
    "eolhstyle",
    "stretchy",
];
const cssSize = [/^[-+]?[0-9]*\.?[0-9]+(?:px|em|rem|%)$/];

let sanitizeData = {
    allowedTags: sanitizeHtml.defaults.allowedTags
        .concat(["img", "audio", "video", "del", "br", "hr", "svg", "path"])
        .concat(katexTag),
    allowedIframeHostnames: ["player.bilibili.com"],
    allowedAttributes: {
        a: ["href", "name", "target"],
        img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
        audio: ["src", "controls"],
        video: ["src", "controls"],
        svg: ["*"],
        path: ["*"],
    },
    allowedStyles: {
        "*": {
            width: cssSize,
            height: cssSize,
            "max-width": cssSize,
            "max-height": cssSize,
            "min-width": cssSize,
            "min-height": cssSize,
            color: [
                /^#(0x)?[0-9a-f]+$/i,
                /^rgb\(\s*(\d)\s*,\s*(\d)\s*,\s*(\d)\s*\)$/,
            ],
            margin: cssSize,
            "margin-top": cssSize,
            "margin-bottom": cssSize,
            "margin-left": cssSize,
            "margin-right": cssSize,
            top: cssSize,
            bottom: cssSize,
            left: cssSize,
            right: cssSize,
            "vertical-align": cssSize,
            "border-width": cssSize,
            "border-top-width": cssSize,
            "border-bottom-width": cssSize,
            "text-align": [/^left$/, /^right$/, /^center$/],
            "font-size": [/^\d+(?:px|em|rem|%)$/],
            "font-weight": [
                /^\d+$/,
                /^bold$/,
                /^normal$/,
                /^bolder$/,
                /^lighter$/,
            ],
        },
    },
    disallowedTagsMode: "escape",
    enforceHtmlBoundary: true,
};
for (let tag of katexTag) {
    sanitizeData.allowedAttributes[tag] = katexAttr;
    // sanitizeData.allowedAttributes[tag] = ["*"];
}

const cleanMd = text => sanitizeHtml(text, sanitizeData);
const emojis = [
        "666",
        "emm",
        "NO",
        "OK",
        "乒乓",
        "亲亲",
        "便便",
        "偷笑",
        "傲慢",
        "再见",
        "冷汗",
        "凋谢",
        "刀",
        "加油",
        "加油加油",
        "勾引",
        "发",
        "发呆",
        "发怒",
        "发抖",
        "可怜",
        "可爱",
        "右哼哼",
        "右太极",
        "叹气",
        "吃瓜",
        "合十",
        "吐",
        "吐舌",
        "吓",
        "呲牙",
        "咒骂",
        "咖啡",
        "哇",
        "哈欠",
        "啤酒",
        "嘘",
        "嘿哈",
        "回头",
        "困",
        "坏笑",
        "大哭",
        "天啊",
        "太阳",
        "失望",
        "奋斗",
        "奸笑",
        "好的",
        "委屈",
        "害羞",
        "尴尬",
        "左哼哼",
        "左太极",
        "差劲",
        "庆祝",
        "强壮",
        "得意",
        "微笑",
        "心碎",
        "快哭了",
        "怄火",
        "恐惧",
        "悠闲",
        "惊恐",
        "惊讶",
        "感冒",
        "憨笑",
        "打脸",
        "抓狂",
        "折磨",
        "抠鼻",
        "抱拳",
        "拥抱",
        "拳头",
        "挥手",
        "捂脸",
        "握手",
        "撇嘴",
        "擦汗",
        "敲打",
        "无语",
        "旺柴",
        "晕",
        "月亮",
        "机智",
        "汗",
        "流汗",
        "流泪",
        "激动",
        "炸弹",
        "爱你",
        "爱心",
        "爱情",
        "猪头",
        "献吻",
        "玫瑰",
        "瓢虫",
        "疑问",
        "白眼",
        "皱眉",
        "睡",
        "破涕为笑",
        "磕头",
        "示爱",
        "礼物",
        "社会社会",
        "福",
        "笑脸",
        "篮球",
        "糗大了",
        "红包",
        "翻白眼",
        "耶",
        "胜利",
        "脸红",
        "色",
        "苦涩",
        "菜刀",
        "街舞",
        "衰",
        "裂开",
        "西瓜",
        "让我看看",
        "调皮",
        "赞",
        "足球",
        "跳跳",
        "踩",
        "转圈",
        "鄙视",
        "酷",
        "闪电",
        "闭嘴",
        "阴险",
        "难过",
        "飞吻",
        "饥饿",
        "饭",
        "骷髅",
        "鬼魂",
        "鼓掌",
    ],
    nameMap = { BILIBILI: "哔哩哔哩视频", AUDIO: "音频", VIDEO: "视频" };

const extMd = (text, writing = false) => {
    for (let i = 0; i < emojis.length; i++) {
        const emoji = emojis[i],
            reg = new RegExp(`\\[${emoji}\\]`, "g");
        text = text.replaceAll(
            reg,
            `<img class="emoji" src="/emojis/${emoji}.png" alt="${emoji}" title="${emoji}" />`
        );
    }
    if (writing) {
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            match => {
                return `${match}&emsp;<small style="color: rgb(200, 200, 200)">为减小服务器压力，编辑时音乐不会渲染</small>`;
            }
        );
        text = text.replace(
            /!!!(AUDIO|VIDEO|BILIBILI):(.*?)!!!/g,
            (match, p1, p2) => {
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
            const bvid = p1[0],
                page = p1[1] || "";
            return `<iframe src="//player.bilibili.com/player.html?bvid=${bvid}&page=${page}&high_quality=1" allowfullscreen="allowfullscreen" style="width: 100%; height: 25rem" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>`;
        });
        text = text.replaceAll(
            /!!!MUSIC-(WYY|QQ)-(ID|NAME):(.*?)!!!/g,
            (match, p1, p2, p3) => {
            return `<audio controls="controls" src="https://gtapi.yxzl.top/utils/get_music_url?site=${p1}&by=${p2}&value=${p3}"></audio>`;
            }
        );
    }
    text = text.replaceAll(/!!!IMAGE:(.*?)!!!/g, (match, p1) => {
        if (p1.substr(0, 4) !== "http" && p1.substr(0, 2) !== "//")
            p1 = "https://gtcdn.yxzl.top/atc_images_old/" + p1 + "/30";
        return `<img src=${p1} />`;
    });
    return text;
};

const processMd = (text, writing = false) => {
    text = cleanMd(text);
    text = extMd(text, writing);
    return text;
};

// 导出
export { processMd, MdEditor };
