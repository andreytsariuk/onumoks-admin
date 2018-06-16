<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">New Load Item</v-card-title>
        <v-container fluid style="min-height: 0;" grid-list-lg>
          <LoadItemForm ref="GeneralForm"> </LoadItemForm>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-4" flat @click.native="cancel()">{{cancelText}}</v-btn>
          <v-btn color="green darken-1" flat @click.native="create()">{{okText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import LoadItemForm from "./LoadItemForm";
import { ApiService } from "../../../services";

export default {
  props: ["okText", "cancelText", "dialog", "load"],
  data() {
    return {
      isOpen: false,
      loadObject: null
    };
  },
  components: { LoadItemForm },
  mounted() {
    this.isOpen = this.dialog;
  },
  watch: {
    dialog: function(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.isOpen = newValue;
    },
    load: {
      handler(newValue, oldValue) {
        if (
          newValue &&
          newValue.id &&
          (!oldValue || newValue.id !== oldValue.id)
        )
          this.loadObject = newValue;
      },
      deep: true
    }
  },
  methods: {
    action() {},
    cancel() {
      this.$refs.GeneralForm.clear();
      this.isOpen = false;
      this.$emit("cancel");
    },
    create() {
      let generalFormData = this.$refs.GeneralForm.form();
      if (generalFormData) {
        return ApiService.AdminApi.LoadItems.create(
          this.loadObject.id,
          generalFormData
        )
          .then(() =>
            this.$notify({
              type: "success",
              title: "Success",
              text: "New Load Item has been added"
            })
          )
          .then(() => {
            this.isOpen = false;
            this.$emit("action");
          });
      }
    }
  }
};
</script>