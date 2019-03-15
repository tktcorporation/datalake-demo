<template>
    <div style="height:250px; width: 250px">
        <canvas ref="canvas" width="100%" height="100%"></canvas>
    </div>
</template>

<script>

// D3 donut here; https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
// CSS https://vuejsexamples.com/lightweight-vue-component-for-drawing-pure-css-donut-charts/

// https://www.chartjs.org/docs/latest/charts/doughnut.html

import { Doughnut } from "vue-chartjs";

export default {
    
    name: "donut",

    extends: Doughnut,

    components: {
        
    },

    data() {
        return {
            sections: [{ value: 25 }, { value: 25 }, { value: 25 }, { value: 25 }]
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
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        borderColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10],
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    }
                ],
            }

            let config = {
                legend: {
                    display: false
                },                
                
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
