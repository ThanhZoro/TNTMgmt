import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  productItemList: null,
  productCategoryList: null,
  productCategoryListFilter: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchRequestCategory: {
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
    productCode: true,
    name: true,
    unit: true,
    price: true,
    productCategoryId: true,
    status: true,
    desc: false,
    create: false,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "text", field: "productCode", text: "productItem.productCode", dispatch: "" },
      { searchType: "text", field: "name", text: "productItem.name", dispatch: "" },
      { searchType: "checkbox", field: "status", text: "productItem.status", dispatch: "" },
      { searchType: "checkbox", field: "productCategoryId", text: "productItem.productCategory", dispatch: "" },
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
