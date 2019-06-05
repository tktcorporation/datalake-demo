<template>
    <div>
        <div class="facebook-reach card" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">
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
                    <span class="target-text" title="Metric Target">{{threshold | humanNumber}}</span>
                </div>

                <spark-line :data="totalsByDay"></spark-line>

                <!--
                <div class="small">{{profiles[0].name_en}}</div>
                <div class="small">{{competitorProfiles[0].name_en}}</div>
                -->
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
    
    name: "facebook-reach",

    props: {
        threshold: {
            type: Number,
            default: 0
        },
        noDays: {
            type: Number,
            default: 7
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
            usagm: null,
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
            
            var start = moment().subtract(this.noDays,'days').startOf('day').format('YYYY-MM-DD')
            var end =  moment().endOf('day').format('YYYY-MM-DD')
            var proj = 'fans_change, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.profiles[0].profile_id
            })

            this.$log('data = ', data)

            this.usagm = data.results
            this.usagm.totalsByDay = _.map(data.results, function(o){
                return parseInt(o.fans_change)
            })

            data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.competitorProfiles[0].profile_id
            })    

            this.competitor = data.results
            this.competitor.totalsByDay = _.map(data.results, function(o){
                return parseInt(o.fans_change)
            })

            for (let i=0; i<this.usagm.totalsByDay.length; i+=1){
                this.$set(this.totalsByDay, i, this.usagm.totalsByDay[i] - this.competitor.totalsByDay[i])
            }

            this.followersDelta = _.sumBy(this.usagm, function(o){return parseInt(o.fans_change)}) - _.sumBy(this.competitor, function(o){return parseInt(o.fans_change)})

        }   
    }

};
</script>


<style lang="scss">

.facebook-reach {

    .bg-success {
        background-color: '#4A9470' !important;
    }

    .target-text {
        font-size: 12px;
        color: lightblue;
    }      

}
</style>
