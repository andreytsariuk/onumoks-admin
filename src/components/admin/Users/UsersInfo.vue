
<template>
  <v-layout row wrap>
    <v-flex lg6 md6 sm6 xs12 class="padding">
      <v-card>
        <v-toolbar class="teal " dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-btn @click="back()" dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="callInput" dark icon class="mr-3">
            <input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" ref="fileInput" accept="image/*" class="uploader">
            <v-icon>add_a_photo</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-media :src="avatarPath" height="240px">
          <v-layout column class="media">
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-3 pl-5 pt-5">{{User.profile.fname}} {{User.profile.lname}}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <UserForm :disabled="disabled" ref="GeneralForm" :profile="User.profile"> </UserForm>
        <v-card-actions>
          <v-btn v-if="!disabled" @click="updateUser">
            <v-icon>done</v-icon>
          </v-btn>
          <v-btn v-if="!disabled" @click="clear">
            <v-icon>highlight_off</v-icon>
          </v-btn>
          <v-btn v-if="disabled" @click="edit">
            <v-icon>create</v-icon>
          </v-btn>
          <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex lg6 md6 sm6 xs12 class="padding">
      <UserSettings></UserSettings>
    </v-flex>
  </v-layout>
</template>





<script>
import Config from "../../../config";
import TimeLine from "../TimeLine/TimeLine.vue";
import { ApiService, AuthService } from "../../../services";
import UserSettings from "./UserSettings.vue";
import UserForm from "./UserForm.vue";
import _ from "lodash";
///sdsds
export default {
  props: ["userId"],
  data() {
    return {
      ApiUrl: Config.ApiUrl,
      slider: 56,
      personal_email: "",
      User: {
        personal_email: "",
        profile: {
          avatar: {}
        }
      },
      valid: false,
      uploadFieldName: "avatar",
      disabled: true,
      loading: false
    };
  },
  components: {
    UserSettings: UserSettings,
    UserForm: UserForm
  },
  created() {
    this.User.id = this.userId ? this.userId : this.$route.params.id;
    return ApiService.AdminApi.Users.get(this.User.id)
      .then(user => (this.User = user))
      .catch(error => {
        this.$notify({
          type: "error",
          title: error.title,
          text: error.message
        });
      });
  },
  computed: {
    avatarPath() {
      return this.User.profile && this.User.profile.avatar
        ? this.User.profile.avatar.publicPath
        : "";
    }
  },
  methods: {
    AvatarUrl() {
      return this.User.profile && this.User.profile.avatar
        ? this.User.profile.avatar.publicPath
        : "";
    },
    callInput() {
      this.$refs.fileInput.click();
    },
    clear() {
      this.$refs.GeneralForm.clear();
    },
    edit() {
      this.disabled = !this.disabled;
    },
    updateUser() {
      this.loading = true;

      let generalFormData = this.$refs.GeneralForm.form();
      console.log("generalFormData", generalFormData);
      if (generalFormData) {
        return ApiService.AdminApi.Users.update(this.User.id, generalFormData)
          .then(res => {
            this.User = res;
            this.$notify({
              type: "success",
              title: "Success",
              text: "Profile has been updated!"
            });
          })
          .catch(error => {
            this.$notify({
              type: "error",
              title: error.title,
              text: error.message
            });
          });
      }
    },
    back() {
      this.$router.go(-1);
    },
    save(formData) {
      // upload data to the server
      return ApiService.AdminApi.Users.uploadAvatar(this.User.id, formData)
        .then(res => {
          this.User = res;
          this.$notify({
            type: "success",
            title: "Success",
            text: "Profile has been updated!"
          });
        })
        .catch(err => {
          this.$notify({
            type: "error",
            title: error.title,
            text: error.message
          });
        });
    },
    filesChange(fieldName, fileList) {
      console.log(this.User);
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.save(formData);
    }
  }
};
</script>

<style>
.uploader {
  display: none;
}
</style>
