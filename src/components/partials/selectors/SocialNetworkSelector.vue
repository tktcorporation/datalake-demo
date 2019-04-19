<template>

    <multiselect             
        v-model="selectedNetworks" 
        label="name"
        class="social-network-selector"
        deselect-label="Can't unselect network" 
        track-by="name" 
        placeholder="Select a network" 
        :options="networks" 
        @input="onSelectNetwork"
        :multiple="true"
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
	
	name: "social-network-selector",

	data() {
		return {
            selectedNetworks: null,
            networks: [
                {name: 'facebook', iconClass: 'fab fa-facebook'},
                {name: 'twitter', iconClass: 'fab fa-twitter'},
                {name: 'instagram', iconClass: 'fab fa-instagram'},
                {name: 'youtube', iconClass: 'fab fa-youtube'},
            ]
		};
	},

    components: {
        Multiselect
    },

	methods: {

        onSelectNetwork(){
            
            if (!this.selectedNetworks.length || this.selectedNetworks.length == 0){
                this.$emit('onSelectNetworks', null)
            }
            else {
                this.$emit('onSelectNetworks', this.selectedNetworks[0].name)
            }
            
            //this.$emit('onSelectNetworks', _.map(this.selectedNetworks, 'name'))
            
        }
	}

};
</script>

<style lang="scss">

    
</style>
