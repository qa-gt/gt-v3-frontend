<template>
    <el-card style="margin-left: 3%; width: 94%; --el-card-padding: 10px">
        <el-calendar ref="calendar" style="--el-calendar-cell-width: 115px">
            <template #header="{ date }" style="margin-bottom: initial">
                <span>QA 校历</span>
                <span>{{ date }}</span>
                <el-button-group>
                    <el-button size="small" @click="selectDate('prev-year')"
                        >上一年</el-button
                    >
                    <el-button size="small" @click="selectDate('prev-month')"
                        >上一月</el-button
                    >
                    <el-button size="small" @click="selectDate('today')"
                        >今天</el-button
                    >
                    <el-button size="small" @click="selectDate('next-month')"
                        >下一月</el-button
                    >
                    <el-button size="small" @click="selectDate('next-year')"
                        >下一年</el-button
                    >
                </el-button-group>
            </template>
            <template #dateCell="{ data }" style="height: 800px">
                <p
                    :class="data.isSelected ? 'is-selected' : ''"
                    style="margin-top: initial"
                >
                    <span style="margin-top: auto; font-size: 14px">
                        {{ data.day.split("-").slice(1).join("/") }}</span
                    >

                    <el-scrollbar height="75px" style="margin-top: 5px">
                        <div
                            v-for="(item, index) in dayEvents(data.day)"
                            :key="index"
                        >
                            <div v-if="item">
                                <el-tag :type="item.type">
                                    {{ item.content }}
                                </el-tag>
                            </div>
                        </div>
                    </el-scrollbar>
                </p>
            </template>
        </el-calendar>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            data: {
                type: "today",
                day: "",
                isSelected: false,
                date: "",
            },
            events: [
                { date: "2022-04-26", content: "放假", type: "info" },
                { date: "2022-04-26", content: "考试", type: "success" },
                { date: "2022-04-26", content: "上学", type: "warning" },
                { date: "2022-04-26", content: "搞事", type: "danger" },
            ],
        };
    },
    methods: {
        dayEvents(day) {
            let res = [];
            const len = this.events.length;
            for (let i = 0; i < len; i++) {
                if (this.events[i].date === day) {
                    res.push(this.events[i]);
                }
            }
            return res;
        },
    },
};
</script>

<style>
.remark-text {
    font-size: 8px;
}
.calendar-item {
    flex-direction: column;
}
.is-selected {
    color: #076bcf;
}
.calendar-time {
    height: 16px;
    line-height: 16px;
}
</style>
