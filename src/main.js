import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import GlobalMixin from "@/mixins/GlobalMixin";
import SnackbarMixin from "@/mixins/SnackbarMixin";

import '@/assets/css/main.css'

Vue.mixin(GlobalMixin);
Vue.mixin(SnackbarMixin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
