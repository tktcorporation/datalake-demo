<template>
    <div id="DashPage" class="container" align="left">

        <div class="row mt-5 pb-5">

            <div class="col">

                <!-- FACEBOOK ---->

                <div class='mt-5' v-if="!facebook">
                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>facebook</span></h4>
                    <i class="fas fa-robot fa-spin"></i>
                </div>

                <div class='' v-if="facebook">

                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>facebook</span></h4>

                    <p>
                        <i class="fab fa-facebook mr-1"></i>  <span class='text-info'>{{facebook.total.page_posts | humanNumber}}</span> posts, 
                        across <span class='text-info'>{{facebook.profileCount}}</span> pages.
                    </p>

                    <p>
                        <i class="fas fa-users mr-1"></i> <span class='text-info'>{{facebook.total.fans_change | humanNumber}}</span> 
                        new fans, for a total of <span class='text-info'>{{facebook.total.fans_lifetime | humanNumber}}</span> fans.
                    </p>                

                    <p>
                        <i class="fas fa-mouse-pointer mr-1"></i> <span class='text-info'>{{facebook.total.interactions | humanNumber}}</span> interactions
                    </p>                

                    <p>
                        <i class="far fa-thumbs-up mr-1"></i>
                        <span class='text-success'>{{facebook.topProfileByReach.name_en}}</span> is doing the best, 
                        <span v-if="facebook.topProfileByReach.fans_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{facebook.topProfileByReach.fans_change | humanNumber}}</span> fans.
                    </p>

                    <p>
                        <i class="far fa-thumbs-down mr-1"></i>
                        <span class='text-danger'>{{facebook.bottomProfileByReach.name_en}}</span> is doing the worst, 
                        <span v-if="facebook.bottomProfileByReach.fans_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{Math.abs(facebook.bottomProfileByReach.fans_change) | humanNumber}}</span> fans.

                    </p>

                    <div class="">
                        <i class="fas fa-tags mr-1"></i>Topics: 
                        <span class='text-info'>{{facebook.tags.join(', ')}}</span>
                    </div>

                    <div class="">
                        <i class="fas fa-city mr-1"></i>Entities:
                        <span class='text-info'>{{facebook.entities.join(', ')}}</span>
                        <!--
                        <span v-for="(tag, index) in facebook.tags" :key="index" class="badge badge-primary mr-1">
                            {{tag}} 
                        </span>
                        -->
                    </div>

                    <div class='mb-1 mt-3'>

                        <button v-if="!showDetails['facebook']" class="btn btn-sm btn-outline-secondary" @click="showDetails['facebook'] = true">show pages</button>
                        <button v-else class="tn btn-sm btn-secondary" @click="showDetails['facebook'] = false">hide pages</button>

                        <span v-if="facebook_competitor">
                            <button v-if="!showDetails['facebook_competitor']" class="btn btn-sm btn-outline-secondary ml-2" @click="showDetails['facebook_competitor'] = true">show competitor pages</button>
                            <button v-else class="tn btn-sm btn-secondary ml-2" @click="showDetails['facebook_competitor'] = false">hide competitor pages</button>
                        </span>
                    </div>

                    <div v-if="showDetails['facebook']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Posts', field: 'page_posts', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Change', field: 'fans_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Lifetime', field: 'fans_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Change Chart', field: 'fans_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="facebook.dataByProfile">
                        </sortable-table>
                    </div>

                    <div v-if="facebook_competitor && showDetails['facebook_competitor']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Posts', field: 'page_posts', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Change', field: 'fans_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Lifetime', field: 'fans_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Fans Change Chart', field: 'fans_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="facebook_competitor.dataByProfile">
                        </sortable-table>
                    </div>

                </div>



                <!-- TWITTER ---->
                
                <div class='mt-5' v-if="!twitter">
                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>twitter</span></h4>
                    <i class="fas fa-robot fa-spin"></i>
                </div>

                <div class='mt-5' v-if="twitter">

                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>twitter</span></h4>

                    <p>
                        <i class="fab fa-twitter mr-1"></i>  <span class='text-info'>{{twitter.total.profile_tweets | humanNumber}}</span> posts, 
                        across <span class='text-info'>{{twitter.profileCount}}</span> accounts.
                    </p>

                    <p>
                        <i class="fas fa-users mr-1"></i> <span class='text-info'>{{twitter.total.followers_change | humanNumber}}</span> new followers, 
                        for a total of <span class='text-info'>{{twitter.total.followers_lifetime | humanNumber}}</span> followers.
                    </p>                

                    <p>
                        <i class="fas fa-mouse-pointer mr-1"></i> <span class='text-info'>{{twitter.total.interactions | humanNumber}}</span> interactions
                    </p>  

                    <p>
                        <i class="far fa-thumbs-up mr-1"></i>
                        <span class='text-success'>{{twitter.topProfileByReach.name_en}}</span> is doing the best, 
                        <span v-if="twitter.topProfileByReach.followers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{twitter.topProfileByReach.followers_change | humanNumber}}</span> followers.
                    </p>

                    <p>
                        <i class="far fa-thumbs-down mr-1"></i>
                        <span class='text-danger'>{{twitter.bottomProfileByReach.name_en}}</span> is doing the worst, 
                        <span v-if="twitter.bottomProfileByReach.followers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{Math.abs(twitter.bottomProfileByReach.followers_change) | humanNumber}}</span> followers.

                    </p>

                    <div class="">
                        <i class="fas fa-tags mr-1"></i>Topics: 
                        <span class='text-info'>{{twitter.tags.join(', ')}}</span>
                    </div>

                    <div class="">
                        <i class="fas fa-city mr-1"></i>Entities:
                        <span class='text-info'>{{twitter.entities.join(', ')}}</span>
                        <!--
                        <span v-for="(tag, index) in facebook.tags" :key="index" class="badge badge-primary mr-1">
                            {{tag}} 
                        </span>
                        -->
                    </div>

                    <div class='mb-1 mt-3'>
                        <button v-if="!showDetails['twitter']" class="btn btn-sm btn-outline-secondary" @click="showDetails['twitter'] = true">show accounts</button>
                        <button v-else class="tn btn-sm btn-secondary" @click="showDetails['twitter'] = false">hide accounts</button>

                        <span v-if="twitter_competitor">
                            <button v-if="!showDetails['twitter_competitor']" class="btn btn-sm btn-outline-secondary ml-2" @click="showDetails['twitter_competitor'] = true">show competitor accounts</button>
                            <button v-else class="tn btn-sm btn-secondary ml-2" @click="showDetails['twitter_competitor'] = false">hide competitor accounts</button>
                        </span>

                    </div>

                    <div v-if="showDetails['twitter']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Tweets', field: 'profile_tweets', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change', field: 'followers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Lifetime', field: 'followers_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change Chart', field: 'followers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="twitter.dataByProfile">
                        </sortable-table>
                    </div>

                    <div v-if="twitter_competitor && showDetails['twitter_competitor']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Tweets', field: 'profile_tweets', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change', field: 'followers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Lifetime', field: 'followers_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change Chart', field: 'followers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="twitter_competitor.dataByProfile">
                        </sortable-table>
                    </div>

                </div>


                <!-- YOUTTUBE ---->
                
                <div class='mt-5' v-if="!instagram">
                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>youtube</span></h4>
                    <i class="fas fa-robot fa-spin"></i>
                </div>

                <div class='mt-5' v-if="youtube">

                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>youtube</span></h4>

                    <p>
                        <i class="fab fa-youtube mr-1"></i>  <span class='text-info'>{{youtube.total.video_change | humanNumber}}</span> posts, 
                        across <span class='text-info'>{{youtube.profileCount}}</span> pages.
                    </p>

                    <p>
                        <i class="fas fa-users mr-1"></i> <span class='text-info'>{{youtube.total.subscribers_change | humanNumber}}</span> new followers, 
                        for a total of <span class='text-info'>{{youtube.total.subscribers_count_lifetime | humanNumber}}</span> followers.
                    </p>                

                    <p>
                        <i class="far fa-thumbs-up mr-1"></i>
                        <span class='text-success'>{{youtube.topProfileByReach.name_en}}</span> is doing the best, 
                        <span v-if="youtube.topProfileByReach.subscribers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{youtube.topProfileByReach.subscribers_change | humanNumber}}</span> followers.
                    </p>

                    <p>
                        <i class="far fa-thumbs-down mr-1"></i>
                        <span class='text-danger'>{{youtube.bottomProfileByReach.name_en}}</span> is doing the worst, 
                        <span v-if="youtube.bottomProfileByReach.subscribers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{Math.abs(youtube.bottomProfileByReach.subscribers_change) | humanNumber}}</span> followers.

                    </p>

                    <div class='mb-1 mt-3'>
                        <button v-if="!showDetails['youtube']" class="btn btn-sm btn-outline-secondary" @click="showDetails['youtube'] = true">show accounts</button>
                        <button v-else class="tn btn-sm btn-secondary" @click="showDetails['youtube'] = false">hide accounts</button>

                        <span v-if="youtube_competitor">
                            <button v-if="!showDetails['youtube_competitor']" class="btn btn-sm btn-outline-secondary ml-2" @click="showDetails['youtube_competitor'] = true">show competitor accounts</button>
                            <button v-else class="tn btn-sm btn-secondary ml-2" @click="showDetails['youtube_competitor'] = false">hide competitor accounts</button>
                        </span>

                    </div>

                    <div v-if="showDetails['youtube']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Videos', field: 'video_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Change', field: 'subscribers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Lifetime', field: 'subscribers_count_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Change Chart', field: 'subscribers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="youtube.dataByProfile">
                        </sortable-table>
                    </div>

                    <div v-if="youtube_competitor && showDetails['youtube_competitor']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Videos', field: 'video_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Change', field: 'subscribers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Lifetime', field: 'subscribers_count_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Subscribers Change Chart', field: 'subscribers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="youtube_competitor.dataByProfile">
                        </sortable-table>
                    </div>
                    
                </div>


                <!-- INSTAGRAM ---->

                <div class='mt-5' v-if="!instagram">
                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>instagram</span></h4>
                    <i class="fas fa-robot fa-spin"></i>
                </div>

                <div class='mt-5' v-if="instagram">

                    <h4 class="mb-4">Over the last <span class='text-info'>{{noDays}}</span> days on <span class='text-info'>instagram</span></h4>

                    <p>
                        <i class="fab fa-instagram mr-1"></i>  <span class='text-info'>{{instagram.total.profile_posts | humanNumber}}</span> posts, 
                        across <span class='text-info'>{{instagram.profileCount}}</span> pages.
                    </p>

                    <p>
                        <i class="fas fa-users mr-1"></i> <span class='text-info'>{{instagram.total.followers_change | humanNumber}}</span> new followers, 
                        for a total of <span class='text-info'>{{instagram.total.followers_lifetime | humanNumber}}</span> followers.
                    </p>                

                    <p>
                        <i class="fas fa-mouse-pointer mr-1"></i> <span class='text-info'>{{instagram.total.interactions | humanNumber}}</span> interactions
                    </p>  

                    <p>
                        <i class="far fa-thumbs-up mr-1"></i>
                        <span class='text-success'>{{instagram.topProfileByReach.name_en}}</span> is doing the best, 
                        <span v-if="instagram.topProfileByReach.followers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{instagram.topProfileByReach.followers_change | humanNumber}}</span> followers.
                    </p>

                    <p>
                        <i class="far fa-thumbs-down mr-1"></i>
                        <span class='text-danger'>{{instagram.bottomProfileByReach.name_en}}</span> is doing the worst, 
                        <span v-if="instagram.bottomProfileByReach.followers_change<0">losing </span>
                        <span v-else>gaining </span>
                        <span class='text-info'>{{Math.abs(instagram.bottomProfileByReach.followers_change) | humanNumber}}</span> followers.

                    </p>

                    <div class='mb-1 mt-3'>
                        <button v-if="!showDetails['instagram']" class="btn btn-sm btn-outline-secondary" @click="showDetails['instagram'] = true">show accounts</button>
                        <button v-else class="tn btn-sm btn-secondary" @click="showDetails['instagram'] = false">hide accounts</button>

                        <span v-if="instagram_competitor">
                            <button v-if="!showDetails['instagram_competitor']" class="btn btn-sm btn-outline-secondary ml-2" @click="showDetails['instagram_competitor'] = true">show competitor accounts</button>
                            <button v-else class="tn btn-sm btn-secondary ml-2" @click="showDetails['instagram_competitor'] = false">hide competitor accounts</button>
                        </span>

                    </div>

                    <div v-if="showDetails['instagram']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Posts', field: 'profile_posts', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change', field: 'followers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Lifetime', field: 'followers_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change Chart', field: 'followers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="instagram.dataByProfile">
                        </sortable-table>
                    </div>

                    <div v-if="instagram_competitor && showDetails['instagram_competitor']" class="mt-3">
                        <sortable-table
                            :columns="[
                                {label:'', field: 'picture', slot: 'picture'},
                                {label:'Name', field: 'name_en', sortable: false, type: 'text'},
                                {label:'Posts', field: 'profile_posts', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change', field: 'followers_change', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Lifetime', field: 'followers_lifetime', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Interactions', field: 'interactions', sortable: true, type: 'number', formatFn: formatNumber},
                                {label:'Followers Change Chart', field: 'followers_change_over_time', sortable: true, type: 'sparkline'}
                            ]" 
                            :rows="instagram_competitor.dataByProfile">
                        </sortable-table>
                    </div>

                </div>

                <!--
                <pre>{{facebook.tags}}</pre>
                    <pre>{{facebook.total}}</pre>
                    <pre>{{facebook.dataByProfile}}</pre>
                -->


            </div>
        </div>


    </div>
</template>

<script>

import Vue from "vue"
import moment from "moment"
import API from '../../api';
import SortableTable from '../partials/tables/SortableTable';
import SparkLine from '../partials/charts/SparkLine';

export default {
    
    name: "home",

    metaInfo: {
        title: "Home"
    },

    components: {
        SortableTable,
        SparkLine
    },

    data() {
        return {
            facebook: null,
            twitter: null,
            youtube: null,
            instagram: null,
            facebook_competitor: null,
            twitter_competitor: null,
            youtube_competitor: null,
            instagram_competitor: null,
            showDetails: {
                facebook: false,
                youtube: false,
                twitter: false,
                instagram: false,
                facebook_competitor: false,
                twitter_competitor: false,
                youtube_competitor: false,
                instagram_competitor: false,
            },
            noDays: 30,
            dates: [],
            profiles: null,
            profilesHash: {},
            networkMeta: {
                'facebook': {
                    proj: 'fans_change, fans_lifetime, interactions, date, profile_id, page_posts',
                    reachField: 'fans_change',
                    engagementField: 'interactions'
                },
                'twitter': {
                    proj: 'followers_change, followers_lifetime, interactions, date, profile_id, profile_tweets',
                    reachField: 'followers_change',
                    engagementField: 'interactions'
                },
                'instagram': {
                    proj: 'followers_change, followers_lifetime, interactions, date, profile_id, profile_posts',
                    reachField: 'followers_change',
                    engagementField: 'interactions'
                },
                'youtube': {
                    proj: 'subscribers_change, subscribers_count_lifetime, views_change, date, profile_id, video_change',
                    reachField: 'subscribers_change',
                    engagementField: 'subscribers_count_lifetime'
                }                                
            }
            /*
            networks: {
                VOA: { name: 'voa', proj: 'visits', data: null, target: 700 },
                OCB: { name: 'ocb', proj: 'visits', data: null, target: 45 },
                'RFE/RL': {name: 'rfe', proj: 'visits', data: null, target: 35},
                RFA: { name: 'rfa', proj: 'visits', data: null, target: 400 },
                MBN: { name: 'mbn', proj: 'visits', data: null, target: 400 }
            } 
            */           
        };
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    mounted() {
        this.$nextTick(()=>{
            this.init()
        })
    },

    methods: {

        getFieldByDate(network, profile, field){
            var data = []
            if (!profile){
                data = _.map(this[network].dataByDate, 'fans_change')
            }
                this.$log('DATA = ', data, this[network].dataByDate)
            return data
        },

        formatNumber(number){
            if (!number) {
                return 0;
            }
            if (number < 1000) {
                return number;
            }
            var si = ['K', 'M', 'B', 'T', 'P', 'H'];
            var exp = Math.floor(Math.log(number) / Math.log(1000));
            var result = number / Math.pow(1000, exp);
            result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
            return result + si[exp - 1];
        },

        async prepare(network, isCompetitor){

            var profiles = null

            if (isCompetitor){
                profiles = _.filter(this.competitorProfiles, {network:network})
            }
            else {
                profiles = _.filter(this.profiles, {network:network})
            }

            this.$log(`${network} ${isCompetitor}`, profiles)

            var meta = this.networkMeta[network]

            var opts = {
                start: moment().subtract(this.noDays,'days').startOf('day').format('YYYY-MM-DD'),
                end: moment().endOf('day').format('YYYY-MM-DD'),
                proj: meta.proj,
                profileIds: _.map(profiles, 'id').join(','),
            }

            // {start: opts.start, end: opts.end, type:'topics', network: network}
            var tags = await API.getTopTags(opts.profileIds, {type:'topics', network: network, limit:5})
            var entities = await API.getTopTags(opts.profileIds, {type:'entities', network: network, limit:5})

            var res = await API.getSocialProfileMetricsByNetwork(network, opts)

            var data = res.results

            var dataByDate = {}
            var dataByProfile = {}
            var dataTotals = {}

            var fields = Object.keys(data[0])
            fields = _.without(fields, 'date', 'profile_id')

            // Setup totals
            for (let k=0; k<fields.length; k+=1){

                dataTotals[fields[k]] = 0

                for (let j=0; j<profiles.length; j+=1){
                    if (!dataByProfile[profiles[j].id]){
                        dataByProfile[profiles[j].id] = {}
                    }
                    dataByProfile[profiles[j].id][fields[k]] = 0

                    // Layer in meta data
                    dataByProfile[profiles[j].id].profile_id = profiles[j].id
                    dataByProfile[profiles[j].id].picture = this.profilesHash[profiles[j].id].picture
                    dataByProfile[profiles[j].id].name_en = this.profilesHash[profiles[j].id].name_en

                    dataByProfile[profiles[j].id][fields[k]+'_over_time'] = {}
                    
                }
            }

            for (let i=0; i<data.length; i+=1){

                if (!dataByDate[data[i].date]){
                    dataByDate[data[i].date] = {}
                    for (let k=0; k<fields.length; k+=1){
                        dataByDate[data[i].date][fields[k]] = 0
                    }
                }
                
                for (let k=0; k<fields.length; k+=1){
                    dataByDate[data[i].date][fields[k]] += parseInt(data[i][fields[k]])
                    dataTotals[fields[k]] += parseInt(data[i][fields[k]])
                    
                    dataByProfile[data[i].profile_id][fields[k]] += parseInt(data[i][fields[k]])
                    dataByProfile[data[i].profile_id][fields[k]+'_over_time'][data[i].date] = parseInt(data[i][fields[k]])
                }

            }

            dataByProfile = _.toArray(dataByProfile)
            dataByDate = _.toArray(dataByDate)

            var maxReach = -99999
            var minReach = 99999
            var topProfileByReach = null
            var bottomProfileByReach = null

            // Get best performing profile 
            // Get worst performing profile
            for (let i=0; i<dataByProfile.length; i+=1){
                
                if (dataByProfile[i][meta.reachField] > maxReach){
                    maxReach = dataByProfile[i][meta.reachField] 
                    topProfileByReach = dataByProfile[i]
                }

                if (dataByProfile[i][meta.reachField] < minReach){
                    minReach = dataByProfile[i][meta.reachField] 
                    bottomProfileByReach = dataByProfile[i]
                }
            }

            return {
                tags: _.map(tags, 'name'),
                entities: _.map(entities, 'name'),
                total:dataTotals, 
                dataByDate: dataByDate, 
                topProfileByReach: topProfileByReach,
                bottomProfileByReach: bottomProfileByReach,
                dataByProfile: dataByProfile, 
                profileCount: profiles.length
            }

            //this.facebook.profiles = res

            return 
        },

        async init(){
            
            this.$log('User preferences = ', this.user.preferences)

            let usagmNetwork = (this.user.preferences && this.user.preferences.usagmNetwork) ? this.user.preferences.usagmNetwork : 'MBN'
            
            this.profiles = await API.getSocialProfiles({
                usagmNetwork: usagmNetwork
            })

            this.competitorProfiles = await API.getSocialProfiles({
                profile_labels: usagmNetwork + ' Competitor'
            })

            // Generate profiles hash
            for (let i=0; i<this.profiles.length; i+=1){
                this.profilesHash[this.profiles[i].id] = this.profiles[i]
            }

            for (let i=0; i<this.competitorProfiles.length; i+=1){
                this.profilesHash[this.competitorProfiles[i].id] = this.competitorProfiles[i]
            }            

            // Calc days
            for (let i=this.noDays-1; i>=0; i-=1){
                this.dates[i] = moment().subtract(i,'days').startOf('day').format('YYYY-MM-DD')
            }


            //this.$log(opts)
            
            this.facebook = await this.prepare('facebook', false)
            this.twitter = await this.prepare('twitter', false)
            this.youtube = await this.prepare('youtube', false)
            this.instagram = await this.prepare('instagram', false)

            // Get competitor info
            this.facebook_competitor = await this.prepare('facebook', true)
            this.twitter_competitor = await this.prepare('twitter', true)
            this.youtube_competitor = await this.prepare('youtube', true)
            this.instagram_competitor = await this.prepare('instagram', true)

            this.$log(this.facebook)
        }
    }

};
</script>


<style lang="scss">

#DashPage {

    p {
        margin-bottom: 3px;
    }

    .user-list-image {
        width: 20px;
        max-height: 20px;
    }

    .user-list-tags {
        margin-left: 40px;
        font-size: 12px !important;
    }

}
</style>
