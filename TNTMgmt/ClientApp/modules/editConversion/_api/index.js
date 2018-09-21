import Vue from 'vue';

const getconversion = async (request) => await Vue.prototype.$http.get(`/api/read/Goal/${request.id}`);

const editConversion = async (request) => await Vue.prototype.$http.post(`/api/o2o/goal`, request.data);

export default {
  editConversion,
  getconversion
};
