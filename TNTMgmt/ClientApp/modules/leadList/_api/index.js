import Vue from 'vue';
const getListLeads = async (request) => {
  return await Vue.prototype.$http.post('/api/read/lead/getByQuery', request);
} 
const deleteLead = async (request) => await Vue.prototype.$http.delete('/api/company/lead/delete', { data: request});
const exportExcel = async (request) => {
  let response = await Vue.prototype.$http.post('/api/read/lead/export?language=' + request.language, request.query, {
    responseType: 'blob'
  });
  return response;
};
const updateLead = async (request) => await Vue.prototype.$http.post('/api/company/lead/update', request);
const addStaffInCharge = async (request) => {
  return await Vue.prototype.$http.post('/api/company/Lead/AddStaffInCharge', request);
};
const getAllTracking = async (request) => await Vue.prototype.$http.post(`/api/read/Tracking/query`, request);
export default {
  getListLeads,
  deleteLead,
  exportExcel,
  updateLead,
  addStaffInCharge,
  getAllTracking
};
