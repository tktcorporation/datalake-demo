<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col">
                <usagm-network-selector @onSelectUsagmNetwork="onSelectNetwork"></usagm-network-selector>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col" style="height:450px">
                <web-line-chart :network-ids="selectedNetworkIds"></web-line-chart>
            </div>
        </div>

    </div>
    
</template>

<script>


import API from '../../api'
import Donut from '../partials/charts/Donut'
import PolarArea from '../partials/charts/PolarArea'
import WebLineChart from '../partials/charts/WebLineChart'
import UsagmNetworkSelector from '../partials/selectors/UsagmNetworkSelector'
import Promise from 'bluebird'

export default {
    
    name: "webtraffic-dashboard",

    metaInfo: {
        title: "webtraffic-dashboard"
    },

    components: {
        Donut,
        PolarArea,
        UsagmNetworkSelector,
        WebLineChart
    },

    data() {
        return {

            selectedNetworkIds: [],
            selectedNetwork: null,
            lastRefreshDate: null,
            queryOptions: null,
            networks: {
                'VOA': {name: 'voa', proj: 'visits', data: null, target: 700},
                'OCB': {name: 'ocb', proj: 'visits', data: null, target: 45},
                'RFE/RL': {name: 'rfe', proj: 'visits', data: null, target: 35},
                'RFA': {name: 'rfa', proj: 'visits', data: null, target: 400},
                'MBN': {name: 'mbn', proj: 'visits', data: null, target: 400}
            }            
        };
    },

    computed: {},

    mounted() {
        this.init()
    },

    methods: {

        init(){

        },

        async onSelectNetwork(networks){
            this.selectedNetworkIds = _.map(networks, 'id').join(',')
            this.queryOptions = {
                networkIds: this.selectedNetworkIds
            }
        }
    },

};
</script>


<style lang="scss">
</style>
