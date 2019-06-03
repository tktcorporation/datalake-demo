<template>
    <div>
        <div class="facebook-reach card" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">
            <!--<img src="/imgs/facebook-logo.png" class="card-img-top" alt="">-->
            <!--
            <div class="card-header" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">Facebook Reach</div>
            -->
            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-instagram"></i> Instagram Reach
                </h5>
                
                <div style="font-size:34px">
                    {{followersDelta | humanNumber}}
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
    
    name: "instagram-reach",

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
            var proj = 'followers_change, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('instagram', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.profiles[0].profile_id
            })

            this.$log(`instagram ${this.profiles[0].profile_id}`, data)

            for (let i=0; i<data.results.length; i+=1){
                this.$set(this.totalsByDay, i, parseInt(data.results[i].followers_change))
            }

            this.followersDelta = _.sumBy(data.results, function(o){return parseInt(o.followers_change)}) 

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
