import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../components/pages/Home'
import SocialDashboard from '../components/pages/SocialDashboard'
import SimilarPages from '../components/pages/SimilarPages'
import NotFound from '../components/pages/NotFound'
import NetworkMaps from '../components/pages/NetworkMaps'

Vue.use(Router)

var useMode = 'history';

var router = new Router({
    //hash: useHash,
    //history: true,
    mode: useMode,
    linkActiveClass: 'active',
    routes: [
        { path: '/networkmaps', name: 'networkmaps', component: NetworkMaps },
        { path: '/social', name: 'social-dashboard', component: SocialDashboard },
        { path: '/nlp', name: 'similar', component: SimilarPages },
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

export default router