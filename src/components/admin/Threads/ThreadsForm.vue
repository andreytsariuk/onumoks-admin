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
        <v-subheader class="">Description</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field :disabled="disabled" name="input-7-2" label="Description" v-model="description" multi-line></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Courses</v-subheader>
      </v-flex>

      <v-flex xs8>
        <v-select chips multiple required label="Courses" :items="courses" v-model="selectedCourses" item-text="title" max-height="auto"  item-value="id"  autocomplete>
          <template slot="selection" slot-scope="data">
            <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
              <v-icon medium color="primary">local_library</v-icon>
              &nbsp; {{ data.item.title }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <v-icon medium color="primary">local_library</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              <v-list-tile-sub-title>
                Specialty: {{data.item.specialty&&data.item.specialty.name}}
                <br> Level: {{data.item.level}}
                <br> Students Count: {{data.item.studentsCount}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Groups</v-subheader>
      </v-flex>

      <v-flex xs8>
        <v-select chips multiple required label="Groups" :items="groups" v-model="selectedGroups" item-text="title" item-value="id" max-height="auto" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
              <v-icon medium color="primary">call_split</v-icon>
              &nbsp; {{ data.item.title }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <v-icon medium color="primary">account_circle</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{data.item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>
                Course: {{data.item.course && data.item.course.title}}
                <br>Specialty: {{data.item.course && data.item.course.specialty.name}}
                <br> Students Count: {{data.item.students_count}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Students</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select chips multiple required label="Students" :items="students" v-model="selectedStudents" item-text="name" item-value="id" max-height="auto" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
              <div v-if="data.item.user && data.item.user.profile && data.item.user.profile.avatar &&  data.item.user.profile.avatar.publicPath">
                <v-avatar :tile="false" :size="36" color="secondry">
                  <img class="teal lighten-1" :src="data.item.user.profile.avatar.publicPath" alt="user avatar">
                </v-avatar>
              </div>
              <v-icon v-else medium color="primary">account_circle</v-icon>
              &nbsp; {{ data.item.user.name }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <div v-if="data.item.user && data.item.user.profile && data.item.user.profile.avatar &&  data.item.user.profile.avatar.publicPath">
                  <v-avatar :tile="false" :size="36" color="secondry">
                    <img class="teal lighten-1" :src="data.item.user.profile.avatar.publicPath" alt="user avatar">
                  </v-avatar>
                </div>
                <v-icon v-else medium color="primary">account_circle</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{data.item.user.name}}</v-list-tile-title>
                <v-list-tile-sub-title>
                  {{data.item.specialty.email}}

                </v-list-tile-sub-title>
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
import { Rules } from "../../../helpers";
import { ApiService } from "../../../services";
import _ from "lodash";

export default {
  props: ["id", "disabled", "lessonType"],
  data() {
    return {
      Rules,
      valid: false,
      students: [],
      courses: [],
      groups: [],
      //------------Forms Params
      title: "",
      course: null,
      selectedStudents: null,
      selectedGroups: null,
      selectedCourses: null,
      description: ""
    };
  },
  created() {
    this.getCourses();
    this.getStudents();
    this.getGroups();
  },
  watch: {
    lessonType: function(newSpecialty) {}
  },
  methods: {
    callInput() {
      this.$refs.fileInput.click();
    },
    getCourses() {
      ApiService.AdminApi.Courses.list().then(res => {
        this.courses = res.items;
      });
    },
    getStudents() {
      ApiService.AdminApi.Students.list({
        rowsPerPage: 20
      }).then(res => {
        this.students = res.items;
      });
    },
    getGroups() {
      ApiService.AdminApi.Groups.list({
        rowsPerPage: 20
      }).then(res => {
        this.groups = res.items;
      });
    },
    clear() {
      this.$refs.generalForm.reset();
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        return {
          title: this.title,
          description: this.description,
          courses_ids: this.selectedCourses,
          groups_ids: this.selectedGroups,
          students_ids: this.selectedStudents
        };
      }
    }
  }
};
</script>

<style  lang="scss" >
.menu__content {
  .list__tile {
    height: 100% !important;
  }
}
</style>
