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
          title: "Dashboard",
          link: "/admin/dashboard"
        },
        {
          icon: "people",
          title: "Users",
          link: "/admin/users",
          items: [
            {
              icon: "book",
              title: "Students",
              link: "/admin/students"
            },
            {
              icon: "school",
              title: "Lectors",
              link: "/admin/lectors"
            },
            {
              icon: "lock",
              title: "Admins",
              link: "/admin/admins"
            },
            {
              icon: "people",
              title: "All Users",
              link: "/admin/users"
            }
          ]
        },
        {
          icon: "school",
          title: "Students",
          link: "/admin/users",
          items: [
            {
              icon: "bubble_chart",
              title: "Specialties",
              link: "/admin/specialties"
            },
            {
              icon: "share",
              title: "Threads",
              link: "/admin/threads"
            },
            {
              icon: "local_library",
              title: "Courses",
              link: "/admin/courses"
            },
            {
              icon: "call_split",
              title: "Groups",
              link: "/admin/groups"
            }
          ]
        },
        {
          icon: "subject",
          title: "Subjects",
          link: "/admin/subjects"
        },
        {
          icon: "book",
          title: "Books",
          link: "/admin/books"
        },
        {
          icon: "insert_drive_file",
          title: "Files",
          link: "/admin/files"
        },
        {
          icon: "bubble_chart",
          title: "Invites",
          link: "/admin/invites"
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


