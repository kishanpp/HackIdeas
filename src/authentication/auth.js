import Vue from 'vue'
// import store from '../store'

export default {
	loginEmp: function (email){
			
		let result = {}
		result.isDone = -1
		result.errorMessage = 'API error !'

		if(this.checkExistence(email) ){
				result.errorMessage = 'Success !'
				result.isDone = 1
				Vue.localStorage.set('validUser', email)
		}
		else{
			result.errorMessage = 'Invalid Emp Id'
			result.isDone = 0
		}
		return result
	},
	logout: function(){
		Vue.localStorage.set('validUser', '')
	},
	registerEmp: function (email){
		let result = {}
		result.isDone = -1
		result.errorMessage = 'lcoal storage error !'
		let putData = []		

		if(this.checkExistence(email)){
			result.isDone = 0
			result.errorMessage = 'user already exists !'
		}
		else{
			const getData = JSON.parse(Vue.localStorage.get('EmpId')) || false

			if(!getData){
				// simply add data on empty
				putData.push(email)
				Vue.localStorage.set('EmpId', JSON.stringify(putData))
			}
			else{
				// get data merge and then insert again
				getData.push(email)
				Vue.localStorage.set('EmpId', JSON.stringify(getData))
			}			
			
			result.isDone = 1
			result.errorMessage = 'registration successfull'
		}
		return result
	},
	checkExistence: function(eid) {
		const getData = JSON.parse(Vue.localStorage.get('EmpId')) || false
		if(getData){
			return getData.includes(eid)
		}
		else{
			return
		}
	}
}