import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: {
        user: {},
        gameState: {}
    },

    mutations: {

        // Store the value of a search query in the navbar
        setUser(state, info) {

            const roles = {'user':10, 'admin':20, 'super':30}

            state.user = info

            if (!info){
                state.user = {
                    authenticated: false
                }
            }
            
            function isLevel(role){
                let requiredLevel = roles[role]
                let userLevel = roles[state.user.role]
                if (userLevel >= requiredLevel){
                    return true
                }
                return false
            }

            state.user.isAdmin = isLevel('admin')
            state.user.isSuper = isLevel('super')
            state.user.authenticated = true
        },


    },

    actions: {
            
    }
})
