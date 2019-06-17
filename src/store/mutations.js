export default {
    // Store the value of a search query in the navbar
    setUser(state, info) {
        const levels = { user: 10, admin: 20, super: 30 };

        state.user = info;

        if (!info) {
            state.user = {
                authenticated: false
            };
        }

        function isLevel(role) {
            let requiredLevel = levels[role];
            let userLevel = levels[state.user.level];
            if (userLevel >= requiredLevel) {
                return true;
            }
            return false;
        }

        state.user.isAdmin = isLevel('admin');
        state.user.isSuper = isLevel('super');
        state.user.authenticated = isLevel('user');
    },
    // API
    getTagData(state, tagData) {
        state.selectors.social.tagData = tagData;
    },
    getTagsOverTime(state, tagsOverTime) {
        state.selectors.social.tagsOverTime = tagsOverTime;
    },

    getPosts(state, postData) {
        state.selectors.social.postData = postData;
    },

    // Social
    selectNetwork(state, network) {
        state.selectors.social.selectedNetwork = network;
    },

    selectSocialProfileIds(state, profileIds) {
        state.selectors.social.selectedProfileIds = profileIds;
    },

    selectNlpType(state, type) {
        state.selectors.social.selectedNlpType = type;
    },

    changeDate(state, date) {
        state.selectors.social.dates = date;
    }
};
