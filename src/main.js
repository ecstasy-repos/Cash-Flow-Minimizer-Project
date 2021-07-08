import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import routes from './router/router.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.config.productionTip = false



new Vue({
  vuetify,
  router: router,
  render: h => h(App),
}).$mount('#app')
