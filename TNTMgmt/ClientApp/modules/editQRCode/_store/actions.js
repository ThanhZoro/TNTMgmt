import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const getConversion = async (context, request) => {
  let response = await api.getConversion(request);
  context.commit('GET_CONVERSION', response.data);
}
const editQRCode = async (context, request) => {
  let response = request.id ? await api.updateQRCode(request) : await api.createQRCode(request);
  await dispatchEditQrcode(context, response.data);
  return response;
}
const getQACode = async (context, request) => {
  let response = await api.getQACode(request);
  context.commit('GET_QACODE', response.data);
}
const dispatchEditQrcode = async (context, data) => {
  if (context.rootState["$_gaInfo"]) {
    await context.commit('$_gaInfo/UPDATE_ELEMENT_TRACKING', { data: data, element: 'qrcode' }, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
export default {
  getConversion,
  editQRCode,
  getQACode,
  dispatchEditQrcode
};
