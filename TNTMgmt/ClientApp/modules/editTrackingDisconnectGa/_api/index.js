import Vue from 'vue';
const getTracking = async (request) => await Vue.prototype.$http.get(`/api/read/Tracking/${request}`);

const editTracking = async (request) => await Vue.prototype.$http.post('/api/o2o/tracking', request);

export default {
  editTracking,
  getTracking
};
