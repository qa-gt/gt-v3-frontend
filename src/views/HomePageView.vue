<template>
    <div class="title">
        <img
            src="https://lynwancdn.yixiangzhilv.com/images/bg1.gif"
            alt="bgGif"
        />
        <p id="wzhlyn">QA瓜田</p>
    </div>
    <transition
        v-on:before-enter="commentAnimation1"
        v-on:enter="commentAnimation2"
        v-on:leave="commentAnimation3"
        v-show="abc"
        style="position: absolute; overflow: hidden"
    >
        <div style="display: box; width: 98%; text-align: center">
            <h1></h1>
        </div>
    </transition>
</template>

<script>
import Velocity from "velocity-animate";

export default {
    mounted() {
        setTimeout(() => {
            this.abc = 1;
        }, 500);
    },
    data() {
        return { abc: 0 };
    },
    methods: {
        commentAnimation1(el) {
            document.body.style.overflow = "hidden";
            el.style.opacity = 0;
            el.style.top = "100%";
        },
        commentAnimation2(el, done) {
            Velocity(
                el,
                { opacity: 1, top: ["40%", [120, 17]] },
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
    filter: blur(5px);
    width: 110%;
    height: 100%;
    object-fit: fill;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11 !important;
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
</style>
