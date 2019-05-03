<template>
    <div class="container" align="left">
        <h2>Home</h2>
        <h4>New Requests</h4>   
        <users-table></users-table>
    </div>
</template>

<script>

import UsersTable  from "../partials/tables/UsersGrid";

export default {
    
    name: "admin",

    metaInfo: {
        title: "Admin"
    },

    components: {
        UsersTable
    },

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
