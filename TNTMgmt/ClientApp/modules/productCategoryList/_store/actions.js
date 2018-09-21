import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import { request } from 'http';

const getProductCategory = async (context, request= null) => {
  var query = await utils.applyFilterProductSO(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  var response = await api.getProductCategory(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getProductCategory');
  } else {
    context.commit('SET_LIST_PRODUCT_CATEGORY', { data: response.data.data, total: response.data.total });
  }  
};

const deleteProductCategory = async (context, request) => {
  await api.deleteProductCategory(request);
  context.dispatch('getProductCategory', request);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterProdCategory = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER_PROD_CATE', request);
  context.dispatch('getProductCategory');
};

const updateProductCategory = async (context, request) => {
  let response = await api.updateProductCategory(request);
  context.commit('UPDATE_LIST_PRODUCT_CATEGORY', request);
  return response;
};

const updateFilterCheckbox = async (context, request) => {
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null, type: request ? request.type : ''});
};

export default {
  getProductCategory,
  showHideCols,
  deleteProductCategory,
  updateFilterProdCategory,
  updateProductCategory,
  updateFilterCheckbox,
};
