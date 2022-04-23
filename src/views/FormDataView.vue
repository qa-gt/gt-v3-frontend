<template>
  <el-card> <bar-chart :chartData="chartData" :height="height" /> </el-card>
  <el-card>
    <line-chart
      :chartData="linechartData"
      :height="height2"
      :plugins="plugins"
    />
  </el-card>
  <el-card>
    <pie-chart :chartData="linechartData"
      :height="height"
      />
  </el-card>  
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import PieChart from '@/components/PieChart.vue';

export default {
  name: "App",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  data() {
    return {
      height: 800,
      height2: 200,
      chartData: {
        labels: ["a", "b", "c", "d", "e", "f", "g"],
        datasets: [
          {
            label: "My Dataset",

            data: [120, 20, 12, 24, 35, 12, 75],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],

            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      },

      linechartData: {
        type: "line",
        labels: ["a", "b", "c", "d", "e", "f", "g"],
        datasets: [
          {
            label: "My Dataset",

            data: [120, 20, 12, 24, 35, 12, 75],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            /*
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],*/
            pointStyle: "circle",
            pointRadius: 10,
            pointHoverRadius: 15,
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