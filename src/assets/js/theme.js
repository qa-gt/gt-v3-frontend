import themes from "./theme-var.js";
const colorMix = (color1, color2, weight) => {
    weight = Math.max(Math.min(Number(weight), 1), 0);
    let r1 = parseInt(color1.substring(1, 3), 16);
    let g1 = parseInt(color1.substring(3, 5), 16);
    let b1 = parseInt(color1.substring(5, 7), 16);
    let r2 = parseInt(color2.substring(1, 3), 16);
    let g2 = parseInt(color2.substring(3, 5), 16);
    let b2 = parseInt(color2.substring(5, 7), 16);
    let r = Math.round(r1 * (1 - weight) + r2 * weight);
    let g = Math.round(g1 * (1 - weight) + g2 * weight);
    let b = Math.round(b1 * (1 - weight) + b2 * weight);
    r = ("0" + (r || 0).toString(16)).slice(-2);
    g = ("0" + (g || 0).toString(16)).slice(-2);
    b = ("0" + (b || 0).toString(16)).slice(-2);
    return "#" + r + g + b;
};
const changeTheme = () => {
    let type = "darkTheme";
    const colorObj = themes[type];

    // 获取基本色色阶
    // colorMix是一个函数
    for (let i = 1; i < 10; i += 1) {
        colorObj[`--el-color-primary-light-${10 - i}`] = colorMix(
            colorObj["--el-color-white"],
            colorObj["--el-color-primary"],
            i * 0.1
        );
    }

    // 设置css 变量
    Object.keys(colorObj).map((item) => {
        document.documentElement.style.setProperty(item, colorObj[item]);
    });
}

export default changeTheme;