import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  team: null,
  searchRequest: {
    description: '',
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
