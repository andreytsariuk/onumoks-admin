import Vue from 'vue';
import Router from 'vue-router';
import { AdminRoutes } from './admin.router'
import { StudentRoutes } from './student.router'

import AdminHome from '@/components/admin/Layout/Home';
import StudentHome from '@/components/student/Layout/Home';
import WorkscpaceLayout from '@/components/workspace/Layout/Layout';
import LandingPage from '@/components/workspace/Landing/Landing';


import SignIn from '@/components/public/SignIn/SignIn.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      components: {
        SignIn
      }
    },
    {
      path: '/:workspace',
      name: 'WorkSpace',
      component: WorkscpaceLayout,
      children: [
        {
          path: '/',
          name: 'Landing',
          component: LandingPage
        },
        {
          path: 'admin',
          name: 'Admin',
          component: AdminHome,
          children: AdminRoutes,
          meta: {
            roles: ['admins'],
            auth: true
          }
        },
        {
          path: 'student',
          name: 'Student',
          component: StudentHome,
          children: StudentRoutes,
          meta: {
            auth: true
          }
        },


      ]
    },

  ]
})
