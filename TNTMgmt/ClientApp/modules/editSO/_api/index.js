import Vue from 'vue';
const createSO = async (request) => await Vue.prototype.$http.put('/api/company/SOHeader/CreateSO', request);
const updateSO = async (request) => await Vue.prototype.$http.post('/api/company/SOHeader/UpdateSO', request);
const getSO = async (request) => await Vue.prototype.$http.get(`/api/read/SOHeader/GetSO?id=${request}`);
const getListLeads = async (request) => {
  return await Vue.prototype.$http.post('/api/read/lead/getByQuery', request);
}
const getLead = async (request) => await Vue.prototype.$http.get(`/api/read/lead/getById?id=${request}`);
const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
const getProductItemList = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Product/GetByQuery', request);
} 

export default {
  getListLeads,
  createSO,
  updateSO,
  getSO,
  getLead,
  getTeam,
  getProductItemList
};
