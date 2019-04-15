<template>



    <div class="container" align="left">



        <div class="row">

            <div class="col">

                <usagm-network-selector @onSelectUsagmNetwork="onSelectNetwork"></usagm-network-selector>

            </div>
            <div class="Search__settings" v-if="showSettings" >
               <datepicker input-class="Search__input" placeholder="Start Date" v-model="periodStart" name="start-date"></datepicker>
               <datepicker input-class="Search__input" placeholder="End Date" v-model="periodEnd" name="end-date"></datepicker>
            </div>

        </div>

         <div class="Chart__title">
               <b> How many users are viewing? </b> <span>{{ formattedPeriod }}</span>
             <hr>
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

import Datepicker from 'vuejs-datepicker'
import { dateToYear, dateToDay, dateBeautify } from '../../utils/DateFormatter'



export default {

    

    name: "webtraffic-dashboard",



    metaInfo: {

        title: "webtraffic-dashboard"

    },



    components: {

        Donut,

        PolarArea,

        UsagmNetworkSelector,

        WebLineChart,
        Datepicker

    },



    data() {

        return {

            selectedNetworkIds: [],
            selectedNetwork: null,
            lastRefreshDate: null,
            queryOptions: null,
            showSettings: true,
            periodStart: '',
            periodEnd: new Date(),

            networks: {

                'VOA': {name: 'voa', proj: 'visits', data: null, target: 700},

                'OCB': {name: 'ocb', proj: 'visits', data: null, target: 45},

                'RFE/RL': {name: 'rfe', proj: 'visits', data: null, target: 35},

                'RFA': {name: 'rfa', proj: 'visits', data: null, target: 400},

                'MBN': {name: 'mbn', proj: 'visits', data: null, target: 400}

            }            

        };

    },



     computed: {
      _endDate () {
        return dateToDay(this.periodEnd)
      },
      _startDate () {
        return dateToDay(this.periodStart)
      },
      period () {
        return this.periodStart ? `${this._startDate}:${this._endDate}` : 'last-month'
      },
      formattedPeriod () {
        return this.periodStart ? `${dateBeautify(this._startDate)} - ${dateBeautify(this._endDate)}` : 'last-month'
      }
    },



    mounted() {

        this.init()

    },



    methods: {
        init(){

        },
        toggleSettings () {
        this.showSettings = !this.showSettings
        this.$ga.event({
          eventCategory: 'Settings',
          eventAction: 'toggle'
         })
        },
        async onSelectNetwork(networks){

            //this.selectedNetworkIds = _.map(networks, 'id').join(',')

            this.queryOptions = {

                networkIds: this.selectedNetworkIds

            }

        }

    },



};

</script>

<style lang="scss">

</style>