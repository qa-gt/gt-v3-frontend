<template>
    <el-card style="width: 70%; margin-left: 15%">
        <h2>瓜田数据报表</h2>
        <el-divider />
        <el-card>
            <h3 style="margin-top: 0px">近期请求数</h3>
            <el-divider />
            <line-chart :chartData="report" :height="100" />
        </el-card>
        <el-card style="margin-top: 20px">
            <h3 style="margin-top: 0px">本次累计运行时长</h3>
            <el-divider />
        </el-card>
        <el-card style="margin-top: 20px">
            <h3 style="margin-top: 0px">本次累计运行时长</h3>
            <el-divider />
        </el-card>
    </el-card>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
export default {
    components: {
        LineChart,
    },
    data() {
        return {
            report: {
                type: "line",
                labels: ["a", "b", "c", "d", "e", "f", "g"],
                datasets: [
                    {
                        label: "请求数",

                        data: [
                            5000023200, 12381023185, 4527234568, 4561278394,
                            7234583475, 12316549122, 9123564811,
                        ],
                        backgroundColor: [
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                            "rgba(54, 162, 235, 0.3)",
                        ],

                        pointStyle: "circle",
                        pointRadius: 7,
                        pointHoverRadius: 13,
                    },
                ],
            },
            plugins: {
                title: {
                    display: true,
                    text: (ctx) =>
                        "Point Style: " + ctx.chart.data.datasets[0].pointStyle,
                },
            },
        };
    },
};
</script>

<style></style>
