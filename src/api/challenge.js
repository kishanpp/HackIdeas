import Vue from 'vue'
import store from '../store'

export default {
    addChallenge (challenge) {
        let challenges = JSON.parse(Vue.localStorage.get('challenges')) || []
        let id = challenges.length ? Math.max(...(challenges).map(challenge => challenge.challengeId)) + 1 : 1
        challenges.push(Object.assign({challengeId : id},challenge))
        Vue.localStorage.set('challenges', JSON.stringify(challenges))

        let storedUserVote = JSON.parse(Vue.localStorage.get('userVote')) || []
        let userVote = {}
        userVote.user = this.getEmp();
        userVote.challengeId = id;
        userVote.isVote = false;
        
        storedUserVote.push(userVote)
        Vue.localStorage.set('userVote', JSON.stringify(storedUserVote))
        
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
        let userVote = JSON.parse(Vue.localStorage.get('userVote'))
        let challenges = JSON.parse(Vue.localStorage.get('challenges'))
        challenges.forEach(element => {      
            if(element['challengeId'] === challengeId) {
                userVote.forEach(element1 => {
                    if(element1.user === this.getEmp() && element1.challengeId === challengeId && !element1.isVote){
                        element['voteCount'] = element['voteCount'] + 1
                        element1.isVote = true;
                    }                    
                })
                
            } 
        });
        Vue.localStorage.set('challenges', JSON.stringify(challenges))
        Vue.localStorage.set('userVote', JSON.stringify(userVote))
    },
    getEmp (){
        return store.getters.empId
    },
    
}