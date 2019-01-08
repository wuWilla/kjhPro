import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import url from "./modules/url";
// import trade from "./modules/trade";

Vue.use(Vuex);

export default new Vuex.Store({
     modules: {
         user,
         url
     }
});
