import Vue from 'vue';

const getSODetail = async (request) => await Vue.prototype.$http.get(`/api/read/SODetail/GetById?id=${request}`);
const createSODetail = async (request) => await Vue.prototype.$http.put('/api/company/SODetail/Create', request);
const updateSODetail = async (request) => await Vue.prototype.$http.post('/api/company/SODetail/Update', request);
const getProductItemList = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Product/GetByQuery', request);
} 

export default {
  getSODetail,
  createSODetail,
  updateSODetail,
  getProductItemList
};
