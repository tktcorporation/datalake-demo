<template>

    <div class="card pb-4" style="height:250px; width: 250px">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">
                <i :class="'fab fa-'+network"></i> Interactions per post
            </h6>
            <div class="p-1 w-100 h-100">
                <canvas ref="canvas" width="100%" height="100%"></canvas>
            </div>
        </div>
    </div>

</template>

<script>

// D3 donut here; https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
// CSS https://vuejsexamples.com/lightweight-vue-component-for-drawing-pure-css-donut-charts/

// https://www.chartjs.org/docs/latest/charts/doughnut.html

import { Doughnut } from "vue-chartjs";
import Chart from 'chart.js'
import PleaseJS from '../../../utils/PleaseJS.js'
import _ from "lodash";
var tinycolor = require("tinycolor2");
import API from '../../../api'

export default {
    
    name: "donut",

    extends: Doughnut,

    props: ['target', 'network', 'options', 'lastRefresh'],

    components: {
        
    },

    data() {
        return {
            networks: {
                'twitter': {color: '#1DA1F2'},
                'youtube': {color: '#c4302b'},
                'facebook': {color: '#3b5998'},
                'instagram': {color: '#405DE6'},
                'pinterest': {color: '#c8232c'}
            },
            labels: ['Interactions', 'Delta']
            //data: [40, 20, 80, 10]
        };
    },

    computed: {},

    watch: {
        lastRefresh(val){
            this.update()
        }    
    }, 

    mounted() {
        this.init()
        this.render()
    },

    methods: {

        init(){

            var draw = Chart.controllers.doughnut.prototype.draw;
            Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
            draw: function() {
                draw.apply(this, arguments);
                let ctx = this.chart.chart.ctx;
                let _fill = ctx.fill;
                ctx.fill = function() {
                    ctx.save();
                    ctx.shadowColor = 'gray';
                    ctx.shadowBlur = 10;
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    _fill.apply(this, arguments)
                    ctx.restore();
                }
            }
            });

        },

        async update() {

            this.$log('UPDATED!!!!')

            let data = await API.getSocialProfileInteractionsByNetwork(this.network, this.options)

            let ineteractionsPerPost = data.interactions / data.posts

            this.$log(data, ineteractionsPerPost)

            var delta = this.target - ineteractionsPerPost
            
            if (delta < 0){
                delta = 0
            }

            this.$data._chart.data.datasets[0].data = [ineteractionsPerPost, delta]
            this.$data._chart.update()
        
        },

        render() {
            
            var color = this.networks[this.network].color

            let data = {
                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: [color, '#000000'],
                        borderColor: [tinycolor(color).darken(10).toString(), '#444444'],
                        data: [0,this.target],
                    }
                ],
            }

            let config = {
                legend: {
                    display: false
                },                
                //layout: {
                //    padding: {
                //        left: 3,
                //        right: 3,
                //        top: 3,
                //        bottom: 3
                //    }
                //},                
                cutoutPercentage: 65, 
                fill: false, 
                responsive: true, 
                maintainAspectRatio: false
            }

            this.renderChart(data, config);            
        },
    }

};
</script>


<style lang="scss">
</style>
