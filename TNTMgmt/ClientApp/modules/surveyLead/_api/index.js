import Vue from 'vue';

const getLeadInfo = async (request) => await Vue.prototype.$http.get(`/api/read/Lead/GetById?id=${request.leadId}`);

const getSurveyDetail = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyDetail/GetBySurveyHeader?surveyHeaderId=${request.surveyHeaderId}`);

const getNameSurvey = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyHeader/GetById?id=${request.surveyHeaderId}`);

const getSurveyLead = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyLead/Get?leadId=${request.leadId}&surveyHeaderId=${request.surveyHeaderId}`);

const getLeadSurvey = async (request) => await Vue.prototype.$http.all([getLeadInfo(request), getSurveyDetail(request), getNameSurvey(request), getSurveyLead(request)]);

const updateSurveyLead = async (request) => await Vue.prototype.$http.post('/api/company/SurveyLead/Update', request);

export default {
  getLeadInfo,
  getSurveyDetail,
  getNameSurvey,
  getSurveyLead,
  updateSurveyLead,
  getLeadSurvey
};
