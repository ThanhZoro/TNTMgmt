import Vue from 'vue';
const createData = async (request) => await Vue.prototype.$http.put('/api/company/commonData/create', request);
const updateData = async (request) => await Vue.prototype.$http.post('/api/company/commonData/update', request);
const deleteData = async (request) => await Vue.prototype.$http.delete(`/api/company/commonData/delete?id=${request}`);

export default {
  createData,
  updateData,
  deleteData
};
