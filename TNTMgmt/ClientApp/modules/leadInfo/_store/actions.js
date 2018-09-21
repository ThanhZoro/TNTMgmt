import api from '../_api';
import Vue from 'vue';

const getLead = async (context, request) => {
  let response = await api.getLead(request);
  context.commit('SET_LEAD', response.data);
};
const updateLead = async (context, request) => {
  let response = await api.updateLead(request);
  await dispatchUpdataListLead(context, response.data);
  return response;
};
const dispatchUpdataListLead = async (context, data) => {
  if (context.rootState["$_leadList"]) {
    await context.commit('$_leadList/UPDATE_LIST_LEAD', data, { root: true });
  }
}
export default {
  getLead,
  dispatchUpdataListLead,
  updateLead
};
