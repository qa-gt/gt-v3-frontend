<template>
    <transition
        v-on:before-enter="commentAnimation1"
        v-on:enter="commentAnimation2"
        v-on:leave="commentAnimation3"
        v-show="abc"
        style="position: absolute"
    >
        <div>
            <h1>QA瓜田</h1>
        </div>
    </transition>
</template>

<script>
import gsap from "gsap";
import Velocity from "velocity-animate";

export default {
    mounted() {
        setTimeout(() => {
            console.log(124);
            this.abc = 1;
        }, 500);
    },
    data() {
        return { abc: 0 };
    },
    methods: {
        // enter() {
        //     gsap.to("#card", {
        //         duration: 2,
        //         y: 500,
        //         // opacity: 1,
        //         // ease: "power1.Out(1.7)",
        //     });
        // },
        commentAnimation1(el) {
            el.style.opacity = 0;
            el.style.top = 0;
        },
        commentAnimation2(el, done) {
            Velocity(el, { opacity: 1, top: 500 }, { duration: 1300 });
            done();
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

<style>
#app {
    text-align: center;
}
</style>
