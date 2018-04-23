<template>
    <v-form v-model="valid" ref="generalForm">

        <v-layout row>
            <v-flex xs4>
                <v-subheader>User</v-subheader>
            </v-flex>

            <v-flex xs8>
                <v-select required label="User" :items="users" v-model="user" item-text="name" item-value="id" max-height="auto" autocomplete>
                    <template slot="selection" slot-scope="data">
                        <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                            <v-avatar :tile="false" :size="26" color="secondry">
                                <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                            </v-avatar>
                        </div>
                        <v-icon v-else medium color="primary">account_circle</v-icon>
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
                                <v-icon v-else medium color="primary">account_circle</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="formatRoles(data.item.short_roles)"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Specialty</v-subheader>
            </v-flex>

            <v-flex xs8>
                <v-select required label="Specialty" :items="specialties" v-model="specialty" item-text="name" item-value="id" max-height="auto" autocomplete>
                    <template slot="selection" slot-scope="data">
                        <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                            <v-avatar :tile="false" :size="26" color="secondry">
                                <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                            </v-avatar>
                        </div>
                        <v-icon v-else medium color="primary">account_circle</v-icon>
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
                                <v-icon v-else medium color="primary">account_circle</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="formatRoles(data.item.short_roles)"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Course</v-subheader>
            </v-flex>

            <v-flex xs8>
                <v-select required label="Course" :items="courses" v-model="course" item-text="name" item-value="id" max-height="auto" autocomplete>
                    <template slot="selection" slot-scope="data">
                        <div v-if="data.item.profile && data.item.profile.avatar &&  data.item.profile.avatar.publicPath">
                            <v-avatar :tile="false" :size="26" color="secondry">
                                <img class="teal lighten-1" :src="data.item.profile.avatar.publicPath" alt="user avatar">
                            </v-avatar>
                        </div>
                        <v-icon v-else medium color="primary">account_circle</v-icon>
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
                                <v-icon v-else medium color="primary">account_circle</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="formatRoles(data.item.short_roles)"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
    </v-form>
</template>


<script>
import Config from "../../../config";
import { ApiService } from "../../../services";
import { Rules } from "../../../helpers";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      ApiUrl: Config.ApiUrl,
      Rules,
      valid: false,
      users: [],
      specialties: [],
      courses: [],
      //------------Forms Params
      user: null,
      specialty: null,
      course: null
    };
  },
  created() {
    console.log("this.disabledss", this.disabled);
    this.getUsers();
    this.getCourses();
    this.getSpecialties();
  },
  methods: {
    getUsers() {
      ApiService.AdminApi.Users.list().then(res => {
        this.users = res.items;
      });
    },
    getCourses() {
      ApiService.AdminApi.Courses.list().then(res => {
        this.courses = res.items;
      });
    },
    getSpecialties() {
      ApiService.AdminApi.Specialties.list().then(res => {
        this.specialties = res.items;
      });
    },
    formatRoles(rolesArray) {
      return _.join(rolesArray, ", ");
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
          user_id: this.user,
          specialty_id: this.specialty,
          course_id: this.course
        };
      }
    }
  }
};
</script>