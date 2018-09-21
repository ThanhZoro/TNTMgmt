import Vue from 'vue';
const updateInfo = async (request) => await Vue.prototype.$http.post('/api/company/UpdateSettings', request);
const getListSurvey = async (request) => {
  return await Vue.prototype.$http.post('/api/read/SurveyHeader/GetByQuery', request);
}

export default {
    updateInfo,
    getListSurvey
};
