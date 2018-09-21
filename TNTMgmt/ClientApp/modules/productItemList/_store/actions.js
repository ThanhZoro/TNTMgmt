import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import { request } from 'http';

const getProductItem = async (context, request= null) => {
  var query = await utils.applyFilterProductSO(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  var response = await api.getProductItem(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getProductItem');
  } else {
    context.commit('SET_LIST_PRODUCT_ITEM', { data: response.data.data, total: response.data.total });
  }  
};

const deleteProductItem = async (context, request) => {
  await api.deleteProductItem(request);
  context.dispatch('getProductItem', request);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterProdItem = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER_PROD_ITEM', request);
  context.dispatch('getProductItem');
};

const updateProductItem = async (context, request) => {
  let response = await api.updateProductItem(request);
  context.commit('UPDATE_LIST_PRODUCT_ITEM', request);
  return response;
};

const updateFilterCheckbox = async (context, request) => {
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null, type: request ? request.type : ''});
};

const getProductCategory = async (context, request = null) => {
  var query = await utils.applyFilterProductSO('', context.state.searchRequestCategory, request);
  var response = await api.getProductCategory(query);
  if (context.state.searchRequestCategory.description) {
    context.commit('SET_LIST_PRODUCT_CATEGORY_FILTER', response.data);
  }
  else {
    context.commit('SET_LIST_PRODUCT_CATEGORY', response.data);
  }
};

export default {
  getProductItem,
  showHideCols,
  deleteProductItem,
  updateFilterProdItem,
  updateProductItem,
  updateFilterCheckbox,
  getProductCategory
};
