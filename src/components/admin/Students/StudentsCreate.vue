<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card class="elevation-2 padding">
                    <v-tabs icons-and-text centered v-model="selectedForm">
                        <v-tabs-slider color="primary"></v-tabs-slider>
                        <v-tab href="#new">
                            new user
                            <v-icon color="primary">add</v-icon>
                        </v-tab>
                        <v-tab href="#exist">
                            Or Exists
                            <v-icon color="primary">check</v-icon>
                        </v-tab>

                        <v-tab-item id="new">
                            <v-card flat>
                                <NewStudentForm ref="GeneralFormNew"> </NewStudentForm>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item id="exist">
                            <StudentsForm ref="GeneralFormExist"> </StudentsForm>
                        </v-tab-item>
                    </v-tabs>

                    <v-card-actions>
                        <v-btn @click="back" flat>Back</v-btn>
                        <v-btn @click="create" flat>Create</v-btn>
                        <v-btn icon @click="clear">
                            <v-icon>highlight_off</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Config from "../../../config";
import { ApiService } from "../../../services";
import StudentsForm from "./StudentsForm.vue";
import NewStudentForm from "./NewStudentForm.vue";

export default {
  data() {
    return {
      loading: false,
      items: [],
      select: [],
      selectedForm: null,
      ApiUrl: Config.ApiUrl,
      slider: 56,
      tile: false,
      Invite: {
        name: "",
        description: "",
        notes: ""
      }
    };
  },
  created() {
    console.log("CREATED!!");
  },
  components: {
    StudentsForm,
    NewStudentForm
  },
  computed: {
    avatarSize() {
      return `${this.slider}px`;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clear() {
      if (this.selectedForm === "new") this.$refs.GeneralFormNew.clear();
      else this.$refs.GeneralFormExist.clear();
    },
    create() {
      if (this.selectedForm === "new") {
        let generalFormData = this.$refs.GeneralFormNew.form();
        if (generalFormData)
          return ApiService.AdminApi.Students.createNew(generalFormData)
            .then(() =>
              this.$notify({
                type: "success",
                title: "Success",
                text: "Student was created"
              })
            )
            .then(() => this.back());
      } else {
        let generalFormData = this.$refs.GeneralFormExist.form();
        if (generalFormData)
          return ApiService.AdminApi.Students.createExist(generalFormData)
            .then(() =>
              this.$notify({
                type: "success",
                title: "Success",
                text: "Student was created"
              })
            )
            .then(() => this.back());
      }
    }
  }
};
</script>

<style>

</style>