import Vue from 'vue';
const createFormTracking = async (request) => await Vue.prototype.$http.put('/api/o2o/form', request);

const updateFormTracking = async (request) => await Vue.prototype.$http.post('/api/o2o/form', request);

const getForm = async (request) => await Vue.prototype.$http.get(`/api/read/Form/${request}`);

const getConversion = async (request) => await Vue.prototype.$http.get(`/api/read/Goal?trackingId=${request}`);
export default {
  createFormTracking,
  updateFormTracking,
  getForm,
  getConversion
};
