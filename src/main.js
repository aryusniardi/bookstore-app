import Vue from 'vue'
import './plugins/axios'
import './plugins/helpers'
import App from './App.vue'
import './registerServiceWorker'
import router from './routers'
import store from './stores'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
