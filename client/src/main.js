import Vue from 'vue'
import App from './App.vue'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '831376088434-jvhu4i71qfsvfdj38qff4l17um05gjff.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)

new Vue ({
    render: (h) => h(App)
}).$mount('#app')