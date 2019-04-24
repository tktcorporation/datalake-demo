<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col-md-4">
                <topic-selector type="topics" @onSelectTag="onSelectedTopic"></topic-selector>
            </div>
            <div class="col-md-4">
                <topic-selector type="categories" @onSelectTag="onSelectedCategory"></topic-selector>
            </div>
            <div class="col-md-4">
                <topic-selector type="entities" @onSelectTag="onSelectedEntity"></topic-selector>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-6">
                <social-profile-selector @onSelectProfile="onSelectedProfiles"></social-profile-selector>
            </div>
        </div>

        <!--
        <div class="row mt-3">
            <pre>{{searchOtions.topics}}</pre>
            <pre>{{searchOtions.entities}}</pre>
            <pre>{{searchOtions.categories}}</pre>
        </div>
        -->

        <div class="row mt-3">
            <div class="col">

                <div v-if="pages" class="pt-0 mt-0 text-generated">

                    <ul class="list-unstyled" v-for="page in pages" :key="page.url">
                        <li class="media">
                            
                            <a :href="page.url" target="_blank">
                            <img :src="getImage(page)" class="mr-3" alt="page image" style="height:100px">
                            </a>

                            <div class="media-body">

                                <h5 class="mt-0 mb-1">
                                    <span :class="`bg-${page.network}`" class="badge mr-1 text-white"><i :class="`fab fa-${page.network}`"></i></span>
                                    <span class="badge badge-primary">Sentiment: {{page.nlp_sentiment}}</span> {{page.title}}
                                </h5>
                                
                                {{page.body_clean}}

                                <div class="mb-4">
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlp_topics" :key="index" class="badge mr-1" :class="{'badge-danger':cat.name==tag, 'badge-primary':cat.name!=tag}">
                                            {{cat}} 
                                        </span>
                                    </div>
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlp_categories" :key="index" class="badge badge-info mr-1">{{cat}}</span>
                                    </div>
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlp_entities" :key="index" class="badge badge-success mr-1">{{cat}}</span>
                                    </div>
                                </div>

                            </div>

                            
                        </li>
                    </ul>

                </div>

            </div>
        </div>


    </div>
    
</template>

<script>


import API from '../../api'
import TopicSelector from '../partials/selectors/TopicSelector.vue'
import SocialNetworkSelector from '../partials/selectors/SocialNetworkSelector.vue'
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector'
import Promise from 'bluebird'

// http://localhost:8080/content?tag=Government%20reports&type=topics&profileIds=2205968431,UCBQ58amRJh3anfDtob6sBSQ,20803965,21316293,UCKyTokYo0nK2OA-az-sDijA,103481483020802,38452569122

export default {
    
    name: "content-search",

    props: ['tag','type'],

    metaInfo: {
        title: "content-search"
    },

    components: {
        TopicSelector,
        SocialNetworkSelector,
        SocialProfileSelector
    },

    data() {
        return {    
            pages: null,      
            pagesMeta: null,
            searchOtions: {
                //type:'post',
                proj: [
                    'title', 'title_en', 'url', 'image', 'thumbnail', 'host', 'network', 'type', 'author', 'profile_id', 
                    'extract', 'extract_en', 'language', 'nlp_categories', 'nlp_topics', 'nlp_entities', 'nlp_sentiment'
                    //'body_clean', 'body_clean_en', 
                    ]
            }
        };
    },

    computed: {

    },

    mounted() {
        // Process props
        if (this.type == 'topics'){
            this.searchOtions.topics = this.tag
        }
        else if (this.type == 'categories'){
            this.searchOtions.categories = this.tag
        }
        else if (this.type == 'entities'){
            this.searchOtions.entities = this.tag
        }        
        this.doSearch()
    },

    methods: {

        async doSearch(){        
            
            if (this.profileIds){
                this.searchOtions.profileIds = this.profileIds
            }

            this.$log('Search options', this.searchOtions)

            var info = await API.getContent(this.searchOtions)
            this.pages = info.results
            this.pagesMeta = info.meta
        },

        getImage(page) {
            return page && page.image ? page.image : "http://via.placeholder.com/178x100";
        },


        onSelectedProfiles(profileIds){
            this.$log(profileIds)
            this.searchOtions.profileIds = profileIds.join(',')
            this.doSearch()
        },

        onSelectedTopic(tags){
            this.$log('Tags: ', tags)
            this.searchOtions.topics = tags.join(',')
            this.doSearch()
        },

        onSelectedCategory(tags){
            this.searchOtions.categories = tags.join(',')
            this.doSearch()
        },

        onSelectedEntity(tags){
            this.searchOtions.entities = tags.join(',')
            this.doSearch()
        }
    },

};
</script>


<style lang="scss">
</style>
