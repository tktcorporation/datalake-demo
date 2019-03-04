// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import $ from 'jquery-slim'
import Vue from 'vue'
import App from './App'
import router from './router'
import Logger from './utils/Logger'
import Resource from 'vue-resource'

Vue.use(Logger, { level: 'debug' })
Vue.use(Resource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
