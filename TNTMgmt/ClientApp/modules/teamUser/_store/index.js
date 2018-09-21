import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  team: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "createdAt", sortOrder: 1 },
    source: {
      includes: ["id", "name"]
    }
  },
  advanceFilter: {
    choosenFilter: []
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
