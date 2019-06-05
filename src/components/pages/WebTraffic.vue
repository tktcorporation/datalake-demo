<template>
  <div class="container" align="left" id="WebTrafficPage">
    <!-- Selectors !-->
    <div class="row mb-3">
      <div class="col">
        <host-selector @onSelect="onSelectHost"></host-selector>
      </div>
      <div class="col">
        <author-selector @onSelect="onSelectAuthor"></author-selector>
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

    <!-- Tabs !-->
    <div class="row mt-5">
      <div class="col">
        <h4>What topics are being read?</h4>
        <ul class="nav mt-3">
          <li class="nav-item" v-for="(type, index) in nlpTypes" :key="index">
            <span
              class="nav-link capitalize"
              :class="{'active':selectedNlpType == type}"
              @click="selectedNlpType = type"
            >{{type}}</span>
          </li>
        </ul>

        <!-- Bar Graph !-->
        <div v-for="(type, index) in nlpTypes" :key="index">
          <div v-show="selectedNlpType == type">
            <tag-performance-bar :profile-ids="selectedProfileIds" network="web" :type="type"></tag-performance-bar>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col">
        <h4>What articles are being read?</h4>

        <web-pages-table :pages="pages" v-if="pages"></web-pages-table>
      </div>
    </div>

    <!-- Pie Chart !-->
    <!-- <div class="row mt-3">
      <div class="col">
        <DonutNew v-if="this.selectedNlpType === 'categories'" class="h-100"></DonutNew>
      </div>
    </div>-->
  </div>
</template>



<script>
import API from '../../api';
import HostSelector from '../partials/selectors/HostSelector';
import AuthorSelector from '../partials/selectors/AuthorSelector';
import PolarArea from '../partials/charts/PolarArea';
import WebPagesTable from '../partials/tables/WebPagesTable';
import WebLineChart from '../partials/charts/WebLineChart';
import UsagmNetworkSelector from '../partials/selectors/UsagmNetworkSelector';
import Promise from 'bluebird';
import Datepicker from 'vuejs-datepicker';
import { dateToYear, dateToDay, dateBeautify } from '../../utils/DateFormatter';
import TagPerformanceBar from '../partials/charts/TagPerformanceBar';

export default {
    name: 'webtraffic-dashboard',

    metaInfo: {
        title: 'webtraffic-dashboard'
    },

    components: {
        AuthorSelector,
        HostSelector,
        UsagmNetworkSelector,
        WebLineChart,
        Datepicker,
        TagPerformanceBar,
        WebPagesTable
    },

    data() {
        return {
            selectedNlpType: 'topics',
            nlpTypes: ['topics', 'entities', 'categories'],
            selectedProfileIds: [],
            selectedNetworkIds: [],
            selectedNetwork: null,
            lastRefreshDate: null,
            queryOptions: null,
            showSettings: true,
            pages: null,
            periodStart: '',
            periodEnd: '',

            networks: {
                VOA: { name: 'voa', proj: 'visits', data: null, target: 700 },
                OCB: { name: 'ocb', proj: 'visits', data: null, target: 45 },
                'RFE/RL': {
                    name: 'rfe',
                    proj: 'visits',
                    data: null,
                    target: 35
                },
                RFA: { name: 'rfa', proj: 'visits', data: null, target: 400 },
                MBN: { name: 'mbn', proj: 'visits', data: null, target: 400 }
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
            return this.periodStart
                ? `${this._startDate}:${this._endDate}`
                : 'last-month';
        },
        formattedPeriod() {
            return this.periodStart
                ? `${dateBeautify(this._startDate)} - ${dateBeautify(
                      this._endDate
                  )}`
                : 'last-month';
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {},

        onSelectAuthor(authors) {},

        onSelectHost(hosts) {
            this.$set(this.selectedProfileIds, _.map(hosts, 'id'));
            this.$log('onSelectHost ', this.selectedProfileIds);
            this.doPageSearch();
        },

        toggleSettings() {
            this.showSettings = !this.showSettings;
            this.$ga.event({
                eventCategory: 'Settings',
                eventAction: 'toggle'
            });
        },

        async onSelectNetwork(networks) {
            //this.selectedNetworkIds = _.map(networks, 'id').join(',')

            this.queryOptions = {
                networkIds: this.selectedNetworkIds
            };
        },

        async doPageSearch() {
            var opts = {
                profileIds: this.selectedProfileIds,
                type: 'page'
            };

            this.$log('Search options', opts);

            var info = await API.getContent(opts);

            this.$log(info.results[0]);
            this.pages = info.results;
            this.pagesMeta = info.meta;
        }
    }
};
</script>

<style lang="scss">
#WebTrafficPage {
    .nav-item {
        color: #718ea4;
    }

    .nav-item .active {
        color: #123652;
    }
}
</style>














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

    // -->