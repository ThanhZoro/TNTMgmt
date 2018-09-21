import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const editTracking = async (context, request) => {
  let response = await api.editTracking(request);
  await dispatchEditTracking(context, response.data);
  return response;
}

const getTracking = async (context, request) => {
  let response = await api.getTracking(request);
  context.commit('GET_TRACKING', response.data);
}
const dispatchEditTracking = async (context, data) => {
  if (context.rootState["$_ga"]|| context.rootState["$_gaInfo"]) {
    if (context.rootState["$_ga"]) await context.commit('$_ga/UPDATE_LIST_TRACKING', data, { root: true });
    if (context.rootState["$_gaInfo"]) await context.commit('$_gaInfo/GET_TRACKING', data, { root: true });    
  } else {
    await commonFunc.sleep(1000)
  }
};
export default {
  editTracking,
  getTracking,
  dispatchEditTracking
};
