<template>
    <div class="web-page-table card w-100 h-100">
        
        <div class="card-body">


            <table class="table table-striped table-responsive">
                <thead>
                </thead>
                <tbody>
                    <tr v-for="page in pages" :key="page.url">
                        <td>
                            <a :href="page.url" target="_blank">
                                <img :src="getImage(page)" class="mr-3" alt="page image" style="height:30px">
                            </a>                            
                        </td>
                        <td>
                            {{page.published}}
                        </td>
                        <td>
                            <span :class="`bg-${page.network}`" class="badge mr-1 text-white">
                                <i :class="`fab fa-${page.network}`"></i>
                            </span>
                            <span>{{page.host}}</span>
                        </td>
                        <td>
                            {{page.title}}
                        </td>
                        <td>
                            {{page.extract_en}}
                        </td>
                        <td>
                            {{page.author}}
                        </td>
                        <td>
                            {{page.nlp_sentiment}}
                        </td>
                        <td class="">
                            <span v-for="(cat, index) in page.nlp_topics" :key="index" class="badge mr-1" :class="{'badge-danger':cat.name==tag, 'badge-primary':cat.name!=tag}">
                                {{cat}} 
                            </span>
                        </td>
                        <td class="">
                            <span v-for="(cat, index) in page.nlp_categories" :key="index" class="badge badge-info mr-1">{{cat}}</span>
                        </td>
                        <td class="">
                            <span v-for="(cat, index) in page.nlp_entities" :key="index" class="badge badge-success mr-1">{{cat}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
    
        </div>

    </div>
</template>

<script>
// @see https://github.com/apertureless/vue-chartjs
import _ from "lodash";
import moment from "moment";
import API from "../../../api";

export default {

    name: "web-pages-table",

    props: ["pages"],

    data() {
        return {
            fields: [
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Extract', key: 'extract_en', active: true, type: 'string'},
                {name: 'Date', key: 'published', active: true, type: 'date'},
                {name: 'Thumb', key: 'thumbnail', active: true, type: 'image'},
                {name: 'Host', key: 'host', active: true, type: 'string'},
                {name: 'Language', key: 'language', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
                {name: 'Article', key: 'title', active: true, type: 'string'},
            ]
        };
    },

    mounted() {},

    methods: {

        getImage(page) {
            return page && page.image ? page.image : "http://via.placeholder.com/178x100";
        }

    }
};
</script>


<style lang="scss">
.web-page-table {

}
</style>