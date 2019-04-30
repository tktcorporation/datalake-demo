<template>
  <div class="tag-performance-bar-chart card w-100 h-100">
    <div class="card-body">
      <span class="text-primary" style="font-size:24px" v-if="isLoading">
        <i class="fas fa-robot fa-spin ml-2"></i>
      </span>

      <div class="p-1 w-100 h-100" v-if="!isLoading">
        <div class="row" v-for="tag in tagData" :key="tag.name">
          <div class="col-md-2">
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
//import PleaseJS from "../../../utils/PleaseJS.js";
import API from '../../../api';
//var tinycolor = require("tinycolor2");

export default {
    name: 'tag-performance-bar',
    data() {
        return {
            isLoading: false,
            tagData: null
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
        }
    },
    watch: {
        network(val) {
            this.update();
        },

        profileIds(val) {
            this.update();
        }
    },

    mounted() {},

    methods: {
        update() {
            this.getTagData().then(() => {
                $(function() {
                    $('[data-toggle="popover"]').popover();
                });
            });
        },

        async getTagData() {
            this.$log('Getting tag data...');

            function parseNumber(val) {
                var val = parseInt(val);
                if (!_.isFinite(val)) {
                    return 0;
                }
                return val;
            }

            this.isLoading = true;

            this.tags = await API.getTopTags(this.profileIds, {
                type: this.type,
                network: this.network
            });
            this.isLoading = false;

            //var key = 'interactions'

            var max = -9999999;

            // Now normalize data
            for (let i = 0; i < this.tags.length; i += 1) {
                var val = parseNumber(this.tags[i].interactions);
                if (val > max) {
                    max = val;
                }
            }

            this.$log(this.tags);

            this.tagData = [];

            for (let i = 0; i < this.tags.length; i += 1) {
                this.tagData[i] = this.tags[i];

                this.tagData[i].facebook_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].facebook_interactions)) /
                        max
                );
                this.tagData[i].twitter_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].twitter_interactions)) / max
                );
                this.tagData[i].youtube_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].youtube_interactions)) / max
                );
                this.tagData[i].instagram_normalized = Math.round(
                    (100 * parseNumber(this.tags[i].instagram_interactions)) /
                        max
                );

                //this.$log('tag, fb = ', max, this.tags[i].twitter_interactions,  typeof this.tags[i].twitter_interactions, parseNumber(this.tags[i].twitter_interactions), this.tagData[i].twitter_normalized)
                //this.$log('tag, tw = ', max, this.tags[i].facebook_interactions,  typeof this.tags[i].facebook_interactions, parseNumber(this.tags[i].facebook_interactions), this.tagData[i].facebook_normalized)
            }
        }
    }
};
</script>


<style lang="scss">
.tag-performance-bar-chart {
    .tag-label {
    }

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