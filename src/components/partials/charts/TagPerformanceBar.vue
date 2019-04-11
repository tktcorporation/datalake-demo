<template>

    <div class="card w-100 h-100">
        <div class="card-body">

            <span class="text-primary" style="font-size:24px" v-if="isLoading">
                <i class="fas fa-robot fa-spin ml-2"></i>
            </span>

            <div class="p-1 w-100 h-100" v-if="!isLoading">
                <canvas ref="canvas" width="100%" height="100%"></canvas>
            </div>
        </div>
    </div>

</template>

<script>

// @see https://github.com/apertureless/vue-chartjs
//import VueCharts from "vue-chartjs";
import { HorizontalBar } from "vue-chartjs";
import _ from "lodash";
import moment from "moment";
import PleaseJS from '../../../utils/PleaseJS.js'
import API from '../../../api'
var tinycolor = require("tinycolor2");

export default {
    
    name: "tag-performance-bar",

    extends: HorizontalBar,
    
    props: ['profileIds','type'],
    
    data(){
        return {
            isLoading: false
        }
    },

    //computed: {
    //    chartData: function() {
    //        return this.votes;
    //    }
    //},

    watch: {
        profileIds(val){
            this.getTagData().then(()=>{
                this.render()
            })
        }    
    }, 

    mounted() {
        //this.render()
    },

    methods: {
        
        async getTagData(){
            this.isLoading = true
            this.tags = await API.getTopTags(this.profileIds, {type:this.type})
            this.$log('tags = ', this.tags.length)
            this.isLoading = false
        },

        update(){

            this.$log('CHART UPDATE', this.tags)
            
            var chartData = this.$data._chart.data.datasets[0].data
            this.$data._chart.data.labels = []

            //this.$data._chart.data.labels[i] = this.tags[i].name

            for (var i=0; i<this.tags.length; i+=1){                                
                var tag = this.tags[i]
                //chartData.push(tag.interactions)                
                chartData.push(Math.random()*100)                
            }

            this.$log('chartData = ', chartData)
            this.$data._chart.update()
        },

        render() {

            var colors = PleaseJS.make_color()
            
            var chartData = [{
                type: 'horizontalBar',
                label: `Top ${this.type}`,
                backgroundColor: tinycolor(colors[0]).darken(10).toString(),
                borderColor: colors[0],
                borderWidth: 1,
                //fill: true,
                data: []
                //data: [_.map(this.tags, (o)=>{return parseInt(o.interactions)})]
                //data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt() ]
            }]

            for (let i=0; i<this.tags.length; i+=1){
                this.$log(this.tags[i])
                chartData[0].data.push(this.tags[i].interactions)
            }

            this.$log(`${this.type} DATA:`, chartData[0].data)

            var opts = {
                //fill: false, 
                responsive: true, 
                maintainAspectRatio: false
            }

            this.renderChart({labels: _.map(this.tags, 'name'), datasets: chartData}, opts);            
            //this.update()
        },

        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }        
    }
    
};
</script>