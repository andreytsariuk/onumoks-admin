


<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="padding elevation-0">
        <v-card class="">
          <v-card-title>
            <h4> Keywords </h4>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
          </v-card-title>
          <v-card-actions>
            <!-- <router-link :to="'load/create'">

              <v-btn flat icon color="primary">
                <v-icon>edit</v-icon>
              </v-btn>
            </router-link> -->

            <!-- <v-btn :disabled="!selected.length" flat icon color="error">
              <v-icon color="error">delete</v-icon>
            </v-btn> -->
            <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="elevation-0 padding " sm2 xs4 v-for="keyword in items" :key="keyword.id">
        <v-card class="primary--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div :disabled="!keyword.hidden" class="headline">{{keyword.name}}</div>
                  <div>{{keyword.description}}</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <router-link :to="`load/${keyword.id}`">
                            <v-btn flat icon color="accent">
                                <v-icon>info</v-icon>
                            </v-btn>
                        </router-link> -->
            <v-btn v-if="!keyword.hidden" flat icon color="error" @click="updateKeyword(keyword,true)">
              <v-icon color="error">block</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="success" @click="updateKeyword(keyword,false)">
              <v-icon color="success">add</v-icon>
            </v-btn>
            <!-- <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
      <div class="text-xs-center">
        <v-pagination :length="pageCount" v-model="pagination.page" :total-visible="7" circle></v-pagination>
      </div>
    </v-layout>
  </div>

</template>



<script >
import { ApiService } from "../../../services";
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
      pagination: {
        rowsPerPage: 42,
        search: null,
        page: 1
      },
      pageCount: 1,
      page: 1,
      dialog: false,
      forDelete: null
    };
  },
  components: {},
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        console.log("handler");
        if (!oldValue.page || newValue.page === this.page) return;
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
        this.pagination.search = newValue;
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
    updateKeyword(keyword, hidden) {
      return ApiService.AdminApi.Keywords.update(keyword.id, { hidden }).then(
        res => this.getDataFromApi()
      );
    },
    getDataFromApi() {
      this.loading = true;
      return ApiService.AdminApi.Keywords.list(this.pagination)
        .then(res => {
          this.loading = false;
          this.pageCount = res.pagination.pageCount;
          this.page = res.pagination.page;
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
      return ApiService.AdminApi.Keywords.search(this.pagination)
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
.headline {
  font-size: 18px !important;
}
</style>