import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Vue from 'vue'

const state = {
  contacts: null,
  leadId: "",
  headers: {
    fullName: true,
    email: true,
    phone: true,
    position: true,
    action: true
  },
  searchRequest: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    description: '',
    sort: { field: "createdAt", sortOrder: 1 }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
