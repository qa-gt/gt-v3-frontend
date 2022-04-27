<template class="roll" style="overflow-y: scroll; height: 400px">
    <el-drawer v-model="in_edit" title="校历编辑" direction="ltr" size="40%">
        <h2>编辑校历</h2>
        <el-divider />
        <el-form label-position="top">
            <el-form-item label="选择事务开始时间">
                <div class="block">
                    <el-date-picker
                        v-model="newEvents.date"
                        type="datetime"
                        placeholder="选择日期和时间"
                        :shortcuts="shortcuts"
                        style="width: 100%"
                    />
                </div>
            </el-form-item>
            <el-form-item label="选择事务标签">
                <div>
                    <el-select
                        v-model="newEvents.type"
                        class="m-2"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            <el-tag :type="item.value" size="small">
                                {{ item.label }}
                            </el-tag>
                            <span
                                style="
                                    margin-left: 10px;
                                    font-size: 11px;
                                    color: #5e5e5e;
                                "
                            >
                                {{ item.description }}
                            </span>
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="事务标题">
                <el-input
                    v-model="newEvents.title"
                    placeholder="请输入"
                    maxlength="15"
                    show-word-limit
                    clearable="true"
                />
            </el-form-item>
            <el-form-item label="事务详细内容">
                <el-input
                    v-model="newEvents.content"
                    type="textarea"
                    placeholder="请输入"
                    maxlength="100"
                    show-word-limit
                    clearable="true"
                    rows="5"
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="upload()"> 点击上传 </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
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
                <el-button
                    style="float: right; margin-top: 16px; margin-left: 20px"
                    type="primary"
                    @click="in_edit = true"
                    v-if="isAdmin"
                >
                    编辑校历
                </el-button>
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
                            trigger="hover"
                        >
                            <template #reference>
                                <el-tag :type="item.type" class="event">
                                    {{ item.title }}
                                </el-tag>
                            </template>
                            <el-popover-content>
                                <h4 class="event-pop-title">
                                    {{ item.title }}
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
                {
                    date: "2022-04-26 12:00:00",
                    title: "放假",
                    content: "放假开划",
                    type: "info",
                },
                {
                    date: "2022-04-26 12:00:00",
                    title: "考试",
                    content: "考试开摆",
                    type: "success",
                },
                {
                    date: "2022-04-27 12:00:00",
                    title: "上学",
                    content: "上学逃课",
                    type: "warning",
                },
                {
                    date: "2022-04-26 12:00:00",
                    title: "搞事",
                    content: "搞事整活",
                    type: "danger",
                },
            ],
            in_edit: false,
            shortcuts: shortcuts,
            types: types,
            newEvents: {},
            isAdmin: true,
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
                day = this.$moment(day.valueOf()).format("YYYY-MM-DD HH:MM:SS");
            }
            return this.events.filter((event) => {
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
        upload() {
            this.events.push(this.newEvents);
            this.newEvents = {};
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
const shortcuts = [
    {
        text: "一个月后 ",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            return date;
        },
    },
    {
        text: "一周后",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return date;
        },
    },
    {
        text: "明天 ",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
        },
    },
    {
        text: "现在",
        value: new Date(),
    },
];
const types = [
    {
        value: "info",
        label: "灰色",
        description: "不太重要的事务",
    },
    {
        value: "success",
        label: "绿色",
        description: "已确认的事务",
    },
    {
        value: "warning",
        label: "黄色",
        description: "较为重要的事务",
    },
    {
        value: "error",
        label: "红色",
        description: "极为重要的事务",
    },
    {
        value: "",
        label: "蓝色",
        description: "一般事务",
    },
];
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
.roll::-webkit-scrollbar {
    width: 0 !important;
}
::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
</style>
