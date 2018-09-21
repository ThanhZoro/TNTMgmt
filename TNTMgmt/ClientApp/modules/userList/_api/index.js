import Vue from 'vue';
const getTeam = async (request) => {
 return await Vue.prototype.$http.post('/api/read/Team/GetByQuery', request);
}
export default {
 getTeam
};