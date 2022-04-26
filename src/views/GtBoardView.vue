<template>
    <div v-if="!isMobile">
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
                v-model:active="active"
                :draggable="true"
                :resizable="false"
                @drag-start="card.z = ++max"
            >
                <el-card class="card">
                    <h3 style="color: black">
                        {{ card["content"]["title"] }}
                    </h3>
                    <!-- <el-button type="text"> </el-button> -->
                </el-card>
            </Vue3DraggableResizable>
        </div>
    </div>
    <div v-else>
        <div v-for="(card, index) in cards" :key="index">
            <el-row
                v-if="index % 2 === 0"
                :gutter="Math.max(cards[index].w * 5, 10)"
            >
                <el-col :span="12 + cards[index].w">
                    <el-card
                        class="card"
                        :style="{ 'z-index': card.z, opacity: card.show }"
                        style="transition: all 0.5s"
                    >
                        <h3 style="color: black">
                            {{ card["content"]["title"] }}
                        </h3>
                        <!-- <el-button type="text"> </el-button> -->
                    </el-card>
                </el-col>
                <el-col
                    :span="12 - cards[index].w"
                    v-if="index + 1 < cards.length"
                >
                    <el-card
                        class="card"
                        :style="{
                            'z-index': cards[index + 1].z,
                            opacity: cards[index + 1].show,
                        }"
                        style="transition: all 0.5s"
                    >
                        <h3 style="color: black">
                            {{ card["content"]["title"] }}
                        </h3>
                        <!-- <el-button type="text"> </el-button> -->
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
    <el-button
        style="position: absolute; bottom: 50px; right: 25px"
        @click="save"
    >
        <i class="fas fa-save" />
    </el-button>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { defineComponent } from "vue";
import { ElMessageBox } from "element-plus";
const maxWidth = document.documentElement.clientWidth * 0.8,
    maxHeight = document.documentElement.clientHeight * 0.5;
export default defineComponent({
    components: { Vue3DraggableResizable },
    computed: {
        isMobile() {
            return this.$root.isMobile;
        },
    },
    data() {
        return {
            cards: this.$store.state.cards,
            active: false,
            max: 0,
            t: 0,
            last_t: 0,
            always_random: false,
        };
    },
    mounted() {
        if (this.isMobile) {
            this.get_content();
            return;
        }
        ElMessageBox.confirm(
            "请问你希望我们什么时候随机生成位置？",
            "选择模式",
            {
                confirmButtonText: "每次",
                cancelButtonText: "仅首次",
                type: "Info",
            }
        )
            .then(() => {
                this.always_random = true;
            })
            .catch(() => {
                this.always_random = false;
            })
            .finally(() => {
                this.get_content();
            });
    },
    methods: {
        async get_content(last_t = 0) {
            let res = await this.$axios.get("/article/random/");
            for (let i = 0; i < res.length; i++, this.t++) {
                setTimeout(() => {
                    this.cards[i] = this.cards[i] || { content: {} };
                    this.cards[i].show = 0;
                    setTimeout(() => {
                        if (!this.cards[i].x || this.always_random) {
                            this.cards[i].x = Math.round(
                                Math.random() * maxWidth
                            );
                            this.cards[i].y = Math.round(
                                Math.random() * maxHeight
                            );
                            this.cards[i].z = ++this.max;
                            this.cards[i].w = parseInt(Math.random() * 10 - 5);
                        }
                        this.cards[i].content = res[i];
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
        save() {
            this.$store.commit("saveCards", this.cards);
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
