import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const getListMessages = async (context, request) => {
  var query = await utils.initLeadInfo(context.state.searchRequest, request);
  var response = await api.getListMessages(query);
  context.commit("SET_LIST_MESSAGES", response.data);
}

const sendMessages = async (context, request) => {
  var response = await api.createMessages(request);
  Vue.prototype.$signalRConnection.invoke("Chat", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'edit-chat', message: request }))
  return response;
}

const editListMessages = async (context, request) => {
  context.commit("UPDATE_LIST_MESSAGES", request);
}
const setNumberScroll = async (context, request) => {
  context.commit("UPDATE_NUMBER_SCROLL", request);
}
export default {
  getListMessages,
  sendMessages,
  editListMessages,
  setNumberScroll
};
