import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const createSOHeader = async (context, request) => {
  let response = await api.createSOHeader(request);
  await dispatchUpdateListSOHeader(context, response.data);
  return response;
};

const updateSOHeader = async (context, request) => {
  let response = await api.updateSOHeader(request);
  await dispatchUpdateListSOHeader(context, response.data);
  return response;
};

const dispatchUpdateListSOHeader = async (context, data) => {
  if (context.rootState["$_soHeaderList"]) {
    await context.commit('$_soHeaderList/UPDATE_LIST_SO_HEADER', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getSOHeader = async (context, request) => {
  let response = await api.getSOHeader(request);
  context.commit('SET_SO_HEADER', response.data);
};

const getListLeads = async (context, request = null) => {
  var query = await utils.initFilter('', context.state.searchRequest, request);
  var response = await api.getListLeads(query);
  return response.data;
};

const getTeam = async (context) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};

export default {
  getTeam,
  getListLeads,
  createSOHeader,
  updateSOHeader,
  dispatchUpdateListSOHeader,
  getSOHeader
};
