<template>

    <div class="container" align="left">

        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6">
            </div>
        </div>

        <div class="row">
            <div class="col">

                <div v-if="pages" class="pt-0 mt-0 text-generated">

                    <ul class="list-unstyled" v-for="page in pages" :key="page.id">
                        <li class="media">
                            
                            <a :href="page.url" target="_blank">
                            <img :src="getImage(page)" class="mr-3" alt="page image" style="height:100px">
                            </a>

                            <div class="media-body">
                                <h5 class="mt-0 mb-1"><span class="badge badge-primary">Score: {{page.nlpSentiment}}</span> {{page.title}}</h5>
                                
                                {{page.extract}}

                                <div class="mb-4">
                                    <div class="">
                                        <span v-for="(tag, index) in page.nlpTopics" :key="index" class="badge badge-primary mr-1">{{tag.name}}</span>
                                    </div>
                                    <div class="">
                                        <span v-for="(tag, index) in page.nlpCategories" :key="index" class="badge badge-info mr-1">{{tag.name}}</span>
                                    </div>
                                    <div class="">
                                        <span v-for="(tag, index) in page.nlpEntities" :key="index" class="badge badge-success mr-1">{{tag.name}}</span>
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
            pages: null      
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
                opts.topics = [this.tag]
            }
            else if (this.type == 'categories'){
                opts.categories = [this.tag]
            }
            else if (this.type == 'entities'){
                opts.entities = [this.tag]
            }

            this.pages = await API.getContent({tag: this.tag, type: this.type})

        },

        getImage(page) {
            return page && page.image
                ? page.image
                : "http://via.placeholder.com/178x100";
            // "http://placeimg.com/178/100/nature"
        },

        search(){
            //API.getTags({query: this.query, type: this.type})
        }
    },

};
</script>


<style lang="scss">
</style>
