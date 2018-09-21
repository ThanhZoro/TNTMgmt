import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter';
import commonFunc from "@/utils/common-func";
const getAssignmentPlan = async (context, request) => {
  var response = await api.getAssignmentPlan(request);
  context.commit('SET_LIST_ASSIGNMENTPLAN', response.data );
};

const getTracking = async (context) => {
  var query = utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  var response = await api.getAllTracking(query);
  context.commit('SET_TRACKING', response.data.data );
};
const searchRequest = async (context, request) => {
  context.commit('SET_SEARCH', request);
  context.dispatch('getTracking');
};
const editAssignmentPlan = async (context, request) => {
  let response = request.id ? await api.updateAssignmentPlan(request) : await api.createAssignmentPlan(request);
  await dispatchEditAssignmentPlan(context, response.data);
  return response;
};
const dispatchEditAssignmentPlan = async (context, data) => {
  if (context.rootState["$_assignmentList"]) {
    await context.commit('$_assignmentList/UPDATE_LIST_ASSIGNMENTPLAN', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
const setUserIds = (context, data) => {
  context.commit('SET_USER_IDS', data);
};
const deleteAssignmentPlan = async (context, request) => {
  var response = await api.deleteAssignmentPlan(request);
  return response;
};
const getTeam = async (context) => {
  var query = await utils.initFilter(context.state.advanceFilterTeam.choosenFilter, context.state.searchTeam);
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};
export default {
  getAssignmentPlan,
  getTracking,
  searchRequest,
  editAssignmentPlan,
  dispatchEditAssignmentPlan,
  setUserIds,
  deleteAssignmentPlan,
  getTeam
};
