<template>
  <div class="container" align="left">
    <div class="row">
      <div class="col-md-6">
        <social-profile-selector></social-profile-selector>
      </div>
      <div class="col-md-3">
        <social-network-selector></social-network-selector>
      </div>
    </div>

    <ul class="nav nav-tabs mt-3 mb-3">
      <li class="nav-item" v-for="(type, index) in nlpTypes" :key="index">
        <span
          class="nav-link capitalize"
          :class="{'active': selectedNlpType == type}"
          @click="onSelectedNlpType(type)"
        >{{type}}</span>
      </li>
    </ul>

    <div class="row" v-for="(type, index) in nlpTypes" :key="index">
      <div class="col" v-show="selectedNlpType == type">
        <tag-performance-bar></tag-performance-bar>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <SocialLineChart
          :profile-ids="selectedProfileIds"
          :network="selectedNetwork"
          :type="selectedNlpType"
          :network-data="networks"
          class="h-100"
        ></SocialLineChart>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <DonutNew class="h-100"></DonutNew>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../api';
import SocialLineChart from '../partials/charts/SocialLineChart';
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector';
import SocialNetworkSelector from '../partials/selectors/SocialNetworkSelector';
import TagPerformanceBar from '../partials/charts/TagPerformanceBar';
import DonutNew from '../partials/charts/DonutNew.vue';

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
        DonutNew
    },
    computed: {
        nlpTypes() {
            return this.$store.state.selectors.social.nlpTypes;
        },
        selectedNlpType() {
            return this.$store.state.selectors.social.selectedNlpType;
        }
    },

    data() {
        return {
            selectedProfileIds: [],
            // lastRefreshDate: null,
            // queryOptions: null,
            // selectedNlpType: 'topics',
            // nlpTypes: ['topics', 'entities', 'categories'],
            networks: {
                facebook: {
                    name: 'facebook',
                    proj: 'interactions, date, page_posts',
                    data: null,
                    target: 700
                },
                twitter: {
                    name: 'twitter',
                    proj: 'interactions, date, profile_activities',
                    data: null,
                    target: 45
                },
                youtube: {
                    name: 'youtube',
                    proj: 'interaction_change, date',
                    data: null,
                    target: 35
                },
                instagram: {
                    name: 'instagram',
                    proj: 'interactions, date',
                    data: null,
                    target: 400
                }
            }
        };
    },

    methods: {
        onSelectedNlpType(type) {
            this.$store.commit('selectNlpType', type);
        }
    }
};
</script>


<style lang="scss">
</style>
