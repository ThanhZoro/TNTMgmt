import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const getConversion = async (context, request) => {
  let response = await api.getConversion(request);
  context.commit('GET_CONVERSION', response.data);
}
const editCall = async (context, request) => {
  let response = request.id ? await api.updateCall(request) : await api.createCall(request);
  await dispatchEditCall(context, response.data);
  return response;
}
const getCall = async (context, request) => {
  let response = await api.getCall(request);
  context.commit('GET_CALL', response.data);
}
const dispatchEditCall = async (context, data) => {
  if (context.rootState["$_gaInfo"]) {
    await context.commit('$_gaInfo/UPDATE_ELEMENT_TRACKING', { data: data, element: 'call' }, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
export default {
  editCall,
  getCall,
  getConversion,
  dispatchEditCall
};
