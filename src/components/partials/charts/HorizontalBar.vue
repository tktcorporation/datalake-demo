<script>
import { HorizontalBar } from 'vue-chartjs';
const ColorScheme = require('color-scheme');

export default {
    extends: HorizontalBar,
    data() {
        return {
            chartData: {
                datasets: [],
                labels: []
            },
            options: {
                title: {
                    display: true,
                    text: 'Engagement by Subject'
                },
                scales: {
                    yAxes: [
                        {
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Subjects'
                            }
                        }
                    ],
                    xAxes: [
                        {
                            stacked: true,
                            categoryPercentage: 0.5,
                            barPercentage: 1,
                            scaleLabel: {
                                display: true,
                                labelString: 'Engagements'
                            }
                        }
                    ]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    mounted() {
        this.render();
    },
    computed: {
        tagData() {
            return this.$store.getters.tagData;
        }
    },
    watch: {
        tagData() {
            this.render();
        }
    },
    methods: {
        render() {
            //labels = tag names
            // datasets  = //
            ///////label = usagmnetwork
            ///////data = interactions
            this.chartData = {
                datasets: [],
                labels: []
            };

            //only creates 12 colors right now
            let scheme = new ColorScheme();
            scheme
                .from_hue(21)
                .scheme('triade')
                .variation('hard');

            let colors = scheme.colors();
            // difference between all graphs
            this.tagData.forEach((tag, index, array) => {
                this.chartData.labels = [...this.chartData.labels, tag.name];
                let color = colors[index];
                // push objects into the datasets
                if (
                    this.chartData.datasets.filter(
                        dataset => dataset.label === tag.profile.usagm_network
                    ).length > 0
                ) {
                    let currentDataset = this.chartData.datasets.filter(
                        dataset => dataset.label === tag.profile.usagm_network
                    )[0];
                    let newDataPoint = {
                        x: tag.interactions,
                        y: tag.name
                    };
                    currentDataset.data = [
                        ...currentDataset.data,
                        newDataPoint
                    ];
                } else {
                    let newDataSet = {
                        type: 'horizontalBar',
                        label: tag.profile.usagm_network,
                        backgroundColor: `#${color}`,
                        data: [
                            {
                                x: tag.interactions,
                                y: tag.name
                            }
                        ]
                    };
                    this.chartData.datasets = [
                        ...this.chartData.datasets,
                        newDataSet
                    ];
                }
            });

            this.renderChart(this.chartData, this.options);
        }
    }
};
</script>