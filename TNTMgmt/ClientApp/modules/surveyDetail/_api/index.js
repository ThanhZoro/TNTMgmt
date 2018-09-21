import Vue from 'vue';

const getSurveyDetail = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyDetail/GetBySurveyHeader?surveyHeaderId=${request}`);

const sortSurveyDetail = async (request) => await Vue.prototype.$http.post(`/api/company/SurveyDetail/Sort`, request);

const deleteSurveyDetail = async (request) => await Vue.prototype.$http.delete(`/api/company/SurveyDetail/Delete`, { data: request });
export default {
  getSurveyDetail,
  sortSurveyDetail,
  deleteSurveyDetail
};
