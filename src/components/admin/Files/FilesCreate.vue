<template>
    <div>
        <v-layout row wrap>
            <v-flex sm12 xs12 class="padding elevation-0">
                <v-card class="elevation-2 padding">
                    <FilesForm ref="GeneralForm" :specialty="newFile"> </FilesForm>
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
import FilesForm from "./FilesForm.vue";
export default {
  data() {
    return {
      loading: false,
      items: [],
      select: [],
      ApiUrl: Config.ApiUrl,
      slider: 56,
      tile: false,
      newFile: {
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
    FilesForm
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
      // upload data to the server
      let generalFormData = this.$refs.GeneralForm.form();
      if (generalFormData) {
        console.log("generalFormData", generalFormData);
        return ApiService.AdminApi.Files.uploadFile(
          "articles",
          generalFormData.formData
        )
          .then(res => {
            this.$notify({
              type: "success",
              title: "Success",
              text: "File has been uploaded!"
            });
          })
          .then(() => this.back());
      }
    },
    saveFile(formData) {}
  }
};
</script>

<style>
</style>