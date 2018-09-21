import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
import { request } from 'http';

const getSODetailList = async (context, request= null) => {
  var query = await utils.applyFilterSODetails(context.state.advanceFilter.choosenFilter, context.state.searchRequest, request);
  var response = await api.getSODetailList(query);
  if (response.data.total <= response.data.from && response.data.from > 0) {
    context.state.searchRequest.currentPage = Math.ceil(response.data.total / response.data.size);
    context.dispatch('getSODetailList');
  } else {
    context.commit('SET_LIST_SO_DETAIL', { data: response.data.data, total: response.data.total });
  }  
};

const deleteSODetail = async (context, request) => {
  await api.deleteProductItem(request);
  context.dispatch('getSODetailList', request);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};

const updateFilterSODetail = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER_SO_DETAIL', request);
  context.dispatch('getSODetailList');
};

const updateSODetail = async (context, request) => {
  let response = await api.updateSODetail(request);
  context.commit('UPDATE_LIST_SO_DETAIL', request);
  return response;
};

const updateFilterCheckbox = async (context, request) => {
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null, type: request ? request.type : ''});
};

export default {
  getSODetailList,
  showHideCols,
  deleteSODetail,
  updateFilterSODetail,
  updateSODetail,
  updateFilterCheckbox
};
