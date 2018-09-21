import Vue from 'vue';
const updateGeneralSettings = async (request) => await Vue.prototype.$http.post('/api/company/UpdateSettings', request);
const getTimeZone = async (request) => await Vue.prototype.$http.get('/api/read/Company/GetTimeZone');

export default {
  updateGeneralSettings,
  getTimeZone
};
