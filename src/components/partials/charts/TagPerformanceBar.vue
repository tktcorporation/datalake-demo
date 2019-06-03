<template>
  <div class="tag-performance-bar-chart card w-100 h-100">
    <div class="card-body">
      <span class="text-primary" style="font-size:24px" v-if="isLoading">
        <i class="fas fa-robot fa-spin ml-2"></i>
      </span>

      <div class="p-1 w-100 h-100" v-if="!isLoading">
        <!-- Each Row !-->
        <div class="row" v-for="tag in tagData" :key="tag.name">
          <div class="col-md-2">
            <!-- Label !-->
            <div
              class="tag-label"
              :title="`${tag.name}: facebook: ${tag.facebook_interactions}, twitter: ${tag.twitter_interactions}, youtube: ${tag.youtube_interactions}, instagram: ${tag.instagram_interactions}`"
            >
              <router-link
                class="tag-link"
                :to="{name:'content', query: { tag: tag.name, type: type, profileIds: profileIds }}"
              >{{tag.name}}</router-link>
            </div>
          </div>
          <!-- Social Medias !-->
          <div class="col-md-10">
            <div class="progress mt-1">
              <div
                v-if="!network || network=='facebook'"
                class="progress-bar bg-facebook"
                role="progressbar"
                :style="`width: ${tag.facebook_normalized}%`"
                :aria-valuenow="tag.facebook_normalized"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <i class="fab fa-facebook" v-if="tag.facebook_normalized">
                  <span class="ml-1">{{tag.facebook_interactions | humanNumber}}</span>
                </i>
              </div>

              <div
                v-if="!network || network=='twitter'"
                class="progress-bar bg-twitter"
                role="progressbar"
                :style="`width: ${tag.twitter_normalized}%`"
                :aria-valuenow="tag.twitter_normalized"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <i class="fab fa-twitter" v-if="tag.twitter_normalized">
                  <span class="ml-1">{{tag.twitter_interactions | humanNumber}}</span>
                </i>
              </div>

              <div
                v-if="!network || network=='youtube'"
                class="progress-bar bg-youtube"
                role="progressbar"
                :style="`width: ${tag.youtube_normalized}%`"
                :aria-valuenow="tag.youtube_normalized"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <i class="fab fa-youtube" v-if="tag.youtube_normalized">
                  <span class="ml-1">{{tag.youtube_interactions | humanNumber}}</span>
                </i>
              </div>

              <div
                v-if="!network || network=='instagram'"
                class="progress-bar bg-instagram"
                role="progressbar"
                :style="`width: ${tag.instagram_normalized}%`"
                :aria-valuenow="tag.instagram_normalized"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <i class="fab fa-instagram" v-if="tag.instagram_normalized">
                  <span class="ml-1">{{tag.instagram_interactions | humanNumber}}</span>
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @see https://github.com/apertureless/vue-chartjs
import _ from 'lodash';
import moment from 'moment';
import API from '../../../api';

export default {
    name: 'tag-performance-bar',
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        network() {
            return this.$store.state.selectors.social.selectedNetwork;
        },
        profileIds() {
            return this.$store.state.selectors.social.selectedProfileIds;
        },
        type() {
            return this.$store.state.selectors.social.selectedNlpType;
        },
        tagData() {
            return this.$store.getters.tagData;
        }
    },
    watch: {},
    mounted() {
        this.$store.watch(
            state => this.$store.getters.tagData,
            () => {
                this.$forceUpdate();
            }
        );
    }
};
</script>


<style lang="scss">
.tag-performance-bar-chart {
    .tag-link {
        display: inline-block;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        padding: 0px;
        max-width: 100%;
        text-overflow: ellipsis;
    }
}
</style>