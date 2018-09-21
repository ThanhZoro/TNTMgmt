import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  description: {
    choosenTab: 'contact'
  },
  carposting: {},
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
