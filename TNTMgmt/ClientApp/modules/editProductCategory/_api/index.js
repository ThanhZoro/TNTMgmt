import Vue from 'vue';
const createProductCategory = async (request) => await Vue.prototype.$http.put('/api/company/ProductCategory/Create', request);
const updateProductCategory = async (request) => await Vue.prototype.$http.post('/api/company/ProductCategory/Update', request);
const getProductCategory = async (request) => await Vue.prototype.$http.get(`/api/read/ProductCategory/GetById?id=${request}`);

export default {
  createProductCategory,
  updateProductCategory,
  getProductCategory
};
