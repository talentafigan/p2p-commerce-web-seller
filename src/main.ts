import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueJSToggleButton from "./plugins/vue-js-pluggin-button";
import store from "./store";
import ComponentModule from "@/components/module";
import ApexCharts from "vue-apexcharts";
import PluginAxios from "@/plugins/axios";
import Helpers from "@/plugins/helpers";
import Snackbar from "@/plugins/snackbar";
import { VueEditor } from "vue2-editor";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib";
import FirebasePlugin from "@/plugins/firebase";

import "@/assets/styles/scss/index.scss";
import "@/assets/styles/css/index.css";

Vue.config.productionTip = false;

PluginAxios();
ComponentModule();
VueJSToggleButton();
FirebasePlugin();

Vue.component("vue-editor", VueEditor);
Vue.component("apex-chart", ApexCharts);

Vue.component("v-text-field", VTextField);
Vue.use(VCurrencyField, {
  locale: "pt-BR",
  decimalLength: 0,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: true,
  allowNegative: false,
});

Vue.prototype.$helpers = new Helpers();
Vue.prototype.$snackbar = new Snackbar();

export const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
