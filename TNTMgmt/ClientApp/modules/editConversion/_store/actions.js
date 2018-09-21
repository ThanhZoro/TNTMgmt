import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";

const editConversion = async (context, request) => {
  let response = await api.editConversion(request);
  await dispatcheditConversion(context, response.data);
  return response;
};

const getconversion = async (context, request) => {
  let response = await api.getconversion(request);
  context.commit('GET_CONVERSION', response.data);
}

const dispatcheditConversion = async (context, data) => {
  if (context.rootState["$_gaInfo"]) {
    await context.commit('$_gaInfo/UPDATE_ELEMENT_TRACKING', { data: data, element: 'conversion'}, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
export default {
  editConversion,
  getconversion,
  dispatcheditConversion,
};
