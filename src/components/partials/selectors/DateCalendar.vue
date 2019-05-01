<template>
  <v-date-picker mode="range" v-model="date" show-caps :max-date="new Date()" @input="onDate"></v-date-picker>
</template>


<script>
import moment from 'moment';

export default {
    data() {
        return {
            date: {
                start: moment(new Date()),
                end: moment(new Date())
            }
        };
    },
    methods: {
        onDate() {
            this.$store.commit('changeDate', this.date);
        }
    }
};
</script>
