import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  status: {
    description: ""
  },
  currentConversion: null,
  currentQRCodeTracking: null
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
