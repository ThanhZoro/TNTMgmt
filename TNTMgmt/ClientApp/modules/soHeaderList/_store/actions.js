import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import { request } from 'http';

const getSoHeader = async (context, request= null) => {
  var query = await utils.applyFilterProductSO(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  var response = await api.getSoHeader(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getSoHeader');
  } else {
    context.commit('SET_LIST_SO_HEADER', { data: response.data.data, total: response.data.total });
  }  
};

const deleteSoHeader = async (context, request) => {
  await api.deleteSoHeader(request);
  context.dispatch('getSoHeader', request);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterSoHeader = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER_SO_HEADER', request);
  context.dispatch('getSoHeader');
};

const updateSoHeader = async (context, request) => {
  let response = await api.updateSoHeader(request);
  context.commit('UPDATE_LIST_SO_HEADER', request);
  return response;
};

const updateFilterCheckbox = async (context, request) => {
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null, type: request ? request.type : ''});
};

const getListLeads = async (context, request = null) => {
  var query = await utils.initFilter('', context.state.searchLeadsRequest, request);
  var response = await api.getListLeads(query);
  context.commit('UPDATE_LIST_LEADS', response.data);
};

const getTeam = async (context) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};

export default {
  getSoHeader,
  showHideCols,
  deleteSoHeader,
  updateFilterSoHeader,
  updateSoHeader,
  updateFilterCheckbox,
  getListLeads,
  getTeam
};
