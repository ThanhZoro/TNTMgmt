import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const editFormTracking = async (context, request) => {
  let response = request.id ? await api.updateFormTracking(request) : await api.createFormTracking(request);
  await dispatchEditFormTracking(context, response.data);
  return response;
};
const getForm = async (context, request) => {
  let response = await api.getForm(request);
  context.commit("SET_FORM_TRACKING", response.data);
};
const dispatchEditFormTracking = async (context, data) => {
  if (context.rootState["$_gaInfo"]) {
    await context.commit('$_gaInfo/UPDATE_ELEMENT_TRACKING', { data: data, element: 'formTracking' }, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
const getConversion = async (context, request) => {
  let response = await api.getConversion(request);
  context.commit('GET_CONVERSION', response.data);
}
export default {
  editFormTracking,
  getForm,
  dispatchEditFormTracking,
  getConversion
};
