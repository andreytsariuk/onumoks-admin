// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import Notifications from 'vue-notification';
import VueCookie from 'vue-cookie';

import './stylus/main.styl';
//----------------------CSS__INCLUDES------------
import '../static/css/MaterialIcons.css';
import colors from 'vuetify/es5/util/colors'
import { AuthService } from './services';

Vue.use(VueCookie);
Vue.use(Notifications);
Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken3,
    secondary: colors.grey.darken2,
    accent: '#8c9eff',
    error: '#ff0000',
    lighten: colors.grey.lighten4,
  },
  lighten: colors.grey.lighten4,
  'font-family': 'Oswald'
})
Vue.config.productionTip = false;



router.beforeEach((route, redirect, next) => {

  function handleAuth() {

    if (AuthService.checkLogin())
      return next();
    else
      return next('/sign-in');
  }
  if (route.matched.some(record => record.meta.auth)) {

    return handleAuth();
  } else {
    return next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
