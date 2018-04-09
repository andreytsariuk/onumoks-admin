<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card class="elevation-2 padding">
                    <v-tabs icons-and-text centered v-model="selectedForm">
                        <v-tabs-slider color="primary"></v-tabs-slider>
                        <v-tab href="#tab-1">
                            new user
                            <v-icon color="primary">add</v-icon>
                        </v-tab>
                        <v-tab href="#tab-2">
                            Or Exists
                            <v-icon color="primary">check</v-icon>
                        </v-tab>

                        <v-tab-item id="tab-1">
                            <v-card flat>
                                <NewStudentForm ref="GeneralFormNew"> </NewStudentForm>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item id="tab-2">
                            <StudentsForm ref="GeneralForm"> </StudentsForm>
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
      this.$refs.GeneralForm.clear();
    },
    create() {
      let generalFormData = this.$refs.GeneralForm.form();
      if (generalFormData) {
        return ApiService.AdminApi.Invites.create(generalFormData)
          .then(res => (this.Specialty = res.data))
          .then(() =>
            this.$notify({
              type: "success",
              title: "Success",
              text: "Invite was created"
            })
          )
          .then(() => this.back())
          .catch(error => {
            console.log("error", error);
            this.$notify({
              type: "error",
              title: error.title,
              text: error.message
            });
          });
      }
    }
  }
};
</script>

<style>

</style>