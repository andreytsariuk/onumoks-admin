<template>
  <v-layout class="background background-1" dark>
    <div class="bacground-muted">
      <div v-if="workspace.avatar.publicPath" class="logo-container">
        <v-avatar  :tile="false" :size="200" class="workspace-logo grey darken-4" color="secondry">
         <img class="grey darken-1" :src="workspace.avatar.publicPath" alt="">
        </v-avatar>
        <h1 class="white--text">{{workspace.name}}</h1>
      </div>
  
      <div class="login-layout">
          <v-card class="rounded transparent white--text" dark>
              
             
              <SignUpInviteForm ref="SignUpInviteForm" @submit="signUp()"> </SignUpInviteForm>
              <v-btn color="primary" @click="signUp()">Sign Up</v-btn>
          </v-card>
            
  
      </div>
  
    </div>
  
  </v-layout>
</template>

<script>
import { ApiService } from "../../../services";
import jwt_decode from "jwt-decode";
import SignUpInviteForm from "./SignUpInviteForm.vue";
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
    SignUpInviteForm
  },
  watch: {
    loader() {}
  },
  mounted() {
    let { token } = this.$route.query;
    if (token) {
      ApiService.Invites.get({ token })
        .then(invite => {
          console.log("invite", invite);
          this.invite = invite;
          this.workspace = invite.workspace;
          this.$refs.SignUpInviteForm.email = invite.email;
          this.$refs.SignUpInviteForm.work_email = invite.email;

          this.$refs.SignUpInviteForm.fname = invite.name || "";
        })
        .catch(err => {
          return this.$router.push("/sign-in");
        });
    } else {
      return this.$router.push("/sign-in");
    }
    //
  },
  methods: {
    signUp() {
      let signUpData = this.$refs.SignUpInviteForm.form();
      if (signUpData) {
        ApiService.Auth.signUp(
          signUpData,
          this.workspace.name,
          this.invite.token
        )
          .then(res => routeAfterSignIn(res, this.$router, this.workspace.name))
          .catch(console.log);
      }
    },
    loadInviteInfo() {}
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
    padding-top: 2px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
