import API from '../api/index';
export default {
    async getTagsOverTime() {},

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
                (100 * parseNumber(this.tags[i].facebook_interactions)) / max
            );
            this.tagData[i].twitter_normalized = Math.round(
                (100 * parseNumber(this.tags[i].twitter_interactions)) / max
            );
            this.tagData[i].youtube_normalized = Math.round(
                (100 * parseNumber(this.tags[i].youtube_interactions)) / max
            );
            this.tagData[i].instagram_normalized = Math.round(
                (100 * parseNumber(this.tags[i].instagram_interactions)) / max
            );
        }
    }
};
