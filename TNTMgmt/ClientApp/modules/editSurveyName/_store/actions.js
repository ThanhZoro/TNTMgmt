import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const editSurvey = async (context, request) => {
  var response = request.id ? await api.updateSurveyName(request) : await api.createSurveyName(request);
  await dispatchUpdataListSurvey(context, response.data);
  return response;
}
const getSurvey = async (context, request) => {
  var response = await api.getSurvey(request);
  context.commit("SET_SURVEY", response.data);
}
const dispatchUpdataListSurvey = async (context, data) => {
  if (context.rootState["$_configSurvey"]) {
    await context.commit('$_configSurvey/UPDATE_LIST_SURVEY', data, { root: true });
  }
  if (context.rootState["$_surveyList"]) {
    await context.commit('$_surveyList/UPDATE_LIST_SURVEY', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

export default {
  editSurvey,
  getSurvey,
  dispatchUpdataListSurvey
};
