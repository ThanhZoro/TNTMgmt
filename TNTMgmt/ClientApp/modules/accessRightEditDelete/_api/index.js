import Vue from 'vue';

const createAccessRight = async (request) => await Vue.prototype.$http.post(`/api/accounts/accessRight`, request);

const deleteAccessRight = async (request) => await Vue.prototype.$http.delete('/api/accounts/accessRight', { data: request });
export default {
  createAccessRight,
  deleteAccessRight
};
