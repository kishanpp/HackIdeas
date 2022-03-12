<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                     <form>
                         <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Update Challenge</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>                   
                        <div class="modal-body">                        
                            <div class="mb-3">
                                <label for="title" class="col-form-label">Title</label>
                                <input type="text" class="form-control" v-model="challenge.title" id="title">
                            </div>
                            <div class="mb-3">
                                <label for="description" class="col-form-label">Description</label>
                                <input type="text" class="form-control" v-model="challenge.description" id="description">
                            </div>
                            <div class="mb-3">
                                <label for="tags" class="col-form-label">Tags</label>
                                <multiselect v-model="challenge.tags" 
                                    tag-placeholder="Add this as new tag" 
                                    placeholder="Search or add a tag" 
                                    label="" 
                                    track-by="" 
                                    :options="selectTags" 
                                    :multiple="true" 
                                    :taggable="true" 
                                   
                                    id="tags">
                        </multiselect>
                            </div>                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                            <input type="submit" @click.prevent="updateChallenge" data-bs-dismiss="modal" class="btn btn-danger" value="Update">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import api from '/src/api/challenge'
import Multiselect from 'vue-multiselect'
export default{
    data: function(){
        return {
            challenge : {
                tags:[]
            },
            selectTags : []
        }
    },
    components : {
        Multiselect
    },
    props: [],
    created: function(){
        this.selectTags = require('../assets/tags.json')
        this.selectTags.sort()
    },
    methods:  {
        getChallenge: async function (challengeId){
            const challenge = await api.getChallenges(challengeId)
            if(challenge.length)
                this.challenge = Object.assign({},this.challenge,challenge[0])
        },
        updateChallenge: async function (){
            await api.updateChallenge(this.challenge)
            this.$emit("updateTable");
        }
    },
    mounted: function(){
        document.getElementById('staticBackdrop').addEventListener('shown.bs.modal', function () {
            document.getElementById('title').focus()
        })
    }
}
</script>