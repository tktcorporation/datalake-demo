// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import $ from 'jquery-slim'
import Vue from 'vue';
import App from './App';
import router from './router';
import Logger from './utils/Logger';
import Resource from 'vue-resource';
import filters from './filters';
import store from './store/index'; // Vuex store
import { ClientTable } from 'vue-tables-2';
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
import VuejsDialog from 'vuejs-dialog';
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
 
Vue.use(VuejsDialog);

Vue.use(VueGoodTablePlugin);
Vue.use(ClientTable);


Vue.use(Logger, { level: 'debug' });
Vue.use(Resource);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store
});
