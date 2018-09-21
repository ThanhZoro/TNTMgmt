import Vue from 'vue';

const editTeamUser = async (request) => await Vue.prototype.$http.post(`/api/company/TeamUsers/Edit`, request);

const deleteTeamUser = async (request) => await Vue.prototype.$http.delete('/api/company/TeamUsers/Delete', { data: request });

const getTeam = async (request) => await Vue.prototype.$http.get(`/api/read/Team/GetById?id=${request}`);
export default {
  editTeamUser,
  deleteTeamUser,
  getTeam
};
