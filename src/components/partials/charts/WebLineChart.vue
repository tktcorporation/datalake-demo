<template>

    <div class="card w-100 h-100">
        <div class="card-body">
            <div class="p-1 w-100 h-100">
                {{lastRefresh}}
                <canvas ref="canvas" width="100%" height="100%"></canvas>
            </div>
        </div>
    </div>

</template>

<script>

// @see https://github.com/apertureless/vue-chartjs
//import VueCharts from "vue-chartjs";
import { Line } from "vue-chartjs";
import _ from "lodash";
import moment from "moment";
import PleaseJS from '../../../utils/PleaseJS.js'
var tinycolor = require("tinycolor2");

export default {
    
    name: "web-line-chart",

    extends: Line,
    
    props: ['networkData', 'lastRefresh'],
    
    data(){
        return {
            networks: {
                'VOA': {name: 'twitter', color: '#1DA1F2', index:0},
                'MBN': {name: 'youtube', color: '#c4302b', index:1},
                'RFE/RL': {name: 'facebook', color: '#3b5998', index:2},
                'RFA': {name: 'instagram', color: '#405DE6', index:3},
                'OCB': {name: 'pinterest', color: '#c8232c', index:4}
            },
            maxVal: -99999
        }
    },

    //computed: {
    //    chartData: function() {
    //        return this.votes;
    //    }
    //},

    watch: {
        lastRefresh(val){
            this.update()
        }    
    }, 

    mounted() {
        this.render()
    },

    methods: {
        
        update(){

            this.$log('CHART UPDATE', this.networkData)
            
            var chartData = this.$data._chart.data.datasets
            this.$data._chart.data.labels = []

            this.maxVal = -999999

            var keys = Object.keys(this.networkData)

            for (var i=0; i<keys.length; i+=1){
                
                let networkName = keys[i]
                var network = this.networks[networkName]
                let data = this.networkData[networkName].data
                
                chartData[network.index].data = []

                try {

                    var newData = []
                    
                    for (var k=0; k<data.length; k+=1){

                        let val =0 
                            val = data[k].interactions
                    
                        if (!val) {
                            val = 0
                        }

                        //this.$log(`${network.name}: ${val}, ${data[k].date}`)

                        //newData.push({y: val, x: data[k].date})
                        newData.push({y: val, t: moment(data[k].date).valueOf()})

                    }

                    this.$data._chart.data.labels[network.index] = network.name
                    chartData[network.index].data = newData

                }
                catch(err){
                    this.$log(err)
                }

                
                this.$log(network.name, newData)
                //this.$log(network.name, chartData[network.index].data)

            }

            this.$data._chart.update()
        },

        render() {

            var networkNames = Object.keys(this.networks)
            
            var chartData = []

            for (let i=0; i<networkNames.length; i+=1){
                
                let network = this.networks[networkNames[i]]
                
                chartData[network.index] = {
                    type: 'line',
                    label: networkNames[i],
                    backgroundColor: tinycolor(network.color).darken(10).toString(),
                    borderColor: network.color,
                    fill: false,
                    data: []
                }

            }

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

            this.renderChart({labels: networkNames, datasets: chartData}, opts);            
            //this.update()
        }
    }
    
};
</script>