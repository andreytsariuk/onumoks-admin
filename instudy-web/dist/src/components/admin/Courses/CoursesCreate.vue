<template>
    <v-flex class="elevation-0 padding " xs8 sm8 offset-xs2 offset-sm2>
        <v-card class="elevation-2">
            <v-toolbar class="teal" dark>
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-btn @click="back()" dark icon>
                    <v-icon>chevron_left</v-icon>
                </v-btn>
               <v-card-title>
                Create Course
            </v-card-title>
            </v-toolbar>
            
                
            <coursesForm ref="GeneralForm" > </coursesForm>
            <v-card-actions>
                <v-btn @click="back" flat>Back</v-btn>
                <v-btn @click="create" flat>Create</v-btn>
                <v-btn icon @click="clear">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    import Config from '../../../config';
    import {
        Api
    } from '../../../services';
    import coursesForm from './coursesForm.vue';
    export default {
        data() {
            return {
                Course: {}
            }
        },
        created() {
            console.log('CREATED!!');
        },
        components: {
            coursesForm
        },
        computed: {
            avatarSize() {
                return `${this.slider}px`
            }
        },
        methods: {
            back() {
                this.$router.push('/admin/courses');
            },
            clear() {
                this.$refs.GeneralForm.clear()
            },
            create() {
                let generalFormData = this.$refs.GeneralForm.form();
                if (generalFormData) {
                    return Api
                        .Courses()
                        .create(generalFormData)
                        .then(res => this.Course = res.data)
                        .then(() => this.$notify({
                            type: 'success',
                            title: 'Success',
                            text: 'Course has been created'
                        }))
                        .then(() => this.back())
                        .catch(error => {
                            console.log('error', error);
                            this.$notify({
                                type: 'error',
                                title: error.title,
                                text: error.message
                            });
                        });
                }
            }
        }
    }
</script>

<style>
    .card {
        margin: 5px!important
    }
</style>