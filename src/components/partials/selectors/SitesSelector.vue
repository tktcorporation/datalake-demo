<template>

    <multiselect             
        v-model="selectedSites" 
        label="name"
        class="usagm-sites-selector"
        deselect-label="Can't unselect network" 
        track-by="name" 
        placeholder="Select a Site(s)" 
        :options="networks" 
        @input="onSelectSite"
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
	
	name: "usagm-sites-selector",

	data() {
		return {
            selectedSites: null,
            sites: [
                {name: 'rt.com', iconClass: 'fab fa-rt'},
                {name: 'cnn.com', iconClass: 'fab fa-cnn'},
                {name: 'rferl.org', iconClass: 'fab fa-rfe'},
                {name: 'radiofarda.com', iconClass: 'fab fa-rfa'},
                {name: 'svoboda.org', iconClass: 'fab fa-svo'},
                {name: 'azatutyun.am', iconClass: 'fab fa-azatutyun'},
                {name: 'ozodi.org', iconClass: 'fab fa-ozodi'},
                {name: 'ozodlik.org', iconClass: 'fab fa-ozodlik'},
                {name: 'azattyk.org', iconClass: 'fab fa-azattyk'},
                {name: 'azathabar.com', iconClass: 'fab fa-azathabar'},
                {name: 'azatutyun.am', iconClass: 'fab fa-azatutyun'},
                {name: 'currenttime.tv', iconClass: 'fab fa-currenttime'},
                {name: 'ru.krymr.com', iconClass: 'fab fa-ru'},
                {name: 'pa.azadiradio.com', iconClass: 'fab fa-pa'},
                {name: 'voanews.com', iconClass: 'fab fa-voanews'},
                {name: 'ir.voanews.com', iconClass: 'fab fa-ir'},
                {name: 'voachinese.com', iconClass: 'fab fa-voachinese'},
                {name: 'voahausa.com', iconClass: 'fab fa-voahausa'},
                {name: 'voatiengviet.com', iconClass: 'fab fa-voatiengviet'},
                {name: 'golos-ameriki.ru', iconClass: 'fab fa-ameriki'},
                {name: 'learningenglish.voanews.com', iconClass: 'fab fa-learningenglishvoa'},
                {name: 'voasomali.com', iconClass: 'fab fa-voasomali'},
                {name: 'voaafrique.com', iconClass: 'fab fa-voaafrique'},
                {name: 'amharic.voanews.com', iconClass: 'fab fa-amharic'},
                {name: 'urduvoa.com', iconClass: 'fab fa-urduvoa'},
                {name: 'tigrigna.voanews.com', iconClass: 'fab fa-tigrigna'},
                {name: 'pashtovoa.com', iconClass: 'fab fa-pashtovoa'},
                {name: 'amerikaninsesi.com', iconClass: 'fab fa-amerikaninsesi'},
                {name: 'voakorea.com', iconClass: 'fab fa-voakorea'},
                {name: 'voanoticias.com', iconClass: 'fab fa-voanoticias'},
                {name: 'alhurra.com', iconClass: 'fab fa-alhurra'},
                {name: 'radiosawa.com', iconClass: 'fab fa-radiosawa'},
                {name: 'maghrebvoices.com', iconClass: 'fab fa-maghrebvoices'},
                {name: 'irfaasawtak.com', iconClass: 'fab fa-irfaasawtak'},
                {name: 'radiotelevisionmarti.com', iconClass: 'fab fa-radiotelevisionmarti'}
            ]
		};
	},

    components: {
        Multiselect
    },

	methods: {

        onSelectSite(){
            this.$emit('onSelectSite', _.map(this.selectedSites, 'name'))
        }
	}

};
</script>

<style lang="scss">

    
</style>
