<template>
    <el-row justify="space-evenly" style="margin-top: 50px; padding: 0 25px">
        <el-col
            :xs="24"
            :sm="18"
            :md="6"
            :lg="5"
            :xl="4"
            style="margin-bottom: 20px"
        >
            <gt-user :user="user" :own="false"></gt-user>
        </el-col>

        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <el-row justify="left">
                <el-card
                    shadow="hover"
                    class="content-card"
                    style="padding: -10px"
                >
                    <el-tabs
                        v-model="cate"
                        class="demo-tabs hidden-sm-and-down"
                        @tab-click="changeCate"
                        style="padding: -10px"
                    >
                        <el-tab-pane
                            v-for="item in options"
                            :key="item.value"
                            v-bind:label="item.label"
                            v-bind:name="item.value"
                        ></el-tab-pane>
                    </el-tabs>
                    <el-select
                        v-model="cate"
                        class="m-2 hidden-md-and-up"
                        placeholder="选择一项"
                        style="width: 100%; margin-bottom: 5px"
                        @change="changeCate"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    <div class="mt-4">
                        <el-input
                            v-model="searchInput"
                            placeholder="想找什么？"
                            class="input-with-select"
                            @keydown.enter.self.stop="doSearch"
                            clearable
                            @clear="doSearch"
                        >
                            <template #append>
                                <el-button type="primary" @click="doSearch">
                                    <el-icon style="vertical-align: middle">
                                        <search />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-input>
                    </div>
                </el-card>
            </el-row>
            <el-empty description="Empty" v-show="empty">
                <!-- <el-button plain @click="refresh">
                    &emsp;刷&ensp;新&emsp;
                </el-button> -->
            </el-empty>
            <div v-if="cate === '0'">
                <el-card
                    shadow="hover"
                    class="content-card"
                    v-for="item in myAtcs"
                    :key="item"
                >
                    <template #header>
                        <div class="content-card-header">
                            <el-button
                                type="text"
                                style="
                                    color: black;
                                    font-width: 2500px;
                                    font-size: 18px;
                                    font-weight: bold;
                                "
                                @click="$router.push(`/article/${item.id}`)"
                            >
                                {{ item.title }}
                            </el-button>
                            <!-- <el-button class="button" type="text">
                            预览
                        </el-button> -->
                        </div>
                    </template>
                    <div class="article-preview">
                        {{ item.author.username }} &emsp; 更新于{{
                            $moment(item.update_time).fromNow()
                        }}
                        &emsp;
                        {{ item.read_count }}阅读
                    </div>
                </el-card>
            </div>
            <div v-if="cate === '1'">
                <el-card
                    shadow="hover"
                    class="content-card"
                    v-for="item in myClts"
                    :key="item"
                >
                    <template #header>
                        <div class="content-card-header">
                            <el-button
                                type="text"
                                style="
                                    color: black;
                                    font-width: 2500px;
                                    font-size: 18px;
                                "
                                @click="route_to_article(id)"
                            >
                                {{ item.title }}
                            </el-button>
                            <el-button class="button" type="text"
                                >取消收藏</el-button
                            >
                        </div>
                    </template>
                    <el-button
                        type="text"
                        style="
                            color: black;
                            font-width: 2500px;
                            font-size: 13px;
                        "
                        @click="route_to_article()"
                    >
                        <div class="text item">
                            {{ item.info }}
                        </div>
                    </el-button>
                </el-card>
            </div>
            <div v-if="cate === '2'">
                <el-card
                    shadow="hover"
                    class="content-card"
                    v-for="item in myFollowing"
                    :key="item"
                >
                    <div class="content-card-header">
                        <el-button
                            type="text"
                            style="
                                color: black;
                                font-width: 2500px;
                                font-size: 18px;
                            "
                            @click="$router.push(`/user/${item.id}`)"
                        >
                            <el-avatar :src="item.portrait" />
                            &emsp;
                            {{ item.username }}
                        </el-button>
                        <el-button class="button" type="text">
                            取消关注
                        </el-button>
                    </div>
                </el-card>
            </div>
            <div v-if="cate === '3'">
                <el-card
                    shadow="hover"
                    class="content-card"
                    v-for="item in myFollower"
                    :key="item"
                >
                    <div class="content-card-header">
                        <el-button
                            type="text"
                            style="
                                color: black;
                                font-width: 2500px;
                                font-size: 18px;
                            "
                            @click="$router.push(`/user/${item.id}`)"
                        >
                            <el-avatar :src="item.portrait"> </el-avatar>&ensp;

                            {{ item.username }}
                        </el-button>
                        <el-button class="button" type="text">
                            互相关注
                        </el-button>
                    </div>
                </el-card>
            </div>
            <el-pagination
                background
                layout="prev, pager, next, jumper, ->, total"
                v-model:current-page="pageInfo.num"
                :total="pageInfo.total"
                :page-size="pageInfo.size"
                :pager-count="7"
                :hide-on-single-page="true"
                @current-change="getAtcs"
                class="hidden-sm-and-down"
            />
            <el-pagination
                layout="prev, pager, next"
                v-model="pageInfo.num"
                :total="pageInfo.total"
                :page-size="pageInfo.size"
                :pager-count="5"
                :hide-on-single-page="true"
                @current-change="getAtcs"
                class="hidden-md-and-up"
            />
        </el-col>
    </el-row>
    <el-backtop />
</template>

<style lang="scss" scoped>
@import url("@/assets/scss/style.scss");
@import url("@/assets/scss/Index.scss");
</style>

<script>
import { mapState } from "vuex";
import { ElLoading } from "element-plus";

import gtUser from "@/components/gtUser.vue";

export default {
    computed: {
        ...mapState(["theme"]),
    },
    data() {
        return {
            user: {},
            empty: true,
            searchInput: "",
            searchText: "",
            cate: "0",
            pageInfo: { total: 0, num: 1, size: 20 },
            options: [
                {
                    value: "0",
                    label: "我的贴子",
                },
                {
                    value: "1",
                    label: "我的收藏",
                },
                {
                    value: "2",
                    label: "我关注的",
                },
                {
                    value: "3",
                    label: "我的粉丝",
                },
            ],
            myAtcs: [],
            myClts: [],
            myFollowing: [],
            myFollower: [],
        };
    },
    components: {
        gtUser,
    },
    methods: {
        getFunc() {
            switch (this.cate) {
                case "0":
                    return this.getMyAtcs;
                case "1":
                    return this.getMyClts;
                case "2":
                    return this.getMyFollowing;
                case "3":
                    return this.getMyFollower;
            }
        },
        changeCate() {
            console.log(this.cate);
            this.searchText = this.searchInput = "";
            this.getFunc()();
            this.pageInfo.num = 1;
        },
        doSearch() {
            if (this.searchText === this.searchInput) return;
            this.searchText = encodeURIComponent(this.searchInput);
            this.getFunc()();
            this.pageInfo.num = 1;
        },
        getMyAtcs() {
            const loading = ElLoading.service({ fullscreen: true });
            this.$axios
                .get("/article/", {
                    author: this.$route.params.id,
                    min_state: -2, 
                    page: this.pageInfo.num,
                    search: this.searchText
                })
                .then(data => {
                    this.pageInfo.total = data.count;
                    this.myAtcs = data.results;
                    this.empty = this.myAtcs.length === 0;
                })
                .catch(err => err)
                .then(() => setTimeout(loading.close, 100));
        },
        getMyClts() {
            const loading = ElLoading.service({ fullscreen: true });
            this.$axios
                .get("/collect/", {
                    user: this.$route.params.id,
                    page: this.pageInfo.num,
                    search: this.searchText
                })
                .then(data => {
                    this.pageInfo.total = data.count;
                    data = data.results;
                    data.map(e => e.article);
                    this.myClts = data;
                    this.empty = this.myClts.length === 0;
                })
                .catch(err => err)
                .then(() => setTimeout(loading.close, 100));
        },
        getMyFollowing() {
            const loading = ElLoading.service({ fullscreen: true });
            this.$axios
                .get("/follow/", {
                    follower: this.$route.params.id,
                    page: this.pageInfo.num,
                    search: this.searchText
                })
                .then(data => {
                    this.pageInfo.total = data.count;
                    data = data.results;
                    data.map(e => e.following);
                    this.myFollowing = data;
                    this.empty = this.myFollowing.length === 0;
                })
                .catch(err => err)
                .then(() => setTimeout(loading.close, 100));
        },
        getMyFollower() {
            const loading = ElLoading.service({ fullscreen: true });
            this.$axios
                .get("/follow/", {
                    following: this.$route.params.id,
                    page: this.pageInfo.num,
                    search: this.searchText
                })
                .then(data => {
                    this.pageInfo.total = data.count;
                    data = data.results;
                    data.map(e => e.follower);
                    this.myFollower = data;
                    this.empty = this.myFollower.length === 0;
                })
                .catch(err => err)
                .then(() => setTimeout(loading.close, 100));
        },
    },
    watch: {
        $route() {
            this.$axios.get(`/user/${this.$route.params.id}/`).then(res => {
                this.user = res;
            });
            this.getFunc()();
        },
    },
    mounted() {
        this.$axios.get(`/user/${this.$route.params.id}/`).then(res => {
            this.user = res;
        });
        this.getMyAtcs();
    },
    name: "UserInfoView",
};
</script>
