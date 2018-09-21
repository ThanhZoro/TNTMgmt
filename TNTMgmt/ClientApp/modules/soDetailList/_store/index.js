import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  soDetailList: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 },
    soHeaderId: null
  },
  searchRequestFilter: {
    desFilter: '',
    size: 5
  },
  headers: {
    productCode: true,
    productName: true,
    unit: true,
    quantity: true,
    price: true,
    amount: true,
    freeItem: true,
    note: true,
    create: false,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "date", field: "createdAt", text: "productItem.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "productItem.updatedAt", dispatch: "" },
    ],
    show: false,
    showData: {},
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
