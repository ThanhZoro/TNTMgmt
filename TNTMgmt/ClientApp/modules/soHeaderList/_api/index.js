import Vue from 'vue';
const getSoHeader = async (request) => {
  return await Vue.prototype.$http.post('/api/read/SOHeader/GetByQuery', request);
} 
const deleteSoHeader = async (request) => await Vue.prototype.$http.delete('/api/company/SOHeader/Delete', { data: request});
const updateSoHeader = async (request) => await Vue.prototype.$http.post('/api/company/SOHeader/Update', request);
const getListLeads = async (request) => {
  return await Vue.prototype.$http.post('/api/read/lead/getByQuery', request);
}
const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}

export default {
  getSoHeader,
  deleteSoHeader,
  updateSoHeader,
  getListLeads,
  getTeam
};
