<template>
    <el-card style="margin-left: 3%; width: 94%; --el-card-padding: 10px">
        <el-calendar ref="calendar" style="--el-calendar-cell-width: 115px">
            <template #header="{ date }" style="margin-bottom: initial">
                <h3
                    :style="{
                        display: 'inline-block',
                        width: '100%',
                        'margin-bottom': '20px',
                        'text-align': 'center',
                    }"
                >
                    {{ date }}
                </h3>
                <el-button-group
                    :style="{
                        display: 'flex',
                        'justify-content': 'center',
                        width: '100%',
                    }"
                >
                    <el-button size="small" @click="selectDate('prev-year')">
                        去年
                    </el-button>
                    <el-button size="small" @click="selectDate('prev-month')">
                        上月
                    </el-button>
                    <el-button size="small" @click="selectDate('today')">
                        今天
                    </el-button>
                    <el-button size="small" @click="selectDate('next-month')">
                        下月
                    </el-button>
                    <el-button size="small" @click="selectDate('next-year')">
                        明年
                    </el-button>
                </el-button-group>
            </template>
            <template #dateCell="{ data }" style="height: 800px">
                <p
                    :class="data.isSelected ? 'is-selected' : ''"
                    style="margin-top: initial"
                >
                    <span style="margin-top: auto; font-size: 14px">
                        {{ parseInt(data.day.split("-")[2]) }}
                    </span>

                    <el-scrollbar
                        v-if="!isMobile"
                        height="75px"
                        style="margin-top: 5px"
                    >
                        <el-tag
                            v-for="(item, index) in dayEvents(data.day)"
                            :key="index"
                            :type="item.type"
                            style="
                                margin: 1.5px;
                                word-break: break-all;
                                white-space: normal;
                                height: auto;
                                padding: 5px;
                                display: inline-box;
                            "
                        >
                            {{ item.content }}
                        </el-tag>
                    </el-scrollbar>
                </p>
            </template>
        </el-calendar>
        <el-timeline style="margin-left: -10px">
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                :type="activity.type"
            >
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>
    </el-card>
</template>
<script>
import dayjs from "dayjs";

export default {
    data() {
        return {
            selected: null,
            calendar: {},
            data: {
                type: "today",
                day: "",
                isSelected: false,
                date: "",
            },
            activities: [
                {
                    content: "Event start start start start start start ",
                    timestamp: "2018-04-15",
                    type: "success",
                },
                {
                    content: "Approved",
                    timestamp: "2018-04-13",
                    type: "info",
                },
                {
                    content: "Success",
                    timestamp: "2018-04-11",
                    type: "warning",
                },
            ],
            events: [
                {
                    date: "2022-04-26",
                    content: "放假",
                    type: "info",
                },
                { date: "2022-04-26", content: "考试", type: "success" },
                { date: "2022-04-26", content: "上学", type: "warning" },
                { date: "2022-04-26", content: "搞事", type: "danger" },
            ],
        };
    },
    computed: {
        isMobile: function () {
            return this.$root.isMobile;
        },
    },
    methods: {
        dayEvents(day) {
            let res = [];
            for (let i in this.events) {
                if (this.events[i].date === day) {
                    res.push(this.events[i]);
                }
            }
            return res;
        },
        selectDate(value) {
            this.selected = this.selected || dayjs();
            if (value === "prev-month") {
                this.selected = this.selected.add(-1, "month");
            } else if (value === "next-month") {
                this.selected = this.selected.add(1, "month");
            } else if (value === "prev-year") {
                this.selected = this.selected.add(-1, "year");
            } else if (value === "next-year") {
                this.selected = this.selected.add(1, "year");
            } else if (value === "today") {
                this.selected = dayjs();
            }
            this.$refs.calendar.pickDay(this.selected);
        },
    },
};
</script>

<style scoped>
:deep(.el-calendar-day) {
    height: auto !important;
}

:deep(.el-calendar__header) {
    display: block !important;
}

:deep(td.current > div > p > span) {
    font-weight: bold !important;
}
</style>
