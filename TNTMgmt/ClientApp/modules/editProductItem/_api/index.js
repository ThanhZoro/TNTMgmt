import Vue from 'vue';
const createProductItem = async (request) => await Vue.prototype.$http.put('/api/company/Product/Create', request);
const updateProductItem = async (request) => await Vue.prototype.$http.post('/api/company/Product/Update', request);
const getProductItem = async (request) => await Vue.prototype.$http.get(`/api/read/Product/GetById?id=${request}`);
const getProductCategory = async (request) => {
  return await Vue.prototype.$http.post('/api/read/ProductCategory/GetByQuery', request);
}

export default {
  createProductItem,
  updateProductItem,
  getProductItem,
  getProductCategory
};
