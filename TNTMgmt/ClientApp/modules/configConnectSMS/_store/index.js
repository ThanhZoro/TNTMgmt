import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  surveys: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
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
