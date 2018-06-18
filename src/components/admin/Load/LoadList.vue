


<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card class="">
          <v-card-title>
            <h4> Load </h4>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
          </v-card-title>
          <v-card-actions>
            <router-link :to="'load/create'">

              <v-btn flat icon color="primary">
                <v-icon>edit</v-icon>
              </v-btn>
            </router-link>

            <!-- <v-btn :disabled="!selected.length" flat icon color="error">
              <v-icon color="error">delete</v-icon>
            </v-btn> -->
            <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="elevation-0 padding " sm4 xs6 v-for="load in items" :key="load.id">
        <v-card class="primary--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div class="headline">{{load.title}}</div>
                  <div>{{load.description}}</div>
                </div>
              </v-flex>
              <v-flex xs5>
                <v-card-media src="/static/images/document_icon.png" height="125px" contain></v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`load/${load.id}`">
              <v-btn flat icon color="accent">
                <v-icon>info</v-icon>
              </v-btn>
            </router-link>
            <v-btn flat icon color="error" @click="initDelete(load)">
              <v-icon color="error">delete</v-icon>
            </v-btn>
            <!-- <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn> -->
          </v-card-actions>
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
        rowsPerPage: 40
      },
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
      return ApiService.AdminApi.Load.delete(this.forDelete.id)
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
          this.dialog = false;
          this.loading = false;
        });
    },
    getDataFromApi() {
      this.loading = true;
      return ApiService.AdminApi.Load.list(this.pagination)
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
      return ApiService.AdminApi.Load.search({
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
td {
  button {
    margin: 0 !important;
    display: inline-block !important;
    a {
      text-decoration: none;
    }
  }
}
.document-load {
  background: url(/static/images/document_icon.png) center center / contain
    no-repeat;
}
</style>