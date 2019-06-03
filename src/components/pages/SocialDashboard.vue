<template>
  <div class="container" align="left">
    <!-- Selectors !-->
    <div class="row">
      <div class="col-md-6">
        <social-profile-selector></social-profile-selector>
      </div>
      <div class="col-md-3">
        <social-network-selector></social-network-selector>
      </div>
      <div class="col-md-3">
        <DateCalendar></DateCalendar>
      </div>
    </div>

    <!-- Tabs !-->
    <ul class="nav nav-tabs mt-3 mb-3">
      <li class="nav-item" v-for="(type, index) in nlpTypes" :key="index">
        <span
          class="nav-link capitalize"
          :class="{'active': selectedNlpType == type}"
          @click="onSelectedNlpType(type)"
        >{{type}}</span>
      </li>
    </ul>

    <!-- Bar Graph !-->
    <div class="row" v-for="(type, index) in nlpTypes" :key="index">
      <div class="col" v-show="selectedNlpType == type">
        <tag-performance-bar></tag-performance-bar>
      </div>
    </div>

    <!-- Line Charts !-->
    <div class="row mt-3">
      <div class="col">
        <!-- Comparing Networks !-->
        <SocialLineChart :id="1" class="h-100" NetworkOverTime="true"></SocialLineChart>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <!-- Comparing Topics !-->
        <SocialLineChart :id="2" class="h-100" TopicsOverTime="true"></SocialLineChart>
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
import SocialLineChart from '../partials/charts/SocialLineChart';
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector';
import SocialNetworkSelector from '../partials/selectors/SocialNetworkSelector';
import TagPerformanceBar from '../partials/charts/TagPerformanceBar';
import DonutNew from '../partials/charts/DonutNew.vue';
import DateCalendar from '../partials/selectors/DateCalendar.vue';

export default {
    name: 'social-dashboard',

    metaInfo: {
        title: 'social-dashboard'
    },

    components: {
        SocialProfileSelector,
        TagPerformanceBar,
        SocialLineChart,
        SocialNetworkSelector,
        DonutNew,
        DateCalendar
    },
    computed: {
        nlpTypes() {
            return this.$store.state.selectors.social.nlpTypes;
        },
        selectedNlpType() {
            return this.$store.state.selectors.social.selectedNlpType;
        }
    },
    methods: {
        onSelectedNlpType(type) {
            this.$store.commit('selectNlpType', type);
        }
    },

    mounted() {
        this.$store.dispatch('getTagData'),
            this.$store.watch(
                state => state.selectors.social.selectedProfileIds,
                () => {
                    this.$store.dispatch('getTagData');
                }
            ),
            this.$store.watch(
                state => state.selectors.social.selectedNetwork,
                () => {
                    this.$store.dispatch('getTagData');
                }
            ),
            this.$store.watch(
                state => state.selectors.social.selectedNlpType,
                () => {
                    this.$store.dispatch('getTagData');
                }
            ),
            this.$store.watch(
                state => state.selectors.social.dates,
                () => {
                    this.$store.dispatch('getTagData');
                }
            );
    }
};
</script>
