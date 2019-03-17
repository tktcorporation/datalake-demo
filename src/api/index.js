import Vue from 'vue'
import notify from '../components/partials/utils/Notifications'
import router from '../router'
import Resource from 'vue-resource'
import _ from 'lodash'

const API = {

    rootUrls: {
        social: {url: '/social/', port:5003},
        content: {url: '/content/', port:5001}
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
                API.rootUrls[key].url = rootUrl + ':' + API.rootUrls[key].port + API.rootUrls[key].url
            }
            else {
                API.rootUrls[key].url = rootUrl + API.rootUrls[key].url                    
            }
        }

        console.log('API.rootUrls = ', API.rootUrls)
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

    async __send(verb, service, path, opts) {

        let headers = {
        //    'x-opr-uid': localStorage.getItem('opr-uid'),
        //    'Authorization': 'Bearer ' + localStorage.getItem('opr-token')            
        }

        let body = {}

        if (opts && opts.params){
            body = opts.params
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