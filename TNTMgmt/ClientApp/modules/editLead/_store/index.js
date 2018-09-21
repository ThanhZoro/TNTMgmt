import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  lead: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "createdAt", sortOrder: 1 },
    id: null
  },
  advanceFilter: {
    choosenFilter: []
  },
  team: null,
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
