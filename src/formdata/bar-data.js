export const barChartData = {
    type: "bar",
    data: {
        labels: ["水星", "金星", "地球", "火星", "木星", "土星", "天王星", "海王星"],
        datasets: [
            {
                label: "行星卫星数量",
                data: [0, 0, 1, 2, 79, 82, 27, 14],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }

        }
    }

};

export default barChartData;