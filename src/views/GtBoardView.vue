<template>
    <div
        v-for="pos in positions"
        :key="pos"
        :style="{ 'z-index': pos.z, opacity: pos.show }"
        class="pack"
        style="transition: all 0.5s"
    >
        <Vue3DraggableResizable
            :initW="250"
            :initH="140"
            v-model:x="pos.x"
            v-model:y="pos.y"
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
            @mousedown="pos.z = ++max"
        >
            <el-card class="card">
                <el-button type="text">
                    <h3 style="color: black">小测一下</h3>
                </el-button>
                <p>{{ pos.z }}, {{ max }}</p>
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
export default defineComponent({
    components: { Vue3DraggableResizable },
    data() {
        return {
            positions: [],
            h: 100,
            w: 100,
            active: false,
            max: 19,
        };
    },
    // 钩子函数
    mounted() {
        const maxWidth = document.documentElement.clientWidth * 0.8,
            maxHeight = document.documentElement.clientHeight * 0.5;
        for (let i = 0; i < 15; i++) {
            this.positions[i] = {
                x: Math.round(Math.random() * maxWidth),
                y: Math.round(Math.random() * maxHeight),
                z: i,
                show: 0,
            };
            setTimeout(() => {
                this.positions[i].show = 1;
            }, i * i * 100);
        }
    },
    methods: {
        print(val) {
            // console.log(val);
        },
    },
});
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
