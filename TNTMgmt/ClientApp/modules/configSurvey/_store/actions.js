import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
const updateInfo = async (context, request) => {
  let response = await api.updateInfo(request);
  await Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-company', message: response.data }));
  Vue.prototype.$signalRConnection.invoke("Chat", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'edit-list-lead', message: request }))
};

const getListSurvey = async (context,request = "") => {
  var query = await utils.initFilter(context.state.advanceFilter.choosenFilter, context.state.searchRequest);
  let response = await api.getListSurvey(query);
  context.commit('SET_LIST_SURVEY', response.data.data);
};

export default {
  updateInfo,
  getListSurvey
};
