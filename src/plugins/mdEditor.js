import "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js";

import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
VMdEditor.use(vuepressTheme, {
    Prism,
});
VMdEditor.use(createKatexPlugin());
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createCopyCodePlugin());
export default VMdEditor;
