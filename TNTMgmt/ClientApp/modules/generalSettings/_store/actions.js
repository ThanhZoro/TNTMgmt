import api from '../_api';
import Vue from 'vue';
const updateGeneralSettings = async (context, request) => {
  let response = await api.updateGeneralSettings(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-company', message: response.data }))
};

const getTimeZone = async (context, request=null) => {
  let response = await api.getTimeZone();
  return response.data;
};

export default {
  updateGeneralSettings,
  getTimeZone
};
