import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const createProductCategory = async (context, request) => {
  let response = await api.createProductCategory(request);
  await dispatchUpdateListProductCategory(context, response.data);
  return response;
};

const updateProductCategory = async (context, request) => {
  let response = await api.updateProductCategory(request);
  await dispatchUpdateListProductCategory(context, response.data);
  return response;
};

const dispatchUpdateListProductCategory = async (context, data) => {
  if (context.rootState["$_productCategoryList"]) {
    await context.commit('$_productCategoryList/UPDATE_LIST_PRODUCT_CATEGORY', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getProductCategory = async (context, request) => {
  let response = await api.getProductCategory(request);
  context.commit('SET_PRODUCT_CATEGORY', response.data);
};

export default {
  createProductCategory,
  updateProductCategory,
  dispatchUpdateListProductCategory,
  getProductCategory
};
