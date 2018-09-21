import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const editTicket = async (context, request) => {
  let response = request.id ? await api.updateTicket(request) : await api.createTicket(request);
  await dispatchEditTicketVoucher(context, response.data);
  return response;
}
const getTicket = async (context, request) => {
  let response = await api.getTicket(request);
  context.commit('GET_TICKET', response.data);
}
const updateLogo = async (context, request) => {
  let response = await api.updateLogo(request);
  context.commit('UPDATE_TICKET', response.data);
};
const dispatchEditTicketVoucher = async (context, data) => {
  if (context.rootState["$_gaInfo"]) {
    await context.commit('$_gaInfo/UPDATE_ELEMENT_TRACKING', { data: data, element: 'tickes' }, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}
export default {
  editTicket,
  getTicket,
  updateLogo,
  dispatchEditTicketVoucher
};
