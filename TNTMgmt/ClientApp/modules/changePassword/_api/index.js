import Vue from 'vue';
const changePassword = async (request) => await Vue.prototype.$http.post('/api/accounts/changePassword', request);

export default {
  changePassword
};
