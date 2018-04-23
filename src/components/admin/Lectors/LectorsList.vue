


<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 class="padding elevation-0">
                <v-card>
                    <v-card-title>
                        <h4> Lectors </h4>
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search by E-mail" single-line hide-details v-model="search"></v-text-field>
                    </v-card-title>
                    <v-card-actions>
                        <router-link :to="'lectors/create'">
                            <v-icon color="primary">create</v-icon>
                        </router-link>
                        <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex class="elevation-0 padding " sm12>
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
                            <tr :active="props.selected" @click="showUser(props.item.id)">
                                <td @click="props.selected = !props.selected">
                                    <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                                </td>
                                <td class="text-xs-center">{{ props.item.id }}</td>
                                <td class="text-xs-center">

                                    <div v-if="props.item.user.profile && props.item.user.profile.avatar &&  props.item.user.profile.avatar.publicPath">
                                        <v-avatar :tile="false" :size="36" color="secondry">
                                            <img class="teal lighten-1" :src="props.item.user.profile.avatar.publicPath" alt="user avatar">
                                        </v-avatar>
                                    </div>
                                    <v-icon v-else medium color="primary">account_circle</v-icon>

                                </td>
                                <td class="text-xs-center">{{ props.item.user.email }}</td>
                                <td class="text-xs-center">{{ props.item.user&& props.item.user.profile && props.item.user.name }}</td>
                                <td class="text-xs-center">
                                    <router-link v-if="props.item.position" :to="'positions'">
                                        {{ props.item.position.title }}
                                    </router-link>
                                </td>
                                <td class="text-xs-center">
                                    <span v-if="props.item.position">
                                        {{ props.item.position.hours_count }}

                                    </span>
                                    <span v-else>
                                        -
                                    </span>
                                </td>
                                <td class="text-xs-center">
                                    <span class="group pa-2">
                                        <!-- <v-icon>home</v-icon> -->
                                        <!-- <v-icon>event</v-icon> -->
                                        <router-link :to="`users/${props.item.id}`">
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



<script>
import { ApiService } from "../../../services";
import _ from "lodash";
import LectorsInfo from "./LectorsInfo.vue";
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
      _: _,
      headers: [
        {
          text: "id",
          align: "center",
          sortable: false,
          value: "id"
        },
        { text: "Avatar", align: "center", value: "avatar", sortable: false },
        { text: "E-mail", align: "center", value: "calories" },
        { text: "Name", align: "center", value: "name" },
        { text: "Position", align: "center", value: "Specialty" },
        { text: "Hours Count", align: "center", value: "Course" },
        { text: "Actions", align: "center", sortable: false, value: "action" }
      ]
    };
  },
  components: {
    Info: LectorsInfo
  },
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        if (!oldValue.page) return;
        this.getDataFromApi().then(res => {
          console.log("res", res);
          this.items = res.items;
          this.totalItems = res.pagination.rowCount;
        });
      },
      deep: true
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
    showUser(userId) {
      console.log("showUser");
      this.selectedUser = userId;
      console.log("selectedUser", this.selectedUser);
    },
    getDataFromApi() {
      this.loading = true;

      return ApiService.AdminApi.Lectors.list(this.pagination)
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

<style scoped>
.resize {
  -webkit-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  -moz-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  -o-transition: width 300ms ease-in-out, height 300ms ease-in-out;
  transition: width 300ms ease-in-out, height 300ms ease-in-out;
}
</style>