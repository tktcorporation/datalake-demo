<template>
    <div class="container" align="left">

        <h2>Profile</h2>

        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="user.email"
            >
            <small
                id="emailHelp"
                class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="user.name"
            >
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Default USAGM Network</label>
            <usagm-network-selector v-model="user.preferences.usagmNetwork"></usagm-network-selector>
        </div>

        <button type="submit" class="btn btn-primary mt-3" @click="onUpdate()">Save</button>

        <!--
        <pre class="mt-3">{{user}}</pre>
        -->

    </div>
</template>

<script>

import API from '../../api';
import UsagmNetworkSelector from '../partials/selectors/UsagmNetworkSelector';

export default {
    name: 'profile',
    data() {
        return {};
    },
    components: {
        UsagmNetworkSelector
    },    
    computed: {
        user: {
            get: function(){
                return this.$store.state.user;
            },
            set: function(obj){
                this.$store.commit('setUser', obj)
            }
        }
    },    
    methods: {
        onUpdate(){
            API.updateUser(this.user, (err, updatedUser)=>{})
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
