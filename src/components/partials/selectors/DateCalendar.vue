<template>
  <div class="col">
    <div class="row">
      <v-date-picker
        class="date-calendar"
        mode="range"
        v-model="date"
        show-caps
        :max-date="new Date()"
        @input="onDate"
      ></v-date-picker>
    </div>
  </div>
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


<style lang="scss">
.date-calendar /deep/ input {
    min-height: 40px;
    display: block;
    padding: 0px 30px 0px 10px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 12px;
}
::placeholder {
    opacity: 0.6;
    font-size: 12px;
}
</style>
