<template>
    <v-form v-model="valid" ref="generalForm">
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" :rules="Rules.nameRules" name="input-1" label="First Name" v-model="fname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" :rules="Rules.nameRules" name="input-1" label="Last Name" v-model="lname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-subheader>
                    <v-icon info>phone</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="Rules.work_phone" name="work_phone" :rules="Rules.phoneRules" label="Work"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="personal_phone" :rules="Rules.requiredPhoneRules " required label="Mobile"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-subheader>
                    <v-icon info>mail</v-icon>
                </v-subheader>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="work_email" :rules="Rules.requiredEmailRules" required label="Work E-mail"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
            </v-flex>
            <v-flex xs9>
                <v-text-field :disabled="disabled" v-model="personal_email" :rules="Rules.emailRules" label="Personal E-mail"></v-text-field>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
import Config from "../../../config";
import { Api } from "../../../services";
import { Rules } from "../../../helpers";
import _ from "lodash";

export default {
  props: ["userId", "disabled", "profile"],
  data() {
    return {
      Rules: Rules,
      valid: false,
      fname: "",
      lname: "",
      personal_phone: "",
      work_phone: "",
      personal_email: "",
      work_email: ""
    };
  },
  created() {
    console.log("this.profile", this.profile);
  },
  watch: {
    profile: function(newProfile) {
      console.log("Change");

      this.personal_phone = newProfile.personal_phone
        ? newProfile.personal_phone
        : "";
      this.work_phone = newProfile.work_phone ? newProfile.work_phone : "";
      this.personal_email = newProfile.personal_email
        ? newProfile.personal_email
        : "";
      this.work_email = newProfile.work_email ? newProfile.work_email : "";
    }
  },
  methods: {
    clear() {
      this.$refs.generalForm.reset();
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        return {
          fname: this.fname,
          lname: this.lname,
          personal_phone: this.personal_phone,
          work_phone: this.work_phone,
          personal_email: this.personal_email,
          work_email: this.work_email
        };
      }
    }
  }
};
</script>