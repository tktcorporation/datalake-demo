import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home'
import SocialDashboard from '../components/pages/SocialDashboard'
import SimilarPages from '../components/pages/SimilarPages'
import NotFound from '../components/pages/NotFound'
import Authenticate from '../components/pages/Authenticate'
import ContentSearch from '../components/pages/ContentSearch'
import store from '../store'

Vue.use(Router)

var useMode = 'history';

if (window.location.host.search('localhost') !== -1){
    useMode = 'hash'
}

var router = new Router({
    //hash: useHash,
    //history: true,
    mode: useMode,
    linkActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/social', name: 'social-dashboard', component: SocialDashboard, meta: {requiresAuth: true} },
        { path: '/nlp', name: 'similar', component: SimilarPages, meta: {requiresAuth: true} },
        { path: '/authenticate', name: 'authenticate', component: Authenticate },
        { path: '/content', name: 'content', component: ContentSearch, meta: {requiresAuth: true}, props: (route) => ({ tag: route.query.tag, type: route.query.type })   },
        { path: '*', name: 'not-found', component: NotFound } // 404 page
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

// Guard the routes that require authentication
router.beforeEach((to, from, next) => {
	
    //let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
/*
    if (requiresAuth) {
        let user = store.state.user
        if (!store.state.user.authenticated){
            next('login')
            return
        }
    }
*/
    next()
})

export default router