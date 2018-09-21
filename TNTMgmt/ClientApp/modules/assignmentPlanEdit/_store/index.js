import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  assignmentPlan: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "createdAt", sortOrder: 1 },
    source: {
      includes: ["id", "name"]
    }
  },
  headers: {
    employee: true,
    number: true,
    action: true
  },
  user: {
    description: '',
    ids :[]
  },
  advanceFilter: {
    choosenFilter: []
  },
  tracking: null,
  team: null,
  searchTeam: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "createdAt", sortOrder: 1 },
    source: {
      includes: ["id", "name"]
    }
  },
  advanceFilterTeam: {
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
