
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
    state: () => ({
        user:{},
        authenticated:false,
    
    }),
    getters: {
        authenticated(state){
            return state.authenticated;
        },
        current_user(state){
            return state.user;
        },
    },
    actions: {
        getUser(){
            axios.get('api/user').then(({data})=>{
                this.user = data;
                this.authenticated = true;
            }).catch(({res})=>{
                this.user = {};
                this.authenticated = false;
            })
        },
        logout(){
            // this.user = {};
            // this.authenticated = false;
        },
    },
})

