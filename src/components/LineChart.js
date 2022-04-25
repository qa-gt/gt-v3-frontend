import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {

    name: 'BarChart',
    components: { Bar },
    computed: {
        chartData() { return chartData
        } 
    },
    mounted() {
        // this.chartData 在 mixin 创建.
        // 如果你需要替换 options , 请创建本地的 options 对象
        this.renderChart(this.chartData, this.options)
    },
    props: {
        chartData: {
          type: Object,
          default: () => {},
        },
        chartId: {
          type: String,
          default: "bar-chart",
        },
        title: {
          type: String,
          default: "Chart",
        },
        datasetIdKey: {
          type: String,
          default: "label",
        },
        width: {
          type: Number,
          default: 400,
        },
        height: {
          type: Number,
          default: 400,
        },
        cssClasses: {
          default: "",
          type: String,
        },
        styles: {
          type: Object,
          default: () => {},
        },
        plugins: {
          type: Object,
          default: () => {},
        },
      },
}


