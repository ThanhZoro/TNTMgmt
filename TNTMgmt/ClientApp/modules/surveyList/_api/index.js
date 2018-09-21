import Vue from 'vue';

const getListSurvey = async (request) => {
  return await Vue.prototype.$http.post('/api/read/SurveyHeader/GetByQuery', request);
} 
const deleteSurveyHeader = async (request) => await Vue.prototype.$http.delete('/api/company/SurveyHeader/Delete', { data: request });
export default {
  getListSurvey,
  deleteSurveyHeader
};
