import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  soHeader: null,
  leadByers: null,
  team: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 },
    id: null
  },
  advanceFilter: {
    choosenFilter: []
  },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
