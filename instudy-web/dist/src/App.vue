<template>
  <v-app light>
    <notifications />
    <router-view name="AdminHome"></router-view>
    <router-view></router-view>
    <router-view name="SignIn"></router-view>

    <v-footer :fixed="fixed">
      <span>&copy; 2018</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Admin Panel"
    };
  }
};
</script>

<style lang="stylus">
@import './stylus/main';
</style>


<style lang="css">
.padding {
  padding: 5px;
}

.card {
  margin: 8px;
}

.list__tile {
  cursor: pointer;
}
</style>
