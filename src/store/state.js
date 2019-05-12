export default {
    // state goes here
    user: {},
    gameState: {},

    selectors: {
        //dashboard pages
        social: {
            selectedProfileIds: [],
            selectedNetwork: null,
            selectedNlpType: 'topics',
            nlpTypes: ['topics', 'entities', 'categories'],
            networks: {
                facebook: {
                    name: 'facebook',
                    proj: 'interactions, date, page_posts',
                    data: null,
                    target: 700
                },
                twitter: {
                    name: 'twitter',
                    proj: 'interactions, date, profile_activities',
                    data: null,
                    target: 45
                },
                youtube: {
                    name: 'youtube',
                    proj: 'interaction_change, date',
                    data: null,
                    target: 35
                },
                instagram: {
                    name: 'instagram',
                    proj: 'interactions, date',
                    data: null,
                    target: 400
                }
            }
        },
        web: {},
        content: {},
        nlpDemo: {},
        onetimeregister: {
            selectedHostsIds: [],
            selectedAuthors:[],
            selectedUsagmNetworks:[]
        }
    }
};
