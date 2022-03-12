import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex);

//const session = Vue.prototype.$session
const store = new Vuex.Store({
	state: {
		isLogged : false,		
		empId : ''
	},
	actions: {
		login: function(state, data){
			this.commit('validateLogin', true);
			this.commit('setUserEmail', data.eid)
		},
		validateUser: function(){
			if(Vue.localStorage.get('validUser')){
				this.commit('validateLogin', true);
				this.commit('setUserEmail', Vue.localStorage.get('validUser'))
			}			
		},
		logout: function (){
			this.commit('validateLogin', false)
			this.commit('setUserEmail', '')
		}
	},
	mutations: {
   
		validateLogin (state, valid){
			state.isLogged = valid;
		},
		setUserEmail (state, empId){
			state.empId = empId
		},
		
	},
	// same as computed. data will be cached and re-evaluated when any variable data is changes.
	getters: {
		validUser : state => {
			return state.isLogged
		},
		empId : state =>{
			return state.empId
		},
	
   }
})

export default store;