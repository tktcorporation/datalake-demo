<template>
    <div class="container" align="left">      


        <div class="jumbotron mt-4">

            <h4 class="display-4">
                Authenticating

                <span class="text-primary" style="font-size:24px">
                    <i class="fas fa-cog fa-spin ml-2"></i>
                </span>

                <span class="text-primary" style="font-size:24px">
                    <i class="fas fa-robot fa-spin ml-2"></i>
                </span>

            </h4>            

            <!--
            <pre>{{user}}</pre>
            -->
            
        </div>

    </div>
</template>

<script>

import API from '../../api'

export default {
    
    name: "authenticate",

    metaInfo: {
        title: "Authenticate"
    },

    components: {},

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    data() {
        return {
        };
    },

    mounted() {
        this.getToken()
    },

    methods: {

        async getToken(){
            let res = await API.register(this.$route.query.code)
            this.$store.commit('setUser', API.user)
            this.$router.replace({name:'home'})
        }
    }

};
</script>


<style lang="scss">

</style>
