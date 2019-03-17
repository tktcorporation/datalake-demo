<template>
    <nav id="Navbar" class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">

        <div class="container">

            <a class="navbar-brand" href="/">
                <span class="">USAGM Demo</span>
                <span class="text-info small ml-1 mr-1">{{version}}</span>
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
                        <router-link class="nav-link" :to="{name:'similar'}" data-toggle="collapse" data-target="#navbarSupportedContent">NLP Demo</router-link>
                    </li>

                </ul>

                <ul class="navbar-nav ml-auto d-none d-lg-flex">

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'social-dashboard'}">Social</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'similar'}">NLP Demo</router-link>
                    </li>

                </ul>

            </div>
        </div>

    </nav>
</template>

<script>

export default {

    name: 'nav-bar',

    components: {
    },

    data() {
        return {
            version: process.env.VUE_APP_VERSION
        }
    },

    mounted() {
    },

    methods: {
    }
}
</script>

<style lang="scss">

@import '../../styles/vars.scss';

#Navbar {
    .nav-link.active {
        font-weight:bold;
    }
}

</style>
