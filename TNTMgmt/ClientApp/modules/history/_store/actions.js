import api from '../_api';
import utils from '@/utils/advanceFilter'
const getHistory = async (context, request) => {
  var query = await utils.initLeadInfo(context.state.searchRequest, request);
  var response = await api.getHistory(query);
  context.commit('SET_DATA', response.data);
  return response;
};
const setCheckList = async (context, request) => {
    context.commit('SET_CHECKLIST', request);
};
export default {
    getHistory,
    setCheckList
};
