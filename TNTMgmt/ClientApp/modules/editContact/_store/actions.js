import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";

const updateLogo = async (context, request) => {
  var response = await api.updateLogo(request);
  await dispatchUpdataListContact(context, response.data);
  return response;
}
const updateContact = async (context, request) => {
  var response = request.id ? await api.updateContact(request) : await api.createContact(request);
  await dispatchUpdataListContact(context, response.data);
  return response;
}
const getInfoId = async (context, request) => {
  let response = await api.getInfoId(request);
  context.commit('SET_DATA', response.data);
};
const dispatchUpdataListContact = async (context, data) => {
  if (context.rootState["$_contact"]) {
    await context.commit('$_contact/UPDATE_LIST_CONTACT', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
export default {
  updateLogo,
  updateContact,
  getInfoId,
  dispatchUpdataListContact
};
