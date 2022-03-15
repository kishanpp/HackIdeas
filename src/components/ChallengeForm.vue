<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<template>
    <div>
        <h4 class="alert-heading">Add New Challenge</h4>
        <form class="needs-validation mb-2" novalidate>
            <div class="row mb-3 col-auto">
                <div class="form-group col-md-6" :class="{ error: v$.formData.title.$errors.length }">
                    <label for="title">Title</label>
                    <input type="text" id="title" class="form-control" v-model="formData.title" required placeholder="Enter title">
                    <div class="input-errors" v-for="error of v$.formData.title.$errors" :key="error.$uid">
                        <div class="error-msg text-muted">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-group col-md-6" :class="{ error: v$.formData.description.$errors.length }">
                    <label for="description">Description</label>
                    <input type="text" id="description" class="form-control" v-model="formData.description" placeholder="Enter Description">
                    <div class="input-errors" v-for="error of v$.formData.description.$errors" :key="error.$uid">
                        <div class="error-msg text-muted">{{ error.$message }}</div>
                    </div>
                </div>
            </div>
            <div class="row mb-3 col-auto">
                <div class="form-group col-md-6" :class="{ error: v$.formData.tags.$errors.length }">
                    <label for="tags">Tags</label>
                    <multiselect v-model="formData.tags" 
                                tag-placeholder="Add this as new tag" 
                                placeholder="Search or add a tag" 
                                label="" 
                                track-by="" 
                                :options="selectTags" 
                                :multiple="true" 
                                :taggable="true" 
                                id="tags">
                    </multiselect>
                                     
                    <div class="input-errors" v-for="error of v$.formData.tags.$errors" :key="error.$uid">
                        <div class="error-msg text-muted">{{ error.$message }}</div>
                    </div>
                </div>
            </div>              
            <button type="submit" class="btn btn-primary" @click.prevent="addChallenge">Add Challenge</button>
        </form>
        <!-- <router-link to="/" >return to Homepage</router-link> -->
      
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="msg.length">
            {{this.msg}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>

<script>

import api from '/src/api/challenge'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Multiselect from 'vue-multiselect'
export default{
   components : {
       Multiselect
   },
    data: function (){
        return {
            formData: {
                title: '',
                description: '',
                tags: [],
            },
            msg: '',
            selectTags : []
        }
    },
    props:[
       
    ],
    setup () {
        return {
            v$: useVuelidate() 
        }
    },
    validations () {
        return {
            formData: {
                title: { required },
                description: { required },
                tags: { required }
            }           
        }
    },
    created: function(){
        this.selectTags = require('../assets/tags.json')
        this.selectTags.sort()
    },
    methods : {        
        async addChallenge() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return

            this.formData.creationDate = JSON.stringify(new Date())
            this.formData.voteCount = 0

            api.addChallenge(this.formData)
            this.msg = 'Challenge sucessfully added'
            let ref = this

            Object.keys(this.formData).forEach(function(key) {
                ref.formData[key] = ''
            });
            setTimeout(() => {
                this.msg = ""                
            }, 1500);

            this.$nextTick(() => { 
                this.v$.$reset()
                this.$emit("updateTable");
                this.$router.push('/');
            })
        },
    },
    mounted: function() {
    },
    watch: {
      
    }
}
</script>