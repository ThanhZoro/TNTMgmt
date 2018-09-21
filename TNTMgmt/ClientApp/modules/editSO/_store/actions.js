import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const createSO = async (context, request) => {
  let response = await api.createSO(request);
  await dispatchUpdateListSO(context, response.data);
  return response;
};

const updateSO = async (context, request) => {
  let response = await api.updateSO(request);
  await dispatchUpdateListSO(context, response.data);
  return response;
};

const dispatchUpdateListSO = async (context, data) => {
  if (context.rootState["$_soHeaderList"]) {
    await context.commit('$_soHeaderList/UPDATE_LIST_SO_HEADER', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getSO = async (context, request) => {
  let response = await api.getSO(request);
  context.commit('SET_SO', response.data);
};

const getListLeads = async (context, request = null) => {
  var query = await utils.initFilter('', context.state.searchRequest, request);
  var response = await api.getListLeads(query);
  return response.data;
};

const getLead = async (context, request) => {
  var result = { data: [] };
  let response = await api.getLead(request);
  result.data.push(response.data);
  return result;
};

const getTeam = async (context) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};

const getProductItemList = async (context, request = null) => {
  var query = await utils.applyFilterProductSO('', context.state.searchRequest, request);
  var response = await api.getProductItemList(query);
  return response.data;
};


export default {
  getListLeads,
  getLead,
  createSO,
  updateSO,
  dispatchUpdateListSO,
  getSO,
  getTeam,
  getProductItemList
};
