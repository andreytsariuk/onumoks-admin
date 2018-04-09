<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card class="elevation-2 padding">
          <InvitesForm ref="GeneralForm" :specialty="Invite"> </InvitesForm>
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
import InvitesForm from "./InvitesForm.vue";
export default {
  data() {
    return {
      loading: false,
      items: [],
      select: [],
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
    InvitesForm
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