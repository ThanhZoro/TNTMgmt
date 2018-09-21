import Vue from 'vue';

const createAccessRight = async (request) => await Vue.prototype.$http.post(`/api/accounts/accessRight`, request);

export default {
  createAccessRight
};
