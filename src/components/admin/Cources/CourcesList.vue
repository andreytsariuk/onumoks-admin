


<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card class="">
                    <v-card-title>
                        <h4> Courses </h4>
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
                    </v-card-title>
                    <v-card-actions>
                        <router-link :to="'courses/create'">
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
            <v-flex class="elevation-0 padding " sm12>
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
                            <tr :active="props.selected" @click="showUser(props.item.id)">
                                <td @click="props.selected = !props.selected">
                                    <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                                </td>
                                <td class="text-xs-center">{{ props.item.id }}</td>
                                <td class="text-xs-center">{{ props.item.title }}</td>
                                <td class="text-xs-center">{{ props.item.level }}</td>
                                <td class="text-xs-center">
                                    <router-link v-if="props.item.specialty" :to="'specialties'">
                                        {{ props.item.specialty.name }}
                                    </router-link>
                                </td>
                                <td class="text-xs-center">{{ props.item.created_at }}</td>
                                <td class="text-xs-center">{{ props.item.studentsCount || 0 }}</td>
                                <td class="text-xs-center">
                                    <span class="group pa-2">
                                        <!-- <v-icon>home</v-icon> -->
                                        <!-- <v-icon>event</v-icon> -->
                                        <router-link :to="`courses/${props.item.id}`">
                                            <v-icon>info</v-icon>
                                        </router-link>
                                    </span>
                                </td>
                            </tr>
                        </template>

                    </v-data-table>

                </v-card>

            </v-flex>

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
      pagination: {},
      headers: [
        {
          text: "id",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "Title", align: "center", value: "title" },
        { text: "Level", align: "center", value: "level" },
        { text: "Specialty", align: "center", value: "specialty" },
        { text: "Created", align: "center", value: "created_at" },
        { text: "Students Count", align: "center", value: "studentsCount" },
        { text: "Actions", align: "center" }
      ]
    };
  },
  components: {},
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        if (!oldValue.page) return;

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
    showUser(userId) {
      this.selectedUser = userId;
    },
    getDataFromApi() {
      this.loading = true;

      return ApiService.AdminApi.Courses.list(this.pagination)
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
</style>