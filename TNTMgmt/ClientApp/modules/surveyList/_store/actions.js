import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterSurvey = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER', request);
  context.dispatch('getListSurvey');
};


const getListSurvey = async (context, request = null) => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  let response = await api.getListSurvey(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getListSurvey', { accountId: context.state.accountId });
  } else {
    context.dispatch('setSurvey', { data: response.data.data, total: response.data.total });
  }  
};
const setSurvey = async (context, request) => {
  context.commit('SET_LIST_SURVEY', { data: request ? request.data : null, total: request ? request.total : 0 });
};

const updateListSurvey = async (context, request) => {
  context.commit('UPDATE_LIST_SURVEY', request);
};
const deleteSurveyHeader = async (context, request) => {
  await api.deleteSurveyHeader(request);
  context.dispatch('getListSurvey', request);
};
export default {
  showHideCols,
  updateFilterSurvey,
  getListSurvey,
  updateListSurvey,
  setSurvey,
  deleteSurveyHeader
};
