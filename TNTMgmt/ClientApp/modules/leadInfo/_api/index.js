import Vue from 'vue';
const getLead = async (request) => await Vue.prototype.$http.get(`/api/read/lead/getById?id=${request}`);
const updateLead = async (request) => await Vue.prototype.$http.post('/api/company/lead/update', request);
export default {
  getLead,
  updateLead
};
