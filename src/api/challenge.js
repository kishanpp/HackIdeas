import Vue from 'vue'
import store from '../store'

export default {
    addChallenge (challenge) {
        let challenges = JSON.parse(Vue.localStorage.get('challenges')) || []

        let id = challenges.length ? challenges.reduce((max, obj) => max > obj.challengeId ? max : obj.challengeId) + 1 : 1
        challenges.push(Object.assign({challengeId : id},challenge))
        Vue.localStorage.set('challenges', JSON.stringify(challenges))
    },
    getChallenges (id) {
        let challenge = JSON.parse(Vue.localStorage.get('challenges')) || []
        if (id)
            challenge = challenge.filter(e => e.challengeId == id )
        return challenge
    },
    updateChallenge (updatedChallenge) {
        let challenges = JSON.parse(Vue.localStorage.get('challenges'))
        challenges.forEach(element => { 
            if(element['challengeId'] === updatedChallenge.challengeId){
                element.title = updatedChallenge.title
                element.description = updatedChallenge.description
                element.tags = updatedChallenge.tags
            }
        });
        Vue.localStorage.set('challenges', JSON.stringify(challenges))
    },
    deleteChallenge (challengeId){
        let challenges = JSON.parse(Vue.localStorage.get('challenges'))
        challenges = challenges.filter(element => element['challengeId'] !== challengeId);
        Vue.localStorage.set('challenges', JSON.stringify(challenges))
    },
    updateVote (challengeId){
        let challenges = JSON.parse(Vue.localStorage.get('challenges'))
        challenges.forEach(element => {      
            if(element['challengeId'] === challengeId) 
                element['voteCount'] = element['voteCount'] + 1
        });
        Vue.localStorage.set('challenges', JSON.stringify(challenges))
    },
    getEmp (){
        return store.getters.empId
    },
    
}