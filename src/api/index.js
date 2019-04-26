import Vue from 'vue';
import Resource from 'vue-resource';
import _ from 'lodash';
const uuidv5 = require('uuid/v5');

const API = {
    rootUrls: {
        user: {
            url: '/api/user/',
            port: 5000
        },
        nlp: {
            url: '/api/nlp/',
            port: 5001
        },
        audience: {
            url: '/api/audience/',
            port: 5003
        },
        web: {
            url: '/api/web/',
            port: 5002
        },
        social: {
            url: '/api/social/',
            port: 5004
        }
    },

    user: {
        authenticated: false
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * Setup the API and get ready for usage
     */
    init() {
        console.log('ENV: ', process.env);

        Vue.use(Resource);

        var rootUrl = process.env.VUE_APP_ROOT_URL
            ? process.env.VUE_APP_ROOT_URL
            : 'https://data.usagm.gov';

        if (window.location.host.search('localhost')) {
            rootUrl = process.env.VUE_APP_ROOT_URL
                ? process.env.VUE_APP_ROOT_URL
                : 'http://localhost';
        }

        console.log('ROOT: ', rootUrl);

        for (let key in API.rootUrls) {
            if (rootUrl.search('localhost') !== -1) {
                API.rootUrls[key].url =
                    rootUrl +
                    ':' +
                    API.rootUrls[key].port +
                    API.rootUrls[key].url;
            } else {
                API.rootUrls[key].url = rootUrl + API.rootUrls[key].url;
            }
        }

        console.log('API.rootUrls = ', API.rootUrls);
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    async getUser() {
        try {
            return await this.__send('get', 'user', '', null);
        } catch (err) {
<<<<<<< HEAD
            return null;
=======
            return null
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
        }
    },

    /**
     * Redirect user to the login.gov login page, which then redirects back
     * to the authentication page.
     * @see https://developers.login.gov/oidc/
     */
    login() {
        // Clear tokens
        this.setPreference('token', '');

        let CLIENT_ID =
            'urn:gov:gsa:openidconnect.profiles:sp:sso:usagm:opranalytics';
        let REDIRECT_URI = `${window.location.protocol}//${
            window.location.host
        }/authenticate`;

        // A unique value at least 32 characters in length used for maintaining state between the request and the callback.
        // This value will be returned to the client on a successful authorization.
        var state = uuidv5('https://data.usagm.com', uuidv5.URL);

        // A unique value at least 32 characters in length used to verify the integrity of the id_token and mitigate
        // replay attacks. This value should include per-session state and be unguessable by attackers. This value
        // will be present in the id_token of the token endpoint response, where clients will verify that the nonce
        // claim value is equal to the value of the nonce parameter sent in the authentication request. Read more
        // about nonce implementation in the spec.
        var nonce = uuidv5('https://data.usagm.com', uuidv5.URL);

        let opts = {
            acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
            client_id: CLIENT_ID,
            nonce: nonce,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: 'openid email profile:name',
            state: state
        };

        let url = `https://idp.int.identitysandbox.gov/openid_connect/authorize?${$.param(
            opts
        )}`;

        window.location = url;
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * Take a code given by the login.gov authentication page and exchange for a access token
     * which is used for hits to our API
     * @param {*} code
     */
    async register(code) {
<<<<<<< HEAD
        // TODO: Compare nonce, https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
=======

        // TODO: Compare nonce, https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes         
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
        let results = await this.__send('post', 'user', '', {
            code: code
        });

        console.log('REGISTER', results);

        if (!results.token) {
<<<<<<< HEAD
            return;
=======
            return
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
        }

        this.setPreference('token', results.token);

        if (results.user && results.user.email) {
<<<<<<< HEAD
            this.user = results.user;
            this.user.authenticated = true;
=======
            this.user = results.user
            this.user.authenticated = true
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
        }

        return results;
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    async logout() {
<<<<<<< HEAD
        var opts = {
            token: this.getPreference('token'),
            redirect: `${window.location.protocol}//${window.location.host}`
        };

        this.setPreference('token', null);
=======

        var opts = {
            token: this.getPreference('token'),
            redirect: `${window.location.protocol}//${window.location.host}`
        }

        this.setPreference('token', null)
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf

        await this.__send('delete', 'user', `?${$.param(opts)}`, null);
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    getPreference(name) {
<<<<<<< HEAD
        return localStorage.getItem(`opr-pref-${name}`);
=======
        return localStorage.getItem(`opr-pref-${name}`)
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    setPreference(name, value) {
<<<<<<< HEAD
        localStorage.setItem(`opr-pref-${name}`, value);
=======
        localStorage.setItem(`opr-pref-${name}`, value)
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Audience (analysis)
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async getTopTags(profileIdList, opts) {
        var merged = _.defaults(opts, {
            limit: 10,
            //type: 'topics',
            //range: 'last7days',
<<<<<<< HEAD
            profileIds: _.isArray(profileIdList)
                ? profileIdList.join(',')
                : profileIdList
        });
        return await this.__send(
            'get',
            'audience',
            `tag/rankings?${$.param(merged)}`,
            null
        );
=======
            profileIds: (_.isArray(profileIdList)) ? profileIdList.join(',') : profileIdList
        })
        return await this.__send('get', 'audience', `tag/rankings?${$.param(merged)}`, null);
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    async getContent(opts) {
        var merged = _.defaults(opts, {
            limit: 10
            //type: 'topics',
            //range: 'last7days',
        });
        return await this.__send(
            'get',
            'audience',
            `content?${$.param(merged)}`,
            null
        );
    },

    async getTags(opts) {
        var merged = _.defaults(opts, {
            limit: 10,
            type: 'topics'
            //range: 'last7days',
        });
        return await this.__send(
            'get',
            'audience',
            `tags?${$.param(merged)}`,
            null
        );
    },

<<<<<<< HEAD
=======
    //Get Tag Metrics Over Time

>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    async getTagsOverTime(opts) {
        var merged = _.defaults(opts, {
            tags: 'Art',
            range: 'last90days'
        });
        return await this.__send(
            'get',
            'audience',
            `tag/metrics?${$.param(merged)}`,
            null
        );
    },
<<<<<<< HEAD

=======
    
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    async getHosts(opts) {
        var merged = _.defaults(opts, {});
        return await this.__send(
            'get',
            'audience',
            `content/hosts?${$.param(merged)}`,
            null
        );
    },

    async getAuthors(opts) {
<<<<<<< HEAD
        var merged = _.defaults(opts, {});
        return await this.__send(
            'get',
            'audience',
            `content/authors?${$.param(merged)}`,
            null
        );
=======
        var merged = _.defaults(opts, {})
        return await this.__send('get', 'audience', `content/authors?${$.param(merged)}`, null);
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Social
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async getSocialProfiles() {
        return await this.__send('get', 'social', 'profiles', null);
    },

    async getSocialMetrics() {
        return await this.__send('get', 'social', 'metrics', null);
    },

    async getSocialProfileLabels() {
        return await this.__send('get', 'social', 'profile-labels', null);
    },

    /**
     * Get a list of posts (and post level metrics) for the given profile (use getSocialProfiles to get a list of profiles)
     * @param {string} profileId The profile id (see getSocialProfiles)
     * @param {object} opts The options, including;
     *     limit: Max number to get (for paging)
     *     skip: Specify how many to skip (for paging)
     *     projection: List of fields to get back, in csv list
     *     start: Start date
     *     end: End date
     */
    async getSocialProfilePosts(opts) {
<<<<<<< HEAD
        return await this.__send(
            'get',
            'social',
            `profiles/posts?${$.param(opts)}`,
            null
        );
=======
        return await this.__send('get', 'social', `profiles/posts?${$.param(opts)}`, null);
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    /**
     * Get a list of metrics. Note this result is not paged, as it contains mixed content
     * ideally use getSocialProfileMetricsByNetwork for speed and this supports projections (field selection)
     * @param {object} opts The options, including;
     *     proifleLabels: csv list of profile labels (see getSocialProfileLabels)
     *     start: Start date
     *     end: End date
     */
    async getSocialProfileMetrics(opts) {
<<<<<<< HEAD
        return await this.__send(
            'get',
            'social',
            `profiles/metrics?${$.param(opts)}`,
            null
        );
=======
        return await this.__send('get', 'social', `profiles/metrics?${$.param(opts)}`, null);
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    /**
     * Get a list of metrics by network
     * @param {object} opts The options, including;
     *     proifleLabels: csv list of profile labels (see getSocialProfileLabels)
     *     limit: Max number to get (for paging)
     *     skip: Specify how many to skip (for paging)
     *     proj: csv list of fields to get back, interactions_per_1000_fans (highly recommended for performence!)
     *     start: Start date
     *     end: End date
     */
    async getSocialProfileMetricsByNetwork(network, opts) {
<<<<<<< HEAD
        return await this.__send(
            'get',
            'social',
            `network/${network}/profiles/metrics?${$.param(opts)}`,
            null
        );
    },

    async getSocialProfileInteractionsByNetwork(network, opts) {
        return await this.__send(
            'get',
            'social',
            `network/${network}/profiles/interactions?${$.param(opts)}`,
            null
        );
=======
        return await this.__send('get', 'social', `network/${network}/profiles/metrics?${$.param(opts)}`, null);
    },

    async getSocialProfileInteractionsByNetwork(network, opts) {
        return await this.__send('get', 'social', `network/${network}/profiles/interactions?${$.param(opts)}`, null);
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
    },

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // WebTraffic
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * Get no of visits per network basis.
     * @param {object} opts The options, including;
     *     networkLabels: list of network labels
     *     start: Start date
     *     end: End date
     */
    async getNoOfVisits(opts) {
        return await this.__send('get', 'web', 'getNoOfVisits', opts);
    },

    async getNoOfVisitors(opts) {
        return await this.__send('get', 'web', 'getNoOfVisitors', opts);
    },

    async getMedium(opts) {
        return await this.__send('get', 'web', 'getMedium', opts);
    },

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // NLP
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async processText(opts) {
        return await this.__send('post', 'audience', 'analyze', opts);
    },

    async getSimilarPages(opts) {
        return await this.__send('post', 'nlp', 'similar', opts);
    },

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    //
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async __send(verb, service, path, opts) {
        let headers = {
            //    'x-opr-uid': localStorage.getItem('opr-uid'),
<<<<<<< HEAD
            Authorization: 'Bearer ' + this.getPreference('token')
        };
=======
            'Authorization': 'Bearer ' + this.getPreference('token')
        }
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf

        console.log(headers);
        let body = {};

        if (opts) {
<<<<<<< HEAD
            body = opts;
=======
            body = opts
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf
        }

        var finalUrl = this.rootUrls[service].url + path;

        console.log(`[${verb.toUpperCase()}][${service}] ${finalUrl}`);

        let errorCallback = function(response) {
            if (response.body && response.body.error) {
                console.error(
                    '[' + verb.toUpperCase() + '][' + service + '] ' + finalUrl,
                    opts,
                    headers,
                    response.body.error
                );
                return callback(response.body.error);
            } else {
                console.error(
                    '[' + verb.toUpperCase() + '][' + service + '] ' + finalUrl,
                    opts,
                    headers,
                    response.body
                );
                return callback(parseError(response.body));
            }
        };

<<<<<<< HEAD
        var response = null;
=======
        var response = null
>>>>>>> 39b4eadad0370042ea5d66d824ca7fca30409ccf

        try {
            if (verb == 'post') {
                response = await Vue.http.post(finalUrl, body, {
                    headers: headers
                });
            } else if (verb == 'put') {
                response = await Vue.http.put(finalUrl, body, {
                    headers: headers
                });
            } else if (verb == 'get') {
                response = await Vue.http.get(finalUrl, {
                    headers: headers
                });
            } else if (verb == 'delete') {
                response = await Vue.http.delete(finalUrl, {
                    headers: headers
                });
            }
        } catch (err) {
            console.error(
                `[${verb.toUpperCase()}][${service}] ${finalUrl}`,
                err
            );
            return null;
        }

        return response.body;
    }
};

API.init();

export default API;
