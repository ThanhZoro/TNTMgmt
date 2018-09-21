import Vue from 'vue';
const getProductItem = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Product/GetByQuery', request);
} 
const deleteProductItem = async (request) => await Vue.prototype.$http.delete('/api/company/Product/Delete', { data: request});

const updateProductItem = async (request) => await Vue.prototype.$http.post('/api/company/Product/Update', request);

const getProductCategory = async (request) => {
  return await Vue.prototype.$http.post('/api/read/ProductCategory/GetByQuery', request);
}
export default {
  getProductItem,
  deleteProductItem,
  updateProductItem,
  getProductCategory
};
