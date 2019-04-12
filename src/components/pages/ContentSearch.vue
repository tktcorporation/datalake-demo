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
                                <h5 class="mt-0 mb-1"><span class="badge badge-primary">Score: {{page.score | number(2)}}</span> {{page.title}}</h5>
                                
                                {{page.extract}}

                                <div v-if="nlpInfo" class="mb-4">
                                    <div class="">
                                        <span v-for="(topic, index) in page.matchedTopics" :key="index" class="badge badge-primary mr-1">{{topic}}</span>
                                    </div>
                                    <div class="">
                                        <span v-for="(cat, index) in page.matchedCategories" :key="index" class="badge badge-info mr-1">{{cat}}</span>
                                    </div>
                                    <div class="">
                                        <span v-for="(entity, index) in page.matchedEntities" :key="index" class="badge badge-success mr-1">{{entity}}</span>
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

        init(){

        }

    },

};
</script>


<style lang="scss">
</style>
