<template>

    <multiselect
        v-model="selectedHosts"
        name="author-selector"
        deselect-label="Can't unselect author"
        :multiple="true"
        placeholder="Select a author"
        :options="authors"
        :loading="isLoading"
        @input="onSelect"
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

    name: "author-selector",

    data() {
        return {
            authors: [],
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

            API.getAuthors().then(authors => {
                this.authors = authors;
                this.isLoading = false;
            });

        },

        onSelectNetwork(network) {},

        onSelect() {
            this.$emit("onSelect", this.selectedHosts);
        }
    }
};
</script>

<style lang="scss">

</style>
