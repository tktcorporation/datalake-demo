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
            dates: null,
            tagData: [],
            tagsOverTime: [],
            postData: []
        },
        web: {},
        content: {},
        nlpDemo: {}
    }
};
