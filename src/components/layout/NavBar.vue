<template>
    <nav id="Navbar" class="navbar navbar-expand-lg navbar-light mb-3">

        <div class="container">

            <a class="navbar-brand" href="/">
                <img src="/imgs/logo.png" alt="" style="height:50px; width: auto">
                <!--
                <span class="">USAGM Demo</span>
                <span class="text-info small ml-1 mr-1">{{version}}</span>
                -->
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav ml-auto w-100 d-lg-none mobile-menu">

                    <li class="nav-item" >
                        <router-link class="nav-link" :to="{name:'social-dashboard'}" data-toggle="collapse" data-target="#navbarSupportedContent">Social</router-link>
                    </li>

                    <li class="nav-item" >
                        <router-link class="nav-link" :to="{name:'webtraffic-dashboard'}" data-toggle="collapse" data-target="#navbarSupportedContent">Web</router-link>
                    </li>


                    <li class="nav-item" >
                        <router-link class="nav-link" :to="{name:'similar'}" data-toggle="collapse" data-target="#navbarSupportedContent">NLP Demo</router-link>
                    </li>

                    <li class="nav-item" v-if="!user.authenticated" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span class="nav-link" @click="doLogin()">Login</span>
                    </li>

                    <li class="nav-item" v-if="user.authenticated" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span class="nav-link" @click="doLogout()">Logout</span>
                    </li>
                    

                </ul>

                <ul class="navbar-nav ml-auto d-none d-lg-flex">

                    <li class="nav-item" v-if="user.authenticated">
                        <router-link class="nav-link" :to="{name:'social-dashboard'}">Social</router-link>
                    </li>

                    <li class="nav-item" v-if="user.authenticated">

                        <router-link class="nav-link" :to="{name:'content'}">Content</router-link>
                    </li>

                    <li class="nav-item" v-if="user.authenticated">
                        <router-link class="nav-link" :to="{name:'similar'}">NLP Demo</router-link>
                    </li>

                    <li class="nav-item" v-if="!user.authenticated">
                        <span class="nav-link" @click="doLogin()">Login</span>
                    </li>

                    <li class="nav-item" v-if="user.authenticated">
                        <span class="nav-link" @click="doLogout()">Logout</span>
                    </li>

                </ul>

                <avatar v-if="user.authenticated" :username="user.email" :size="30"></avatar>

            </div>
        </div>

    </nav>
</template>

<script>

import API from '../../api'
import Avatar from 'vue-avatar';

export default {

    name: 'nav-bar',

    components: {
        Avatar
    },

    data() {
        return {
            version: process.env.VUE_APP_VERSION
        }
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },

    mounted() {
        this.init()
    },

    methods: {

        async init(){
            //let info = await API.getUser()
        },

        doLogin(){
            API.login()        
        },

        doLogout(){
            API.logout()
        }
    }
}
</script>

<style lang="scss">

@import '../../styles/vars.scss';

#Navbar {
    .navbar {
        
    }
    .nav-link.active {
        font-weight:bold;
    }
}

</style>
