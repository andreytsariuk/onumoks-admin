  <template>
    <v-layout row wrap>
        <v-flex xs12 class="padding elevation-0">
            <v-card class="elevation-2 padding">
                <v-layout row>
                    <v-flex xs12 class="padding elevation-0">
                        <table border="1">
                            <tr>
                                <th class="verticalTableHeader">Subject</th>
                                <th class="verticalTableHeader">Scpecialty</th>
                                <th class="verticalTableHeader">Course</th>
                                <th class="verticalTableHeader">Thread</th>
                                <th class="verticalTableHeader">Group</th>
                                <th class="verticalTableHeader" v-for="col in cols" :key="col.id">{{col.name}} ({{col.description}})</th>
                                <th class="verticalTableHeader">Summ</th>
                            </tr>
                            <tr v-for="row in rows" :key="row.id">
                                <td>
                                    <span v-if="row.subject && row.subject.id">{{row.subject.title}} </span>
                                    <span v-else>-</span>
                                </td>
                                <td>
                                    <span v-if="row.course && row.course.specialty && row.course.specialty.title">{{row.course.specialty.title}}</span>
                                    <span v-else-if="row.group && row.group.course && row.group.course.specialty && row.group.course.specialty.title">{{row.group.course.specialty.title}}</span>
                                    <span v-else-if="row.thread&& row.thread.course && row.thread.course[0] && row.thread.course[0].specialty && row.thread.course[0].specialty.title">{{row.thread.course[0].specialty.title}}</span>
                                    <span v-else-if="row.thread && row.thread.group && row.thread.group.course && row.thread.group.course.specialty.title">{{row.thread.course.specialty.title}}</span>
                                    <span v-else>-</span>
                                </td>
                                <td>
                                    <span v-if="row.course && row.course.title">{{row.course.title}}</span>
                                    <span v-else>-</span>
                                </td>
                                <td>Thread</td>
                                <td>Group</td>
                                <td v-for="col in cols" :key="col.id">
                                    <span v-if="col.id ===row.lessonType.id">{{row.hours_count}} </span>
                                    <span v-else>-</span>
                                </td>
                                <td>Summ</td>
                            </tr>
                        </table>
                    </v-flex>
                    <v-btn color="pink" dark small absolute bottom right fab @click="dialog=true">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-layout>
            </v-card>
        </v-flex>
        <LoadItemDialog :load="load" :okText="'Create'" :cancelText="'Cancel'" :dialog="dialog" @action="refresh()" @cancel="dialog=false"></LoadItemDialog>
    </v-layout>
</template>

<script>
import Config from "../../../config";
import { ApiService, AuthService } from "../../../services";
import LoadItemDialog from "./LoadItemDialog";

import _ from "lodash";
///sdsds
export default {
  props: ["userId"],
  data() {
    return {
      dialog: false,
      load: null,
      rows: [],
      cols: []
    };
  },
  components: { LoadItemDialog },
  created() {
    return ApiService.AdminApi.Load.get(this.$route.params.id)
      .then(load => (this.load = load))
      .then(() => ApiService.AdminApi.LoadItems.list(this.$route.params.id))
      .then(res => {
        this.rows = res.rows;
        this.cols = res.cols;
      });
  },
  computed: {},
  methods: {
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
      //   this.loading = true;
      //   let generalFormData = this.$refs.GeneralForm.form();
      //   console.log("generalFormData", generalFormData);
      //   if (generalFormData) {
      //     return ApiService.AdminApi.Users.update(this.User.id, generalFormData)
      //       .then(res => {
      //         this.User = res;
      //         this.$notify({
      //           type: "success",
      //           title: "Success",
      //           text: "Profile has been updated!"
      //         });
      //       })
      //       .catch(error => {
      //         this.$notify({
      //           type: "error",
      //           title: error.title,
      //           text: error.message
      //         });
      //       });
      //   }
    },
    back() {
      this.$router.go(-1);
    },
    refresh() {
      ApiService.AdminApi.LoadItems.list(this.$route.params.id).then(res => {
        this.rows = res.rows;
        this.cols = res.cols;
      });
    },
    save(formData) {
      //   // upload data to the server
      //   return ApiService.AdminApi.Users.uploadAvatar(this.User.id, formData)
      //     .then(res => {
      //       this.User = res;
      //       this.$notify({
      //         type: "success",
      //         title: "Success",
      //         text: "Profile has been updated!"
      //       });
      //     })
      //     .catch(err => {
      //       this.$notify({
      //         type: "error",
      //         title: error.title,
      //         text: error.message
      //       });
      //     });
    }
  }
};
</script>


<style scoped lang="scss">
.resize {
  -webkit-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  -moz-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  -o-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  transition: width 300ms ease-in-out, height 300ms ease-in-out;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.verticalTableHeader {
  text-align: center;
  white-space: nowrap;
  transform-origin: 50% 50%;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.verticalTableHeader:before {
  content: "";
  padding-top: 110%; /* takes width as reference, + 10% for faking some extra padding */
  display: inline-block;
  vertical-align: middle;
}
</style>