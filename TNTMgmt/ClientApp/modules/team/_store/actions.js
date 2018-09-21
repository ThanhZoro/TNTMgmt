import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterTeam = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER', request);
  context.dispatch('getTeam');
};


const getTeam = async (context, request = null) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  let response = await api.getTeam(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getTeam', { accountId: context.state.accountId });
  } else {
    context.dispatch('setTeam', { data: response.data.data, total: response.data.total });
  }  
};
const setTeam = async (context, request) => {
  context.commit('SET_LIST_TEAM', { data: request ? request.data : null, total: request ? request.total : 0 });
};

const updateListSurvey = async (context, request) => {
  context.commit('UPDATE_LIST_TEAM', request);
};
const deleteTeam = async (context, request) => {
  await api.deleteTeam(request);
  context.dispatch('getTeam', request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'delete-team', message: request.ids }));
};
export default {
  showHideCols,
  updateFilterTeam,
  getTeam,
  updateListSurvey,
  setTeam,
  deleteTeam
};
