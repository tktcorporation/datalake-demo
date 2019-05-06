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

            <div class="text-danger mb-2" v-if="errorMessage">
                {{errorMessage}}
            </div>

            <pre>{{user}}</pre>
            
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
            errorMessage: 'test'
        };
    },

    mounted() {
        this.$log('MOUNT')
        this.getToken()
    },

    methods: {

        async getToken(){

            this.$log('Getting token...')

            try {
                
                let res = await API.register(this.$route.query.code)
                this.$log('Register, res = ', res)

                this.$store.commit('setUser', API.user)
                //this.$router.replace({name:'social'})

            }
            catch(err){
                this.errorMessage = err.toString()
            }
        }
    }

};
</script>


<style lang="scss">

</style>
