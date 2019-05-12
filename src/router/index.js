import Vue from "vue";
import Router from "vue-router";
import Home from "../components/pages/Home";
import Admin from "../components/pages/UserAdminPage";
import OneTimeRegistration from "../components/pages/OneTimeRegistration";
import ApprovalPending from "../components/pages/ApprovalPending";
import SocialDashboard from "../components/pages/SocialDashboard";
import WebTraffic from "../components/pages/WebTraffic";
import SimilarPages from "../components/pages/SimilarPages";
import NotFound from "../components/pages/NotFound";
import Authenticate from "../components/pages/Authenticate";
import ContentSearch from "../components/pages/ContentSearch";
import store from "../store";
import API from "../api";

Vue.use(Router);

var router = new Router({
    mode: "history",
    linkActiveClass: "active",
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/social",
            name: "social-dashboard",
            component: SocialDashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/web",
            name: "web-dashboard",
            component: WebTraffic,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/nlp",
            name: "similar",
            component: SimilarPages,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/authenticate",
            name: "authenticate",
            component: Authenticate
        },
        {
            path: "/admin",
            name: "user-admin",
            component: Admin,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/onetimeregister",
            name: "one-time-registration",
            component: OneTimeRegistration,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/approvalpending",
            name: "approval-pending",
            component: ApprovalPending,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/content",
            name: "content",
            component: ContentSearch,
            meta: {
                requiresAuth: true
            },
            props: route => ({
                tag: route.query.tag,
                type: route.query.type,
                profileIds: route.query.profileIds
            })
        },
        {
            path: "*",
            name: "not-found",
            component: NotFound
        } // 404 page
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

// Guard the routes that require authentication
router.beforeEach(async (to, from, next) => {
    //let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        //let user = store.state.user
        if (store.state.user && !store.state.user.authenticated) {
            // Don't have the user in the store, double check by hitting the API
            let user = await API.getUser();

            if (!user) {
                next("home");
                return;
            }
        }
    }

    next();
});

export default router;