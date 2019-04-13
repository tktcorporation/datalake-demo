<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col-md-6">
                {{tag}}
            </div>
            <div class="col-md-6">
            </div>
        </div>

        <div class="row">
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
                                    <span class="badge badge-primary">Sentiment: {{page.nlpSentiment}}</span> {{page.title}}
                                </h5>
                                
                                {{page.extractEn}}

                                <div class="mb-4">
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlpTopics" :key="index" class="badge mr-1" :class="{'badge-danger':cat.name==tag, 'badge-primary':cat.name!=tag}">{{cat.name}} <span class='text-percent'>({{cat.score | percent}})</span></span>
                                    </div>
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlpCategories" :key="index" class="badge badge-info mr-1">{{cat.name}} <span class='text-percent'>({{cat.score | percent}})</span></span>
                                    </div>
                                    <div class="">
                                        <span v-for="(cat, index) in page.nlpEntities" :key="index" class="badge badge-success mr-1">{{cat.name}} <span class='text-percent'>({{cat.score | percent}})</span></span>
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
import Donut from '../partials/charts/Donut'
import Promise from 'bluebird'


export default {
    
    name: "content",

    props: ['tag','type'],

    metaInfo: {
        title: "content-search"
    },

    components: {

    },

    data() {
        return {    
            pages: null,      
            pagesMeta: null
        };
    },

    computed: {},

    mounted() {
        this.init()
    },

    methods: {

        async init(){

            var opts = {}
            if (this.type == 'topics'){
                opts.topics = this.tag
            }
            else if (this.type == 'categories'){
                opts.categories = this.tag
            }
            else if (this.type == 'entities'){
                opts.entities = this.tag
            }

            opts.type = 'post'

            // {tag: this.tag, type: 'post', projection: proj}

            opts.projection = {
                title: true,
                titleEn: true,
                url: true,
                image: true,
                thumbnail: true,
                host: true,
                network: true,
                type: true,
                author: true,
                profileId: true,
                extract: true,
                extractEn: true,
                body: true,
                bodyEn: true,
                language: true,
                nlpCategories: true,
                nlpTopics: true,
                nlpEntities: true,
                nlpSentiment: true
            }

            
            var info = await API.getContent(opts)

            this.pages = info.results
            this.pagesMeta = info.meta

        },

        getImage(page) {
            return page && page.image ? page.image : "http://via.placeholder.com/178x100";
        },

        search(){
            //API.getTags({query: this.query, type: this.type})
        }
    },

};
</script>


<style lang="scss">
</style>
