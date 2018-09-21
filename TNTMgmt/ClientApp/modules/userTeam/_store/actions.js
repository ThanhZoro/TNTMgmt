import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'
const editTeamUser = async (context, request) => {
  var response = await api.editTeamUser(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-team-user', message: response.data }))
}
const deleteTeamUser = async (context, request) => {
  var response = await api.deleteTeamUser(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-team-user', message: response.data }))
}
const getTeam = async (context, request) => {
  let response = await api.getTeam(request);
  context.commit('SET_LIST_TEAM', response.data);
};
export default {
  editTeamUser,
  deleteTeamUser,
  getTeam
};
