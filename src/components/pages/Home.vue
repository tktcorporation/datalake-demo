<template>
    <div id="HomePage" class="container" align="left">

        <div class="row mt-5">
            <div class="col" v-if="facebook.dataByDate">
                <h4>What is happening on Facebook?</h4>

                <!--
                <div v-for="(data, index) in socialData.facebook" :key="index">

                    <img
                        v-if="profilesHash[data.profile_id].picture"
                        class="rounded float-left user-list-image"
                        :src="profilesHash[data.profile_id].picture"
                        :alt="profilesHash[data.profile_id].name"
                    >
                    <img
                        v-if="!profilesHash[data.profile_id].picture"
                        class="rounded float-left user-list-image"
                        src="http://lorempixel.com/35/35"
                        :alt="profilesHash[data.profile_id].name"
                    >

                    <i :class="'fab fa-'+profilesHash[data.profile_id].network"></i>

                    {{profilesHash[data.profile_id].name_en}}

                </div>
                -->

                <p>
                    Over the last <span class='text-info'>{{noDays}}</span> on <span class='text-info'>facebook</span>, there where <span class='text-info'>{{facebook.total.page_posts | humanNumber}}</span> posts, 
                    across <span class='text-info'>{{facebook.profileCount}}</span> profiles.
                    There were <span class='text-info'>{{facebook.total.fans_change | humanNumber}}</span> new fans
                    for a total of <span class='text-info'>{{facebook.total.fans_lifetime | humanNumber}}</span> fans.
                    <spark-line :data="getFieldByDate('facebook', null, 'fans_change')"></spark-line>
                </p>
                
                <p>
                    <span class='text-success font-weight-bold'>{{facebook.topProfileByReach.name_en}}</span> is doing the best
                    with <span class='text-info'>{{facebook.topProfileByReach.fans_change | humanNumber}}</span> new fans.

                    <span class='text-danger font-weight-bold'>{{facebook.bottomProfileByReach.name_en}}</span> is doing the worst
                    with <span class='text-info'>{{facebook.bottomProfileByReach.fans_change | humanNumber}}</span> new fans.
                </p>

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

                <pre>{{facebook.tags}}</pre>

                <!--
                    <pre>{{socialData.facebook}}</pre>
                    <pre>{{facebook.total}}</pre>
                    <pre>{{facebook.dataByProfile}}</pre>
                -->


            </div>
        </div>

        <div class="row mt-5">
            <div class="col">
                <h4>What topics are being read?</h4>
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
            noDays: 30,
            dates: [],
            profiles: null,
            profilesHash: {},
            networkMeta: {
                'facebook': {
                    proj: 'fans_change, fans_lifetime, interactions, date, profile_id, page_posts',
                    reachField: 'fans_change',
                    engagementField: 'interactions'
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

        async prepare(network, data){

            var profiles = _.filter(this.profiles, {network:network})
            var meta = this.networkMeta[network]

            var opts = {
                start: moment().subtract(this.noDays,'days').startOf('day').format('YYYY-MM-DD'),
                end: moment().endOf('day').format('YYYY-MM-DD'),
                proj: meta.proj,
                profileIds: _.map(profiles, 'id').join(','),
                type: 'topics'
            }

            var tags = await API.getTagsOverTime({type:'topics'})
            this.$log('TAGS: ', tags)

            var res = await API.getSocialProfileMetricsByNetwork('facebook', opts)

            var data = res.results

            var dataByDate = {}
            var dataByProfile = {}
            var dataTotals = {
                tags: _.map(tags, 'name')
            }

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


            this[network] = {
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

            this.profiles = await API.getSocialProfiles({
                usagmNetwork: (this.user.preferences && this.user.preferences.usagmNetwork) ? this.user.preferences.usagmNetwork : 'MBN'
            })

            // Generate profiles hash
            for (let i=0; i<this.profiles.length; i+=1){
                this.profilesHash[this.profiles[i].id] = this.profiles[i]
            }

            // Calc days
            for (let i=this.noDays-1; i>=0; i-=1){
                this.dates[i] = moment().subtract(i,'days').startOf('day').format('YYYY-MM-DD')
            }


            //this.$log(opts)
            
            await this.prepare('facebook')

            this.$log(this.facebook)
        }
    }

};
</script>


<style lang="scss">

#HomePage {

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
