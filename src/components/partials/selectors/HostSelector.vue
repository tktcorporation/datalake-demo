<template>

    <multiselect
        v-model="selectedHosts"
        name="host-selector"
        track-by="id"
        label="name"
        deselect-label="Can't unselect host"
        :multiple="true"
        placeholder="Select a host"
        :options="hosts"
        :loading="isLoadingHosts"
        @input="onSelectHost"
        :searchable="true"
        :limit="3"
        :allow-empty="true">
    </multiselect>

</template>

<script>
import API from "../../../api";
import Multiselect from "vue-multiselect";
require("vue-multiselect/dist/vue-multiselect.min.css");

export default {

    name: "host-selector",

    data() {
        return {
            hosts: [],
            selectedHosts: null,
            isLoadingHosts: false
        };
    },

    components: {
        Multiselect
    },

    mounted() {
        this.getHosts();
    },

    destroyed() {},

    methods: {
        getHosts() {

            this.isLoadingHosts = true;
            API.getHosts().then(hosts => {
                this.hosts = hosts;
                this.isLoadingHosts = false;
            });

        },
        onSelectHost() { 
            let selectedHostsIds = _.map(this.selectedHosts, 'id').join(
                ','
            );
            this.$store.commit('selectHostsIds', selectedHostsIds);
        }
    }
};
</script>

<style lang="scss">

</style>
