<style src="./styles/global.scss" lang="scss"></style>

<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import Vue from "vue";
import moment from "moment";
import NavBar from "./components/layout/NavBar";

export default {
    name: "app",
    components: {
        NavBar
    },
    computed: {},
    mounted() {
    }
};
</script>
