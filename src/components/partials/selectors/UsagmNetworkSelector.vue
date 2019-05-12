<template>

    <multiselect             
        v-model="selectedUsagmNetworks" 
        label="name"
        class="usagm-network-selector"
        deselect-label="Can't unselect network"
        :multiple="true"
        track-by="name" 
        placeholder="Select a network" 
        :options="networks" 
        @input="onSelectUsagmNetwork"
        :searchable="false" 
        :allow-empty="true">

        <template slot="singleLabel" slot-scope="props">
            <div class="option__desc">
                <i :class="props.option.iconClass"></i>
                <span class='text-primary ml-1'>{{props.option.name}}</span>
            </div>                
        </template>

        <template slot="option" slot-scope="props">
            <div class="option__desc">
                <i :class="props.option.iconClass"></i>
                <span class='text-primary ml-1'>{{props.option.name}}</span>
            </div>                
        </template>

    </multiselect>

</template>

<script>

import API from "../../../api"
import _ from "lodash"
import Multiselect from 'vue-multiselect'
require("vue-multiselect/dist/vue-multiselect.min.css")

export default {
	
	name: "usagm-network-selector",

	data() {
		return {
            selectedUsagmNetworks: null,
            networks: [
                {name: 'Voice of America'},
                {name: 'MBN'},
                {name: 'RFE/RL'},
                {name: 'RFA'},
                {name: 'OCB'},
                {name:'CurrentTime'},
                {name:'Competitor'}
            ]
		};
	},

    components: {
        Multiselect
    },

	methods: {
        onSelectUsagmNetwork(){
            let selectUsagmNetworks = this.selectedUsagmNetworks.join(
                ','
            );
            this.$store.commit('selectUsagmNetwork', selectUsagmNetworks);
        }
	}

};
</script>

<style lang="scss">

    
</style>
