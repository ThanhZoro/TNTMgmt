import Vue from 'vue';
const getCompany = async () => await Vue.prototype.$http.get('/api/read/company/getById');
const getAllCommonData = async () => await Vue.prototype.$http.get('/api/read/all/get');
const getCompanyCommonData = async (request) => await Vue.prototype.$http.all([getCompany(), getAllCommonData()]);
export default {
  getCompanyCommonData,
  getCompany,
  getAllCommonData
};
