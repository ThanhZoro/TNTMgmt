import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const createLead = async (context, request) => {
  let response = await api.createLead(request);
  await dispatchUpdataListLead(context, response.data);
  return response;
};

const updateLead = async (context, request) => {
  let response = await api.updateLead(request);
  await dispatchUpdataListLead(context, response.data);
  return response;
};

const dispatchUpdataListLead = async (context, data) => {
  if (context.rootState["$_leadList"]) {
    await context.commit('$_leadList/UPDATE_LIST_LEAD', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getLead = async (context, request) => {
  let response = await api.getLead(request);
  context.commit('SET_LEAD', response.data);
};
const getTeam = async (context) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};
export default {
  createLead,
  updateLead,
  getLead,
  getTeam
};
