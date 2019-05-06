<template>
    <div class="container" align="left" id="UserAdminPage">
        <h2>Home</h2>
        <h4>New Users</h4>              

        <div class="row mb-3"> 
            <div class="col">
                <new-requests-table></new-requests-table>
            </div>     
        </div>   

        <h4>Current Users</h4>              

        <div class="row mb-3"> 
            <div class="col">
                <current-users-table></current-users-table>
            </div> 
        </div>    
        
    </div>
</template>

<script>

import NewRequestsTable  from "../partials/tables/NewRequestsTable";
import CurrentUsersTable  from "../partials/tables/CurrentUsersTable";
import LevelSelector from "../partials/selectors/LevelSelector";

export default {
    
    name: "admin",

    metaInfo: {
        title: "Admin"
    },

    components: {
        NewRequestsTable,
        //LevelSelector,
        CurrentUsersTable
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
        init() {},
        
        /*onSelectLevel(users){
            this.$set(this.selectedProfileIds, _.map(hosts, 'id'))
            this.$log('onSelectHost ', this.selectedProfileIds)
            this.doPageSearch()
        }*/
       
    }

};
</script>


<style lang="scss">

</style>
