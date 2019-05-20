<script>
import { Line, mixins } from 'vue-chartjs';
import API from '../../../api';
import moment from 'moment';
const ColorScheme = require('color-scheme');
export default {
    extends: Line,
    data() {
        return {
            isLoading: false,
            tagData: null,
            metricsOverTime: [],
            chartData: {
                datasets: []
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Topics Over Time'
                },
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                format: 'MM/DD/YYYY',
                                tooltipFormat: 'll',
                                min: null,

                                max: null
                            },

                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Interactions'
                            }
                        }
                    ]
                }
            }
        };
    },
    computed: {
        network() {
            return this.$store.state.selectors.social.selectedNetwork;
        },
        profileIds() {
            return this.$store.state.selectors.social.selectedProfileIds;
        },
        type() {
            return this.$store.state.selectors.social.selectedNlpType;
        },
        date() {
            return this.$store.state.selectors.social.dates;
        }
    },
    mounted() {
        this.getTagsOverTime();
    },
    methods: {
        async getTagsOverTime() {
            //get the metrics over time
            if (this.type === 'categories') {
                this.metricsOverTime = [];
                await this.tagData.forEach(tag => {
                    if (this.date) {
                        API.getTagsOverTime({
                            tags: `${tag.name}`,
                            start: this.date.start,
                            end: this.date.end
                        }).then(data => {
                            this.metricsOverTime = [
                                ...this.metricsOverTime,
                                data
                            ];
                            //only render when all the data is here
                            if (
                                this.metricsOverTime.length ===
                                this.tagData.length
                            ) {
                                this.render();
                            }
                        });
                    } else {
                        // 90 days default
                        API.getTagsOverTime({
                            tags: `${tag.name}`
                        }).then(data => {
                            this.metricsOverTime = [
                                ...this.metricsOverTime,
                                data
                            ];
                            if (
                                this.metricsOverTime.length ===
                                this.tagData.length
                            ) {
                                this.render();
                            }
                        });
                    }
                });
            }
        },
        render() {
            this.chartData = {
                datasets: []
            };
            if (this.metricsOverTime.length === this.tagData.length) {
                console.log(this.metricsOverTime);
                if (this.date) {
                    this.options.scales.xAxes[0].time.min = this.date.start;
                    this.options.scales.xAxes[0].time.max = this.date.end;
                } else {
                    this.options.scales.xAxes[0].time.min = moment().subtract(
                        90,
                        'days'
                    );
                    this.options.scales.xAxes[0].time.max = moment().endOf(
                        'day'
                    );
                }

                //only creates 12 colors right now
                let scheme = new ColorScheme();
                scheme
                    .from_hue(21)
                    .scheme('triade')
                    .variation('hard');

                let colors = scheme.colors();
                //correct the format for chart rendering
                this.metricsOverTime.forEach((metric, index) => {
                    let color = colors[index];
                    metric.forEach(dataPoint => {
                        // push objects into the datasets
                        if (
                            this.chartData.datasets.filter(
                                dataset => dataset.label === dataPoint.name
                            ).length > 0
                        ) {
                            let currentDataset = this.chartData.datasets.filter(
                                dataset => dataset.label === dataPoint.name
                            )[0];
                            let newDataPoint = {
                                x: moment(`${dataPoint.date}`).format(
                                    'MM/DD/YYYY'
                                ),
                                y: dataPoint.interactions
                            };
                            currentDataset.data = [
                                ...currentDataset.data,
                                newDataPoint
                            ];
                        } else {
                            let newDataSet = {
                                label: dataPoint.name,
                                backgroundColor: `#${color}`,
                                borderColor: `#${color}`,
                                fill: false,
                                pointRadius: 2,
                                data: [
                                    {
                                        x: moment(`${dataPoint.date}`).format(
                                            'MM/DD/YYYY'
                                        ),
                                        y: dataPoint.interactions
                                    }
                                ]
                            };
                            this.chartData.datasets = [
                                ...this.chartData.datasets,
                                newDataSet
                            ];
                        }
                    });
                });

                //renderChart is part of Chart.js
                this.renderChart(this.chartData, this.options);
            }
        },
        async updateAll() {
            await this.getTagData().then(() => {
                $(function() {
                    $('[data-toggle="popover"]').popover();
                });
                console.log(this.tagData);

                // waits for tagData then renders
                this.getTagsOverTime();
                //this.update is a chartjs function
                // this.update();
            });
        },

        async getTagData() {
            function parseNumber(val) {
                var val = parseInt(val);
                if (!_.isFinite(val)) {
                    return 0;
                }
                return val;
            }

            this.isLoading = true;
            this.tags = await API.getTopTags(this.profileIds, {
                type: this.type,
                network: this.network
            });
            this.isLoading = false;

            var max = -9999999;

            // Now normalize data
            for (let i = 0; i < this.tags.length; i += 1) {
                var val = parseNumber(this.tags[i].interactions);
                if (val > max) {
                    max = val;
                }
            }

            this.tagData = [];

            for (let i = 0; i < this.tags.length; i += 1) {
                this.tagData[i] = this.tags[i];

                this.tagData[i].facebook_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].facebook_interactions)) /
                        max
                );
                this.tagData[i].twitter_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].twitter_interactions)) / max
                );
                this.tagData[i].youtube_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].youtube_interactions)) / max
                );
                this.tagData[i].instagram_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].instagram_interactions)) /
                        max
                );
            }
        }
    },
    watch: {
        network(val) {
            if (this.type === 'categories') {
                this.updateAll();
            }
        },
        profileIds(val) {
            if (this.type === 'categories') {
                this.updateAll();
            }
        },
        type() {
            if (this.type === 'categories') {
                this.updateAll();
            }
        },
        date() {
            if (this.type === 'categories') {
                this.updateAll();
            }
        }
    }
};
</script>
