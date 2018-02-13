<template>
  <v-layout class="background background-3">
    <div class="bacground-muted">
  
  
      <div class="login-layout">
  
        <v-stepper v-model="stepper" class="rounded grey lighten-3" color="secondary">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="stepper > 1">Workspace</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="stepper > 2">Credentials</v-stepper-step>
            <v-divider></v-divider>
  
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
  
              <v-card class="elevation-0">
                <v-form v-model="validWorkspace" class="grey lighten-3" v-on:submit.prevent="submitWorkspace">
                  <v-text-field label="Workspace" v-model="workspace" required></v-text-field>
                  <v-btn color="primary" type="submit">Continue</v-btn>
  
                </v-form>
  
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
  
              <div>
  
                <v-avatar :tile="false" :size="200" class="workspace-logo grey darken-4" color="secondry">
                  <img :class="{ 'visible-logo': stepper > 1  }" class="grey darken-1" src="/static/images/logo.png" alt="">
                </v-avatar>
  
  
              </div>
              <SignInForm ref="SignInForm" @submit="signIn()"> </SignInForm>
              <v-btn color="primary" @click="signIn()">Log In</v-btn>
  
            </v-stepper-content>
  
          </v-stepper-items>
        </v-stepper>
  
  
  
  
  
      </div>
  
  
    </div>
  
  </v-layout>
</template>

<script>
  import {
    Api
  } from "../../../services";
  import jwt_decode from "jwt-decode";
  import SignInForm from "./SignInForm.vue";
  export default {
    name: "hello",
    data() {
      return {
        loader: null,
        loading3: false,
        stepper: 0,
        workspace: "",
        validWorkspace: false
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
        console.log("Workspace", this.workspace);
        this.stepper = 2;
      },
      signIn() {
        console.log("fooooo");
        let signInData = this.$refs.SignInForm.form();
        if (signInData) {

          this.$router.push("/users");

          // this.loading3 = true;
          // Api.signIn(signInData)
          //   .then(res => {
          //     this.loading3 = false;
          //     var decoded = jwt_decode(res.data.token);
          //     Api.Axios().Api.setToken(res.data.token);
          //     console.log(decoded);
          //     this.$router.push("/users");
          //   })
          //   .catch(err => {
          //     this.loading3 = false;
          //   });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .login-card {
    top: 9rem;
  }
  
  .logo-container {
    height: 200px;
  }
  
  .login-logo {
    margin: 20px;
  }
  
  .login-label {
    margin-top: 90px;
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
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
  }
  
  .login-layout {
    padding-top: 10vh;
    padding-left: 30%;
    padding-right: 30%;
    padding-bottom: 20%;
  }
  
  .rounded {
    border-radius: 5px;
  }
  
  .workspace-logo {
    margin-top: 1vh !important;
    margin: 0 auto;
    display: block;
    visibility: hidden;
  }
  
  .visible-logo {
    visibility: visible;
  }
</style>
