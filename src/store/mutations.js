export default {
    // mutations go here

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

    // Social
    selectNetwork(state, network) {
        state.selectors.social.selectedNetwork = network;
    },

    selectSocialProfileIds(state, profileIds) {
        state.selectors.social.selectedProfileIds = profileIds;
    },

    queryOptions(state, payload) {
        if (payload.profileIds) {
            state.selectors.social.queryOptions['profileIds'] =
                payload.profileIds;
        } else if (payload.network) {
            state.selectors.social.queryOptions['network'] = payload.network;
        }
    }
};
