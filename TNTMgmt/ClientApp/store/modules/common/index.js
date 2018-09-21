import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  companyInfo: {},
  users: {},
  commonDatas: [],
  title: '',
  roles : []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
