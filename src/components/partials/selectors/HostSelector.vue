<template>

    <multiselect
        v-model="selectedHosts"
        name="host-selector"
        label="name"
        track-by="id" 
        deselect-label="Can't unselect host"
        :multiple="true"
        placeholder="Select a host"
        :options="hosts"
        :loading="isLoading"
        @input="onSelectProfile"
        :searchable="true"
        :limit="3"
        :allow-empty="true"
    >
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
            isLoading: false
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

            this.isLoading = true;
            this.isLoadingLabels = true;

            API.getHosts().then(hosts => {
                this.hosts = hosts;
                this.isLoading = false;
            });

        },

        onSelectNetwork(network) {},

        onSelectProfile() {
            this.$emit("onSelect", this.selectedHosts);
        }
    }
};
</script>

<style lang="scss">

</style>
