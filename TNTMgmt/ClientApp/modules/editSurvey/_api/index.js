import Vue from 'vue';

const createSurvey = async (request) => await Vue.prototype.$http.put('/api/company/SurveyDetail/Create', request);
const updateSurvey = async (request) => await Vue.prototype.$http.post('/api/company/SurveyDetail/Update', request);
const getSurveyDetail = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyDetail/GetById?id=${request}`);
const getAllSurveyDetail = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyDetail/GetBySurveyHeader?surveyHeaderId=${request}`);
export default {
  createSurvey,
  updateSurvey,
  getSurveyDetail,
  getAllSurveyDetail
};
