<script>
import { Line } from 'vue-chartjs';
import API from '../../../api';
import moment from 'moment';
export default {
    extends: Line,
    props: ['profileIds', 'network', 'type'],
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
                                labelString: 'value'
                            }
                        }
                    ]
                }
            }
        };
    },
    mounted() {
        this.render();
    },

    methods: {
        async render() {
            console.log('tagdata', this.tagData);
            //get the metrics over time
            if (this.type === 'categories') {
                this.metricsOverTime = [];
                await this.tagData.forEach(tag => {
                    API.getTagsOverTime({
                        tag: `${tag.name}`,
                        range: 'last90days'
                    }).then(data => {
                        this.metricsOverTime = [...this.metricsOverTime, data];
                        console.log('metrics over time', this.metricsOverTime);

                        //correct the format for chart rendering
                        this.metricsOverTime.forEach(metric => {
                            metric.forEach(dataPoint => {
                                // push objects into the datasets
                                if (
                                    this.data.datasets.filter(
                                        dataset =>
                                            dataset.label === dataPoint.name
                                    ).length > 0
                                ) {
                                    let currentDataset = this.data.datasets.filter(
                                        dataset =>
                                            dataset.label === dataPoint.name
                                    )[0];
                                    let newDataPoint = {
                                        x: moment(`${dataPoint.date}`).format(
                                            'MM/DD/YYYY'
                                        ),
                                        y: dataPoint.facebook_interactions
                                    };

                                    currentDataset.data = [
                                        ...currentDataset.data,
                                        newDataPoint
                                    ];
                                } else {
                                    console.log(this.getRandomColor());
                                    let color = `${this.getRandomColor()}`;
                                    let newDataSet = {
                                        label: dataPoint.name,
                                        backgroundColor: color,
                                        borderColor: color,
                                        fill: false,
                                        pointRadius: 0,
                                        data: [
                                            {
                                                x: moment(
                                                    `${dataPoint.date}`
                                                ).format('MM/DD/YYYY'),
                                                y:
                                                    dataPoint.facebook_interactions
                                            }
                                        ]
                                    };
                                    this.data.datasets = [
                                        ...this.data.datasets,
                                        newDataSet
                                    ];
                                }
                            });
                            this.renderChart(this.data, this.options);
                        });
                    });
                });
            }
        },
        update() {
            this.getTagData().then(() => {
                $(function() {
                    $('[data-toggle="popover"]').popover();
                });
                // waits for tagData then renders
                this.render();
            });
        },
        getRandomColor() {
            let colorArray = ['red', 'blue', 'green', 'purple'];

            return colorArray[Math.floor(Math.random() * colorArray.length)];
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
            this.update();
        },

        profileIds(val) {
            this.update();
        },
        async type() {
            if (this.type === 'categories') {
                await this.update();
            }
        }
    }
};
</script>
