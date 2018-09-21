import Vue from 'vue';
const createSOHeader = async (request) => await Vue.prototype.$http.put('/api/company/SOHeader/Create', request);
const updateSOHeader = async (request) => await Vue.prototype.$http.post('/api/company/SOHeader/Update', request);
const getSOHeader = async (request) => await Vue.prototype.$http.get(`/api/read/SOHeader/GetById?id=${request}`);
const getListLeads = async (request) => {
  return await Vue.prototype.$http.post('/api/read/lead/getByQuery', request);
}
const getLead = async (request) => await Vue.prototype.$http.get(`/api/read/lead/getById?id=${request}`);
const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}

export default {
  getListLeads,
  createSOHeader,
  updateSOHeader,
  getSOHeader,
  getLead,
  getTeam
};
