import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";


const updateSurveyLead = async (context, request) => {
  if (request.surveyItems[0]) {
    var response = await api.updateSurveyLead(request);
    await dispatchUpdateSurvey(context, response.data);
    return response;
  }
}

const updateSurveyLeadData = async (context, request) => {
  context.commit("UPDATE_SURVEY_LEAD_DATA", request);
}

const dispatchUpdateSurvey = async (context, data) => {
  if (context.rootState["$_leadList"]) {
    await context.commit('$_leadList/UPDATE_SURVEY_LEAD', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getLeadSurvey = async (context, request) => {
  let response = await api.getLeadSurvey(request);
  context.commit("SET_DATA", { leadInfo: response[0].data, surveyLead: response[1].data, nameSurvey: response[2].data, formData: response[3].data });
}
export default {
  updateSurveyLead,
  updateSurveyLeadData,
  dispatchUpdateSurvey,
  getLeadSurvey
};
