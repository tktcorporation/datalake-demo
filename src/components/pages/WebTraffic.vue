<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col">
                <host-selector></host-selector>
            </div>
            <div class="col">
                <datepicker
                    input-class="form-control"
                    placeholder="Start Date"
                    v-model="periodStart"
                    name="start-date"
                ></datepicker>
            </div>
            <div class="col">
                <datepicker
                    input-class="form-control"
                    placeholder="End Date"
                    v-model="periodEnd"
                    name="start-date"
                ></datepicker>
            </div>            
        </div>
        
        {{periodStart}}
        {{periodEnd}}

        <ul class="nav nav-tabs mt-3 mb-3">
            <li
                class="nav-item"
                v-for="(type, index) in nlpTypes"
                :key="index"
            >
                <span
                    class="nav-link capitalize"
                    :class="{'active':selectedNlpType == type}"
                    @click="selectedNlpType = type"
                >{{type}}</span>
            </li>
        </ul>
        
        <div class="row" v-for="(type, index) in nlpTypes" :key="index">
            <div class="col" v-show="selectedNlpType == type">
                <tag-performance-bar
                    :profile-ids="selectedProfileIds"
                    :network="selectedNetwork"
                    :type="type"
                ></tag-performance-bar>
            </div>
        </div>

<!--
        <div class="row">

            <div class="col">

                <usagm-network-selector @onSelectUsagmNetwork="onSelectNetwork"></usagm-network-selector>

            </div>
            <div
                class="Search__settings"
                v-if="showSettings"
            >

                <datepicker
                    input-class="Search__input"
                    placeholder="Start Date"
                    v-model="periodStart"
                    name="start-date"
                ></datepicker>

                <datepicker
                    input-class="Search__input"
                    placeholder="End Date"
                    v-model="periodEnd"
                    name="end-date"
                ></datepicker>

            </div>

        </div>

        <div class="Chart__title">
            <b> How many users are viewing? </b> <span>{{ formattedPeriod }}</span>
            <hr>
        </div>

        <div class="row mt-3">
            <div
                class="col"
                style="height:450px"
            >
                <web-line-chart :network-ids="selectedNetworkIds"></web-line-chart>
            </div>
        </div>

        -->

    </div>

</template>



<script>
import API from "../../api";
import HostSelector from "../partials/selectors/HostSelector";
import PolarArea from "../partials/charts/PolarArea";
import WebLineChart from "../partials/charts/WebLineChart";
import UsagmNetworkSelector from "../partials/selectors/UsagmNetworkSelector";
import Promise from "bluebird";
import Datepicker from "vuejs-datepicker";
import { dateToYear, dateToDay, dateBeautify } from "../../utils/DateFormatter";
import TagPerformanceBar from "../partials/charts/TagPerformanceBar";

export default {
    name: "webtraffic-dashboard",

    metaInfo: {
        title: "webtraffic-dashboard"
    },

    components: {
        HostSelector,
        UsagmNetworkSelector,
        WebLineChart,
        Datepicker,
        TagPerformanceBar
    },

    data() {
        return {
            selectedNlpType: "topics",
            nlpTypes: ["topics", "entities", "categories"],
            selectedNetworkIds: [],
            selectedNetwork: null,
            lastRefreshDate: null,
            queryOptions: null,
            showSettings: true,
            periodStart: "",
            periodEnd: "",

            networks: {
                VOA: { name: "voa", proj: "visits", data: null, target: 700 },
                OCB: { name: "ocb", proj: "visits", data: null, target: 45 },
                "RFE/RL": {
                    name: "rfe",
                    proj: "visits",
                    data: null,
                    target: 35
                },
                RFA: { name: "rfa", proj: "visits", data: null, target: 400 },
                MBN: { name: "mbn", proj: "visits", data: null, target: 400 }
            }
        };
    },

    computed: {
        _endDate() {
            return dateToDay(this.periodEnd);
        },
        _startDate() {
            return dateToDay(this.periodStart);
        },
        period() {
            return this.periodStart ? `${this._startDate}:${this._endDate}` : "last-month";
        },
        formattedPeriod() {
            return this.periodStart ? `${dateBeautify(this._startDate)} - ${dateBeautify(this._endDate)}` : "last-month";
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        
        init() {},
        
        toggleSettings() {
            this.showSettings = !this.showSettings;
            this.$ga.event({
                eventCategory: "Settings",
                eventAction: "toggle"
            });
        },

        async onSelectNetwork(networks) {
            //this.selectedNetworkIds = _.map(networks, 'id').join(',')

            this.queryOptions = {
                networkIds: this.selectedNetworkIds
            };
        }
    }
};
</script>

<style lang="scss">
</style>