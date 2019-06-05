<template>
    <div>
        <div class="twitter-reach card w-100" :class="{'text-white bg-success':weekTotal > threshold, 'text-white bg-danger':weekTotal < threshold}">
            <!--<img src="/imgs/facebook-logo.png" class="card-img-top" alt="">-->
            <!--
            <div class="card-header" :class="{'text-white bg-success':weekTotal > threshold, 'text-white bg-danger':weekTotal < threshold}">Facebook Reach</div>
            -->
            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-twitter"></i> Twitter Reach
                </h5>
                
                <div style="font-size:34px">
                    {{weekTotal | humanNumber}}
                    <span class="target-text" title="Metric Target">{{threshold | humanNumber}}</span>
                </div>
            
                <spark-line :data="totalsByDay"></spark-line>

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
    
    name: "twitter-reach",

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
            weekTotal: 0,
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
            var proj = 'followers_change, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('twitter', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.profiles[0].profile_id
            })

            this.$log(`twitter ${this.profiles[0].profile_id}`, data)

            for (let i=0; i<data.results.length; i+=1){
                this.$set(this.totalsByDay, i, parseInt(data.results[i].followers_change))
            }

            this.weekTotal = _.sumBy(data.results, function(o){return parseInt(o.followers_change)})

        }   
    }

};
</script>


<style lang="scss">

.twitter-reach {

    .bg-success {
        background-color: '#4A9470' !important;
    }

    .target-text {
        font-size: 12px;
        color: lightblue;
    }

}
</style>
