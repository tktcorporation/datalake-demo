<template>
    
    <div id="NotFoundPage" align="center">



        <div class="text-1">Network Maps {{funVariable}}</div>

        <div class="text-2">Network Maps YEY!</div>

        <div class="text-3">
            !!!<router-link :to="{name:'home'}">homepage</router-link> or use the menu to find your way again!
        </div>
        <button class='btn btn-primary' @click="addNumber">Add NUmber!</button>
        
        <social-profile-selector @onSelectProfile="onSelectedProfiles"></social-profile-selector>

    </div>

</template>

<script>
import SocialProfileSelector from '../partials/selectors/SocialProfileSelector'

export default {
    name: 'network-maps',
    data() {
        return {
            funVariable: 7 
        }
    },
    methods: {
        addNumber () {
            this.funVariable +=5
            this.$log('This adds 5!')

        },
    onSelectProfiles (profiles){
        this.$log(profiles)
    }
    },
    components: {
        SocialProfileSelector
    }
}
</script>

<style lang="scss" scoped>


#NotFoundPage {
    .text-1 {
        margin-top:200px;
        font-size:24px;
        color: gray;
    }

    .text-2 {
        margin-top:20px;
        font-size:50px;
    }

    .text-3 {
        margin-top:20px;
        font-size:24px;
        color: gray;
    }
}

</style>
