

<template>
    <v-app id="inspire" >
        <v-navigation-drawer  clipped persistent v-model="drawer" enable-resize-watcher app>
            <SideBar ></SideBar>
        </v-navigation-drawer>
        <v-toolbar  dark  class="teal darken-2 white--text" app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class=" white--text">Moks</v-toolbar-title>
             <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon >search</v-icon>
          </v-btn>
         
          <a class="white--text" href="">
           <v-avatar :tile="false" :size="36"  color="secondry">
                  <img  class="teal lighten-1" src="workspace.avatar.publicPath" alt="">
                </v-avatar>
                 {{user.profile.fname}}
                {{user.profile.lname}}

          </a>

              <v-menu offset-y>
                 
                  
          <v-btn icon  slot="activator">
            <v-icon >more_vert</v-icon>
          </v-btn>
          <v-list>
        <v-list-tile  @click="logOut()">
          <v-list-tile-title >Log Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
       </v-menu>
        </v-toolbar>
        <main>
            <v-content>
                <router-view></router-view>
            </v-content>
        </main>
        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import { AuthService } from "../../../services";
import SideBar from "./SideBar";
export default {
  data: () => ({
    clipped: true,
    drawer: true,
    fixed: true,
    user: { profile: {} },
    items: [
      {
        icon: "bubble_chart",
        title: "Inspire"
      },
      {
        icon: "bubble_chart",
        title: "Log Out"
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "MOKS"
  }),
  mounted() {
    this.user = AuthService.getUser();
  },
  components: {
    SideBar
  },
  methods: {
    logOut() {
      AuthService.logOut();
      this.$router.push("/sign-in");
    }
  }
};
</script>

<style scoped>

</style>



