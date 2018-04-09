<template>
    <v-form v-model="valid" ref="generalForm" class="padding" @submit.stop.prevent="submit()">
        <v-layout row>
            <v-flex xs4>
                <v-subheader>E-mail</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="true" v-model="email" :rules="Rules.requiredEmailRules" required label="E-mail"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">First Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" :rules="Rules.nameRules" name="input-1" label="First Name" v-model="fname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Last Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" :rules="Rules.nameRules" name="input-1" label="Last Name" v-model="lname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Password</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="password" :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordVisibility = !passwordVisibility) " :type="passwordVisibility ? 'password' : 'text'" counter required :rules="Rules.requiredPasswordRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Repeat Password </v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="repeatPassword" :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordVisibility = !passwordVisibility) " :type="passwordVisibility ? 'password' : 'text'" counter required :rules="Rules.requiredRepeatPasswordRules(password)"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>
                    <v-icon info>phone</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="work_phone" name="work_phone" required :rules="Rules.requiredPhoneRules " label="Work"></v-text-field>
            </v-flex>
        </v-layout>
        <!-- <v-layout row>
            <v-flex xs4>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="personal_phone" :rules="Rules.phoneRules"  label="Mobile" ></v-text-field>
            </v-flex>
        </v-layout> -->
        <v-layout row>
            <v-flex xs4>
                <v-subheader>
                    <v-icon info>mail</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="work_email" :rules="Rules.requiredEmailRules" required label="Work E-mail"></v-text-field>
            </v-flex>
        </v-layout>
        <!-- <v-layout row>
            <v-flex xs4>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" v-model="personal_email" :rules="Rules.emailRules" label="Personal E-mail" ></v-text-field>
            </v-flex>
        </v-layout> -->
        <v-btn class="submit-button" type="submit"></v-btn>
    </v-form>
</template>


<script>
import Config from "../../../config";
import { Rules } from "../../../helpers";
import _ from "lodash";
export default {
  props: ["id", "disabled", "cource"],
  data() {
    return {
      Rules: Rules,
      ApiUrl: Config.ApiUrl,
      valid: false,
      passwordVisibility: true,
      //------------Forms Params
      email: "",
      password: "",
      repeatPassword: "",
      fname: "",
      lname: "",
      work_email: "",
      work_phone: ""
    };
  },
  methods: {
    callInput() {
      this.$refs.fileInput.click();
    },
    clear() {
      this.$refs.generalForm.reset();
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        return {
          email: this.email,
          password: this.password,
          fname: this.fname,
          lname: this.lname,
          work_email: this.work_email,
          work_phone: this.work_phone
        };
      }
    },
    submit() {
      console.log("SSSSss");
      this.$emit("submit");
    }
  }
};
</script>

<style>
.submit-button {
  visibility: hidden;
}
</style>
