import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from 'components/app-root'
import { FontAwesomeIcon } from './icons'
import VueQriously from 'vue-qriously'

import _ from 'lodash'
import Element from 'element-ui';
import './theme/index.css';
import { i18n } from './i18n-setup'
import VueCookie from 'vue-cookie'
import VueGmaps from 'vue-gmaps'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

Vue.use(VueGmaps, {
  key: 'AIzaSyBpUZo6wyhpSCfcVOkiPe1E8UpaGdIl9gQ',
  libraries: ['places'],
  version: '3'
})

Vue.use(VueCookie);
const moment = require('moment')
require("moment/min/locales.min");
Vue.use(require('vue-moment'), {
  moment
})

Vue.moment.locale(Vue.cookie.get('language') || 'vi');

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
Vue.use(VueQriously);
import en from 'vee-validate/dist/locale/en';
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from 'vee-validate';

// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('en', en);
Validator.localize('vi', vi);
Vue.use(VeeValidate, {
  locale: Vue.cookie.get('language') || 'vi'
});

Vue.config.productionTip = false;
//Vue.config.devtools = false;
//Vue.config.debug = false;
//Vue.config.silent = true;

// Registration of global components
Vue.component('icon', FontAwesomeIcon)

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

axios.defaults.baseURL = Vue.cookie.get('apiUrl');
axios.defaults.headers.common['CompanyId'] = Vue.cookie.get('tenantId');

NProgress.configure({ easing: 'ease', speed: 500 });
// before a request is made start the nprogress
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  NProgress.done()
  return response
}, (error) => {
  if (error.response.status == 401) {
    new PNotify({
      title: '',
      text: i18n.messages[Vue.cookie.get('language') || 'vi'].unauthorized,
      addclass: 'bg-danger'
    });
  } else {
    new PNotify({
      title: '',
      text: i18n.messages[Vue.cookie.get('language') || 'vi'].updateError,
      addclass: 'bg-danger'
    });
  }
  NProgress.done()
  throw error;
})

Vue.prototype.$http = axios
Vue.prototype._ = _;

const signalR = require("@aspnet/signalr");
let signalRConnection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/commonData")
  .build();
let leadSignalRConnection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/commonData")
  .build();
Vue.prototype.$signalRConnection = signalRConnection;
Vue.prototype.$leadSignalRConnection = leadSignalRConnection;

sync(store, router)

const app = new Vue({
  i18n,
  store,
  router,
  ...App
})

export {
  app,
  router,
  store
}
