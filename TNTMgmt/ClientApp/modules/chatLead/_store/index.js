import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Vue from 'vue'

const state = {
  listMessages: null,
  size: 10,
  maxSize: 0,
  searchRequest: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    numberScroll: 1,
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
