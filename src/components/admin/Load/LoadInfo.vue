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
                <th class="verticalTableHeader">Lector</th>
                <th class="verticalTableHeader">Course</th>
                <th class="verticalTableHeader">Thread</th>
                <th class="verticalTableHeader">Group</th>

                <th class="vertical " v-for="col in cols " :key="col.id ">
                  <div class="vertical "> {{col.name}} ({{col.description}})</div>

                </th>
                <th class="verticalTableHeader ">Summ</th>
              </tr>
              <tr class="load-row" v-for="row in rows " :key="row.id " @contextmenu="show" @click.right="clickRow(row)">
                <td>
                  <span v-if="row.subject && row.subject.id ">{{row.subject.title}} </span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="row.course && row.course.specialty && row.course.specialty.title ">{{row.course.specialty.title}}</span>

                  <span v-else-if="row.group && row.group.course && row.group.course.specialty && row.group.course.specialty.title ">{{row.group.course.specialty.title}}</span>

                  <span v-else-if="row.thread && row.thread.groups && row.thread.groups[0] && row.thread.groups[0].course && row.thread.groups[0].course.specialty && row.thread.groups[0].course.specialty.title ">{{row.thread.groups[0].course.specialty.title}}</span>

                  <span v-else-if="row.thread && row.thread.courses && row.thread.courses[0] && row.thread.courses[0].specialty &&row.thread.courses[0].specialty.title ">{{row.thread.courses[0].specialty.title}}</span>

                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="row.lector && row.lector.user &&row.lector.user.name ">{{row.lector.user.name}}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="row.course && row.course.title ">{{row.course.title}}</span>
                  <span v-else>-</span>
                </td>
                <td>Thread</td>
                <td>Group</td>
                <td v-for="col in cols " :key="col.id ">
                  <span v-if="col.id===row.lessonType.id ">{{row.hours_count}} </span>
                  <span v-else>-</span>
                </td>
                <td>Summ</td>
              </tr>
            </table>
          </v-flex>
          <v-btn color="pink " dark small absolute bottom right fab @click="dialog=true ">
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-flex>
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" offset-y absolute>
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-title>Edit</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="deleteDialog = true">
          <v-list-tile-title>Remove</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <ConfrmDialog :okText="'Remove'" :cancelText="'Cancel'" :dialog="deleteDialog" @action="deleteLoadItem()" @cancel="deleteDialog=false"></ConfrmDialog>

    <LoadItemDialog :load="load " :okText=" 'Create' " :cancelText=" 'Cancel' " :dialog="dialog " @action="refresh() " @cancel="dialog=false "></LoadItemDialog>
  </v-layout>
</template>

<script>
import Config from "../../../config";
import { ApiService, AuthService } from "../../../services";
import LoadItemDialog from "./LoadItemDialog";
import ConfrmDialog from "../../Dialogs/ConfirmDialog";

import _ from "lodash";
///sdsds
export default {
  props: ["userId"],
  data() {
    return {
      dialog: false,
      showMenu: false,
      x: 0,
      y: 0,
      load: null,
      rows: [],
      cols: [],
      deleteDialog: false,
      forDelete: null
    };
  },
  components: { LoadItemDialog, ConfrmDialog },
  created() {
    return this.getDataFromApi();
  },
  computed: {},
  methods: {
    clickRow(row) {
      console.log("foo", row);
      this.forDelete = row;
    },
    getDataFromApi() {
      return ApiService.AdminApi.Load.get(this.$route.params.id)
        .then(load => (this.load = load))
        .then(() => ApiService.AdminApi.LoadItems.list(this.$route.params.id))
        .then(res => {
          this.rows = res.rows;
          this.cols = res.cols;
        });
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    deleteLoadItem() {
      this.loading = true;
      return ApiService.AdminApi.LoadItems.delete(
        this.load.id,
        this.forDelete.id
      )
        .then(res => this.getDataFromApi())
        .then(() =>
          this.$notify({
            type: "success",
            title: "Success",
            text: "Load has been removed"
          })
        )
        .then(() => (this.dialog = false))
        .catch(() => {
          this.deleteDialog = false;
          this.loading = false;
        });
    },
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
      this.dialog = false;
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
  td {
    text-align: center;
  }
}

div.vertical {
  margin-left: -85px;
  position: absolute;
  width: 215px;
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg); /* Safari/Chrome */
  -moz-transform: rotate(-90deg); /* Firefox */
  -o-transform: rotate(-90deg); /* Opera */
  -ms-transform: rotate(-90deg); /* IE 9 */
}

th.vertical {
  height: 220px;
  padding-bottom: 30px;
  min-width: 40px;
  text-align: left;
}
.load-row:hover {
  background-color: gray;
}
</style>