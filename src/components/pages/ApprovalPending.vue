<template>
    <div class="container" align="left">
        <h2>Approval Pending</h2>

        <pre>{{user.email}} We are in the process of reviewing your access request !!!!. 
Please check back again.
        </pre>
        <br>
      <div class = "row" >
          <button type="button" class="btn btn-primary" onclick="window.location.href='https://www.usagm.gov/'">Ok</button>
      </div>   

    </div>
</template>

<script>

import Vue from "vue"

export default {
    
    name: "approval-pending",

    metaInfo: {
        title: "Approval Pending"
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
