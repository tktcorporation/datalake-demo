export default {
    tagData: state => {
        return state.selectors.social.tagData;
    },

    tagsOverTime: state => {
        return state.selectors.social.tagsOverTime;
    },
    getNetworkMetricsOverTime() {},
    getTopicMetricsOverTime() {}
};
