import API from '../api/index';
import _ from 'lodash';
export default {
    async getTagsOverTime() {},

    async getTagData(context) {
        function parseNumber(value) {
            let val = parseInt(value);
            if (!_.isFinite(val)) {
                return 0;
            }
            return val;
        }

        let tags = await API.getTopTags(
            context.state.selectors.social.selectedProfileIds,
            {
                type: context.state.selectors.social.selectedNlpType,
                network: context.state.selectors.social.selectedNetwork
            }
        );
        console.log('these are the tags', tags);

        let max = -9999999;

        // Now normalize data
        for (let i = 0; i < tags.length; i += 1) {
            var val = parseNumber(tags[i].interactions);
            if (val > max) {
                max = val;
            }
        }
        let tagData = [];

        for (let i = 0; i < tags.length; i += 1) {
            tagData[i] = tags[i];

            tagData[i].facebook_normalized = Math.round(
                (100 * parseNumber(tags[i].facebook_interactions)) / max
            );
            tagData[i].twitter_normalized = Math.round(
                (100 * parseNumber(tags[i].twitter_interactions)) / max
            );
            tagData[i].youtube_normalized = Math.round(
                (100 * parseNumber(tags[i].youtube_interactions)) / max
            );
            tagData[i].instagram_normalized = Math.round(
                (100 * parseNumber(tags[i].instagram_interactions)) / max
            );
        }

        context.commit('getTagData', tagData);
    }
};
