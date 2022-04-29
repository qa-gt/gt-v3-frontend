<template class="roll" style="overflow-y: scroll; height: 400px">
    <el-drawer
        v-model="editing"
        :with-header="false"
        direction="ltr"
        :size="isMobile ? '85%' : '40%'"
    >
        <h2>编辑校历</h2>
        <el-divider />
        <el-form label-position="top">
            <el-form-item label="选择时间">
                <el-date-picker
                    v-model="newEvent.date"
                    type="date"
                    placeholder="选择日期"
                />
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="newEvent.timeType">
                    <el-radio :label="0">全天</el-radio>
                    <el-radio :label="1">开始时间</el-radio>
                    <el-radio :label="2">开始和结束时间</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="newEvent.timeType">
                <el-time-select
                    v-model="newEvent.start_time"
                    start="06:00"
                    step="00:15"
                    end="23:00"
                    :max-time="
                        newEvent.timeType === 2 ? newEvent.end_time : null
                    "
                    placeholder="开始时间"
                    style="margin: 2px"
                    :clearable="false"
                />
                <el-time-select
                    v-model="newEvent.end_time"
                    :min-time="newEvent.start_time"
                    placeholder="结束时间"
                    start="06:00"
                    step="00:15"
                    end="23:00"
                    v-if="newEvent.timeType === 2"
                    style="margin: 2px"
                    :clearable="false"
                />
            </el-form-item>
            <el-form-item label="选择事务标签">
                <div>
                    <el-select
                        v-model="newEvent.type"
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
            <el-form-item label="事务标题" prop="affairtypeid">
                <el-input
                    v-model="newEvent.title"
                    placeholder="请输入"
                    maxlength="15"
                    show-word-limit
                    :clearable="true"
                    required="true"
                />
            </el-form-item>
            <el-form-item label="事务详细内容">
                <el-input
                    v-model="newEvent.content"
                    type="textarea"
                    placeholder="请输入"
                    maxlength="100"
                    show-word-limit
                    :clearable="true"
                    rows="5"
                />
            </el-form-item>
            <el-form-item label="关联网址">
                <el-input
                    v-model="newEvent.url"
                    placeholder="请输入"
                    :clearable="true"
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="upload()" type="primary">
                    点击上传
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
    <el-card style="margin-left: 3%; width: 94%">
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
                    @click="editing = true"
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
                            <div>
                                <h4 class="event-pop-title">
                                    {{ item.title }}
                                </h4>
                                <small class="event-pop-date">
                                    <span v-if="item.timeType === 0">
                                        全天
                                    </span>
                                    <span v-else-if="item.timeType === 1">
                                        {{ item.start.format("HH:mm") }}开始
                                    </span>
                                    <span v-else-if="item.timeType === 2">
                                        从 {{ item.start.format("HH:mm") }}
                                        至
                                        {{ item.end.format("HH:mm") }}
                                    </span>
                                </small>
                                <p class="event-pop-content">
                                    {{ item.content }}
                                </p>
                            </div>
                        </el-popover>
                    </el-scrollbar>
                </p>
            </template>
        </el-calendar>
        <el-timeline style="margin-left: -10px" v-if="isMobile">
            <el-timeline-item
                v-for="event in dayEvents(currentDate)"
                :key="event"
                :timestamp="formatTimeForPhone(event)"
                :type="event.type"
            >
                <span style="font-weight: bold">{{ event.title }}</span>
                <br />
                <small>{{ event.content }}</small>
            </el-timeline-item>
        </el-timeline>
    </el-card>
</template>
<script>
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

export default {
    data() {
        return {
            currentDate: null,
            events: [],
            editing: false,
            types: types,
            newEvent: {},
            isAdmin: true,
        };
    },
    computed: {
        isMobile() {
            return this.$root.isMobile;
        },
    },
    methods: {
        formatTimeForPhone(event) {
            if (event.timeType === 0) {
                return this.currentDate.format("M月D日 全天");
            } else if (event.timeType === 1) {
                return event.start.format("M月D日 HH:mm") + " 开始";
            } else if (event.timeType === 2) {
                return (
                    event.start.format("M月D日 HH:mm") +
                    " 至 " +
                    event.end.format("HH:mm")
                );
            }
        },
        dayEvents(day) {
            // TODO: 性能需优化，先列表排序然后按日期依次取
            return this.events.filter(event =>
                dayjs(event.start).isSame(day, "day")
            );
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
            const fields = [
                ["date", "日期"],
                ["timeType", "持续时间"],
                ["title", "标题"],
                ["type", "标签"],
            ];
            let data = this.newEvent;
            for (let i in fields) {
                if (data[fields[i][0]] === undefined) {
                    ElMessage.error(fields[i][1] + "不能为空");
                    return;
                }
            }
            data.start = new Date(data.date);
            data.end = new Date(data.date);
            if ([1, 2].includes(data.timeType)) {
                data.start.setHours(data.start_time.split(":")[0]);
                data.start.setMinutes(data.start_time.split(":")[1]);
            }
            if (data.timeType === 2) {
                data.end.setHours(data.end_time.split(":")[0]);
                data.end.setMinutes(data.end_time.split(":")[1]);
                data.end = data.end.toISOString();
            }
            data.start = data.start.toISOString();
            this.$axios.post("/calendar_event/", data).then(res => {
                ElMessage.success("添加成功");
                this.events.push(res);
                this.newEvent = {};
                res.start = dayjs(res.start);
                res.end = dayjs(res.end);
                this.editing = false;
            });
        },
        getEvents(start = null, end = null) {
            // start和end均为JavaScript Date对象
            if (start === null || end === null) {
                start = new Date(this.currentDate);
                end = new Date(this.currentDate);
                start.setMonth(start.getMonth() - 1);
                end.setMonth(end.getMonth() + 1);
            }
            start = start.toISOString();
            end = end.toISOString();
            this.$axios
                .get("/calendar_event/", {
                    params: {
                        start_time: start,
                        end_time: end,
                    },
                })
                .then(res => {
                    for (let i = 0; i < res.length; i++) {
                        res[i].start = dayjs(res[i].start);
                        res[i].end = dayjs(res[i].end);
                    }
                    this.events = res;
                });
        },
    },
    created() {
        setInterval(
            () =>
                (this.currentDate =
                    (this.$refs.calendar && this.$refs.calendar.date) || null),
            100
        );
        // setInterval(() => console.log(this.newEvent.date), 1000);
    },
    watch: {
        currentDate(value, old) {
            console.log(value, old);
            if (old === null || value.$y !== old.$y || value.$M !== old.$M) {
                this.getEvents();
            }
        },
    },
};
const types = [
    {
        value: "success",
        label: "绿色",
        description: "常规事务",
    },
    {
        value: "",
        label: "蓝色",
        description: "一般事务",
    },
    {
        value: "warning",
        label: "黄色",
        description: "重要事务",
    },
    {
        value: "danger",
        label: "红色",
        description: "特殊事务",
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
    margin: 5px 0 !important;
}
.roll::-webkit-scrollbar {
    width: 0 !important;
}
::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
</style>
