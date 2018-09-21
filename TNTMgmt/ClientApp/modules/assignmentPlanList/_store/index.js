import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  assignmentPlan: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  headers: {
    title: true,
    revokeCons: true,
    tracking: true,
    mail: true,    
    create: true,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "text", field: "name", text: "assignmentPlan.name", dispatch: "" },
      { searchType: "checkbox", field: "trackingId", text: "assignmentPlan.tracking", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "assignmentPlan.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "assignmentPlan.updatedAt", dispatch: "" },
    ],
    show: false,
    showData: {},
    choosenFilter: []
  },
  searchRequestTracking: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "CreatedAt", sortOrder: 1 }
  },
  tracking : null
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
