import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
const updateInfo = async (context, request) => {
  let response = await api.updateInfo(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-company', message: response.data }))
};

const updateLogo = async (context, request) => {
  let response = await api.updateLogo(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-company', message: response.data }))
};

export default {
  updateInfo,
  updateLogo,
};
