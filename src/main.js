import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import "./config/vant.config";
import "./style/global.scss";
import "./assets/font/style.css";

import AxiosConfig from './config/axios.config';

import Wechat from "./Tool/Wechat";

Vue.config.productionTip = false;

AxiosConfig.addCommonDataToRequest();
AxiosConfig.handle401OfResponse(router);
Wechat.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
