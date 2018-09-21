import Vue from 'vue';
const createLead = async (request) => await Vue.prototype.$http.put('/api/company/lead/create', request);
const updateLead = async (request) => await Vue.prototype.$http.post('/api/company/lead/update', request);
const getLead = async (request) => await Vue.prototype.$http.get(`/api/read/lead/getById?id=${request}`);
const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
export default {
  createLead,
  updateLead,
  getLead,
  getTeam
};
