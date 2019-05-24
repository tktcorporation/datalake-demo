import API from '../api/index';
import _ from 'lodash';
export default {
    async getTagsOverTime(context) {
        if (context.state.selectors.social.selectedNlpType === 'categories') {
            await context.dispatch('getTagData');
            try {
                let isFinished = 0;
                let tagsArray = [];
                return await context.getters.tagData.forEach(
                    async (tag, index, array) => {
                        if (context.state.selectors.social.dates) {
                            await API.getTagsOverTime({
                                tags: `${tag.name}`,
                                start:
                                    context.state.selectors.social.dates.start,
                                end: context.state.selectors.social.dates.end
                            }).then(data => {
                                tagsArray.push(data);
                                isFinished++;
                                if (isFinished === array.length) {
                                    console.log('tagsarray', tagsArray);
                                    context.commit(
                                        'getTagsOverTime',
                                        tagsArray
                                    );
                                }
                            });
                        } else {
                            // 90 days default
                            await API.getTagsOverTime({
                                tags: `${tag.name}`
                            }).then(data => {
                                tagsArray.push(data);
                                isFinished++;
                                if (isFinished === array.length) {
                                    console.log('tagsarray', tagsArray);
                                    context.commit(
                                        'getTagsOverTime',
                                        tagsArray
                                    );
                                }
                            });
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
    },

    async getTagData(context) {
        function parseNumber(value) {
            let val = parseInt(value);
            if (!_.isFinite(val)) {
                return 0;
            }
            return val;
        }

        try {
            await API.getTopTags(
                context.state.selectors.social.selectedProfileIds,
                {
                    type: context.state.selectors.social.selectedNlpType,
                    network: context.state.selectors.social.selectedNetwork
                }
            ).then(data => {
                console.log('these are the tags', data);

                let tags = data;

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
                        (100 * parseNumber(tags[i].instagram_interactions)) /
                            max
                    );
                }

                context.commit('getTagData', tagData);
            });
        } catch (err) {
            console.log(err);
        }
    }
};
