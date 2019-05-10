<template>

    <div class="container" align="left" id="OnTimeRegistration">
      <div class="row">
         <div class="col-md-3">
           <author-selector></author-selector>
         </div>
        <div class="col-md-3">
           <host-selector></host-selector>
        </div>
        <div class="col-md-3">
           <usagm-network-selector></usagm-network-selector>
        </div>
      </div>  
      <br>
      <div class = "row" >
          <button type="button" class="btn btn-primary" @click="submitPreferences">Submit</button>
      </div>    
    </div>
</template>        


<script>

import API from '../../api';

import AuthorSelector from '../partials/selectors/AuthorSelector';
import HostSelector from '../partials/selectors/HostSelector';
import UsagmNetworkSelector from '../partials/selectors/UsagmNetworkSelector';
import Vue from "vue"

export default {
    
    name: "one-time-registration",

    metaInfo: {
        title: "OneTimeRegistration"
    },

    components: {
      AuthorSelector,
      HostSelector,
      UsagmNetworkSelector

    },

    data() {
        return {
        };
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    mounted() {},

    methods: {
        async submitPreferences() {
            console.log("I am in submit button");

        }

    }

};
</script>


<style lang="scss">

</style>
