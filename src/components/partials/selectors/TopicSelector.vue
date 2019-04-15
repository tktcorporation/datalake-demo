<template>

    <multiselect
        v-model="selectedTags"
        :limit="3"
        :loading="isLoading"
        :hide-selected="true"
        :options="tags"
        @search-change="asyncFind"
        :multiple="true"
        :deselect-label="`Can't unselect ${type}`"
        :placeholder="`Select a ${type}`"
        @select="onSelectTags"
        @remove="onSelectTags"
        :internal-search="false"
        :searchable="true"
        :allow-empty="true"
    >
        <!--


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
-->
    </multiselect>

</template>

<script>
import API from "../../../api";
import _ from "lodash";
import Multiselect from "vue-multiselect";
require("vue-multiselect/dist/vue-multiselect.min.css");

export default {
    name: "topic-selector",

    props: ["type"],

    data() {
        return {
            selectedTags: null,
            tags: [],
            isLoading: false
        };
    },

    components: {
        Multiselect
    },

    created () {
        this.foo = _.debounce(function(){}, 1000);
    },

    methods: {

        //onSelectTags: _.debounce(()=>{
        //    this.$emit("onSelectTag", this.selectedTags);
        //}, 500),

        onSelectTags(){
            this.$emit("onSelectTag", this.selectedTags)
        },

        async asyncFind(query){
            this.isLoading = true
            this.tags = await API.getTags({query: query, type: this.type})
            this.isLoading = false
        }
    }
};
</script>

<style lang="scss">
</style>
