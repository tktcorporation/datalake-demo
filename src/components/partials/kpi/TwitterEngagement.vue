<template>
    <div>
        <div class="twitter-engagement card" 
            :class="{
                'text-white bg-success':avrgInteractionsPerPost >= threshold && totalPosts > postThrehold, 
                'text-white bg-warning':avrgInteractionsPerPost >= threshold && totalPosts <= postThrehold, 
                'text-white bg-warning':avrgInteractionsPerPost < threshold && totalPosts > postThrehold, 
                'text-white bg-danger':avrgInteractionsPerPost < threshold && totalPosts <= postThrehold}">

            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-twitter"></i> Engagement
                </h5>

                <div style="font-size:34px" class="p-0 m-0">
                    {{avrgInteractionsPerPost | humanNumber}}
                    <span class="target-text" title="Average interactions per post target">{{threshold | humanNumber}}</span>
                </div>

                <div style="font-size:17px">
                    {{totalPosts | humanNumber}} posts
                    <span class="target-text" style="font-size:10px" title="Post Target">{{postThrehold | humanNumber}}</span>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

import Vue from "vue"
import moment from "moment"
import API from '../../../api';
import _ from 'lodash'

export default {
    
    name: "twitter-engagement",

    props: {
        threshold: {
            type: Number,
            default: 0
        },
        postThrehold: {
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
    },

    data() {
        return {
            avrgInteractionsPerPost: 0,
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
            var proj = 'interactions, profile_tweets, date, profile_id'

            var data = await API.getSocialProfileMetricsByNetwork('twitter', {
                start: start,
                end: end,
                proj: proj,
                profileIds: this.profiles[0].profile_id
            })

            this.$log(`twitter ${this.profiles[0].profile_id}`, data)

            for (let i=0; i<data.results.length; i+=1){
                this.$set(this.totalsByDay, i, parseInt(data.results[i].interactions))
            }

            var totalInteractions =  _.sumBy(data.results, function(o){return parseInt(o.interactions)}) 
            this.totalPosts =  _.sumBy(data.results, function(o){return parseInt(o.profile_tweets)}) 

            this.$log(`totalInteractions = ${totalInteractions}, totalPosts = ${this.totalPosts}`)

            this.avrgInteractionsPerPost = (totalInteractions / this.totalPosts).toFixed(2)

        }   
    }

};
</script>


<style lang="scss">

.twitter-engagement {

    .bg-success {
        background-color: '#4A9470' !important;
    }

    .target-text {
        font-size: 12px;
        color: lightblue;
    }   

    .total-posts {
        font-size: 20px;
        color: lightblue;
    }
}
</style>
