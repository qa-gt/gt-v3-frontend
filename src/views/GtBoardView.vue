<template>
    <div
        v-for="(pos, index) in positions"
        :key="pos"
        :index="index"
        :style="{
            '--posx': pos.posx + 'px',
            '--posy': pos.posy + 'px',
            '--z-index': z_index[index].z,
        }"
        class="pack gtcards"
    >
        <Vue3DraggableResizable
            :initW="250"
            :initH="140"
            v-model:x="drags[index].x"
            v-model:y="drags[index].y"
            v-model:w="w"
            v-model:h="h"
            v-model:active="active"
            :draggable="true"
            :resizable="false"
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="print('dragging')"
            @resizing="print('resizing')"
            @drag-end="print('drag-end')"
            @resize-end="print('resize-end')"
            @mousedown="
                max += 1;
                z_index[index].z = max;
            "
        >
            <el-card class="card">
                <el-button type="text">
                    <h3 style="color: black">小测一下</h3>
                </el-button>
                <p>{{ z_index[index].z }}, {{ max }}</p>
                <el-button type="text">
                    <p style="color: black">{{ pos }}</p>
                </el-button>
            </el-card>
        </Vue3DraggableResizable>
    </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
    components: { Vue3DraggableResizable },
    data() {
        return {
            screenWidth: window.screen.availWidth, // 屏幕尺寸
            screenHeight: window.screen.availHeight,
            windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
            windowHeight: document.documentElement.clientHeight,
            positions: positions,
            drags: [],
            drawTargetEle: {},
            h: 100,
            w: 100,
            active: false,
            z_index: [],
            max: 19,
        };
    },
    // 钩子函数
    mounted() {
        // console.log(window.$(".gtcards"));
        // window.$(".gtcards").each(function () {
        //     console.log(this, 123);
        //     $(this).draggable({
        //         distance: 10,
        //     });
        // });
        var i, posx, posy;
        let posx_old = 0,
            posy_old = 0;
        console.log(this.windowWidth, this.windowHeight);
        //console.log(this.screenWidth, this.screenHeight);
        for (i = 0; i < 20; i++) {
            posx = Math.round(Math.random() * (this.windowWidth - 500));
            posy = Math.round(Math.random() * (this.windowHeight - 500));
            if (posy <= 70) {
                posy += 100;
            }
            if (
                (posx - posx_old) * (posx - posx_old) +
                    (posy - posy_old) * (posy - posy_old) <
                200
            ) {
                posx += 150;
                posy += 150;
            }
            posy_old = posy;
            posx_old = posx;

            this.drags.push({ x: 100, y: 100 });
            this.positions.push({ posx: posx, posy: posy });
            this.z_index.push({ z: i });
        }
        console.log(this.positions);
        console.log(this.drags);
        // setTimeout(() => {
        //     console.log(window.$(".gtcards"));
        //     window.$(".gtcards").each(function () {
        //         window
        //             .$(this)
        //             .draggable({
        //                 distance: 0,
        //                 cancel: "",
        //             })
        //             .click(function () {
        //                 console.log(this);
        //             });
        //     });
        // }, 1000);
    },
    methods: {
        print(val) {
            console.log(val);
        },
    },
});

let positions = ref([]);
</script>

<style scoped>
.card {
    max-width: 240px;
    max-height: 170px !important;
}
.pack {
    position: absolute;
    left: var(--posx) !important;
    top: var(--posy) !important;
    z-index: var(--z-index);
}
.parent {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 100px;
    left: 100px;
    border: 1px solid #000;
    user-select: none;
}
.dragging {
    border: rgba(0, 0, 0, 0) solid 0;
}
</style>
