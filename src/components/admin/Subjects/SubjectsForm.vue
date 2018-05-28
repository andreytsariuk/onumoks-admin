<template>
    <v-form v-model="valid" ref="generalForm">
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="Name" v-model="name" required :rules="Rules.requiredNameRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">Title</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="Title" v-model="title" required :rules="Rules.requiredTitleRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">Description</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-7-2" label="Description" v-model="description" multi-line></v-text-field>
            </v-flex>
        </v-layout>

    </v-form>
</template>


<script>
import Config from "../../../config";
import { Rules } from "../../../helpers";

import _ from "lodash";
export default {
  props: ["id", "disabled", "subject"],
  data() {
    return {
      Rules,
      valid: false,
      //------------Forms Params
      name: "",
      title: "",
      description: ""
    };
  },
  created() {
    console.log("this.disabled", this.disabled);
  },
  watch: {
    subject: function(newSubject) {}
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
          title: this.title,
          description: this.description
        };
      }
    }
  }
};
</script>