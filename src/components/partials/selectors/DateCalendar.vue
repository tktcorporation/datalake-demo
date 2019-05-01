<template>
  <v-date-picker
    mode="range"
    v-model="date"
    show-caps
    :formats="formats"
    :available-dates="{ start: null, end: new Date() }"
    @input="onDate"
  ></v-date-picker>
</template>


<script>
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
