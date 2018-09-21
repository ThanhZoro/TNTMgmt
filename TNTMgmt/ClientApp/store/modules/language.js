const SET_LANG = 'SET_LANG'
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
import { i18n } from '../../i18n-setup';
import Vue from 'vue'
import { Validator } from 'vee-validate';
// initial state
const state = {
  language: Vue.cookie.get('language') || 'vi',
  toggleSidebar: Vue.cookie.get('toggleSidebar') == "true" || false,
}

// actions
const actions = {
  setLang({ commit }, lang) {
    commit(SET_LANG, lang)
  },
  setToggle({ commit }) {
    commit(TOGGLE_SIDEBAR)
  }
}

// mutations
const mutations = {
  [SET_LANG](state, response) {
    state.language = response
    i18n.locale = response;
    Vue.cookie.set('language', response);
    Validator.localize(response);
    Vue.moment.locale(response);
  },
  [TOGGLE_SIDEBAR](state) {
    let toggle = !state.toggleSidebar;
    state.toggleSidebar = toggle
    Vue.cookie.set('toggleSidebar', toggle);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
