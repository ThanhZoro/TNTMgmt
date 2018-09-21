import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  productItem: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 },
    id: null
  },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
