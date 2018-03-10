<template>
  <v-layout class="background background-1" dark>
    <div class="bacground-muted">
      <div class="logo-container">
       <img class="logo" src="https://instudy-backend.herokuapp.com/static/img/InStudyLogo_white.png" alt="">
      </div>
  
      <div class="login-layout">
  
        <v-stepper v-model="stepper" class="rounded transparent" dark>
          <v-stepper-header class="header-border">
            <v-stepper-step step="1" :complete="stepper > 1"><span class="stepper-title">Workspace</span> </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="stepper > 2"><span class="stepper-title">Credentials</span></v-stepper-step>
            <v-divider>   </v-divider>



          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form v-model="validWorkspace" class="transparent static-height" v-on:submit.prevent="submitWorkspace">
  
                <v-card class="elevation-0 transparent">
                  <v-text-field label="Workspace" v-model="workspace_name" required></v-text-field>
  
  
                </v-card>
                <v-btn :disabled="!!!workspace_name" color="primary" type="submit">Continue</v-btn>
  
              </v-form>
  
            </v-stepper-content>
            <v-stepper-content step="2">
  
              <div>
  
                <v-avatar :tile="false" :size="200" class="workspace-logo grey darken-4" color="secondry">
                  <img :class="{ 'visible-logo': stepper > 1  }" class="grey darken-1" :src="workspace.avatar.publicPath" alt="">
                </v-avatar>
  
  
              </div>
              <SignInForm ref="SignInForm" @submit="signIn()"> </SignInForm>
              <v-btn color="primary" @click="signIn()">Log In</v-btn>
              <v-btn color="secondary" @click="changeWorkspace()">Change Workspace</v-btn>
            </v-stepper-content>
  
          </v-stepper-items>
        </v-stepper>
  
  
  
  
  
      </div>
  
  
    </div>
  
  </v-layout>
</template>

<script>
import { Api, ApiService } from "../../../services";
import jwt_decode from "jwt-decode";
import SignInForm from "./SignInForm.vue";
import { routeAfterSignIn } from "../../../helpers";
export default {
  name: "hello",
  data() {
    return {
      loader: null,
      loading3: false,
      stepper: 0,
      workspace_name: "",
      validWorkspace: false,
      workspace: {
        avatar: {}
      }
    };
  },
  components: {
    SignInForm
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 2000);
      // @click.native="loader = 'loading3'" :disabled="loading3"
      this.loader = null;
    }
  },
  methods: {
    submitWorkspace() {
      console.log("Workspace", this.workspace_name);
      if (this.workspace_name)
        ApiService.Auth.initializeWorkspace(this.workspace_name).then(res => {
          this.workspace = res;
          console.log(this.workspace);
          this.stepper = 2;
        });
    },
    changeWorkspace() {
      this.stepper = 1;
    },
    signIn() {
      console.log("fooooo");
      let signInData = this.$refs.SignInForm.form();
      if (signInData) {
        ApiService.Auth.signIn(
          Object.assign(
            {},
            {
              workspace_id: this.workspace.id
            },
            signInData
          )
        ).then(res => routeAfterSignIn(res, this.$router, this.workspace.name));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.logo-container {
  text-align: center;
}
.logo {
  max-width: 300px;
}

.project-logo {
  font-size: 4rem;
  color: white;
  margin: 0 auto;
  display: block;
}

.background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.background-1 {
  background-image: url(/static/images/in-Study-background-1.jpeg);
}

.background-2 {
  background-image: url(/static/images/in-Study-background-2.jpeg);
}

.background-3 {
  background-image: url(/static/images/in-Study-background-3.jpeg);
}

.background-4 {
  background-image: url(/static/images/in-Study-background-4.jpeg);
}

.bacground-muted {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.login-layout {
  padding-left: 30%;
  padding-right: 30%;
  padding-bottom: 50px;
}

.rounded {
  border-radius: 5px;
  border: 1px solid white !important;
}

.workspace-logo {
  margin-top: 1vh !important;
  margin: 0 auto;
  display: block !important;
  visibility: hidden;
}

.visible-logo {
  visibility: visible;
}

.static-height {
  /* height: 70vh; */
}

.stepper-title {
  font-size: 2vh;
}

.header-border {
  border-bottom: 1px solid white;
}

@media (max-width: 1024px) {
  .login-layout {
    padding-top: 10vh;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
