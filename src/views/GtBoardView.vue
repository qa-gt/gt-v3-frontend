<template>
    <div
        v-for="card in cards"
        :key="card"
        :style="{ 'z-index': card.z, opacity: card.show }"
        class="pack"
        style="transition: all 0.5s"
    >
        <Vue3DraggableResizable
            :initW="250"
            :initH="140"
            v-model:x="card.x"
            v-model:y="card.y"
            v-model:w="w"
            v-model:h="h"
            v-model:active="active"
            :draggable="true"
            :resizable="false"
            @mousedown="card.z = ++max"
        >
            <el-card class="card">
                <el-button type="text">
                    <h3 style="color: black">小测一下</h3>
                </el-button>
                <p>{{ card.z }}, {{ max }}</p>
                <el-button type="text">
                    <p style="color: black">{{ card }}</p>
                </el-button>
            </el-card>
        </Vue3DraggableResizable>
    </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { defineComponent } from "vue";
const maxWidth = document.documentElement.clientWidth * 0.8,
    maxHeight = document.documentElement.clientHeight * 0.5;
export default defineComponent({
    components: { Vue3DraggableResizable },
    data() {
        return {
            cards: [],
            h: 100,
            w: 100,
            active: false,
            max: 0,
            t: 0,
            last_t: 0,
        };
    },
    mounted() {
        this.get_content();
    },
    methods: {
        async get_content(last_t = 0) {
            let res = await this.$axios.get("/article/random/");
            for (let i = 0; i < res; i++, this.t++) {
                setTimeout(() => {
                    this.cards[i] = this.cards[i] || {};
                    this.cards[i].show = 0;
                    setTimeout(() => {
                        this.cards[i].content = res[i];
                        this.cards[i].x = Math.round(Math.random() * maxWidth);
                        this.cards[i].y = Math.round(Math.random() * maxHeight);
                        this.cards[i].z = ++this.max;
                        this.cards[i].show = 1;
                        if (i === res.length - 1) {
                            setTimeout(
                                this.get_content,
                                0,
                                this.t * this.t * 100
                            );
                        }
                    }, 500);
                }, this.t * this.t * 100 - last_t);
            }
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
