import Vue from 'vue';
const getConversion = async (request) => await Vue.prototype.$http.get(`/api/read/Goal?trackingId=${request}`);

const createCall = async (request) => await Vue.prototype.$http.put(`/api/o2o/call`, request);

const getCall = async (request) => await Vue.prototype.$http.get(`/api/read/Call/${request}`);

const updateCall = async (request) => await Vue.prototype.$http.post(`/api/o2o/call`, request);
export default {
  createCall,
  getCall,
  updateCall,
  getConversion
};
