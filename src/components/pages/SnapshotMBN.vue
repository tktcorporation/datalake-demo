<template>
    <div id="DashPage" class="container" align="left">

        <div class="row mt-5 pb-5">

            <div class="col">

                
                <facebook-reach 
                    :profiles="[alhurra.facebook]" 
                    :competitorProfiles="[aljazeera.facebook, bbc.facebook]" 
                    :threshold="10000">
                </facebook-reach>

                <!--
                <pre>{{facebook.tags}}</pre>
                    <pre>{{facebook.total}}</pre>
                    <pre>{{facebook.dataByProfile}}</pre>
                -->


            </div>
        </div>


    </div>
</template>

<script>

import Vue from "vue"
import moment from "moment"
import API from '../../api';
import FacebookReach from "../partials/kpi/FacebookReach"

export default {
    
    name: "snapshot-mbn",

    components: {
        FacebookReach
    },

    data() {
        return {
            alhurra: {
                facebook: '307323366135',
                youtube: 'UCTkMv4UVWC7bpnO1edsrB9A',
                twitter: '54296198',
                inastagram: '2043721559'
            },
            aljazeera: {
                facebook: '160729029892',
                youtube: 'UCfiwzLy-8yKzIbsmZTzxDgw',
                twitter: '5536782',
                inastagram: '447416451'
            },
            bbc: {
                facebook: '9432520138',
                youtube: null,
                twitter: '52032722',
                inastagram: '1599860099',
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
