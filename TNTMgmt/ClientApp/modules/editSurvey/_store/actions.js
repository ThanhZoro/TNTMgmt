import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";

const getSurveyDetail = async (context, request) => {
  let response = await api.getSurveyDetail(request);
  context.commit('GET_SURVEY_DETAIL', response.data);
}

const editSurvey = async (context, request) => {
  let response = request.id ? await api.updateSurvey(request) : await api.createSurvey(request);
  await dispatchUpdateListSurveyDetails(context, response.data);
  return response;
};

const dispatchUpdateListSurveyDetails = async (context, data) => {
  if (context.rootState["$_surveyDetail"]) {
    await context.commit('$_surveyDetail/UPDATE_LIST_SURVEY_DETAILS', data, { root: true });
  } else {
    await commonFunc.sleep(1000);
  }
}
const getAllSurveyDetail = async (context, request) => {
  var response = await api.getAllSurveyDetail(request);
  context.commit("SET_SURVEY_ALL_DETAILS", response.data);
}

export default {
  editSurvey,
  getSurveyDetail,
  dispatchUpdateListSurveyDetails,
  getAllSurveyDetail
};
