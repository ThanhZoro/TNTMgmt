import Vue from 'vue';

const editTeamUser = async (request) => await Vue.prototype.$http.post(`/api/company/TeamUsers/Edit`, request);

const deleteTeamUser = async (request) => await Vue.prototype.$http.delete('/api/company/TeamUsers/Delete', { data: request });

const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
export default {
  editTeamUser,
  deleteTeamUser,
  getTeam
};
