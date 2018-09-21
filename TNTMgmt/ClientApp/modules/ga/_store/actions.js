import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};


const getAllTracking = async (context, request = null) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  let response = await api.getAllTracking(query);
  if (response.data.total <= response.data.from && response.data.from >0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getAllTracking');
  } else {
    context.dispatch('setTracking', { data: response.data.data, total: response.data.total });
  }  
};
const deleteTracking = async (context, request) => {
  let response = await api.deleteTracking(request);
  context.dispatch('getAllTracking', response.data);
};
const updateFilter = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER', request);
  context.dispatch('getAllTracking');
};
const searchRequest = async (context, request) => {
  context.commit('SET_SEARCH', request);
  context.dispatch('getAllTracking');
};
const setTracking = async (context, request) => {
  context.commit('SET_LIST_TRACKING', { data: request ? request.data : null, total: request ? request.total : 0});
};

const getGAMapping = async (context) => {
  let response = await api.getGAMapping();
  context.commit("SET_GAMAPPING", response.data);
};
export default {
  showHideCols,
  getAllTracking,
  deleteTracking,
  updateFilter,
  searchRequest,
  setTracking,
  getGAMapping
};
