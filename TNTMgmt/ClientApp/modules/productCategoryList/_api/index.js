import Vue from 'vue';
const getProductCategory = async (request) => {
  return await Vue.prototype.$http.post('/api/read/ProductCategory/GetByQuery', request);
} 
const deleteProductCategory = async (request) => await Vue.prototype.$http.delete('/api/company/ProductCategory/Delete', { data: request});
const updateProductCategory = async (request) => await Vue.prototype.$http.post('/api/company/ProductCategory/Update', request);
export default {
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};
