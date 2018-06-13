


<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card class=" white--text ">
          <v-card-title>
            <h4> Invites </h4>
            <v-spacer></v-spacer>
            <v-text-field color="white" append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
          </v-card-title>
          <v-card-actions>
            <router-link :to="'files/create'">

              <v-btn flat icon color="primary">
                <v-icon>edit</v-icon>
              </v-btn>
            </router-link>
            <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="elevation-0 padding " sm12 xs12>
        <v-card>
          <v-data-table v-model="selected" select-all selected-key="name" v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" :total-items="totalItems" :loading="loading" :disable-initial-sort="true" class="elevation-1">
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
              <tr :active="props.selected" @click="">
                <td @click="props.selected = !props.selected">
                  <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                </td>
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.title || '-' }}</td>

                <td class="text-xs-center">
                  <div v-if="props.item.file_type === 'avatars'">
                    <v-icon medium color="primary">account_circle</v-icon>
                  </div>
                  <div v-else-if="props.item.file_type === 'books'">
                    <v-icon medium color="primary">gavel</v-icon>
                  </div>
                  <div v-else-if="props.item.file_type === 'documents'">
                    <v-icon medium color="primary">gavel</v-icon>
                  </div>
                  <div v-else-if="props.item.file_type === 'articles'">
                    <v-icon medium color="primary">description</v-icon>
                  </div>
                  <div v-else>
                    <v-icon medium color="primary">gavel</v-icon>
                  </div>
                </td>
                <td class="text-xs-center">
                  <div v-if=" props.item.user">
                    <router-link :to="`users/${props.item.user.id}`">
                      {{props.item.user.name}}
                    </router-link>
                  </div>
                  <div v-else>
                    -
                  </div>
                  <td class="text-xs-center">{{ props.item.created_at }}</td>
                  <td class="text-xs-center">
                    <span class="group pa-2">
                      <!-- <v-icon>home</v-icon> -->
                      <!-- <v-icon>event</v-icon> -->
                      <!-- <router-link :to="`specialties/${props.item.id}`">
                        <v-icon>info</v-icon>
                      </router-link> -->
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
import ConfrmDialog from "../../Dialogs/ConfirmDialog";

import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      totalItems: 0,
      items: [],
      selected: [],
      loading: true,
      selectedUser: false,
      pagination: {},
      headers: [
        {
          text: "id",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "Title", align: "center", value: "title" },
        { text: "File Type", align: "center", value: "file_type" },
        { text: "User", align: "center", value: "user" },
        { text: "Created", align: "center", value: "created_at" },
        { text: "Actions", align: "center" }
      ],
      uploadFieldName: "file",
      dialog: false,
      forDelete: null
    };
  },
  components: { ConfrmDialog },
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        if (!oldValue.page && newValue.page !== oldValue.page) return;

        this.getDataFromApi().then(res => {
          this.items = res.items;
          this.totalItems = res.pagination.rowCount;
        });
      },
      deep: true
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
      else this.selected = _.slice(this.items);
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
      return ApiService.AdminApi.Files.delete(this.forDelete.id)
        .then(res => this.getDataFromApi())
        .then(() =>
          this.$notify({
            type: "success",
            title: "Success",
            text: "Thread has been removed"
          })
        )
        .then(() => (this.dialog = false))
        .catch(() => {
          this.dialog = false;
          this.loading = false;
        });
    },
    getDataFromApi() {
      this.loading = true;

      return ApiService.AdminApi.Files.list({
        ...this.pagination,
        descending: true
      })
        .then(res => {
          console.log("res", res);
          this.loading = false;
          this.items = res.items;
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
.uploader {
  display: none;
}
.card__actions {
  a {
    text-decoration: none;
  }
}
</style>