<template>
    <div class="container" align="left">
        <h2>Home</h2>

        <pre>{{user}}</pre>
    </div>
</template>

<script>

import Vue from "vue"

export default {
    
    name: "home",

    metaInfo: {
        title: "Home"
    },

    components: {},

    data() {
        return {
        };
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    mounted() {},

    methods: {

    }

};
</script>


<style lang="scss">

</style>
