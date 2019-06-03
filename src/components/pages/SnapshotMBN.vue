<template>
    <div id="DashPage" class="container" align="left">

        <div class="mt-5">

            <div class="card-columns">

                <facebook-reach 
                    :profiles="[alhurra.facebook]" 
                    :competitorProfiles="[aljazeera.facebook, bbc.facebook]" 
                    :noDays="noDays"
                    :threshold="10000">
                </facebook-reach>


                <youtube-reach 
                    :profiles="[alhurra.youtube]" 
                    :noDays="noDays"
                    :threshold="3000">
                </youtube-reach>


                <twitter-reach 
                    :profiles="[alhurra.twitter]" 
                    :noDays="noDays"
                    :threshold="5000">
                </twitter-reach>


                <instagram-reach 
                    :profiles="[alhurra.instagram]" 
                    :noDays="noDays"
                    :threshold="4000">
                </instagram-reach>

     

            <!--
            <div class="col">

                <web-reach 
                    :profiles="[alhurra.youtube]" 
                    :competitorProfiles="[aljazeera.youtube, bbc.youtube]" 
                    :threshold="10000">
                </web-reach>

            </div>  
            -->

                <facebook-engagement 
                    :profiles="[alhurra.facebook]" 
                    :noDays="noDays"
                    :threshold="700"
                    :postThrehold="350">
                </facebook-engagement>


                <youtube-engagement 
                    :profiles="[alhurra.youtube]" 
                    :noDays="noDays"
                    :threshold="35">
                </youtube-engagement>



                <twitter-engagement 
                    :profiles="[alhurra.twitter]" 
                    :noDays="noDays"
                    :threshold="45"
                    :postThrehold="350">
                </twitter-engagement>


                <instagram-engagement 
                    :profiles="[alhurra.instagram]" 
                    :noDays="noDays"
                    :threshold="400"
                    :postThrehold="300">
                </instagram-engagement>

            </div>


        </div>

        <div class="row mt-5 pb-5">
            <div class="col" style="height:500px">
                <facebook-chart 
                    :profiles="[alhurra.facebook]" 
                    :competitorProfiles="[aljazeera.facebook, bbc.facebook]">
                </facebook-chart>            
            </div>
        </div>

    </div>
</template>

<script>

import Vue from "vue"
import moment from "moment"
import API from '../../api';
import FacebookReach from "../partials/kpi/FacebookReach"
import YoutubeReach from "../partials/kpi/YoutubeReach"
import InstagramReach from "../partials/kpi/InstagramReach"
import TwitterReach from "../partials/kpi/TwitterReach"
import WebReach from "../partials/kpi/WebReach"

import FacebookEngagement from "../partials/kpi/FacebookEngagement"
import YoutubeEngagement from "../partials/kpi/YoutubeEngagement"
import InstagramEngagement from "../partials/kpi/InstagramEngagement"
import TwitterEngagement from "../partials/kpi/TwitterEngagement"

import FacebookChart from "../partials/kpi/FacebookChart"

export default {
    
    name: "snapshot-mbn",

    components: {

        FacebookEngagement,
        YoutubeEngagement,
        InstagramEngagement,
        TwitterEngagement,

        FacebookReach,
        YoutubeReach,
        InstagramReach,
        TwitterReach,
        FacebookChart,
        WebReach
    },

    data() {
        return {
            noDays: 7,
            alhurra: {
                facebook: {name: 'Alhurra قناة الحرة', name_en: 'Alhurra', profile_id: '307323366135'},
                youtube: {name: 'Alhurra Iraq - الحرة عراق', name_en: 'Alhurra Iraq', profile_id: 'UCTkMv4UVWC7bpnO1edsrB9A'},
                twitter: {name: 'الحرة عراق', name_en: 'Free Iraq', profile_id: '54296198'},
                instagram: {name: 'قناة الحرة |  Alhurra', name_en: 'Alhurra', profile_id: '2043721559'}
            },
            aljazeera: {
                facebook: {name: 'Al Jazeera Channel - قناة الجزيرة', name_en: 'Al Jazeera', profile_id: '160729029892'},
                youtube: {name: 'Al Jazeera Arabic قناة الجزيرة', name_en: 'Al Jazeera English', profile_id: 'UCfiwzLy-8yKzIbsmZTzxDgw'},
                twitter: {name: 'قناة الجزيرة', name_en: 'Al Jazeera', profile_id: '5536782'},
                instagram: {name: 'الجزيرة', name_en: 'The island', profile_id: '447416451'}
            },
            bbc: {
                facebook: {name: 'BBC News عربي', name_en: 'BBC News Arabic', profile_id: '9432520138'},
                youtube: null,
                twitter: {name: 'BBC News عربي', name_en: 'BBC News Arabic', profile_id: '52032722'},
                instagram: {name: 'BBC News عربي', name_en: 'BBC News Arabic', profile_id: '1599860099'}
            }
        };
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    mounted() {
    },

    methods: {

        init(){


        }
    }

};
</script>


<style lang="scss">

#DashPage {

    p {
        margin-bottom: 3px;
    }

    .user-list-image {
        width: 20px;
        max-height: 20px;
    }

    .user-list-tags {
        margin-left: 40px;
        font-size: 12px !important;
    }

}
</style>
