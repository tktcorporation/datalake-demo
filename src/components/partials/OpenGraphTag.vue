<template>
    <div class='hk-otags' v-if="ogTags">

        <a :href="ogTag.url" target="_blank" class="hk-tag-imported-media" v-for="ogTag in ogTags" v-bind:key="ogTag.type">
            <div class="card mb-2">

                <span v-if="ogTag">

                    <!--
                    <pre>{{ogTag}}</pre>
                    -->

                    <span v-if="(ogTag.type != 'video')">
                        <a v-if="hasImage(ogTag)" :href="ogTag.url" target="_blank" class="">
                            <img class="card-img-top hk-tag-image" :src="ogTag.imageUrl" alt="">
                        </a>
                        <div class="card-block" >
                        <!--<div class="card-block" v-if="!hasImage(ogTag)" >-->
                            <div class="card-title text-info"><a :href="ogTag.url">{{ogTag.title}}</a></div>
                            <p class="card-text" v-html="ogTag.description"></p>
                            <a class="site-name" :href="ogTag.url">{{ogTag.site_name}}</a>
                        </div>
                    </span>

                    <span v-if="(ogTag.type == 'video')">

                        <div class="embed-responsive embed-responsive-16by9">

                            <iframe v-if="ogTag.videoUrl" class="embed-responsive-item" :src="getVideoSrc(ogTag)" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

                            <!--
                            <video controls="true">
                                <source :src="getVideoSrc(ogTag)"  type="video/mp4" />
                            </video>
                            -->

                        </div>

                        <div class="card-block">
                            <div class="card-title text-info">{{ogTag.title}}</div>
                            <p class="card-text text-muted" v-html="ogTag.description"></p>
                            <a class="site-name" :href="ogTag.url">{{ogTag.site_name}}</a>
                        </div>
                    </span>

                </span>

            </div>
        </a>

    </div>
</template>

<script>

export default {

    name: 'open-graph-tag',

    props: ['tags'],

    computed: {
        'ogTags': function() {

            if (!this.tags) {
                return null
            }

            if (!_.isArray(this.tags)) {
                return [this.tags]
            }

            return this.tags
        }
    },

    methods: {

        hasImage: function(ogTag){
            return (ogTag.url && ogTag.imageUrl) ? true : false
        },

        getVideoSrc: function(ogTag) {

            var url = ogTag.videoUrl

            try {
                if (url.search(/\?/g) === -1) {
                    url += '?autoplay=0&rel=0'
                }
                else {
                    url += '&autoplay=0&rel=0'
                }
            }
            catch (e) {
                this.$logError('ogTag = ', ogTag)
                this.$logError('url = ', url)
            }

            this.$log("URL = " + url)

            return url
        }


    }
}
</script>


<style lang="scss" >

@import '../../styles/vars.scss';

.hk-otags {

    .card {
        padding: 0px;
        .card-block {
            padding: 10px 8px;
        }
    }

    .card:hover {
        background-color: $gray-lighter;
    }

    .hk-tag-image {
       max-width: 50%;
       float: left;
       margin: $posts-margin $posts-margin 5px $posts-margin;
    }

    .hk-tag-imported-media {
        font-size: $font-xsmall;
        font-color: $gray-light;
        text-decoration: none;
        &:hover {
            text-decoration: none;
        }
    }


    .card-text {
        font-size: $font-xsmall;
        font-weight: normal;
    }
    .site-name {
        display: block;
        margin: 5px 0 -3px 0;
        font-size: $font-xsmall;
        color: $gray-light;
        text-decoration: none;
        font-weight: $font-bold;
        &:hover {
            text-decoration: none;
        }
    }
    .card-img-top {
        width: auto;
    }

    .card-title {
        margin: 0px 0px 5px 0px;
        a {
            font-size: $font-small;
            color: $gray-dark;
            font-weight: $font-bold;
            padding: 0px;
        }
    }

}

</style>
