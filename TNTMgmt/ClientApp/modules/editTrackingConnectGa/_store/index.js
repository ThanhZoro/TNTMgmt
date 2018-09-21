import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  formData: null,
  googleAnalytic: {
    account: null,
    profile: null,
    propertise: null
  },
  tracking: null,
  GAMapping: null,
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
