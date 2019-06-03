<template>
    <div>
        <div class="facebook-reach card w-100" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">
            <!--<img src="/imgs/facebook-logo.png" class="card-img-top" alt="">-->
            <!--
            <div class="card-header" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">Facebook Reach</div>
            -->
            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-facebook"></i> Facebook Reach
                </h5>
                
                <div style="font-size:34px">
                    {{followersDelta | humanNumber}}
                </div>

                <spark-line :data="totalsByDay"></spark-line>

                <div class="small">{{profiles[0].name_en}}</div>
                <div class="small">{{competitorProfiles[0].name_en}}</div>
            </div>

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
    
    name: "web-reach",

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
            totalsByDay: []                
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
            this.$log('competitorProfiles = ', this.competitorProfiles)

            var start = moment().subtract(7,'days').startOf('day').format('YYYY-MM-DD')
            var end =  moment().endOf('day').format('YYYY-MM-DD')
            var proj = 'fans_change, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                //service: 'Alhurra',
                //profileIds: '122564647811810, 329109297156497, 1564096903845203, 307323366135, 899713046735048, 323744522607, 171214742923439, 111519887909, 833681326655058'
                profileIds: this.profiles[0].profile_id
            })

            this.$log('data = ', data)

            this.facebook = data.results
            this.facebook.totalsByDay = _.map(data.results, function(o){
                return parseInt(o.fans_change)
            })

            data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                //profileLabels: 'Al Jazeera, MBN Competitor',
                profileIds: this.competitorProfiles[0].profile_id
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

.facebook-reach {

    .bg-success {
        background-color: '#4A9470' !important;
    }

}
</style>
