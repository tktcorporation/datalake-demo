<template>
    <div style="height:500px; width: 500px">
        <canvas ref="canvas" width="100%" height="100%"></canvas>
    </div>
</template>

<script>

// D3 donut here; https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
// CSS https://vuejsexamples.com/lightweight-vue-component-for-drawing-pure-css-donut-charts/

// https://www.chartjs.org/docs/latest/charts/doughnut.html

import { PolarArea } from "vue-chartjs";
import Chart from 'chart.js'

export default {
    
    name: "polar-area",

    extends: PolarArea,

    components: {
        
    },

    data() {
        return {
        };
    },

    computed: {},

    mounted() {
        this.render()
    },

    methods: {

        render() {
            
            let colors = {
                'yellow': '#ffce56',
                'green': '#77dd77',
                'blue': '#36a2eb',
                'red': '#ff6384',
                'purple': '#cc65fe',
                'lightGray': '#eeeeee',
                'midGray': '#ababd5d5d5b',
                'gray': '#585858',
            }

            let data = {
                labels: ['Youtube', 'Facebook', 'Twitter', 'Instagram'],
                datasets: [
                    {
                        label: 'MBN',
					    borderColor: '#41B883',
					    backgroundColor: '#ffffff',
					    pointBackgroundColor: '#E46651',                        
                        //borderColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10],
                        //backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    }
                ],
            }

            let config = {
                legend: {
                    display: true
                },                                
                //fill: false, 
                backgroundColor: '#ffffff',
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
