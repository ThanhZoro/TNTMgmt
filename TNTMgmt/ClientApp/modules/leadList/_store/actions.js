import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import { request } from 'http';

const getListLeads = async (context, request= null) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  var response = await api.getListLeads(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getListLeads');
  } else {
    context.dispatch('setLead', { data: response.data.data, total: response.data.total }); 
  }  
};

const deleteLead = async (context, request) => {
  await api.deleteLead(request);
  context.dispatch('getListLeads', request);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterLeads = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER_LEADS', request);
  context.dispatch('getListLeads');
};
const exportExcel = async (context, request) => {
  var query = utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.exportExcel({ query: query, language: request });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'lead_export_template.xlsx');
  document.body.appendChild(link);
  link.click();
};

const updateLead = async (context, request) => {
  let response = await api.updateLead(request);
  context.commit('UPDATE_LIST_LEAD', request);
  return response;
};

const setLead = async (context, request) => {
  context.commit('SET_LIST_LEADS', { data: request ? request.data : null, total: request ? request.total : 0  });
};

const updateFilterCheckbox = async (context, request) => {
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null, type: request ? request.type : ''});
};

const addStaffInCharge = async (context, request) => {
  let response = await api.addStaffInCharge(request);
  context.commit('UPDATE_STAFFINCHARGE', request);
};

const getAllTracking = async (context) => {
  var query = utils.applyFilterTracking([], context.state.searchRequestTracking);
  let response = await api.getAllTracking(query);
  context.commit('UPDATE_LIST_TRACKING', response.data);
};

export default {
  getListLeads,
  showHideCols,
  deleteLead,
  updateFilterLeads,
  exportExcel,
  updateLead,
  setLead,
  updateFilterCheckbox,
  addStaffInCharge,
  getAllTracking
};
