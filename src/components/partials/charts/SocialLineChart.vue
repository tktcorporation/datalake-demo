<script>
import { Line } from 'vue-chartjs';
import API from '../../../api';
import moment from 'moment';
const ColorScheme = require('color-scheme');
export default {
    extends: Line,
    props: ['profileIds', 'type'],
    computed: {
        network() {
            return this.$store.state.selectors.social.selectedNetwork;
        }
    },
    data() {
        return {
            isLoading: false,
            tagData: null,
            metricsOverTime: [],
            data: {
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
                                tooltipFormat: 'll'
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
    mounted() {
        this.getTagsOverTime();
    },

    methods: {
        async getTagsOverTime() {
            //get the metrics over time
            if (this.type === 'categories') {
                this.metricsOverTime = [];
                await this.tagData.forEach(tag => {
                    API.getTagsOverTime({
                        tags: `${tag.name}`,
                        range: 'last90days'
                    }).then(data => {
                        this.metricsOverTime = [...this.metricsOverTime, data];
                        //only render when all the data is here
                        if (
                            this.metricsOverTime.length === this.tagData.length
                        ) {
                            this.render();
                        }
                    });
                });
            }
        },
        render() {
            if (this.metricsOverTime.length === this.tagData.length) {
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
                            this.data.datasets.filter(
                                dataset => dataset.label === dataPoint.name
                            ).length > 0
                        ) {
                            let currentDataset = this.data.datasets.filter(
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
                            this.data.datasets = [
                                ...this.data.datasets,
                                newDataSet
                            ];
                        }
                    });
                });
                console.log(this.data);

                //renderChart is part of Chart.js
                this.renderChart(this.data, this.options);
            }
        },
        async update() {
            await this.getTagData().then(() => {
                $(function() {
                    $('[data-toggle="popover"]').popover();
                });
                // waits for tagData then renders
                this.getTagsOverTime();
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

            //var key = 'interactions'

            var max = -9999999;

            // Now normalize data
            for (let i = 0; i < this.tags.length; i += 1) {
                var val = parseNumber(this.tags[i].interactions);
                if (val > max) {
                    max = val;
                }
            }
            console.log(this.tags);

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

                //this.$log('tag, fb = ', max, this.tags[i].twitter_interactions,  typeof this.tags[i].twitter_interactions, parseNumber(this.tags[i].twitter_interactions), this.tagData[i].twitter_normalized)
                //this.$log('tag, tw = ', max, this.tags[i].facebook_interactions,  typeof this.tags[i].facebook_interactions, parseNumber(this.tags[i].facebook_interactions), this.tagData[i].facebook_normalized)
            }
        }
    },
    watch: {
        network(val) {
            if (this.type === 'categories') {
                this.update();
            }
        },

        profileIds(val) {
            if (this.type === 'categories') {
                this.update();
            }
        },
        type() {
            if (this.type === 'categories') {
                this.update();
            }
        }
    }
};
</script>
