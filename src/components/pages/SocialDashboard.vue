<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col-md-6">
                <social-profile-selector @onSelectProfile="onSelectedProfiles"></social-profile-selector>
            </div>
            <div class="col-md-3">
                <social-network-selector @onSelectNetworks="onSelectedNetworks"></social-network-selector>
            </div>
            <div class="col-md-3">
                {{selectedNetwork}}
            </div>
        </div>

        <div class="row mt-3">
            <div class="col" style="height:450px">
                <tag-performance-bar :profile-ids="selectedProfileIds" :network="selectedNetwork" type='topics'></tag-performance-bar>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col" style="height:450px">
                <tag-performance-bar :profile-ids="selectedProfileIds" :network="selectedNetwork" type='categories'></tag-performance-bar>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col" style="height:450px">
                <tag-performance-bar :profile-ids="selectedProfileIds" :network="selectedNetwork" type='entities'></tag-performance-bar>
            </div>
        </div>

        <!--
        <div class="row mt-3">
            <div class="col" v-if="queryOptions" >
                <donut network='twitter' :target="networks.twitter.target" :options="queryOptions" :last-refresh="lastRefreshDate"></donut>
            </div>
            <div class="col" v-if="queryOptions">
                <donut network='youtube' :target="networks.youtube.target" :options="queryOptions" :last-refresh="lastRefreshDate"></donut>
            </div>
            <div class="col" v-if="queryOptions">
                <donut network='facebook' :target="networks.facebook.target" :options="queryOptions" :last-refresh="lastRefreshDate"></donut>
            </div>
            <div class="col" v-if="queryOptions">
                <donut network='instagram' :target="networks.instagram.target" :options="queryOptions" :last-refresh="lastRefreshDate"></donut>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col" style="height:450px" v-if="networks.twitter.data">
                <social-line-chart :network-data="networks" :last-refresh="lastRefreshDate" class="h-100"></social-line-chart>
            </div>
        </div>
        -->

    </div>
    
</template>

<script>


import API from '../../api'
import Donut from '../partials/charts/Donut'
import PolarArea from '../partials/charts/PolarArea'
import SocialLineChart from '../partials/charts/SocialLineChart'
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector'
import SocialNetworkSelector from '../partials/selectors/SocialNetworkSelector'
import Promise from 'bluebird'
import TagPerformanceBar from '../partials/charts/TagPerformanceBar'

export default {
    
    name: "social-dashboard",

    metaInfo: {
        title: "social-dashboard"
    },

    components: {
        Donut,
        PolarArea,
        SocialProfileSelector,
        TagPerformanceBar,
        SocialLineChart,
        SocialNetworkSelector
    },

    data() {
        return {
            selectedProfileIds: [],
            selectedNetwork: null,
            selectedProfile: null,
            lastRefreshDate: null,
            queryOptions: null,
            networks: {
                'facebook': {name: 'facebook', proj: 'interactions, date, page_posts', data: null, target: 700},
                'twitter': {name: 'twitter', proj: 'interactions, date, profile_activities', data: null, target: 45},
                'youtube': {name: 'youtube', proj: 'interaction_change, date', data: null, target: 35},
                'instagram': {name: 'instagram', proj: 'interactions, date', data: null, target: 400}
            }            
        };
    },

    computed: {},

    mounted() {
        this.init()
    },

    methods: {

        init(){

        },

        onSelectedNetworks(network){
            this.selectedNetwork = network
        },

        async onSelectedProfiles(profiles){
            
            this.selectedProfileIds = _.map(profiles, 'id').join(',')

            this.queryOptions = {
                //start: moment().subtract(30,'days').startOf('day'),
                //end: moment().endOf('day'),
                //profileLabels: labels.join(',')
                profileIds: this.selectedProfileIds,
            }

            if (this.selectedNetwork){
                this.queryOptions.network = this.selectedNetwork
            }

            //await Promise.all([bar(), bam(), bat()].map(handleRejection));

            /*
            await Promise.map(Object.keys(this.networks), async (name)=>{
                
                let network = this.networks[name]
                network.data = null

                let opts = _.clone(this.queryOptions)
                opts.proj = network.proj

                // {profileLabels: labels.join(','), proj: network.proj}

                let res = await API.getSocialProfileMetricsByNetwork(network.name, opts)
                
                //for (let k=0; k<res.results.length; k+=1){

                //}

                var final = []
                let grouped = _.groupBy(res.results, 'date')
                let days = Object.keys(grouped)

                for (let i=0; i<days.length; i+=1){

                    let group = grouped[days[i]]
                    let sum = 0

                    for (let k=0; k<group.length; k+=1){
                        
                        var val = 0

                        if (network.name != 'youtube'){
                            val = parseFloat(group[k].interactions)
                        }
                        else {
                            val = parseFloat(group[k].interactions_change)
                            
                        }

                        if (!_.isNaN(val)){
                            sum += val
                        }

                    }

                    final.push({
                        date: days[i],
                        interactions: sum,
                        network: network.name
                    })

                }

                this.networks[name].data = final

                this.$log(`Got data for ${network.name}`, this.networks[name].data)
            })

            this.lastRefreshDate = new Date()
            */

        }
    },

};
</script>


<style lang="scss">
</style>
