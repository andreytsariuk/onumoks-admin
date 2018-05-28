<template>
    <v-form v-model="valid" ref="generalForm" class="padding" @submit.stop.prevent="submit()">
        <v-layout row>
            <v-flex xs4>
                <v-subheader>E-mail</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field v-model="email" :rules="Rules.requiredEmailRules" required label="E-mail"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>First Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" :rules="Rules.requiredNameRules" name="input-1" label="First Name" v-model="fname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Last Name</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" :rules="Rules.requiredNameRules" name="input-1" label="Last Name" v-model="lname"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Position</v-subheader>
            </v-flex>

            <v-flex xs8>
                <v-select :rules="Rules.requiredPositiontyRules" required label="Position" :items="positions" v-model="position" item-text="title" item-value="id" max-height="auto" autocomplete>
                    <template slot="selection" slot-scope="data">
                        <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                            <v-avatar :tile="false" :size="26" color="secondry">
                                <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                            </v-avatar>
                        </div>
                        <v-icon v-else medium color="primary">bubble_chart</v-icon>
                        &nbsp; {{ data.item.title }}
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
                                <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="data.item.hours_count"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
        <v-btn class="submit-button" type="submit"></v-btn>
    </v-form>
</template>


<script>
import { ApiService } from "../../../services";
import Config from "../../../config";
import { Rules } from "../../../helpers";
import _ from "lodash";
export default {
  props: ["id", "disabled", "course"],
  data() {
    return {
      Rules: Rules,
      ApiUrl: Config.ApiUrl,
      valid: false,
      passwordVisibility: true,
      positions: [],
      //------------Forms Params
      position: null,
      email: "",
      fname: "",
      lname: ""
    };
  },
  created() {
    this.getPositions();
  },
  methods: {
    getPositions() {
      ApiService.AdminApi.Positions.list().then(res => {
        this.positions = res.items;
      });
    },
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
      console.log("FF");
      if (this.$refs.generalForm.validate()) {
        return {
          email: this.email,
          fname: this.fname,
          lname: this.lname,
          position_id: this.position
        };
      }
    },
    formatRoles(rolesArray) {
      return _.join(rolesArray, ", ");
    },
    callInput() {
      this.$refs.fileInput.click();
    },
    clear() {
      this.$refs.generalForm.reset();
    }
  }
};
</script>

<style>
.submit-button {
  visibility: hidden;
}
</style>
