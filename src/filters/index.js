"use strict";

import Vue from 'vue'


Vue.filter('number', function (number) {
    if (!number) {
        return 0;
    }
    return parseFloat(number).toFixed(2)
});

Vue.filter('percent', function (number) {
    if (!number) {
        return '0%';
    }
    return Math.round(number*100)+'%'
});
