<template>

    <div class="container" align="left">

    </div>
    
</template>

<script>


import API from '../../api'
import Donut from '../partials/charts/Donut'
import PolarArea from '../partials/charts/PolarArea'
import SocialLineChart from '../partials/charts/SocialLineChart'
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector'
import SocialNetworkSelector from '../partials/selectors/SocialNetworkSelector'
import Promise from 'bluebird'
import TagPerformanceBar from '../partials/charts/TagPerformanceBar'

export default {
    
    name: "content",

    metaInfo: {
        title: "content-search"
    },

    components: {

    },

    data() {
        return {          
        };
    },

    computed: {},

    mounted() {
        this.init()
    },

    methods: {

        init(){

        }

    },

};
</script>


<style lang="scss">
</style>
