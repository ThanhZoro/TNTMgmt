import Vue from 'vue';

const getListAssignmentPlan = async (request) => { return await Vue.prototype.$http.post('/api/read/LeadAssignmentConfig/GetByQuery', request);} 

const getAllTracking = async (request) => await Vue.prototype.$http.post(`/api/read/Tracking/query`, request);

const deleteAssignmentPlan = async (request) => await Vue.prototype.$http.delete('/api/job/LeadAssignmentConfig/Delete', { data: request });
export default {
  getListAssignmentPlan,
  getAllTracking,
  deleteAssignmentPlan
};
