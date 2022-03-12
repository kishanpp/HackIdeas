<style scoped>
    .custom-icon {
        width: 20px;
        vertical-align: inherit;
        cursor: pointer;
    }
</style>

<template>
     <div class="container">
        <nav class=" navbar-expand-lg navbar-light bg-light">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link disabled">{{this.eid}}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="logout" href="#">Log Out</a>
                </li>
            </ul>
        </nav>

        <Challenge @updateTable="updateTable" />
        <h3 class="p-3 text-center">List of Challenges</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th>
                        <a href="javascript:void(0)" @click="sortBy('voteCount')">Vote
                            <img class="custom-icon" src="~@/assets/images/sort.png">
                        </a>
                    </th>
                    <th>
                        <a href="javascript:void(0)" @click="sortBy('creationDate')">Created On
                            <img class="custom-icon" src="~@/assets/images/sort.png">
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="challenge in sortedChallenges" :key="challenge.challengeId">
                    <td align="center">{{challenge.challengeId}}</td>
                    <td>{{challenge.title}}</td>
                    <td>{{challenge.description}}</td>
                    <td>
                        <ul>
                            <li v-for="tag in challenge.tags" :key="tag">{{tag}}</li>
                        </ul>
                    </td>
                    <td align="center">{{challenge.voteCount}} <img @click="updateVote(challenge.challengeId)" class="custom-icon" src="~@/assets/images/up-vote.png"></td>
                    <td align="center">{{challenge.creationDate}}</td>
                    <td align="center">
                        <img data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="triggerUpdate(challenge.challengeId)" class="custom-icon" src="~@/assets/images/edit-icon.png" alt="edit"/>
                        <img class="custom-icon" @click="triggerDelete(challenge.challengeId)" src="~@/assets/images/delete-icon.png" alt="delete"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <UpdateChallenge ref="updateChallengeRef" @updateTable="updateTable"/>
    </div>  
</template>

<script>
import Challenge from '/src/components/ChallengeForm.vue'
import UpdateChallenge from '/src/components/UpdateChallenge.vue'
import api from '/src/api/challenge'
import auth from '@/authentication/auth.js'

export default {
    components: {
        Challenge,
        UpdateChallenge
    },
    data: function (){
        return {
            challenges: [],
            sort: {
                key: '',
                isAsc: false
            },
            eid: '',
        }
    },
    methods: {
        getData : function (){
            this.challenges = api.getChallenges()
        },
        updateTable : function(){
            this.getData()           
        },
        updateVote: async function(challengeId){             
            await api.updateVote(challengeId)
            this.getData()
        },
        sortBy: function (key) {
            this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
            this.sort.key = key;
        },
        logout: function () {
            auth.logout()
            this.$store.dispatch('logout')
            this.$router.push('/login')
        },
        triggerUpdate: function(challengeId) {
            this.$refs.updateChallengeRef.getChallenge(challengeId);
        },
        triggerDelete: async function(challengeId){
            await api.deleteChallenge(challengeId)
            this.getData()
        }
    },
    computed: {
        sortedChallenges (){
            const list = this.challenges.slice()
            if (this.sort.key.length) {
                list.sort((a, b) => {
                    a = a[this.sort.key]
                    b = b[this.sort.key]
                    if(this.sort.key === 'creationDate'){
                        a = new Date(a)
                        b = new Date(b)
                    }

                    return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
                });
            }
            return list;
        }
    },
    mounted: function(){
        this.getData()
        this.eid = api.getEmp()
    },
    watch:{
        challenges(newValue){
            let ref = this
            newValue.forEach(element => {            
                Object.keys(ref.challenges).forEach(function(key) {
                    if(ref.challenges[key]['challengeId'] === element.challengeId) 
                        ref.challenges[key].creationDate = new Date(JSON.parse(element.creationDate)).toLocaleString()
                })
            })
        }
    }
}
</script>