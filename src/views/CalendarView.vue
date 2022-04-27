<template>
    <el-card style="margin-left: 3%; width: 94%; --el-card-padding: 10px">
        <el-calendar ref="calendar" style="--el-calendar-cell-width: 115px">
            <template #header="{ date }" style="margin-bottom: initial">
                <h3
                    style="display: inline-block"
                    :style="
                        isMobile
                            ? {
                                  width: '100%',
                                  'margin-bottom': '20px',
                                  'text-align': 'center',
                              }
                            : { width: 'auto' }
                    "
                >
                    {{ date }}
                </h3>
                <el-button-group
                    :style="
                        isMobile
                            ? {
                                  display: 'flex',
                                  'justify-content': 'center',
                                  width: '100%',
                              }
                            : {
                                  width: 'auto',
                                  display: 'inline-block',
                                  float: 'right',
                                  margin: '1rem 0',
                              }
                    "
                >
                    <el-button
                        v-for="i in [
                            ['prev-year', '上年'],
                            ['prev-month', '上月'],
                            ['today', '今天'],
                            ['next-month', '下月'],
                            ['next-year', '下年'],
                        ]"
                        :key="i"
                        :size="isMobile ? 'small' : 'default'"
                        @click="selectDate(i[0])"
                    >
                        {{ i[1] }}
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
                        <el-popover
                            v-for="(item, index) in dayEvents(data.day)"
                            :key="index"
                            placement="top-start"
                            trigger="click"
                        >
                            <template #reference>
                                <el-tag :type="item.type" class="event">
                                    {{ item.content }}
                                </el-tag>
                            </template>
                            <el-popover-content>
                                <h4 class="event-pop-title">
                                    {{ item.content }}
                                </h4>
                                <small class="event-pop-date">
                                    {{ item.date }}
                                </small>
                                <p class="event-pop-content">
                                    {{ item.content }}
                                </p>
                            </el-popover-content>
                        </el-popover>
                    </el-scrollbar>
                </p>
            </template>
        </el-calendar>
        <el-timeline style="margin-left: -10px" v-if="isMobile">
            <el-timeline-item
                v-for="event in dayEvents(currentDate)"
                :key="event"
                :timestamp="event.date"
                :type="event.type"
            >
                {{ event.content }}
            </el-timeline-item>
        </el-timeline>
    </el-card>
</template>
<script>
import dayjs from "dayjs";

export default {
    data() {
        return {
            currentDate: null,
            events: [
                { date: "2022-04-26", content: "放假", type: "info" },
                { date: "2022-04-26", content: "考试", type: "success" },
                { date: "2022-04-27", content: "上学", type: "warning" },
                { date: "2022-04-26", content: "搞事", type: "danger" },
            ],
        };
    },
    computed: {
        isMobile() {
            return this.$root.isMobile;
        },
    },
    methods: {
        dayEvents(day) {
            if (!day) return [];
            if (typeof day === "object") {
                day = this.$moment(day.valueOf()).format("YYYY-MM-DD");
            }
            return this.events.filter(event => {
                return dayjs(event.date).isSame(day, "day");
            });
        },
        selectDate(value) {
            let date = this.$refs.calendar.date || dayjs();
            if (value === "prev-month") {
                date = date.add(-1, "month");
            } else if (value === "next-month") {
                date = date.add(1, "month");
            } else if (value === "prev-year") {
                date = date.add(-1, "year");
            } else if (value === "next-year") {
                date = date.add(1, "year");
            } else if (value === "today") {
                date = dayjs();
            }
            this.$refs.calendar.pickDay(date);
        },
    },
    created() {
        setInterval(
            () =>
                (this.currentDate =
                    (this.$refs.calendar && this.$refs.calendar.date) || null),
            100
        );
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

.event {
    margin: 1.5px;
    word-break: break-all;
    white-space: normal;
    height: auto;
    padding: 5px;
}
.event-pop-title {
    margin: 0;
}
.event-pop-content {
    margin: 0;
}
.event-pop-date {
    font-size: 12px;
    color: #aeb8c6;
    display: inline-block;
    margin: 5px !important;
}
</style>
