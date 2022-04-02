<template>
    <el-row justify="space-evenly">
        <el-col
            :xs="24"
            :sm="18"
            :md="6"
            :lg="5"
            :xl="4"
            style="margin-bottom: 20px"
        >
            <gt-user :user="user" :showFollow="false"></gt-user>
        </el-col>

        <el-col :xs="24" :sm="18" :md="17" :lg="18" :xl="19">
            <el-row justify="start">
                <el-card
                    shadow="hover"
                    class="content-card"
                    style="padding: -10px"
                >
                    <el-tabs
                        v-model="currentTopic"
                        class="demo-tabs hidden-sm-and-down"
                        @tab-click="changeTopic"
                        style="padding: -10px"
                    >
                        <el-tab-pane
                            v-for="item in topics"
                            :key="item.id"
                            :label="item.name"
                            :name="String(item.id)"
                        />
                    </el-tabs>
                    <el-select
                        v-model="currentTopic"
                        class="m-2 hidden-md-and-up"
                        placeholder="请选择展示的话题"
                        @change="changeTopic"
                        style="width: 100%; margin-bottom: 5px"
                    >
                        <el-option
                            v-for="item in topics"
                            :key="item.id"
                            :label="item.name"
                            :value="String(item.id)"
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
                                    <i class="fal fa-search" />
                                </el-button>
                            </template>
                        </el-input>
                    </div>
                </el-card>
            </el-row>
            <el-empty description="Empty" v-show="!atcs.length">
                <el-button plain @click="refresh"
                    >&emsp;刷&ensp;新&emsp;</el-button
                >
            </el-empty>
            <el-card
                shadow="hover"
                class="content-card"
                v-for="item in atcs"
                :key="item.id"
                @click="$router.push(`/article/${item.id}`)"
            >
                <template #header>
                    <div
                        class="content-card-header"
                        style="
                            font-width: 2500px;
                            font-size: 18px;
                            font-weight: bold;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis;
                        "
                    >
                        <template v-if="item.top">【置顶】</template>
                        {{ item.title }}
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
</template>

<style lang="scss" scoped>
@import url("@/assets/scss/Index.scss");
.article-preview {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>

<script>
import { mapState } from "vuex";

import { ElLoading } from "element-plus";
import gtUser from "@/components/gtUser.vue";

export default {
    computed: {
        ...mapState(["user", "theme"]),
    },
    data() {
        return {
            searchInput: "",
            searchText: "",
            topics: [{ id: -1, name: "全部" }],
            value: 0,
            atcs: [],
            pageInfo: { total: 0, num: 1, size: 20 },
            currentTopic: "-1",
        };
    },
    components: {
        gtUser,
    },
    methods: {
        changeTopic() {
            this.getAtcs();
            this.pageInfo.num = 1;
        },
        doSearch() {
            if (this.searchText === this.searchInput) return;
            this.searchText = this.searchInput;
            this.getAtcs();
            this.pageInfo.num = 1;
        },
        getAtcs() {
            let topic = this.currentTopic === "-1" ? "" : this.currentTopic;
            const loading = ElLoading.service({ fullscreen: true });
            this.$axios
                .get("/article/", {
                    params: {
                        state__in: topic === "" ? "3,0" : "3,2,0",
                        page: this.pageInfo.num,
                        topic: topic,
                        search: this.searchText,
                        ordering: "-state",
                    },
                })
                .then(data => {
                    this.pageInfo.total = data.count;
                    this.atcs = data.results;
                    setTimeout(loading.close, 100);
                });
        },
        refresh() {
            this.$router.go(0);
        },
    },
    name: "IndexView",
    created() {
        this.getAtcs();
        this.$axios.get("/topic/", { params: { min_state: 0 } }).then(data => {
            this.topics = this.topics.concat(data);
        });
    },
};
</script>
