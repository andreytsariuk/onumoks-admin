<template>
    <v-list>
        <v-list-group v-for="(item, i) in items" :key="i">
             
            <v-list-tile  slot="activator"  ripple @click.native="navigate(item)">
                <v-list-tile-action>
                    <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click.native="navigate(subItem)">
                <v-list-tile-action>
                    <v-icon v-html="subItem.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script>
import { AuthService } from "../../../services";
export default {
  data() {
    return {
      items: [
        {
          icon: "dashboard",
          title: "Schedule",
          link: "/student/schedule"
        }
      ]
    };
  },
  methods: {
    navigate(item) {
      if (!item.items)
        this.$router.push(`/${AuthService.Workspace().name}${item.link}`);
    }
  }
};
</script>


