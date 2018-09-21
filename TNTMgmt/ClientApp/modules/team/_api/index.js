import Vue from 'vue';

const getTeam = async (request) => {
  return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
const deleteTeam = async (request) => await Vue.prototype.$http.delete('/api/company/Team/Delete', { data: request });
export default {
  getTeam,
  deleteTeam
};
