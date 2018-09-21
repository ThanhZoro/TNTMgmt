import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  soData: null,
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
  headers: {
    productItem: true,
    unit: true,
    price: true,
    quantity: true,
    amount: true,
    freeItem: true,
    action: true
  },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
