<template>
    <div>

        <div class="facebook-reach card w-100 h-100">
            <!--<img src="/imgs/facebook-logo.png" class="card-img-top" alt="">-->
            <!--
            <div class="card-header" :class="{'text-white bg-success':followersDelta > threshold, 'text-white bg-danger':followersDelta < threshold}">Facebook Reach</div>
            -->
            <div class="card-body">
                
                <h5 class="card-title">
                    <i class="fab fa-facebook"></i> Facebook Performance
                </h5>
                
                <div style="width:100%; min-height:500px; height:100%">
                    <canvas ref="canvas" width="100%" height="100%"></canvas>
                </div>
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

// @see https://github.com/apertureless/vue-chartjs
//import VueCharts from "vue-chartjs";
import { Bar } from "vue-chartjs";
var tinycolor = require("tinycolor2");
import PleaseJS from '../../../utils/PleaseJS.js'

export default {
    
    name: "facebook-chart",

    extends: Bar,

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
            competitor: null
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

            var start = moment().subtract(6,'months').startOf('day').format('YYYY-MM-DD')
            var end =  moment().endOf('day').format('YYYY-MM-DD')
            var proj = 'fans_change, date, profile_id, interactions, page_posts'

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

            data = await API.getSocialProfileMetricsByNetwork('facebook', {
                start: start,
                end: end,
                proj: proj,
                //profileLabels: 'Al Jazeera, MBN Competitor',
                profileIds: this.competitorProfiles[0].profile_id
            })    

            this.competitor = data.results

            this.render()
        },

        render() {

            let profileHash = {}

            // Merge the profiles together

            for (let i=0; i<this.profiles.length; i+=1){
                profileHash[this.profiles[i].profile_id] = this.profiles[i]
                profileHash[this.profiles[i].profile_id].data = []
                profileHash[this.profiles[i].profile_id].data2 = []
            }

            for (let i=0; i<this.competitorProfiles.length; i+=1){
                profileHash[this.competitorProfiles[i].profile_id] = this.competitorProfiles[i]
                profileHash[this.competitorProfiles[i].profile_id].data = []
                profileHash[this.competitorProfiles[i].profile_id].data2 = []
            }

            // Now pull in the data

            for (let i=0; i<this.facebook.length; i+=1){

                profileHash[this.facebook[i].profile_id].data.push({
                    y: parseInt(this.facebook[i].fans_change), 
                    t: moment(this.facebook[i].date).toDate()
                })

                profileHash[this.facebook[i].profile_id].data2.push({
                    y: parseInt(this.facebook[i].interactions) / this.facebook[i].page_posts, 
                    t: moment(this.facebook[i].date).toDate()
                })

            }

            for (let i=0; i<this.competitor.length; i+=1){

                profileHash[this.competitor[i].profile_id].data.push({
                    y: parseInt(this.competitor[i].fans_change), 
                    t: moment(this.competitor[i].date).toDate()
                })

                profileHash[this.competitor[i].profile_id].data2.push({
                    y: parseInt(this.competitor[i].interactions) / this.facebook[i].page_posts, 
                    t: moment(this.competitor[i].date).toDate()
                })

            }





            var chartData = []
            profileHash = _.toArray(profileHash)
            var colors = PleaseJS.make_color({colors_returned: profileHash.length})

            this.$log(profileHash)
            for (let i=0; i<profileHash.length; i+=1){
                                
                chartData.push({
                    type: 'bar',
                    yAxisID: 'fans',
                    label: profileHash[i].name_en + ' (fans change)',
                    backgroundColor: tinycolor(colors[i]).darken(20).toString(),
                    borderColor: colors[i],
                    fill: false,
                    data: profileHash[i].data
                }) 

                chartData.push({
                    type: 'line',
                    yAxisID: 'interactions',
                    label: profileHash[i].name_en + ' (interactions)',
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    fill: false,
                    data: profileHash[i].data2
                })

            }

            this.$log('profileHash = ', profileHash)


            var opts = {
                fill: false, 
                responsive: true,
                maintainAspectRatio: false,                                
                display: false,
                scales: {
					xAxes: [{
						type: 'time',
						distribution: 'series',
						ticks: {
							source: 'data',
							autoSkip: true
						}
					}],
					yAxes: [
                        {
                            id: 'fans',
						    display: true,
                            position: 'left',
						    scaleLabel: {
							    display: true,
							    labelString: 'Fans change'
						    }
					    },
                        {
                            id: 'interactions',
						    display: true,
                            position: 'right',
						    scaleLabel: {
							    display: true,
							    labelString: 'Interactions per post'
						    }
					    }
                    ]
				}                
            }
            /*
            var opts = {
                fill: false, 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
					xAxes: [{
						type: 'time',
						distribution: 'series',
						ticks: {
							source: 'data',
							autoSkip: true
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '# of Visits'
						}
					}]
				}
            }
            */

            this.renderChart({datasets: chartData}, opts);            
            //this.update()
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
