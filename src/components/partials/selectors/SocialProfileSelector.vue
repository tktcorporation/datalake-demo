<template>
  <div class="row">
    <div class="col">
      <multiselect
        v-model="selectedProfiles"
        label="name"
        class="social-profile-selector"
        deselect-label="Can't unselect social profile"
        track-by="id"
        :multiple="true"
        placeholder="Select a social profile"
        :options="profiles"
        :loading="isLoadingProfiles"
        @input="onSelectProfile"
        :searchable="true"
        :limit="3"
        @search-change="getProfiles"
        :allow-empty="true"
      >
        <template slot="singleLabel" slot-scope="props">
          <div class="option__desc">
            <div class="text-info user-list-text">
              <!--<span class="badge badge-info">{{props.option.network}}</span>-->
              <i :class="'fab fa-'+props.option.network"></i>
              {{props.option.name}}
            </div>
          </div>
        </template>

        <template slot="option" slot-scope="props">
          <img
            v-if="props.option.picture"
            class="rounded float-left user-list-image"
            :src="props.option.picture"
            :alt="props.option.name"
          >
          <img
            v-if="!props.option.picture"
            class="rounded float-left user-list-image"
            src="http://lorempixel.com/35/35"
            :alt="props.option.name"
          >

          <div class="option__desc">
            <div class="text-primary user-list-text">
              <!--<span class="badge badge-info">{{props.option.network}}</span>-->
              <i :class="'fab fa-'+props.option.network"></i>
              {{props.option.name}}
            </div>
            <div class="user-list-tags">
              <span
                v-for="(label, index) in props.option.profile_labels"
                :key="index"
                class="badge badge-light mr-1"
              >{{label}}</span>
            </div>
          </div>
        </template>
      </multiselect>
    </div>

    <div class="col">
      <multiselect
        v-model="selectedProfileLabels"
        class="social-profile-selector"
        deselect-label="Can't unselect label"
        :multiple="true"
        placeholder="Select a label"
        :options="profileLabels"
        :loading="isLoadingLabels"
        @input="onSelectLabel"
        :searchable="true"
        :allow-empty="true"
      >
        <template slot="singleLabel" slot-scope="props">
          <div class="option__desc">
            <span class="text-primary ml-1">{{props.option}}</span>
          </div>
        </template>

        <template slot="option" slot-scope="props">
          <div class="option__desc">
            <span class="text-primary ml-1">{{props.option}}</span>
          </div>
        </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
import API from '../../../api';
import Multiselect from 'vue-multiselect';
require('vue-multiselect/dist/vue-multiselect.min.css');

export default {
    name: 'social-profile-selector',

    data() {
        return {
            profiles: [],
            profileLabels: [],
            selectedProfiles: null,
            selectedProfileLabels: null,
            selectNetworks: null,
            isLoadingProfiles: false,
            isLoadingLabels: false
        };
    },

    components: {
        Multiselect
    },

    mounted() {
        this.getProfiles();
    },

    methods: {
        getProfiles(query) {
            this.isLoadingProfiles = true;
            this.isLoadingLabels = true;

            API.getSocialProfiles().then(profiles => {
                this.profiles = profiles;
                this.isLoadingProfiles = false;
            });

            API.getSocialProfileLabels().then(labels => {
                this.profileLabels = labels;
                this.isLoadingLabels = false;
            });
        },

        onSelectNetwork(network) {},

        onSelectLabel() {
            let newProfiles = [];
            for (let i = 0; i < this.profiles.length; i += 1) {
                let matches = _.intersection(
                    this.profiles[i].profile_labels,
                    this.selectedProfileLabels
                );
                if (matches.length > 0) {
                    newProfiles.push(this.profiles[i]);
                }
            }
            this.selectedProfiles = newProfiles;
            let selectedProfileIds = _.map(this.selectedProfiles, 'id').join(
                ','
            );
            this.$store.commit('selectSocialProfileIds', selectedProfileIds);
        },

        onSelectProfile() {
            this.$log('onSelectProfile');

            let selectedProfileIds = _.map(this.selectedProfiles, 'id').join(
                ','
            );
            this.$store.commit('selectSocialProfileIds', selectedProfileIds);
        }
    }
};
</script>

<style lang="scss">
.social-profile-selector {
    .user-image {
        width: 50px;
        max-height: 50px;
    }

    .user-list-image {
        width: 35px;
        max-height: 35px;
    }

    .user-list-tags {
        margin-left: 40px;
        font-size: 12px !important;
    }

    .user-list-text {
        margin-left: 40px;
    }

    .multiselect__option--highlight {
        background-color: lightblue;
    }
}
</style>
