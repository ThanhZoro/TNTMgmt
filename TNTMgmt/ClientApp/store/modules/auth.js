import Vue from 'vue'
import userManager from '@/store/userManager';

const SIGNIN = 'SIGNIN'
const SIGNOUT = 'SIGNOUT'
const LOADING_FINISH = 'LOADING_FINISH'

// initial state
const state = {
  signedIn: false,
  userInfo: null,
  loadingFinish: false,
}
// getters
const getters = {

}

// actions
const actions = {
  async signOut({ commit }) {
    try {
      Vue.cookie.set('o2o-requiredChangePassword', 'true');
      commit(SIGNOUT)
      await userManager.signoutRedirect();
      console.log("signed out", resp);
    } catch (e) {
      console.log(e)
    }
  },
  async signIn({ dispatch, commit, state }, user) {
    await commit(SIGNIN, user);
  },
  switchCompany({ dispatch, commit, state }) {
    window.location = `${Vue.cookie.get('identityServer')}/company/index`
  },
  async loadFinish({ dispatch, commit, state }) {
    await commit(LOADING_FINISH);
  },
}

// mutations
const mutations = {
  [SIGNIN](state, response) {
    state.signedIn = true
    state.userInfo = response
  },
  [SIGNOUT](state) {
    state.signedIn = false
    state.userInfo = null
  },
  [LOADING_FINISH](state) {
    state.loadingFinish = true
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
