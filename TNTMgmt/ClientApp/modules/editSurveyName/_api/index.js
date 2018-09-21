import Vue from 'vue';

const getSurvey = async (request) => await Vue.prototype.$http.get(`/api/read/SurveyHeader/GetById?id=${request}`);

const createSurveyName = async (request) => await Vue.prototype.$http.put('/api/company/SurveyHeader/Create', request);

const updateSurveyName = async (request) => await Vue.prototype.$http.post('/api/company/SurveyHeader/Update', request);

export default {
  createSurveyName,
  updateSurveyName,
  getSurvey
};
