import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import language from './modules/language'
import commonModule from './modules/common';
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    common: commonModule,
    auth,
    language
  },
})
