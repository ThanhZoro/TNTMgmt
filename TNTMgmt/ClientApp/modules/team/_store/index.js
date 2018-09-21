import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  team: null,
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
    name: true,
    numberPerson: true,
    action: true,
    createUpdate: true,
  },
  advanceFilter: {
    filters: [
      { searchType: "text", field: "name", text: "team.name", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "updatedAt", dispatch: "" },
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
