import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  formData: { surveyItems: [] },
  surveyLead: null,
  leadInfo: null,
  nameSurvey: null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
