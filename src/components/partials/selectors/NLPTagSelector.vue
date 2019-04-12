<template>

    <multiselect             
        v-model="selectedUsagmNetworks" 
        label="name"
        class="usagm-network-selector"
        deselect-label="Can't unselect network" 
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
                {name: 'VOA', iconClass: 'fab fa-VOA'},
                {name: 'MBN', iconClass: 'fab fa-MBN'},
                {name: 'RFE/RL', iconClass: 'fab fa-RFE/RL'},
                {name: 'RFA', iconClass: 'fab fa-RFA'},
                {name: 'OCB', iconClass: 'fab fa-OCB'}
            ]
		};
	},

    components: {
        Multiselect
    },

	methods: {

        onSelectUsagmNetwork(){
            this.$emit('onSelectUsagmNetwork', _.map(this.selectedUsagmNetworks, 'name'))
        }
	}

};
</script>

<style lang="scss">

    
</style>
