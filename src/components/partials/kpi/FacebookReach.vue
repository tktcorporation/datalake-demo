<template>
    <div class="card" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}" style="width: 18rem;">
        <!--<img src="/imgs/facebook-logo.png" class="card-img-top" alt="">-->
        <div class="card-header">Facebook Reach</div>
        <div class="card-body">
            <!--<h5 class="card-title">Facebook Reach</h5>-->
            <div style="font-size:34px">
                {{followersDelta | humanNumber}}
            </div>
            <spark-line :data="totalsByDay"></spark-line>
        </div>
    </div>
</template>

<script>

import Vue from "vue"
import moment from "moment"
import API from '../../../api';
import SparkLine from '../charts/SparkLine';
import _ from 'lodash'

export default {
    
    name: "facebook-reach",

    props: {
        threshold: {
            type: Number,
            default: 0
        },
        profiles: {
            type: Array,
            default: null
        },
        competitorProfiles: {
            type: Array,
            default: null
        }                        
    },

    components: {
        SparkLine
    },

    data() {
        return {
            facebook: null,
            competitor: null,
            followersDelta: 0,
            totalsByDay: [],
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

        async init(){
            
            this.$log('profiles = ', this.profiles)

            var meta = this.networkMeta['facebook']
            var start = moment().subtract(7,'days').startOf('day').format('YYYY-MM-DD')
            var end =  moment().endOf('day').format('YYYY-MM-DD')
            var proj = 'fans_change, date'

            var data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                //service: 'Alhurra',
                //profileIds: '122564647811810, 329109297156497, 1564096903845203, 307323366135, 899713046735048, 323744522607, 171214742923439, 111519887909, 833681326655058'
                profileIds: this.profiles.join(',')
            })

            this.facebook = data.results
            this.facebook.totalsByDay = _.map(data.results, function(o){
                return parseInt(o.fans_change)
            })

            data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                //profileLabels: 'Al Jazeera, MBN Competitor',
                profileIds: this.competitorProfiles[0]
            })    

            this.competitor = data.results
            this.competitor.totalsByDay = _.map(data.results, function(o){
                return parseInt(o.fans_change)
            })

            for (let i=0; i<this.facebook.totalsByDay.length; i+=1){
                this.$set(this.totalsByDay, i, this.facebook.totalsByDay[i] - this.competitor.totalsByDay[i])
                //this.totalsByDay[i] = this.facebook.totalsByDay[i] - this.competitor.totalsByDay[i]
                //this.$log(`${i}: ${this.totalsByDay[i]} = ${this.facebook.totalsByDay[i]} - ${this.competitor.totalsByDay[i]}`)
            }

            //this.facebook.fansChangeWeekly = _.sumBy(this.facebook, function(o){return parseInt(o.fans_change)})
            //this.competitor.fansChangeWeekly = _.sumBy(this.competitor, function(o){return parseInt(o.fans_change)})
            this.followersDelta = _.sumBy(this.facebook, function(o){return parseInt(o.fans_change)}) - _.sumBy(this.competitor, function(o){return parseInt(o.fans_change)})

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
