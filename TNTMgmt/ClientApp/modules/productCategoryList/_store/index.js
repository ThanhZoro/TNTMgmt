import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  productCategory: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchRequestFilter: {
    desFilter: '',
    size: 5
  },
  headers: {
    categoryCode: true,
    name: true,    
    status: true,
    create: true,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "text", field: "categoryCode", text: "productCategory.categoryCode", dispatch: "" },
      { searchType: "text", field: "name", text: "productCategory.name", dispatch: "" },
      { searchType: "checkbox", field: "status", text: "productCategory.status", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "productCategory.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "productCategory.updatedAt", dispatch: "" },
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
