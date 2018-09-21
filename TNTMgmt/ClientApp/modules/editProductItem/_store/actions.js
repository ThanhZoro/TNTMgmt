import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const createProductItem = async (context, request) => {
  let response = await api.createProductItem(request);
  await dispatchUpdateListProductItem(context, response.data);
  return response;
};

const updateProductItem = async (context, request) => {
  let response = await api.updateProductItem(request);
  await dispatchUpdateListProductItem(context, response.data);
  return response;
};

const dispatchUpdateListProductItem = async (context, data) => {
  if (context.rootState["$_productItemList"]) {
    await context.commit('$_productItemList/UPDATE_LIST_PRODUCT_ITEM', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getProductItem = async (context, request) => {
  let response = await api.getProductItem(request);
  context.commit('SET_PRODUCT_ITEM', response.data);
};

const getProductCategory = async (context, request = null) => {
  var query = await utils.applyFilterProductSO('', context.state.searchRequest, request);
  var response = await api.getProductCategory(query);
  return response.data.data;
};

export default {
  createProductItem,
  updateProductItem,
  dispatchUpdateListProductItem,
  getProductItem,
  getProductCategory
};
