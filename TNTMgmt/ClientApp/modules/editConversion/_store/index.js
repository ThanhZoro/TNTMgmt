import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  status: {
    description: ""
  },
  currentTracking: null,
  currentConversion: null
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
