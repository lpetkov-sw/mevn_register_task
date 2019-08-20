import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/app.scss";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
//Set axios base url of the API endpoint
Axios.defaults.baseURL = "http://localhost:3000/";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
