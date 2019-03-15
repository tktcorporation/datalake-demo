<template>

    <div class="container" align="left">

        <donut></donut>

    </div>

</template>

<script>



import Donut from '../partials/charts/Donut'

export default {
    
    name: "social-dashboard",

    metaInfo: {
        title: "social-dashboard"
    },

    components: {
        Donut
    },

    data() {
        return {
        };
    },

    computed: {},

    methods: {
    },

    mounted() {}
};
</script>


<style lang="scss">
</style>
