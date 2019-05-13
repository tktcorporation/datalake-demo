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
          <button type="button" class="btn btn-primary" @click="onSubmitPreferences">Submit</button>
      </div>    
    </div>
</template>        


<script>

import API from '../../api';

import AuthorSelector from '../partials/selectors/AuthorSelector';
import HostSelector from '../partials/selectors/HostSelector';
import UsagmNetworkSelector from '../partials/selectors/UsagmNetworkSelector';
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector';
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
            error: null
        };
    },

    computed: {},

    mounted() {},

    methods: {
        async onSubmitPreferences() {
           let preferences = {
                authors: this.$store.state.selectors.onetimeregister.selectedAuthors,
                hostsIds: this.$store.state.selectors.onetimeregister.selectedHostsIds,
                usagmNetworks:this.$store.state.selectors.onetimeregister.selectedUsagmNetworks
            };
            /*let preferences = {
                authors: "james,Ruslan Smeshchuk,Ruslan Smeshchuk",
                hostsIds: "b1f2bb70-5a00-4e34-adc5-c02b3d9a0bdf,b1f2bb70-5a00-4e34-adc5-c02b3d9a0bdf"
            };*/
            try { 
                var res = await API.updateUserPreferences(preferences)
                let url = "/";
                window.location = url;
            } catch (err) {
                this.error = err.toString();
            }
        }

    }

};
</script>


<style lang="scss">

</style>
