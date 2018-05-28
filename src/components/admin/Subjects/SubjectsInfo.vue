<template>
    <div>
        <v-card class="elevation-2">
            <SubjectsForm :disabled="disabled" ref="GeneralForm" :specialty="Subject"> </SubjectsForm>
            <v-card-actions>
                <v-btn @click="back" flat>Back</v-btn>
                <v-btn v-if="disabled" icon @click="edit">
                    <v-icon>create</v-icon>
                </v-btn>
                <v-btn v-if="!disabled" icon @click="update">
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn v-if="!disabled" icon @click="clear">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import Config from "../../../config";
import { Api } from "../../../services";
import SubjectsForm from "./SubjectsForm.vue";
export default {
  data() {
    return {
      loading: false,
      ApiUrl: Config.ApiUrl,
      disabled: true,
      Subject: {
        name: "",
        description: "",
        notes: ""
      }
    };
  },
  created() {
    return this.get();
  },
  computed: {
    avatarSize() {
      return `${this.slider}px`;
    }
  },
  components: {
    SubjectsForm
  },
  methods: {
    back() {
      this.$router.push("/admin/subjects");
    },
    edit() {
      this.disabled = !this.disabled;
    },
    clear() {
      this.$refs.GeneralForm.clear();
    },
    get() {
      return Api.Subjects()
        .get(this.$route.params.id)
        .then(res => (this.Subject = res.data))
        .catch(error => {
          console.log("error", error);
          this.$notify({
            type: "error",
            title: error.title,
            text: error.message
          });
        });
    },
    update() {
      let generalFormData = this.$refs.GeneralForm.form();
      if (generalFormData) {
        return Api.Subjects()
          .update(this.$route.params.id, generalFormData)
          .then(res => (this.Subject = res.data))
          .then(() =>
            this.$notify({
              type: "success",
              title: "Success",
              text: "Subject has been created"
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
.card {
  margin: 5px !important;
}
</style>