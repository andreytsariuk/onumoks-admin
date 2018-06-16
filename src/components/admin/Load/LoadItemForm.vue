<template>
  <v-form v-model="valid" ref="generalForm">
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Subject</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select required label="Subject" :items="subjects" v-model="subject" item-text="title" max-height="auto" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-icon medium color="primary">subject</v-icon>
            &nbsp; {{ data.item.title }}
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <v-icon medium color="primary">subject</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              <v-list-tile-sub-title>
                {{data.item.description}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader class="">Hours Count</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field type="number" :rules="Rules.requiredNumberRules" :disabled="disabled" name="input-7-2" label="hours_count" v-model="hours_count" required></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Lesson Type</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select :disabled="!subject" required label="Lesson Type" :items="lessonTypes" v-model="lessonType" item-text="name" max-height="auto" item-value="id" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-icon medium color="primary">local_library</v-icon>
            &nbsp; {{ data.item.name }}
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <v-icon medium color="primary">local_library</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              <v-list-tile-sub-title>
                {{data.item.description}}
                <br> Hours Count: {{data.item.hours_count}}h
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Lector</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select :disabled="!subject" required label="Lector" :items="lectors" v-model="lector" item-text="user.name" max-height="auto" item-value="id"  autocomplete>
          <template slot="selection" slot-scope="data">
            <div v-if="data.item.user && data.item.user.profile && data.item.user.profile.avatar &&  data.item.user.profile.avatar.publicPath">
              <v-avatar :tile="false" :size="36" color="secondry">
                <img class="teal lighten-1" :src="data.item.user.profile.avatar.publicPath" alt="user avatar">
              </v-avatar>
            </div>
            <v-icon v-else medium color="primary">account_circle</v-icon>
            &nbsp; {{ data.item.user.name }}
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
                  Hours Count {{data.item.position && data.item.position.hours_count}}
                  <br> Position: {{data.item.position && data.item.position.title}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <div v-if="recommended.length">
          <v-list>
            <v-list-tile v-for="rec in recommended" :key="rec.id" @click="lector=rec">
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon medium color="primary">account_circle</v-icon>{{rec.user.name}}
                  <v-icon medium color="success">arrow_upward</v-icon> {{rec.score}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>

      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Course</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select :disabled="!subject" required label="Course" :items="courses" v-model="course" item-text="title" max-height="auto" item-value="id" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-icon medium color="primary">local_library</v-icon>
            &nbsp; {{ data.item.title }}
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
        <v-subheader>Group</v-subheader>
      </v-flex>

      <v-flex xs8>
        <v-select :disabled="!subject" required label="Group" :items="groups" v-model="group" item-text="title" item-value="id" max-height="auto" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-icon medium color="primary">call_split</v-icon>
            &nbsp; {{ data.item.title }}
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
        <v-subheader>Thread</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select :disabled="!subject" required label="Thread" :items="threads" v-model="thread" item-text="title" max-height="auto" item-value="id" autocomplete>
          <template slot="selection" slot-scope="data">
            <v-icon medium color="primary">share</v-icon>
            &nbsp; {{ data.item.title }}
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <v-icon medium color="primary">share</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              <v-list-tile-sub-title>
                Courses Count:: {{data.item.courses_count}}
                <br> Groups Count:: {{data.item.groups_count}}
                <br> Students Count: {{data.item.students_count}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
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
  props: ["id", "disabled"],
  data() {
    return {
      Rules,
      valid: false,

      subjects: [],
      lessonTypes: [],
      lectors: [],
      courses: [],
      groups: [],
      threads: [],
      recommended: [],
      //------------Forms Params
      subject: null,
      lessonType: null,
      lector: null,
      course: null,
      group: null,
      thread: null,
      hours_count: null
    };
  },
  created() {
    this.getSubjects();
  },
  watch: {
    lessonType: function(newSpecialty) {},
    subject: function(newValue, oldValue) {
      if (
        newValue &&
        newValue.id &&
        (!oldValue || newValue.id !== oldValue.id)
      ) {
        this.getLessonTypes();
        this.getCourses();
        this.getGroups();
        this.getLectors();
        this.getThreads();
      }
    }
  },
  methods: {
    callInput() {
      this.$refs.fileInput.click();
    },

    getSubjects(search) {
      ApiService.AdminApi.Subjects.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.subjects = res.items;
      });
    },
    getLessonTypes(search) {
      ApiService.AdminApi.LessonTypes.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.lessonTypes = res.items;
      });
    },
    getLectors(search) {
      ApiService.AdminApi.Lectors.list({
        rowsPerPage: 20,
        search,
        subject_id: this.subject.id
      }).then(res => {
        this.lectors = res.items;
        this.recommended = res.recommended;
      });
    },
    getGroups(search) {
      ApiService.AdminApi.Groups.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.groups = res.items;
      });
    },
    getCourses(search) {
      ApiService.AdminApi.Courses.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.courses = res.items;
      });
    },
    getThreads(search) {
      ApiService.AdminApi.Threads.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.threads = res.items;
      });
    },
    clear() {
      this.$refs.generalForm.reset();
      this.recommended = [];
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        return {
          subject_id: this.subject.id,
          hours_count: this.hours_count,
          lesson_type_id: this.lessonType,
          lector_id: this.lector.id ? this.lector.id :this.lector,
          course_id: this.course,
          group_id: this.group,
          thread_id: this.thread
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
