import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Vue from 'vue'

const state = {
  filter: [
    {
      value: 'status',
    },
    {
      value: 'work',
    },
    {
      value: 'note',
    }
    ,
    {
      value: 'call',
    }
    ,
    {
      value: 'email',
    }
    ,
    {
      value: 'edit',
    }
  ],
  data: null,
  checkList: [],
  searchRequest: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    sort: { field: "createdAt", sortOrder:1 }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
