export default {
    tagData: state => {
        return state.selectors.social.tagData;
    },

    tagsOverTime: state => {
        return state.selectors.social.tagsOverTime;
    },
    dates: state => {
        return state.selectors.social.dates;
    },
    postData: state => {
        return state.selectors.social.postData;
    }
};
