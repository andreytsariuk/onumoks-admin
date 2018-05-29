<template>
    <v-layout row justify-center>
        <v-dialog v-model="isOpen" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>
                <v-card-text>Do you realy want to delete this item?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal darken-4" flat @click.native="cancel()">{{cancelText}}</v-btn>
                    <v-btn color="green darken-1" flat @click.native="action()">{{okText}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>
export default {
  props: ["okText", "cancelText", "dialog"],
  data() {
    return {
      isOpen: false
    };
  },
  mounted() {
    this.isOpen = this.dialog;
  },
  watch: {
    dialog: function(newValue, oldValue) {
      if (newValue === oldValue) return;
      this.isOpen = newValue;
    }
  },
  methods: {
    action() {
      this.isOpen = false;
      this.$emit("action");
    },
    cancel() {
      this.isOpen = false;
      this.$emit("cancel");
    }
  }
};
</script>