import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  users: {
    description: ""
  },
  source: {
    description: ""
  },
  channel: {
    description: ""
  },
  status: {
    description: ""
  },
  currentConversion: null,
  currentFormTracking: null,
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
