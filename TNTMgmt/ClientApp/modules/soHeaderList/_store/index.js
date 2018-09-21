import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  soHeaderList: null,
  listLeadsInHeader: null,
  team: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchLeadsRequest: {
    description: '',
    currentPage: 1,
    pageSize: 5,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchRequestFilter: {
    desFilter: '',
    size: 5
  },
  headers: {
    soNumberString: true,
    buyer: true,
    soInfo: true,
    totalHeader: true,
    salesUnit: false,    
    create: false,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "checkbox", field: "salesman", text: "so.salesman", dispatch: "" },
      { searchType: "checkbox", field: "buyer", text: "so.buyer", dispatch: "" },
      { searchType: "checkbox", field: "status", text: "so.status", dispatch: "" },
      { searchType: "date", field: "sODate", text: "so.sODate", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "so.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "so.updatedAt", dispatch: "" },
    ],
    show: false,
    showData: {},
    choosenFilter: [],
    choosenTeamFilter: []
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
