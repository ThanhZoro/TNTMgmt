import api from '../_api';
import Vue from 'vue';

const getSurveyDetail = async (context, request) => {
  var response = await api.getSurveyDetail(request); 
  context.commit("SET_SURVEY_DETAILS", response.data);
}

const sortSurveyDetail = async (context, request) => {
  var response = await api.sortSurveyDetail(request);
  context.commit("SORT_SURVEY", response.data);
  return response;
}

const deleteSurveyDetail = async (context, request) => {
  var response = await api.deleteSurveyDetail(request);
  context.commit("DELETE_SURVEY", response.data.ids);
};
const changeNumberSurveyList = async (context, request) => {
  if (context.rootState["$_surveyList"]) {
    await context.commit('$_surveyList/UPDATE_NUMBER_SURVEY', request, { root: true });
  }
};

export default {
  getSurveyDetail,
  sortSurveyDetail,
  deleteSurveyDetail,
  changeNumberSurveyList
};
