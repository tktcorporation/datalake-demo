import { HorizontalBar } from 'vue-chartjs';

export default {
    extends: HorizontalBar,
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart(
            {
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                datasets: [
                    {
                        type: 'horizontalBar',
                        label: 'Invoiced',
                        backgroundColor: '#12c44c',
                        data: [
                            1050,
                            900,
                            1000,
                            850,
                            820,
                            420,
                            700,
                            1010,
                            999,
                            340,
                            0,
                            0
                        ]
                    },
                    {
                        type: 'horizontalBar',
                        label: 'Order',
                        backgroundColor: 'red',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 120, 90]
                    }
                ]
            },
            {
                title: {
                    display: true,
                    text: 'Oversikt'
                },
                scales: {
                    yAxes: [
                        {
                            stacked: true
                        }
                    ],
                    xAxes: [
                        {
                            stacked: true,
                            categoryPercentage: 0.5,
                            barPercentage: 1
                        }
                    ]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        );
    }
};
