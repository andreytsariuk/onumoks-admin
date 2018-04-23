<template>
  <v-form v-model="valid" ref="generalForm">
    <v-layout row>
      <v-flex xs4>
        <v-subheader class="grey--text text--lighten-1">E-mail</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field :disabled="disabled" name="input-1" label="E-mail" v-model="email" required :rules="Rules.requiredEmailRules"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader class="grey--text text--lighten-1">Name</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field :disabled="disabled" name="input-1" label="Name" v-model="name"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader class="grey--text text--lighten-1">Role</v-subheader>
      </v-flex>
      <v-select :disabled="disabled" :items="roles" v-model="role" label="Select role" item-text="label" item-value="value" single-line :rules="Rules.requiredRolesRules" required bottom></v-select>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader class="grey--text text--lighten-1">Expires</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="expires_at">
          <v-text-field slot="activator" label="Expires at" v-model="expires_at" required :rules="Rules.requiredDateRules" readonly></v-text-field>
          <v-date-picker v-model="expires_at" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(expires_at)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-form>
</template>


<script>
import Config from "../../../config";
import { Rules } from "../../../helpers";
import moment from "moment";
import _ from "lodash";
export default {
  props: ["id", "disabled", "specialty"],
  data() {
    return {
      Rules,
      valid: false,
      menu: false,
      modal: false,
      //------------Forms Params
      name: "",
      email: "",
      role: "",
      expires_at: moment()
        .add(24, "hours")
        .format("YYYY-MM-DD"),
      roles: [
        {
          label: "Admin",
          value: "admins"
        },
        {
          label: "Student",
          value: "students"
        },
        {
          label: "Lector",
          value: "lectors"
        }
      ]
    };
  },
  created() {
    console.log("this.disabled", this.disabled);
  },
  watch: {
    specialty: function(newSpecialty) {
      this.name = newSpecialty.name ? newSpecialty.name : "";
      this.email = newSpecialty.email ? newSpecialty.email : "";
    }
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
          name: this.name,
          email: this.email,
          rules: {
            roles: [this.role]
          },
          expires_at: this.expires_at
        };
      }
    }
  }
};
</script>