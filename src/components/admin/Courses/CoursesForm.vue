<template>
    <v-form v-model="valid" ref="generalForm">
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
                <v-subheader class="">Level</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :rules="Rules.requiredLevelRules" :disabled="disabled" name="input-7-2" label="Level" v-model="level" required></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Specialty</v-subheader>
            </v-flex>

            <v-flex xs8>
                <v-select :rules="Rules.requiredSpecialtyRules" required label="Specialty" :items="specialties" v-model="specialty" item-text="name" item-value="id" max-height="auto" autocomplete>
                    <template slot="selection" slot-scope="data">
                        <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                            <v-avatar :tile="false" :size="26" color="secondry">
                                <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                            </v-avatar>
                        </div>
                        <v-icon v-else medium color="primary">bubble_chart</v-icon>
                        &nbsp; {{ data.item.name }}
                    </template>
                    <template slot="item" slot-scope="data">
                        <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                            <v-list-tile-avatar>
                                <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                                    <v-avatar :tile="false" :size="36" color="secondry">
                                        <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                                    </v-avatar>
                                </div>
                                <v-icon v-else medium color="primary">bubble_chart</v-icon>

                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="data.item.title"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>
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
import { ApiService } from "../../../services";

import _ from "lodash";
export default {
  props: ["id", "disabled"],
  data() {
    return {
      Rules,
      valid: false,
      specialties: [],
      //------------Forms Params

      //------------Forms Params
      specialty: null,
      title: "",
      level: "",
      description: ""
    };
  },
  created() {
    this.getSpecialties();
  },
  methods: {
    getSpecialties() {
      ApiService.AdminApi.Specialties.list().then(res => {
        this.specialties = res.items;
      });
    },
    callInput() {
      this.$refs.fileInput.click();
    },
    clear() {
      this.$refs.generalForm.reset();
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        return {
          title: this.title,
          level: this.level,
          description: this.description,
          specialty_id: this.specialty
        };
      }
    }
  }
};
</script>