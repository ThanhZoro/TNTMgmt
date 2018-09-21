import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterAttribution = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER', request);
  context.dispatch('getListAssignmentPlan');
};

const getListAssignmentPlan = async (context, request = null) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  let response = await api.getListAssignmentPlan(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getListAssignmentPlan');
  } else {
    context.dispatch('setAssignmentPlan', { data: response.data.data, total: response.data.total });
  }
};
const setAssignmentPlan = async (context, request) => {
  context.commit('SET_LIST_ASSIGNMENTPLAN', { data: request ? request.data : null, total: request ? request.total : 0 });
};

const updateListAttribution = async (context, request) => {
  context.commit('UPDATE_LIST_ASSIGNMENTPLAN', request);
};
const getTracking = async (context) => {
  var query = utils.applyFilterTracking(context.state.advanceFilter.choosenFilter, context.state.searchRequestTracking);
  var response = await api.getAllTracking(query);
  context.commit('SET_TRACKING', response.data.data);
};

const deleteAssignmentPlan = async (context, request) => {
  await api.deleteAssignmentPlan(request);
  context.dispatch('getListAssignmentPlan', request);
};

export default {
  showHideCols,
  updateFilterAttribution,
  getListAssignmentPlan,
  updateListAttribution,
  setAssignmentPlan,
  getTracking,
  deleteAssignmentPlan
};
