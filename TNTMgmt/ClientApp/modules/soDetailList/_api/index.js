import Vue from 'vue';
const getSODetailList = async (request) => {
  return await Vue.prototype.$http.post('/api/read/SODetail/GetByQuery', request);
} 
const deleteSODetail = async (request) => await Vue.prototype.$http.delete('/api/company/SODetail/Delete', { data: request});

const updateSODetail = async (request) => await Vue.prototype.$http.post('/api/company/SODetail/Update', request);

export default {
  getSODetailList,
  deleteSODetail,
  updateSODetail
};
