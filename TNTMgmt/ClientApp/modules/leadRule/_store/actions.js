import api from '../_api';
import Vue from 'vue';
const updateLeadRequire = async (context, request) => {
  let response = await api.updateLeadRequire(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-company', message: response.data }))
};

export default {
  updateLeadRequire
};
