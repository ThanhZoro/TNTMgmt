import api from '../_api';
import utils from '@/utils/advanceFilter'
const getAllContact = async (context, request) => {
  var query = await utils.initLeadInfo(context.state.searchRequest, request);
  var response = await api.getAllContact(query);  
  context.commit("SET_CONTACTS", response.data)
}
const deleteContact = async (context, request) => {
  let response = await api.deleteContact(request);
  context.commit('UPDATE_DATA', request);
  return response;
};
const updateListContact = async (context, request) => {
  context.commit('UPDATE_LIST_CONTACT', request);
};
const setContactId = async (context, request) => {
  context.commit('SET_LEAD_ID', request);
};
export default {
  getAllContact,
  deleteContact,
  updateListContact,
  setContactId
};
