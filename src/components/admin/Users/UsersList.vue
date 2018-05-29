


<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card>
          <v-card-title>
            <h4> Users </h4>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
          </v-card-title>
          <v-card-actions>
            <v-btn flat>
              <v-icon>create</v-icon>
            </v-btn>
            <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="elevation-0 padding " sm12 xs12>
        <v-card>
          <v-data-table v-model="selected" select-all selected-key="name" v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" :total-items="totalItems" :loading="loading" class="elevation-1">
            <template slot="headerCell" scope="props">

              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>

            <template slot="items" scope="props">
              <tr :active="props.selected">
                <td @click="props.selected = !props.selected">
                  <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                </td>
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">

                  <div v-if="props.item.profile && props.item.profile.avatar &&  props.item.profile.avatar.publicPath">
                    <v-avatar :tile="false" :size="36" color="secondry">
                      <img class="teal lighten-1" :src="props.item.profile.avatar.publicPath" alt="user avatar">
                    </v-avatar>
                  </div>
                  <v-icon v-else medium color="primary">account_circle</v-icon>

                </td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.profile.fname }}</td>
                <td class="text-xs-center">{{ props.item.profile.lname }}</td>
                <td class="text-xs-center">{{ props.item.profile.work_phone || '-' }}</td>
                <td class="text-xs-center">{{ formatRoles(props.item.short_roles) }}</td>
                <td class="text-xs-center">

                  <router-link :to="`users/${props.item.id}`">
                    <v-btn flat icon color="accent">
                      <v-icon>info</v-icon>
                    </v-btn>
                  </router-link>

                  <v-btn flat icon color="error" @click="initDelete(props.item)">
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>

          </v-data-table>

        </v-card>

      </v-flex>

    </v-layout>
    <ConfrmDialog :okText="'Remove'" :cancelText="'Cancel'" :dialog="dialog" @action="deleteThread()" @cancel="dialog=false"></ConfrmDialog>

  </div>

</template>



<script>
import { ApiService } from "../../../services";
import _ from "lodash";
import UsersInfo from "./UsersInfo.vue";
import ConfrmDialog from "../../Dialogs/ConfirmDialog";

export default {
  data() {
    return {
      search: "",
      totalItems: 0,
      items: [],
      selected: [],
      loading: true,
      selectedUser: false,
      pagination: {
        rowsPerPage: 10
      },
      _: _,
      headers: [
        {
          text: "id",
          align: "center",
          value: "id"
        },
        { text: "Avatar", align: "center", value: "avatar", sortable: false },
        { text: "E-mail", align: "center", value: "email" },
        {
          text: "First Name",
          align: "center",
          value: "firstName",
          sortable: false
        },
        {
          text: "Last Name",
          align: "center",
          value: "lastName",
          sortable: false
        },
        { text: "Phone Number", align: "center", value: "phone" },
        { text: "Role (s)", align: "center", value: "roles" },
        { text: "Actions", align: "center", sortable: false, value: "action" }
      ],
      dialog: false,
      forDelete: null
    };
  },
  components: {
    Info: UsersInfo,
    ConfrmDialog
  },
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        if (
          newValue.page !== oldValue.page ||
          newValue.sortBy !== oldValue.sortBy ||
          newValue.descending !== oldValue.descending ||
          newValue.rowsPerPage !== oldValue.rowsPerPage
        )
          this.getDataFromApi().then(res => {
            this.items = res.items;
            this.totalItems = res.pagination.rowCount;
          });
        else return;
      },
      deep: true
    },
    search: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) return;
        this.loading = true;
        this.listSearch().then(res => {
          this.items = res.items;
          this.totalItems = res.pagination.rowCount;
        });
      }
    }
  },
  mounted() {
    this.getDataFromApi().then(res => {
      console.log("res", res);
      this.items = res.items;
      this.totalItems = res.pagination.rowCount;
    });
  },
  methods: {
    formatRoles(roles) {
      return _.join(roles, ",");
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    initDelete(item) {
      this.forDelete = item;
      this.dialog = true;
    },
    deleteThread() {
      this.loading = true;
      return ApiService.AdminApi.Users.delete(this.forDelete.id)
        .then(res => this.getDataFromApi())
        .then(() =>
          this.$notify({
            type: "success",
            title: "Success",
            text: "User has been removed"
          })
        )
        .then(() => (this.dialog = false))
        .catch(() => {
          this.dialog = false;
          this.loading = false;
        });
    },
    listSearch() {
      return ApiService.AdminApi.Users.search({
        search: this.search,
        ...this.pagination
      })
        .then(res => {
          this.loading = false;
          return res;
        })
        .catch(err => {
          this.loading = false;
          this.items = [];
          return [];
        });
    },
    getDataFromApi() {
      this.loading = true;

      return ApiService.AdminApi.Users.list(this.pagination)
        .then(res => {
          this.loading = false;
          return res;
        })
        .catch(err => {
          this.loading = false;
          this.items = [];
          return [];
        });
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
td {
  button {
    margin: 0 !important;
    display: inline-block !important;
    a {
      text-decoration: none;
    }
  }
}
</style>