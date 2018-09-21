import api from '../_api';
import Vue from 'vue';

const uploadAvatar = async (context, request) => {
  let response = await api.uploadAvatar(request);  
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-logo-user', message: { avatarUrl: response.data, id: request.id } }))
}

export default {
  uploadAvatar
};
