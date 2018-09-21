import Vue from 'vue';

const getAssignmentPlan = async (request) => { return await Vue.prototype.$http.get(`/api/read/LeadAssignmentConfig/GetById?id=${request}`);} 

const getAllTracking = async (request) => await Vue.prototype.$http.post(`/api/read/Tracking/query`, request);

const createAssignmentPlan = async (request) => await Vue.prototype.$http.put(`/api/job/LeadAssignmentConfig/Create`, request);

const updateAssignmentPlan = async (request) => await Vue.prototype.$http.post(`/api/job/LeadAssignmentConfig/Update`, request);

const deleteAssignmentPlan = async (request) => await Vue.prototype.$http.delete('/api/job/LeadAssignmentConfig/Delete', { data: request });
const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
export default {
  getAssignmentPlan,
  getAllTracking,
  updateAssignmentPlan,
  createAssignmentPlan,
  deleteAssignmentPlan,
  getTeam
};
