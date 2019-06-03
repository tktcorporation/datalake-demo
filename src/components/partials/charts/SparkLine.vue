<template>
    <div class="sparkline-minichart d-inline">
        <peity :type="'line'" :options="{ width: '100%' }" :data="chartData"></peity>
    </div>
</template>

<script>

import Peity from 'vue-peity'
import _ from 'lodash'

/**
 * @see http://benpickles.github.io/peity/
 */
export default {

	name: 'spark-line',

	components: {
        Peity
	},
    
    props: ['data'],

    /*
    mounted(){

        $(".line").peity("line", {
            fill: function(value) {
                return value > 0 ? "green" : "red"
            }
        })

    },
    */

    computed: {

        chartData () {
            
            var data = this.data

            if (!_.isArray(this.data)) {
                data = _.toArray(this.data);
            } 

            let tmp = []
            for (let i=0; i<data.length; i+=1){
                if (!_.isFinite(data[i])){
                    tmp.push(0)
                }
                else {
                    tmp.push(data[i])
                }
            }
            return tmp.toString()
        },

        max () {
            
            var data = this.data

            if (!_.isArray(this.data)) {
                data = _.toArray(this.data);
            } 

            return _.max(data)
        }        
    }

}
</script>


<style lang="scss">

</style>
