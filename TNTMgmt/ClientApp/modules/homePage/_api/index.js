import Vue from 'vue';

const getLeadReport = async (request) => await Vue.prototype.$http.get(`/api/read/report/lead`);

export default {
  getLeadReport
};
