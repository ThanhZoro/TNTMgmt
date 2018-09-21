import Vue from 'vue';
const updateLeadRequire = async (request) => await Vue.prototype.$http.post('/api/company/UpdateSettings', request);

export default {
  updateLeadRequire
};
