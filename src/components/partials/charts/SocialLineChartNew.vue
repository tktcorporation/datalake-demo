<script>
import { Line } from 'vue-chartjs';
import API from '../../../api';

export default {
    extends: Line,
    props: ['profileIds', 'network', 'type'],
    data() {
        return {
            isLoading: false,
            tagData: null,
            metricsOverTime: [],
            data: {
                datasets: [
                    {
                        label: 'Business',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [
                            {
                                x: '04/01/2014',
                                y: 175
                            },
                            {
                                x: '10/01/2014',
                                y: 175
                            },
                            {
                                x: '04/01/2015',
                                y: 178
                            },
                            {
                                x: '10/01/2015',
                                y: 178
                            }
                        ],
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: 'My second dataset',
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        data: [
                            {
                                x: '01/04/2014',
                                y: 175
                            },
                            {
                                x: '01/10/2014',
                                y: 175
                            },
                            {
                                x: '01/04/2015',
                                y: 178
                            },
                            {
                                x: '01/10/2015',
                                y: 178
                            }
                        ],
                        fill: false,
                        pointRadius: 0
                    }
                ]
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
                                format: 'DD/MM/YYYY',
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
        render() {
            if (this.type === 'categories') {
                this.tagData.forEach(tag => {
                    API.getTagsOverTime({
                        tag: `${tag.name}`,
                        range: 'last90days'
                    }).then(
                        data =>
                            (this.metricsOverTime = [
                                ...this.metricsOverTime,
                                data
                            ])
                    );
                });

                this.renderChart(this.data, this.options);
            }
        },
        update() {
            this.getTagData().then(() => {
                $(function() {
                    $('[data-toggle="popover"]').popover();
                });
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
            this.update();
        },

        profileIds(val) {
            this.update();
        },
        type() {
            this.render();
        }
    }
};
</script>
