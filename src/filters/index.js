"use strict";

import Vue from 'vue'


Vue.filter('number', function (number, precision) {
    
    if (!!precision) {
        precision = 2
    }

    if (!number) {
        return 0;
    }

    
    return parseFloat(number).toFixed(precision)
});

Vue.filter('humanNumber', function(number) {
  if (!number) {
    return '';
  }
  if (number < 1000) {
    return number;
  }
  var si = ['K', 'M', 'B', 'T', 'P', 'H'];
  var exp = Math.floor(Math.log(number) / Math.log(1000));
  var result = number / Math.pow(1000, exp);
  result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
  return result + si[exp - 1];
});

Vue.filter('percent', function (number) {
    if (!number) {
        return '0%';
    }
    return Math.round(number*100)+'%'
});
