import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import commonFunc from "@/utils/common-func";

const getSODetail = async (context, request) => {
  let response = await api.getSODetail(request);
  context.commit('SET_SO_DETAIL', response.data);
};

const createSODetail = async (context, request) => {
  let response = await api.createSODetail(request);
  await dispatchUpdateListSODetails(context, response.data);
  return response;
};

const updateSODetail = async (context, request) => {
  let response = await api.updateSODetail(request);
  await dispatchUpdateListSODetails(context, response.data);
  return response;
};

const dispatchUpdateListSODetails = async (context, data) => {
  if (context.rootState["$_soDetailList"]) {
    await context.commit('$_soDetailList/UPDATE_LIST_SO_DETAIL', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

const getProductItemList = async (context, request = null) => {
  var query = await utils.applyFilterProductSO('', context.state.searchRequest, request);
  var response = await api.getProductItemList(query);
  return response.data;
};

export default {
  getSODetail,
  createSODetail,
  updateSODetail,
  dispatchUpdateListSODetails,
  getProductItemList,
};
