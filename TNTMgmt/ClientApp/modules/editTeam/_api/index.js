import Vue from 'vue';

const getTeam = async (request) => await Vue.prototype.$http.get(`/api/read/Team/GetById?id=${request}`);

const createTeam = async (request) => await Vue.prototype.$http.put('/api/company/Team/Create', request);

const updateTeam = async (request) => await Vue.prototype.$http.post('/api/company/Team/Update', request);

export default {
  createTeam,
  updateTeam,
  getTeam
};
