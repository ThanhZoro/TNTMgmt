import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";

const setupAccount = async (context, request) => {
  let user = context.rootState.auth.userInfo.profile;
  let company = context.rootState.common.companyInfo;
  let response = await api.setupAccount({ id: user.sub, companyId: company.id, userName: user.userName, returnUrl: window.location.href });
};

const getListAccount = async (context, request) => {
  let response = await api.getListAccount(request);
  context.commit("SET_GOOGLEANLYTICS", { type: 'account', data: response.data });
};
const getListProperties = async (context, request) => {
  let response = await api.getListProperties(request);
  context.commit("SET_GOOGLEANLYTICS", { type: 'propertise', data: response.data });
};
const getListProfiles = async (context, request) => {
  let response = await api.getListProfiles(request);
  context.commit("SET_GOOGLEANLYTICS", { type: 'profile', data: response.data });
};
const editTracking = async (context, request) => {
  let response = await api.editTracking(request);
  await dispatchEditTracking(context, response.data);
  return response;
};
const getTracking = async (context, request) => {
  let response = await api.getTracking(request);
  context.commit('GET_TRACKING', response.data);
}
const getGAMapping = async (context) => {
  let response = await api.getGAMapping();
  context.commit("SET_GAMAPPING", response.data);
};
const dispatchEditTracking = async (context, data) => {
  if (context.rootState["$_ga"] || context.rootState["$_gaInfo"]) {
    if (context.rootState["$_ga"]) await context.commit('$_ga/UPDATE_LIST_TRACKING', data, { root: true });
    if (context.rootState["$_gaInfo"]) await context.commit('$_gaInfo/UPDATE_TRACKING', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
};
export default {
  setupAccount,
  getListAccount,
  getListProperties,
  getListProfiles,
  editTracking,
  getTracking,
  getGAMapping
};
