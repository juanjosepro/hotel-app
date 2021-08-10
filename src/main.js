import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/base'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import './registerServiceWorker'
import VueRouterUserRoles from 'vue-router-user-roles';

let auth = store.dispatch('login/getUserAuth');

auth.then((user) => {
  let role = null

  if (!user) {
    console.error('unauthorized')
    role = 'unauthorized'
  } else {
    role = user.role.id === '1' ? 'admin' : 'recep'
  }

  Vue.use(VueRouterUserRoles, { router });
  
  let authenticate = Promise.resolve({ role: role });
  
  authenticate.then(user => {
    Vue.prototype.$user.set(user);
    new Vue({
      store,
      router,
      vuetify,
      i18n,
      render: h => h(App),
    }).$mount('#app')
  });
})
