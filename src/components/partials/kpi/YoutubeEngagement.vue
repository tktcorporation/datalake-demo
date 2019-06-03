<template>
    <div>
        <div class="youtube-engagement card" 
            :class="{'text-white bg-success':interactions > threshold, 'text-white bg-danger':interactions < threshold}">
            <!--<img src="/imgs/youtube-logo.png" class="card-img-top" alt="">-->
            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-youtube"></i> Engagement
                </h5>

                <div style="font-size:34px" class="p-0 m-0">
                    {{interactions | humanNumber}}
                    <span class="target-text" title="Average interactions per 1000 subscribers target">{{threshold | humanNumber}}</span>
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
    
    name: "youtube-engagement",

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
        }                      
    },

    components: {
        SparkLine
    },

    data() {
        return {
            interactions: 0,
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
            var proj = 'interactions_per_1000_subscribers, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('youtube', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.profiles[0].profile_id
            })

            this.$log(`youtube ${this.profiles[0].profile_id}`, data)

            for (let i=0; i<data.results.length; i+=1){
                this.$set(this.totalsByDay, i, parseInt(data.results[i].interactions_per_1000_subscribers))
            }

            this.interactions = (_.meanBy(data.results, 'interactions_per_1000_subscribers')).toFixed(2)

        }   
    }

};
</script>


<style lang="scss">

.youtube-engagement {

    .bg-success {
        background-color: '#4A9470' !important;
    }

    .target-text {
        font-size: 12px;
        color: lightblue;
    }   

}
</style>
