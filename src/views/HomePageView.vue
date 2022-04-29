<template id="app">
    <div class="title">
        <img src="https://api.dujin.org/bing/1920.php" />

        <transition
            v-on:before-enter="commentAnimation1"
            v-on:enter="commentAnimation2"
            v-on:leave="commentAnimation3"
            v-show="title"
            style="position: absolute; overflow: hidden"
        >
            <p id="wzhlyn">QA瓜田</p>
        </transition>

        <!--  -->
    </div>
    <div>
        <transition
            v-on:before-enter="buttonAnimation1"
            v-on:enter="buttonAnimation4"
            v-on:leave="buttonAnimation3"
            v-show="button1"
            style="position: absolute; overflow: hidden; margin-right: 90px"
        >
            <el-button
                @click="changeShowParticles()"
                style="z-index: 10019; float: left"
            >
                <div v-show="showParticles">关闭粒子特效</div>
                <div v-show="!showParticles">打开粒子特效</div>
            </el-button>
        </transition>
    </div>
    <div>
        <particles
            style="z-index: 15 !important"
            :show="showParticles"
        ></particles>
    </div>
    <div style="margin-left: 20%">
        <transition
            v-on:before-enter="buttonAnimation1"
            v-on:enter="buttonAnimation2"
            v-on:leave="buttonAnimation3"
            v-show="button1"
            style="position: absolute; overflow: hidden; margin-right: 90px"
        >
            <el-button
                style="z-index: 10002"
                @click="$router.push({ name: 'index' })"
            >
                论坛本坛
            </el-button>
        </transition>
    </div>
    <div style="margin-left: 40%">
        <transition
            v-on:before-enter="buttonAnimation1"
            v-on:enter="buttonAnimation2"
            v-on:leave="buttonAnimation3"
            v-show="button2"
            style="position: absolute; overflow: hidden"
        >
            <el-button
                style="z-index: 10003"
                @click="$router.push({ name: 'datareports' })"
            >
                数据报表
            </el-button>
        </transition>
    </div>
    <div style="margin-left: 60%">
        <transition
            v-on:before-enter="buttonAnimation1"
            v-on:enter="buttonAnimation2"
            v-on:leave="buttonAnimation3"
            v-show="button3"
            style="position: absolute; overflow: hidden"
        >
            <el-button
                style="z-index: 10004"
                @click="$router.push({ name: 'calendar' })"
            >
                QA校历
            </el-button>
        </transition>
    </div>
    <div style="margin-left: 80%">
        <transition
            v-on:before-enter="buttonAnimation1"
            v-on:enter="buttonAnimation2"
            v-on:leave="buttonAnimation3"
            v-show="button4"
            style="position: absolute; overflow: hidden"
        >
            <el-button
                style="z-index: 10005"
                @click="$router.push({ name: 'about' })"
            >
                关于我们
            </el-button>
        </transition>
    </div>
</template>

<script>
import Velocity from "velocity-animate";
import Particles from "@/components/Particles.vue";
import { mapState } from "vuex";
//////////////////////////////

// <!--引入粒子特效的相关配置-->
const options = {
    background: {
        color: {
            value: "#b8e5ff", //背景颜色
        },
    },
    fpsLimit: 30,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push", //可用的click模式有: "push", "remove", "repulse", "bubble"。
            },
            onHover: {
                enable: true,
                mode: "grab", //可用的hover模式有: "grab", "repulse", "bubble"。
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff", //'#dedede'。线条颜色。
            distance: 150, //线条长度
            enable: true, //是否有线条
            opacity: 0.5, //线条透明度。
            width: 1, //线条宽度。
        },
        collisions: {
            enable: false,
        },
        move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 4, //粒子运动速度。
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 60, //粒子数量。
        },
        opacity: {
            value: 0.5, //粒子透明度。
        },
        shape: {
            type: "circle", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
};

/////////////////////////////

export default {
    created() {
        console.log(this.$route.path);
    },
    computed: {
        ...mapState(["showParticles"]),
    },
    components: {
        particles: Particles,
    },
    mounted() {
        setTimeout(() => {
            this.title = 1;
        }, 500);
        setTimeout(() => {
            this.button1 = 1;
        }, 700);
        setTimeout(() => {
            this.button2 = 1;
        }, 900);
        setTimeout(() => {
            this.button3 = 1;
        }, 1100);
        setTimeout(() => {
            this.button4 = 1;
        }, 1300);
        setTimeout(() => {
            this.button5 = 1;
        }, 1500);
    },
    data() {
        return {
            title: 0,
            button1: 0,
            button2: 0,
            button3: 0,
            button4: 0,
            button5: 0,
            options: options,
        };
    },
    methods: {
        changeShowParticles() {
            this.$store.commit("changeShowParticles");
            if (this.showParticles === true) {
                location.reload();
            }
        },
        commentAnimation1(el) {
            document.body.style.overflow = "hidden";
            el.style.opacity = 0;
            el.style.top = "100%";
        },
        commentAnimation2(el, done) {
            Velocity(
                el,
                { opacity: 1, top: ["30%", [120, 17]] },
                {
                    duration: 1300,
                    complete: () => {
                        document.body.style.overflow = "auto";
                        done();
                    },
                }
            );
        },
        commentAnimation3(el, done) {
            Velocity(
                el,
                { opacity: 0, y: -1000 },
                { duration: 300, complete: done }
            );
        },
        buttonAnimation1(el) {
            document.body.style.overflow = "hidden";
            el.style.opacity = 0;
            el.style.top = "100%";
        },
        buttonAnimation2(el, done) {
            Velocity(
                el,
                { opacity: 1, top: ["60%", [160, 17]] },
                {
                    duration: 1300,
                    complete: () => {
                        document.body.style.overflow = "auto";
                        done();
                    },
                }
            );
        },
        buttonAnimation4(el, done) {
            Velocity(
                el,
                { opacity: 1, top: ["95%", [120, 10]] },
                {
                    duration: 1300,
                    complete: () => {
                        document.body.style.overflow = "auto";
                        done();
                    },
                }
            );
        },
        buttonAnimation3(el, done) {
            Velocity(
                el,
                { opacity: 0, y: -1000 },
                { duration: 300, complete: done }
            );
        },
    },
};
</script>

<style scoped>
#app {
    text-align: center;
}
.title {
    height: 100%;
    overflow: hidden;
}

.title img {
    display: block;
    /* filter: blur(5px); */
    width: 110%;
    height: 100%;
    object-fit: fill;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11 !important;
    opacity: 1;
}

.title p {
    margin-left: -25px !important;
    display: inline-block;
    height: auto;
    width: 100% !important;
    /* background-color: rgba(0, 0, 0, 0.2); */
    padding: 20px 0;
    color: white;
    font-size: 50px;
    font-weight: bold;
    text-shadow: 0 0 10px black;
    text-align: center;
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    z-index: 10001;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
}

#main {
    background: url("@/assets/img/main.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
</style>
