


<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card class="">
          <v-card-title>
            <h4> Threads </h4>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
          </v-card-title>
          <v-card-actions>
            <router-link :to="'threads/create'">

              <v-btn flat icon color="primary">
                <v-icon>edit</v-icon>
              </v-btn>
            </router-link>

            <v-btn :disabled="!selected.length" flat icon color="error">
              <v-icon color="error">delete</v-icon>
            </v-btn>
            <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="elevation-0 padding " sm12 xs12>
        <v-card darck>
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
                <td class="text-xs-center">{{ props.item.title }}</td>

                <td class="text-xs-center">{{ props.item.courses_count }}</td>
                <td class="text-xs-center">{{ props.item.groups_count }}</td>

                <td class="text-xs-center">{{ props.item.students_count }}</td>

                <td class="text-xs-center">{{ props.item.created_at }}</td>
                <td class="text-xs-center">{{ props.item.updated_at }}</td>

                <td class="text-xs-center">
                  <span class="thread pa-2">
                    <v-btn flat icon color="info">
                      <router-link :to="`threads/${props.item.id}`">
                        <v-icon>info</v-icon>
                      </router-link>
                    </v-btn>
                    <v-btn flat icon color="error" @click="initDelete(props.item)">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </span>

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



<script >
import { ApiService } from "../../../services";
import _ from "lodash";
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
      headers: [
        {
          text: "id",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "Title", align: "center", value: "title" },
        {
          text: "Courses Count",
          align: "center",
          value: "courses_count",
          sortable: false
        },
        {
          text: "Groups Count",
          align: "center",
          value: "groups_count",
          sortable: false
        },
        {
          text: "Students Count",
          align: "center",
          value: "students_count",
          sortable: false
        },
        { text: "Created", align: "center", value: "created_at" },
        { text: "Updated", align: "center", value: "updated_at" },
        { text: "Actions", align: "center" }
      ],
      dialog: false,
      forDelete: null
    };
  },
  components: { ConfrmDialog },
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        if (!oldValue.page || newValue.page === oldValue.page) return;
        this.getDataFromApi().then(res => {
          console.log("res", res);
          this.items = res.items;
          this.totalItems = res.pagination.rowCount;
        });
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
      this.items = res.items;
      this.totalItems = res.pagination.rowCount;
    });
  },
  methods: {
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
      return ApiService.AdminApi.Threads.delete(this.forDelete.id)
        .then(res => this.getDataFromApi())
        .then(() =>
          this.$notify({
            type: "success",
            title: "Success",
            text: "Thread has been removed"
          })
        )
        .then(() => (this.dialog = false));
    },
    getDataFromApi() {
      this.loading = true;
      return ApiService.AdminApi.Threads.list(this.pagination)
        .then(res => {
          this.loading = false;
          this.items = res.items;
          return res;
        })
        .catch(err => {
          this.loading = false;
          this.items = [];
          return [];
        });
    },
    listSearch() {
      return ApiService.AdminApi.Threads.search({
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
.card__actions {
  a {
    text-decoration: none;
  }
}
.thread {
  a {
    text-decoration: none;
  }
}
</style>