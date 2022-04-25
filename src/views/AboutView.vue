<template>
    <el-row justify="space-evenly">
        <el-col :xs="24" :sm="23" :md="22" :lg="21" :xl="20">
            <el-card>
                <h2>关于瓜田</h2>
                <p>大概就是升级日志之类的吧！</p>
                <el-divider />
                <div style="margin-right: 35px">
                    <el-timeline style="margin-left: -20px; margin-right: 3%">
                        <el-timeline-item
                            :key="item"
                            v-for="item in timelineItems"
                            :type="item.types"
                            :timestamp="$moment(item.time).format('LL')"
                            placement="top"
                        >
                            <div style="margin-bottom: 25px">
                                <el-card>
                                    <h3>{{ item.title }}</h3>
                                    <p>
                                        {{ item.content }}
                                    </p>
                                </el-card>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped></style>

<script>
import "element-plus/theme-chalk/display.css";
export default {
    data() {
        return {
            timelineItems: [],
        };
    },
    created() {
        this.$axios.get("/about/").then(data => {
            this.timelineItems = data;
        });
    },
};
</script>
