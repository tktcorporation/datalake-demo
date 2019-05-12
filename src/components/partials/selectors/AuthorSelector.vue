<template>

    <multiselect
        v-model="selectedAuthors"
        name="author-selector"
        deselect-label="Can't unselect author"
        :multiple="true"
        placeholder="Select a author"
        :options="authors"
        :loading="isLoading"
        @input="onSelectAuthors"
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
            selectedAuthors: null,
            isLoading: false
        };
    },

    components: {
        Multiselect
    },

    mounted() {
        this.getAuthors();
    },

    destroyed() {},

    methods: {
        getAuthors() {

            this.isLoading = true;

            API.getAuthors().then(authors => {
                this.authors = authors;
                this.isLoading = false;
            });

        },

        onSelectAuthors() {
            let selectAuthors = this.selectedAuthors.join(
                ','
            );
            this.$store.commit('selectAuthors', selectAuthors);
        }
    }
};
</script>

<style lang="scss">

</style>
