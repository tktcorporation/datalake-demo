import Vue from 'vue'
import Resource from 'vue-resource'
const uuidv5 = require('uuid/v5');

const API = {

    rootUrls: {
        user: {url: '/user/', port:5000},
        nlp: {url: '/nlp/', port:5001},
        audience: {url: '/audience/', port:5003},
        web: {url: '/web/', port:5002},
        social: {url: '/social/', port:5004}
    },
    
    user: {
        authenticated:false
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * Setup the API and get ready for usage
     */
    init() {

        console.log('ENV: ', process.env)

        Vue.use(Resource)
        
        var rootUrl = (process.env.VUE_APP_ROOT_URL) ? process.env.VUE_APP_ROOT_URL : 'https://data.usagm.gov/api'
        
        for (let key in API.rootUrls){       
            if (rootUrl.search('localhost') !== -1){
                API.rootUrls[key].url = rootUrl + ':' + API.rootUrls[key].port + '/api' + API.rootUrls[key].url
            }
            else {
                API.rootUrls[key].url = rootUrl + API.rootUrls[key].url                    
            }
        }

        console.log('API.rootUrls = ', API.rootUrls)
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    async getUser(){
        return await this.__send('get', 'user', '', null);
    },

    /**
     * Redirect user to the login.gov login page, which then redirects back
     * to the authentication page.
     * @see https://developers.login.gov/oidc/
     */
    login(){

        // Clear tokens
        this.setPreference('token', '')
        this.setPreference('id_token', '')

        let CLIENT_ID = 'urn:gov:gsa:openidconnect.profiles:sp:sso:usagm:opranalytics'
        let REDIRECT_URI = `${window.location.protocol}//${window.location.host}/authenticate`

        // A unique value at least 32 characters in length used for maintaining state between the request and the callback. 
        // This value will be returned to the client on a successful authorization.
        var state = uuidv5('https://data.usagm.com', uuidv5.URL)

        // A unique value at least 32 characters in length used to verify the integrity of the id_token and mitigate 
        // replay attacks. This value should include per-session state and be unguessable by attackers. This value 
        // will be present in the id_token of the token endpoint response, where clients will verify that the nonce 
        // claim value is equal to the value of the nonce parameter sent in the authentication request. Read more 
        // about nonce implementation in the spec.
        var nonce = uuidv5('https://data.usagm.com', uuidv5.URL)

        let opts = {
            acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
            client_id: CLIENT_ID,
            nonce: nonce,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: 'openid email profile:name',
            state: state
        }

        let url = `https://idp.int.identitysandbox.gov/openid_connect/authorize?${$.param(opts)}`

        window.location = url
    },

    /**
     * Take a code given by the login.gov authentication page and exchange for a access token
     * which is used for hits to our API
     * @param {*} code 
     */
    async register(code){
        
        let results = await this.__send('post', 'user', '', {code: code});
        
        console.log('REGISTERED', results)
        
        if (!results.token.access_token){
            return
        }

        this.setPreference('token', results.token.access_token)
        this.setPreference('id_token', results.token.id_token)

        if (results.user && results.user.email){
            this.user = results.user
            this.user.authenticated = true
        }

        return results
    },

    async logout(){        
        var opts = {
            idToken: this.getPreference('id_token'),
            redirect: `${window.location.protocol}//${window.location.host}`
        }
        await this.__send('delete', 'user', `?${$.param(opts)}`, null);
    },


    // ///////////////////////////////////////////////////////////////////////////////////////

    getPreference(name){
        return localStorage.getItem(`opr-pref-${name}`)
    },

    // ///////////////////////////////////////////////////////////////////////////////////////

    setPreference(name, value){
        localStorage.setItem(`opr-pref-${name}`, value)
    },
    
    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Social
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async getSocialProfiles(){
        return await this.__send('get', 'social', 'profiles', null);
    },

    async getSocialMetrics(){
        return await this.__send('get', 'social', 'metrics', null);
    },

    async getSocialProfileLabels(){
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
    async getSocialProfilePosts(opts){
        return await this.__send('get', 'social', `profiles/posts?${$.param(opts)}`, null);
    },

    /**
     * Get a list of metrics. Note this result is not paged, as it contains mixed content
     * ideally use getSocialProfileMetricsByNetwork for speed and this supports projections (field selection)
     * @param {object} opts The options, including; 
     *     proifleLabels: csv list of profile labels (see getSocialProfileLabels)
     *     start: Start date
     *     end: End date
     */    
    async getSocialProfileMetrics(opts){
        return await this.__send('get', 'social', `profiles/metrics?${$.param(opts)}`, null);
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
    async getSocialProfileMetricsByNetwork(network, opts){
        return await this.__send('get', 'social', `network/${network}/profiles/metrics?${$.param(opts)}`, null);
    },    

    async getSocialProfileInteractionsByNetwork(network, opts){
        return await this.__send('get', 'social', `network/${network}/profiles/interactions?${$.param(opts)}`, null);
    },    

    // ///////////////////////////////////////////////////////////////////////////////////////
    //
    // NLP
    //
    // ///////////////////////////////////////////////////////////////////////////////////////

    async processText(opts){
        return await this.__send('post', 'nlp', 'process-text', opts);
    },   

    async getSimilarPages(opts){
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
            'Authorization': 'Bearer ' + this.getPreference('token')          
        }

        console.log(headers)
        let body = {}

        if (opts){
            body = opts
        }

        var finalUrl = this.rootUrls[service].url + path

        console.log(`[${verb.toUpperCase()}][${service}] ${finalUrl}`)

        /*
        let parseError = function(body){
            if (body.result && body.result != 'ok'){ 
                return body.message
            }
            return body
        }
        
        let errorCallback = function(response){
            if (response.body && response.body.error) {
                console.error('[' + verb.toUpperCase() + '][' + service + '] ' + finalUrl, opts, headers, response.body.error)
                return callback(response.body.error)
            } else {
                console.error('[' + verb.toUpperCase() + '][' + service + '] ' + finalUrl, opts, headers, response.body)
                return callback(parseError(response.body))
            }
        }
        */

        
        var response = null

        try {
            if (verb == 'post'){
                response = await Vue.http.post(finalUrl, body, {headers:headers})          
            }
            else if (verb == 'put'){
                response = await Vue.http.put(finalUrl, body, {headers:headers})         
            }
            else if (verb == 'get'){
                response = await Vue.http.get(finalUrl, {headers:headers})   
            }
            else if (verb == 'delete'){
                response = await Vue.http.delete(finalUrl, {headers:headers})       
            }    
        }
        catch(err){
            console.error(`[${verb.toUpperCase()}][${service}] ${finalUrl}`, err)
            return null
        }

        return response.body
    }

}

API.init()

export default API