 <!-- <template>
 <div>
    <div class="spinner-border" role="status"></div>

    <div>
      <line-chart :chart-data="chartData"></line-chart>
    </div>
  </div>
</template> -->

<script>
import { Line } from 'vue-chartjs';
import API from '../../../api';
import moment from 'moment';
import { clearInterval } from 'timers';
const ColorScheme = require('color-scheme');
export default {
    extends: Line,
    props: ['TopicsOverTime', 'NetworkOverTime'],
    data() {
        return {
            isLoading: false,
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
                },
                tooltips: {
                    callbacks: {
                        title: (toolTipItem, data) => {
                            if (this.TopicsOverTime) {
                                let dataPointInfo = this.tagsOverTime[
                                    toolTipItem[0].datasetIndex
                                ][toolTipItem[0].index];

                                console.log(dataPointInfo);
                                return `${dataPointInfo.name} - ${
                                    toolTipItem[0].label
                                }`;
                            } else {
                                //title
                                const title =
                                    data.datasets[toolTipItem[0].datasetIndex]
                                        .label;

                                // date
                                const x = moment(
                                    `${toolTipItem[0].xLabel}`
                                ).toISOString();

                                //interactions
                                const y = toolTipItem[0].yLabel;
                                const dataPoint =
                                    data.datasets[toolTipItem[0].datasetIndex]
                                        .data[toolTipItem[0].index];

                                let flatTagsArr = this.tagsOverTime.flat();
                                console.log(x);
                                console.log(y);
                                console.log(flatTagsArr);
                                // if you name this dataPointInfo like above, it doesnt work, it has weird scoping issues
                                let point = flatTagsArr.filter(
                                    point =>
                                        point.profile.usagm_network == title &&
                                        point.interactions == y &&
                                        point.date == x
                                );

                                return `${point[0].profile.usagm_network} - ${
                                    toolTipItem[0].xLabel
                                }`;
                            }
                        },
                        label: (toolTipItem, data) => {
                            if (this.TopicsOverTime) {
                                const dataPointInfo = this.tagsOverTime[
                                    toolTipItem.datasetIndex
                                ][toolTipItem.index];

                                console.log(dataPointInfo);

                                const facebookComments = `Facebook Comments: ${
                                    dataPointInfo.facebook_comments
                                }`;

                                const facebookInteractions = `Facebook Interactions: ${
                                    dataPointInfo.facebook_interactions
                                }`;

                                const facebookReactions = `Facebook Reactions: ${
                                    dataPointInfo.facebook_reactions
                                }`;
                                const facebookShares = `Facebook Shares: ${
                                    dataPointInfo.facebook_shares
                                }`;

                                const instagramComments = `Instagram Comments: ${
                                    dataPointInfo.instagram_comments
                                }`;
                                const instagramInteractions = `Instagram Interactions: ${
                                    dataPointInfo.instagram_interactions
                                }`;
                                const instagramLikes = `Instagram Likes: ${
                                    dataPointInfo.instagram_likes
                                }`;

                                const twitterInteractions = `Twitter Interactions: ${
                                    dataPointInfo.twitter_interactions
                                }`;
                                const twitterLikes = `Twitter Likes: ${
                                    dataPointInfo.twitter_likes
                                }`;
                                const twitterShares = `Twitter Shares: ${
                                    dataPointInfo.twitter_shares
                                }`;

                                const youtubeInteractions = `Youtube Interactions: ${
                                    dataPointInfo.youtube_interactions
                                }`;
                                const youtubeLikes = `Youtube Likes: ${
                                    dataPointInfo.youtube_likes
                                }`;
                                const youtubeImpressions = `Youtube Impressions: ${
                                    dataPointInfo.youtube_impressions
                                }`;
                                const youtubeComments = `Youtube Comments: ${
                                    dataPointInfo.youtube_comments
                                }`;

                                const totalInteractions = `Total Interactions: ${
                                    dataPointInfo.interactions
                                }`;

                                let toolTips = [
                                    facebookInteractions,
                                    facebookComments,
                                    facebookReactions,
                                    facebookShares,
                                    instagramInteractions,
                                    instagramLikes,
                                    instagramComments,
                                    twitterInteractions,
                                    twitterLikes,
                                    twitterShares,
                                    youtubeInteractions,
                                    youtubeComments,
                                    youtubeLikes,
                                    youtubeImpressions,
                                    totalInteractions
                                ];

                                return toolTips;
                            } else {
                                //title
                                const title =
                                    data.datasets[toolTipItem.datasetIndex]
                                        .label;

                                // date
                                const x = moment(
                                    `${toolTipItem.xLabel}`
                                ).toISOString();

                                //interactions
                                const y = toolTipItem.yLabel;
                                const dataPoint =
                                    data.datasets[toolTipItem.datasetIndex]
                                        .data[toolTipItem.index];

                                let flatTagsArr = this.tagsOverTime.flat();

                                // if you name this dataPointInfo like above, it doesnt work, it has weird scoping issues
                                let point = flatTagsArr.filter(
                                    point =>
                                        point.profile.usagm_network == title &&
                                        point.interactions == y &&
                                        point.date == x
                                );

                                const facebookComments = `Facebook Comments: ${
                                    point[0].facebook_comments
                                }`;

                                const facebookInteractions = `Facebook Interactions: ${
                                    point[0].facebook_interactions
                                }`;

                                const facebookReactions = `Facebook Reactions: ${
                                    point[0].facebook_reactions
                                }`;
                                const facebookShares = `Facebook Shares: ${
                                    point[0].facebook_shares
                                }`;

                                const instagramComments = `Instagram Comments: ${
                                    point[0].instagram_comments
                                }`;
                                const instagramInteractions = `Instagram Interactions: ${
                                    point[0].instagram_interactions
                                }`;
                                const instagramLikes = `Instagram Likes: ${
                                    point[0].instagram_likes
                                }`;

                                const twitterInteractions = `Twitter Interactions: ${
                                    point[0].twitter_interactions
                                }`;
                                const twitterLikes = `Twitter Likes: ${
                                    point[0].twitter_likes
                                }`;
                                const twitterShares = `Twitter Shares: ${
                                    point[0].twitter_shares
                                }`;

                                const youtubeInteractions = `Youtube Interactions: ${
                                    point[0].youtube_interactions
                                }`;
                                const youtubeLikes = `Youtube Likes: ${
                                    point[0].youtube_likes
                                }`;
                                const youtubeImpressions = `Youtube Impressions: ${
                                    point[0].youtube_impressions
                                }`;
                                const youtubeComments = `Youtube Comments: ${
                                    point[0].youtube_comments
                                }`;

                                const totalInteractions = `Total Interactions: ${
                                    point[0].interactions
                                }`;

                                let toolTips = [
                                    facebookInteractions,
                                    facebookComments,
                                    facebookReactions,
                                    facebookShares,
                                    instagramInteractions,
                                    instagramLikes,
                                    instagramComments,
                                    twitterInteractions,
                                    twitterLikes,
                                    twitterShares,
                                    youtubeInteractions,
                                    youtubeComments,
                                    youtubeLikes,
                                    youtubeImpressions,
                                    totalInteractions
                                ];

                                return toolTips;
                            }
                        }
                    }
                }
            }
        };
    },
    computed: {
        tagsOverTime() {
            return this.$store.getters.tagsOverTime;
        },
        dates() {
            return this.$store.getters.dates;
        }
    },
    mounted() {
        //////////////////
        this.$store.dispatch('getTagsOverTime');

        this.$store.watch(
            state => state.selectors.social.selectedProfileIds,
            async () => {
                await this.$store.dispatch('getTagsOverTime');
            }
        ),
            this.$store.watch(
                state => state.selectors.social.selectedNetwork,
                async () => {
                    await this.$store.dispatch('getTagsOverTime');
                }
            ),
            this.$store.watch(
                state => state.selectors.social.selectedNlpType,
                async () => {
                    await this.$store.dispatch('getTagsOverTime');
                }
            ),
            this.$store.watch(
                state => state.selectors.social.dates,
                async () => {
                    await this.$store.dispatch('getTagsOverTime');
                }
            );
    },
    watch: {
        tagsOverTime() {
            this.render();
        }
    },
    methods: {
        render() {
            this.chartData = {
                datasets: []
            };
            if (this.tagsOverTime) {
                if (this.dates) {
                    this.options.scales.xAxes[0].time.min = this.dates.start;
                    this.options.scales.xAxes[0].time.max = this.dates.end;
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

                // difference between all graphs

                if (this.TopicsOverTime) {
                    //correct the format for chart rendering

                    this.tagsOverTime.forEach((metric, index) => {
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
                                            x: moment(
                                                `${dataPoint.date}`
                                            ).format('MM/DD/YYYY'),
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
                } else {
                    let colorCount = 0;
                    this.tagsOverTime.forEach((metric, index) => {
                        metric.forEach(dataPoint => {
                            // push objects into the datasets
                            if (
                                this.chartData.datasets.filter(
                                    dataset =>
                                        dataset.label ===
                                        dataPoint.profile.usagm_network
                                ).length > 0
                            ) {
                                let currentDataset = this.chartData.datasets.filter(
                                    dataset =>
                                        dataset.label ===
                                        dataPoint.profile.usagm_network
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
                                let color = colors[colorCount];
                                colorCount++;
                                let newDataSet = {
                                    label: dataPoint.profile.usagm_network,
                                    backgroundColor: `#${color}`,
                                    borderColor: `#${color}`,
                                    fill: false,
                                    pointRadius: 2,
                                    data: [
                                        {
                                            x: moment(
                                                `${dataPoint.date}`
                                            ).format('MM/DD/YYYY'),
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
                    this.options.title.text = 'Engagements Over Time';
                    this.options.scales.yAxes[0].scaleLabel.labelString =
                        'Engagements';
                    //renderChart is part of Chart.js
                    this.renderChart(this.chartData, this.options);
                }
            }
        }
    }
};
</script>
