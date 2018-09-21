import api from '../_api';
import Vue from 'vue';

const createAccessRight = async (context, request) => {
  var response = await api.createAccessRight(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-roles-user', message: response.data }))
}
const deleteAccessRight = async (context, request) => {
  var response = await api.deleteAccessRight(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-roles-user', message: response.data }))
}
export default {
  createAccessRight,
  deleteAccessRight
};
