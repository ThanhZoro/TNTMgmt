import Vue from 'vue';

const getAllTracking = async (request) => await Vue.prototype.$http.post(`/api/read/Tracking/query`, request);

const deleteTracking = async (request) => await Vue.prototype.$http.delete('/api/o2o/tracking', { data: request });

const getGAMapping = async () => await Vue.prototype.$http.get('/api/o2o/googleAnalytics/credentials');
export default {
  getAllTracking,
  deleteTracking,
  getGAMapping
};
