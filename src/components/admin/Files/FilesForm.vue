<template>
    <v-form v-model="valid" ref="generalForm">
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">Title</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-text-field :disabled="disabled" name="input-1" label="Title" v-model="title" required :rules="Rules.requiredTitleRules"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader>Subject</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-select label="Course" :items="subjects" v-model="subject" item-text="title" max-height="auto" autocomplete>
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
                <v-subheader>Lector</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-select label="Lector" :items="lectors" v-model="lector" item-text="user.name" max-height="auto" autocomplete>
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
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">Article Type</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-select :items="articles_types" v-model="aricle_weight" label="Select Article Type" item-value="value" item-text="text"></v-select>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-subheader class="">File (.doc)</v-subheader>
            </v-flex>
            <v-flex xs8>
                <v-btn @click="callInput" icon class="mr-3">
                    <input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" ref="fileInput" accept="application/msword" class="uploader">
                    <v-icon color="primary">add</v-icon>
                </v-btn>
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
      articles_types: [
        { text: "Тезисы", value: 1 },
        { text: "Статья", value: 2 },
        { text: "Статья в журнал", value: 3 }
      ],
      subjects: [],
      lectors: [],
      //------------Forms Params
      subject: null,
      title: null,
      lector: null,
      uploadFieldName: "file",
      formData: null,
      aricle_weight: null
    };
  },
  created() {
    this.getSubjects();
    this.getLectors();
  },
  watch: {},
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
    getLectors(search) {
      ApiService.AdminApi.Lectors.list({
        rowsPerPage: 20,
        search
      }).then(res => {
        this.lectors = res.items;
      });
    },
    callInput() {
      this.$refs.fileInput.click();
    },
    saveFile(formData) {
      // upload data to the server
      return ApiService.AdminApi.Lectors.uploadArticle(1, "articles", formData)
        .then(res => {
          this.$notify({
            type: "success",
            title: "Success",
            text: "File has been uploaded!"
          });
        })
        .then(() => this.getDataFromApi())
        .then(() => (this.loading = false))
        .catch(() => (this.loading = false));
    },
    filesChange(fieldName, fileList) {
      this.loading = true;
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.formData = formData;
    },
    clear() {
      this.$refs.generalForm.reset();
    },
    form() {
      if (this.$refs.generalForm.validate()) {
        this.subject &&
          this.subject.id &&
          this.formData.append("subject_id", this.subject.id);

        this.lector &&
          this.lector.id &&
          this.formData.append("lector_id", this.lector.id);

        this.formData.append("title", this.title);
        this.formData.append("aricle_weight", this.aricle_weight);
        return {
          lector: this.lector,
          uploadFieldName: "file",
          formData: this.formData
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
.uploader {
  display: none;
}
</style>
